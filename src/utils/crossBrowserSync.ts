// Cross-browser synchronization utility for product management
// This ensures that product changes in one browser are reflected in all other browsers and devices

export interface CrossBrowserSyncEvent {
  type: 'product-added' | 'product-updated' | 'product-deleted' | 'storage-sync' | 'force-sync';
  productId?: string;
  timestamp: number;
  browserId: string;
  data?: any;
  source: 'local' | 'server' | 'supabase' | 'websocket';
}

class CrossBrowserSync {
  private browserId: string;
  private listeners: Map<string, Set<(event: CrossBrowserSyncEvent) => void>> = new Map();
  private syncKey = 'cross-browser-sync-v2';
  private lastSyncTime: number = 0;
  private syncInterval: NodeJS.Timeout | null = null;
  private readonly SYNC_INTERVAL = 15000; // 15 seconds for more frequent sync
  private readonly MAX_SYNC_AGE = 60000; // 1 minute max age for sync events
  private isOnline: boolean = navigator.onLine;
  private reconnectAttempts: number = 0;
  private readonly MAX_RECONNECT_ATTEMPTS = 5;

  constructor() {
    this.browserId = this.generateBrowserId();
    this.setupNetworkListeners();
    this.setupStorageListener();
    this.startSyncTimer();
    this.broadcastPresence();
  }

  private generateBrowserId(): string {
    // Generate a unique browser identifier
    const existingId = localStorage.getItem('browser-id');
    if (existingId) return existingId;
    
    const newId = `browser_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    try {
      localStorage.setItem('browser-id', newId);
    } catch (error) {
      console.warn('Failed to save browser ID:', error);
    }
    return newId;
  }

  private setupNetworkListeners(): void {
    // Listen for online/offline events
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.reconnectAttempts = 0;
      console.log('🌐 Browser is online - resuming sync');
      this.forceSync();
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
      console.log('📴 Browser is offline - pausing sync');
    });

    // Listen for visibility changes to sync when tab becomes visible
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && this.isOnline) {
        console.log('👁️ Tab became visible - checking for updates');
        this.forceSync();
      }
    });
  }

  private setupStorageListener(): void {
    // Listen for storage events from other tabs in the same browser
    window.addEventListener('storage', (event) => {
      if (event.key === this.syncKey && event.newValue) {
        try {
          const syncEvent: CrossBrowserSyncEvent = JSON.parse(event.newValue);
          
          // Don't process our own events
          if (syncEvent.browserId === this.browserId) return;
          
          // Check if event is too old
          if (Date.now() - syncEvent.timestamp > this.MAX_SYNC_AGE) {
            console.log('🕐 Ignoring old sync event:', syncEvent);
            return;
          }
          
          console.log('🔄 Cross-browser sync event received:', syncEvent);
          
          // Notify listeners
          this.notifyListeners(syncEvent);
        } catch (error) {
          console.warn('Error parsing cross-browser sync event:', error);
        }
      }
    });

    // Listen for custom events for same-tab communication
    window.addEventListener('cross-browser-sync', ((event: CustomEvent) => {
      const syncEvent = event.detail as CrossBrowserSyncEvent;
      this.notifyListeners(syncEvent);
    }) as EventListener);
  }

  private notifyListeners(event: CrossBrowserSyncEvent): void {
    const eventListeners = this.listeners.get(event.type);
    if (eventListeners) {
      eventListeners.forEach(listener => {
        try {
          listener(event);
        } catch (error) {
          console.warn('Error in cross-browser sync listener:', error);
        }
      });
    }
  }

  private broadcastEvent(event: CrossBrowserSyncEvent): void {
    // Broadcast to other tabs via localStorage
    try {
      localStorage.setItem(this.syncKey, JSON.stringify(event));
      // Remove the item after a short delay to avoid accumulation
      setTimeout(() => {
        localStorage.removeItem(this.syncKey);
      }, 200);
    } catch (error) {
      console.warn('Failed to broadcast cross-browser event:', error);
    }

    // Dispatch custom event for same-tab listeners
    window.dispatchEvent(new CustomEvent('cross-browser-sync', { detail: event }));
  }

  private async broadcastToServer(event: CrossBrowserSyncEvent): Promise<void> {
    if (!this.isOnline) return;

    try {
      // Try cloud sync first (production)
      const { cloudSync } = await import('./cloudSync');
      if (cloudSync.isCloudSyncAvailable()) {
        await this.broadcastToCloud(event);
        return;
      }

      // Fallback to local server (development)
      const response = await fetch('http://localhost:3001/api/broadcast-sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      console.log('📡 Event broadcasted to local server successfully');
    } catch (error) {
      console.warn('Failed to broadcast event to server/cloud:', error);
      // Fall back to local storage only
    }
  }

  private async broadcastToCloud(event: CrossBrowserSyncEvent): Promise<void> {
    try {
      const { cloudSync } = await import('./cloudSync');
      
      switch (event.type) {
        case 'product-added':
          await cloudSync.broadcastProductAdded(event.productId!, event.data);
          break;
        case 'product-updated':
          await cloudSync.broadcastProductUpdated(event.productId!, event.data);
          break;
        case 'product-deleted':
          await cloudSync.broadcastProductDeleted(event.productId!);
          break;
        case 'force-sync':
          await cloudSync.forceSync();
          break;
      }
      
      console.log('☁️ Event broadcasted to cloud successfully');
    } catch (error) {
      console.warn('Failed to broadcast event to cloud:', error);
      throw error;
    }
  }

  private startSyncTimer(): void {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
    }
    
    this.syncInterval = setInterval(() => {
      if (this.isOnline) {
        this.backgroundSync();
      }
    }, this.SYNC_INTERVAL);
  }

  private async backgroundSync(): Promise<void> {
    try {
      // Check if we need to sync
      const timeSinceLastSync = Date.now() - this.lastSyncTime;
      if (timeSinceLastSync < this.SYNC_INTERVAL) {
        return; // Too soon to sync
      }

      console.log('🔄 Performing background sync...');
      
      // Trigger a sync event
      this.broadcastEvent({
        type: 'storage-sync',
        timestamp: Date.now(),
        browserId: this.browserId,
        source: 'local'
      });

      // Try to sync with server
      await this.broadcastToServer({
        type: 'storage-sync',
        timestamp: Date.now(),
        browserId: this.browserId,
        source: 'server'
      });

      // Fetch events from other browsers
      await this.fetchServerEvents();

      this.lastSyncTime = Date.now();
    } catch (error) {
      console.warn('Background sync failed:', error);
    }
  }

  private async fetchServerEvents(): Promise<void> {
    if (!this.isOnline) return;

    try {
      // Try cloud sync first (production)
      const { cloudSync } = await import('./cloudSync');
      if (cloudSync.isCloudSyncAvailable()) {
        await cloudSync.forceSync();
        return;
      }

      // Fallback to local server (development)
      const response = await fetch(`http://localhost:3001/api/sync-events?browserId=${this.browserId}&since=${this.lastSyncTime}`);
      
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success && Array.isArray(data.events)) {
        console.log(`📡 Fetched ${data.events.length} events from server`);
        
        // Process events from other browsers
        for (const event of data.events) {
          if (event.browserId !== this.browserId) {
            console.log('🔄 Processing server event:', event);
            this.notifyListeners(event);
          }
        }
      }
    } catch (error) {
      console.warn('Failed to fetch server/cloud events:', error);
    }
  }

  private async broadcastPresence(): Promise<void> {
    // Broadcast browser presence to other browsers
    try {
      await this.broadcastToServer({
        type: 'storage-sync',
        timestamp: Date.now(),
        browserId: this.browserId,
        source: 'server'
      });
    } catch (error) {
      console.log('Browser presence broadcast failed (normal on first load):', error);
    }
  }

  // Public methods
  async broadcastProductAdded(productId: string, data?: any): Promise<void> {
    const event: CrossBrowserSyncEvent = {
      type: 'product-added',
      productId,
      timestamp: Date.now(),
      browserId: this.browserId,
      data,
      source: 'local'
    };

    this.broadcastEvent(event);
    await this.broadcastToServer(event);
  }

  async broadcastProductUpdated(productId: string, data?: any): Promise<void> {
    const event: CrossBrowserSyncEvent = {
      type: 'product-updated',
      productId,
      timestamp: Date.now(),
      browserId: this.browserId,
      data,
      source: 'local'
    };

    this.broadcastEvent(event);
    await this.broadcastToServer(event);
  }

  async broadcastProductDeleted(productId: string): Promise<void> {
    const event: CrossBrowserSyncEvent = {
      type: 'product-deleted',
      productId,
      timestamp: Date.now(),
      browserId: this.browserId,
      source: 'local'
    };

    this.broadcastEvent(event);
    await this.broadcastToServer(event);
  }

  async forceSync(): Promise<void> {
    console.log('🔄 Force sync requested');
    
    const event: CrossBrowserSyncEvent = {
      type: 'force-sync',
      timestamp: Date.now(),
      browserId: this.browserId,
      source: 'local'
    };

    this.broadcastEvent(event);
    await this.broadcastToServer(event);
  }

  // Add listener for specific event types
  addListener(eventType: CrossBrowserSyncEvent['type'], listener: (event: CrossBrowserSyncEvent) => void): () => void {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, new Set());
    }
    
    const eventListeners = this.listeners.get(eventType)!;
    eventListeners.add(listener);
    
    // Return unsubscribe function
    return () => {
      eventListeners.delete(listener);
      if (eventListeners.size === 0) {
        this.listeners.delete(eventType);
      }
    };
  }

  // Remove all listeners
  removeAllListeners(): void {
    this.listeners.clear();
  }

  // Get current browser ID
  getBrowserId(): string {
    return this.browserId;
  }

  // Check if browser is online
  isBrowserOnline(): boolean {
    return this.isOnline;
  }

  // Get sync status
  getSyncStatus(): { lastSync: number; isOnline: boolean; nextSync: number } {
    return {
      lastSync: this.lastSyncTime,
      isOnline: this.isOnline,
      nextSync: this.lastSyncTime + this.SYNC_INTERVAL
    };
  }
}

// Create and export a singleton instance
export const crossBrowserSync = new CrossBrowserSync();

// Cleanup on page unload
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    crossBrowserSync.removeAllListeners();
  });
}
