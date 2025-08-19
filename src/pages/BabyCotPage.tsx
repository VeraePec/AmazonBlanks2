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

const BabyCotPage = () => {
  const { selectedCountry } = useCountrySelector();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('White/Pine');
  const [showStickyATC, setShowStickyATC] = useState(false);
  const [timeLeft, setTimeLeft] = useState('');
  const [viewers, setViewers] = useState(42);
  const [peopleBought, setPeopleBought] = useState(15);
  const [showQuantityWarning, setShowQuantityWarning] = useState(false);

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
        return Math.max(35, Math.min(60, prev + change));
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
      // Hide warning after 3 seconds
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

  const productImages = [
    'https://m.media-amazon.com/images/I/71zLwxRskhL._AC_SL1500_.jpg',
    'https://m.media-amazon.com/images/I/81Zxq0iUzXL._AC_SL1500_.jpg',
    'https://m.media-amazon.com/images/I/81keo59HZAL._AC_SL1500_.jpg',
    'https://m.media-amazon.com/images/I/81incBX+oBL._AC_SL1500_.jpg',
    'https://m.media-amazon.com/images/I/61QuwLsM9oL._AC_SL1500_.jpg',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=800&fit=crop'
  ];

  const colorOptions = [{
    name: 'White/Pine',
    price: formatPrice('£9.99', selectedCountry.code),
    originalPrice: formatPrice('£182.99', selectedCountry.code),
    savings: '95%'
  }, {
    name: 'Anthracite/Pine',
    price: formatPrice('£9.99', selectedCountry.code),
    originalPrice: formatPrice('£182.99', selectedCountry.code),
    savings: '95%'
  }];

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    return <div className="flex items-center">
        {[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < fullStars ? 'text-[#ffa41c] fill-[#ffa41c]' : i === fullStars && hasHalfStar ? 'text-[#ffa41c] fill-[#ffa41c]' : 'text-gray-300'}`} />)}
      </div>;
  };

  return <div className="min-h-screen bg-white">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2">
          <div className="text-xs sm:text-sm text-[#007185] overflow-x-auto whitespace-nowrap">
            <span className="hover:underline cursor-pointer">{getTranslation('breadcrumb.baby.products', getCountryConfig(selectedCountry.code).language)}</span>
            <span className="text-gray-500 mx-1">&gt;</span>
            <span className="hover:underline cursor-pointer">{getTranslation('breadcrumb.nursery', getCountryConfig(selectedCountry.code).language)}</span>
            <span className="text-gray-500 mx-1">&gt;</span>
            <span className="hover:underline cursor-pointer">{getTranslation('breadcrumb.furniture', getCountryConfig(selectedCountry.code).language)}</span>
            <span className="text-gray-500 mx-1">&gt;</span>
            <span className="hover:underline cursor-pointer">Infant & Toddler Beds</span>
            <span className="text-gray-500 mx-1">&gt;</span>
            <span className="hover:underline cursor-pointer">Cots</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2 sm:py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8">
          {/* Left Column - Enhanced Image Gallery */}
          <div className="lg:col-span-5">
            <ProductImageGallery 
              images={productImages}
              productName="Love For Sleep TOKYO Baby Cot Bed"
            />
          </div>

          {/* Middle Column - Product Details */}
          <div className="lg:col-span-4">
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-lg sm:text-2xl font-normal leading-tight">
                Love For Sleep TOKYO Baby Cot Bed 120x60cm FREE Deluxe Aloe Vera Mattress & Safety Wooden Barrier (White/Pine)
              </h1>

              <div className="flex items-center gap-2">
                <span className="text-sm text-[#007185] hover:underline cursor-pointer">{getTranslation('product.visit.store', getCountryConfig(selectedCountry.code).language, { store: 'Love For Sleep' })}</span>
              </div>

              {/* Rating Section - moved above pricing to match Amazon */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  {renderStars(4.4)}
                  <span className="text-sm text-[#007185] hover:underline cursor-pointer ml-1">{getTranslation('product.out.of.stars', getCountryConfig(selectedCountry.code).language, { rating: '4.4' })}</span>
                  <span className="text-sm text-[#007185] hover:underline cursor-pointer">{getTranslation('product.ratings', getCountryConfig(selectedCountry.code).language, { count: '328' })}</span>
                </div>
                <div className="text-xs text-gray-600">{getTranslation('product.bought.in.month', getCountryConfig(selectedCountry.code).language, { count: '50' })}</div>
              </div>

              {/* Amazon's Choice Badge */}
              <div className="bg-[#232f3e] text-white px-3 py-1 rounded text-sm inline-block">
                Amazon's Choice
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
                  <span className="text-red-700 text-2xl font-bold">-95%</span>
                  <span className="text-3xl font-bold">{formatPrice('£9.99', selectedCountry.code)}</span>
                </div>
                
                {/* Price History */}
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <span>{getTranslation('product.lowest.price', getCountryConfig(selectedCountry.code).language)}</span>
                    <span className="line-through">{formatPrice('£182.99', selectedCountry.code)}</span>
                    <div className="w-4 h-4 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer">
                      <span className="text-xs text-gray-600">i</span>
                    </div>
                  </div>
                  <div>
                    <span>{getTranslation('product.rrp', getCountryConfig(selectedCountry.code).language)}</span>
                    <span className="line-through ml-1">{formatPrice('£182.99', selectedCountry.code)}</span>
                    <span className="text-red-700 ml-1">-95%</span>
                  </div>
                </div>
              </div>

              {/* Enhanced Urgency Message */}
              <UrgencyMessage productType="baby" />

              {/* Color Selection */}
              <div className="border-t border-gray-300 pt-3 sm:pt-4">
                <div className="mb-3">
                  <span className="text-sm font-medium">{getTranslation('product.colour.name', getCountryConfig(selectedCountry.code).language)}</span>
                  <span className="text-sm">{selectedColor}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {colorOptions.map(color => <div key={color.name} className={`border rounded p-2 cursor-pointer hover:border-[#007185] ${selectedColor === color.name ? 'border-[#007185] bg-blue-50' : 'border-gray-300'}`} onClick={() => setSelectedColor(color.name)}>
                      <div className="text-xs font-medium">{color.name}</div>
                      {color.price !== 'Currently unavailable' ? <>
                          <div className="text-sm font-bold">{color.price}</div>
                          {color.savings && <div className="text-xs text-gray-600">
                              <span className="line-through">{color.originalPrice}</span>
                              <span className="text-red-700 ml-1">-{color.savings}</span>
                            </div>}
                        </> : <div className="text-xs text-gray-500">{color.price}</div>}
                    </div>)}
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
                        <span className="line-through">{getTranslation('product.rrp', getCountryConfig(selectedCountry.code).language)} {formatPrice('£182.99', selectedCountry.code)}</span>
                        <span className="text-red-700 ml-2">{getTranslation('product.save', getCountryConfig(selectedCountry.code).language)} {formatPrice('£173.00', selectedCountry.code)} (95%)</span>
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
                  <span className="text-sm">Hypoallergenic mattress</span>
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
                <ul className="space-y-1 text-sm">
                  <li>• <strong>Made from sturdy natural pine wood:</strong> Durable construction ensures long-lasting use for your growing child</li>
                  <li>• <strong>Converts to toddler bed:</strong> Includes wooden barrier to extend use up to three years of age</li>
                  <li>• <strong>Three mattress base positions:</strong> Easier and safer access to baby as they grow</li>
                  <li>• <strong>Large covered drawer:</strong> Extra storage space for baby essentials without taking up valuable room space</li>
                  <li>• <strong>Deluxe 6cm foam mattress:</strong> Antibacterial and hypoallergenic Aloe Vera cover for ultimate comfort</li>
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
                  <span className="line-through">{getTranslation('product.rrp', getCountryConfig(selectedCountry.code).language)} {formatPrice('£182.99', selectedCountry.code)}</span>
                  <span className="text-red-700 ml-2">{getTranslation('product.save', getCountryConfig(selectedCountry.code).language)} {formatPrice('£173.00', selectedCountry.code)} (95%)</span>
                </div>
                <div className="text-xs text-gray-600">
                  No Import Fees Deposit & {formatPrice('£15.99', selectedCountry.code)} delivery to United Kingdom
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
                      <span>{getTranslation('ui.maximum.quantity.warning', getCountryConfig(selectedCountry.code).language)}</span>
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
                  <span className="text-[#007185] hover:underline cursor-pointer">{getTranslation('ui.secure.transaction', getCountryConfig(selectedCountry.code).language)}</span>
                </div>

                <div className="border-t border-gray-200 pt-3">
                  <div className="text-sm font-medium mb-2">{getTranslation('product.ships.from.text', getCountryConfig(selectedCountry.code).language)}</div>
                  <div className="text-sm text-gray-600">Amazon</div>
                  <div className="text-sm font-medium mt-2 mb-1">{getTranslation('product.sold.by.text', getCountryConfig(selectedCountry.code).language)}</div>
                  <div className="text-sm text-gray-600">Love For Sleep</div>
                </div>

                <div className="text-xs text-center">
                  <div className="text-[#007185] hover:underline cursor-pointer mb-1">{getTranslation('product.add.to.wishlist.text', getCountryConfig(selectedCountry.code).language)}</div>
                  <div className="text-[#007185] hover:underline cursor-pointer">{getTranslation('product.add.gift.options.text', getCountryConfig(selectedCountry.code).language)}</div>
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
                  alt="Love For Sleep TOKYO Baby Cot Bed - Side View"
                  className="w-full h-auto rounded-lg shadow-sm"
                />
              </div>
              
              <h2 className="text-lg sm:text-xl font-medium mb-4">{getTranslation('product.about.this.item', getCountryConfig(selectedCountry.code).language)}</h2>
              <ul className="space-y-2 text-sm">
                <li>• <strong>Made from sturdy natural pine wood:</strong> Durable construction ensures long-lasting use for your growing child</li>
                <li>• <strong>Converts to toddler bed:</strong> Includes wooden barrier to extend use up to three years of age</li>
                <li>• <strong>Three mattress base positions:</strong> Easier and safer access to baby as they grow</li>
                <li>• <strong>Large covered drawer:</strong> Extra storage space for baby essentials without taking up valuable room space</li>
                <li>• <strong>Deluxe 6cm foam mattress:</strong> Antibacterial and hypoallergenic Aloe Vera cover for ultimate comfort</li>
                <li>• <strong>Suitable from birth to three years:</strong> Grows with your child from newborn to toddler</li>
                <li>• <strong>Non-toxic paint:</strong> Wood painted with baby-safe non-toxic paints for peace of mind</li>
              </ul>
            </div>
            <div className="lg:col-span-1">
              <h3 className="font-medium mb-4">{getTranslation('product.details', getCountryConfig(selectedCountry.code).language)}</h3>
              <table className="w-full text-sm">
                <tbody>
                  <tr>
                    <td className="font-medium py-1 pr-4 align-top">{getTranslation('spec.brand', getCountryConfig(selectedCountry.code).language)}:</td>
                    <td className="py-1">Love For Sleep</td>
                  </tr>
                  <tr>
                    <td className="font-medium py-1 pr-4 align-top">{getTranslation('spec.colour', getCountryConfig(selectedCountry.code).language)}:</td>
                    <td className="py-1">White/Pine</td>
                  </tr>
                  <tr>
                    <td className="font-medium py-1 pr-4 align-top">{getTranslation('spec.material', getCountryConfig(selectedCountry.code).language)}:</td>
                    <td className="py-1">Pine Wood</td>
                  </tr>
                  <tr>
                    <td className="font-medium py-1 pr-4 align-top">Special Feature:</td>
                    <td className="py-1">Hypoallergenic</td>
                  </tr>
                  <tr>
                    <td className="font-medium py-1 pr-4 align-top">Target Audience:</td>
                    <td className="py-1">Child</td>
                  </tr>
                </tbody>
              </table>
              
              {/* 3rd Image under "Product details" - Mobile only */}
              <div className="mt-6 lg:hidden">
                <img 
                  src={productImages[2]} 
                  alt="Love For Sleep TOKYO Baby Cot Bed - Detail View"
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
              alt="Love For Sleep TOKYO Baby Cot Bed - Side View"
              className="w-full h-auto rounded-lg shadow-sm"
            />
          </div>
          
          <h2 className="text-lg sm:text-xl font-medium mb-4">{getTranslation('product.technical.details', getCountryConfig(selectedCountry.code).language)}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-medium">{getTranslation('spec.brand', getCountryConfig(selectedCountry.code).language)}</span>
                <span>Love For Sleep</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-medium">{getTranslation('spec.product.dimensions', getCountryConfig(selectedCountry.code).language)}</span>
                <span>124L x 65W x 88H cm</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-medium">{getTranslation('spec.colour', getCountryConfig(selectedCountry.code).language)}</span>
                <span>White/Pine</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-medium">Special Feature</span>
                <span>Hypoallergenic</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-medium">Target Audience</span>
                <span>Child</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-medium">{getTranslation('spec.material', getCountryConfig(selectedCountry.code).language)}</span>
                <span>Pine Wood</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-medium">{getTranslation('spec.model.number', getCountryConfig(selectedCountry.code).language)}</span>
                <span>TOKYO</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-medium">{getTranslation('spec.item.weight', getCountryConfig(selectedCountry.code).language)}</span>
                <span>25.8 kg</span>
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
              title: "Perfect cot for our baby - excellent safety",
              content: "This baby cot is absolutely perfect! The build quality is outstanding and I feel completely confident in its safety. The adjustable mattress height is brilliant as baby grows. Assembly was easier than expected and all the hardware is high quality. The white finish is beautiful and matches our nursery perfectly.",
              date: "21 November 2024",
              verified: true,
              helpful: 54,
              images: [
                "https://m.media-amazon.com/images/I/81J+2xqKuJL._AC_SL1500_.jpg",
                "https://m.media-amazon.com/images/I/91YHk4cN8nL._AC_SL1500_.jpg"
              ]
            },
            {
              id: 2,
              author: getTranslation('reviews.verified.buyer', getCountryConfig(selectedCountry.code).language),
              rating: 5,
              title: "Amazing value and quality",
              content: "Couldn't be happier with this cot! It's incredibly sturdy and the safety features give me peace of mind. The convertible design means it will grow with our child. The instructions were clear and assembly took about 2 hours. Highly recommend to any new parents!",
              date: "13 November 2024",
              verified: true,
              helpful: 41,
              images: [
                "https://m.media-amazon.com/images/I/81dGZw8+DPL._AC_SL1500_.jpg"
              ]
            },
            {
              id: 3,
              author: getTranslation('reviews.happy.customer', getCountryConfig(selectedCountry.code).language),
              rating: 4,
              title: "Great cot with excellent features",
              content: "Really pleased with this baby cot. The teething rails are a thoughtful addition and the drop-side mechanism works smoothly. Build quality is solid and it feels very safe. Only minor issue was that assembly took longer than expected, but the end result is fantastic.",
              date: "05 November 2024",
              verified: true,
              helpful: 33,
              images: [
                "https://m.media-amazon.com/images/I/81fQ6k6fNeL._AC_SL1500_.jpg",
                "https://m.media-amazon.com/images/I/91cGGt8WklL._AC_SL1500_.jpg"
              ]
            },
            {
              id: 4,
              author: "NewParent2024",
              rating: 5,
              title: "Perfect for our nursery",
              content: "Beautiful white cot that fits perfectly in our nursery. Safety features are excellent and the adjustable mattress height is very practical. Great value for money!",
              date: "29 October 2024",
              verified: true,
              helpful: 25
            }
          ]}
          productRating={4.7}
        />
{/* Product Information */}
        <div className="mt-6 sm:mt-8 border-t border-gray-300 pt-6 sm:pt-8">
          <h2 className="text-lg sm:text-xl font-medium mb-4">{getTranslation('product.product.information', getCountryConfig(selectedCountry.code).language)}</h2>
          <div className="bg-gray-50 p-4 rounded text-sm space-y-2">
            <div><strong>Product Dimensions:</strong> 124 x 65 x 88 cm; 25.8 kg</div>
            <div><strong>Special Features:</strong> Hypoallergenic</div>
            <div><strong>Item Weight:</strong> 25.8 kg</div>
            <div><strong>Material:</strong> Pine Wood</div>
            <div><strong>ASIN:</strong> B0B9VKVHMM</div>
            <div><strong>Date First Available:</strong> 16 Aug. 2022</div>
            <div><strong>Manufacturer:</strong> Love For Sleep</div>
          </div>
        </div>
      </div>

      {/* Sticky Add to Cart */}
      <StickyATC
        onBuyNow={handleBuyNow}
        isVisible={showStickyATC}
      />

      <Footer />
    </div>;
};

export default BabyCotPage; 