// Cross-tab synchronization utility for product management
// This ensures that product changes in one tab are reflected in all other tabs

export interface SyncEvent {
  type: 'product-added' | 'product-updated' | 'product-deleted' | 'storage-sync';
  productId?: string;
  timestamp: number;
  tabId: string;
  data?: any;
}

class CrossTabSync {
  private tabId: string;
  private listeners: Map<string, Set<(event: SyncEvent) => void>> = new Map();
  private syncKey = 'cross-tab-sync';

  constructor() {
    this.tabId = Math.random().toString(36).substr(2, 9);
    this.setupStorageListener();
  }

  private setupStorageListener(): void {
    // Listen for storage events from other tabs
    window.addEventListener('storage', (event) => {
      if (event.key === this.syncKey && event.newValue) {
        try {
          const syncEvent: SyncEvent = JSON.parse(event.newValue);
          
          // Don't process our own events
          if (syncEvent.tabId === this.tabId) return;
          
          console.log('🔄 Cross-tab sync event received:', syncEvent);
          
          // Notify listeners
          this.notifyListeners(syncEvent);
        } catch (error) {
          console.warn('Error parsing cross-tab sync event:', error);
        }
      }
    });

    // Listen for custom events for same-tab communication
    window.addEventListener('cross-tab-sync', ((event: CustomEvent) => {
      const syncEvent = event.detail as SyncEvent;
      this.notifyListeners(syncEvent);
    }) as EventListener);
  }

  private notifyListeners(event: SyncEvent): void {
    const eventListeners = this.listeners.get(event.type);
    if (eventListeners) {
      eventListeners.forEach(listener => {
        try {
          listener(event);
        } catch (error) {
          console.warn('Error in cross-tab sync listener:', error);
        }
      });
    }
  }

  private broadcastEvent(event: SyncEvent): void {
    // Broadcast to other tabs via localStorage
    try {
      localStorage.setItem(this.syncKey, JSON.stringify(event));
      // Remove the item immediately to avoid accumulation
      setTimeout(() => {
        localStorage.removeItem(this.syncKey);
      }, 100);
    } catch (error) {
      console.warn('Failed to broadcast cross-tab event:', error);
    }

    // Dispatch custom event for same-tab listeners
    window.dispatchEvent(new CustomEvent('cross-tab-sync', { detail: event }));
  }

  // Public methods
  broadcastProductAdded(productId: string, data?: any): void {
    const event: SyncEvent = {
      type: 'product-added',
      productId,
      timestamp: Date.now(),
      tabId: this.tabId,
      data
    };
    this.broadcastEvent(event);
    console.log('📡 Cross-tab sync: Product added event broadcast:', productId);
  }

  broadcastProductUpdated(productId: string, data?: any): void {
    const event: SyncEvent = {
      type: 'product-updated',
      productId,
      timestamp: Date.now(),
      tabId: this.tabId,
      data
    };
    this.broadcastEvent(event);
  }

  broadcastProductDeleted(productId: string): void {
    const event: SyncEvent = {
      type: 'product-deleted',
      productId,
      timestamp: Date.now(),
      tabId: this.tabId
    };
    this.broadcastEvent(event);
  }

  broadcastStorageSync(): void {
    const event: SyncEvent = {
      type: 'storage-sync',
      timestamp: Date.now(),
      tabId: this.tabId
    };
    this.broadcastEvent(event);
  }

  // Add listener for specific event types
  addListener(eventType: SyncEvent['type'], listener: (event: SyncEvent) => void): () => void {
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

  // Get current tab ID
  getTabId(): string {
    return this.tabId;
  }
}

// Create and export a singleton instance
export const crossTabSync = new CrossTabSync();

// Cleanup on page unload
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    crossTabSync.removeAllListeners();
  });
}
