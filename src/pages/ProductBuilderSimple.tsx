import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Upload, X, Plus, Star, Save, ArrowLeft, Edit, Trash2, Eye, Globe } from 'lucide-react';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { addProductWithAutoCollection } from '../data/productRegistry';
import { registerDynamicProduct } from '../utils/dynamicProductRegistry';

interface Review {
  id: string;
  author: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  verified: boolean;
  helpful: number;
  images?: string[];
}

interface VariantOption {
  name: string;
  images: string[]; // Array of image URLs assigned to this variant
}

interface ProductVariant {
  id: string;
  type: 'Color' | 'Size' | 'Style' | 'Material' | 'Pattern' | 'Finish';
  name: string; // e.g., "Color", "Size", "Style"
  options: VariantOption[];
}

interface CountryRedirect {
  countryCode: string;
  redirectUrl: string;
}

interface Folder {
  id: string;
  name: string;
  parentId?: string;
  path: string; // Full path like "Main Folder/Sub Folder"
  createdAt: string;
  products: string[]; // Array of product IDs
}

interface ProductData {
  id?: string;
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
  reviews: Review[];
  reviewCount: number; // Total number of reviews (including default ones)
  variants: ProductVariant[]; // Flexible variants like Shopify (Color/Size/Style/etc.)
  specifications: { [key: string]: string };
  stock: number;
  store: string;
  route?: string;
      aboutThisItem: string[];
    productDetails: { [key: string]: string };
    technicalDetails: { [key: string]: string };
    countryRedirects: CountryRedirect[]; // Per-product redirect overrides
    notes?: string; // Admin-only notes
    amazonLink?: string; // Admin-only Amazon link
    adHeadline?: string; // Facebook ad headline
    adCopy?: string; // Facebook ad copy
    adCreatives?: string[]; // Selected images for Facebook ads
    autoIncludeReviewImages?: boolean; // Switch to auto-include review images in creatives
    folderId?: string; // ID of the folder this product belongs to
}

const ProductBuilderSimple = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Error state for debugging
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Error boundary effect
  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      console.error('Unhandled error:', error);
      setHasError(true);
      setErrorMessage('An unexpected error occurred. Please try again.');
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  // Load products and folders from localStorage
  useEffect(() => {
    try {
      const savedProducts = localStorage.getItem('createdProducts');
      if (savedProducts) {
        const products = JSON.parse(savedProducts);
        setCreatedProducts(Array.isArray(products) ? products : []);
      }
      
      const savedFolders = localStorage.getItem('productFolders');
      if (savedFolders) {
        const folders = JSON.parse(savedFolders);
        setFolders(Array.isArray(folders) ? folders : []);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      setCreatedProducts([]);
      setFolders([]);
    }
  }, []);
  
  // PIN protection
  const { isAuthenticated, login } = useAdminAuth();
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  
  // Product management
  const [viewMode, setViewMode] = useState<'manage' | 'create'>('manage');
  const [createdProducts, setCreatedProducts] = useState<ProductData[]>([]);
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  
  // Folder management
  const [folders, setFolders] = useState<Folder[]>([]);
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [selectedParentFolder, setSelectedParentFolder] = useState<string>('');

  const [productData, setProductData] = useState<ProductData>({
    name: '',
    price: '£9.99',
    originalPrice: '£99.99',
    description: '',
    category: 'Home & Garden',
    features: [''],
    images: [],
    amazonChoice: false,
    prime: true,
    rating: 4.5,
    reviews: [],
    reviewCount: 12743, // Default review count
    variants: [],
    specifications: {},
    stock: 100,
    store: 'Amazon',
    aboutThisItem: [''],
    productDetails: {},
    technicalDetails: {},
    countryRedirects: [],
    autoIncludeReviewImages: true // Default to true
  });

  const categories = [
    'Home & Garden', 'Electronics', 'Clothing', 'Sports & Outdoors',
    'Beauty', 'Books', 'Health & Personal Care', 'Baby', 'Toys & Games',
    'Automotive', 'Tools & Home Improvement', 'Grocery & Gourmet Food',
    'Pet Supplies', 'Office Products', 'Industrial & Scientific',
    'Arts, Crafts & Sewing', 'Musical Instruments', 'Video Games',
    'Computers & Accessories', 'Cell Phones & Accessories', 'Camera & Photo',
    'TV & Home Theater', 'Headphones', 'Kitchen & Dining',
    'Patio, Lawn & Garden', 'Appliances', 'Furniture', 'Bedding & Bath',
    'Storage & Organization', 'Lighting & Ceiling Fans', 'Home Décor',
    'Jewelry', 'Shoes', 'Handbags & Wallets', 'Watches', 'Luggage',
    'Exercise & Fitness', 'Outdoor Recreation', 'Fan Shop',
    'Vitamins & Dietary Supplements', 'Medical Supplies & Equipment'
  ];

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

  // Load products on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('createdProducts');
      if (saved) {
        const parsedProducts = JSON.parse(saved);
        if (Array.isArray(parsedProducts)) {
          setCreatedProducts(parsedProducts);
        } else {
          console.warn('Invalid product data in localStorage, resetting to empty array');
          setCreatedProducts([]);
        }
      }
    } catch (error) {
      console.error('Error loading created products:', error);
      setCreatedProducts([]);
    }
  }, []);

  // Handle URL parameters for direct edit/create access
  useEffect(() => {
    const editId = searchParams.get('edit');
    const createMode = searchParams.get('create');
    
    if (editId) {
      // Load the product for editing
      try {
        const saved = localStorage.getItem('createdProducts');
        if (saved) {
          const parsedProducts = JSON.parse(saved);
          const productToEdit = parsedProducts.find((p: ProductData) => p.id === editId);
          if (productToEdit) {
            loadForEditing(productToEdit);
          } else {
            console.warn(`Product with ID ${editId} not found`);
            setViewMode('manage');
          }
        }
      } catch (error) {
        console.error('Error loading product for editing:', error);
        setViewMode('manage');
      }
    } else if (createMode === 'true') {
      // Direct create mode
      resetForm();
      setViewMode('create');
    }
  }, [searchParams, createdProducts]);

  // PIN authentication
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(pinInput)) {
      setPinError('');
      setPinInput('');
    } else {
      setPinError('Invalid PIN. Please try again.');
      setPinInput('');
    }
  };

  // Helper component for tooltips
  const HelpTooltip = ({ text }: { text: string }) => (
    <div className="group relative inline-block">
      <span className="cursor-help text-blue-500 hover:text-blue-700 text-sm">?</span>
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 max-w-xs">
        {text}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
      </div>
    </div>
  );

  // Product management functions
  const saveProduct = (product: ProductData) => {
    try {
      const saved = JSON.parse(localStorage.getItem('createdProducts') || '[]');
      const thumbnail = Array.isArray(product.images) && product.images[0] ? product.images[0] : '/placeholder.svg';
      const updated = [...saved, { ...product, images: [thumbnail] }];
      localStorage.setItem('createdProducts', JSON.stringify(updated));
      setCreatedProducts(updated);
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error saving product. Please try again.');
    }
  };

  const updateProduct = (id: string, product: ProductData) => {
    try {
      const saved = JSON.parse(localStorage.getItem('createdProducts') || '[]');
      const thumbnail = Array.isArray(product.images) && product.images[0] ? product.images[0] : '/placeholder.svg';
      const updated = saved.map((p: ProductData) => p.id === id ? { ...product, images: [thumbnail] } : p);
      localStorage.setItem('createdProducts', JSON.stringify(updated));
      setCreatedProducts(updated);
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Error updating product. Please try again.');
    }
  };

  const deleteProduct = (id: string) => {
    try {
      const saved = JSON.parse(localStorage.getItem('createdProducts') || '[]');
      const updated = saved.filter((p: ProductData) => p.id !== id);
      localStorage.setItem('createdProducts', JSON.stringify(updated));
      setCreatedProducts(updated);
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting product. Please try again.');
    }
  };

  const loadForEditing = (product: ProductData) => {
    try {
      // Validate and sanitize the product data to prevent crashes
      const sanitizedProduct: ProductData = {
        id: product.id || '',
        name: product.name || '',
        price: product.price || '£9.99',
        originalPrice: product.originalPrice || '£99.99',
        description: product.description || '',
        category: product.category || 'Home & Garden',
        features: Array.isArray(product.features) ? product.features.filter(f => f !== null && f !== undefined) : [''],
        images: Array.isArray(product.images) ? product.images.filter(img => img !== null && img !== undefined) : [],
        amazonChoice: Boolean(product.amazonChoice),
        prime: Boolean(product.prime),
        rating: typeof product.rating === 'number' ? product.rating : 4.5,
        reviews: Array.isArray(product.reviews) ? product.reviews.filter(r => r !== null && r !== undefined) : [],
        reviewCount: typeof product.reviewCount === 'number' ? product.reviewCount : 12743,
        variants: Array.isArray(product.variants) ? product.variants.filter(v => v !== null && v !== undefined) : [],
        specifications: typeof product.specifications === 'object' && product.specifications ? product.specifications : {},
        stock: typeof product.stock === 'number' ? product.stock : 100,
        store: product.store || 'Amazon',
        route: product.route || '',
        aboutThisItem: Array.isArray(product.aboutThisItem) ? product.aboutThisItem.filter(item => item !== null && item !== undefined) : [''],
        productDetails: typeof product.productDetails === 'object' && product.productDetails ? product.productDetails : {},
        technicalDetails: typeof product.technicalDetails === 'object' && product.technicalDetails ? product.technicalDetails : {},
        countryRedirects: Array.isArray(product.countryRedirects) ? product.countryRedirects.filter(cr => cr !== null && cr !== undefined) : [],
        folderId: product.folderId || undefined,
        notes: product.notes || '',
        amazonLink: product.amazonLink || '',
        adHeadline: product.adHeadline || '',
        adCopy: product.adCopy || '',
        adCreatives: Array.isArray(product.adCreatives) ? product.adCreatives.filter(img => img !== null && img !== undefined) : [],
        autoIncludeReviewImages: Boolean(product.autoIncludeReviewImages)
      };

      setProductData(sanitizedProduct);
      setEditingProduct(sanitizedProduct.id || null);
      setViewMode('create');
    } catch (error) {
      console.error('Error loading product for editing:', error);
      alert('Error loading product for editing. Please try again.');
      // Reset to a safe state
      resetForm();
      setViewMode('manage');
    }
  };

  const resetForm = () => {
    setProductData({
      name: '', price: '£9.99', originalPrice: '£99.99', description: '', category: 'Home & Garden',
      features: [''], images: [], amazonChoice: false, prime: true, rating: 4.5,
      reviews: [], reviewCount: 12743, variants: [], specifications: {}, stock: 100, store: 'Amazon',
      aboutThisItem: [''], productDetails: {}, technicalDetails: {}, countryRedirects: [], notes: '',
      amazonLink: '', adHeadline: '', adCopy: '', adCreatives: [], autoIncludeReviewImages: true
    });
    setEditingProduct(null);
  };

  // Image handling
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      const imagePromises = fileArray.map(file => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            resolve(e.target?.result as string);
          };
          reader.readAsDataURL(file);
        });
      });

      // Wait for all images to load and add them at the beginning (last selected = first)
      Promise.all(imagePromises).then(imageUrls => {
        setProductData(prev => ({ ...prev, images: [...imageUrls, ...prev.images] }));
      });
    }
  };

  const removeImage = (index: number) => {
    setProductData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  };

  const moveImageUp = (index: number) => {
    if (index > 0) {
      setProductData(prev => {
        const newImages = [...prev.images];
        [newImages[index - 1], newImages[index]] = [newImages[index], newImages[index - 1]];
        return { ...prev, images: newImages };
      });
    }
  };

  const moveImageDown = (index: number) => {
    setProductData(prev => {
      if (index < prev.images.length - 1) {
        const newImages = [...prev.images];
        [newImages[index], newImages[index + 1]] = [newImages[index + 1], newImages[index]];
        return { ...prev, images: newImages };
      }
      return prev;
    });
  };


  // Variant management functions
  const addVariant = () => {
    const newVariant: ProductVariant = {
      id: `variant-${Date.now()}`,
      type: 'Color',
      name: 'Color',
      options: [{ name: '', images: [] }]
    };
    setProductData(prev => ({
      ...prev,
      variants: [...prev.variants, newVariant]
    }));
  };

  const removeVariant = (variantId: string) => {
    setProductData(prev => ({
      ...prev,
      variants: prev.variants.filter(v => v.id !== variantId)
    }));
  };

  const updateVariantType = (variantId: string, type: ProductVariant['type']) => {
    setProductData(prev => ({
      ...prev,
      variants: prev.variants.map(variant =>
        variant.id === variantId 
          ? { ...variant, type, name: type }
          : variant
      )
    }));
  };

  const updateVariantName = (variantId: string, name: string) => {
    setProductData(prev => ({
      ...prev,
      variants: prev.variants.map(variant =>
        variant.id === variantId 
          ? { ...variant, name }
          : variant
      )
    }));
  };

  const addVariantOption = (variantId: string) => {
    setProductData(prev => ({
      ...prev,
      variants: prev.variants.map(variant =>
        variant.id === variantId 
          ? { ...variant, options: [...variant.options, { name: '', images: [] }] }
          : variant
      )
    }));
  };

  const removeVariantOption = (variantId: string, optionIndex: number) => {
    setProductData(prev => ({
      ...prev,
      variants: prev.variants.map(variant =>
        variant.id === variantId 
          ? { ...variant, options: variant.options.filter((_, i) => i !== optionIndex) }
          : variant
      )
    }));
  };

  const updateVariantOptionName = (variantId: string, optionIndex: number, name: string) => {
    setProductData(prev => ({
      ...prev,
      variants: prev.variants.map(variant =>
        variant.id === variantId 
          ? { 
              ...variant, 
              options: variant.options.map((option, i) => 
                i === optionIndex ? { ...option, name } : option
              )
            }
          : variant
      )
    }));
  };

  const assignImageToVariantOption = (variantId: string, optionIndex: number, imageUrl: string) => {
    setProductData(prev => ({
      ...prev,
      variants: prev.variants.map(variant =>
        variant.id === variantId 
          ? { 
              ...variant, 
              options: variant.options.map((option, i) => 
                i === optionIndex 
                  ? { ...option, images: [imageUrl] } // Replace with single image, not add to array
                  : option
              )
            }
          : variant
      )
    }));
  };

  const removeImageFromVariantOption = (variantId: string, optionIndex: number, imageUrl: string) => {
    setProductData(prev => ({
      ...prev,
      variants: prev.variants.map(variant =>
        variant.id === variantId 
          ? { 
              ...variant, 
              options: variant.options.map((option, i) => 
                i === optionIndex 
                  ? { ...option, images: option.images.filter(img => img !== imageUrl) }
                  : option
              )
            }
          : variant
      )
    }));
  };

  // Feature management
  const addFeature = () => setProductData(prev => ({ ...prev, features: [...prev.features, ''] }));
  const updateFeature = (index: number, value: string) => {
    setProductData(prev => ({ ...prev, features: prev.features.map((f, i) => i === index ? value : f) }));
  };
  const removeFeature = (index: number) => {
    setProductData(prev => ({ ...prev, features: prev.features.filter((_, i) => i !== index) }));
  };

  // Review management
  // Random names for reviews
  const randomNames = [
    'Alex Johnson', 'Sarah Williams', 'Mike Chen', 'Emma Davis', 'David Rodriguez',
    'Lisa Thompson', 'James Wilson', 'Maria Garcia', 'Robert Brown', 'Jennifer Lee',
    'John Smith', 'Amanda Taylor', 'Chris Anderson', 'Rachel Green', 'Kevin Martinez',
    'TechGuru2023', 'HomeImprover', 'QualitySeeker', 'BudgetBuyer', 'StyleHunter',
    'MomOfThree', 'DIYMaster', 'GadgetLover', 'FitnessFanatic', 'BookWorm',
    'PetLover', 'GardenExpert', 'CookingPro', 'TravelBug', 'MusicLover'
  ];

  const getRandomName = () => {
    const usedNames = productData.reviews.map(review => review.author);
    const availableNames = randomNames.filter(name => !usedNames.includes(name));
    if (availableNames.length === 0) {
      // If all names are used, add a number to make it unique
      const baseName = randomNames[Math.floor(Math.random() * randomNames.length)];
      return `${baseName}${Math.floor(Math.random() * 1000)}`;
    }
    return availableNames[Math.floor(Math.random() * availableNames.length)];
  };

  const addReview = () => {
    const newReview: Review = {
      id: Date.now().toString(),
      author: getRandomName(),
      rating: 5,
      title: '',
      content: '',
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      verified: true,
      helpful: Math.floor(Math.random() * 21) + 1, // Random number between 1-21
      images: []
    };
    setProductData(prev => ({ ...prev, reviews: [...prev.reviews, newReview] }));
  };

  const updateReview = (id: string, field: keyof Review, value: any) => {
    setProductData(prev => ({
      ...prev,
      reviews: prev.reviews.map(r => r.id === id ? { ...r, [field]: value } : r)
    }));
  };

  const removeReview = (id: string) => {
    setProductData(prev => ({ ...prev, reviews: prev.reviews.filter(r => r.id !== id) }));
  };

  // Handle review image uploads
  const handleReviewImageUpload = async (reviewId: string, files: FileList) => {
    const validFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
    
    if (validFiles.length === 0) return;

    try {
      const imageUrls = await Promise.all(
        validFiles.map(file => {
          return new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target?.result as string);
            reader.readAsDataURL(file);
          });
        })
      );

      setProductData(prev => ({
        ...prev,
        reviews: prev.reviews.map(review => 
          review.id === reviewId 
            ? { ...review, images: [...(review.images || []), ...imageUrls] }
            : review
        )
      }));
    } catch (error) {
      console.error('Error uploading review images:', error);
    }
  };

  const removeReviewImage = (reviewId: string, imageIndex: number) => {
    setProductData(prev => ({
      ...prev,
      reviews: prev.reviews.map(review => 
        review.id === reviewId 
          ? { ...review, images: review.images?.filter((_, index) => index !== imageIndex) || [] }
          : review
      )
    }));
  };

  // Creative management functions
  const handleCreativeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      const imagePromises = fileArray.map(file => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            resolve(e.target?.result as string);
          };
          reader.readAsDataURL(file);
        });
      });

      Promise.all(imagePromises).then(imageUrls => {
        setProductData(prev => ({ 
          ...prev, 
          adCreatives: [...(prev.adCreatives || []), ...imageUrls] 
        }));
      });
    }
  };

  const handleCreativeDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files) {
      const fileArray = Array.from(files);
      const imagePromises = fileArray.map(file => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            resolve(e.target?.result as string);
          };
          reader.readAsDataURL(file);
        });
      });

      Promise.all(imagePromises).then(imageUrls => {
        setProductData(prev => ({ 
          ...prev, 
          adCreatives: [...(prev.adCreatives || []), ...imageUrls] 
        }));
      });
    }
  };

  const removeCreative = (index: number) => {
    setProductData(prev => ({
      ...prev,
      adCreatives: prev.adCreatives?.filter((_, i) => i !== index) || []
    }));
  };

  // Get all review images automatically
  const getAllReviewImages = () => {
    const allReviewImages: string[] = [];
    productData.reviews.forEach(review => {
      if (review.images && review.images.length > 0) {
        allReviewImages.push(...review.images);
      }
    });
    return allReviewImages;
  };

  // Auto-include review images in creatives when component mounts or reviews change
  useEffect(() => {
    // Only auto-include if the switch is enabled
    if (productData.autoIncludeReviewImages) {
      const reviewImages = getAllReviewImages();
      if (reviewImages.length > 0) {
        setProductData(prev => {
          const currentCreatives = prev.adCreatives || [];
          const newReviewImages = reviewImages.filter(img => !currentCreatives.includes(img));
          if (newReviewImages.length > 0) {
            return { ...prev, adCreatives: [...currentCreatives, ...newReviewImages] };
          }
          return prev;
        });
      }
    }
  }, [productData.reviews, productData.autoIncludeReviewImages]);

  // Country redirect management
  const addCountryRedirect = () => {
    const newRedirect: CountryRedirect = {
      countryCode: 'UK',
      redirectUrl: ''
    };
    setProductData(prev => ({
      ...prev,
      countryRedirects: [...prev.countryRedirects, newRedirect]
    }));
  };

  const updateCountryRedirect = (index: number, field: keyof CountryRedirect, value: string) => {
    setProductData(prev => ({
      ...prev,
      countryRedirects: prev.countryRedirects.map((redirect, i) => 
        i === index ? { ...redirect, [field]: value } : redirect
      )
    }));
  };

  const removeCountryRedirect = (index: number) => {
    setProductData(prev => ({
      ...prev,
      countryRedirects: prev.countryRedirects.filter((_, i) => i !== index)
    }));
  };

  // Export/Import functionality
  const exportProducts = () => {
    try {
      const productsData = JSON.stringify(createdProducts, null, 2);
      const blob = new Blob([productsData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `amazon-products-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      alert('Products exported successfully!');
    } catch (error) {
      console.error('Error exporting products:', error);
      alert('Error exporting products. Please try again.');
    }
  };

  const importProducts = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedProducts = JSON.parse(e.target?.result as string);
        
        if (Array.isArray(importedProducts)) {
          // Merge with existing products, avoiding duplicates
          const existingIds = new Set(createdProducts.map(p => p.id));
          const newProducts = importedProducts.filter((p: ProductData) => !existingIds.has(p.id));
          
          if (newProducts.length === 0) {
            alert('No new products to import. All products already exist.');
            return;
          }

          const updatedProducts = [...createdProducts, ...newProducts];
          localStorage.setItem('createdProducts', JSON.stringify(updatedProducts));
          setCreatedProducts(updatedProducts);
          
          alert(`Successfully imported ${newProducts.length} products!`);
        } else {
          alert('Invalid file format. Please select a valid export file.');
        }
      } catch (error) {
        console.error('Error importing products:', error);
        alert('Error importing products. Please check the file format.');
      }
    };
    reader.readAsText(file);
    
    // Reset the input
    event.target.value = '';
  };

  // Folder management functions
  const createFolder = (name: string, parentId?: string) => {
    const parentFolder = parentId ? folders.find(f => f.id === parentId) : null;
    const parentPath = parentFolder ? parentFolder.path : '';
    const newPath = parentPath ? `${parentPath}/${name}` : name;
    
    const newFolder: Folder = {
      id: Date.now().toString(),
      name,
      parentId,
      path: newPath,
      createdAt: new Date().toISOString(),
      products: []
    };
    
    setFolders(prev => [...prev, newFolder]);
    localStorage.setItem('productFolders', JSON.stringify([...folders, newFolder]));
    return newFolder;
  };

  const deleteFolder = (folderId: string) => {
    // Remove folder and all its subfolders
    const folderToDelete = folders.find(f => f.id === folderId);
    if (!folderToDelete) return;
    
    const foldersToDelete = folders.filter(f => 
      f.id === folderId || f.path.startsWith(folderToDelete.path + '/')
    );
    
    const remainingFolders = folders.filter(f => 
      !foldersToDelete.some(toDelete => toDelete.id === f.id)
    );
    
    // Remove products from deleted folders
    const productsToUpdate = createdProducts.map(product => {
      if (foldersToDelete.some(f => f.products.includes(product.id!))) {
        return { ...product, folderId: undefined };
      }
      return product;
    });
    
    setFolders(remainingFolders);
    setCreatedProducts(productsToUpdate);
    localStorage.setItem('productFolders', JSON.stringify(remainingFolders));
    localStorage.setItem('createdProducts', JSON.stringify(productsToUpdate));
  };

  const getFolderTree = () => {
    const rootFolders = folders.filter(f => !f.parentId);
    return rootFolders.map(folder => buildFolderTree(folder));
  };

  const buildFolderTree = (folder: Folder) => {
    const children = folders.filter(f => f.parentId === folder.id);
    return {
      ...folder,
      children: children.map(child => buildFolderTree(child))
    };
  };

  const getFolderPath = (folderId: string): string => {
    const folder = folders.find(f => f.id === folderId);
    return folder ? folder.path : '';
  };

  // HTML sanitization function to allow safe formatting
  const sanitizeHtml = (html: string): string => {
    // Create a temporary div to parse and sanitize HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    
    // Allow safe formatting tags
    const allowedTags = ['b', 'strong', 'i', 'em', 'u', 'br', 'p', 'div', 'span', 'ul', 'ol', 'li'];
    const allowedAttributes = ['style', 'class'];
    
    // Remove all tags except allowed ones
    const walker = document.createTreeWalker(
      tempDiv,
      NodeFilter.SHOW_ELEMENT,
      null
    );
    
    const nodesToRemove: Element[] = [];
    let node: Element | null;
    
    while ((node = walker.nextNode() as Element)) {
      if (!allowedTags.includes(node.tagName.toLowerCase())) {
        nodesToRemove.push(node);
      } else {
        // Remove disallowed attributes
        const attributes = Array.from(node.attributes);
        attributes.forEach(attr => {
          if (!allowedAttributes.includes(attr.name)) {
            node.removeAttribute(attr.name);
          }
        });
      }
    }
    
    // Remove disallowed nodes
    nodesToRemove.forEach(node => {
      if (node.parentNode) {
        node.parentNode.removeChild(node);
      }
    });
    
    return tempDiv.innerHTML;
  };

  // Create/Update product
  const handleSave = async () => {
    if (!productData.name || productData.images.length === 0) {
      alert('Please provide at least a product name and one image.');
      return;
    }

    setIsCreating(true);
    try {
      const avgRating = productData.reviews.length > 0 
        ? productData.reviews.reduce((sum, r) => sum + r.rating, 0) / productData.reviews.length
        : productData.rating;

      const productId = editingProduct || Date.now().toString();
      const route = '/' + productData.name.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-').substring(0, 50);

      const fullProduct = {
        ...productData,
        id: productId,
        route,
        rating: Number(avgRating.toFixed(1))
        // Keep the reviewCount as set by the user, don't override it
      };

      const registryProduct = {
        id: productId,
        name: productData.name,
        price: productData.price,
        originalPrice: productData.originalPrice,
        rating: Number(avgRating.toFixed(1)),
        reviews: productData.reviewCount, // Use the user-set review count
        image: productData.images[0],
        prime: productData.prime,
        amazonChoice: productData.amazonChoice,
        category: productData.category,
        route,
        description: productData.description,
        features: productData.features.filter(f => f.trim() !== '')
      };

      if (editingProduct) {
        updateProduct(productId, fullProduct);
        alert('Product updated successfully!');
      } else {
        addProductWithAutoCollection(registryProduct);
        saveProduct(fullProduct);
        alert('Product created successfully!');
      }

      registerDynamicProduct(fullProduct);
      resetForm();
      setViewMode('manage');
    } catch (error) {
      alert('Error saving product. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  // PIN Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl w-full max-w-md">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl flex items-center justify-center mb-6 animate-pulse">
              <Edit className="text-white text-2xl w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent mb-3">Product Builder</h1>
            <p className="text-white/70">Enter your 6-digit PIN to access the Product Builder</p>
          </div>
          
          <form onSubmit={handlePinSubmit} className="space-y-4">
            <input
              type="password"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value.replace(/\D/g, '').slice(0, 6))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center text-2xl tracking-widest focus:ring-2 focus:ring-blue-500"
              placeholder="••••••"
              maxLength={6}
            />
            {pinError && <p className="text-red-600 text-sm">{pinError}</p>}
            
            <button
              type="submit"
              disabled={pinInput.length !== 6}
              className="w-full bg-[#ff9900] hover:bg-[#e88800] disabled:bg-gray-300 text-white font-medium py-3 rounded-lg"
            >
              Access Product Builder
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <button onClick={() => navigate('/')} className="text-[#007185] hover:underline text-sm">
              ← Back to Homepage
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Error recovery
  if (hasError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-red-600 text-2xl">⚠️</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h1>
            <p className="text-gray-600 mb-4">{errorMessage || 'An error occurred while editing the product.'}</p>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={() => {
                setHasError(false);
                setErrorMessage('');
                resetForm();
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg"
            >
              Reset and Continue
            </button>
            
            <button
              onClick={() => navigate('/admin')}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 rounded-lg"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50/30">
      <Header />
      
      <div className="max-w-[1920px] mx-auto px-4 py-6">
        {/* Header */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <button onClick={() => navigate('/admin')} className="flex items-center text-[#007185] hover:text-[#c45500]">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
                </button>
                <span className="text-gray-300">|</span>
                <button onClick={() => navigate('/')} className="flex items-center text-[#007185] hover:text-[#c45500]">
                  Homepage
                </button>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Product Builder</h1>
              <p className="text-gray-600">Create and manage professional Amazon-style product pages</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => navigate('/admin')}
                className="flex items-center px-3 py-2 bg-indigo-50 text-indigo-700 rounded-md hover:bg-indigo-100 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Dashboard
              </button>
              <button
                onClick={() => {
                  setViewMode(viewMode === 'manage' ? 'create' : 'manage');
                  if (viewMode === 'create') resetForm();
                }}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                {viewMode === 'manage' ? '+ Create New Product' : '📋 Manage Products'}
              </button>
            </div>
          </div>
        </div>

        {/* Product Management */}
        {viewMode === 'manage' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Your Created Products</h2>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">{createdProducts.length} products</span>
                {createdProducts.length > 0 && (
                  <button
                    onClick={exportProducts}
                    className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 flex items-center gap-1"
                  >
                    📤 Export
                  </button>
                )}
                <label className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 cursor-pointer flex items-center gap-1">
                  📥 Import
                  <input
                    type="file"
                    accept=".json"
                    onChange={importProducts}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
            
            {createdProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📦</span>
                </div>
                <h3 className="text-lg font-medium mb-2">No products created yet</h3>
                <p className="text-gray-500 mb-4 text-sm">Create products here or import them from another device</p>
                <div className="flex gap-3 justify-center">
                  <button onClick={() => setViewMode('create')} className="bg-[#ff9900] text-white px-6 py-2 rounded-md hover:bg-[#e88800]">
                    Create Your First Product
                  </button>
                  <label className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer">
                    📥 Import Products
                    <input
                      type="file"
                      accept=".json"
                      onChange={importProducts}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {createdProducts.map((product) => (
                  <div key={product.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="aspect-square mb-3 bg-gray-50 border rounded flex items-center justify-center">
                      {product.images?.[0] ? (
                        <img src={product.images[0]} alt={product.name} className="max-w-full max-h-full object-contain" />
                      ) : (
                        <span className="text-gray-400">No Image</span>
                      )}
                    </div>
                    <h3 className="font-medium text-sm mb-2 line-clamp-2">{product.name}</h3>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-bold">{product.price}</span>
                      <span className="text-sm text-gray-500">{product.category}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(product.route || '')}
                        className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 flex items-center justify-center gap-1"
                      >
                        <Eye className="w-3 h-3" /> View
                      </button>
                      <button
                        onClick={() => loadForEditing(product)}
                        className="flex-1 bg-green-600 text-white px-3 py-2 rounded text-sm hover:bg-green-700 flex items-center justify-center gap-1"
                      >
                        <Edit className="w-3 h-3" /> Edit
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('Delete this product?')) deleteProduct(product.id!);
                        }}
                        className="flex-1 bg-red-600 text-white px-3 py-2 rounded text-sm hover:bg-red-700 flex items-center justify-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Product Creation Form */}
        {viewMode === 'create' && (
          <div className="space-y-6">
            {editingProduct && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <span className="text-blue-600 mr-2">✏️</span>
                <span className="font-medium text-blue-900">Editing: {productData.name || 'Untitled Product'}</span>
              </div>
            )}

            {/* 1. Images */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-lg font-semibold">1. Product Images</h2>
                <HelpTooltip text="Upload high-quality photos. First image becomes the main thumbnail." />
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {productData.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img src={image} alt={`Product ${index + 1}`} className="w-full aspect-square object-contain rounded-lg border" />
                    
                    {/* Remove button */}
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    
                    {/* Reorder buttons */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {index > 0 && (
                        <button
                          onClick={() => moveImageUp(index)}
                          className="bg-blue-500 text-white rounded-full p-1 hover:bg-blue-600"
                          title="Move up"
                        >
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M7 14l5-5 5 5z"/>
                          </svg>
                        </button>
                      )}
                      {index < productData.images.length - 1 && (
                        <button
                          onClick={() => moveImageDown(index)}
                          className="bg-blue-500 text-white rounded-full p-1 hover:bg-blue-600"
                          title="Move down"
                        >
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M7 10l5 5 5-5z"/>
                          </svg>
                        </button>
                      )}
                    </div>
                    
                    {/* Main image badge */}
                    {index === 0 && <div className="absolute bottom-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded font-medium">Main</div>}
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">#{index + 1}</div>
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
            </div>

            {/* 2. Basic Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-lg font-semibold">2. Basic Information</h2>
                <HelpTooltip text="Enter the main details customers will see." />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    Product Name * <HelpTooltip text="Descriptive title that appears as the main heading." />
                  </label>
                  <input
                    type="text"
                    value={productData.name}
                    onChange={(e) => setProductData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Premium Wireless Bluetooth Headphones"
                  />
                </div>
                
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    Current Price * <HelpTooltip text="The selling price with currency symbol." />
                  </label>
                  <input
                    type="text"
                    value={productData.price}
                    onChange={(e) => setProductData(prev => ({ ...prev, price: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="£9.99"
                  />
                </div>
                
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    Original Price <HelpTooltip text="Higher price to show discount. Leave blank if no discount." />
                  </label>
                  <input
                    type="text"
                    value={productData.originalPrice}
                    onChange={(e) => setProductData(prev => ({ ...prev, originalPrice: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="£99.99"
                  />
                </div>
                
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    Category <HelpTooltip text="Choose the most relevant category." />
                  </label>
                  <select
                    value={productData.category}
                    onChange={(e) => setProductData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  >
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    Store/Brand <HelpTooltip text="Brand name that appears on the product page." />
                  </label>
                  <input
                    type="text"
                    value={productData.store}
                    onChange={(e) => setProductData(prev => ({ ...prev, store: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Amazon Basics"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    Amazon Link (Admin Only) <HelpTooltip text="The actual Amazon product URL. Only visible to admins." />
                  </label>
                  <input
                    type="url"
                    value={productData.amazonLink || ''}
                    onChange={(e) => setProductData(prev => ({ ...prev, amazonLink: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="https://www.amazon.co.uk/product-url"
                  />
                  <p className="text-xs text-gray-500 mt-1">This link is only visible to admins and won't be shown to customers.</p>
                </div>

                <div className="md:col-span-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    Add to Folder <HelpTooltip text="Organize products into folders for better management." />
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={productData.folderId || ''}
                      onChange={(e) => setProductData(prev => ({ ...prev, folderId: e.target.value || undefined }))}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">📁 No folder (root level)</option>
                      {folders.map(folder => (
                        <option key={folder.id} value={folder.id}>
                          📁 {folder.name}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => setShowFolderModal(true)}
                      className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      New Folder
                    </button>
                  </div>
                  {productData.folderId && (
                    <p className="text-xs text-gray-500 mt-1">
                      ✅ Product will be saved to folder: {folders.find(f => f.id === productData.folderId)?.name || 'Unknown'}
                    </p>
                  )}
                </div>

              </div>
            </div>

            {/* 3. Settings */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-lg font-semibold">3. Product Settings</h2>
                <HelpTooltip text="Configure badges, ratings, and inventory." />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={productData.amazonChoice}
                      onChange={(e) => setProductData(prev => ({ ...prev, amazonChoice: e.target.checked }))}
                      className="mr-2"
                    />
                    <span className="flex items-center gap-1">
                      Amazon's Choice <HelpTooltip text="Shows trusted product badge." />
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={productData.prime}
                      onChange={(e) => setProductData(prev => ({ ...prev, prime: e.target.checked }))}
                      className="mr-2"
                    />
                    <span className="flex items-center gap-1">
                      Prime Eligible <HelpTooltip text="Shows Prime badge and free delivery." />
                    </span>
                  </label>
                </div>
                
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    Base Rating <HelpTooltip text="Starting rating (1-5). Reviews will average with this." />
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    step="0.1"
                    value={productData.rating}
                    onChange={(e) => setProductData(prev => ({ ...prev, rating: parseFloat(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    Stock <HelpTooltip text="Available quantity. Shows stock status messages." />
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={productData.stock}
                    onChange={(e) => setProductData(prev => ({ ...prev, stock: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* 4. Product Variants (Shopify-style) */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-lg font-semibold">4. Product Variants</h2>
                <HelpTooltip text="Add product variants like Color, Size, Style, etc. Just like Shopify! You can add multiple variant types and assign images to each option." />
              </div>
              
              <div className="space-y-6">
                {productData.variants.map((variant) => (
                  <div key={variant.id} className="border border-gray-200 rounded-lg p-4">
                    {/* Variant Type Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex-1">
                        <label className="text-sm font-medium text-gray-700 mb-1 block">Variant Type:</label>
                        <select
                          value={variant.type}
                          onChange={(e) => updateVariantType(variant.id, e.target.value as ProductVariant['type'])}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="Color">Color</option>
                          <option value="Size">Size</option>
                          <option value="Style">Style</option>
                          <option value="Material">Material</option>
                          <option value="Pattern">Pattern</option>
                          <option value="Finish">Finish</option>
                        </select>
                      </div>
                      <div className="flex-1">
                        <label className="text-sm font-medium text-gray-700 mb-1 block">Display Name:</label>
                        <input
                          type="text"
                          value={variant.name}
                          onChange={(e) => updateVariantName(variant.id, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                          placeholder="e.g., Color, Size, Style"
                        />
                      </div>
                      {productData.variants.length > 1 && (
                        <button 
                          onClick={() => removeVariant(variant.id)}
                          className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md mt-6"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {/* Variant Options */}
                    <div className="space-y-4">
                      <label className="text-sm font-medium text-gray-700 block">
                        {variant.name} Options:
                      </label>
                      
                      {variant.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="border border-gray-100 rounded-lg p-3 bg-gray-50">
                          <div className="flex items-center gap-2 mb-3">
                            <input
                              type="text"
                              value={option.name}
                              onChange={(e) => updateVariantOptionName(variant.id, optionIndex, e.target.value)}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 bg-white"
                              placeholder={`${variant.name} name (e.g., Black, Large, Modern)`}
                            />
                            {variant.options.length > 1 && (
                              <button 
                                onClick={() => removeVariantOption(variant.id, optionIndex)}
                                className="px-2 py-2 text-red-600 hover:bg-red-50 rounded-md"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                          
                          {/* Option-specific image (single) */}
                          <div className="mb-3">
                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                              Image for {option.name || 'this option'}:
                            </label>
                            {option.images.length > 0 ? (
                              <div className="relative group w-20 h-20">
                                <img 
                                  src={option.images[0]} 
                                  alt={`${option.name} image`}
                                  className="w-full h-full object-contain rounded border-2 border-green-400"
                                />
                                <button
                                  onClick={() => removeImageFromVariantOption(variant.id, optionIndex, option.images[0])}
                                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                                <div className="absolute bottom-0 left-0 right-0 bg-green-500 text-white text-xs px-1 py-0.5 rounded-b">
                                  ✓ Assigned
                                </div>
                              </div>
                            ) : (
                              <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded flex items-center justify-center text-gray-400 text-xs">
                                No image
                              </div>
                            )}
                          </div>
                          
                          {/* Available images to assign */}
                          {productData.images.length > 0 && option.images.length === 0 && (
                            <div>
                              <label className="text-sm font-medium text-gray-700 mb-2 block">
                                Choose an image from gallery:
                              </label>
                              <div className="grid grid-cols-6 gap-2">
                                {productData.images.map((imageUrl, imgIndex) => (
                                  <div key={imgIndex} className="relative">
                                    <div 
                                      className="relative w-full aspect-square cursor-pointer group"
                                      onClick={() => assignImageToVariantOption(variant.id, optionIndex, imageUrl)}
                                    >
                                      <img 
                                        src={imageUrl} 
                                        alt={`Available ${imgIndex + 1}`}
                                        className="w-full h-full object-contain rounded border-2 border-gray-200 group-hover:border-blue-400 transition-colors"
                                      />
                                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded">
                                        <Plus className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {option.images.length > 0 && (
                            <div className="text-xs text-gray-500 mt-2">
                              💡 Click the ✗ above to remove and choose a different image
                            </div>
                          )}
                        </div>
                      ))}
                      
                      <button 
                        onClick={() => addVariantOption(variant.id)} 
                        className="flex items-center px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-md"
                      >
                        <Plus className="w-4 h-4 mr-2" /> Add {variant.name} Option
                      </button>
                    </div>
                  </div>
                ))}
                
                <button 
                  onClick={addVariant} 
                  className="flex items-center px-3 py-2 text-green-600 hover:bg-green-50 rounded-md border border-green-200"
                >
                  <Plus className="w-4 h-4 mr-2" /> Add New Variant Type
                </button>
              </div>
            </div>



            {/* 6. About This Item */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-lg font-semibold">5. About This Item</h2>
                <HelpTooltip text="Detailed bullet points for the 'About this item' section. Copy from Amazon if needed. Formatting (bold, italic, line breaks) will be preserved when pasting." />
              </div>
              
              <div className="space-y-3">
                {productData.aboutThisItem.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <div
                      contentEditable
                      dangerouslySetInnerHTML={{ __html: item }}
                      onBlur={(e) => {
                        try {
                          const newContent = e.currentTarget.innerHTML;
                          setProductData(prev => ({
                            ...prev,
                            aboutThisItem: prev.aboutThisItem.map((itm, i) => i === index ? newContent : itm)
                          }));
                        } catch (error) {
                          console.error('Error updating about this item:', error);
                          setHasError(true);
                          setErrorMessage('Error updating content. Please try again.');
                        }
                      }}
                      onPaste={(e) => {
                        try {
                          e.preventDefault();
                          
                          // Get HTML content first, then fallback to plain text
                          let htmlContent = e.clipboardData.getData('text/html');
                          const plainText = e.clipboardData.getData('text/plain');
                          
                          // If no HTML content, use plain text
                          if (!htmlContent) {
                            htmlContent = plainText;
                          }
                          
                          // Sanitize HTML to allow safe formatting tags
                          const sanitizedHtml = sanitizeHtml(htmlContent);
                          
                          // Insert the formatted content
                          setTimeout(() => {
                            document.execCommand('insertHTML', false, sanitizedHtml);
                          }, 0);
                        } catch (error) {
                          console.error('Error handling paste:', error);
                          setHasError(true);
                          setErrorMessage('Error pasting content. Please try again.');
                        }
                      }}
                      onInput={(e) => {
                        // Prevent React from interfering with contentEditable
                        e.stopPropagation();
                      }}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 min-h-[60px] outline-none"
                      style={{ whiteSpace: 'pre-wrap' }}
                      data-placeholder="Enter detailed product information (can copy from Amazon - formatting will be preserved)"
                    />
                    <button 
                      onClick={() => setProductData(prev => ({
                        ...prev,
                        aboutThisItem: prev.aboutThisItem.filter((_, i) => i !== index)
                      }))}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button 
                  onClick={() => setProductData(prev => ({
                    ...prev,
                    aboutThisItem: [...prev.aboutThisItem, '']
                  }))}
                  className="flex items-center px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-md"
                >
                  <Plus className="w-4 h-4 mr-2" /> Add Item
                </button>
              </div>
            </div>

            {/* 7. Product Details */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-lg font-semibold">6. Product Details</h2>
                <HelpTooltip text="Key-value pairs for the Product Details section (Brand, Material, Dimensions, etc.)" />
              </div>
              
              <div className="space-y-3 mb-4">
                {Object.entries(productData.productDetails).map(([key, value]) => (
                  <div key={key} className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={key}
                      onChange={(e) => {
                        const newDetails = { ...productData.productDetails };
                        delete newDetails[key];
                        newDetails[e.target.value] = value;
                        setProductData(prev => ({ ...prev, productDetails: newDetails }));
                      }}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      placeholder="Detail name (e.g., Brand, Material)"
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => {
                          setProductData(prev => ({
                            ...prev,
                            productDetails: { ...prev.productDetails, [key]: e.target.value }
                          }));
                          
                          // Auto-add new field if both key and value are filled
                          if (key.trim() && e.target.value.trim()) {
                            const hasEmptyField = Object.entries(productData.productDetails).some(([k, v]) => 
                              k.trim() === '' || v.trim() === ''
                            );
                            if (!hasEmptyField) {
                              setProductData(prev => ({
                                ...prev,
                                productDetails: { ...prev.productDetails, '': '' }
                              }));
                            }
                          }
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        placeholder="Detail value"
                      />
                      <button
                        onClick={() => {
                          const newDetails = { ...productData.productDetails };
                          delete newDetails[key];
                          setProductData(prev => ({ ...prev, productDetails: newDetails }));
                        }}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <button
                onClick={() => setProductData(prev => ({
                  ...prev,
                  productDetails: { ...prev.productDetails, '': '' }
                }))}
                className="flex items-center px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-md"
              >
                <Plus className="w-4 h-4 mr-2" /> Add Product Detail
              </button>
            </div>

            {/* 8. Technical Details */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-lg font-semibold">7. Technical Details</h2>
                <HelpTooltip text="Technical specifications (optional) - more detailed than Product Details." />
              </div>
              
              <div className="space-y-3 mb-4">
                {Object.entries(productData.technicalDetails).map(([key, value]) => (
                  <div key={key} className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={key}
                      onChange={(e) => {
                        const newDetails = { ...productData.technicalDetails };
                        delete newDetails[key];
                        newDetails[e.target.value] = value;
                        setProductData(prev => ({ ...prev, technicalDetails: newDetails }));
                      }}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      placeholder="Technical spec name"
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => {
                          setProductData(prev => ({
                            ...prev,
                            technicalDetails: { ...prev.technicalDetails, [key]: e.target.value }
                          }));
                          
                          // Auto-add new field if both key and value are filled
                          if (key.trim() && e.target.value.trim()) {
                            const hasEmptyField = Object.entries(productData.technicalDetails).some(([k, v]) => 
                              k.trim() === '' || v.trim() === ''
                            );
                            if (!hasEmptyField) {
                              setProductData(prev => ({
                                ...prev,
                                technicalDetails: { ...prev.technicalDetails, '': '' }
                              }));
                            }
                          }
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        placeholder="Technical spec value"
                      />
                      <button
                        onClick={() => {
                          const newDetails = { ...productData.technicalDetails };
                          delete newDetails[key];
                          setProductData(prev => ({ ...prev, technicalDetails: newDetails }));
                        }}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <button
                onClick={() => setProductData(prev => ({
                  ...prev,
                  technicalDetails: { ...prev.technicalDetails, '': '' }
                }))}
                className="flex items-center px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-md"
              >
                <Plus className="w-4 h-4 mr-2" /> Add Technical Detail
              </button>
            </div>

            {/* 9. Customer Reviews */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold">8. Customer Reviews</h2>
                  <HelpTooltip text="Add realistic customer reviews to build trust and credibility." />
                </div>
                <button onClick={addReview} className="flex items-center px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-2" /> Add Review
                </button>
              </div>
              
              {/* Review Count Field */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Review Count (e.g., 12743)
                </label>
                <input
                  type="number"
                  value={productData.reviewCount}
                  onChange={(e) => setProductData(prev => ({ ...prev, reviewCount: parseInt(e.target.value) || 0 }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="12743"
                  min="0"
                />
                <p className="text-xs text-gray-500 mt-1">
                  This will display as "(12743) reviews" on the product page. Includes both your custom reviews and 4 auto-generated default reviews.
                </p>
              </div>
              
              <div className="space-y-4">
                {productData.reviews.map((review) => (
                  <div key={review.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <input
                        type="text"
                        value={review.author}
                        onChange={(e) => updateReview(review.id, 'author', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        placeholder="Reviewer name"
                      />
                      <select
                        value={review.rating}
                        onChange={(e) => updateReview(review.id, 'rating', parseInt(e.target.value))}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      >
                        {[1, 2, 3, 4, 5].map(num => <option key={num} value={num}>{num} Star{num !== 1 ? 's' : ''}</option>)}
                      </select>
                    </div>
                    
                    <input
                      type="text"
                      value={review.title}
                      onChange={(e) => updateReview(review.id, 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 mb-3"
                      placeholder="Review title"
                    />
                    
                    <textarea
                      value={review.content}
                      onChange={(e) => updateReview(review.id, 'content', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 mb-3"
                      placeholder="Review content"
                    />
                    
                    {/* Review Images */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Review Images (optional)
                      </label>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => e.target.files && handleReviewImageUpload(review.id, e.target.files)}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                      
                      {/* Display uploaded images */}
                      {review.images && review.images.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-3">
                          {review.images.map((image, imageIndex) => (
                            <div key={imageIndex} className="relative">
                              <img
                                src={image}
                                alt={`Review image ${imageIndex + 1}`}
                                className="w-20 h-20 object-contain rounded border"
                              />
                              <button
                                onClick={() => removeReviewImage(review.id, imageIndex)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={review.verified}
                            onChange={(e) => updateReview(review.id, 'verified', e.target.checked)}
                            className="mr-2"
                          />
                          Verified Purchase
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={review.helpful}
                            onChange={(e) => updateReview(review.id, 'helpful', parseInt(e.target.value))}
                            className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                            placeholder="0"
                          />
                          <span className="text-gray-500">helpful votes</span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeReview(review.id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
                
                {productData.reviews.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No reviews yet. Add customer reviews to make your product more appealing.
                  </div>
                )}
              </div>
            </div>

            {/* 9. Facebook Ad Assets (Admin Only) */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-lg font-semibold">Facebook Ad Assets (Admin Only)</h2>
                <HelpTooltip text="Create ad copy and select creatives for Facebook advertising campaigns." />
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    Headline (for Facebook Ad Account) <HelpTooltip text="Compelling headline for your Facebook ad." />
                  </label>
                  <input
                    type="text"
                    value={productData.adHeadline || ''}
                    onChange={(e) => setProductData(prev => ({ ...prev, adHeadline: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Transform Your Home with This Amazing Product!"
                  />
                  <p className="text-xs text-gray-500 mt-1">Write a compelling headline for your Facebook ad.</p>
                </div>
                
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    Ad Copy <HelpTooltip text="Detailed ad copy for your Facebook campaign." />
                  </label>
                  <textarea
                    value={productData.adCopy || ''}
                    onChange={(e) => setProductData(prev => ({ ...prev, adCopy: e.target.value }))}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="Write compelling ad copy that highlights the benefits and features of your product..."
                  />
                  <p className="text-xs text-gray-500 mt-1">Write detailed ad copy for your Facebook campaign.</p>
                </div>
                
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    Creatives <HelpTooltip text="Ad creatives automatically include all review images. You can also add additional images via drag & drop or file browser." />
                  </label>
                  
                  {/* Auto-include Review Images Switch */}
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                          <input
                            type="checkbox"
                            checked={productData.autoIncludeReviewImages || false}
                            onChange={(e) => setProductData(prev => ({ 
                              ...prev, 
                              autoIncludeReviewImages: e.target.checked 
                            }))}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                          />
                          Auto-include Review Images
                        </label>
                        <HelpTooltip text="When enabled, all review images will automatically be included in your ad creatives. When disabled, you can manually select which images to include." />
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        productData.autoIncludeReviewImages 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {productData.autoIncludeReviewImages ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      {productData.autoIncludeReviewImages 
                        ? 'Review images will be automatically added to your ad creatives when you upload them to reviews.'
                        : 'Review images will not be automatically included. You can manually add them via drag & drop or file browser.'
                      }
                    </p>
                  </div>
                  
                  {/* Auto-included Review Images Section */}
                  {productData.autoIncludeReviewImages && getAllReviewImages().length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        Auto-included Review Images ({getAllReviewImages().length})
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                        {getAllReviewImages().map((image, index) => (
                          <div key={`review-${index}`} className="relative group">
                            <div className="aspect-square border-2 border-green-200 rounded-lg overflow-hidden bg-green-50">
                              <img 
                                src={image} 
                                alt={`Review Image ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-green-500 bg-opacity-0 group-hover:bg-opacity-10 transition-all flex items-center justify-center">
                                <span className="text-green-600 text-xs font-medium opacity-0 group-hover:opacity-100">Auto-included</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-green-600 mt-2">These review images are automatically included in your ad creatives.</p>
                    </div>
                  )}

                  {/* Review Images Available (when auto-include is disabled) */}
                  {!productData.autoIncludeReviewImages && getAllReviewImages().length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                        Review Images Available ({getAllReviewImages().length})
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                        {getAllReviewImages().map((image, index) => (
                          <div key={`review-${index}`} className="relative group">
                            <div className="aspect-square border-2 border-orange-200 rounded-lg overflow-hidden bg-orange-50">
                              <img 
                                src={image} 
                                alt={`Review Image ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-orange-500 bg-opacity-0 group-hover:bg-opacity-10 transition-all flex items-center justify-center">
                                <span className="text-orange-600 text-xs font-medium opacity-0 group-hover:opacity-100">Available</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-orange-600 mt-2">These review images are available but not automatically included. Use drag & drop below to add them manually.</p>
                    </div>
                  )}

                  {/* Additional Creatives Upload Section */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      Additional Creatives ({productData.adCreatives?.filter(img => !getAllReviewImages().includes(img)).length || 0})
                    </h4>
                    
                    {/* Drag & Drop Zone */}
                    <div
                      onDrop={handleCreativeDrop}
                      onDragOver={(e) => e.preventDefault()}
                      onDragEnter={(e) => e.preventDefault()}
                      className="border-2 border-dashed border-blue-300 rounded-lg p-6 text-center hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer"
                    >
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Drag & drop images here</p>
                          <p className="text-xs text-gray-500">or click to browse files</p>
                        </div>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleCreativeUpload}
                          className="hidden"
                          id="creative-upload"
                        />
                        <label htmlFor="creative-upload" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm cursor-pointer">
                          Browse Files
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* All Creatives Display */}
                  {productData.adCreatives && productData.adCreatives.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                        All Ad Creatives ({productData.adCreatives.length})
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                        {productData.adCreatives.map((image, index) => {
                          const isReviewImage = getAllReviewImages().includes(image);
                          return (
                            <div key={index} className="relative group">
                              <div className={`aspect-square border-2 rounded-lg overflow-hidden ${
                                isReviewImage 
                                  ? 'border-green-200 bg-green-50' 
                                  : 'border-purple-200 bg-purple-50'
                              }`}>
                                <img 
                                  src={image} 
                                  alt={`Creative ${index + 1}`}
                                  className="w-full h-full object-cover"
                                />
                                {isReviewImage && (
                                  <div className="absolute top-1 left-1 bg-green-500 text-white text-xs px-1 py-0.5 rounded">
                                    Review
                                  </div>
                                )}
                                <button
                                  onClick={() => removeCreative(index)}
                                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                                >
                                  ×
                                </button>
                              </div>
                              <p className="text-xs text-center mt-1 text-gray-600">
                                {isReviewImage ? 'Review Image' : 'Additional'}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        All creatives will be available for download in the admin dashboard. Review images are automatically included and cannot be removed individually.
                      </p>
                    </div>
                  )}

                  {(!productData.adCreatives || productData.adCreatives.length === 0) && getAllReviewImages().length === 0 && (
                    <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                      <p className="text-gray-500 mb-2">No creatives yet</p>
                      <p className="text-sm text-gray-400">Add review images or upload additional creatives above</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 10. Advanced - Country-Specific Redirects */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold">9. Advanced - Country-Specific Redirects</h2>
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
                {productData.countryRedirects.map((redirect, index) => (
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
                
                {productData.countryRedirects.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Globe className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No country-specific redirects set.</p>
                    <p className="text-sm">Global Link Rotator settings will be used for all countries.</p>
                  </div>
                )}
              </div>

              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">How it works:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• These overrides take priority over global Link Rotator settings</li>
                  <li>• Only set redirects for countries you want to override</li>
                  <li>• Countries not listed here will use the global redirect settings</li>
                  <li>• If global settings don't exist, the default fallback link will be used</li>
                </ul>
              </div>
            </div>

            {/* Admin Notes */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-lg font-semibold">📝 Admin Notes (Private)</h2>
                <HelpTooltip text="Private notes only visible to admins. Customers cannot see these notes." />
              </div>
              
              <textarea
                value={productData.notes || ''}
                onChange={(e) => setProductData(prev => ({ ...prev, notes: e.target.value }))}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Add private notes about this product (only visible to admins)..."
              />
              <p className="text-sm text-gray-500 mt-2">
                💡 Use this for internal notes, reminders, or product management details.
              </p>
            </div>

            {/* Save Button */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Ready to publish?</h3>
                  <p className="text-gray-600">Your product will be added to the marketplace and searchable immediately.</p>
                </div>
                <div className="flex gap-3">
                  {editingProduct && (
                    <button
                      onClick={() => window.open(`/${editingProduct}`, '_blank')}
                      className="flex items-center px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Product
                    </button>
                  )}
                  <button
                    onClick={handleSave}
                    disabled={isCreating}
                    className="flex items-center px-6 py-3 bg-[#ff9900] text-white rounded-md hover:bg-[#e88800] disabled:opacity-50 font-medium"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {isCreating ? 'Saving...' : editingProduct ? 'Update Product' : 'Create Product'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Folder Creation Modal */}
      {showFolderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Create New Folder</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Folder Name
                </label>
                <input
                  type="text"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter folder name"
                  autoFocus
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Parent Folder (Optional)
                </label>
                <select
                  value={selectedParentFolder}
                  onChange={(e) => setSelectedParentFolder(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">No parent (root level)</option>
                  {folders.map(folder => (
                    <option key={folder.id} value={folder.id}>
                      {folder.path}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  if (newFolderName.trim()) {
                    const newFolder = createFolder(newFolderName.trim(), selectedParentFolder || undefined);
                    setProductData(prev => ({ ...prev, folderId: newFolder.id }));
                    setNewFolderName('');
                    setSelectedParentFolder('');
                    setShowFolderModal(false);
                  }
                }}
                disabled={!newFolderName.trim()}
                className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                Create Folder
              </button>
              <button
                onClick={() => {
                  setNewFolderName('');
                  setSelectedParentFolder('');
                  setShowFolderModal(false);
                }}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default ProductBuilderSimple;