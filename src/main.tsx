import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initializeDynamicRegistry } from './utils/dynamicProductRegistry'
import { unifiedStorage } from './utils/unifiedStorage'
import type { CentralizedProduct } from './utils/centralizedStorage'
import { imageStorage } from './utils/imageStorage'

// Initialize dynamic product registry on app start
console.log('🔍 App starting - initializing dynamic registry...');
try {
  initializeDynamicRegistry();
  console.log('✅ Dynamic registry initialized successfully');
} catch (error) {
  console.error('❌ Failed to initialize dynamic registry:', error);
}

// Cross-browser fix: pull any server products into local dynamic registry on startup
(async () => {
  try {
    // One-time migration of any legacy local products to the server
    try {
      await unifiedStorage.migrateFromLocalStorage();
    } catch {}

    // Additionally migrate AI dynamic products (dynamicProducts + product_*) from this browser to server
    try {
      const lightweightStr = localStorage.getItem('dynamicProducts');
      if (lightweightStr) {
        const lightweight = JSON.parse(lightweightStr) as Array<{ id: string }>; 
        for (const lp of lightweight) {
          try {
            const fullStr = localStorage.getItem('product_' + lp.id);
            if (!fullStr) continue;
            const p = JSON.parse(fullStr);
            const route = p.route || `/${p.id}`;
            // Normalize any non-portable image references into portable data URLs for server
            const toDataUrl = async (url: string): Promise<string> => {
              try {
                const res = await fetch(url);
                const blob = await res.blob();
                return await new Promise<string>((resolve, reject) => {
                  const reader = new FileReader();
                  reader.onloadend = () => resolve(String(reader.result));
                  reader.onerror = reject;
                  reader.readAsDataURL(blob);
                });
              } catch {
                return url;
              }
            };

            const normalizeImages = async (images: unknown): Promise<string[]> => {
              if (!Array.isArray(images)) return ['/placeholder.svg'];
              const out: string[] = [];
              for (const img of images) {
                if (typeof img !== 'string') continue;
                if (img.startsWith('idb-ref:') || img.startsWith('blob-ref:')) {
                  const objectUrl = await imageStorage.resolveImageUrlAsync(img);
                  out.push(await toDataUrl(objectUrl));
                } else if (img.startsWith('blob:')) {
                  out.push(await toDataUrl(img));
                } else {
                  out.push(img);
                }
              }
              return out;
            };

            const normalizedImages = await normalizeImages(p.images);
            const normalizedReviews = Array.isArray(p.reviews)
              ? await Promise.all(
                  p.reviews.map(async (r: any) => ({
                    ...r,
                    images: await normalizeImages(r?.images),
                  }))
                )
              : [];

            const centralized: CentralizedProduct = {
              id: p.id,
              name: p.name,
              price: p.price || '£9.99',
              originalPrice: p.originalPrice || '£9.99',
              description: p.productInfo?.Description || p.aboutThisItem?.[0] || '',
              category: p.category || 'General',
              features: Array.isArray(p.features) ? p.features : [],
              images: normalizedImages,
              amazonChoice: !!p.amazonChoice,
              prime: p.prime !== false,
              rating: typeof p.rating === 'number' ? p.rating : 4.5,
              reviews: normalizedReviews,
              reviewCount: p.reviewCount || p.reviews?.length || 100,
              variants: Array.isArray(p.variants) ? p.variants : [],
              specifications: p.productInfo || {},
              stock: 100,
              store: p.store || 'Amazon Basics',
              route,
              aboutThisItem: Array.isArray(p.aboutThisItem) ? p.aboutThisItem : [],
              productDetails: p.productDetails || {},
              technicalDetails: p.technicalDetails || {},
              countryRedirects: Array.isArray(p.countryRedirects) ? p.countryRedirects : [],
              createdBy: p.createdBy || 'ai',
              createdAt: p.createdAt || Date.now(),
              pageViews: p.pageViews || 0,
              lastUpdated: Date.now(),
              globalId: `global_${p.id}`,
            };
            await unifiedStorage.saveProduct(centralized);
          } catch (e) {
            console.warn('Skipping dynamic product migration due to parse/save error', e);
          }
        }
      }
    } catch (e) {
      console.warn('Dynamic products migration skipped:', e);
    }

    const products = await unifiedStorage.getAllProducts();
    if (Array.isArray(products) && products.length > 0) {
      const { registerDynamicProduct } = await import('./utils/dynamicProductRegistry');
      for (const p of products) {
        try {
          const route = p.route || `/${p.id}`;
          registerDynamicProduct({
            id: p.id,
            name: p.name,
            slug: (route.startsWith('/') ? route.slice(1) : route) || p.id,
            route,
            price: p.price,
            originalPrice: p.originalPrice,
            images: p.images || ['/placeholder.svg'],
            store: p.store || 'Amazon Basics',
            category: p.category || 'General',
            rating: p.rating || 4.5,
            reviewCount: p.reviewCount || p.reviews?.length || 100,
            aboutThisItem: p.aboutThisItem || [],
            features: p.features || [],
            productDetails: p.productDetails || {},
            technicalDetails: p.technicalDetails || {},
            productInfo: p.specifications || {},
            reviews: p.reviews || [],
            variants: p.variants || [],
            amazonChoice: p.amazonChoice || false,
            prime: p.prime !== false,
            countryRedirects: p.countryRedirects || [],
            createdAt: p.createdAt || Date.now(),
            createdBy: p.createdBy || 'ai',
          });
        } catch (e) {
          console.warn('Failed to hydrate dynamic product from server storage', e);
        }
      }
      console.log(`✅ Hydrated ${products.length} products from unified storage`);
      try { window.dispatchEvent(new Event('unified-storage-hydrated')); } catch {}
    }
  } catch (e) {
    console.warn('Unified storage hydration skipped:', e);
  }
})();

createRoot(document.getElementById("root")!).render(<App />);
