import { imageStorage } from './imageStorage';

export interface CentralizedProduct {
  id: string;
  name: string;
  price: string;
  originalPrice: string;
  description: string;
  category: string;
  features: string[];
  images: string[];
  amazonChoice: boolean;
  prime: boolean;
  rating: number;
  reviews: any[];
  reviewCount: number;
  variants: any[];
  specifications: { [key: string]: string };
  stock: number;
  store: string;
  route?: string;
  aboutThisItem: string[];
  productDetails: { [key: string]: string };
  technicalDetails: { [key: string]: string };
  countryRedirects: any[];
  notes?: string;
  createdBy?: 'ai' | 'manual';
  createdAt: number;
  pageViews?: number;
  lastUpdated: number;
  globalId: string; // Unique identifier across all browsers/devices
}

class CentralizedStorage {
  private dbName = 'AmazonStoreDB';
  private version = 1;
  private db: IDBDatabase | null = null;
  private readonly STORAGE_KEY = 'centralizedProducts';
  private readonly SYNC_INTERVAL = 30000; // 30 seconds
  private syncTimer: NodeJS.Timeout | null = null;

  constructor() {
    this.initDatabase();
    this.startSyncTimer();
  }

  private async initDatabase(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => {
        console.error('Failed to open IndexedDB:', request.error);
        reject(request.error);
      };

      request.onsuccess = () => {
        this.db = request.result;
        console.log('✅ IndexedDB initialized successfully');
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        // Create products store
        if (!db.objectStoreNames.contains('products')) {
          const productStore = db.createObjectStore('products', { keyPath: 'globalId' });
          productStore.createIndex('id', 'id', { unique: false });
          productStore.createIndex('category', 'category', { unique: false });
          productStore.createIndex('createdAt', 'createdAt', { unique: false });
          productStore.createIndex('lastUpdated', 'lastUpdated', { unique: false });
        }

        // Create sync store for cross-browser synchronization
        if (!db.objectStoreNames.contains('sync')) {
          const syncStore = db.createObjectStore('sync', { keyPath: 'key' });
        }
      };
    });
  }

  private startSyncTimer(): void {
    if (this.syncTimer) {
      clearInterval(this.syncTimer);
    }
    
    this.syncTimer = setInterval(() => {
      this.syncWithLocalStorage();
    }, this.SYNC_INTERVAL);
  }

  private async syncWithLocalStorage(): Promise<void> {
    try {
      // Get products from localStorage (legacy support)
      const localStorageProducts = localStorage.getItem('createdProducts');
      if (localStorageProducts) {
        const products = JSON.parse(localStorageProducts);
        await this.migrateFromLocalStorage(products);
      }

      // Sync with other storage methods
      await this.syncWithSessionStorage();
      await this.syncWithCookies();
    } catch (error) {
      console.warn('Sync failed:', error);
    }
  }

  private async migrateFromLocalStorage(products: any[]): Promise<void> {
    for (const product of products) {
      if (product.id && !product.globalId) {
        product.globalId = this.generateGlobalId(product.id);
        product.lastUpdated = Date.now();
        await this.saveProduct(product);
      }
    }
  }

  private async syncWithSessionStorage(): Promise<void> {
    try {
      const sessionProducts = sessionStorage.getItem('sessionProducts');
      if (sessionProducts) {
        const products = JSON.parse(sessionProducts);
        for (const product of products) {
          if (product.id && !product.globalId) {
            product.globalId = this.generateGlobalId(product.id);
            product.lastUpdated = Date.now();
            await this.saveProduct(product);
          }
        }
      }
    } catch (error) {
      console.warn('Session storage sync failed:', error);
    }
  }

  private async syncWithCookies(): Promise<void> {
    try {
      const cookieProducts = this.getCookie('cookieProducts');
      if (cookieProducts) {
        const products = JSON.parse(decodeURIComponent(cookieProducts));
        for (const product of products) {
          if (product.id && !product.globalId) {
            product.globalId = this.generateGlobalId(product.id);
            product.lastUpdated = Date.now();
            await this.saveProduct(product);
          }
        }
      }
    } catch (error) {
      console.warn('Cookie sync failed:', error);
    }
  }

  private generateGlobalId(id: string): string {
    return `global_${id}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
  }

  private setCookie(name: string, value: string, days: number = 30): void {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/`;
  }

  async saveProduct(product: CentralizedProduct): Promise<void> {
    if (!this.db) {
      await this.initDatabase();
    }

    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized'));
        return;
      }

      const transaction = this.db.transaction(['products'], 'readwrite');
      const store = transaction.objectStore('products');

      // Ensure product has required fields
      const productToSave: CentralizedProduct = {
        ...product,
        globalId: product.globalId || this.generateGlobalId(product.id || 'unknown'),
        lastUpdated: Date.now(),
        createdAt: product.createdAt || Date.now()
      };

      const request = store.put(productToSave);

      request.onsuccess = () => {
        // Also save to localStorage for backward compatibility
        this.saveToLocalStorage(productToSave);
        
        // Save to session storage for cross-tab sync
        this.saveToSessionStorage(productToSave);
        
        // Save to cookies for cross-browser sync (limited size)
        this.saveToCookies(productToSave);
        
        resolve();
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  private saveToLocalStorage(product: CentralizedProduct): void {
    try {
      const existing = JSON.parse(localStorage.getItem('createdProducts') || '[]');
      const updated = existing.filter((p: any) => p.id !== product.id);
      updated.push(product);
      localStorage.setItem('createdProducts', JSON.stringify(updated));
    } catch (error) {
      console.warn('Failed to save to localStorage:', error);
    }
  }

  private saveToSessionStorage(product: CentralizedProduct): void {
    try {
      const existing = JSON.parse(sessionStorage.getItem('sessionProducts') || '[]');
      const updated = existing.filter((p: any) => p.id !== product.id);
      updated.push(product);
      sessionStorage.setItem('sessionProducts', JSON.stringify(updated));
    } catch (error) {
      console.warn('Failed to save to sessionStorage:', error);
    }
  }

  private saveToCookies(product: CentralizedProduct): void {
    try {
      // Only save essential data to cookies due to size limitations
      const essentialData = {
        id: product.id,
        name: product.name,
        category: product.category,
        globalId: product.globalId,
        lastUpdated: product.lastUpdated
      };
      
      const existing = this.getCookie('cookieProducts');
      let products = [];
      if (existing) {
        try {
          products = JSON.parse(decodeURIComponent(existing));
        } catch {
          products = [];
        }
      }
      
      const updated = products.filter((p: any) => p.id !== product.id);
      updated.push(essentialData);
      
      // Limit cookie size by keeping only recent products
      if (updated.length > 50) {
        updated.sort((a: any, b: any) => b.lastUpdated - a.lastUpdated);
        updated.splice(50);
      }
      
      this.setCookie('cookieProducts', JSON.stringify(updated));
    } catch (error) {
      console.warn('Failed to save to cookies:', error);
    }
  }

  async getAllProducts(): Promise<CentralizedProduct[]> {
    if (!this.db) {
      await this.initDatabase();
    }

    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized'));
        return;
      }

      const transaction = this.db.transaction(['products'], 'readonly');
      const store = transaction.objectStore('products');
      const request = store.getAll();

      request.onsuccess = () => {
        const products = request.result || [];
        
        // Merge with localStorage for backward compatibility
        try {
          const localStorageProducts = JSON.parse(localStorage.getItem('createdProducts') || '[]');
          const merged = this.mergeProducts(products, localStorageProducts);
          resolve(merged);
        } catch (error) {
          console.warn('Failed to merge with localStorage:', error);
          resolve(products);
        }
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  private mergeProducts(indexedDBProducts: CentralizedProduct[], localStorageProducts: any[]): CentralizedProduct[] {
    const merged = new Map<string, CentralizedProduct>();
    
    // Add IndexedDB products
    indexedDBProducts.forEach(product => {
      merged.set(product.id || product.globalId, product);
    });
    
    // Add localStorage products (if not already present)
    localStorageProducts.forEach(product => {
      if (product.id && !merged.has(product.id)) {
        const enhancedProduct: CentralizedProduct = {
          ...product,
          globalId: product.globalId || this.generateGlobalId(product.id),
          lastUpdated: product.lastUpdated || Date.now(),
          createdAt: product.createdAt || Date.now()
        };
        merged.set(product.id, enhancedProduct);
      }
    });
    
    return Array.from(merged.values());
  }

  async getProductById(id: string): Promise<CentralizedProduct | null> {
    if (!this.db) {
      await this.initDatabase();
    }

    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized'));
        return;
      }

      const transaction = this.db.transaction(['products'], 'readonly');
      const store = transaction.objectStore('products');
      const index = store.index('id');
      const request = index.get(id);

      request.onsuccess = () => {
        if (request.result) {
          resolve(request.result);
        } else {
          // Fallback to localStorage
          try {
            const localStorageProducts = JSON.parse(localStorage.getItem('createdProducts') || '[]');
            const product = localStorageProducts.find((p: any) => p.id === id);
            resolve(product || null);
          } catch (error) {
            resolve(null);
          }
        }
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  async deleteProduct(id: string): Promise<void> {
    if (!this.db) {
      await this.initDatabase();
    }

    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized'));
        return;
      }

      const transaction = this.db.transaction(['products'], 'readwrite');
      const store = transaction.objectStore('products');
      const index = store.index('id');
      const request = index.getKey(id);

      request.onsuccess = () => {
        if (request.result) {
          const deleteRequest = store.delete(request.result);
          deleteRequest.onsuccess = () => {
            // Also remove from localStorage
            this.removeFromLocalStorage(id);
            this.removeFromSessionStorage(id);
            this.removeFromCookies(id);
            resolve();
          };
          deleteRequest.onerror = () => reject(deleteRequest.error);
        } else {
          // Remove from localStorage if not in IndexedDB
          this.removeFromLocalStorage(id);
          this.removeFromSessionStorage(id);
          this.removeFromCookies(id);
          resolve();
        }
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  private removeFromLocalStorage(id: string): void {
    try {
      const existing = JSON.parse(localStorage.getItem('createdProducts') || '[]');
      const updated = existing.filter((p: any) => p.id !== id);
      localStorage.setItem('createdProducts', JSON.stringify(updated));
    } catch (error) {
      console.warn('Failed to remove from localStorage:', error);
    }
  }

  private removeFromSessionStorage(id: string): void {
    try {
      const existing = JSON.parse(sessionStorage.getItem('sessionProducts') || '[]');
      const updated = existing.filter((p: any) => p.id !== id);
      sessionStorage.setItem('sessionProducts', JSON.stringify(updated));
    } catch (error) {
      console.warn('Failed to remove from sessionStorage:', error);
    }
  }

  private removeFromCookies(id: string): void {
    try {
      const existing = this.getCookie('cookieProducts');
      if (existing) {
        const products = JSON.parse(decodeURIComponent(existing));
        const updated = products.filter((p: any) => p.id !== id);
        this.setCookie('cookieProducts', JSON.stringify(updated));
      }
    } catch (error) {
      console.warn('Failed to remove from cookies:', error);
    }
  }

  async updateProductViews(id: string): Promise<void> {
    try {
      const product = await this.getProductById(id);
      if (product) {
        product.pageViews = (product.pageViews || 0) + 1;
        product.lastUpdated = Date.now();
        await this.saveProduct(product);
      }
    } catch (error) {
      console.warn('Failed to update product views:', error);
    }
  }

  async searchProducts(query: string): Promise<CentralizedProduct[]> {
    const allProducts = await this.getAllProducts();
    const searchTerm = query.toLowerCase();
    
    return allProducts.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      product.features.some(feature => feature.toLowerCase().includes(searchTerm))
    );
  }

  async getProductsByCategory(category: string): Promise<CentralizedProduct[]> {
    const allProducts = await this.getAllProducts();
    return allProducts.filter(product => product.category === category);
  }

  async cleanup(): Promise<void> {
    if (this.syncTimer) {
      clearInterval(this.syncTimer);
      this.syncTimer = null;
    }
  }
}

// Create and export a singleton instance
export const centralizedStorage = new CentralizedStorage();

// Export the class for testing purposes
export { CentralizedStorage };

// Cleanup on page unload
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    centralizedStorage.cleanup();
  });
}
