import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductPageTemplate from './ProductPageTemplate';
import Header from './Header';
import Footer from './Footer';
import { getDynamicProduct, registerDynamicProduct, type DynamicProduct } from '../utils/dynamicProductRegistry';
import { imageStorage } from '../utils/imageStorage';
import { translateProductData } from '../utils/autoTranslate';
import { useCountrySelector } from '../hooks/useCountrySelector';
import { getCountryConfig } from '../utils/translations';
import { unifiedStorage } from '../utils/unifiedStorage';

// Simplified template data transformation
const createTemplateData = (product: DynamicProduct & { reviews?: any[] }) => {
  // Helper to ensure string values
  const ensureString = (value: any): string => {
    if (value === null || value === undefined) return '';
    return String(value);
  };

  // Helper to ensure record of strings
  const ensureStringRecord = (obj: any): Record<string, string> => {
    const result: Record<string, string> = {};
    if (obj && typeof obj === 'object') {
      Object.entries(obj).forEach(([key, value]) => {
        result[key] = ensureString(value);
      });
    }
    return result;
  };

  // Calculate discount percentage
  const calculateDiscount = (price: string, originalPrice?: string): string | undefined => {
    if (!originalPrice) return undefined;
    try {
      const currentPrice = parseFloat(price.replace(/[£$€]/g, ''));
      const oldPrice = parseFloat(originalPrice.replace(/[£$€]/g, ''));
      if (oldPrice > currentPrice) {
        return Math.round((1 - currentPrice / oldPrice) * 100) + '%';
      }
    } catch (e) {
      console.warn('Error calculating discount:', e);
    }
    return product.discount || '90%';
  };

  // Generate breadcrumb
  const generateBreadcrumb = (category: string): string[] => {
    const categoryMap: Record<string, string[]> = {
      'Home & Garden': ['Home & Kitchen', 'Furniture', 'Storage & Organisation'],
      'Electronics': ['Electronics', 'Computers & Accessories'],
      'Clothing': ['Fashion', 'Clothing', 'Accessories'],
      'Sports': ['Sports & Outdoors', 'Exercise & Fitness'],
      'Books': ['Books', 'Literature & Fiction'],
      'Tools': ['Tools & Home Improvement', 'Hand Tools'],
      'Beauty': ['Beauty', 'Personal Care'],
      'Toys': ['Toys & Games', 'Educational Toys']
    };
    return categoryMap[category] || ['Home & Kitchen', 'General'];
  };

  // Process color options from variants or legacy colors
  let colorOptions;
  if (product.variants && product.variants.length > 0) {
    const colorVariant = product.variants.find(v => v.type === 'Color' || v.name === 'Color');
    if (colorVariant && colorVariant.options) {
      colorOptions = colorVariant.options.map((option: any) => ({
        name: option.name,
        price: product.price,
        originalPrice: product.originalPrice,
        savings: calculateDiscount(product.price, product.originalPrice),
        available: true
      }));
    }
  } else if (product.colors && product.colors.length > 0) {
    colorOptions = product.colors.map((color: any) => ({
      name: typeof color === 'string' ? color : color.name,
      price: product.price,
      originalPrice: product.originalPrice,
      savings: calculateDiscount(product.price, product.originalPrice),
      available: true
    }));
  }

  return {
    name: product.name,
    brand: product.store,
    store: product.store,
    rating: product.rating,
    ratingsCount: product.reviewCount,
    boughtInMonth: Math.floor(Math.random() * 100) + 50 + '+ bought in past month',
    amazonChoice: product.amazonChoice,
    price: product.price,
    originalPrice: product.originalPrice,
    discount: calculateDiscount(product.price, product.originalPrice),
    images: (() => {
      const valid = (product.images || []).filter(img => typeof img === 'string' && img.trim().length > 0);
      return valid.length > 0 ? valid : ['/placeholder.svg'];
    })(),
    breadcrumb: generateBreadcrumb(product.category),
    colorOptions,
    variants: product.variants || [],
    features: product.features.length > 0 ? product.features : [
      '<strong>Premium Quality:</strong> Made from high-quality materials ensuring durability',
      '<strong>Easy to Use:</strong> Simple and intuitive design perfect for everyday use',
      '<strong>Versatile Application:</strong> Suitable for various needs and multiple settings',
      '<strong>Great Value:</strong> Excellent quality at an affordable price point',
      '<strong>Customer Satisfaction:</strong> Backed by quality and service excellence'
    ],
    aboutThisItem: product.aboutThisItem.length > 0 ? product.aboutThisItem : [
      '<strong>High-Quality Construction:</strong> Built with premium materials for lasting durability',
      '<strong>Functional Design:</strong> Thoughtfully designed to meet everyday needs with style',
      '<strong>Easy Setup:</strong> Quick and simple assembly with clear instructions included',
      '<strong>Versatile Use:</strong> Perfect for various applications in any environment',
      '<strong>Satisfaction Guaranteed:</strong> Backed by quality assurance and customer support'
    ],
    productDetails: {
      'Brand': product.store,
      'Category': product.category,
      ...ensureStringRecord(product.productDetails)
    },
    technicalDetails: {
      'Brand': product.store,
      'Model Number': 'AB-' + Math.random().toString(36).substr(2, 6).toUpperCase(),
      'Product Dimensions': 'Standard size',
      'Item Weight': 'Standard weight',
      'Material': 'High-quality materials',
      'Colour': colorOptions ? colorOptions[0]?.name : 'Standard',
      'Special Features': 'Premium design',
      'Assembly Required': 'Minimal assembly',
      ...ensureStringRecord(product.technicalDetails)
    },
    productInfo: {
      'Product Dimensions': 'Standard dimensions',
      'Special Features': 'Premium quality',
      'Item Weight': 'Standard weight',
      'Material': 'High-quality materials',
      'Brand': product.store,
      'ASIN': 'B' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      'Date First Available': new Date(product.createdAt).toLocaleDateString(),
      'Manufacturer': product.store,
      ...ensureStringRecord(product.productInfo)
    },
    stockCount: Math.floor(Math.random() * 10) + 3,
    deliveryInfo: 'No Import Fees Deposit & £15.99 delivery to United Kingdom',
    quantityLimit: 1,
    safetyFeatures: ['High-quality construction', 'Safety tested'], // Will be translated in the component
    reviews: (product.reviews || []).map((review, index) => ({
      id: review.id || index,
      author: review.author || 'Customer',
      rating: typeof review.rating === 'number' ? review.rating : 5,
      title: review.title || '',
      content: review.content || '',
      date: review.date || new Date().toLocaleDateString('en-GB'),
      verified: review.verified !== false,
      helpful: typeof review.helpful === 'number' ? review.helpful : Math.floor(Math.random() * 20) + 1,
      images: Array.isArray(review.images) ? review.images : [] // These are now resolved URLs
    })),
    countryRedirects: product.countryRedirects || []
  };
};

const DynamicProductPageV2 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [templateData, setTemplateData] = useState<any>(null);
  const { selectedCountry } = useCountrySelector();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      setError(null);

      // Extract identifier from pathname
      const pathname = location.pathname;
      const identifier = pathname.startsWith('/') ? pathname.slice(1) : pathname;

      if (!identifier) {
        setError('No product identifier provided');
        setIsLoading(false);
        return;
      }

      try {
        // Get product from registry
        let product = getDynamicProduct(identifier);
        
        // Fallback: also check old createdProducts format for backward compatibility
        if (!product) {
          // Cross-browser/server fallback: try unified storage by id or slug
          try {
            const tryIds = [identifier, identifier.replace(/^\//, '')];
            for (const id of tryIds) {
              const stored = await unifiedStorage.getProductById(id);
              if (stored) {
                const route = stored.route || `/${stored.id}`;
                // Register into dynamic registry for rendering
                registerDynamicProduct({
                  id: stored.id,
                  name: stored.name,
                  slug: route.startsWith('/') ? route.slice(1) : route,
                  route,
                  price: stored.price,
                  originalPrice: stored.originalPrice,
                  images: stored.images || ['/placeholder.svg'],
                  store: stored.store || 'Amazon Basics',
                  category: stored.category || 'General',
                  rating: stored.rating || 4.5,
                  reviewCount: stored.reviewCount || stored.reviews?.length || 100,
                  aboutThisItem: stored.aboutThisItem || [],
                  features: stored.features || [],
                  productDetails: stored.productDetails || {},
                  technicalDetails: stored.technicalDetails || {},
                  productInfo: stored.specifications || {},
                  reviews: stored.reviews || [],
                  variants: stored.variants || [],
                  amazonChoice: stored.amazonChoice || false,
                  prime: stored.prime !== false,
                  countryRedirects: stored.countryRedirects || [],
                  createdAt: stored.createdAt || Date.now(),
                });
                product = getDynamicProduct(identifier) || getDynamicProduct(stored.id) || getDynamicProduct(route);
                if (product) break;
              }
            }
            // If still not found, scan all server products by route
            if (!product) {
              const all = await unifiedStorage.getAllProducts();
              const match = all.find((p) => {
                const r = p.route || `/${p.id}`;
                return r === `/${identifier.replace(/^\//, '')}` || r === location.pathname;
              });
              if (match) {
                const route = match.route || `/${match.id}`;
                registerDynamicProduct({
                  id: match.id,
                  name: match.name,
                  slug: route.startsWith('/') ? route.slice(1) : route,
                  route,
                  price: match.price,
                  originalPrice: match.originalPrice,
                  images: match.images || ['/placeholder.svg'],
                  store: match.store || 'Amazon Basics',
                  category: match.category || 'General',
                  rating: match.rating || 4.5,
                  reviewCount: match.reviewCount || match.reviews?.length || 100,
                  aboutThisItem: match.aboutThisItem || [],
                  features: match.features || [],
                  productDetails: match.productDetails || {},
                  technicalDetails: match.technicalDetails || {},
                  productInfo: match.specifications || {},
                  reviews: match.reviews || [],
                  variants: match.variants || [],
                  amazonChoice: match.amazonChoice || false,
                  prime: match.prime !== false,
                  countryRedirects: match.countryRedirects || [],
                  createdAt: match.createdAt || Date.now(),
                });
                product = getDynamicProduct(identifier) || getDynamicProduct(match.id) || getDynamicProduct(route);
              }
            }
          } catch (e) {
            console.warn('Unified storage lookup failed:', e);
          }
        }

        if (!product) {
          try {
            const createdProducts = JSON.parse(localStorage.getItem('createdProducts') || '[]');
            const foundProduct = createdProducts.find((p: any) => 
              p.id === identifier ||
              p.route === `/${identifier}` ||
              p.route === identifier ||
              p.slug === identifier ||
              p.name?.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-').substring(0, 50) === identifier
            );
            
            if (foundProduct) {
              // Convert old format to new format
              product = {
                id: foundProduct.id,
                name: foundProduct.name,
                slug: identifier,
                route: foundProduct.route || `/${identifier}`,
                price: foundProduct.price || '£9.99',
                originalPrice: foundProduct.originalPrice,
                discount: foundProduct.discount || '90%',
                images: foundProduct.images || [foundProduct.image].filter(Boolean),
                store: foundProduct.store || 'Amazon Basics',
                category: foundProduct.category || 'General',
                rating: foundProduct.rating || 4.5,
                reviewCount: foundProduct.reviews || foundProduct.reviewCount || 100,
                aboutThisItem: foundProduct.aboutThisItem || [],
                features: foundProduct.features || [],
                productDetails: foundProduct.productDetails || {},
                technicalDetails: foundProduct.technicalDetails || {},
                productInfo: foundProduct.productInfo || {},
                reviews: foundProduct.reviews || [],
                variants: foundProduct.variants || [],
                colors: foundProduct.colors || [],
                amazonChoice: foundProduct.amazonChoice || false,
                prime: foundProduct.prime || true,
                createdAt: Date.now()
              };
            }
          } catch (fallbackError) {
            console.warn('Error in fallback product lookup:', fallbackError);
          }
        }
        
        if (!product) {
          // Try one more time with registry reinitialization
          try {
            const { initializeDynamicRegistry, getDynamicProduct } = await import('../utils/dynamicProductRegistry');
            initializeDynamicRegistry();
            product = getDynamicProduct(identifier);
          } catch (retryError) {
            console.error('Retry failed:', retryError);
          }
          
          if (!product) {
            setError('Product not found');
            setIsLoading(false);
            return;
          }
        }

        // Resolve any persisted image references to usable URLs
        const resolvedImages = await imageStorage.resolveImageUrlsAsync(product.images || []);
        const resolvedVariants = Array.isArray(product.variants)
          ? await Promise.all(
              product.variants.map(async (v: any) => ({
                ...v,
                options: Array.isArray(v?.options)
                  ? await Promise.all(
                      v.options.map(async (o: any) => ({
                        ...o,
                        images: Array.isArray(o?.images)
                          ? await imageStorage.resolveImageUrlsAsync(o.images)
                          : [],
                      }))
                    )
                  : [],
              }))
            )
          : product.variants;

        // CRITICAL FIX: Resolve review images from IndexedDB
        const resolvedReviews = Array.isArray(product.reviews)
          ? await Promise.all(
              product.reviews.map(async (review: any) => ({
                ...review,
                images: Array.isArray(review?.images)
                  ? await imageStorage.resolveImageUrlsAsync(review.images)
                  : []
              }))
            )
          : [];

        console.log('🔍 Resolved review images:', {
          originalReviewCount: product.reviews?.length || 0,
          resolvedReviewCount: resolvedReviews.length,
          reviewsWithImages: resolvedReviews.filter(r => r.images && r.images.length > 0).length,
          totalResolvedImages: resolvedReviews.reduce((total, r) => total + (r.images?.length || 0), 0)
        });

        let transformed = createTemplateData({
          ...(product as any),
          images: resolvedImages,
          variants: resolvedVariants,
          reviews: resolvedReviews // Pass resolved reviews with working image URLs
        });
        try {
          const lang = getCountryConfig(selectedCountry.code).language as any;
          transformed = await translateProductData(lang, transformed);
        } catch {
          // Continue without translation if it fails
        }
        setTemplateData(transformed);
      } catch (err) {
        console.error('Error loading dynamic product:', err);
        setError('Error loading product data');
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [location.pathname, selectedCountry.code]);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#007185] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading product...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error || !templateData) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product not found</h1>
            <p className="text-gray-600 mb-4">
              {error || 'This product may have been removed or the URL is incorrect.'}
            </p>
            <button 
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-[#007185] text-white rounded hover:bg-[#005a6b] mr-2"
            >
              ← Back to Homepage
            </button>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Try Again
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Render product page
  try {
    return <ProductPageTemplate productData={templateData} />;
  } catch (renderError) {
    console.error('Error rendering product page:', renderError);
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Display Error</h1>
            <p className="text-gray-600 mb-4">
              There was an error displaying this product page.
            </p>
            <button 
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-[#007185] text-white rounded hover:bg-[#005a6b] mr-2"
            >
              ← Back to Homepage
            </button>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Try Again
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
};

export default DynamicProductPageV2;
