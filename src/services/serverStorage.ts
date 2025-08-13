import { CentralizedProduct } from '../utils/centralizedStorage';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-production-domain.com/api' 
  : 'http://localhost:3002/api';

class ServerStorage {
  private isOnline: boolean = true;
  private offlineQueue: Array<() => Promise<void>> = [];
  private retryInterval: NodeJS.Timeout | null = null;

  constructor() {
    this.checkOnlineStatus();
    this.setupOnlineOfflineListeners();
    this.startRetryTimer();
  }

  private setupOnlineOfflineListeners(): void {
    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => {
        this.isOnline = true;
        this.processOfflineQueue();
        console.log('🌐 Back online - processing offline queue');
      });

      window.addEventListener('offline', () => {
        this.isOnline = false;
        console.log('📴 Gone offline - queuing operations');
      });
    }
  }

  private async checkOnlineStatus(): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/health`, { 
        method: 'GET',
        signal: AbortSignal.timeout(5000) // 5 second timeout
      });
      this.isOnline = response.ok;
    } catch (error) {
      this.isOnline = false;
      console.warn('Server health check failed:', error);
    }
  }

  private startRetryTimer(): void {
    if (this.retryInterval) {
      clearInterval(this.retryInterval);
    }
    
    this.retryInterval = setInterval(() => {
      if (!this.isOnline) {
        this.checkOnlineStatus();
      }
    }, 30000); // Check every 30 seconds
  }

  private async processOfflineQueue(): Promise<void> {
    if (this.offlineQueue.length === 0) return;

    console.log(`🔄 Processing ${this.offlineQueue.length} queued operations...`);
    
    const queue = [...this.offlineQueue];
    this.offlineQueue = [];

    for (const operation of queue) {
      try {
        await operation();
      } catch (error) {
        console.error('Failed to process queued operation:', error);
        // Re-queue failed operations
        this.offlineQueue.push(operation);
      }
    }
  }

  private async makeRequest<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  async saveProduct(product: CentralizedProduct): Promise<CentralizedProduct> {
    const operation = async () => {
      const result = await this.makeRequest<{ success: boolean; product: CentralizedProduct }>(
        '/products',
        {
          method: 'POST',
          body: JSON.stringify(product),
        }
      );
      return result.product;
    };

    if (this.isOnline) {
      try {
        return await operation();
      } catch (error) {
        console.warn('Online save failed, queuing for retry:', error);
        this.offlineQueue.push(operation);
        throw error;
      }
    } else {
      console.log('📴 Offline - queuing product save');
      this.offlineQueue.push(operation);
      return product; // Return the product as if it was saved
    }
  }

  async getAllProducts(): Promise<CentralizedProduct[]> {
    try {
      return await this.makeRequest<CentralizedProduct[]>('/products');
    } catch (error) {
      console.error('Failed to fetch products from server:', error);
      return [];
    }
  }

  async getProductById(id: string): Promise<CentralizedProduct | null> {
    try {
      return await this.makeRequest<CentralizedProduct>(`/products/${id}`);
    } catch (error) {
      console.error(`Failed to fetch product ${id} from server:`, error);
      return null;
    }
  }

  async deleteProduct(id: string): Promise<boolean> {
    const operation = async () => {
      const result = await this.makeRequest<{ success: boolean }>(
        `/products/${id}`,
        { method: 'DELETE' }
      );
      return result.success;
    };

    if (this.isOnline) {
      try {
        return await operation();
      } catch (error) {
        console.warn('Online delete failed, queuing for retry:', error);
        this.offlineQueue.push(operation);
        throw error;
      }
    } else {
      console.log('📴 Offline - queuing product deletion');
      this.offlineQueue.push(operation);
      return true; // Assume deletion was successful
    }
  }

  async updateProductViews(id: string): Promise<number> {
    try {
      const result = await this.makeRequest<{ success: boolean; pageViews: number }>(
        `/products/${id}/views`,
        { method: 'POST' }
      );
      return result.pageViews;
    } catch (error) {
      console.error(`Failed to update product views for ${id}:`, error);
      return 0;
    }
  }

  async searchProducts(query: string): Promise<CentralizedProduct[]> {
    try {
      return await this.makeRequest<CentralizedProduct[]>(`/products/search/${encodeURIComponent(query)}`);
    } catch (error) {
      console.error(`Failed to search products for "${query}":`, error);
      return [];
    }
  }

  async getProductsByCategory(category: string): Promise<CentralizedProduct[]> {
    try {
      return await this.makeRequest<CentralizedProduct[]>(`/products/category/${encodeURIComponent(category)}`);
    } catch (error) {
      console.error(`Failed to fetch products for category "${category}":`, error);
      return [];
    }
  }

  async syncProducts(products: CentralizedProduct[]): Promise<{ success: boolean; count: number; message: string }> {
    try {
      return await this.makeRequest<{ success: boolean; count: number; message: string }>(
        '/products/sync',
        {
          method: 'POST',
          body: JSON.stringify({ products }),
        }
      );
    } catch (error) {
      console.error('Failed to sync products with server:', error);
      throw error;
    }
  }

  async getServerHealth(): Promise<{ status: string; timestamp: string; uptime: number }> {
    try {
      return await this.makeRequest<{ status: string; timestamp: string; uptime: number }>('/health');
    } catch (error) {
      console.error('Failed to get server health:', error);
      return { status: 'unhealthy', timestamp: new Date().toISOString(), uptime: 0 };
    }
  }

  // Migration helper to sync existing localStorage products with server
  async migrateFromLocalStorage(): Promise<void> {
    try {
      const existingProducts = localStorage.getItem('createdProducts');
      if (existingProducts) {
        const products = JSON.parse(existingProducts);
        console.log(`🔄 Migrating ${products.length} products from localStorage to server...`);
        
        const result = await this.syncProducts(products);
        console.log(`✅ Migration complete: ${result.message}`);
        
        // Clear localStorage after successful migration
        localStorage.removeItem('createdProducts');
        console.log('🧹 localStorage cleared after successful migration');
      }
    } catch (error) {
      console.error('Migration failed:', error);
      throw error;
    }
  }

  // Get offline queue status
  getOfflineQueueStatus(): { isOnline: boolean; queuedOperations: number } {
    return {
      isOnline: this.isOnline,
      queuedOperations: this.offlineQueue.length,
    };
  }

  // Manual retry of offline operations
  async retryOfflineOperations(): Promise<void> {
    if (this.offlineQueue.length > 0) {
      console.log(`🔄 Manually retrying ${this.offlineQueue.length} offline operations...`);
      await this.processOfflineQueue();
    }
  }

  // Cleanup
  cleanup(): void {
    if (this.retryInterval) {
      clearInterval(this.retryInterval);
      this.retryInterval = null;
    }
  }
}

// Create and export a singleton instance
export const serverStorage = new ServerStorage();

// Export the class for testing purposes
export { ServerStorage };

// Cleanup on page unload
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    serverStorage.cleanup();
  });
}
