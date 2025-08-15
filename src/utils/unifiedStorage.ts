import { centralizedStorage, CentralizedProduct } from './centralizedStorage';
import { serverStorage } from '../services/serverStorage';
import { supabaseStorage, isSupabaseConfigured } from '../services/supabaseStorage';
import { crossTabSync } from './crossTabSync';
import { crossBrowserSync } from './crossBrowserSync';

export interface StorageStatus {
  localStorage: boolean;
  indexedDB: boolean;
  server: boolean;
  isOnline: boolean;
  queuedOperations: number;
  lastSync: number;
}

class UnifiedStorage {
  private storageMode: 'hybrid' | 'local' | 'server' | 'supabase' = 'hybrid';
  private lastSyncTime: number = 0;
  private syncInterval: NodeJS.Timeout | null = null;
  private readonly SYNC_INTERVAL = 30000; // 30 seconds for more frequent sync
  private storageEventListeners: Set<() => void> = new Set();

  constructor() {
    this.initializeStorage();
    this.startSyncTimer();
    this.setupCrossTabSync();
  }

  private setupCrossTabSync(): void {
    // Listen for storage events from other tabs
    window.addEventListener('storage', (event) => {
      if (event.key === 'unified-storage-sync' && event.newValue) {
        try {
          const syncData = JSON.parse(event.newValue);
          console.log('🔄 Cross-tab sync event received:', syncData);
          
          if (syncData.type === 'product-updated' || syncData.type === 'product-deleted') {
            // Trigger a full sync to get the latest data
            this.forceSync();
            // Notify listeners
            this.notifyStorageChange();
          }
        } catch (error) {
          console.warn('Error parsing cross-tab sync data:', error);
        }
      }
    });

    // Listen for custom events for same-tab communication
    window.addEventListener('unified-storage-change', () => {
      this.notifyStorageChange();
    });
  }

  private notifyStorageChange(): void {
    // Dispatch custom event for same-tab listeners
    window.dispatchEvent(new CustomEvent('unified-storage-hydrated'));
    
    // Notify all registered listeners
    this.storageEventListeners.forEach(listener => {
      try {
        listener();
      } catch (error) {
        console.warn('Error in storage change listener:', error);
      }
    });
  }

  private broadcastStorageChange(type: 'product-updated' | 'product-deleted', productId?: string): void {
    const syncData = {
      type,
      productId,
      timestamp: Date.now(),
      tabId: Math.random().toString(36).substr(2, 9) // Simple tab identifier
    };

    // Broadcast to other tabs via localStorage
    try {
      localStorage.setItem('unified-storage-sync', JSON.stringify(syncData));
      // Remove the item immediately to avoid accumulation
      setTimeout(() => {
        localStorage.removeItem('unified-storage-sync');
      }, 100);
    } catch (error) {
      console.warn('Failed to broadcast storage change:', error);
    }

    // Dispatch custom event for same-tab listeners
    window.dispatchEvent(new CustomEvent('unified-storage-change', { detail: syncData }));
  }

  // Add listener for storage changes
  addStorageChangeListener(listener: () => void): () => void {
    this.storageEventListeners.add(listener);
    return () => {
      this.storageEventListeners.delete(listener);
    };
  }

  private async initializeStorage(): Promise<void> {
    try {
      // Prefer Supabase when configured
      if (isSupabaseConfigured()) {
        this.storageMode = 'supabase';
        console.log('✅ Supabase configured - using Supabase mode');
        return;
      }
      // Check server availability
      const serverHealth = await serverStorage.getServerHealth();
      if (serverHealth.status === 'healthy') {
        this.storageMode = 'hybrid';
        console.log('✅ Server storage available - using hybrid mode');
      } else {
        this.storageMode = 'local';
        console.log('⚠️ Server unavailable - using local storage only');
      }
    } catch (error) {
      this.storageMode = 'local';
      console.log('⚠️ Server connection failed - using local storage only');
    }
  }

  private startSyncTimer(): void {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
    }
    
    this.syncInterval = setInterval(() => {
      this.syncAllStorages();
    }, this.SYNC_INTERVAL);
  }

  private async syncAllStorages(): Promise<void> {
    try {
      if (this.storageMode === 'supabase') {
        const localProducts = await centralizedStorage.getAllProducts();
        const remoteProducts = await supabaseStorage.getAllProducts();
        const merged = this.mergeProducts(localProducts, remoteProducts);
        for (const product of merged) {
          await centralizedStorage.saveProduct(product);
          await supabaseStorage.saveProduct(product);
        }
        this.lastSyncTime = Date.now();
        console.log(`🔄 Synced ${merged.length} products with Supabase`);
      } else if (this.storageMode === 'hybrid') {
        const localProducts = await centralizedStorage.getAllProducts();
        const serverProducts = await serverStorage.getAllProducts();
        
        // Merge and sync
        const merged = this.mergeProducts(localProducts, serverProducts);
        
        // Update both storages
        for (const product of merged) {
          await centralizedStorage.saveProduct(product);
          await serverStorage.saveProduct(product);
        }
        
        this.lastSyncTime = Date.now();
        console.log(`🔄 Synced ${merged.length} products across all storages`);
      }
    } catch (error) {
      console.warn('Storage sync failed:', error);
    }
  }

  private mergeProducts(local: CentralizedProduct[], server: CentralizedProduct[]): CentralizedProduct[] {
    const merged = new Map<string, CentralizedProduct>();
    
    // Add local products
    local.forEach(product => {
      merged.set(product.id || product.globalId, product);
    });
    
    // Add/update server products (keep most recent)
    server.forEach(product => {
      const existing = merged.get(product.id || product.globalId);
      if (!existing || (product.lastUpdated > existing.lastUpdated)) {
        merged.set(product.id || product.globalId, product);
      }
    });
    
    return Array.from(merged.values());
  }

  async saveProduct(product: CentralizedProduct): Promise<CentralizedProduct> {
    try {
      // Save to all available storages
      const savedProduct = await centralizedStorage.saveProduct(product);
      
      if (this.storageMode === 'supabase') {
        try {
          await supabaseStorage.saveProduct(product);
        } catch (error) {
          console.warn('Supabase save failed, but local save succeeded:', error);
        }
      } else if (this.storageMode === 'hybrid') {
        try {
          await serverStorage.saveProduct(product);
        } catch (error) {
          console.warn('Server save failed, but local save succeeded:', error);
        }
      }
      
      // Broadcast change to other tabs
      crossTabSync.broadcastProductAdded(product.id, savedProduct);
      
      // Broadcast cross-browser sync event
      try {
        await crossBrowserSync.broadcastProductAdded(product.id, {
          product: savedProduct,
          timestamp: Date.now()
        });
        console.log('🔔 Cross-browser sync broadcasted for product:', product.id);
      } catch (error) {
        console.warn('Cross-browser sync broadcast failed:', error);
      }
      
      // Notify storage change listeners
      this.notifyStorageChange();
      
      return savedProduct;
    } catch (error) {
      console.error('Failed to save product:', error);
      throw error;
    }
  }

  async getAllProducts(): Promise<CentralizedProduct[]> {
    try {
      if (this.storageMode === 'supabase') {
        // Try Supabase first, fallback to local
        try {
          const remote = await supabaseStorage.getAllProducts();
          if (remote.length > 0) {
            for (const product of remote) {
              await centralizedStorage.saveProduct(product);
            }
            return remote;
          }
        } catch (error) {
          console.warn('Supabase fetch failed, using local storage:', error);
        }
      } else if (this.storageMode === 'hybrid') {
        // Try server first, fallback to local
        try {
          const serverProducts = await serverStorage.getAllProducts();
          if (serverProducts.length > 0) {
            // Update local storage with server data
            for (const product of serverProducts) {
              await centralizedStorage.saveProduct(product);
            }
            return serverProducts;
          }
        } catch (error) {
          console.warn('Server fetch failed, using local storage:', error);
        }
      }
      
      // Fallback to local storage
      return await centralizedStorage.getAllProducts();
    } catch (error) {
      console.error('Failed to get products:', error);
      return [];
    }
  }

  async getProductById(id: string): Promise<CentralizedProduct | null> {
    try {
      // Try local storage first for speed
      let product = await centralizedStorage.getProductById(id);
      
      if (!product && this.storageMode === 'supabase') {
        // Try Supabase
        try {
          product = await supabaseStorage.getProductById(id);
          if (product) {
            // Cache in local storage
            await centralizedStorage.saveProduct(product);
          }
        } catch (error) {
          console.warn('Supabase fetch failed for product:', error);
        }
      } else if (!product && this.storageMode === 'hybrid') {
        // Try server if not found locally
        try {
          product = await serverStorage.getProductById(id);
          if (product) {
            // Cache in local storage
            await centralizedStorage.saveProduct(product);
          }
        } catch (error) {
          console.warn('Server fetch failed for product:', error);
        }
      }
      
      return product;
    } catch (error) {
      console.error(`Failed to get product ${id}:`, error);
      return null;
    }
  }

  async deleteProduct(id: string): Promise<boolean> {
    try {
      // Delete from all storages
      const localResult = await centralizedStorage.deleteProduct(id);
      
      if (this.storageMode === 'supabase') {
        try {
          await supabaseStorage.deleteProduct(id);
        } catch (error) {
          console.warn('Supabase delete failed, but local delete succeeded:', error);
        }
      } else if (this.storageMode === 'hybrid') {
        try {
          await serverStorage.deleteProduct(id);
        } catch (error) {
          console.warn('Server delete failed, but local delete succeeded:', error);
        }
      }
      
      // Broadcast deletion to other tabs
      crossTabSync.broadcastProductDeleted(id);
      
      // Broadcast cross-browser sync event
      try {
        await crossBrowserSync.broadcastProductDeleted(id);
      } catch (error) {
        console.warn('Cross-browser sync broadcast failed:', error);
      }
      
      return localResult;
    } catch (error) {
      console.error(`Failed to delete product ${id}:`, error);
      throw error;
    }
  }

  async updateProductViews(id: string): Promise<number> {
    try {
      // Update local storage
      await centralizedStorage.updateProductViews(id);
      
      // Update server if available
      if (this.storageMode === 'supabase') {
        try {
          return await supabaseStorage.updateProductViews(id);
        } catch (error) {
          console.warn('Supabase view update failed:', error);
        }
      } else if (this.storageMode === 'hybrid') {
        try {
          return await serverStorage.updateProductViews(id);
        } catch (error) {
          console.warn('Server view update failed:', error);
        }
      }
      
      // Return local view count
      const product = await centralizedStorage.getProductById(id);
      return product?.pageViews || 0;
    } catch (error) {
      console.error(`Failed to update product views for ${id}:`, error);
      return 0;
    }
  }

  async searchProducts(query: string): Promise<CentralizedProduct[]> {
    try {
      if (this.storageMode === 'supabase') {
        // Try remote search first
        try {
          const serverResults = await supabaseStorage.searchProducts(query);
          if (serverResults.length > 0) {
            return serverResults;
          }
        } catch (error) {
          console.warn('Supabase search failed, using local search:', error);
        }
      } else if (this.storageMode === 'hybrid') {
        // Try server search first
        try {
          const serverResults = await serverStorage.searchProducts(query);
          if (serverResults.length > 0) {
            return serverResults;
          }
        } catch (error) {
          console.warn('Server search failed, using local search:', error);
        }
      }
      
      // Fallback to local search
      return await centralizedStorage.searchProducts(query);
    } catch (error) {
      console.error(`Failed to search products for "${query}":`, error);
      return [];
    }
  }

  async getProductsByCategory(category: string): Promise<CentralizedProduct[]> {
    try {
      if (this.storageMode === 'supabase') {
        try {
          const serverResults = await supabaseStorage.getProductsByCategory(category);
          if (serverResults.length > 0) {
            return serverResults;
          }
        } catch (error) {
          console.warn('Supabase category fetch failed, using local:', error);
        }
      } else if (this.storageMode === 'hybrid') {
        // Try server first
        try {
          const serverResults = await serverStorage.getProductsByCategory(category);
          if (serverResults.length > 0) {
            return serverResults;
          }
        } catch (error) {
          console.warn('Server category fetch failed, using local:', error);
        }
      }
      
      // Fallback to local storage
      return await centralizedStorage.getProductsByCategory(category);
    } catch (error) {
      console.error(`Failed to get products for category "${category}":`, error);
      return [];
    }
  }

  async migrateFromLocalStorage(): Promise<void> {
    try {
      console.log('🔄 Starting migration from localStorage...');
      
      // Migrate to centralized storage
      await centralizedStorage.syncWithLocalStorage();
      
      // Migrate to server if available
      if (this.storageMode === 'supabase') {
        try {
          await supabaseStorage.migrateFromLocalStorage();
          console.log('✅ Migration to Supabase completed');
        } catch (error) {
          console.warn('Supabase migration failed, but local migration succeeded:', error);
        }
      } else if (this.storageMode === 'hybrid') {
        try {
          await serverStorage.migrateFromLocalStorage();
          console.log('✅ Migration to server completed');
        } catch (error) {
          console.warn('Server migration failed, but local migration succeeded:', error);
        }
      }
      
      console.log('✅ Migration completed successfully');
    } catch (error) {
      console.error('Migration failed:', error);
      throw error;
    }
  }

  async forceSync(): Promise<void> {
    try {
      console.log('🔄 Force syncing all storages...');
      await this.syncAllStorages();
      
      // Broadcast sync event to all browsers
      try {
        await crossBrowserSync.forceSync();
      } catch (error) {
        console.warn('Cross-browser force sync failed:', error);
      }
      
      console.log('✅ Force sync completed');
    } catch (error) {
      console.error('Force sync failed:', error);
      throw error;
    }
  }

  getStorageStatus(): StorageStatus {
    const serverStatus = serverStorage.getOfflineQueueStatus();
    
    return {
      localStorage: true, // Always available
      indexedDB: true, // Always available
      server: this.storageMode === 'hybrid' || this.storageMode === 'supabase',
      isOnline: serverStatus.isOnline,
      queuedOperations: serverStatus.queuedOperations,
      lastSync: this.lastSyncTime,
    };
  }

  async retryOfflineOperations(): Promise<void> {
    if (this.storageMode === 'hybrid') {
      await serverStorage.retryOfflineOperations();
    }
  }

  // Switch storage mode
  async setStorageMode(mode: 'hybrid' | 'local' | 'server' | 'supabase'): Promise<void> {
    this.storageMode = mode;
    
    if (mode === 'hybrid' || mode === 'supabase') {
      await this.initializeStorage();
    }
    
    console.log(`🔄 Storage mode switched to: ${mode}`);
  }

  // Get current storage mode
  getStorageMode(): string {
    return this.storageMode;
  }

  // Cleanup
  cleanup(): void {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
    }
    
    centralizedStorage.cleanup();
    serverStorage.cleanup();
  }
}

// Create and export a singleton instance
export const unifiedStorage = new UnifiedStorage();

// Export the class for testing purposes
export { UnifiedStorage };

// Cleanup on page unload
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    unifiedStorage.cleanup();
  });
}
