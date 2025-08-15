import React, { useState, useEffect } from 'react';
import { Star, Heart, Share2, ChevronDown, Plus, Minus, MapPin, Shield, RotateCcw, Truck, Menu, Clock, Zap, AlertTriangle } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import ProductReviews from './ProductReviews';
import { imageStorage } from '../utils/imageStorage';
import StickyATC from './StickyATC';
import UrgencyMessage from './UrgencyMessage';
import ProductImageGallery from './ProductImageGallery';
import { useCountrySelector } from '../hooks/useCountrySelector';
import { handleRedirectAction } from '../utils/redirectHandler';
import { getDeliveryInfo } from '../utils/deliveryDate';
import { getDefaultReviews } from '../utils/defaultReviews';
import { getTranslation, getCountryConfig, formatPrice } from '../utils/translations';

interface Review {
  id: string | number;
  author: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  verified?: boolean;
  helpful?: number;
  size?: string;
  images?: string[];
}

interface ProductPageTemplateProps {
  productData: {
    name: string;
    brand: string;
    store: string;
    rating: number;
    ratingsCount: number;
    boughtInMonth: string;
    amazonChoice?: boolean;
    price: string;
    originalPrice?: string;
    discount?: string;
    images: string[];
    breadcrumb: string[];
    colorOptions?: Array<{
      name: string;
      price: string;
      originalPrice?: string;
      savings?: string;
      available?: boolean;
    }>;
    sizeOptions?: Array<{
      name: string;
      price: string;
      originalPrice?: string;
      savings?: string;
      available?: boolean;
    }>;
    features: string[];
    aboutThisItem: string[];
    productDetails: { [key: string]: string };
    technicalDetails: { [key: string]: string };
    productInfo: { [key: string]: string };
    stockCount: number;
    deliveryInfo?: string;
    quantityLimit?: number;
    safetyFeatures?: string[];
    reviews?: Review[];
    countryRedirects?: Array<{
      countryCode: string;
      redirectUrl: string;
    }>;
    variants?: Array<{
      id: string;
      type: string;
      name: string;
      options: Array<{
        name: string;
        images: string[];
      }>;
    }>;
  };
  redirectUrl?: string;
}

const ProductPageTemplate: React.FC<ProductPageTemplateProps> = ({ 
  productData, 
  redirectUrl = '#' 
}) => {
  // Safe country selector with fallback
  const countrySelector = useCountrySelector();
  const selectedCountry = countrySelector.selectedCountry || { code: 'gb', name: 'English (UK)', flag: '🇬🇧', default: true };
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(productData.colorOptions?.[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(productData.sizeOptions?.[0]?.name || '');
  const [showStickyATC, setShowStickyATC] = useState(false);
  const [timeLeft, setTimeLeft] = useState('');
  const [viewers, setViewers] = useState(45);
  const [peopleBought, setPeopleBought] = useState(18);
  const [showQuantityWarning, setShowQuantityWarning] = useState(false);
  // UK-specific: detect forced Colour name from product details
  const forcedColourName = React.useMemo(() => {
    const pd = productData.productDetails || {};
    const entries = Object.entries(pd);
    for (const [key, value] of entries) {
      const k = (key || '').toLowerCase();
      if ((k.includes('colour name') || k.includes('color name')) && typeof value === 'string' && value.trim()) {
        return value.trim();
      }
    }
    return '';
  }, [productData.productDetails]);
  const isUK = (selectedCountry?.code || '').toLowerCase() === 'gb';
  const enforceUkColourOnly = isUK && !!forcedColourName;
  
  // Variant selection state - track selected option for each variant type
  const [selectedVariants, setSelectedVariants] = useState<{[variantId: string]: string}>(() => {
    const initial: {[variantId: string]: string} = {};
    productData.variants?.forEach(variant => {
      if (variant.options && variant.options.length > 0) {
        initial[variant.id] = variant.options[0].name;
      }
    });
    return initial;
  });
  
  // Calculate current images based on selected variants
  const getCurrentImages = () => {
    // Always return all product images if no variants exist
    if (!productData.variants || productData.variants.length === 0) {
      return productData.images || [];
    }
    
    // Get all main product images as base
    const allImages = [...(productData.images || [])];
    
    // Check if any variant has images assigned to any option
    let hasAnyVariantImages = false;
    for (const variant of productData.variants) {
      if (variant.options && variant.options.length > 0) {
        for (const option of variant.options) {
          if (option.images && option.images.length > 0) {
            hasAnyVariantImages = true;
            break;
          }
        }
      }
      if (hasAnyVariantImages) break;
    }
    
    // If no variant has any images assigned, return all main product images
    if (!hasAnyVariantImages) {
      return allImages;
    }
    
    // Find the currently selected variant option that has images
    let selectedVariantImages: string[] = [];
    for (const variant of productData.variants) {
      const selectedOptionName = selectedVariants[variant.id];
      if (selectedOptionName && variant.options && variant.options.length > 0) {
        const selectedOption = variant.options.find(option => option.name === selectedOptionName);
        if (selectedOption && selectedOption.images && selectedOption.images.length > 0) {
          selectedVariantImages = selectedOption.images;
          break;
        }
      }
    }
    
    // If we found variant-specific images, prioritize them but include all images
    if (selectedVariantImages.length > 0) {
      // Start with variant-specific images, then add all other images
      const finalImages = [...selectedVariantImages];
      
      // Add all main product images that aren't already in the variant images
      allImages.forEach(image => {
        if (!selectedVariantImages.includes(image)) {
          finalImages.push(image);
        }
      });
      
      return finalImages;
    }
    
    // If no variant-specific images found, find the first variant option that has images
    for (const variant of productData.variants) {
      if (variant.options && variant.options.length > 0) {
        for (const option of variant.options) {
          if (option.images && option.images.length > 0) {
            // Start with this variant's images, then add all other images
            const finalImages = [...option.images];
            
            // Add all main product images that aren't already in the variant images
            allImages.forEach(image => {
              if (!option.images.includes(image)) {
                finalImages.push(image);
              }
            });
            
            return finalImages;
          }
        }
      }
    }
    
    // Final fallback to all main product images
    return allImages;
  };
  
  const [currentImages, setCurrentImages] = useState(() => {
    // Ensure we always have fallback images on initial load
    const images = getCurrentImages();
    return images.length > 0 ? images : (productData.images || []);
  });

  // Update selectedVariants when productData changes (for dynamic products)
  useEffect(() => {
    const newSelectedVariants: {[variantId: string]: string} = {};
    productData.variants?.forEach(variant => {
      if (variant.options && variant.options.length > 0) {
        // If UK colour is enforced and this is the Color/Colour variant, preselect forced colour
        const isColorVariant = (variant.type === 'Color' || variant.name === 'Color' || variant.name === 'Colour');
        if (enforceUkColourOnly && isColorVariant) {
          const match = variant.options.find(o => o.name === forcedColourName);
          newSelectedVariants[variant.id] = match ? match.name : variant.options[0].name;
        } else {
          newSelectedVariants[variant.id] = variant.options[0].name;
        }
      }
    });
    setSelectedVariants(newSelectedVariants);
  }, [productData.variants]);

  // Update images when variant selection changes or product data changes
  useEffect(() => {
    const newImages = getCurrentImages();
    const finalImages = newImages.length > 0 ? newImages : (productData.images || []);
    
    // Debug logging (can be removed in production)
    console.log('🖼️ ProductPageTemplate - Image Debug:', {
      productName: productData.name,
      originalImages: productData.images,
      newImages,
      finalImages,
      finalImagesLength: finalImages.length,
      firstImageType: finalImages[0]?.substring(0, 50) + '...',
      hasBase64: finalImages.some(img => img?.startsWith('data:'))
    });
    
    if (finalImages.length === 0) {
      console.warn('ProductPageTemplate: No images found for product', productData.name);
    }
    
    setCurrentImages(finalImages);
  }, [selectedVariants, productData.variants, productData.images]);

  // Handle variant option selection
  const handleVariantSelection = (variantId: string, optionName: string) => {
    setSelectedVariants(prev => ({
      ...prev,
      [variantId]: optionName
    }));
    
    // Scroll to the first image when variant changes to show the new variant image
    setTimeout(() => {
      const firstImageElement = document.querySelector('.image-gallery img');
      if (firstImageElement) {
        firstImageElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 100);
  };

  // Countdown timer
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);
      
      const difference = endOfDay.getTime() - now.getTime();
      
      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        setTimeLeft(`${hours}h ${minutes}m`);
      } else {
        setTimeLeft('0h 0m');
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000);
    return () => clearInterval(timer);
  }, []);

  // Dynamic viewers and purchases
  useEffect(() => {
    const viewersTimer = setInterval(() => {
      setViewers(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        return Math.max(40, Math.min(65, prev + change));
      });
    }, 5000);

    const purchasesTimer = setInterval(() => {
      setPeopleBought(prev => prev + Math.floor(Math.random() * 2) + 1);
    }, 30000);

    return () => {
      clearInterval(viewersTimer);
      clearInterval(purchasesTimer);
    };
  }, []);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAddToBasket = () => {
    try {
      // Map country codes between different formats (useCountrySelector uses different codes)
      const countryCodeMap: { [key: string]: string } = {
        'gb': 'UK',
        'dk': 'DK',
        'no': 'NO', 
        'ch': 'CH',
        'fr': 'FR',
        'es': 'ES',
        'tr': 'TR'
      };
      
      const mappedCountryCode = countryCodeMap[selectedCountry?.code] || 'UK';
      handleRedirectAction(mappedCountryCode, productData.countryRedirects || [], 'add-to-basket');
    } catch (error) {
      console.error('Error in handleAddToBasket:', error);
      // Fallback to default redirect
      window.open('https://linkly.link/2C4ln', '_blank');
    }
  };

  const handleBuyNow = () => {
    try {
      // Map country codes between different formats
      const countryCodeMap: { [key: string]: string } = {
        'gb': 'UK',
        'dk': 'DK', 
        'no': 'NO',
        'ch': 'CH',
        'fr': 'FR',
        'es': 'ES',
        'tr': 'TR'
      };
      
      const mappedCountryCode = countryCodeMap[selectedCountry?.code] || 'UK';
      handleRedirectAction(mappedCountryCode, productData.countryRedirects || [], 'buy-now');
    } catch (error) {
      console.error('Error in handleBuyNow:', error);
      // Fallback to default redirect
      window.open('https://linkly.link/2C4ln', '_blank');
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (productData.quantityLimit && newQuantity > productData.quantityLimit) {
      setShowQuantityWarning(true);
      setQuantity(productData.quantityLimit);
      setTimeout(() => setShowQuantityWarning(false), 3000);
    } else {
      setQuantity(Math.max(1, newQuantity));
      setShowQuantityWarning(false);
    }
  };

  // Scroll detection for sticky ATC
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPercentage = (scrollY / (documentHeight - windowHeight)) * 100;
      
      // Show sticky button when scrolled 25% down the page
      setShowStickyATC(scrollPercentage > 25);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`w-4 h-4 ${
              i < fullStars 
                ? 'text-[#ffa41c] fill-[#ffa41c]' 
                : i === fullStars && hasHalfStar 
                  ? 'text-[#ffa41c] fill-[#ffa41c]' 
                  : 'text-gray-300'
            }`} 
          />
        ))}
      </div>
    );
  };

  // Resolve review images that may be stored as idb-ref or blob-ref
  const resolvedReviews: Review[] | undefined = productData.reviews
    ? productData.reviews.map((r) => ({
        ...r,
        images: Array.isArray(r.images) ? r.images.map((img) => img) : [],
      }))
    : undefined;

  // Note: ProductReviews will render the strings; DynamicProductPageV2 resolves gallery images.

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2">
          <div className="text-xs sm:text-sm text-[#007185] overflow-x-auto whitespace-nowrap">
            {productData.breadcrumb.map((item, index) => (
              <span key={index}>
                <span className="hover:underline cursor-pointer">{item}</span>
                {index < productData.breadcrumb.length - 1 && (
                  <span className="text-gray-500 mx-1">&gt;</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2 sm:py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8">
          {/* Left Column - Enhanced Image Gallery */}
          <div className="lg:col-span-5">
            <ProductImageGallery 
              images={currentImages}
              productName={productData.name}
            />
          </div>

          {/* Middle Column - Product Details */}
          <div className="lg:col-span-4">
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-lg sm:text-2xl font-normal leading-tight">
                {productData.name}
              </h1>

              <div className="flex items-center gap-2">
                <span className="text-sm text-[#007185] hover:underline cursor-pointer">
                  {getTranslation('product.visit.store', getCountryConfig(selectedCountry.code).language, { store: productData.store })}
                </span>
              </div>

              {/* Rating Section - moved above pricing to match Amazon */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  {renderStars(productData.rating)}
                  <span className="text-sm text-[#007185] hover:underline cursor-pointer ml-1">
                    {getTranslation('product.out.of.stars', getCountryConfig(selectedCountry.code).language, { rating: productData.rating })}
                  </span>
                  <span className="text-sm text-[#007185] hover:underline cursor-pointer">
                    {getTranslation('product.ratings', getCountryConfig(selectedCountry.code).language, { count: productData.ratingsCount.toLocaleString() })}
                  </span>
                </div>
                <div className="text-xs text-gray-600">{getTranslation('product.bought.in.month', getCountryConfig(selectedCountry.code).language, { count: productData.boughtInMonth?.split('+')[0] || '50' })}</div>
              </div>

              {/* Amazon's Choice Badge */}
              {productData.amazonChoice && (
                <div className="bg-[#232f3e] text-white px-3 py-1 rounded text-sm inline-block">
                  {getTranslation('product.amazons.choice', getCountryConfig(selectedCountry.code).language)}
                </div>
              )}

              {/* Horizontal divider */}
              <hr className="border-gray-300" />

              {/* Pricing Section */}
              <div className="space-y-3">
                {/* Red Banner */}
                <div className="bg-red-600 text-white text-sm font-medium px-3 py-1 rounded inline-block">
                  {getTranslation('urgency.clearance.sale', getCountryConfig(selectedCountry.code).language)}
                </div>
                
                {/* Price Display */}
                <div className="flex items-baseline gap-3">
                  {productData.discount && (
                    <span className="text-red-700 text-2xl font-bold">-{productData.discount}</span>
                  )}
                  <span className="text-3xl font-bold">{formatPrice(productData.price, selectedCountry.code)}</span>
                </div>
                
                {/* Price History */}
                {productData.originalPrice && (
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <span>{getTranslation('product.lowest.price', getCountryConfig(selectedCountry.code).language)}</span>
                      <span className="line-through">{formatPrice(productData.originalPrice || '', selectedCountry.code)}</span>
                      <div className="w-4 h-4 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer">
                        <span className="text-xs text-gray-600">i</span>
                      </div>
                    </div>
                    <div>
                      <span>{getTranslation('product.rrp', getCountryConfig(selectedCountry.code).language)}</span>
                      <span className="line-through ml-1">{formatPrice(productData.originalPrice || '', selectedCountry.code)}</span>
                      {productData.discount && (
                        <span className="text-red-700 ml-1">-{productData.discount}</span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Enhanced Urgency Message */}
              <UrgencyMessage productType="furniture" />

              {/* Dynamic Variant Selection */}
              {productData.variants && productData.variants.length > 0 && (enforceUkColourOnly
                ? productData.variants.filter(v => (v.type === 'Color' || v.name === 'Color' || v.name === 'Colour'))
                : productData.variants
              ).map((variant) => (
                <div key={variant.id} className="border-t border-gray-300 pt-3 sm:pt-4">
                  <div className="mb-3">
                    <span className="text-sm font-medium">{
                      (() => {
                        const isColorVariant = (variant.type === 'Color' || variant.name === 'Color' || variant.name === 'Colour');
                        if (isUK && isColorVariant) return 'Colour Name:';
                        return getTranslation(`product.${variant.type.toLowerCase()}.name`, getCountryConfig(selectedCountry.code).language) || `${variant.name}:`;
                      })()
                    } </span>
                    <span className="text-sm">{selectedVariants[variant.id] || variant.options[0]?.name}</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {variant.options.map(option => {
                      const isColorVariant = (variant.type === 'Color' || variant.name === 'Color' || variant.name === 'Colour');
                      const available = enforceUkColourOnly && isColorVariant ? (option.name === forcedColourName) : true;
                      const isSelected = selectedVariants[variant.id] === option.name;
                      return (
                        <div 
                          key={option.name} 
                          className={`border rounded p-2 transition-colors ${
                            isSelected ? 'border-[#007185] bg-blue-50' : 'border-gray-300'
                          } ${available ? 'cursor-pointer hover:border-[#007185]' : 'opacity-50 cursor-not-allowed'}`}
                          onClick={() => { if (available) handleVariantSelection(variant.id, option.name); }}
                        >
                          <div className="text-xs font-medium">{option.name}</div>
                          <div className="text-sm font-bold">{formatPrice(productData.price, selectedCountry.code)}</div>
                          {productData.originalPrice && (
                            <div className="text-xs text-gray-600">
                              <span className="line-through">{formatPrice(productData.originalPrice, selectedCountry.code)}</span>
                              {productData.discount && (
                                <span className="text-red-700 ml-1">-{productData.discount}</span>
                              )}
                            </div>
                          )}
                          {!available && (
                            <div className="text-[10px] text-gray-500 mt-1">Sold out</div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Legacy Color Selection (for backward compatibility) */}
              {(!productData.variants || productData.variants.length === 0) && productData.colorOptions && productData.colorOptions.length > 0 && (
                <div className="border-t border-gray-300 pt-3 sm:pt-4">
                  <div className="mb-3">
                    <span className="text-sm font-medium">{getTranslation('product.colour.name', getCountryConfig(selectedCountry.code).language)}: </span>
                    <span className="text-sm">{selectedColor}</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {productData.colorOptions.map(rawColor => {
                      const available = enforceUkColourOnly ? (rawColor.name === forcedColourName) : (rawColor.available !== false);
                      const color = { ...rawColor, available };
                      return (
                        <div 
                          key={color.name} 
                          className={`border rounded p-2 ${
                            selectedColor === color.name ? 'border-[#007185] bg-blue-50' : 'border-gray-300'
                          } ${!color.available ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-[#007185]'}`} 
                          onClick={() => color.available !== false && setSelectedColor(color.name)}
                        >
                          <div className="text-xs font-medium">{color.name}</div>
                          {color.available !== false ? (
                            <>
                              <div className="text-sm font-bold">{formatPrice(color.price, selectedCountry.code)}</div>
                              {color.savings && (
                                <div className="text-xs text-gray-600">
                                  <span className="line-through">{formatPrice(color.originalPrice || '', selectedCountry.code)}</span>
                                  <span className="text-red-700 ml-1">-{color.savings}</span>
                                </div>
                              )}
                            </>
                          ) : (
                            <div className="text-xs text-gray-500">{formatPrice(color.price, selectedCountry.code)} • Sold out</div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {productData.sizeOptions && productData.sizeOptions.length > 0 && (
                <div className="border-t border-gray-300 pt-3 sm:pt-4">
                  <div className="mb-3">
                    <span className="text-sm font-medium">{getTranslation('product.size.name', getCountryConfig(selectedCountry.code).language)}: </span>
                    <span className="text-sm">{selectedSize}</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {productData.sizeOptions.map(size => (
                      <div 
                        key={size.name} 
                        className={`border rounded p-2 cursor-pointer hover:border-[#007185] ${
                          selectedSize === size.name ? 'border-[#007185] bg-blue-50' : 'border-gray-300'
                        } ${!size.available ? 'opacity-50 cursor-not-allowed' : ''}`} 
                        onClick={() => size.available !== false && setSelectedSize(size.name)}
                      >
                        <div className="text-xs font-medium">{size.name}</div>
                        {size.available !== false ? (
                          <>
                            <div className="text-sm font-bold">{size.price}</div>
                            {size.savings && (
                              <div className="text-xs text-gray-600">
                                <span className="line-through">{size.originalPrice}</span>
                                <span className="text-red-700 ml-1">-{size.savings}</span>
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="text-xs text-gray-500">{size.price}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Mobile Price Display - Amazon Style */}
              <div className="lg:hidden">
                {/* Price Section */}
                <div className="bg-white border border-gray-300 rounded-lg p-4 mb-4">
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xs text-gray-600">{getTranslation('product.clearance.sale', getCountryConfig(selectedCountry.code).language)}</span>
                        <span className="text-2xl font-bold text-red-700">{formatPrice(productData.price, selectedCountry.code)}</span>
                      </div>
                      {productData.originalPrice && (
                        <div className="text-xs text-gray-600">
                          <span className="line-through">{getTranslation('product.rrp', getCountryConfig(selectedCountry.code).language)} {formatPrice(productData.originalPrice, selectedCountry.code)}</span>
                          <span className="text-red-700 ml-2">
                            {getTranslation('product.save', getCountryConfig(selectedCountry.code).language, { 
                              amount: formatPrice(`${(parseFloat(productData.originalPrice.replace(/[^0-9.]/g, '')) - parseFloat(productData.price.replace(/[^0-9.]/g, ''))).toFixed(2)}`, selectedCountry.code),
                              percentage: productData.discount
                            })}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="text-sm">
                      <div className="text-green-700 font-medium">{getTranslation('product.in.stock', getCountryConfig(selectedCountry.code).language)}</div>
                  <div className="text-xs text-[#007185] hover:underline cursor-pointer">
                        {getTranslation('product.delivery.info', getCountryConfig(selectedCountry.code).language, { date: getDeliveryInfo(selectedCountry.code).replace(/^(FREE |GRATIS |Livraison GRATUITE |KOSTENLOSE Lieferung |Entrega GRATIS |GRATIS )?delivery\s?/i, '') })}
                      </div>
                    </div>

                    <div className="text-xs text-gray-600">
                      {getTranslation('product.free.returns', getCountryConfig(selectedCountry.code).language)}
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{getTranslation('product.quantity', getCountryConfig(selectedCountry.code).language)}</span>
                        <div className="flex items-center border border-gray-300 rounded">
                          <button 
                            onClick={() => handleQuantityChange(quantity - 1)}
                            className="p-2 hover:bg-gray-100"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-4 py-2 text-sm bg-gray-50 min-w-[50px] text-center font-medium">{quantity}</span>
                          <button 
                            onClick={() => handleQuantityChange(quantity + 1)}
                            className="p-2 hover:bg-gray-100"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      
                      {/* Quantity Warning */}
                      {showQuantityWarning && (
                        <div className="flex items-center space-x-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800">
                          <AlertTriangle className="w-3 h-3" />
                          <span>{getTranslation('product.quantity.warning', getCountryConfig(selectedCountry.code).language, { limit: productData.quantityLimit })}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3 pt-2">
                      <button 
                        onClick={handleAddToBasket}
                        className="w-full bg-[#ffd814] hover:bg-[#f7ca00] border border-[#fcd200] rounded-full py-3 px-4 text-sm transition-colors shadow-sm"
                      >
                        {getTranslation('product.add.to.basket', getCountryConfig(selectedCountry.code).language)}
                      </button>
                      <button 
                        onClick={handleBuyNow}
                        className="w-full bg-[#ffa41c] hover:bg-[#ff8f00] border border-[#ff9900] rounded-full py-3 px-4 text-sm transition-colors shadow-sm"
                      >
                        {getTranslation('product.buy.now', getCountryConfig(selectedCountry.code).language)}
                      </button>
                    </div>

                    {/* Trust indicators */}
                    <div className="text-center text-xs text-gray-600 pt-2 border-t border-gray-200">
                      <div className="flex items-center justify-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Shield className="w-3 h-3 text-green-600" />
                          <span>{getTranslation('trust.secure', getCountryConfig(selectedCountry.code).language)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                      <Truck className="w-3 h-3 text-blue-600" />
                      <span>{getDeliveryInfo(selectedCountry.code)}</span>
                    </div>
                        <div className="flex items-center space-x-1">
                          <RotateCcw className="w-3 h-3 text-gray-600" />
                          <span>{getTranslation('trust.easy.returns', getCountryConfig(selectedCountry.code).language)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-300 pt-3 sm:pt-4">
                <div className="text-sm text-gray-700 mb-2">{getTranslation('product.climate.friendly', getCountryConfig(selectedCountry.code).language)}</div>
                <div className="bg-[#f7f7f7] p-3 rounded">
                  <div className="text-sm font-medium mb-1">{getTranslation('product.day.returns', getCountryConfig(selectedCountry.code).language)}</div>
                  <div className="text-xs text-gray-600">{getTranslation('product.returns.eligible', getCountryConfig(selectedCountry.code).language)}</div>
                </div>
              </div>

              {/* Safety Features */}
              {productData.safetyFeatures && productData.safetyFeatures.length > 0 && (
                <div className="space-y-2 sm:space-y-3">
                  {productData.safetyFeatures.map((feature, index) => {
                    // Translate safety features based on their content
                    let translatedFeature = feature;
                    if (feature === 'High-quality construction') {
                      translatedFeature = getTranslation('product.feature.high.quality.construction', getCountryConfig(selectedCountry.code).language);
                    } else if (feature === 'Safety tested') {
                      translatedFeature = getTranslation('product.feature.safety.tested', getCountryConfig(selectedCountry.code).language);
                    }
                    return (
                      <div key={index} className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-gray-600" />
                        <span className="text-sm">{translatedFeature}</span>
                      </div>
                    );
                  })}
                  <div className="flex items-center gap-2">
                    <RotateCcw className="w-4 h-4 text-gray-600" />
                    <span className="text-sm">{getTranslation('product.feature.return.policy', getCountryConfig(selectedCountry.code).language)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-gray-600" />
                    <span className="text-sm">{getDeliveryInfo()}</span>
                  </div>
                </div>
              )}

              {/* Product Features */}
              <div className="border-t border-gray-300 pt-3 sm:pt-4">
                <ul className="space-y-1 text-sm">
                  {productData.features.map((feature, index) => (
                    <li key={index}>• {feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column - Purchase Options (Desktop Only) */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="border border-gray-300 rounded-lg p-4 space-y-4 sticky top-4">
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-xs text-gray-600">{getTranslation('clearance.sale.label', getCountryConfig(selectedCountry.code).language)}</span>
                  <span className="text-2xl font-normal text-red-700">{formatPrice(productData.price, selectedCountry.code)}</span>
                </div>
                {productData.originalPrice && (
                  <div className="text-xs text-gray-600">
                    <span className="line-through">{getTranslation('product.rrp', getCountryConfig(selectedCountry.code).language)} {formatPrice(productData.originalPrice, selectedCountry.code)}</span>
                    <span className="text-red-700 ml-2">
                      {getTranslation('product.save', getCountryConfig(selectedCountry.code).language, { 
                        amount: formatPrice(`£${(parseFloat(productData.originalPrice.replace('£', '')) - parseFloat(productData.price.replace('£', ''))).toFixed(2)}`, selectedCountry.code),
                        percentage: productData.discount
                      })}
                    </span>
                  </div>
                )}
                <div className="text-xs text-gray-600">
                  {getTranslation('product.delivery.info', getCountryConfig(selectedCountry.code).language, { date: getDeliveryInfo(selectedCountry.code).replace(/^(FREE |GRATIS |Livraison GRATUITE |KOSTENLOSE Lieferung |Entrega GRATIS |GRATIS )?delivery\s?/i, '') })}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-600" />
                  <div className="text-sm">
                    <div className="text-[#007185] hover:underline cursor-pointer">{getTranslation('product.deliver.to', getCountryConfig(selectedCountry.code).language, { country: getCountryConfig(selectedCountry.code).name })}</div>
                  </div>
                </div>

                <div className="text-sm">
                  <div className="text-green-700 font-medium">{getTranslation('product.in.stock', getCountryConfig(selectedCountry.code).language)}</div>
                  <div className="text-xs text-[#007185] hover:underline cursor-pointer">{getDeliveryInfo()}</div>
                  <div className="text-xs text-gray-600 mt-1">{getTranslation('product.free.returns', getCountryConfig(selectedCountry.code).language)}</div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{getTranslation('product.quantity', getCountryConfig(selectedCountry.code).language)}</span>
                    <div className="flex items-center border border-gray-300 rounded">
                      <button onClick={() => handleQuantityChange(quantity - 1)} className="p-1 hover:bg-gray-100">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 py-1 text-sm bg-gray-50 min-w-[40px] text-center">{quantity}</span>
                      <button onClick={() => handleQuantityChange(quantity + 1)} className="p-1 hover:bg-gray-100">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Quantity Warning for Desktop */}
                  {showQuantityWarning && (
                    <div className="flex items-center space-x-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800">
                      <AlertTriangle className="w-3 h-3" />
                      <span>Maximum {productData.quantityLimit} per customer due to high demand clearance sale</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <button onClick={handleAddToBasket} className="w-full bg-[#ffd814] hover:bg-[#f7ca00] border border-[#fcd200] rounded-full py-3 px-4 text-sm transition-colors">
                    {getTranslation('product.add.to.basket', getCountryConfig(selectedCountry.code).language)}
                  </button>
                  <button onClick={handleBuyNow} className="w-full bg-[#ffa41c] hover:bg-[#ff8f00] border border-[#ff9900] rounded-full py-3 px-4 text-sm transition-colors">
                    {getTranslation('product.buy.now', getCountryConfig(selectedCountry.code).language)}
                  </button>
                </div>

                <div className="text-xs text-center">
                  <span className="text-[#007185] hover:underline cursor-pointer">{getTranslation('product.secure.transaction', getCountryConfig(selectedCountry.code).language)}</span>
                </div>

                <div className="border-t border-gray-200 pt-3">
                  <div className="text-sm font-medium mb-2">{getTranslation('product.ships.from', getCountryConfig(selectedCountry.code).language)}</div>
                  <div className="text-sm text-gray-600">Amazon</div>
                  <div className="text-sm font-medium mt-2 mb-1">{getTranslation('product.sold.by', getCountryConfig(selectedCountry.code).language)}</div>
                  <div className="text-sm text-gray-600">{productData.brand}</div>
                </div>

                <div className="text-xs text-center">
                  <div className="text-[#007185] hover:underline cursor-pointer mb-1">{getTranslation('product.add.to.wishlist', getCountryConfig(selectedCountry.code).language)}</div>
                  <div className="text-[#007185] hover:underline cursor-pointer">{getTranslation('product.add.gift.options', getCountryConfig(selectedCountry.code).language)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description Section */}
        <div className="mt-6 sm:mt-8 border-t border-gray-300 pt-6 sm:pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-2">
              {/* 2nd Image above "About this item" - Mobile only */}
              {productData.images.length > 1 && (
                <div className="mb-6 lg:hidden">
                  <img 
                    src={productData.images[1]} 
                    alt={`${productData.name} - Side View`}
                    className="w-full h-auto rounded-lg shadow-sm"
                  />
                </div>
              )}
              
                              <h2 className="text-lg sm:text-xl font-medium mb-4">{getTranslation('product.about.this.item', getCountryConfig(selectedCountry.code).language)}</h2>
              <ul className="space-y-2 text-sm">
                {productData.aboutThisItem.map((item, index) => {
                  // Check if item has a colon to split into title and description
                  const colonIndex = item.indexOf(':');
                  if (colonIndex > 0 && colonIndex < item.length - 1) {
                    const title = item.substring(0, colonIndex + 1);
                    const description = item.substring(colonIndex + 1).trim();
                    return (
                      <li key={index}>• <strong>{title}</strong> {description}</li>
                    );
                  }
                  return (
                    <li key={index}>• {item}</li>
                  );
                })}
              </ul>
            </div>
            <div className="lg:col-span-1">
              <h3 className="font-medium mb-4">{getTranslation('product.details', getCountryConfig(selectedCountry.code).language)}</h3>
              <table className="w-full text-sm">
                <tbody>
                  {Object.entries(productData.productDetails)
                    .filter(([key, value]) => key.trim() && value.trim()) // Only show non-empty entries
                    .map(([key, value]) => (
                    <tr key={key}>
                      <td className="font-medium py-1 pr-4 align-top">{key}:</td>
                      <td className="py-1">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {/* 3rd Image under "Product details" - Mobile only */}
              {productData.images.length > 2 && (
                <div className="mt-6 lg:hidden">
                  <img 
                    src={productData.images[2]} 
                    alt={`${productData.name} - Detail View`}
                    className="w-full h-auto rounded-lg shadow-sm"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="mt-6 sm:mt-8 border-t border-gray-300 pt-6 sm:pt-8">
          {/* 2nd Image above Technical Details - Desktop only */}
          {productData.images.length > 1 && (
            <div className="hidden lg:block mb-6">
              <img 
                src={productData.images[1]} 
                alt={`${productData.name} - Side View`}
                className="w-full h-auto rounded-lg shadow-sm"
              />
            </div>
          )}
          
          <h2 className="text-lg sm:text-xl font-medium mb-4">{getTranslation('product.technical.details.title', getCountryConfig(selectedCountry.code).language)}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              {Object.entries(productData.technicalDetails)
                .filter(([key, value]) => key.trim() && value.trim()) // Only show non-empty entries
                .slice(0, Math.ceil(Object.keys(productData.technicalDetails).length / 2))
                .map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b border-gray-200">
                  <span className="font-medium">{key}</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              {Object.entries(productData.technicalDetails)
                .filter(([key, value]) => key.trim() && value.trim()) // Only show non-empty entries
                .slice(Math.ceil(Object.keys(productData.technicalDetails).length / 2))
                .map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b border-gray-200">
                  <span className="font-medium">{key}</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <ProductReviews 
          reviews={[
            ...(resolvedReviews || []),
            ...getDefaultReviews(getCountryConfig(selectedCountry.code).language)
          ]} 
          productRating={productData.rating}
          totalReviewCount={productData.ratingsCount} // Use the total count from product data
        />

        {/* Product Information */}
        <div className="mt-6 sm:mt-8 border-t border-gray-300 pt-6 sm:pt-8">
          <h2 className="text-lg sm:text-xl font-medium mb-4">{getTranslation('product.information.title', getCountryConfig(selectedCountry.code).language)}</h2>
          <div className="bg-gray-50 p-4 rounded text-sm space-y-2">
            {Object.entries(productData.productInfo).map(([key, value]) => (
              <div key={key}><strong>{key}:</strong> {value}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Add to Cart */}
      <StickyATC
        onBuyNow={handleBuyNow}
        isVisible={showStickyATC}
      />

      <Footer />
    </div>
  );
};

export default ProductPageTemplate;