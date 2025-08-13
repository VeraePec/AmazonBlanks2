// New simplified dynamic product registry system
// This avoids localStorage overflow by using in-memory storage with fallback mechanisms

export interface DynamicProduct {
  id: string;
  name: string;
  slug: string;
  route: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  images: string[];
  store: string;
  category: string;
  rating: number;
  reviewCount: number;
  aboutThisItem: string[];
  features: string[];
  productDetails: Record<string, string>;
  technicalDetails: Record<string, string>;
  productInfo: Record<string, string>;
  reviews: any[];
  variants?: any[];
  colors?: any[];
  amazonChoice?: boolean;
  prime?: boolean;
  countryRedirects?: Array<{countryCode: string; redirectUrl: string}>;
  createdAt: number;
  createdBy?: 'ai' | 'manual';
}

// In-memory registry for immediate access
let inMemoryRegistry: Map<string, DynamicProduct> = new Map();

// Lightweight storage for localStorage (without large images)
interface LightweightProduct {
  id: string;
  name: string;
  slug: string;
  route: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  imageCount: number; // Store count instead of actual images
  store: string;
  category: string;
  rating: number;
  reviewCount: number;
  createdAt: number;
}

// Storage keys
const STORAGE_KEY = 'dynamicProducts';
const PRODUCT_DATA_PREFIX = 'product_';

// Initialize from localStorage
export const initializeDynamicRegistry = () => {
  try {
    // Clear existing in-memory registry to prevent duplicates
    inMemoryRegistry.clear();
    
    const lightweight = localStorage.getItem(STORAGE_KEY);
    if (lightweight) {
      const products: LightweightProduct[] = JSON.parse(lightweight);
      
      // Load each product's full data
      products.forEach(lightProduct => {
        try {
          const fullDataKey = PRODUCT_DATA_PREFIX + lightProduct.id;
          const fullDataStr = localStorage.getItem(fullDataKey);
          if (fullDataStr) {
            const fullProduct = JSON.parse(fullDataStr);
            inMemoryRegistry.set(lightProduct.id, fullProduct);
          }
        } catch (err) {
          console.warn(`⚠️ Could not load full data for product ${lightProduct.id}:`, err);
        }
      });
    }
  } catch (error) {
    console.error('❌ Error initializing dynamic registry:', error);
    // Clear corrupted data and start fresh
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (clearError) {
      console.error('❌ Could not clear corrupted data:', clearError);
    }
  }
};

// Generate safe slug from name
const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

// Register a new dynamic product
export const registerDynamicProduct = (productData: any): string => {
  const timestamp = Date.now();
  const id = productData.id || `product-${timestamp}`;
  const slug = productData.slug || generateSlug(productData.name);
  const route = productData.route || `/${slug}`;

  // Create the full product object
  const fullProduct: DynamicProduct = {
    id,
    name: productData.name,
    slug,
    route,
    price: productData.price || '£9.99',
    originalPrice: productData.originalPrice,
    discount: productData.discount || '90%',
    images: Array.isArray(productData.images) ? productData.images : [],
    store: productData.store || 'Amazon Basics',
    category: productData.category || 'General',
    rating: productData.rating || 4.5,
    reviewCount: productData.reviewCount || productData.reviews?.length || Math.floor(Math.random() * 1000) + 100,
    aboutThisItem: Array.isArray(productData.aboutThisItem) ? productData.aboutThisItem : [],
    features: Array.isArray(productData.features) ? productData.features : [],
    productDetails: productData.productDetails || {},
    technicalDetails: productData.technicalDetails || {},
    productInfo: productData.productInfo || {},
    reviews: Array.isArray(productData.reviews) ? productData.reviews : [],
    variants: productData.variants,
    colors: productData.colors,
    amazonChoice: productData.amazonChoice || false,
    prime: productData.prime || true,
    countryRedirects: productData.countryRedirects || [],
    createdAt: timestamp,
    createdBy: productData.createdBy || 'ai'
  };

  // Store in memory for immediate access
  inMemoryRegistry.set(id, fullProduct);
  console.log('✅ Product registered in memory:', fullProduct.name);
  console.log('🔍 Registry - Images in fullProduct:', {
    imageCount: fullProduct.images.length,
    images: fullProduct.images.map(img => ({
      type: img.startsWith('data:') ? 'base64' : 'url',
      size: img.length,
      preview: img.substring(0, 50) + '...'
    }))
  });

  // Save to localStorage with comprehensive error handling
  try {
    // Prepare a storage-safe version to avoid exceeding localStorage quotas
    const sanitizeImagesForStorage = (images: string[] | undefined): string[] => {
      if (!Array.isArray(images)) return [];
      // Keep ALL images (including idb-ref: and blob-ref: references) but limit count to prevent large payloads
      // Only filter out raw base64 data: URLs as they should have been processed already
      return images.filter((img) => typeof img === 'string' && 
        (img.startsWith('http') || img.startsWith('/') || img.startsWith('idb-ref:') || img.startsWith('blob-ref:'))
      ).slice(0, 20);
    };

    const sanitizeReviewImages = (images: unknown): string[] => {
      if (!Array.isArray(images)) return [];
      return (images as unknown[])
        .filter((x): x is string => typeof x === 'string')
        .filter((img) => img.startsWith('http') || img.startsWith('/') || img.startsWith('idb-ref:') || img.startsWith('blob-ref:'))
        .slice(0, 3);
    };

    const sanitizeReviewsForStorage = (reviews: any[] | undefined): any[] => {
      if (!Array.isArray(reviews)) return [];
      // Keep lightweight review fields and up to 3 sanitized images per review
      return reviews.slice(0, 20).map((r) => ({
        id: r?.id,
        author: r?.author,
        rating: r?.rating,
        title: r?.title,
        content: r?.content,
        date: r?.date,
        verified: r?.verified,
        helpful: r?.helpful,
        images: sanitizeReviewImages(r?.images),
      }));
    };

    // Save lightweight version first
    const lightweight: LightweightProduct = {
      id,
      name: fullProduct.name,
      slug,
      route,
      price: fullProduct.price,
      originalPrice: fullProduct.originalPrice,
      discount: fullProduct.discount,
      imageCount: fullProduct.images.length,
      store: fullProduct.store,
      category: fullProduct.category,
      rating: fullProduct.rating,
      reviewCount: fullProduct.reviewCount,
      createdAt: timestamp
    };

    // Update main registry
    const existingLightweight = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const filteredLightweight = existingLightweight.filter((p: LightweightProduct) => p.id !== id);
    filteredLightweight.push(lightweight);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredLightweight));
    console.log('✅ Saved lightweight product to registry');

    // Save full product data
    const productForStorage = {
      ...fullProduct,
              // Store images including idb-ref: and blob-ref: references (base64 already processed)
        images: sanitizeImagesForStorage(fullProduct.images),
        // Trim large nested arrays
        reviews: sanitizeReviewsForStorage(fullProduct.reviews),
        // Ensure variants don't carry heavy image payloads accidentally
        variants: Array.isArray(fullProduct.variants)
          ? fullProduct.variants.map((v: any) => ({
              ...v,
              options: Array.isArray(v?.options)
                ? v.options.map((o: any) => ({ ...o, images: sanitizeImagesForStorage(o?.images) }))
                : [],
            }))
          : [],
    };
    localStorage.setItem(PRODUCT_DATA_PREFIX + id, JSON.stringify(productForStorage));
    console.log('✅ Saved full product data to localStorage');

    // Verify the save was successful
    const verifyLightweight = localStorage.getItem(STORAGE_KEY);
    const verifyFullData = localStorage.getItem(PRODUCT_DATA_PREFIX + id);
    
    if (!verifyLightweight || !verifyFullData) {
      throw new Error('Product data verification failed after save');
    }
    
    console.log('✅ Product save verification successful');

  } catch (storageError) {
    console.error('❌ Critical storage error:', storageError);
    
    // Try to recover by clearing corrupted data
    try {
      console.log('🔄 Attempting to recover from storage error...');
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(PRODUCT_DATA_PREFIX + id);
      console.log('🧹 Cleared potentially corrupted data');
      
      // Try saving again with a fresh start
      const lightweight: LightweightProduct = {
        id,
        name: fullProduct.name,
        slug,
        route,
        price: fullProduct.price,
        originalPrice: fullProduct.originalPrice,
        discount: fullProduct.discount,
        imageCount: fullProduct.images.length,
        store: fullProduct.store,
        category: fullProduct.category,
        rating: fullProduct.rating,
        reviewCount: fullProduct.reviewCount,
        createdAt: timestamp
      };
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify([lightweight]));
      // Save sanitized full product on recovery as well
      const recoveryProductForStorage = {
        ...fullProduct,
        images: (Array.isArray(fullProduct.images)
          ? (fullProduct.images as unknown[])
              .filter((x): x is string => typeof x === 'string')
              .filter((img) => img.startsWith('http') || img.startsWith('/') || img.startsWith('idb-ref:') || img.startsWith('blob-ref:'))
              .slice(0, 20)
          : []),
        reviews: (Array.isArray(fullProduct.reviews) ? (fullProduct.reviews as unknown[]).slice(0, 20).map((r: any) => ({
          id: r?.id,
          author: r?.author,
          rating: r?.rating,
          title: r?.title,
          content: r?.content,
          date: r?.date,
          verified: r?.verified,
          helpful: r?.helpful,
        })) : []),
        variants: Array.isArray(fullProduct.variants)
          ? fullProduct.variants.map((v: any) => ({
              ...v,
              options: Array.isArray(v?.options)
                ? v.options.map((o: any) => ({
                    ...o,
                    images: Array.isArray(o?.images)
                      ? (o.images as unknown[])
                          .filter((x): x is string => typeof x === 'string')
                          .filter((img) => img.startsWith('http') || img.startsWith('/') || img.startsWith('idb-ref:') || img.startsWith('blob-ref:'))
                          .slice(0, 20)
                      : [],
                  }))
                : [],
            }))
          : [],
      };
      localStorage.setItem(PRODUCT_DATA_PREFIX + id, JSON.stringify(recoveryProductForStorage));
      console.log('✅ Recovery save successful');
      
    } catch (recoveryError) {
      console.error('❌ Recovery failed:', recoveryError);
      // At least the product is in memory for this session
    }
  }

  return id;
};

// Update an existing product (merge fields) and persist
export const updateDynamicProduct = (productId: string, partial: Partial<DynamicProduct>): DynamicProduct | null => {
  try {
    const existing = inMemoryRegistry.get(productId);
    if (!existing) {
      return null;
    }

    const merged: DynamicProduct = {
      ...existing,
      ...partial,
      id: existing.id,
      slug: partial.slug || existing.slug,
      route: partial.route || existing.route,
      images: Array.isArray(partial.images) ? partial.images : existing.images,
      reviews: Array.isArray(partial.reviews) ? partial.reviews : existing.reviews,
      variants: partial.variants ?? existing.variants,
      colors: partial.colors ?? existing.colors,
      productDetails: partial.productDetails ? { ...existing.productDetails, ...partial.productDetails } : existing.productDetails,
      technicalDetails: partial.technicalDetails ? { ...existing.technicalDetails, ...partial.technicalDetails } : existing.technicalDetails,
      productInfo: partial.productInfo ? { ...existing.productInfo, ...partial.productInfo } : existing.productInfo,
    };

    // Update memory
    inMemoryRegistry.set(productId, merged);

    // Persist (reuse sanitization logic from register)
    try {
      const lightweight: LightweightProduct = {
        id: merged.id,
        name: merged.name,
        slug: merged.slug,
        route: merged.route,
        price: merged.price,
        originalPrice: merged.originalPrice,
        discount: merged.discount,
        imageCount: merged.images.length,
        store: merged.store,
        category: merged.category,
        rating: merged.rating,
        reviewCount: merged.reviewCount,
        createdAt: merged.createdAt,
      };

      const existingLightweight = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      const filteredLightweight = existingLightweight.filter((p: LightweightProduct) => p.id !== merged.id);
      filteredLightweight.push(lightweight);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredLightweight));

      // Sanitize heavy fields
      const sanitizeImages = (images: unknown): string[] =>
        Array.isArray(images)
          ? (images as unknown[])
              .filter((x): x is string => typeof x === 'string')
              .filter((img) => img.startsWith('http') || img.startsWith('/') || img.startsWith('idb-ref:') || img.startsWith('blob-ref:'))
              .slice(0, 50)
          : [];
      const sanitizeVariantImages = (variants: any) =>
        Array.isArray(variants)
          ? variants.map((v: any) => ({
              ...v,
              options: Array.isArray(v?.options)
                ? v.options.map((o: any) => ({
                    ...o,
                    images: sanitizeImages(o?.images),
                  }))
                : [],
            }))
          : [];
      const sanitizeReviewImages = (images: unknown): string[] =>
        Array.isArray(images)
          ? (images as unknown[])
              .filter((x): x is string => typeof x === 'string')
              .filter((img) => img.startsWith('http') || img.startsWith('/') || img.startsWith('idb-ref:') || img.startsWith('blob-ref:'))
              .slice(0, 3)
          : [];
      const sanitizeReviews = (reviews: unknown): any[] =>
        Array.isArray(reviews)
          ? (reviews as unknown[]).slice(0, 20).map((r: any) => ({
              id: r?.id,
              author: r?.author,
              rating: r?.rating,
              title: r?.title,
              content: r?.content,
              date: r?.date,
              verified: r?.verified,
              helpful: r?.helpful,
              images: sanitizeReviewImages(r?.images),
            }))
          : [];

      const productForStorage = {
        ...merged,
        images: sanitizeImages(merged.images),
        variants: sanitizeVariantImages(merged.variants),
        reviews: sanitizeReviews(merged.reviews as any[]),
      };
      localStorage.setItem(PRODUCT_DATA_PREFIX + merged.id, JSON.stringify(productForStorage));
    } catch (e) {
      console.warn('Failed to persist updated product', e);
    }

    return merged;
  } catch (e) {
    console.error('updateDynamicProduct error', e);
    return null;
  }
};

// Get a dynamic product by slug, route, or ID
export const getDynamicProduct = (identifier: string): DynamicProduct | null => {
  // Ensure registry is initialized
  if (inMemoryRegistry.size === 0) {
    initializeDynamicRegistry();
  }
  
  // First check in-memory registry
  for (const [id, product] of inMemoryRegistry) {
    const matches = [
      product.id === identifier,
      product.slug === identifier,
      product.route === identifier,
      product.route === `/${identifier}`,
      identifier === `/${product.slug}`
    ];
    
    if (matches.some(Boolean)) {
      return product;
    }
  }

  // If not found in memory, try to load from localStorage
  try {
    const lightweight = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const matchingLight = lightweight.find((p: LightweightProduct) => 
      p.id === identifier ||
      p.slug === identifier ||
      p.route === identifier ||
      p.route === `/${identifier}` ||
      identifier === `/${p.slug}`
    );

    if (matchingLight) {
      const fullDataStr = localStorage.getItem(PRODUCT_DATA_PREFIX + matchingLight.id);
      if (fullDataStr) {
        const fullProduct = JSON.parse(fullDataStr);
        
        // Add back to memory for faster future access
        inMemoryRegistry.set(matchingLight.id, fullProduct);

        return fullProduct;
      }
    }
  } catch (error) {
    console.error('Error loading product from localStorage:', error);
  }

  return null;
};

// Get all dynamic products (full versions for admin dashboard)
export const getAllDynamicProducts = (): DynamicProduct[] => {
  // Ensure registry is initialized
  if (inMemoryRegistry.size === 0) {
    initializeDynamicRegistry();
  }
  
  const products: DynamicProduct[] = [];
  
  // Get from in-memory first
  for (const [id, product] of inMemoryRegistry) {
    products.push({
      ...product,
      createdBy: 'ai' // Tag AI products
    });
  }
  
  // Also load any that might be in localStorage but not in memory
  try {
    const lightweight = localStorage.getItem(STORAGE_KEY);
    if (lightweight) {
      const lightProducts: LightweightProduct[] = JSON.parse(lightweight);
      
      for (const lightProduct of lightProducts) {
        // Skip if already in memory
        if (inMemoryRegistry.has(lightProduct.id)) continue;
        
        try {
          const fullDataStr = localStorage.getItem(PRODUCT_DATA_PREFIX + lightProduct.id);
          if (fullDataStr) {
            const fullProduct = JSON.parse(fullDataStr);
            products.push({
              ...fullProduct,
              createdBy: 'ai' // Tag AI products
            });
            // Also add to memory for future access
            inMemoryRegistry.set(lightProduct.id, fullProduct);
          }
        } catch (err) {
          console.warn(`Could not load full data for product ${lightProduct.id}:`, err);
        }
      }
    }
  } catch (error) {
    console.error('Error loading dynamic products:', error);
  }
  
  // Sort products by creation date (most recent first)
  return products.sort((a, b) => {
    if (a.createdAt && b.createdAt) {
      return b.createdAt - a.createdAt;
    }
    // If only one has creation date, prioritize it
    if (a.createdAt && !b.createdAt) return -1;
    if (!a.createdAt && b.createdAt) return 1;
    // If neither has creation date, maintain original order
    return 0;
  });
};

// Delete a dynamic product
export const deleteDynamicProduct = (productId: string): boolean => {
  try {
    // Remove from in-memory registry
    inMemoryRegistry.delete(productId);
    
    // Remove from localStorage lightweight registry
    const lightweight = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const filteredLightweight = lightweight.filter((p: LightweightProduct) => p.id !== productId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredLightweight));
    
    // Remove full product data
    localStorage.removeItem(PRODUCT_DATA_PREFIX + productId);
    
    console.log('✅ Product deleted:', productId);
    return true;
  } catch (error) {
    console.error('Error deleting product:', error);
    return false;
  }
};

// Get lightweight dynamic products (for backward compatibility)
export const getLightweightDynamicProducts = (): LightweightProduct[] => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch (error) {
    console.error('Error loading products list:', error);
    return [];
  }
};

// Clean up products by name pattern (for test cleanup)
export const cleanupProductsByName = (namePattern: string): number => {
  let deletedCount = 0;
  const pattern = namePattern.toLowerCase();
  
  // Clean from in-memory registry
  for (const [id, product] of inMemoryRegistry) {
    if (product.name.toLowerCase().includes(pattern)) {
      inMemoryRegistry.delete(id);
      deletedCount++;
    }
  }
  
  // Clean from localStorage
  try {
    const lightweight = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const filteredLightweight = lightweight.filter((p: LightweightProduct) => {
      const shouldDelete = p.name.toLowerCase().includes(pattern);
      if (shouldDelete) {
        // Remove full product data
        localStorage.removeItem(PRODUCT_DATA_PREFIX + p.id);
        deletedCount++;
      }
      return !shouldDelete;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredLightweight));
  } catch (error) {
    console.error('Error cleaning up products:', error);
  }
  
  console.log(`🧹 Cleaned up ${deletedCount} products matching "${namePattern}"`);
  return deletedCount;
};

// Force reinitialize the registry (useful for debugging)
export const forceReinitializeRegistry = () => {
  console.log('🔄 Force reinitializing dynamic registry...');
  inMemoryRegistry.clear();
  initializeDynamicRegistry();
  return {
    inMemoryCount: inMemoryRegistry.size,
    localStorageKeys: Object.keys(localStorage).filter(key => 
      key === STORAGE_KEY || key.startsWith(PRODUCT_DATA_PREFIX)
    ),
    registryProducts: Array.from(inMemoryRegistry.values()).map(p => ({
      id: p.id,
      name: p.name,
      route: p.route,
      imageCount: p.images.length
    }))
  };
};

// Debug the current state of the registry
export const debugDynamicRegistry = () => {
  const lightweight = localStorage.getItem(STORAGE_KEY);
  const lightweightProducts = lightweight ? JSON.parse(lightweight) : [];
  
  const fullDataKeys = Object.keys(localStorage).filter(key => key.startsWith(PRODUCT_DATA_PREFIX));
  const fullDataProducts = fullDataKeys.map(key => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return { error: 'Failed to parse', key };
    }
  }).filter(Boolean);

  return {
    inMemory: {
      count: inMemoryRegistry.size,
      products: Array.from(inMemoryRegistry.values()).map(p => ({
        id: p.id,
        name: p.name,
        route: p.route,
        imageCount: p.images.length,
        createdAt: p.createdAt
      }))
    },
    localStorage: {
      lightweightCount: lightweightProducts.length,
      lightweightProducts: lightweightProducts.map((p: any) => ({
        id: p.id,
        name: p.name,
        route: p.route,
        imageCount: p.imageCount
      })),
      fullDataCount: fullDataProducts.length,
      fullDataKeys: fullDataKeys
    },
    summary: {
      totalProducts: inMemoryRegistry.size,
      localStorageSize: new Blob([JSON.stringify(lightweightProducts)]).size,
      potentialIssues: []
    }
  };
};

// Clear all dynamic products
export const clearDynamicProducts = () => {
  inMemoryRegistry.clear();
  try {
    localStorage.removeItem(STORAGE_KEY);
    // Remove individual product data
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith(PRODUCT_DATA_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.error('Error clearing products:', error);
  }
};

// Debug function to check what products are stored
export const debugProductStorage = () => {
  console.log('=== DYNAMIC PRODUCT STORAGE DEBUG ===');
  console.log('In-memory registry size:', inMemoryRegistry.size);
  console.log('In-memory products:');
  for (const [id, product] of inMemoryRegistry) {
    console.log(`  ${id}: ${product.name} (${product.route})`);
  }
  
  try {
    const lightweight = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    console.log('localStorage lightweight products:', lightweight.length);
    lightweight.forEach((p: LightweightProduct) => {
      console.log(`  ${p.id}: ${p.name} (${p.route})`);
    });
    
    const createdProducts = JSON.parse(localStorage.getItem('createdProducts') || '[]');
    console.log('localStorage createdProducts:', createdProducts.length);
    createdProducts.forEach((p: any) => {
      console.log(`  ${p.id}: ${p.name} (${p.route})`);
    });
  } catch (error) {
    console.error('Error reading localStorage:', error);
  }
};

// Initialization is handled in main.tsx to ensure proper timing
// initializeDynamicRegistry();

// Make debug and utility functions available globally for testing
(window as any).debugDynamicRegistry = () => {
  return debugDynamicRegistry();
};

(window as any).forceReinitializeRegistry = () => {
  return forceReinitializeRegistry();
};

(window as any).getAllAIProducts = () => {
  const products = getAllDynamicProducts();
  console.log('🔍 All AI Products:', products);
  return products;
};

(window as any).checkDataCorruption = () => {
  const debug = debugDynamicRegistry();
  const issues = [];
  
  // Check for mismatches between lightweight and full data
  if (debug.localStorage.lightweightCount !== debug.localStorage.fullDataCount) {
    issues.push(`Mismatch: ${debug.localStorage.lightweightCount} lightweight vs ${debug.localStorage.fullDataCount} full data products`);
  }
  
  // Check for products in memory but not in localStorage
  const memoryIds = new Set<string>((debug.inMemory.products as any[]).map((p: any) => String(p.id)));
  const storageIds = new Set<string>((debug.localStorage.lightweightProducts as any[]).map((p: any) => String(p.id)));
  
  const missingFromStorage: string[] = Array.from(memoryIds).filter((id: string) => !storageIds.has(id));
  const missingFromMemory: string[] = Array.from(storageIds).filter((id: string) => !memoryIds.has(id));
  
  if (missingFromStorage.length > 0) {
    issues.push(`Products in memory but missing from storage: ${missingFromStorage.join(', ')}`);
  }
  
  if (missingFromMemory.length > 0) {
    issues.push(`Products in storage but missing from memory: ${missingFromMemory.join(', ')}`);
  }
  
  return {
    ...debug,
    issues,
    recommendations: issues.length > 0 ? ['Run forceReinitializeRegistry() to fix issues'] : ['Registry is healthy']
  };
};
