import React, { useState, useEffect } from 'react';
import { Star, Heart, Share2, ChevronDown, Plus, Minus, MapPin, Shield, RotateCcw, Truck, Menu, Clock, Zap, AlertTriangle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductReviews from '../components/ProductReviews';
import StickyATC from '../components/StickyATC';
import UrgencyMessage from '../components/UrgencyMessage';
import ProductImageGallery from '../components/ProductImageGallery';
import { useCountrySelector } from '../hooks/useCountrySelector';
import { handleRedirectAction } from '../utils/redirectHandler';
import { getDeliveryInfo } from '../utils/deliveryDate';
import { getTranslation, getCountryConfig, formatPrice } from '../utils/translations';

const NicehillDresserPage = () => {
  const { selectedCountry } = useCountrySelector();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('Black Grey');
  const [showStickyATC, setShowStickyATC] = useState(false);
  const [timeLeft, setTimeLeft] = useState('');
  const [viewers, setViewers] = useState(38);
  const [peopleBought, setPeopleBought] = useState(12);
  const [showQuantityWarning, setShowQuantityWarning] = useState(false);

    const productImages = [
    'https://m.media-amazon.com/images/I/81zPSAFB75L._AC_SL1500_.jpg',
    'https://m.media-amazon.com/images/I/8170BZ+gQBL._AC_SL1500_.jpg',
    'https://m.media-amazon.com/images/I/91YglKJJMdL._AC_SL1500_.jpg',
    'https://m.media-amazon.com/images/I/81QgR71mHFL._AC_SL1500_.jpg',
    'https://m.media-amazon.com/images/I/91xPD5pWUBL._AC_SL1500_.jpg',
    'https://m.media-amazon.com/images/I/91mfOaP1taL._AC_SL1500_.jpg',
    'https://m.media-amazon.com/images/I/81ZvQ4QrH7L._AC_SL1500_.jpg',
    'https://m.media-amazon.com/images/I/81fSwWCf0zL._AC_SL1500_.jpg',
    'https://m.media-amazon.com/images/I/711ok50Dz6L._AC_SL1500_.jpg'
  ];

  const colorOptions = [
    { name: 'Black Grey', price: formatPrice('£9.99', selectedCountry.code), originalPrice: formatPrice('£99.99', selectedCountry.code), savings: '90%', available: true },
    { name: 'Beige', price: 'Currently unavailable', originalPrice: '', savings: '', available: false },
    { name: 'Black', price: 'Currently unavailable', originalPrice: '', savings: '', available: false },
    { name: 'Black Wood Grain', price: 'Currently unavailable', originalPrice: '', savings: '', available: false },
    { name: 'Light Grey', price: 'Currently unavailable', originalPrice: '', savings: '', available: false },
    { name: 'Light Wood Grain', price: 'Currently unavailable', originalPrice: '', savings: '', available: false },
    { name: 'Retro Prints', price: 'Currently unavailable', originalPrice: '', savings: '', available: false },
    { name: 'Rustic Brown', price: 'Currently unavailable', originalPrice: '', savings: '', available: false },
    { name: 'White', price: 'Currently unavailable', originalPrice: '', savings: '', available: false }
  ];

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
        return Math.max(30, Math.min(55, prev + change));
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
      handleRedirectAction(mappedCountryCode, [], 'add-to-basket');
    } catch (error) {
      console.error('Error in handleAddToBasket:', error);
      window.open('https://linkly.link/2D5Sx', '_blank');
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
      handleRedirectAction(mappedCountryCode, [], 'buy-now');
    } catch (error) {
      console.error('Error in handleBuyNow:', error);
      window.open('https://linkly.link/2D5Sx', '_blank');
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 1) {
      setShowQuantityWarning(true);
      setQuantity(1);
      setTimeout(() => setShowQuantityWarning(false), 3000);
    } else if (newQuantity >= 1) {
      setQuantity(newQuantity);
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
    return <div className="flex items-center">
        {[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < fullStars ? 'text-[#ffa41c] fill-[#ffa41c]' : i === fullStars && hasHalfStar ? 'text-[#ffa41c] fill-[#ffa41c]' : 'text-gray-300'}`} />)}
      </div>;
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2">
          <div className="text-xs sm:text-sm text-[#007185] overflow-x-auto whitespace-nowrap">
            <span className="hover:underline cursor-pointer">{getTranslation('breadcrumb.home.kitchen', getCountryConfig(selectedCountry.code).language)}</span>
            <span className="text-gray-500 mx-1">&gt;</span>
            <span className="hover:underline cursor-pointer">{getTranslation('breadcrumb.furniture', getCountryConfig(selectedCountry.code).language)}</span>
            <span className="text-gray-500 mx-1">&gt;</span>
            <span className="hover:underline cursor-pointer">{getTranslation('breadcrumb.bedroom.furniture', getCountryConfig(selectedCountry.code).language)}</span>
            <span className="text-gray-500 mx-1">&gt;</span>
            <span className="hover:underline cursor-pointer">{getTranslation('breadcrumb.chest.drawers', getCountryConfig(selectedCountry.code).language)}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2 sm:py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8">
          {/* Left Column - Enhanced Image Gallery */}
          <div className="lg:col-span-5">
            <ProductImageGallery 
              images={productImages}
              productName={getTranslation('product.title.dresser', getCountryConfig(selectedCountry.code).language)}
            />
          </div>

          {/* Middle Column - Product Details */}
          <div className="lg:col-span-4">
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-lg sm:text-2xl font-normal leading-tight">
                {getTranslation('product.title.dresser', getCountryConfig(selectedCountry.code).language)}
              </h1>

              <div className="flex items-center gap-2">
                <span className="text-sm text-[#007185] hover:underline cursor-pointer">{getTranslation('product.visit.store', getCountryConfig(selectedCountry.code).language, { store: 'Nicehill' })}</span>
              </div>

              {/* Rating Section - moved above pricing to match Amazon */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  {renderStars(4.5)}
                  <span className="text-sm text-[#007185] hover:underline cursor-pointer ml-1">{getTranslation('product.out.of.stars', getCountryConfig(selectedCountry.code).language, { rating: '4.5' })}</span>
                  <span className="text-sm text-[#007185] hover:underline cursor-pointer">4,{getTranslation('product.ratings', getCountryConfig(selectedCountry.code).language, { count: '630' })}</span>
                </div>
                <div className="text-xs text-gray-600">{getTranslation('product.bought.in.month', getCountryConfig(selectedCountry.code).language, { count: '200' })}</div>
              </div>

              {/* Horizontal divider */}
              <hr className="border-gray-300" />

              {/* Pricing Section */}
              <div className="space-y-3">
                {/* Red Banner */}
                <div className="bg-red-600 text-white text-sm font-medium px-3 py-1 rounded inline-block">
                  Clearance Sale
                </div>
                
                {/* Price Display */}
                <div className="flex items-baseline gap-3">
                  <span className="text-red-700 text-2xl font-bold">-90%</span>
                  <span className="text-3xl font-bold">{formatPrice('£9.99', selectedCountry.code)}</span>
                </div>
                
                {/* Price History */}
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <span>{getTranslation('product.lowest.price', getCountryConfig(selectedCountry.code).language)}</span>
                    <span className="line-through">{formatPrice('£99.99', selectedCountry.code)}</span>
                    <div className="w-4 h-4 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer">
                      <span className="text-xs text-gray-600">i</span>
                    </div>
                  </div>
                  <div>
                    <span>{getTranslation('product.rrp', getCountryConfig(selectedCountry.code).language)}</span>
                    <span className="line-through ml-1">{formatPrice('£99.99', selectedCountry.code)}</span>
                    <span className="text-red-700 ml-1">-90%</span>
                  </div>
                </div>
              </div>

              {/* Enhanced Urgency Message */}
              <UrgencyMessage productType="furniture" />

              {/* Color Selection */}
              <div className="border-t border-gray-300 pt-3 sm:pt-4">
                <div className="mb-3">
                  <span className="text-sm font-medium">{getTranslation('product.colour.name', getCountryConfig(selectedCountry.code).language)}</span>
                  <span className="text-sm">{selectedColor}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {colorOptions.map(color => (
                    <div 
                      key={color.name} 
                      className={`border rounded p-2 cursor-pointer hover:border-[#007185] ${
                        selectedColor === color.name ? 'border-[#007185] bg-blue-50' : 'border-gray-300'
                      } ${!color.available ? 'opacity-50 cursor-not-allowed' : ''}`} 
                      onClick={() => color.available && setSelectedColor(color.name)}
                    >
                      <div className="text-xs font-medium">{color.name}</div>
                      {color.available ? (
                        <>
                          <div className="text-sm font-bold">{color.price}</div>
                          {color.savings && (
                            <div className="text-xs text-gray-600">
                              <span className="line-through">{color.originalPrice}</span>
                              <span className="text-red-700 ml-1">-{color.savings}</span>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="text-xs text-red-600 font-medium">{getTranslation('product.sold.out', getCountryConfig(selectedCountry.code).language)}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile Price Display - Amazon Style */}
              <div className="lg:hidden">
                {/* Price Section */}
                <div className="bg-white border border-gray-300 rounded-lg p-4 mb-4">
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xs text-gray-600">{getTranslation('product.clearance.sale', getCountryConfig(selectedCountry.code).language)}:</span>
                        <span className="text-2xl font-bold text-red-700">{formatPrice('£9.99', selectedCountry.code)}</span>
                      </div>
                      <div className="text-xs text-gray-600">
                        <span className="line-through">{getTranslation('product.rrp', getCountryConfig(selectedCountry.code).language)} {formatPrice('£99.99', selectedCountry.code)}</span>
                        <span className="text-red-700 ml-2">{getTranslation('product.save', getCountryConfig(selectedCountry.code).language)} {formatPrice('£90.00', selectedCountry.code)} (90%)</span>
                      </div>
                    </div>

                    <div className="text-sm">
                      <div className="text-green-700 font-medium">{getTranslation('product.in.stock', getCountryConfig(selectedCountry.code).language)}</div>
                  <div className="text-xs text-[#007185] hover:underline cursor-pointer">{getTranslation('product.delivery.info', getCountryConfig(selectedCountry.code).language, { date: getDeliveryInfo().replace('FREE delivery ', '') })}</div>
                      <div className="text-xs text-red-600 font-bold flex items-center mt-1">
                        <Zap className="w-3 h-3 mr-1" />
                        {getTranslation('product.only.left', getCountryConfig(selectedCountry.code).language, { count: '8' })}
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
                          <span>{getTranslation('ui.maximum.quantity.warning', getCountryConfig(selectedCountry.code).language)}</span>
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
                          <span>{getTranslation('product.secure.transaction.text', getCountryConfig(selectedCountry.code).language)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Truck className="w-3 h-3 text-blue-600" />
                          <span>{getTranslation('product.delivery.info', getCountryConfig(selectedCountry.code).language, { date: getDeliveryInfo().replace('FREE delivery ', '') })}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <RotateCcw className="w-3 h-3 text-gray-600" />
                          <span>{getTranslation('product.free.returns', getCountryConfig(selectedCountry.code).language)}</span>
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

              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-gray-600" />
                  <span className="text-sm">{getTranslation('product.warranty.included', getCountryConfig(selectedCountry.code).language)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-gray-600" />
                  <span className="text-sm">{getTranslation('product.return.policy', getCountryConfig(selectedCountry.code).language)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-gray-600" />
                  <span className="text-sm">{getTranslation('product.delivery.info', getCountryConfig(selectedCountry.code).language, { date: getDeliveryInfo().replace('FREE delivery ', '') })}</span>
                </div>
              </div>

              {/* Product Features */}
              <div className="border-t border-gray-300 pt-3 sm:pt-4">
                <h2 className="text-lg sm:text-xl font-medium mb-4">{getTranslation('product.about.this.item', getCountryConfig(selectedCountry.code).language)}</h2>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>{getTranslation('feature.dresser.multifunctional', getCountryConfig(selectedCountry.code).language)}</strong></li>
                  <li>• <strong>{getTranslation('feature.dresser.storage', getCountryConfig(selectedCountry.code).language)}</strong></li>
                  <li>• <strong>{getTranslation('feature.dresser.material', getCountryConfig(selectedCountry.code).language)}</strong></li>
                  <li>• <strong>{getTranslation('feature.dresser.sturdy', getCountryConfig(selectedCountry.code).language)}</strong></li>
                  <li>• <strong>{getTranslation('feature.dresser.safety', getCountryConfig(selectedCountry.code).language)}</strong></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column - Purchase Options (Desktop Only) */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="border border-gray-300 rounded-lg p-4 space-y-4 sticky top-4">
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-xs text-gray-600">{getTranslation('product.clearance.sale', getCountryConfig(selectedCountry.code).language)}:</span>
                  <span className="text-2xl font-normal text-red-700">{formatPrice('£9.99', selectedCountry.code)}</span>
                </div>
                <div className="text-xs text-gray-600">
                  <span className="line-through">{getTranslation('product.rrp', getCountryConfig(selectedCountry.code).language)} {formatPrice('£99.99', selectedCountry.code)}</span>
                  <span className="text-red-700 ml-2">{getTranslation('product.save', getCountryConfig(selectedCountry.code).language)} {formatPrice('£90.00', selectedCountry.code)} (90%)</span>
                </div>
                
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-600" />
                  <div className="text-sm">
                    <div className="text-[#007185] hover:underline cursor-pointer">{getTranslation('product.delivery.to', getCountryConfig(selectedCountry.code).language, { country: getCountryConfig(selectedCountry.code).name })}</div>
                  </div>
                </div>

                <div className="text-sm">
                  <div className="text-green-700 font-medium">{getTranslation('product.in.stock', getCountryConfig(selectedCountry.code).language)}</div>
                  <div className="text-xs text-[#007185] hover:underline cursor-pointer">{getTranslation('product.delivery.info', getCountryConfig(selectedCountry.code).language, { date: getDeliveryInfo().replace('FREE delivery ', '') })}</div>
                  <div className="text-xs text-red-600 font-bold flex items-center mt-1">
                    <Zap className="w-3 h-3 mr-1" />
                    {getTranslation('product.only.left', getCountryConfig(selectedCountry.code).language, { count: '8' })}
                  </div>
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
                      <span>{getTranslation('ui.maximum.quantity.warning', getCountryConfig(selectedCountry.code).language)}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <button 
                    onClick={handleAddToBasket}
                    className="w-full bg-[#ffd814] hover:bg-[#f7ca00] border border-[#fcd200] rounded-full py-3 px-4 text-sm transition-colors"
                  >
                    {getTranslation('product.add.to.basket', getCountryConfig(selectedCountry.code).language)}
                  </button>
                  <button 
                    onClick={handleBuyNow}
                    className="w-full bg-[#ffa41c] hover:bg-[#ff8f00] border border-[#ff9900] rounded-full py-3 px-4 text-sm transition-colors"
                  >
                    {getTranslation('product.buy.now', getCountryConfig(selectedCountry.code).language)}
                  </button>
                </div>

                <div className="text-xs text-center">
                  <span className="text-[#007185] hover:underline cursor-pointer">{getTranslation('ui.secure.transaction', getCountryConfig(selectedCountry.code).language)}</span>
                </div>

                <div className="border-t border-gray-200 pt-3">
                  <div className="text-sm font-medium mb-2">{getTranslation('product.ships.from.text', getCountryConfig(selectedCountry.code).language)}</div>
                  <div className="text-sm text-gray-600">Amazon</div>
                  <div className="text-sm font-medium mt-2 mb-1">{getTranslation('product.sold.by.text', getCountryConfig(selectedCountry.code).language)}</div>
                  <div className="text-sm text-gray-600">Amazon</div>
                </div>

                <div className="text-xs text-center">
                  <div className="text-[#007185] hover:underline cursor-pointer mb-1">{getTranslation('product.add.to.wishlist.text', getCountryConfig(selectedCountry.code).language)}</div>
                  <div className="text-[#007185] hover:underline cursor-pointer">{getTranslation('product.add.gift.options.text', getCountryConfig(selectedCountry.code).language)}</div>
                </div>
              </div>
            </div>

            {/* Additional Options */}
            <div className="mt-4 border border-gray-300 rounded-lg p-4">
              <h3 className="font-medium mb-3">{getTranslation('product.more.buying.choices', getCountryConfig(selectedCountry.code).language)}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span>{formatPrice('£37.23', selectedCountry.code)}</span>
                  <span className="text-gray-600">{getTranslation('product.used.very.good', getCountryConfig(selectedCountry.code).language)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>{formatPrice('£36.84', selectedCountry.code)}</span>
                  <span className="text-gray-600">{getTranslation('product.new.offers', getCountryConfig(selectedCountry.code).language, { count: '3' })}</span>
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
              <div className="mb-6 lg:hidden">
                <img 
                  src={productImages[1]} 
                  alt="Nicehill Dresser - Side View"
                  className="w-full h-auto rounded-lg shadow-sm"
                />
              </div>
              
              <h2 className="text-lg sm:text-xl font-medium mb-4">{getTranslation('product.about.this.item', getCountryConfig(selectedCountry.code).language)}</h2>
              <ul className="space-y-2 text-sm">
                <li>• <strong>{getTranslation('feature.dresser.multifunctional', getCountryConfig(selectedCountry.code).language)}</strong></li>
                <li>• <strong>{getTranslation('feature.dresser.storage', getCountryConfig(selectedCountry.code).language)}</strong></li>
                <li>• <strong>{getTranslation('feature.dresser.material', getCountryConfig(selectedCountry.code).language)}</strong></li>
                <li>• <strong>{getTranslation('feature.dresser.sturdy', getCountryConfig(selectedCountry.code).language)}</strong></li>
                <li>• <strong>{getTranslation('feature.dresser.safety', getCountryConfig(selectedCountry.code).language)}</strong></li>
              </ul>
            </div>
            <div className="lg:col-span-1">
              <h3 className="font-medium mb-4">{getTranslation('product.details', getCountryConfig(selectedCountry.code).language)}</h3>
              <table className="w-full text-sm">
                <tbody>
                  <tr>
                    <td className="font-medium py-1 pr-4 align-top">{getTranslation('spec.brand', getCountryConfig(selectedCountry.code).language)}:</td>
                    <td className="py-1">Nicehill</td>
                  </tr>
                  <tr>
                    <td className="font-medium py-1 pr-4 align-top">{getTranslation('spec.colour', getCountryConfig(selectedCountry.code).language)}:</td>
                    <td className="py-1">Black Grey</td>
                  </tr>
                  <tr>
                    <td className="font-medium py-1 pr-4 align-top">{getTranslation('spec.material', getCountryConfig(selectedCountry.code).language)}:</td>
                    <td className="py-1">Wood, Metal</td>
                  </tr>
                  <tr>
                    <td className="font-medium py-1 pr-4 align-top">Frame:</td>
                    <td className="py-1">Steel</td>
                  </tr>
                  <tr>
                    <td className="font-medium py-1 pr-4 align-top">{getTranslation('spec.dimensions', getCountryConfig(selectedCountry.code).language)}:</td>
                    <td className="py-1">30D x 100W x 61H cm</td>
                  </tr>
                  <tr>
                    <td className="font-medium py-1 pr-4 align-top">Drawers:</td>
                    <td className="py-1">5</td>
                  </tr>
                  <tr>
                    <td className="font-medium py-1 pr-4 align-top">{getTranslation('spec.weight', getCountryConfig(selectedCountry.code).language)}:</td>
                    <td className="py-1">9.4 kg</td>
                  </tr>
                  <tr>
                    <td className="font-medium py-1 pr-4 align-top">{getTranslation('spec.assembly', getCountryConfig(selectedCountry.code).language)}:</td>
                    <td className="py-1">{getTranslation('value.required', getCountryConfig(selectedCountry.code).language)}</td>
                  </tr>
                </tbody>
              </table>
              
              {/* 3rd Image under "Product details" - Mobile only */}
              <div className="mt-6 lg:hidden">
                <img 
                  src={productImages[2]} 
                  alt="Nicehill Dresser - Detail View"
                  className="w-full h-auto rounded-lg shadow-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="mt-6 sm:mt-8 border-t border-gray-300 pt-6 sm:pt-8">
          {/* 2nd Image above Technical Details - Desktop only */}
          <div className="hidden lg:block mb-6">
            <img 
              src={productImages[1]} 
              alt="Nicehill Dresser - Side View"
              className="w-full h-auto rounded-lg shadow-sm"
            />
          </div>
          
          <h2 className="text-lg sm:text-xl font-medium mb-4">{getTranslation('product.technical.details', getCountryConfig(selectedCountry.code).language)}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">{getTranslation('spec.brand', getCountryConfig(selectedCountry.code).language)}</span>
                <span>Nicehill</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">{getTranslation('spec.model.number', getCountryConfig(selectedCountry.code).language)}</span>
                <span>FD002</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">{getTranslation('spec.colour', getCountryConfig(selectedCountry.code).language)}</span>
                <span>Black Grey</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">{getTranslation('spec.product.dimensions', getCountryConfig(selectedCountry.code).language)}</span>
                <span>30D x 100W x 61H cm</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">{getTranslation('spec.item.weight', getCountryConfig(selectedCountry.code).language)}</span>
                <span>9.4 kg</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">{getTranslation('spec.material', getCountryConfig(selectedCountry.code).language)}</span>
                <span>Wood, Metal</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Frame Material</span>
                <span>Steel</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Number of Drawers</span>
                <span>5</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">{getTranslation('spec.assembly.required', getCountryConfig(selectedCountry.code).language)}</span>
                <span>{getTranslation('value.yes', getCountryConfig(selectedCountry.code).language)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Maximum Weight Capacity</span>
                <span>44 Pounds</span>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <ProductReviews 
          reviews={[
            {
              id: 1,
              author: getTranslation('reviews.amazon.customer', getCountryConfig(selectedCountry.code).language),
              rating: 5,
              title: "Beautiful dresser - exceeded expectations",
              content: "This NICEHILL dresser is absolutely stunning! The black grey finish is elegant and the drawers slide so smoothly. Assembly took a couple hours but the instructions were clear. The LED lights are a nice touch and create great ambiance. Perfect size for my bedroom and holds all my clothes with room to spare.",
              date: "18 November 2024",
              verified: true,
              helpful: 41,
              images: [
                "https://m.media-amazon.com/images/I/81zPSAFB75L._AC_SL1500_.jpg",
                "https://m.media-amazon.com/images/I/8170BZ+gQBL._AC_SL1500_.jpg"
              ]
            },
            {
              id: 2,
              author: getTranslation('reviews.verified.buyer', getCountryConfig(selectedCountry.code).language),
              rating: 4,
              title: "Great storage solution",
              content: "Really happy with this purchase. Six drawers provide ample storage and the build quality is impressive. The LED lighting is a fun feature. Only minor complaint is that assembly instructions could be more detailed, but overall very satisfied with the finished product.",
              date: "10 November 2024",
              verified: true,
              helpful: 34,
              images: [
                "https://m.media-amazon.com/images/I/91YglKJJMdL._AC_SL1500_.jpg"
              ]
            },
            {
              id: 3,
              author: getTranslation('reviews.happy.customer', getCountryConfig(selectedCountry.code).language),
              rating: 5,
              title: "Modern and functional",
              content: "Love the modern design of this dresser. The LED strip lighting gives it a contemporary look and the drawer space is generous. Well-made and sturdy - feels like it will last for years. The black grey color is versatile and matches any decor.",
              date: "02 November 2024",
              verified: true,
              helpful: 26,
              images: [
                "https://m.media-amazon.com/images/I/81QgR71mHFL._AC_SL1500_.jpg",
                "https://m.media-amazon.com/images/I/91xPD5pWUBL._AC_SL1500_.jpg"
              ]
            },
            {
              id: 4,
              author: "DesignLover88",
              rating: 5,
              title: "Perfect bedroom upgrade",
              content: "This dresser completely transformed my bedroom! The LED lights are beautiful and the storage capacity is excellent. Worth every penny for the quality and style.",
              date: "26 October 2024",
              verified: true,
              helpful: 18
            }
          ]}
          productRating={4.6}
        />
{/* Product Information */}
        <div className="mt-6 sm:mt-8 border-t border-gray-300 pt-6 sm:pt-8">
          <h2 className="text-lg sm:text-xl font-medium mb-4">{getTranslation('product.product.information', getCountryConfig(selectedCountry.code).language)}</h2>
          <div className="bg-gray-50 p-4 rounded text-sm space-y-2">
            <div><strong>Product Dimensions:</strong> 30D x 100W x 61H cm; 9.4 kg</div>
            <div><strong>Special Features:</strong> Durable, Anti-tip Kits Included</div>
            <div><strong>Item Weight:</strong> 9.4 kg</div>
            <div><strong>Material:</strong> Wood, Metal</div>
            <div><strong>Frame Material:</strong> Steel</div>
            <div><strong>ASIN:</strong> B09GKSJ6PH</div>
            <div><strong>Date First Available:</strong> 17 Sept. 2021</div>
            <div><strong>Manufacturer:</strong> Nicehill</div>
          </div>
        </div>
      </div>
      <StickyATC onBuyNow={handleBuyNow} isVisible={showStickyATC} />
      <Footer />
    </div>
  );
};

export default NicehillDresserPage; 