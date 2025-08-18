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

const SecuritySafePage = () => {
  const countrySelector = useCountrySelector();
  const selectedCountry = countrySelector.selectedCountry;
  
  // Only proceed if we have a valid country selection
  if (!selectedCountry) {
    return <div>Loading...</div>;
  }

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('60 L');
  const [showStickyATC, setShowStickyATC] = useState(false);
  const [timeLeft, setTimeLeft] = useState('');
  const [viewers, setViewers] = useState(38);
  const [peopleBought, setPeopleBought] = useState(12);
  const [showQuantityWarning, setShowQuantityWarning] = useState(false);

    const productImages = [
    'https://m.media-amazon.com/images/I/71oKOv71hBL._AC_SL1500_.jpg',
    'https://m.media-amazon.com/images/I/81E0iNDETAL._AC_SL1500_.jpg',
    'https://m.media-amazon.com/images/I/81hiOUr+AZL._AC_SL1500_.jpg',
    'https://m.media-amazon.com/images/I/81lmMXzV8gL._AC_SL1500_.jpg',
    'https://m.media-amazon.com/images/I/81SvcAVkpDL._AC_SL1500_.jpg',
    'https://m.media-amazon.com/images/I/71e4pRRhm5L._AC_SL1500_.jpg',
    'https://m.media-amazon.com/images/I/91RDHDPNIuL._AC_SL1500_.jpg'
  ];

  const sizeOptions = [
    { name: '23.5 L', price: formatPrice('£9.99', selectedCountry.code), originalPrice: formatPrice('£99.99', selectedCountry.code), savings: '90%', available: true },
    { name: '35 L', price: formatPrice('£9.99', selectedCountry.code), originalPrice: formatPrice('£99.99', selectedCountry.code), savings: '90%', available: true },
    { name: '60 L', price: formatPrice('£9.99', selectedCountry.code), originalPrice: formatPrice('£99.99', selectedCountry.code), savings: '90%', available: true }
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
      handleRedirectAction(mappedCountryCode, [], 'buy-now');
    } catch (error) {
      console.error('Error in handleBuyNow:', error);
      window.open('https://linkly.link/2C4ln', '_blank');
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
            <span className="hover:underline cursor-pointer">DIY & Tools</span>
            <span className="text-gray-500 mx-1">&gt;</span>
            <span className="hover:underline cursor-pointer">Safety & Security</span>
            <span className="text-gray-500 mx-1">&gt;</span>
            <span className="hover:underline cursor-pointer">Safes & Safe Accessories</span>
            <span className="text-gray-500 mx-1">&gt;</span>
            <span className="hover:underline cursor-pointer">Cabinet Safes</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2 sm:py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8">
          {/* Left Column - Enhanced Image Gallery */}
          <div className="lg:col-span-5">
            <ProductImageGallery 
              images={productImages}
              productName={getTranslation('product.title.security.safe', getCountryConfig(selectedCountry.code).language)}
            />
          </div>

          {/* Middle Column - Product Details */}
          <div className="lg:col-span-4">
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-lg sm:text-2xl font-normal leading-tight">
                {getTranslation('product.title.security.safe', getCountryConfig(selectedCountry.code).language)}
              </h1>

              <div className="flex items-center gap-2">
                <span className="text-sm text-[#007185] hover:underline cursor-pointer">{getTranslation('product.visit.store', getCountryConfig(selectedCountry.code).language, { store: 'Amazon Basics' })}</span>
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
                    <div className="w-4 h-4 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-xs text-gray-600">i</span>
                    </div>
                  </div>
                  <div>
                    <span>{getTranslation('product.rrp', getCountryConfig(selectedCountry.code).language)}</span>
                    <span className="line-through">{formatPrice('£99.99', selectedCountry.code)}</span>
                    <span className="text-red-700 ml-1">-90%</span>
                  </div>
                </div>
              </div>

              {/* Amazon's Choice Badge */}
              <div className="bg-[#232f3e] text-white px-3 py-1 rounded text-sm inline-block">
                Amazon's Choice
              </div>

              {/* Enhanced Urgency Message */}
              <UrgencyMessage productType="security" />

              {/* Size Selection */}
              <div className="border-t border-gray-300 pt-3 sm:pt-4">
                <div className="mb-3">
                  <span className="text-sm font-medium">{getTranslation('product.size.name', getCountryConfig(selectedCountry.code).language)} </span>
                  <span className="text-sm">{selectedSize}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {sizeOptions.map(size => (
                    <div 
                      key={size.name} 
                      className={`border rounded p-2 cursor-pointer hover:border-[#007185] ${
                        selectedSize === size.name ? 'border-[#007185] bg-blue-50' : 'border-gray-300'
                      } ${!size.available ? 'opacity-50 cursor-not-allowed' : ''}`} 
                      onClick={() => size.available && setSelectedSize(size.name)}
                    >
                      <div className="text-xs font-medium">{size.name}</div>
                      {size.available ? (
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
                  <span className="text-sm">1-year warranty included</span>
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
                  <li>• <strong>{getTranslation('feature.safe.fire.resistant', getCountryConfig(selectedCountry.code).language)}</strong></li>
                  <li>• <strong>{getTranslation('feature.safe.ul.standard', getCountryConfig(selectedCountry.code).language)}</strong></li>
                  <li>• <strong>{getTranslation('feature.safe.construction', getCountryConfig(selectedCountry.code).language)}</strong></li>
                  <li>• <strong>{getTranslation('feature.safe.keypad', getCountryConfig(selectedCountry.code).language)}</strong></li>
                  <li>• <strong>{getTranslation('feature.safe.dimensions', getCountryConfig(selectedCountry.code).language)}</strong></li>
                  <li>• <strong>{getTranslation('feature.safe.bolt', getCountryConfig(selectedCountry.code).language)}</strong></li>
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
                  <span>{formatPrice('£28.45', selectedCountry.code)}</span>
                  <span className="text-gray-600">Used - Like New</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>{formatPrice('£28.12', selectedCountry.code)}</span>
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
                  alt="Amazon Basics Security Safe - Side View"
                  className="w-full h-auto rounded-lg shadow-sm"
                />
              </div>
              
              <h2 className="text-lg sm:text-xl font-medium mb-4">{getTranslation('product.about.this.item', getCountryConfig(selectedCountry.code).language)}</h2>
              <ul className="space-y-2 text-sm">
                <li>• <strong>{getTranslation('feature.safe.fire.resistant', getCountryConfig(selectedCountry.code).language)}</strong></li>
                <li>• <strong>{getTranslation('feature.safe.ul.standard', getCountryConfig(selectedCountry.code).language)}</strong></li>
                <li>• <strong>{getTranslation('feature.safe.construction', getCountryConfig(selectedCountry.code).language)}</strong></li>
                <li>• <strong>{getTranslation('feature.safe.keypad', getCountryConfig(selectedCountry.code).language)}</strong></li>
                <li>• <strong>{getTranslation('feature.safe.dimensions', getCountryConfig(selectedCountry.code).language)}</strong></li>
                <li>• <strong>{getTranslation('feature.safe.bolt', getCountryConfig(selectedCountry.code).language)}</strong></li>
              </ul>
            </div>
            <div className="lg:col-span-1">
              <h3 className="font-medium mb-4">{getTranslation('product.details', getCountryConfig(selectedCountry.code).language)}</h3>
              <table className="w-full text-sm">
                <tbody>
                  <tr>
                    <td className="font-medium py-1 pr-4 align-top">{getTranslation('spec.brand', getCountryConfig(selectedCountry.code).language)}:</td>
                    <td className="py-1">Amazon Basics</td>
                  </tr>
                  <tr>
                    <td className="font-medium py-1 pr-4 align-top">Product dimensions:</td>
                    <td className="py-1">35D x 43W x 66H centimetres</td>
                  </tr>
                  <tr>
                    <td className="font-medium py-1 pr-4 align-top">Lock type:</td>
                    <td className="py-1">Electronic</td>
                  </tr>
                  <tr>
                    <td className="font-medium py-1 pr-4 align-top">{getTranslation('spec.colour', getCountryConfig(selectedCountry.code).language)}:</td>
                    <td className="py-1">{getTranslation('value.black', getCountryConfig(selectedCountry.code).language)}</td>
                  </tr>
                  <tr>
                    <td className="font-medium py-1 pr-4 align-top">Capacity:</td>
                    <td className="py-1">60 litres</td>
                  </tr>
                  <tr>
                    <td className="font-medium py-1 pr-4 align-top">{getTranslation('spec.material', getCountryConfig(selectedCountry.code).language)}:</td>
                    <td className="py-1">Alloy Steel</td>
                  </tr>
                  <tr>
                    <td className="font-medium py-1 pr-4 align-top">Special feature:</td>
                    <td className="py-1">Fireproof</td>
                  </tr>
                  <tr>
                    <td className="font-medium py-1 pr-4 align-top">Mounting type:</td>
                    <td className="py-1">Wall Mount</td>
                  </tr>
                  <tr>
                    <td className="font-medium py-1 pr-4 align-top">Item weight:</td>
                    <td className="py-1">40.8 kg</td>
                  </tr>
                </tbody>
              </table>
              
              {/* 3rd Image under "Product details" - Mobile only */}
              <div className="mt-6 lg:hidden">
                <img 
                  src={productImages[2]} 
                  alt="Amazon Basics Security Safe - Detail View"
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
              alt="Amazon Basics Security Safe - Side View"
              className="w-full h-auto rounded-lg shadow-sm"
            />
          </div>
          
          <h2 className="text-lg sm:text-xl font-medium mb-4">{getTranslation('product.technical.details', getCountryConfig(selectedCountry.code).language)}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">{getTranslation('spec.brand', getCountryConfig(selectedCountry.code).language)}</span>
                <span>Amazon Basics</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">{getTranslation('spec.model.number', getCountryConfig(selectedCountry.code).language)}</span>
                <span>YB-66YLA-F</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">{getTranslation('spec.colour', getCountryConfig(selectedCountry.code).language)}</span>
                <span>{getTranslation('value.black', getCountryConfig(selectedCountry.code).language)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">{getTranslation('spec.product.dimensions', getCountryConfig(selectedCountry.code).language)}</span>
                <span>35 x 43 x 66 cm</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">{getTranslation('spec.item.weight', getCountryConfig(selectedCountry.code).language)}</span>
                <span>40.8 kg</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Size</span>
                <span>60 L</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">{getTranslation('spec.material', getCountryConfig(selectedCountry.code).language)}</span>
                <span>Alloy Steel</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Lock Type</span>
                <span>Electronic</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">{getTranslation('spec.special.features', getCountryConfig(selectedCountry.code).language)}</span>
                <span>Fireproof</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">ASIN</span>
                <span>B074KHWNJZ</span>
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
              title: "Excellent security safe - exceeded expectations",
              content: "This fire-resistant safe is exactly what I needed for my important documents and jewelry. The electronic lock is easy to program and the size is perfect - fits nicely in my closet. Build quality is exceptional, very heavy and solid. The fire protection gives me peace of mind. Installation was straightforward with the included hardware.",
              date: "12 November 2024",
              verified: true,
              helpful: 28,
              images: [
                "/lovable-uploads/3a981dc9-7942-4f6b-802f-4ede10aee488.png",
                "/lovable-uploads/4430364d-bb1a-4348-a785-72435da320f4.png"
              ]
            },
            {
              id: 2,
              author: getTranslation('reviews.verified.buyer', getCountryConfig(selectedCountry.code).language),
              rating: 5,
              title: "Perfect for home office security",
              content: "Bought this to secure business documents and backup drives. The digital lock is responsive and the override keys provide backup access. Fire rating is a huge plus. Heavy enough that it would be difficult to steal without proper equipment. Very satisfied with this purchase.",
              date: "03 November 2024",
              verified: true,
              helpful: 19,
              images: [
                "/lovable-uploads/5b0e164c-682b-49c5-b809-485a8dab6f6f.png"
              ]
            },
            {
              id: 3,
              author: getTranslation('reviews.happy.customer', getCountryConfig(selectedCountry.code).language),
              rating: 4,
              title: "Good value fire-resistant safe",
              content: "Does exactly what it's supposed to do. Protects important documents from fire and theft. The electronic lock works well, though I wish the beeps were quieter. Interior space is adequate for passports, birth certificates, and small valuables. Would recommend for basic home security needs.",
              date: "25 October 2024",
              verified: true,
              helpful: 14,
              images: [
                "/lovable-uploads/8e457fb2-c2b2-44d8-95ec-0c71aedf5a8b.png",
                "/lovable-uploads/3a981dc9-7942-4f6b-802f-4ede10aee488.png"
              ]
            },
            {
              id: 4,
              author: "James P.",
              rating: 5,
              title: "Outstanding build quality",
              content: "This safe feels incredibly solid and well-built. The locking mechanism is smooth and the fire protection rating gives excellent peace of mind. Fits perfectly in my home office closet.",
              date: "18 October 2024",
              verified: true,
              helpful: 11
            }
          ]}
          productRating={4.7}
        />
{/* Product Information */}
        <div className="mt-6 sm:mt-8 border-t border-gray-300 pt-6 sm:pt-8">
          <h2 className="text-lg sm:text-xl font-medium mb-4">{getTranslation('product.product.information', getCountryConfig(selectedCountry.code).language)}</h2>
          <div className="bg-gray-50 p-4 rounded text-sm space-y-2">
            <div><strong>Product Dimensions:</strong> 35 x 43 x 66 cm; 40.8 kg</div>
            <div><strong>Special Features:</strong> Fireproof, Electronic Lock</div>
            <div><strong>Item Weight:</strong> 40.8 kg</div>
            <div><strong>Capacity:</strong> 60 litres</div>
            <div><strong>Material:</strong> Alloy Steel</div>
            <div><strong>ASIN:</strong> B074KHWNJZ</div>
            <div><strong>Date First Available:</strong> 5 April 2018</div>
            <div><strong>Manufacturer:</strong> Amazon Basics</div>
          </div>
        </div>
      </div>
      <StickyATC onBuyNow={handleBuyNow} isVisible={showStickyATC} />
      <Footer />
    </div>
  );
};

export default SecuritySafePage; 