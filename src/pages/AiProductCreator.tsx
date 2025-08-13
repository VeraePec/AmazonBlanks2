import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  ArrowLeft, Upload, Link, Loader, CheckCircle, AlertCircle,
  Plus, X, Image as ImageIcon, Copy, Sparkles, HelpCircle
} from 'lucide-react';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { parseAmazonProductData, ProductData } from '../services/openaiService';
import { unifiedStorage } from '../utils/unifiedStorage';
import type { CentralizedProduct } from '../utils/centralizedStorage';
import { imageStorage } from '../utils/imageStorage';
import { autoAssignCollection } from '../data/productRegistry';
import { registerDynamicProduct, getDynamicProduct, updateDynamicProduct } from '../utils/dynamicProductRegistry';
import { generateAdCopy, saveAdCopy } from '../utils/generateAdCopy';

interface CountryRedirect {
  countryCode: string;
  redirectUrl: string;
}

// Helper component for tooltips
const HelpTooltip: React.FC<{ text: string }> = ({ text }) => (
  <div className="relative group">
    <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
      {text}
    </div>
  </div>
);

const AiProductCreator: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAdminAuth();
  const [searchParams] = useSearchParams();
  
  // Edit mode
  const editProductId = searchParams.get('edit');
  const isEditMode = !!editProductId;
  const [isLoadingProduct, setIsLoadingProduct] = useState(isEditMode);
  
  // PIN protection
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  
  // Form state
  const [amazonText, setAmazonText] = useState('');
  const [productImages, setProductImages] = useState<string[]>([]);
  const [reviewImages, setReviewImages] = useState<string[]>([]);
  const [countryRedirects, setCountryRedirects] = useState<CountryRedirect[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [result, setResult] = useState<{success: boolean, message: string, productData?: ProductData} | null>(null);
  
  // File input refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const reviewImageInputRef = useRef<HTMLInputElement>(null);
  
  // Drag and drop state
  const [draggedImageIndex, setDraggedImageIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  // Countries available for redirects (matching the Country Selector)
  const AVAILABLE_COUNTRIES = [
    { name: 'United Kingdom', code: 'UK', flag: '🇬🇧' },
    { name: 'Denmark', code: 'DK', flag: '🇩🇰' },
    { name: 'Norway', code: 'NO', flag: '🇳🇴' },
    { name: 'Switzerland', code: 'CH', flag: '🇨🇭' },
    { name: 'France', code: 'FR', flag: '🇫🇷' },
    { name: 'Spain', code: 'ES', flag: '🇪🇸' },
    { name: 'Turkey', code: 'TR', flag: '🇹🇷' }
  ];

  // Valid product categories (matching admin dashboard)
  const VALID_CATEGORIES = [
    'Home & Garden', 'Electronics', 'Clothing', 'Sports & Outdoors',
    'Beauty', 'Books', 'Health & Personal Care', 'Baby', 'Toys & Games',
    'Automotive', 'Tools & Home Improvement', 'Office Products'
  ];

  // Category validation and assignment function
  const validateAndAssignCategory = (productName: string, description: string, features: string[], aiCategory?: string): string => {
    // If AI provided a valid category, use it
    if (aiCategory && VALID_CATEGORIES.includes(aiCategory)) {
      return aiCategory;
    }

    // Analyze product information to determine the best category
    const productText = `${productName} ${description} ${features.join(' ')}`.toLowerCase();
    
    // Category detection logic
    if (productText.includes('furniture') || productText.includes('home') || productText.includes('garden') || 
        productText.includes('kitchen') || productText.includes('storage') || productText.includes('decor')) {
      return 'Home & Garden';
    }
    if (productText.includes('phone') || productText.includes('computer') || productText.includes('laptop') || 
        productText.includes('electronic') || productText.includes('gadget') || productText.includes('audio') || 
        productText.includes('video') || productText.includes('smart')) {
      return 'Electronics';
    }
    if (productText.includes('shirt') || productText.includes('dress') || productText.includes('pants') || 
        productText.includes('shoes') || productText.includes('clothing') || productText.includes('fashion') || 
        productText.includes('apparel')) {
      return 'Clothing';
    }
    if (productText.includes('sport') || productText.includes('fitness') || productText.includes('outdoor') || 
        productText.includes('camping') || productText.includes('exercise') || productText.includes('gym')) {
      return 'Sports & Outdoors';
    }
    if (productText.includes('beauty') || productText.includes('cosmetic') || productText.includes('skincare') || 
        productText.includes('makeup') || productText.includes('hair') || productText.includes('perfume')) {
      return 'Beauty';
    }
    if (productText.includes('book') || productText.includes('magazine') || productText.includes('reading') || 
        productText.includes('educational') || productText.includes('textbook')) {
      return 'Books';
    }
    if (productText.includes('health') || productText.includes('medical') || productText.includes('vitamin') || 
        productText.includes('medicine') || productText.includes('hygiene') || productText.includes('care')) {
      return 'Health & Personal Care';
    }
    if (productText.includes('baby') || productText.includes('infant') || productText.includes('nursery') || 
        productText.includes('toddler') || productText.includes('diaper') || productText.includes('feeding')) {
      return 'Baby';
    }
    if (productText.includes('toy') || productText.includes('game') || productText.includes('puzzle') || 
        productText.includes('play') || productText.includes('entertainment') || productText.includes('fun')) {
      return 'Toys & Games';
    }
    if (productText.includes('car') || productText.includes('auto') || productText.includes('vehicle') || 
        productText.includes('motor') || productText.includes('tire') || productText.includes('engine')) {
      return 'Automotive';
    }
    if (productText.includes('tool') || productText.includes('drill') || productText.includes('hammer') || 
        productText.includes('saw') || productText.includes('hardware') || productText.includes('diy') || 
        productText.includes('construction')) {
      return 'Tools & Home Improvement';
    }
    if (productText.includes('office') || productText.includes('stationery') || productText.includes('paper') || 
        productText.includes('pen') || productText.includes('business') || productText.includes('workplace')) {
      return 'Office Products';
    }
    
    // Default fallback
    return 'Home & Garden';
  };

  // Load product data for editing
  useEffect(() => {
    if (isEditMode && editProductId && isAuthenticated) {
      setIsLoadingProduct(true);
      try {
        const existingProduct = getDynamicProduct(editProductId);
        if (existingProduct) {
          console.log('📝 Loading product for editing:', existingProduct);
          
          // Populate form with resolved images (idb-ref/blob-ref -> object URLs) for editing preview
          (async () => {
            try {
              const resolvedMain = await imageStorage.resolveImageUrlsAsync(existingProduct.images || []);
              setProductImages(resolvedMain);
            } catch {
              // Continue silently
            }
            try {
              const reviewImgs = (existingProduct.reviews || [])
                .flatMap((r: any) => Array.isArray(r?.images) ? r.images : []);
              if (reviewImgs.length > 0) {
                const resolvedReview = await imageStorage.resolveImageUrlsAsync(reviewImgs);
                setReviewImages(resolvedReview);
              } else {
                setReviewImages([]);
              }
            } catch {
              // Continue silently
            }
          })();
          setCountryRedirects(existingProduct.countryRedirects || []);
          
          // Create a mock Amazon text from the existing product data
          const mockText = `${existingProduct.name}\n\nAbout this item:\n${existingProduct.aboutThisItem?.join('\n') || ''}\n\nFeatures:\n${existingProduct.features?.join('\n') || ''}`;
          setAmazonText(mockText);
          
          console.log('✅ Product loaded successfully for editing');
        } else {
          console.error('❌ Product not found for editing:', editProductId);
          setResult({
            success: false,
            message: 'Product not found. It may have been deleted or moved.'
          });
        }
      } catch (error) {
        console.error('❌ Error loading product for editing:', error);
        setResult({
          success: false,
          message: 'Error loading product data. Please try again.'
        });
      } finally {
        setIsLoadingProduct(false);
      }
    }
  }, [isEditMode, editProductId, isAuthenticated]);

  // Ensure dynamic registry is initialized
  useEffect(() => {
    if (isAuthenticated) {
      (async () => {
        try {
          const { initializeDynamicRegistry } = await import('../utils/dynamicProductRegistry');
          initializeDynamicRegistry();
          console.log('✅ Dynamic registry initialized in AI Product Creator');
        } catch (error) {
          console.error('❌ Failed to initialize dynamic registry:', error);
        }
      })();
    }
  }, [isAuthenticated]);

  // Save product to localStorage in the correct format for homepage
  const saveProduct = (product: ProductData) => {
    try {
      const saved = JSON.parse(localStorage.getItem('createdProducts') || '[]');
      
      // Convert ProductData to Product format for the homepage
      const thumbnailImage = product.images && product.images.length > 0 
        ? product.images[0] 
        : '/placeholder.svg';
      
      console.log('🔍 Saving product for homepage:', {
        productName: product.name,
        imageCount: product.images?.length || 0,
        thumbnailImage: thumbnailImage?.substring(0, 100) + '...',
        imageType: thumbnailImage?.startsWith('data:') ? 'base64' : 'url'
      });

      const productForHomepage = {
        id: product.id!,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        rating: product.rating,
        reviews: product.reviewCount,
        image: thumbnailImage,
        images: product.images || [], // Include the full images array
        prime: product.prime,
        amazonChoice: product.amazonChoice,
        category: product.category,
        route: product.route,
        description: product.description,
        features: product.features.filter(f => f.trim() !== ''),
        collection: autoAssignCollection({
          id: product.id!,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice,
          rating: product.rating,
          reviews: product.reviewCount,
          image: thumbnailImage,
          prime: product.prime,
          amazonChoice: product.amazonChoice,
          category: product.category,
          route: product.route,
          description: product.description,
          features: product.features.filter(f => f.trim() !== '')
        })
      };
      
      const updated = [...saved, productForHomepage];
      localStorage.setItem('createdProducts', JSON.stringify(updated));
      
      console.log('🔍 Saved to createdProducts localStorage:', {
        productName: productForHomepage.name,
        productId: productForHomepage.id,
        productRoute: productForHomepage.route,
        totalProducts: updated.length
      });
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  // Enhanced product saving with verification
  const saveProductWithVerification = async (product: ProductData) => {
    try {
      console.log('🔍 Starting enhanced product save process...');
      
      // First save to the dynamic registry
      const { registerDynamicProduct } = await import('../utils/dynamicProductRegistry');
      
      const productForRegistry = {
        id: product.id!,
        name: product.name,
        slug: product.route?.replace('/', '') || product.id!,
        route: product.route || `/${product.id}`,
        price: product.price || '£9.99',
        originalPrice: product.originalPrice,
        discount: '90%',
        images: product.images || [],
        store: product.store || 'Amazon Basics',
        category: product.category || 'General',
        rating: product.rating || 4.5,
        reviewCount: product.reviewCount || product.reviews?.length || 100,
        aboutThisItem: product.aboutThisItem || [],
        features: product.features || [],
        productDetails: product.productDetails || {},
        technicalDetails: product.technicalDetails || {},
        reviews: product.reviews || [],
        variants: product.variants || [],
        amazonChoice: product.amazonChoice || false,
        prime: product.prime || true,
        countryRedirects: product.countryRedirects || [],
        createdAt: Date.now(),
        createdBy: 'ai'
      };
      
      const registeredId = registerDynamicProduct(productForRegistry);
      console.log('✅ Product registered with ID:', registeredId);
      
      // Verify the product was saved
      const { getDynamicProduct } = await import('../utils/dynamicProductRegistry');
      const verifyProduct = getDynamicProduct(registeredId);
      
      if (!verifyProduct) {
        throw new Error('Product verification failed after registration');
      }
      
      console.log('✅ Product verification successful:', verifyProduct.name);
      
      // Also save to the legacy system for backward compatibility
      saveProduct(product);
      
      return { success: true, productId: registeredId, product: verifyProduct };
      
    } catch (error) {
      console.error('❌ Enhanced product save failed:', error);
      return { success: false, error: error.message };
    }
  };

  // PIN Authentication
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(pinInput)) {
      setPinError('');
      setPinInput('');
    } else {
      setPinError('Incorrect PIN. Please try again.');
      setPinInput('');
    }
  };

  // Handle image uploads (standard Product Builder approach)
  const addImageFromUrl = () => {
    if (!imageUrl.trim()) return;
    setProductImages(prev => [...prev, imageUrl.trim()]);
    setImageUrl('');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    // Reverse the order so last selected appears first
    const fileArray = Array.from(files).reverse();
    
    fileArray.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setProductImages(prev => [result, ...prev]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  // Remove product image
  const removeImage = (index: number) => {
    setProductImages(prev => prev.filter((_, i) => i !== index));
  };

  // Move image up in order
  const moveImageUp = (index: number) => {
    if (index === 0) return;
    setProductImages(prev => {
      const newImages = [...prev];
      [newImages[index - 1], newImages[index]] = [newImages[index], newImages[index - 1]];
      return newImages;
    });
  };

  // Move image down in order
  const moveImageDown = (index: number) => {
    setProductImages(prev => {
      if (index === prev.length - 1) return prev;
      const newImages = [...prev];
      [newImages[index], newImages[index + 1]] = [newImages[index + 1], newImages[index]];
      return newImages;
    });
  };

  // Drag and drop functions
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedImageIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedImageIndex === null || draggedImageIndex === dropIndex) {
      setDraggedImageIndex(null);
      setDragOverIndex(null);
      return;
    }

    setProductImages(prev => {
      const newImages = [...prev];
      const [draggedImage] = newImages.splice(draggedImageIndex, 1);
      newImages.splice(dropIndex, 0, draggedImage);
      return newImages;
    });

    setDraggedImageIndex(null);
    setDragOverIndex(null);
  };

  // Quick reorder functions
  const moveImageToFront = (index: number) => {
    setProductImages(prev => {
      const newImages = [...prev];
      const [movedImage] = newImages.splice(index, 1);
      return [movedImage, ...newImages];
    });
  };

  const moveImageToBack = (index: number) => {
    setProductImages(prev => {
      const newImages = [...prev];
      const [movedImage] = newImages.splice(index, 1);
      return [...newImages, movedImage];
    });
  };

  const handleReviewImageUpload = (files: FileList | null) => {
    if (!files) return;
    
    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setReviewImages(prev => [...prev, result]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  // Remove review image
  const removeReviewImage = (index: number) => {
    setReviewImages(prev => prev.filter((_, i) => i !== index));
  };

  // Country redirect management
  const addCountryRedirect = () => {
    const newRedirect: CountryRedirect = {
      countryCode: 'UK',
      redirectUrl: ''
    };
    setCountryRedirects(prev => [...prev, newRedirect]);
  };

  const updateCountryRedirect = (index: number, field: keyof CountryRedirect, value: string) => {
    setCountryRedirects(prev => prev.map((redirect, i) => 
      i === index ? { ...redirect, [field]: value } : redirect
    ));
  };

  const removeCountryRedirect = (index: number) => {
    setCountryRedirects(prev => prev.filter((_, i) => i !== index));
  };

  // Process Amazon data
  const handleProcessData = async () => {
    if (!amazonText.trim()) {
      setResult({success: false, message: 'Please paste Amazon product text'});
      return;
    }

    setIsProcessing(true);
    setResult(null);

    try {
      const response = await parseAmazonProductData(amazonText, productImages, reviewImages);
      
      if (response.success && response.productData) {
        // Save the product
        const productId = response.productData.id!;
        const avgRating = response.productData.reviews.length > 0 
          ? response.productData.reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / response.productData.reviews.length
          : response.productData.rating;

        // Debug: Log the images we're about to save
        console.log('🔍 AI Creator - Images being saved:', {
          productImagesCount: productImages.length,
          productImages: productImages.map(img => ({ 
            type: img.startsWith('data:') ? 'base64' : 'url',
            size: img.length,
            preview: img.substring(0, 100) + '...'
          })),
          responseImages: response.productData.images
        });

        // The response.productData already includes our manual images
        const fullProduct = {
          ...response.productData,
          rating: Number(avgRating.toFixed(1)),
          countryRedirects: countryRedirects
        };

        console.log('🔍 AI Creator - Full product created:', {
          name: fullProduct.name,
          imageCount: fullProduct.images.length,
          images: fullProduct.images.map(img => ({
            type: img.startsWith('data:') ? 'base64' : 'url',
            size: img.length,
            preview: img.substring(0, 50) + '...'
          })),
          aboutThisItem: fullProduct.aboutThisItem,
          reviews: fullProduct.reviews.length,
          reviewsWithImages: fullProduct.reviews.filter((r: any) => r.images && r.images.length > 0).length,
          totalReviewImages: fullProduct.reviews.reduce((total: number, r: any) => total + (r.images?.length || 0), 0)
        });

        // Log review image distribution
        console.log('🔍 Review image distribution:', {
          uploadedReviewImages: reviewImages.length,
          extractedReviews: fullProduct.reviews.length,
          reviewsWithImages: fullProduct.reviews.filter((r: any) => r.images && r.images.length > 0).length,
          distribution: fullProduct.reviews.map((r: any, i: number) => ({
            reviewIndex: i,
            author: r.author,
            hasImages: !!(r.images && r.images.length > 0),
            imageCount: r.images?.length || 0
          }))
        });

        // Ensure thumbnail image is available for registry
        const thumbnailForRegistry = fullProduct.images && fullProduct.images.length > 0 
          ? fullProduct.images[0] 
          : '/placeholder.svg';
        
        console.log('🔍 Using thumbnail for registry:', {
          imageUrl: thumbnailForRegistry?.substring(0, 100) + '...',
          imageType: thumbnailForRegistry?.startsWith('data:') ? 'base64' : 'url'
        });

        const registryProduct = {
          id: productId,
          name: response.productData.name,
          price: response.productData.price,
          originalPrice: response.productData.originalPrice,
          rating: Number(avgRating.toFixed(1)),
          reviews: response.productData.reviewCount,
          image: thumbnailForRegistry, // Use the verified thumbnail
          prime: response.productData.prime,
          amazonChoice: response.productData.amazonChoice,
          category: response.productData.category,
          route: response.productData.route!,
          description: response.productData.description,
          features: response.productData.features.filter(f => f.trim() !== '')
        };

        // For AI products, only use the dynamic registry (not the manual products localStorage)
        // saveProduct(fullProduct); // Removed - AI products use dynamic registry only
        
        // Format data properly for the dynamic registry
        console.log('🔍 Route information:', {
          fullProductRoute: fullProduct.route,
          productId: productId,
          generatedSlug: fullProduct.route?.replace('/', '') || productId
        });

        // Persist images: store base64 images into IndexedDB and save lightweight references
        console.log('🔍 Processing images for persistence:', {
          fullProductImages: fullProduct.images?.length || 0,
          fullProductImageTypes: fullProduct.images?.map(img => ({
            type: img.startsWith('data:') ? 'base64' : img.startsWith('idb-ref:') ? 'idb-ref' : 'url',
            size: img.length
          })) || []
        });
        
        const persistedImages = await imageStorage.processImagesForPersistence(fullProduct.images || []);
        console.log('🔍 Persisted images result:', {
          count: persistedImages.length,
          types: persistedImages.map(img => ({
            type: img.startsWith('data:') ? 'base64' : img.startsWith('idb-ref:') ? 'idb-ref' : 'url',
            preview: img.substring(0, 50) + '...'
          }))
        });
        
        const persistedReviewImages = Array.isArray(fullProduct.reviews)
          ? await Promise.all(
              fullProduct.reviews.map(async (r: any) => ({
                ...r,
                images: await imageStorage.processImagesForPersistence(Array.isArray(r?.images) ? r.images : [])
              }))
            )
          : [];

        // Upsert strategy: if a product with same id/route/slug exists, merge; else register
        const existing = getDynamicProduct(productId) || getDynamicProduct(fullProduct.route?.replace('/', '') || '') || getDynamicProduct(fullProduct.route || '');

        // Ensure we have a proper route for the product
        const productRoute = fullProduct.route || `/${productId}`;
        const productSlug = productRoute.startsWith('/') ? productRoute.slice(1) : productRoute;
        
        const productForDynamicRegistry = {
          id: productId,
          name: fullProduct.name,
          slug: productSlug,
          route: productRoute,
          price: fullProduct.price || '£9.99',
          originalPrice: fullProduct.originalPrice,
          discount: (fullProduct as any).discount || '90%',
          images: persistedImages,
          store: fullProduct.store || 'Amazon Basics',
          category: fullProduct.category || 'General',
          rating: fullProduct.rating || 4.5,
          reviewCount: fullProduct.reviewCount || fullProduct.reviews?.length || 100,
          aboutThisItem: fullProduct.aboutThisItem || [],
          features: fullProduct.features || [],
          productDetails: fullProduct.productDetails || {},
          technicalDetails: fullProduct.technicalDetails || {},
          productInfo: (fullProduct as any).productInfo || {},
          reviews: persistedReviewImages,
          variants: fullProduct.variants || [],
          colors: (fullProduct as any).colors || [],
          amazonChoice: fullProduct.amazonChoice || false,
          prime: fullProduct.prime || true,
          countryRedirects: countryRedirects,
          createdAt: Date.now()
        };
        
        let registeredId: string;
        if (existing) {
          const updated = updateDynamicProduct(existing.id, {
            ...productForDynamicRegistry,
            // Merge images: prepend new images that are not already present
            images: Array.from(new Set([...(persistedImages || []), ...((existing.images || []) as string[])])),
            reviewCount: productForDynamicRegistry.reviewCount || existing.reviewCount,
            rating: productForDynamicRegistry.rating || existing.rating,
            productDetails: { ...(existing as any).productDetails, ...(productForDynamicRegistry as any).productDetails },
            technicalDetails: { ...(existing as any).technicalDetails, ...(productForDynamicRegistry as any).technicalDetails },
            productInfo: { ...(existing as any).productInfo, ...(productForDynamicRegistry as any).productInfo },
          });
          registeredId = updated?.id || existing.id;
          console.log('✅ Updated existing product:', registeredId);
        } else {
          registeredId = registerDynamicProduct(productForDynamicRegistry);
        }
        
        // Persist the product to server-backed unified storage for cross-browser visibility
        try {
          // Prefer original images (URLs or base64) for server so other browsers can load them
          const serverImages = Array.isArray(fullProduct.images)
            ? (fullProduct.images as unknown[]).filter((x): x is string => typeof x === 'string')
            : [];

          const serverReviews = Array.isArray(fullProduct.reviews)
            ? (fullProduct.reviews as unknown[]).map((r: any) => ({
                ...r,
                images: Array.isArray(r?.images)
                  ? (r.images as unknown[]).filter((x): x is string => typeof x === 'string')
                  : []
              }))
            : [];

          const centralizedProduct: CentralizedProduct = {
            id: productId,
            name: fullProduct.name,
            price: fullProduct.price || '£9.99',
            originalPrice: fullProduct.originalPrice || '£9.99',
            description: fullProduct.description || fullProduct.aboutThisItem?.[0] || '',
            category: fullProduct.category || 'General',
            features: Array.isArray(fullProduct.features) ? fullProduct.features : [],
            images: serverImages,
            amazonChoice: !!fullProduct.amazonChoice,
            prime: fullProduct.prime !== false,
            rating: typeof fullProduct.rating === 'number' ? fullProduct.rating : 4.5,
            reviews: serverReviews,
            reviewCount: (fullProduct.reviewCount || fullProduct.reviews?.length || 100) as number,
            variants: Array.isArray(fullProduct.variants) ? fullProduct.variants : [],
            specifications: (fullProduct as any).specifications || {},
            stock: (fullProduct as any).stock || 100,
            store: fullProduct.store || 'Amazon Basics',
            route: productRoute,
            aboutThisItem: Array.isArray(fullProduct.aboutThisItem) ? fullProduct.aboutThisItem : [],
            productDetails: (fullProduct as any).productDetails || {},
            technicalDetails: (fullProduct as any).technicalDetails || {},
            countryRedirects: Array.isArray(countryRedirects) ? countryRedirects : [],
            notes: (fullProduct as any).notes,
            createdBy: 'ai',
            createdAt: Date.now(),
            pageViews: 0,
            lastUpdated: Date.now(),
            globalId: `global_${productId}`,
          };

          await unifiedStorage.saveProduct(centralizedProduct);
          // Best-effort sync
          try { await unifiedStorage.forceSync(); } catch {}
          console.log('✅ Saved product to unified storage (server + local)');
        } catch (persistErr) {
          console.warn('⚠️ Failed to save product to unified storage:', persistErr);
        }

        // ALSO save to the legacy system for homepage display (lightweight only)
        const productForHomepage: ProductData = {
          id: productId,
          name: fullProduct.name,
          price: fullProduct.price || '£9.99',
          originalPrice: fullProduct.originalPrice,
          rating: fullProduct.rating || 4.5,
          reviewCount: fullProduct.reviewCount || fullProduct.reviews?.length || 100,
          // Use the persisted references for homepage too (first is thumbnail)
          images: persistedImages,
          store: fullProduct.store || 'Amazon Basics',
          category: fullProduct.category || 'General',
          route: productRoute,
          description: fullProduct.description || fullProduct.aboutThisItem?.[0] || '',
          features: fullProduct.features || [],
          variants: fullProduct.variants || [],
          specifications: fullProduct.productDetails || {},
          aboutThisItem: fullProduct.aboutThisItem || [],
          productDetails: fullProduct.productDetails || {},
          technicalDetails: fullProduct.technicalDetails || {},
          reviews: persistedReviewImages,
          amazonChoice: fullProduct.amazonChoice || false,
          prime: fullProduct.prime || true,
          countryRedirects: countryRedirects,
          stock: 100
        };
        
        // Do NOT add AI products to createdProducts to avoid duplicates in AdminDashboard.
        // Homepage already includes AI products via dynamic registry mapping.
        
        // Verify the product was actually saved
        setTimeout(() => {
          const verifyProduct = getDynamicProduct(registeredId);
          console.log('🔍 Product verification after save:', {
            registeredId,
            productFound: !!verifyProduct,
            productName: verifyProduct?.name || 'NOT FOUND',
            routeToNavigate: fullProduct.route,
            willNavigateAfterDelay: !!fullProduct.route
          });
          
          if (!verifyProduct) {
            console.error('❌ CRITICAL: Product was not saved properly!');
            setResult({
              success: false,
              message: 'Product creation failed - could not save product data. Please try again.'
            });
            return;
          }
        }, 100);
        
        console.log('🔍 Product registration complete:', {
          registeredId,
          routeToNavigate: fullProduct.route,
          willNavigateAfterDelay: !!fullProduct.route
        });

        // Generate Facebook ad copy and headline
        try {
          console.log('🔍 Generating Facebook ad copy for product:', fullProduct.name);
          const adCopyResult = await generateAdCopy({
            name: fullProduct.name,
            description: fullProduct.description,
            aboutThisItem: fullProduct.aboutThisItem,
            features: fullProduct.features,
            category: fullProduct.category,
            price: fullProduct.price,
            originalPrice: fullProduct.originalPrice
          });

          // Save the ad copy to localStorage
          await saveAdCopy(registeredId, fullProduct.name, adCopyResult.headline, adCopyResult.copy);
          
          console.log('✅ Facebook ad copy generated and saved:', {
            headline: adCopyResult.headline,
            copyLength: adCopyResult.copy.length
          });
        } catch (error) {
          console.warn('⚠️ Failed to generate Facebook ad copy:', error);
          // Don't fail the entire product creation if ad copy generation fails
        }

        // Navigate directly to the product route to avoid blank state until lists update
        // Increased delay to ensure product is fully saved
        if (fullProduct.route) {
          setTimeout(() => navigate(fullProduct.route as string, { replace: true }), 500);
        }

        setResult({
          success: true, 
          message: `Product created successfully! Visit: ${response.productData.route}`,
          productData: response.productData
        });

        // Clear form
        setAmazonText('');
        // keep images in state for immediate render debug; they are stored with the product too
        setProductImages([]);
        setReviewImages([]);
        
      } else {
        setResult({success: false, message: response.error || 'Failed to process Amazon data'});
      }
    } catch (error) {
      setResult({success: false, message: 'An error occurred while processing the data'});
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 rounded-3xl flex items-center justify-center mb-6 shadow-lg animate-pulse">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-3">AI Product Creator</h1>
            <p className="text-white/70 text-lg">Secure access to AI-powered product generation</p>
          </div>
          
          <form onSubmit={handlePinSubmit} className="space-y-6">
            <div className="relative">
              <input
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="w-full px-6 py-4 bg-white/10 backdrop-blur border border-white/20 rounded-xl text-center text-2xl tracking-[0.5em] text-white placeholder-white/50 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                placeholder="••••••"
                maxLength={6}
                autoFocus
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 hover:opacity-100 transition-opacity pointer-events-none"></div>
            </div>
            {pinError && (
              <div className="text-red-400 text-sm text-center bg-red-500/10 backdrop-blur border border-red-500/20 rounded-lg py-2 px-4">
                {pinError}
              </div>
            )}
            
            <button
              type="submit"
              disabled={pinInput.length !== 6}
              className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-700 hover:via-pink-700 hover:to-indigo-700 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none disabled:shadow-none"
            >
              {pinInput.length === 6 ? 'Access AI Creator' : 'Enter PIN'}
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-white/50 text-xs">
              Advanced AI • Secure Environment • Professional Tools
            </p>
          </div>
          
          <div className="mt-6 text-center">
            <button onClick={() => navigate('/admin')} className="text-purple-600 hover:underline text-sm">
              ← Back to Admin Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50/30">
      <Header />
      
      {/* Enhanced Header Section */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-4">
            <button 
              onClick={() => navigate('/admin')}
              className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 px-3 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Admin Dashboard
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 via-pink-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-8 h-8 text-white animate-pulse" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  AI Product Creator
                </h1>
                <p className="text-gray-600 text-lg">
                  Create products automatically using advanced AI technology
                </p>
              </div>
            </div>
            
            <div className="hidden lg:flex items-center gap-3">
              <div className="px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-700 text-sm font-medium">AI Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* Main Form */}
        <div className="space-y-8">
          {/* Step 1: Amazon Text Input */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                1
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">Amazon Product Data</h2>
                <p className="text-gray-600">Copy and paste all text from an Amazon product page</p>
              </div>
            </div>
            
            <div className="relative">
              <textarea
                value={amazonText}
                onChange={(e) => setAmazonText(e.target.value)}
                placeholder="Paste Amazon product text here... Include title, description, price, features, specifications, and any other product details."
                className="w-full h-64 px-6 py-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:bg-white transition-all duration-200 resize-none text-gray-700"
              />
              <div className="absolute top-4 right-4">
                <div className="bg-white px-3 py-1 rounded-lg shadow-sm border text-xs text-gray-500">
                  {amazonText.length} characters
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex items-center gap-2 text-sm text-gray-600 bg-blue-50 border border-blue-200 rounded-lg p-3">
              <AlertCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
              Include as much detail as possible for better AI processing and accuracy
            </div>
          </div>

          {/* Product Images */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-8">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-lg font-semibold">2. Product Images</h2>
              <div className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                Upload high-quality photos. First image becomes the main thumbnail.
              </div>
            </div>
            
            {productImages.length > 0 && (
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 text-blue-800 text-sm">
                  <ImageIcon className="w-4 h-4" />
                  <span className="font-medium">Image Management Tips:</span>
                </div>
                <ul className="text-blue-700 text-xs mt-2 space-y-1">
                  <li>• <strong>Drag & Drop:</strong> Click and drag images to reorder them</li>
                  <li>• <strong>Quick Buttons:</strong> Use green (front) and orange (back) buttons for fast reordering</li>
                  <li>• <strong>Main Image:</strong> First image becomes the main product thumbnail</li>
                  <li>• <strong>Upload Order:</strong> Last selected image appears first in the gallery</li>
                </ul>
              </div>
            )}
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {productImages.map((image, index) => (
                <div 
                  key={index} 
                  className={`relative group cursor-move ${
                    draggedImageIndex === index ? 'opacity-50 scale-95' : ''
                  } ${
                    dragOverIndex === index ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
                  }`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, index)}
                >
                  <img src={image} alt={`Product ${index + 1}`} className="w-full aspect-square object-contain rounded-lg border" />
                  
                  {/* Remove button */}
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  
                  {/* Quick reorder buttons */}
                  <div className="absolute top-2 left-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <button
                      onClick={() => moveImageToFront(index)}
                      className="bg-green-500 text-white rounded-full p-1 hover:bg-green-600"
                      title="Move to front (Main)"
                    >
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M7 14l5-5 5 5z"/>
                      </svg>
                    </button>
                    <button
                      onClick={() => moveImageToBack(index)}
                      className="bg-orange-500 text-white rounded-full p-1 hover:bg-orange-600"
                      title="Move to back"
                    >
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M7 10l5 5 5-5z"/>
                      </svg>
                    </button>
                  </div>
                  
                  {/* Main image badge */}
                  {index === 0 && <div className="absolute bottom-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded font-medium">Main</div>}
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">#{index + 1}</div>
                  
                  {/* Drag indicator */}
                  <div className="absolute inset-0 bg-gray-900 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200 rounded-lg flex items-center justify-center">
                    <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-xs font-medium">
                      Drag to reorder
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-gray-400"
              >
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-500">Add Images</span>
              </button>
            </div>
            <input ref={fileInputRef} type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />

            {/* URL Input */}
            <div className="mt-3 flex gap-2">
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Paste image URL..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={addImageFromUrl}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                Add URL
              </button>
            </div>

          </div>

          {/* Review Images */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-8">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-lg font-semibold">3. Review Images (Optional)</h2>
              <div className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                Upload customer review photos for authenticity
              </div>
            </div>
            
            {reviewImages.length > 0 && (
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 text-blue-800 text-sm">
                  <ImageIcon className="w-4 h-4" />
                  <span className="font-medium">
                    {reviewImages.length} review image{reviewImages.length !== 1 ? 's' : ''} uploaded
                  </span>
                </div>
                <p className="text-blue-700 text-xs mt-1">
                  Images will be distributed: First assigned to AI-generated reviews, then any extras will create additional default reviews.
                </p>
              </div>
            )}
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {reviewImages.map((image, index) => (
                <div key={index} className="relative group">
                  <img src={image} alt={`Review ${index + 1}`} className="w-full aspect-square object-cover rounded-lg border" />
                  
                  {/* Remove button */}
                  <button
                    onClick={() => removeReviewImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">#{index + 1}</div>
                </div>
              ))}
              <button
                onClick={() => reviewImageInputRef.current?.click()}
                className="w-full aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-gray-400"
              >
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-500">Add Review Images</span>
              </button>
            </div>
            <input ref={reviewImageInputRef} type="file" multiple accept="image/*" onChange={(e) => handleReviewImageUpload(e.target.files)} className="hidden" />
          </div>

          {/* Country-Specific Redirects */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold">4. Advanced - Country-Specific Redirects</h2>
                <HelpTooltip text="Override the global redirect links for this specific product. These will take priority over the global Link Rotator settings for the selected countries." />
              </div>
              <button 
                onClick={addCountryRedirect} 
                className="flex items-center px-3 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              >
                <Plus className="w-4 h-4 mr-2" /> Add Country Override
              </button>
            </div>

            <div className="space-y-4">
              {countryRedirects.map((redirect, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Country
                      </label>
                      <select
                        value={redirect.countryCode}
                        onChange={(e) => updateCountryRedirect(index, 'countryCode', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
                      >
                        {AVAILABLE_COUNTRIES.map(country => (
                          <option key={country.code} value={country.code}>
                            {country.flag} {country.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Redirect URL for {AVAILABLE_COUNTRIES.find(c => c.code === redirect.countryCode)?.name}
                      </label>
                      <input
                        type="url"
                        value={redirect.redirectUrl}
                        onChange={(e) => updateCountryRedirect(index, 'redirectUrl', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
                        placeholder="https://example.com"
                      />
                    </div>
                    
                    <div>
                      <button
                        onClick={() => removeCountryRedirect(index)}
                        className="w-full px-3 py-2 text-red-600 border border-red-300 rounded-md hover:bg-red-50"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              {countryRedirects.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p>No country-specific redirects configured.</p>
                  <p className="text-sm">Add overrides to customize redirect URLs for specific countries.</p>
                </div>
              )}
            </div>
          </div>

          {/* Generate Button */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-8">
            <button
              onClick={handleProcessData}
              disabled={isProcessing || !amazonText.trim()}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 px-6 rounded-lg hover:from-purple-700 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-300 transition-colors flex items-center justify-center gap-3 text-lg font-semibold"
            >
              {isProcessing ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Processing with AI...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Create Product with AI
                </>
              )}
            </button>

            {/* Result Message */}
            {result && (
              <div className={`mt-4 p-4 rounded-lg ${result.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                <div className="flex items-center gap-2">
                  {result.success ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  )}
                  <span className={result.success ? 'text-green-800' : 'text-red-800'}>
                    {result.message}
                  </span>
                </div>
              </div>
            )}

            {/* Debug Section */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-3">🔧 Debug Tools</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={async () => {
                    const { debugDynamicRegistry } = await import('../utils/dynamicProductRegistry');
                    const debug = debugDynamicRegistry();
                    console.log('🔍 Dynamic Registry Debug:', debug);
                    alert(`Registry Debug:\nIn Memory: ${debug.inMemory.count}\nLocalStorage: ${debug.localStorage.lightweightCount}\nFull Data: ${debug.localStorage.fullDataCount}`);
                  }}
                  className="px-3 py-2 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Debug Registry
                </button>
                <button
                  onClick={async () => {
                    const { forceReinitializeRegistry } = await import('../utils/dynamicProductRegistry');
                    const result = forceReinitializeRegistry();
                    console.log('🔄 Force Reinitialize Result:', result);
                    alert(`Reinitialized Registry:\nIn Memory: ${result.inMemoryCount}\nProducts: ${result.registryProducts.map(p => p.name).join(', ')}`);
                  }}
                  className="px-3 py-2 text-xs bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Force Reinitialize
                </button>
                <button
                  onClick={async () => {
                    const { debugProductStorage } = await import('../utils/dynamicProductRegistry');
                    const result = debugProductStorage();
                    console.log('🔍 Data Storage Debug:', result);
                    alert(`Storage Debug:\n${JSON.stringify(result, null, 2)}`);
                  }}
                  className="px-3 py-2 text-xs bg-yellow-600 text-white rounded hover:bg-yellow-700"
                >
                  Check Data Health
                </button>
                <button
                  onClick={async () => {
                    const { getAllDynamicProducts } = await import('../utils/dynamicProductRegistry');
                    const products = getAllDynamicProducts();
                    console.log('🔍 All Dynamic Products:', products);
                    alert(`Found ${products.length} dynamic products:\n${products.map(p => `${p.name} (${p.route})`).join('\n')}`);
                  }}
                  className="px-3 py-2 text-xs bg-purple-600 text-white rounded hover:bg-purple-700"
                >
                  List All Products
                </button>
                <button
                  onClick={async () => {
                    try {
                      const { registerDynamicProduct } = await import('../utils/dynamicProductRegistry');
                      const testProduct = {
                        id: `test-${Date.now()}`,
                        name: `Test Product ${Date.now()}`,
                        slug: `test-product-${Date.now()}`,
                        route: `/test-product-${Date.now()}`,
                        price: '£19.99',
                        originalPrice: '£39.99',
                        discount: '50%',
                        images: ['/placeholder.svg'],
                        store: 'Test Store',
                        category: 'Test Category',
                        rating: 4.5,
                        reviewCount: 10,
                        aboutThisItem: ['This is a test product'],
                        features: ['Test feature 1', 'Test feature 2'],
                        productDetails: {},
                        technicalDetails: {},
                        reviews: [],
                        variants: [],
                        amazonChoice: false,
                        prime: true,
                        countryRedirects: [],
                        createdAt: Date.now(),
                        createdBy: 'ai'
                      };
                      
                      const id = registerDynamicProduct(testProduct);
                      console.log('✅ Test product created with ID:', id);
                      
                      // Verify it was saved
                      const { getDynamicProduct } = await import('../utils/dynamicProductRegistry');
                      const saved = getDynamicProduct(id);
                      
                      if (saved) {
                        alert(`✅ Test product created successfully!\nID: ${id}\nName: ${saved.name}\nRoute: ${saved.route}\n\nNow refresh the page to test persistence.`);
                      } else {
                        alert('❌ Test product creation failed - product not found after save');
                      }
                    } catch (error) {
                      console.error('❌ Test product creation failed:', error);
                      alert(`❌ Test product creation failed: ${error.message}`);
                    }
                  }}
                  className="px-3 py-2 text-xs bg-orange-600 text-white rounded hover:bg-orange-700"
                >
                  Create Test Product
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Use these tools to troubleshoot product persistence issues. Check the browser console for detailed logs.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AiProductCreator;
