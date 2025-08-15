// Utility to create products from provided information
import { registerDynamicProduct } from './dynamicProductRegistry';
import { unifiedStorage } from './unifiedStorage';
import { generateAdCopy, saveAdCopy } from './generateAdCopy';
import type { CentralizedProduct } from './centralizedStorage';

export interface ProductInfo {
  name: string;
  price: string;
  originalPrice: string;
  description: string;
  category: string;
  store?: string;
  rating?: number;
  reviewCount?: number;
  features: string[];
  aboutThisItem: string[];
  productDetails?: Record<string, string>;
  technicalDetails?: Record<string, string>;
  productImages: string[];
  reviewImages?: string[];
  reviews?: Array<{
    author: string;
    rating: number;
    title: string;
    content: string;
    date: string;
    verified: boolean;
    helpful: number;
    images?: string[];
  }>;
  variants?: any[];
  amazonChoice?: boolean;
  prime?: boolean;
  countryRedirects?: Array<{countryCode: string; redirectUrl: string}>;
}

export async function createProductFromInfo(productInfo: ProductInfo): Promise<{
  success: boolean;
  productId?: string;
  route?: string;
  error?: string;
}> {
  try {
    console.log('🚀 Creating product from provided information:', productInfo.name);
    
    // Generate ID and route
    const productId = `product-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const slug = productInfo.name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
      .substring(0, 50);
    const route = `/${slug}`;
    
    // Create centralized product object
    const centralizedProduct: CentralizedProduct = {
      id: productId,
      name: productInfo.name,
      price: productInfo.price,
      originalPrice: productInfo.originalPrice,
      description: productInfo.description,
      category: productInfo.category,
      features: productInfo.features,
      images: productInfo.productImages,
      amazonChoice: productInfo.amazonChoice || false,
      prime: productInfo.prime !== false,
      rating: productInfo.rating || 4.5,
      reviews: productInfo.reviews || [],
      reviewCount: productInfo.reviewCount || productInfo.reviews?.length || 0,
      variants: productInfo.variants || [],
      specifications: productInfo.productDetails || {},
      stock: 100,
      store: productInfo.store || 'Amazon Basics',
      route,
      aboutThisItem: productInfo.aboutThisItem,
      productDetails: productInfo.productDetails || {},
      technicalDetails: productInfo.technicalDetails || {},
      countryRedirects: productInfo.countryRedirects || [],
      createdBy: 'manual',
      createdAt: Date.now(),
      pageViews: 0,
      lastUpdated: Date.now(),
      globalId: `global_${productId}`,
    };
    
    // If review images are provided, add them to the reviews
    if (productInfo.reviewImages && productInfo.reviewImages.length > 0 && centralizedProduct.reviews.length > 0) {
      // Distribute review images among reviews
      const imagesPerReview = Math.ceil(productInfo.reviewImages.length / centralizedProduct.reviews.length);
      let imageIndex = 0;
      
      centralizedProduct.reviews = centralizedProduct.reviews.map((review, reviewIndex) => {
        const reviewImages = [];
        for (let i = 0; i < imagesPerReview && imageIndex < productInfo.reviewImages!.length; i++) {
          reviewImages.push(productInfo.reviewImages![imageIndex]);
          imageIndex++;
        }
        return {
          ...review,
          images: review.images || reviewImages
        };
      });
    }
    
    // Save to unified storage
    console.log('💾 Saving product to unified storage...');
    await unifiedStorage.saveProduct(centralizedProduct);
    
    // Register in dynamic product registry
    console.log('📝 Registering product in dynamic registry...');
    registerDynamicProduct({
      id: productId,
      name: productInfo.name,
      slug,
      route,
      price: productInfo.price,
      originalPrice: productInfo.originalPrice,
      discount: calculateDiscount(productInfo.originalPrice, productInfo.price),
      images: productInfo.productImages,
      store: productInfo.store || 'Amazon Basics',
      category: productInfo.category,
      rating: productInfo.rating || 4.5,
      reviewCount: productInfo.reviewCount || productInfo.reviews?.length || 0,
      aboutThisItem: productInfo.aboutThisItem,
      features: productInfo.features,
      productDetails: productInfo.productDetails || {},
      technicalDetails: productInfo.technicalDetails || {},
      productInfo: productInfo.productDetails || {},
      reviews: centralizedProduct.reviews,
      variants: productInfo.variants,
      colors: [],
      amazonChoice: productInfo.amazonChoice || false,
      prime: productInfo.prime !== false,
      countryRedirects: productInfo.countryRedirects || [],
      createdAt: Date.now(),
      createdBy: 'manual'
    });
    
    // Generate ad copy
    console.log('📝 Generating Facebook ad copy...');
    try {
      const adCopyResult = await generateAdCopy({
        name: productInfo.name,
        price: productInfo.price,
        originalPrice: productInfo.originalPrice,
        description: productInfo.description,
        category: productInfo.category,
        features: productInfo.features,
        aboutThisItem: productInfo.aboutThisItem,
        rating: productInfo.rating || 4.5,
        reviewCount: productInfo.reviewCount || 0,
        store: productInfo.store || 'Amazon Basics'
      });
      
      if (adCopyResult && adCopyResult.headline && adCopyResult.copy) {
        await saveAdCopy(productId, productInfo.name, adCopyResult.headline, adCopyResult.copy);
        console.log('✅ Ad copy generated and saved successfully');
      }
    } catch (error) {
      console.warn('⚠️ Ad copy generation failed (non-critical):', error);
    }
    
    console.log('✅ Product created successfully!');
    
    return {
      success: true,
      productId,
      route
    };
    
  } catch (error) {
    console.error('❌ Error creating product:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

function calculateDiscount(originalPrice: string, currentPrice: string): string {
  const original = parseFloat(originalPrice.replace(/[£$€]/g, ''));
  const current = parseFloat(currentPrice.replace(/[£$€]/g, ''));
  
  if (original <= current) return '0%';
  
  const discount = Math.round(((original - current) / original) * 100);
  return `${discount}%`;
}

// Helper function to create default reviews if none provided
export function createDefaultReviews(): ProductInfo['reviews'] {
  return [
    {
      author: "Sarah M.",
      rating: 5,
      title: "Excellent quality!",
      content: "This product exceeded my expectations. The build quality is outstanding and it works exactly as described. Highly recommend!",
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      verified: true,
      helpful: 42
    },
    {
      author: "James T.",
      rating: 4,
      title: "Good value for money",
      content: "Overall happy with my purchase. The product does what it's supposed to do. Minor issue with packaging but the product itself is great.",
      date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      verified: true,
      helpful: 28
    },
    {
      author: "Emma L.",
      rating: 5,
      title: "Perfect!",
      content: "Exactly what I was looking for. Easy to use and great quality. Would definitely buy again.",
      date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
      verified: true,
      helpful: 35
    }
  ];
}
