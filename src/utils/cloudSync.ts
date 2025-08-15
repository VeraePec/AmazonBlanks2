// Cloud-based cross-browser synchronization for production
// This replaces the localhost server with cloud-based storage (Supabase)

import { supabaseStorage, isSupabaseConfigured } from '../services/supabaseStorage';
import type { CentralizedProduct } from './centralizedStorage';

export interface CloudSyncEvent {
  type: 'product-added' | 'product-updated' | 'product-deleted' | 'force-sync';
  productId?: string;
  timestamp: number;
  deviceId: string;
  browserId: string;
  data?: any;
}

class CloudSync {
  private deviceId: string;
  private browserId: string;
  private listeners: Map<string, Set<(event: CloudSyncEvent) => void>> = new Map();
  private syncInterval: NodeJS.Timeout | null = null;
  private readonly SYNC_INTERVAL = 10000; // 10 seconds for faster sync
  private lastSyncTime: number = 0;
  private isOnline: boolean = navigator.onLine;

  constructor() {
    this.deviceId = this.generateDeviceId();
    this.browserId = this.generateBrowserId();
    this.setupNetworkListeners();
    this.startSyncTimer();
    this.broadcastPresence();
  }

  private generateDeviceId(): string {
    // Create a device-specific identifier that persists across browsers
    let deviceId = localStorage.getItem('device-id');
    if (!deviceId) {
      // Use screen resolution + timezone + language as device fingerprint
      const fingerprint = [
        screen.width,
        screen.height,
        Intl.DateTimeFormat().resolvedOptions().timeZone,
        navigator.language,
        new Date().getTimezoneOffset()
      ].join('_');
      
      deviceId = `device_${btoa(fingerprint).replace(/[^a-zA-Z0-9]/g, '').substring(0, 16)}_${Date.now()}`;
      try {
        localStorage.setItem('device-id', deviceId);
      } catch (error) {
        console.warn('Failed to save device ID:', error);
      }
    }
    return deviceId;
  }

  private generateBrowserId(): string {
    // Generate a browser-specific identifier
    let browserId = sessionStorage.getItem('browser-session-id');
    if (!browserId) {
      browserId = `browser_${this.deviceId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      try {
        sessionStorage.setItem('browser-session-id', browserId);
      } catch (error) {
        console.warn('Failed to save browser ID:', error);
      }
    }
    return browserId;
  }

  private setupNetworkListeners(): void {
    window.addEventListener('online', () => {
      this.isOnline = true;
      console.log('🌐 Device is online - resuming cloud sync');
      this.forceSync();
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
      console.log('📴 Device is offline - pausing cloud sync');
    });

    // Listen for visibility changes to sync when tab becomes visible
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && this.isOnline && isSupabaseConfigured()) {
        console.log('👁️ Tab became visible - checking for cloud updates');
        this.forceSync();
      }
    });

    // Listen for storage events from other tabs (same browser)
    window.addEventListener('storage', (event) => {
      if (event.key === 'cloud-sync-trigger' && event.newValue) {
        try {
          const syncEvent: CloudSyncEvent = JSON.parse(event.newValue);
          if (syncEvent.browserId !== this.browserId) {
            console.log('🔄 Cross-tab sync trigger received:', syncEvent);
            this.forceSync();
          }
        } catch (error) {
          console.warn('Error parsing cross-tab sync trigger:', error);
        }
      }
    });
  }

  private startSyncTimer(): void {
    if (!isSupabaseConfigured()) {
      console.warn('⚠️ Supabase not configured - cloud sync disabled');
      return;
    }

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
    if (!isSupabaseConfigured() || !this.isOnline) return;

    try {
      // Check if we need to sync
      const timeSinceLastSync = Date.now() - this.lastSyncTime;
      if (timeSinceLastSync < this.SYNC_INTERVAL) {
        return; // Too soon to sync
      }

      console.log('🔄 Performing cloud background sync...');
      
      // Trigger sync event for other devices/browsers
      await this.broadcastEvent({
        type: 'force-sync',
        timestamp: Date.now(),
        deviceId: this.deviceId,
        browserId: this.browserId
      });

      this.lastSyncTime = Date.now();
    } catch (error) {
      console.warn('Cloud background sync failed:', error);
    }
  }

  private async broadcastEvent(event: CloudSyncEvent): Promise<void> {
    if (!isSupabaseConfigured()) return;

    try {
      // Store the event in Supabase for other devices/browsers to pick up
      const eventData = {
        id: `${event.deviceId}_${event.browserId}_${event.timestamp}`,
        type: event.type,
        product_id: event.productId,
        timestamp: event.timestamp,
        device_id: event.deviceId,
        browser_id: event.browserId,
        data: event.data ? JSON.stringify(event.data) : null,
        created_at: new Date().toISOString()
      };

      // Use Supabase client directly for sync events
      const SUPABASE_URL = (import.meta as any).env?.VITE_SUPABASE_URL;
      const SUPABASE_ANON_KEY = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY;
      
      if (SUPABASE_URL && SUPABASE_ANON_KEY) {
        const { createClient } = await import('@supabase/supabase-js');
        const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        
        await supabase.from('sync_events').insert(eventData);
        console.log('📡 Event broadcasted to cloud:', event.type);
      }

      // Also trigger local tabs via localStorage
      localStorage.setItem('cloud-sync-trigger', JSON.stringify(event));
      setTimeout(() => {
        localStorage.removeItem('cloud-sync-trigger');
      }, 200);

    } catch (error) {
      console.warn('Failed to broadcast event to cloud:', error);
    }
  }

  private async fetchCloudEvents(): Promise<CloudSyncEvent[]> {
    if (!isSupabaseConfigured() || !this.isOnline) return [];

    try {
      const SUPABASE_URL = (import.meta as any).env?.VITE_SUPABASE_URL;
      const SUPABASE_ANON_KEY = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY;
      
      if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return [];

      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      
      // Fetch recent events from other devices/browsers
      const { data, error } = await supabase
        .from('sync_events')
        .select('*')
        .gte('timestamp', this.lastSyncTime - 60000) // Last minute + buffer
        .neq('device_id', this.deviceId) // Exclude our own events
        .order('timestamp', { ascending: false })
        .limit(50);

      if (error || !data) return [];

      return data.map(row => ({
        type: row.type,
        productId: row.product_id,
        timestamp: row.timestamp,
        deviceId: row.device_id,
        browserId: row.browser_id,
        data: row.data ? JSON.parse(row.data) : undefined
      }));

    } catch (error) {
      console.warn('Failed to fetch cloud events:', error);
      return [];
    }
  }

  private notifyListeners(event: CloudSyncEvent): void {
    const eventListeners = this.listeners.get(event.type);
    if (eventListeners) {
      eventListeners.forEach(listener => {
        try {
          listener(event);
        } catch (error) {
          console.warn('Error in cloud sync listener:', error);
        }
      });
    }
  }

  private async broadcastPresence(): Promise<void> {
    // Broadcast device presence to cloud
    try {
      await this.broadcastEvent({
        type: 'force-sync',
        timestamp: Date.now(),
        deviceId: this.deviceId,
        browserId: this.browserId
      });
    } catch (error) {
      console.log('Device presence broadcast failed (normal on first load):', error);
    }
  }

  // Public methods
  async broadcastProductAdded(productId: string, data?: any): Promise<void> {
    const event: CloudSyncEvent = {
      type: 'product-added',
      productId,
      timestamp: Date.now(),
      deviceId: this.deviceId,
      browserId: this.browserId,
      data
    };

    await this.broadcastEvent(event);
  }

  async broadcastProductUpdated(productId: string, data?: any): Promise<void> {
    const event: CloudSyncEvent = {
      type: 'product-updated',
      productId,
      timestamp: Date.now(),
      deviceId: this.deviceId,
      browserId: this.browserId,
      data
    };

    await this.broadcastEvent(event);
  }

  async broadcastProductDeleted(productId: string): Promise<void> {
    const event: CloudSyncEvent = {
      type: 'product-deleted',
      productId,
      timestamp: Date.now(),
      deviceId: this.deviceId,
      browserId: this.browserId
    };

    await this.broadcastEvent(event);
  }

  async forceSync(): Promise<void> {
    if (!isSupabaseConfigured()) return;

    console.log('🔄 Force cloud sync requested');
    
    // Fetch and process events from other devices
    const events = await this.fetchCloudEvents();
    
    for (const event of events) {
      console.log('🔄 Processing cloud event:', event);
      this.notifyListeners(event);
    }

    // Broadcast our own sync event
    await this.broadcastEvent({
      type: 'force-sync',
      timestamp: Date.now(),
      deviceId: this.deviceId,
      browserId: this.browserId
    });

    this.lastSyncTime = Date.now();
  }

  // Add listener for specific event types
  addListener(eventType: CloudSyncEvent['type'], listener: (event: CloudSyncEvent) => void): () => void {
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

  // Get current device and browser IDs
  getDeviceId(): string {
    return this.deviceId;
  }

  getBrowserId(): string {
    return this.browserId;
  }

  // Check if cloud sync is available
  isCloudSyncAvailable(): boolean {
    return isSupabaseConfigured() && this.isOnline;
  }

  // Get sync status
  getSyncStatus(): { lastSync: number; isOnline: boolean; nextSync: number; cloudAvailable: boolean } {
    return {
      lastSync: this.lastSyncTime,
      isOnline: this.isOnline,
      nextSync: this.lastSyncTime + this.SYNC_INTERVAL,
      cloudAvailable: isSupabaseConfigured()
    };
  }

  // Cleanup
  cleanup(): void {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
    }
    this.removeAllListeners();
  }
}

// Create and export a singleton instance
export const cloudSync = new CloudSync();

// Cleanup on page unload
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    cloudSync.cleanup();
  });
}
