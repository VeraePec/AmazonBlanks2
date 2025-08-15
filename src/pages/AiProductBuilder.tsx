import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Upload, Image as ImageIcon, CheckCircle, AlertCircle, X, GripVertical, Camera, Info, ArrowUp, Plus, Trash2, ArrowLeft, Package, Globe, Search, Filter, Grid3X3, List, Copy, Eye, ExternalLink, MapPin } from 'lucide-react';
import { parseAmazonProductData, ProductData, openai } from '../services/openaiService';
import { unifiedStorage } from '../utils/unifiedStorage';
import type { CentralizedProduct } from '../utils/centralizedStorage';
import { registerDynamicProduct } from '../utils/dynamicProductRegistry';
import { generateAdCopy, saveAdCopy } from '../utils/generateAdCopy';
import Header from '../components/Header';
import { useCountrySelector } from '../hooks/useCountrySelector';
import { useCrossBrowserSync } from '../hooks/useCrossBrowserSync';
import SyncStatus from '../components/SyncStatus';
import { useToast } from '../hooks/use-toast';

// Check if browser key is available
const useBrowserKey = !!(import.meta as any).env?.VITE_OPENAI_API_KEY;

// Error boundary for image processing
const handleImageError = (error: any, filename: string, toast: any) => {
  console.error(`Image processing error for ${filename}:`, error);
  toast({
    title: "Image processing error",
    description: `Failed to process ${filename}. Please try a different image.`,
    variant: "destructive"
  });
};

const toDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    // Validate file before processing
    if (!file || !(file instanceof File)) {
      reject(new Error('Invalid file object'));
      return;
    }
    
    if (!file.type.startsWith('image/')) {
      reject(new Error('File is not an image'));
      return;
    }
    
    if (file.size > 50 * 1024 * 1024) { // 50MB limit
      reject(new Error('File is too large'));
      return;
    }
    
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === 'string') {
        resolve(result);
      } else {
        reject(new Error('Failed to read file as data URL'));
      }
    };
    reader.onerror = () => reject(new Error('FileReader error'));
    reader.readAsDataURL(file);
  });

async function uploadImage(item: { dataUrl?: string; url?: string; filename?: string }): Promise<string> {
  // Add timeout and retry logic for uploads
  const tryFunction = async (path: string, retries = 3): Promise<string> => {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
        
        const resp = await fetch(path, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item),
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (!resp.ok) {
          if (attempt === retries) return '';
          continue; // Try again
        }
        
        try {
          const json = await resp.json();
          return (json?.success && json?.url) ? String(json.url) : '';
        } catch {
          if (attempt === retries) return '';
          continue; // Try again
        }
      } catch (error) {
        console.warn(`Upload attempt ${attempt} failed:`, error);
        if (attempt === retries) return '';
        // Wait before retry
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
      }
    }
    return '';
  };

  // 1) Netlify dev/production function path
  let url = await tryFunction('/.netlify/functions/upload-image');
  if (url) return url;
  // 2) Redirect path if running under Netlify Dev
  url = await tryFunction('/api/upload-image');
  if (url) return url;

  // 3) Fallback: direct Supabase upload from browser (requires VITE_ envs)
  try {
    const SUPABASE_URL = (import.meta as any).env?.VITE_SUPABASE_URL || '';
    const SUPABASE_ANON_KEY = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '';
    if (SUPABASE_URL && SUPABASE_ANON_KEY && item.dataUrl) {
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      const base = (item.filename || `img_${Date.now()}`).replace(/[^a-zA-Z0-9-_.]/g, '_');
      const objectKey = `products/${base}`;
      const match = /^data:(.*?);base64,(.*)$/i.exec(item.dataUrl);
      if (match) {
        const contentType = match[1] || 'image/jpeg';
        const bytes = new Uint8Array(atob(match[2]).split('').map(c => c.charCodeAt(0)));
        const { error } = await supabase.storage.from('product-images').upload(objectKey, bytes, { contentType, upsert: true });
        if (!error) {
          const { data } = supabase.storage.from('product-images').getPublicUrl(objectKey);
          if (data?.publicUrl) return data.publicUrl;
        }
      }
    }
  } catch {}

  // 4) Final fallback: return the data URL directly for immediate display
  if (item.dataUrl) {
    console.log('📸 Using data URL fallback for image:', item.filename);
    return item.dataUrl;
  }

  // 5) Ultimate fallback: placeholder image
  console.log('📸 Using placeholder image for:', item.filename);
  return '/placeholder.svg';
}

interface CountryRedirect {
  countryCode: string;
  redirectUrl: string;
}

export default function AiProductBuilder() {
  const navigate = useNavigate();
  const { countries } = useCountrySelector();
  const { toast } = useToast();
  const [amazonText, setAmazonText] = React.useState('');
  const [productFiles, setProductFiles] = React.useState<File[]>([]);
  const [reviewFiles, setReviewFiles] = React.useState<File[]>([]);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [processingStep, setProcessingStep] = React.useState<string>('');
  const [result, setResult] = React.useState<{ success: boolean; message: string; route?: string } | null>(null);
  const [dragOver, setDragOver] = React.useState(false);
  const [dragOverReview, setDragOverReview] = React.useState(false);
  const [viewMode, setViewMode] = React.useState<'builder' | 'preview'>('builder');
  const [countryRedirects, setCountryRedirects] = React.useState<CountryRedirect[]>([]);
  const [draggedImageIndex, setDraggedImageIndex] = React.useState<number | null>(null);
  const [isUploadingImages, setIsUploadingImages] = React.useState(false);
  
  // Cleanup function to handle component unmount
  React.useEffect(() => {
    return () => {
      // Clear any pending timeouts or operations on unmount
      setIsProcessing(false);
      setIsUploadingImages(false);
    };
  }, []);
  
  // Prevent form submission on Enter key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && e.target instanceof HTMLTextAreaElement) {
        e.preventDefault();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Listen for cross-browser sync events
  useCrossBrowserSync('product-added', React.useCallback((event) => {
    console.log('🔄 Product added event received from another browser:', event);
    // Force a refresh of the product list
    window.dispatchEvent(new Event('unified-storage-hydrated'));
    toast({
      title: "Product synced",
      description: "A new product was added from another browser",
    });
  }, [toast]));

  useCrossBrowserSync('product-updated', React.useCallback((event) => {
    console.log('🔄 Product updated event received from another browser:', event);
    // Force a refresh of the product list
    window.dispatchEvent(new Event('unified-storage-hydrated'));
  }, []));

  const onProductFiles = React.useCallback((files: FileList | null) => {
    if (!files) return;
    
    const validFiles = Array.from(files).filter(file => {
      // Check file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not an image file`,
          variant: "destructive"
        });
        return false;
      }
      
      // Check file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: `${file.name} is larger than 10MB`,
          variant: "destructive"
        });
        return false;
      }
      
      return true;
    });
    
    if (validFiles.length > 0) {
      setProductFiles((prev) => [...prev, ...validFiles]);
      toast({
        title: "Images added",
        description: `Added ${validFiles.length} product image(s)`,
      });
    }
  }, [toast]);

  const onReviewFiles = React.useCallback((files: FileList | null) => {
    if (!files) return;
    
    const validFiles = Array.from(files).filter(file => {
      // Check file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not an image file`,
          variant: "destructive"
        });
        return false;
      }
      
      // Check file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: `${file.name} is larger than 10MB`,
          variant: "destructive"
        });
        return false;
      }
      
      return true;
    });
    
    if (validFiles.length > 0) {
      setReviewFiles((prev) => [...prev, ...validFiles]);
      toast({
        title: "Review images added",
        description: `Added ${validFiles.length} review image(s)`,
      });
    }
  }, [toast]);

  // Delete product image
  const deleteProductImage = React.useCallback((index: number) => {
    setProductFiles(prev => {
      const newFiles = prev.filter((_, i) => i !== index);
      toast({
        title: "Image removed",
        description: "Product image has been removed",
      });
      return newFiles;
    });
  }, [toast]);

  // Delete review image
  const deleteReviewImage = React.useCallback((index: number) => {
    setReviewFiles(prev => {
      const newFiles = prev.filter((_, i) => i !== index);
      toast({
        title: "Review image removed",
        description: "Review image has been removed",
      });
      return newFiles;
    });
  }, [toast]);

  // Drag and drop handlers for image reordering
  const handleDragStart = React.useCallback((e: React.DragEvent, index: number) => {
    setDraggedImageIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  }, []);

  const handleDragOver = React.useCallback((e: React.DragEvent, isReview: boolean = false) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    if (isReview) {
      setDragOverReview(true);
    } else {
      setDragOver(true);
    }
  }, []);

  const handleDragLeave = React.useCallback((e: React.DragEvent, isReview: boolean = false) => {
    e.preventDefault();
    // Only set to false if leaving the drop zone completely
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    
    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      if (isReview) {
        setDragOverReview(false);
      } else {
        setDragOver(false);
      }
    }
  }, []);

  const handleDrop = React.useCallback((e: React.DragEvent, isReview: boolean = false) => {
    e.preventDefault();
    if (isReview) {
      setDragOverReview(false);
    } else {
      setDragOver(false);
    }
    
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length === 0) {
      toast({
        title: "No images found",
        description: "Please drop image files only",
        variant: "destructive"
      });
      return;
    }
    
    if (isReview) {
      onReviewFiles(e.dataTransfer.files);
    } else {
      onProductFiles(e.dataTransfer.files);
    }
  }, [onProductFiles, onReviewFiles, toast]);

  // Handle image reordering drop
  const handleImageDrop = React.useCallback((e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedImageIndex === null || draggedImageIndex === dropIndex) {
      setDraggedImageIndex(null);
      return;
    }
    
    setProductFiles(prev => {
      const newFiles = [...prev];
      const [draggedFile] = newFiles.splice(draggedImageIndex, 1);
      newFiles.splice(dropIndex, 0, draggedFile);
      toast({
        title: "Images reordered",
        description: "Product images have been reordered",
      });
      return newFiles;
    });
    setDraggedImageIndex(null);
  }, [draggedImageIndex, toast]);

  // Country redirect functions
  const addCountryRedirect = React.useCallback(() => {
    setCountryRedirects(prev => [...prev, { countryCode: '', redirectUrl: '' }]);
    toast({
      title: "Country redirect added",
      description: "New country redirect option added",
    });
  }, [toast]);

  const updateCountryRedirect = React.useCallback((index: number, field: keyof CountryRedirect, value: string) => {
    setCountryRedirects(prev => prev.map((redirect, i) => 
      i === index ? { ...redirect, [field]: value } : redirect
    ));
  }, []);

  const removeCountryRedirect = React.useCallback((index: number) => {
    setCountryRedirects(prev => prev.filter((_, i) => i !== index));
    toast({
      title: "Country redirect removed",
      description: "Country redirect has been removed",
    });
  }, [toast]);

  const handleCreate = React.useCallback(async () => {
    let overallTimeout: NodeJS.Timeout | undefined;
    
    try {
      setIsProcessing(true);
      setProcessingStep('');
      setResult(null);
      
      // Add overall timeout for product creation
      overallTimeout = setTimeout(() => {
        console.error('❌ Product creation timed out');
        setResult({ success: false, message: 'Product creation timed out. Please try again.' });
        setIsProcessing(false);
        toast({
          title: "Creation timeout",
          description: "Product creation took too long. Please try again.",
          variant: "destructive"
        });
      }, 120000); // 2 minute timeout
      
      if (!amazonText.trim()) {
        const errorMessage = 'Please paste Amazon product text first.';
        setResult({ success: false, message: errorMessage });
        if (overallTimeout) clearTimeout(overallTimeout);
        setIsProcessing(false);
        toast({
          title: "Missing product text",
          description: errorMessage,
          variant: "destructive"
        });
        return;
      }

      console.log('🚀 Starting AI product creation...', {
        textLength: amazonText.length,
        productImages: productFiles.length,
        reviewImages: reviewFiles.length,
        countryRedirects: countryRedirects.length
      });

      // 1) Process images in parallel for faster upload
      setProcessingStep('Processing images...');
      setIsUploadingImages(true);
      const imageProcessingPromises = [];
      
      // Process product images
      for (const f of productFiles) {
        imageProcessingPromises.push(
          toDataUrl(f).then(async (dataUrl) => {
            try {
              const url = await uploadImage({ dataUrl, filename: f.name });
              console.log(`✅ Successfully uploaded product image: ${f.name}`);
              return url;
            } catch (error) {
              console.error(`❌ Failed to upload product image ${f.name}:`, error);
              handleImageError(error, f.name, toast);
              return dataUrl; // Fallback to data URL
            }
          })
        );
      }

      // Process review images
      for (const f of reviewFiles) {
        imageProcessingPromises.push(
          toDataUrl(f).then(async (dataUrl) => {
            try {
              const url = await uploadImage({ dataUrl, filename: f.name });
              console.log(`✅ Successfully uploaded review image: ${f.name}`);
              return url;
            } catch (error) {
              console.error(`❌ Failed to upload review image ${f.name}:`, error);
              handleImageError(error, f.name, toast);
              return dataUrl; // Fallback to data URL
            }
          })
        );
      }

      // Wait for all image processing to complete
      const allImageUrls = await Promise.all(imageProcessingPromises);
      const productUrls = allImageUrls.slice(0, productFiles.length);
      const reviewUrls = allImageUrls.slice(productFiles.length);
      setIsUploadingImages(false);
      
      console.log(`✅ Processed ${productUrls.length} product images and ${reviewUrls.length} review images`);

      setProcessingStep('Analyzing product data with AI...');
      console.log('🔄 Calling AI service to parse product data...');
      
      // Validate text length
      if (amazonText.length > 50000) {
        toast({
          title: "Text too long",
          description: "Product text is too long. Please shorten it and try again.",
          variant: "destructive"
        });
        throw new Error('Product text exceeds maximum length');
      }
      
      // 2) Ask AI to parse the text into structured product JSON
      const parsed = await parseAmazonProductData(amazonText, productUrls, reviewUrls);
      
      if (!parsed?.success) {
        const errorMsg = parsed?.error || 'AI parsing failed';
        console.error('❌ AI parsing failed:', errorMsg);
        toast({
          title: "AI parsing failed",
          description: errorMsg,
          variant: "destructive"
        });
        throw new Error(errorMsg);
      }

      const product = parsed.productData as ProductData;
      console.log('✅ Product data parsed successfully');

      // Ensure persistent images are used
      const images = productUrls.length > 0 ? productUrls : (product.images || []);
      const route = product.route || `/${(product.name || 'product').toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').slice(0, 50)}`;

      // Ensure we have at least one image and validate image URLs
      const validImages = images.filter(img => {
        if (!img || typeof img !== 'string') return false;
        return img.startsWith('http') || img.startsWith('/') || img.startsWith('data:') || img.startsWith('blob:');
      });
      const finalImages = validImages.length > 0 ? validImages : ['/placeholder.svg'];
      
      if (validImages.length !== images.length) {
        console.warn(`Filtered out ${images.length - validImages.length} invalid image URLs`);
      }

      // Filter out empty country redirects
      const validCountryRedirects = countryRedirects.filter(redirect => 
        redirect.countryCode.trim() && redirect.redirectUrl.trim()
      );

      // 3) Create product object
      const centralized: CentralizedProduct = {
        id: product.id || `ai-${Date.now()}`,
        name: product.name,
        price: product.price || '£9.99',
        originalPrice: product.originalPrice || '£9.99',
        description: product.description || product.aboutThisItem?.[0] || '',
        category: product.category || 'General',
        features: Array.isArray(product.features) ? product.features : [],
        images: finalImages,
        amazonChoice: !!product.amazonChoice,
        prime: product.prime !== false,
        rating: typeof product.rating === 'number' ? product.rating : 4.5,
        reviews: Array.isArray(product.reviews) ? product.reviews : [],
        reviewCount: (product.reviewCount || product.reviews?.length || 100) as number,
        variants: Array.isArray(product.variants) ? product.variants : [],
        specifications: (product as any).specifications || {},
        stock: (product as any).stock || 100,
        store: product.store || 'Amazon Basics',
        route,
        aboutThisItem: Array.isArray(product.aboutThisItem) ? product.aboutThisItem : [],
        productDetails: (product as any).productDetails || {},
        technicalDetails: (product as any).technicalDetails || {},
        countryRedirects: validCountryRedirects,
        createdBy: 'ai',
        createdAt: Date.now(),
        pageViews: 0,
        lastUpdated: Date.now(),
        globalId: `global_${product.id || Date.now()}`,
      };

      setProcessingStep('Saving product...');
      // 4) Save and register in parallel for faster completion
      console.log('💾 Saving product to storage...');
      const [savePromise, registerPromise] = await Promise.allSettled([
                unifiedStorage.saveProduct(centralized).then(async (savedProduct) => {
          console.log('✅ Product saved to unified storage');
          // Force cross-browser sync after saving
          try { 
            await unifiedStorage.forceSync(); 
            console.log('✅ Storage sync completed');
          } catch (e) {
            console.warn('Storage sync failed (non-critical):', e);
          }
          return savedProduct;
        }),
        registerDynamicProduct({
          id: centralized.id,
          name: centralized.name,
          slug: route.startsWith('/') ? route.slice(1) : route,
          route,
          price: centralized.price,
          originalPrice: centralized.originalPrice,
          discount: '90%',
          images: finalImages,
          store: centralized.store,
          category: centralized.category,
          rating: centralized.rating,
          reviewCount: centralized.reviewCount,
          aboutThisItem: centralized.aboutThisItem,
          features: centralized.features,
          productDetails: centralized.productDetails,
          technicalDetails: centralized.technicalDetails,
          productInfo: centralized.specifications as any,
          reviews: centralized.reviews,
          variants: centralized.variants,
          colors: [],
          amazonChoice: centralized.amazonChoice,
          prime: centralized.prime,
          countryRedirects: centralized.countryRedirects,
          createdAt: centralized.createdAt,
        })
      ]);

      // Check for errors
      if (savePromise.status === 'rejected') {
        console.error('❌ Failed to save product:', savePromise.reason);
        toast({
          title: "Save warning",
          description: "Product saved but storage sync failed",
          variant: "destructive"
        });
      }
      if (registerPromise.status === 'rejected') {
        console.error('❌ Failed to register product:', registerPromise.reason);
        toast({
          title: "Registration warning",
          description: "Product saved but registration failed",
          variant: "destructive"
        });
      }
      
      // If both critical operations failed, throw error
      if (savePromise.status === 'rejected' && registerPromise.status === 'rejected') {
        throw new Error('Failed to save and register product. Please try again.');
      }

      console.log('✅ Product created and registered successfully');

      // Set success immediately to show the product was created
      setResult({ success: true, message: 'Product created successfully!', route });
      
      // Clear the overall timeout
      if (overallTimeout) clearTimeout(overallTimeout);
      
      // Show success toast
      toast({
        title: "Product created!",
        description: `${product.name} has been created successfully`,
      });
      
      // Reset processing state immediately
      setIsProcessing(false);
      setIsUploadingImages(false);
      setProcessingStep('');
      
      // Generate ad copy for Facebook ads (non-blocking)
      console.log('🎯 Starting background tasks...');
      
      // Run ad copy generation in background without blocking navigation
      Promise.resolve().then(async () => {
        try {
          console.log('🔄 Starting ad copy generation in background...');
          const adCopyResult = await generateAdCopy(product);
          if (adCopyResult && adCopyResult.headline && adCopyResult.copy) {
            await saveAdCopy(centralized.id, centralized.name, adCopyResult.headline, adCopyResult.copy);
            console.log('✅ Ad copy generated and saved successfully');
            toast({
              title: "Ad copy generated",
              description: "Facebook ad copy has been created",
            });
          }
        } catch (error) {
          console.warn('⚠️ Ad copy generation failed (non-critical):', error);
          // Don't show error toast for non-critical operation
        }
      }).catch(error => {
        console.warn('Ad copy generation promise failed:', error);
      });
      
      // Navigate immediately - don't wait for background tasks
      console.log('🚀 Navigating to product page...');
      // Open in new tab
      window.open(route, '_blank');
      // Navigate current tab to admin dashboard after a short delay
      setTimeout(() => {
        navigate('/admin');
      }, 500);
    } catch (err: any) {
      console.error('❌ Product creation failed:', err);
      const errorMessage = err?.message || 'Failed to create product';
      setResult({ success: false, message: errorMessage });
      
      toast({
        title: "Creation failed",
        description: errorMessage,
        variant: "destructive"
      });
      
      if (overallTimeout) clearTimeout(overallTimeout);
      setIsProcessing(false);
      setIsUploadingImages(false);
    }
  }, [amazonText, productFiles, reviewFiles, countryRedirects, toast, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <button 
              onClick={() => navigate('/admin')}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-3 py-2 rounded-lg transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </button>
          </div>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                  AI Product Builder
                </h1>
                <p className="text-gray-600 text-lg">Create professional product pages with AI assistance</p>
              </div>
            </div>
            
            {/* AI Service Status */}
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                useBrowserKey 
                  ? 'bg-gradient-to-br from-green-500 to-emerald-500' 
                  : 'bg-gradient-to-br from-yellow-500 to-orange-500'
              }`}>
                {useBrowserKey ? (
                  <CheckCircle className="w-5 h-5 text-white" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-white" />
                )}
              </div>
              <div className="text-right">
                <p className={`text-sm font-medium ${
                  useBrowserKey ? 'text-green-700' : 'text-yellow-700'
                }`}>
                  {useBrowserKey ? 'AI Service Available' : 'AI Service Required'}
                </p>
                <p className="text-xs text-gray-500">
                  {useBrowserKey ? 'Enhanced processing' : 'Basic mode only'}
                </p>
              </div>
              <SyncStatus />
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <ImageIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{productFiles.length}</p>
                <p className="text-sm text-gray-600">Product Images</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{reviewFiles.length}</p>
                <p className="text-sm text-gray-600">Review Images</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{amazonText.length}</p>
                <p className="text-sm text-gray-600">Characters</p>
              </div>
            </div>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6 mb-8">
          <div className="flex justify-center">
            <div className="flex border-2 border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setViewMode('builder')}
                className={`px-6 py-3 flex items-center gap-2 text-sm font-medium transition-all duration-200 ${
                  viewMode === 'builder'
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                AI Builder
              </button>
              <button
                onClick={() => setViewMode('preview')}
                className={`px-6 py-3 flex items-center gap-2 text-sm font-medium transition-all duration-200 ${
                  viewMode === 'preview'
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Eye className="w-4 h-4" />
                Preview
              </button>
            </div>
          </div>
        </div>

        {viewMode === 'builder' ? (
          <div className="space-y-8">
            {/* Amazon Product Data */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">1</span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Amazon Product Data</h2>
                  <p className="text-sm text-gray-600">Copy and paste all text from an Amazon product page</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <textarea
                  value={amazonText}
                  onChange={(e) => setAmazonText(e.target.value)}
                  placeholder="Paste Amazon product text here... Include title, description, price, features, specifications, and other product details."
                  className="w-full h-48 border-2 border-gray-200 rounded-xl p-4 text-sm resize-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:bg-white transition-all duration-200"
                />
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <Info className="w-3 h-3" />
                    Include as much detail as possible for better AI processing
                  </div>
                  <span className="font-medium">{amazonText.length} characters</span>
                </div>
              </div>
            </div>

            {/* Product Images */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">2</span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Product Images</h2>
                  <p className="text-sm text-gray-600">Upload high-quality photos. Drag to reorder - first image becomes the main thumbnail.</p>
                </div>
              </div>

              {/* Image Upload Area */}
              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                  dragOver 
                    ? 'border-purple-400 bg-purple-50/50' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragOver={(e) => handleDragOver(e, false)}
                onDragLeave={(e) => handleDragLeave(e, false)}
                onDrop={(e) => handleDrop(e, false)}
              >
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-900 mb-2">Drop images here or click to upload</p>
                <p className="text-sm text-gray-600 mb-4">Support for JPG, PNG, GIF up to 10MB each</p>
                <label className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  <Plus className="w-4 h-4" />
                  Choose Files
                  <input 
                    type="file" 
                    accept="image/*" 
                    multiple 
                    className="hidden" 
                    onChange={(e) => {
                      onProductFiles(e.target.files);
                      // Clear the input so the same file can be selected again
                      e.target.value = '';
                    }} 
                  />
                </label>
              </div>

              {/* Image Gallery */}
              {productFiles.length > 0 && (
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-gray-900">Product Images ({productFiles.length})</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <GripVertical className="w-4 h-4" />
                      <span>Drag to reorder</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {productFiles.map((file, index) => (
                      <div 
                        key={index} 
                        className="relative group"
                        draggable
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleImageDrop(e, index)}
                      >
                        <div className={`aspect-square bg-gray-100 rounded-xl overflow-hidden border-2 transition-all duration-200 cursor-move ${
                          draggedImageIndex === index 
                            ? 'border-purple-500 shadow-lg scale-105' 
                            : 'border-gray-200 hover:border-purple-300'
                        }`}
                        onDragEnd={() => setDraggedImageIndex(null)}
                        >
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Product image ${index + 1}`}
                            className="w-full h-full object-cover pointer-events-none"
                          />
                          
                          {/* Image Controls */}
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
                              {/* Delete */}
                              <button
                                onClick={() => deleteProductImage(index)}
                                className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
                                title="Delete image"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          
                          {/* Image Labels */}
                          <div className="absolute bottom-2 left-2 right-2 flex justify-between">
                            {index === 0 && (
                              <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-lg">Main</span>
                            )}
                            <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded-lg">#{index + 1}</span>
                          </div>
                          
                          {/* Drag Handle */}
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <GripVertical className="w-4 h-4 text-white bg-black bg-opacity-50 rounded" />
                          </div>
                        </div>
                        
                        <p className="text-xs text-gray-600 mt-1 truncate">{file.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Review Images */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">3</span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Review Images (Optional)</h2>
                  <p className="text-sm text-gray-600">Upload customer review photos for authenticity</p>
                </div>
              </div>

              {/* Review Image Upload Area */}
              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                  dragOverReview 
                    ? 'border-pink-400 bg-pink-50/50' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragOver={(e) => handleDragOver(e, true)}
                onDragLeave={(e) => handleDragLeave(e, true)}
                onDrop={(e) => handleDrop(e, true)}
              >
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-900 mb-2">Drop review images here or click to upload</p>
                <p className="text-sm text-gray-600 mb-4">These will appear in the customer reviews section</p>
                <label className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-xl hover:from-pink-700 hover:to-purple-700 transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  <Plus className="w-4 h-4" />
                  Choose Files
                  <input 
                    type="file" 
                    accept="image/*" 
                    multiple 
                    className="hidden" 
                    onChange={(e) => {
                      onReviewFiles(e.target.files);
                      // Clear the input so the same file can be selected again
                      e.target.value = '';
                    }} 
                  />
                </label>
              </div>

              {/* Review Image Gallery */}
              {reviewFiles.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-medium text-gray-900 mb-4">Review Images ({reviewFiles.length})</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {reviewFiles.map((file, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden border-2 border-gray-200 hover:border-pink-300 transition-all duration-200">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Review image ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          
                          {/* Delete Button */}
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                            <button
                              onClick={() => deleteReviewImage(index)}
                              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700"
                              title="Delete image"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <span className="absolute bottom-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded-lg">#{index + 1}</span>
                        </div>
                        <p className="text-xs text-gray-600 mt-1 truncate">{file.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Country Override Section */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">4</span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Country-Specific Redirects</h2>
                  <p className="text-sm text-gray-600">Add overrides to customize redirect URLs for specific countries</p>
                </div>
              </div>
              
              {countryRedirects.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-600 mb-4">No country-specific redirects configured.</p>
                  <button 
                    onClick={addCountryRedirect}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <Plus className="w-4 h-4" />
                    Add Country Override
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {countryRedirects.map((redirect, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-gray-50/50 rounded-xl border border-gray-200/50">
                      <div className="flex-1">
                        <select
                          value={redirect.countryCode}
                          onChange={(e) => updateCountryRedirect(index, 'countryCode', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                        >
                          <option value="">Select Country</option>
                          {countries.map((country) => (
                            <option key={country.code} value={country.code}>
                              {country.flag} {country.name} ({country.code.toUpperCase()})
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex-1">
                        <input
                          type="text"
                          placeholder="Redirect URL"
                          value={redirect.redirectUrl}
                          onChange={(e) => updateCountryRedirect(index, 'redirectUrl', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                        />
                      </div>
                      <button
                        onClick={() => removeCountryRedirect(index)}
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
                        title="Remove redirect"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <div className="flex justify-center pt-4">
                    <button
                      onClick={addCountryRedirect}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      <Plus className="w-4 h-4" />
                      Add Another Override
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Create Button */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-8">
              <button
                onClick={handleCreate}
                disabled={isProcessing || !amazonText.trim() || isUploadingImages}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-xl hover:from-purple-700 hover:to-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none relative"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin h-6 w-6 border-2 border-white border-t-transparent rounded-full"></div>
                    <div className="flex flex-col items-center">
                      <span className="text-lg font-semibold">{processingStep || 'Processing with AI...'}</span>
                      {isUploadingImages && (
                        <span className="text-sm opacity-75">Uploading {productFiles.length + reviewFiles.length} images...</span>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-6 h-6" />
                    <span className="text-lg font-semibold">Create Product with AI</span>
                  </>
                )}
              </button>

              {result && (
                <div className={`mt-6 p-4 rounded-xl border ${
                  result.success 
                    ? 'bg-green-50 border-green-200 text-green-800' 
                    : 'bg-red-50 border-red-200 text-red-800'
                }`}>
                  <div className="flex items-center gap-3">
                    {result.success ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-600" />
                    )}
                    <span className="font-medium">{result.message}</span>
                  </div>
                  {result.success && !useBrowserKey && (
                    <div className="mt-3 p-3 bg-green-100 rounded-lg text-sm text-green-700">
                      <strong>Fallback Mode:</strong> Product created using basic text analysis since AI service is not available. 
                      For enhanced product details, configure your OpenAI API key in the environment.
                    </div>
                  )}
                  {result.route && (
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => window.open(result.route, '_blank')}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Product
                      </button>
                      <button
                        onClick={() => navigate('/admin')}
                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        Dashboard
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Preview Mode */
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-8">
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Eye className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Preview Mode</h3>
              <p className="text-gray-600 mb-8 text-lg">
                Switch to AI Builder mode to create your product and see a preview here.
              </p>
              <button
                onClick={() => setViewMode('builder')}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Sparkles className="w-4 h-4" />
                Go to AI Builder
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


