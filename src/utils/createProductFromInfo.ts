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

// Function to create the Keter Storage Shed product specifically
export async function createKeterStorageShed(): Promise<{
  success: boolean;
  productId?: string;
  route?: string;
  error?: string;
}> {
  const productInfo: ProductInfo = {
    name: 'Keter Store it Out Nova Outdoor Garden Storage Shed',
    price: '£125.00',
    originalPrice: '£181.02',
    description: 'Ideal outdoor storage solution for garden tools and equipment, BBQ and accessories and x2 120L wheelie bins. Elegant wood effect panels that opens from the top or the front and with a lockable feature for secure closure.',
    category: 'Garden Storage',
    store: 'Keter',
    rating: 4.4,
    reviewCount: 7246,
    features: [
      '880L storage capacity',
      'Light Grey with Dark Grey Lid',
      'Resin construction with wood effect finish',
      'UV resistant and waterproof',
      'Lockable for security',
      'Built-in shelf support',
      'Ventilated design',
      'Heavy-duty floor panel',
      'Easy assembly',
      'Weatherproof outdoor storage'
    ],
    aboutThisItem: [
      'Ideal outdoor storage solution for garden tools and equipment, BBQ and accessories and x2 120L wheelie bins.',
      'Elegant wood effect panels that opens from the top or the front and with a lockable feature for secure closure.',
      'Heavy-duty floor with built-in support for shelving and 880 L capacity. Shelves not included.',
      'Assembled dimensions: 132 x 71.5 x 113.5 cm (L x W x H); internal dimensions: 122 x 61 x 108.8 cm (L x W x H).',
      'Weatherproof, zero maintenance, easy clean, fade free construction.',
      'Built-in ventilation panels for ample airflow.',
      'Two doors on front and a top lid with unique locking system.',
      'Can lock doors and top together or just lock doors for child-safe access from above (padlock not included).',
      'Assembly time: approximately 20-40 minutes, recommended for 1 person.'
    ],
    productDetails: {
      'Brand': 'Keter',
      'Colour': 'Light Grey with Dark Cover',
      'Material': 'Resin',
      'Product Dimensions': '71.5D x 132W x 113.5H centimetres',
      'Item Weight': '21.5 Kilograms',
      'Volume': '880 litres',
      'UV Protection': 'UV Resistant',
      'Special Features': 'Heavy Duty, Water-Resistant, Waterproof',
      'Usage': 'outdoor storage, indoor storage, garden storage',
      'Assembly Time': '20-40 minutes',
      'Recommended Assembly': '1 person'
    },
    technicalDetails: {
      'Manufacturer': 'Keter',
      'Part Number': '249317',
      'Item Model Number': '249317',
      'Size': '132 x 71.5 x 113.5 cm',
      'Style': 'Single',
      'Pattern': 'Single',
      'Shape': 'Horizontal',
      'Item Package Quantity': '1',
      'Batteries Required': 'No',
      'ASIN': 'B08XQVQPQ5',
      'Date First Available': '1 Mar. 2021'
    },
    productImages: [
      'https://m.media-amazon.com/images/I/81nkADjDAbL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/910TF1aqBKL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/91L1fuj4+hL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/81ByjoSNTZL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/911s9OrxX-L._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/611Ypdn2IlL._AC_SL1500_.jpg'
    ],
    reviewImages: [
      'https://m.media-amazon.com/images/I/810IFH0goHL.jpg',
      'https://m.media-amazon.com/images/I/81THZPlwE7L.jpg',
      'https://m.media-amazon.com/images/I/714V2x9+LKL.jpg',
      'https://m.media-amazon.com/images/I/71FX507VNHL.jpg',
      'https://m.media-amazon.com/images/I/81zZUOHACSL.jpg'
    ],
    reviews: [
      {
        author: 'PaTi',
        rating: 5,
        title: 'Your Space-Saving Storage Solution!',
        content: 'The Keter 249317 Store it Out Nova Outdoor Garden Storage Shed is the perfect storage solution for your outdoor space. With its compact size and clever design, this storage shed offers ample space to keep your garden tools, equipment, and other belongings organized and protected from the elements.',
        date: '2023-07-23',
        verified: true,
        helpful: 45,
        images: ['https://m.media-amazon.com/images/I/810IFH0goHL.jpg']
      },
      {
        author: 'Miss Pickles',
        rating: 5,
        title: 'Fab',
        content: 'Once built, the storage unit appears nice and sturdy. Everything lines up during build and the lock device is a nice touch. You have two holes for locks. I haven\'t noticed any leaks of yet!!',
        date: '2025-06-04',
        verified: true,
        helpful: 6,
        images: ['https://m.media-amazon.com/images/I/81THZPlwE7L.jpg']
      },
      {
        author: 'Steve Bowden',
        rating: 4,
        title: 'Great product, easy to assemble, neat and tidy storage for garden stuff',
        content: 'Great product, easy to assemble, neat and tidy storage for garden stuff. The only criticism is that it does not have a simple lid stay, so you need to hold up the lid with one hand.',
        date: '2025-08-08',
        verified: true,
        helpful: 1,
        images: ['https://m.media-amazon.com/images/I/714V2x9+LKL.jpg']
      }
    ],
    variants: [
      {
        name: 'Size',
        options: [
          { name: '132 x 71.5 x 113.5 cm', price: '£125.00', selected: true },
          { name: 'Ultra', price: '£181.02' }
        ]
      },
      {
        name: 'Colour',
        options: [
          { name: 'Light Grey with Dark Cover', price: '£125.00', selected: true },
          { name: 'Beige Brown', price: '£125.00' },
          { name: 'Dark Grey', price: '£125.00' }
        ]
      }
    ],
    amazonChoice: true,
    prime: true,
    countryRedirects: []
  };

  return createProductFromInfo(productInfo);
}
