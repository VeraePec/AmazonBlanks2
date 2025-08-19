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

const StorageOrganizerPage = () => {
  const { selectedCountry } = useCountrySelector();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('White');
  const [showStickyATC, setShowStickyATC] = useState(false);
  const [timeLeft, setTimeLeft] = useState('');
  const [viewers, setViewers] = useState(38);
  const [peopleBought, setPeopleBought] = useState(12);
  const [showQuantityWarning, setShowQuantityWarning] = useState(false);

    const productImages = [
    'https://m.media-amazon.com/images/I/A1j7MYhY6JL._AC_SL1500_.jpg',
    'https://m.media-amazon.com/images/I/71ebzILE86L._AC_SL1000_.jpg',
    'https://m.media-amazon.com/images/I/A1kqGJhvsxL._AC_SL1500_.jpg',
    'https://m.media-amazon.com/images/I/A1TmI0-QU0L._AC_SL1500_.jpg'
  ];

  const colorOptions = [
    { name: 'White', price: formatPrice('£9.99', selectedCountry.code), originalPrice: formatPrice('£99.99', selectedCountry.code), savings: '90%', available: true },
    { name: 'Black', price: 'Currently unavailable', originalPrice: '', savings: '', available: false }
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
              productName="Amazon Basics Extra Wide Fabric 5-Drawer Storage Organizer Unit"
            />
          </div>

          {/* Middle Column - Product Details */}
          <div className="lg:col-span-4">
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-lg sm:text-2xl font-normal leading-tight">
                Amazon Basics Extra Wide Fabric 5-Drawer Storage Organizer Unit for Closet, White
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

              {/* {getTranslation('ui.pricing.section', getCountryConfig(selectedCountry.code).language)} */}
              <div className="space-y-3">
                {/* {getTranslation('ui.red.banner', getCountryConfig(selectedCountry.code).language)} */}
                <div className="bg-red-600 text-white text-sm font-medium px-3 py-1 rounded inline-block">
                  {getTranslation('product.clearance.sale', getCountryConfig(selectedCountry.code).language)}
                </div>
                
                {/* Price Display */}
                <div className="flex items-baseline gap-3">
                  <span className="text-red-700 text-2xl font-bold">-90%</span>
                  <span className="text-3xl font-bold">{formatPrice('£9.99', selectedCountry.code)}</span>
                </div>
                
                {/* {getTranslation('ui.price.history', getCountryConfig(selectedCountry.code).language)} */}
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

              {/* {getTranslation('ui.enhanced.urgency.message', getCountryConfig(selectedCountry.code).language)} */}
              <UrgencyMessage productType="furniture" />

              {/* {getTranslation('ui.color.selection', getCountryConfig(selectedCountry.code).language)} */}
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

              {/* {getTranslation('ui.mobile.price.display', getCountryConfig(selectedCountry.code).language)} */}
              <div className="lg:hidden">
                {/* {getTranslation('ui.price.section', getCountryConfig(selectedCountry.code).language)} */}
                <div className="bg-white border border-gray-300 rounded-lg p-4 mb-4">
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xs text-gray-600">{getTranslation('product.clearance.sale', getCountryConfig(selectedCountry.code).language).toLowerCase()}:</span>
                        <span className="text-2xl font-bold text-red-700">{formatPrice('£9.99', selectedCountry.code)}</span>
                      </div>
                      <div className="text-xs text-gray-600">
                        <span className="line-through">{getTranslation('product.rrp', getCountryConfig(selectedCountry.code).language)}{formatPrice('£99.99', selectedCountry.code)}</span>
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
                      
                      {/* {getTranslation('ui.quantity.warning', getCountryConfig(selectedCountry.code).language)} */}
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

                    {/* {getTranslation('ui.trust.indicators', getCountryConfig(selectedCountry.code).language)} */}
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
                  <li>• <strong>{getTranslation('feature.extra.wide.organizer', getCountryConfig(selectedCountry.code).language)}</strong> {getTranslation('feature.extra.wide.desc', getCountryConfig(selectedCountry.code).language)}</li>
                  <li>• <strong>{getTranslation('feature.contemporary.look', getCountryConfig(selectedCountry.code).language)}</strong> {getTranslation('feature.contemporary.desc', getCountryConfig(selectedCountry.code).language)}</li>
                  <li>• <strong>{getTranslation('feature.sturdy.frame', getCountryConfig(selectedCountry.code).language)}</strong> {getTranslation('feature.sturdy.desc', getCountryConfig(selectedCountry.code).language)}</li>
                  <li>• <strong>{getTranslation('feature.lightweight.drawers', getCountryConfig(selectedCountry.code).language)}</strong> {getTranslation('feature.lightweight.desc', getCountryConfig(selectedCountry.code).language)}</li>
                  <li>• <strong>{getTranslation('feature.easy.handles', getCountryConfig(selectedCountry.code).language)}</strong> {getTranslation('feature.easy.handles.desc', getCountryConfig(selectedCountry.code).language)}</li>
                  <li>• <strong>{getTranslation('feature.adjustable.feet', getCountryConfig(selectedCountry.code).language)}</strong> {getTranslation('feature.adjustable.desc', getCountryConfig(selectedCountry.code).language)}</li>
                  <li>• <strong>{getTranslation('feature.perfect.spaces', getCountryConfig(selectedCountry.code).language)}</strong> {getTranslation('feature.perfect.desc', getCountryConfig(selectedCountry.code).language)}</li>
                  <li>• <strong>{getTranslation('feature.easy.assembly', getCountryConfig(selectedCountry.code).language)}</strong> {getTranslation('feature.easy.assembly.desc', getCountryConfig(selectedCountry.code).language)}</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column - Purchase Options (Desktop Only) */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="border border-gray-300 rounded-lg p-4 space-y-4 sticky top-4">
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-xs text-gray-600">{getTranslation('product.clearance.sale', getCountryConfig(selectedCountry.code).language).toLowerCase()}:</span>
                  <span className="text-2xl font-normal text-red-700">{formatPrice('£9.99', selectedCountry.code)}</span>
                </div>
                <div className="text-xs text-gray-600">
                  <span className="line-through">{getTranslation('product.rrp', getCountryConfig(selectedCountry.code).language)}{formatPrice('£99.99', selectedCountry.code)}</span>
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

            {/* {getTranslation('ui.additional.options', getCountryConfig(selectedCountry.code).language)} */}
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

        {/* {getTranslation('ui.product.description.section', getCountryConfig(selectedCountry.code).language)} */}
        <div className="mt-6 sm:mt-8 border-t border-gray-300 pt-6 sm:pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-2">
              {/* {getTranslation('ui.2nd.image.above.about', getCountryConfig(selectedCountry.code).language)} */}
              <div className="mb-6 lg:hidden">
                <img 
                  src={productImages[1]} 
                  alt="Amazon Basics Storage Organizer - Side View"
                  className="w-full h-auto rounded-lg shadow-sm"
                />
              </div>
              
              <h2 className="text-lg sm:text-xl font-medium mb-4">{getTranslation('product.about.this.item', getCountryConfig(selectedCountry.code).language)}</h2>
              <ul className="space-y-2 text-sm">
                <li>• <strong>{getTranslation('feature.extra.wide.organizer', getCountryConfig(selectedCountry.code).language)}</strong> {getTranslation('feature.extra.wide.desc', getCountryConfig(selectedCountry.code).language)}</li>
                <li>• <strong>{getTranslation('feature.contemporary.look', getCountryConfig(selectedCountry.code).language)}</strong> {getTranslation('feature.contemporary.desc', getCountryConfig(selectedCountry.code).language)}</li>
                <li>• <strong>{getTranslation('feature.sturdy.frame', getCountryConfig(selectedCountry.code).language)}</strong> {getTranslation('feature.sturdy.desc', getCountryConfig(selectedCountry.code).language)}</li>
                <li>• <strong>{getTranslation('feature.lightweight.drawers', getCountryConfig(selectedCountry.code).language)}</strong> {getTranslation('feature.lightweight.desc', getCountryConfig(selectedCountry.code).language)}</li>
                <li>• <strong>{getTranslation('feature.easy.handles', getCountryConfig(selectedCountry.code).language)}</strong> {getTranslation('feature.easy.handles.desc', getCountryConfig(selectedCountry.code).language)}</li>
                <li>• <strong>{getTranslation('feature.adjustable.feet', getCountryConfig(selectedCountry.code).language)}</strong> {getTranslation('feature.adjustable.desc', getCountryConfig(selectedCountry.code).language)}</li>
                <li>• <strong>{getTranslation('feature.perfect.spaces', getCountryConfig(selectedCountry.code).language)}</strong> {getTranslation('feature.perfect.desc', getCountryConfig(selectedCountry.code).language)}</li>
                <li>• <strong>{getTranslation('feature.easy.assembly', getCountryConfig(selectedCountry.code).language)}</strong> {getTranslation('feature.easy.assembly.desc', getCountryConfig(selectedCountry.code).language)}</li>
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
                    <td className="font-medium py-1 pr-4 align-top">{getTranslation('spec.colour', getCountryConfig(selectedCountry.code).language)}:</td>
                    <td className="py-1">{getTranslation('value.white', getCountryConfig(selectedCountry.code).language)}</td>
                  </tr>
                  <tr>
                    <td className="font-medium py-1 pr-4 align-top">{getTranslation('spec.material', getCountryConfig(selectedCountry.code).language)}:</td>
                    <td className="py-1">{getTranslation('value.plastic.wood', getCountryConfig(selectedCountry.code).language)}</td>
                  </tr>
                  <tr>
                    <td className="font-medium py-1 pr-4 align-top">{getTranslation('spec.frame', getCountryConfig(selectedCountry.code).language)}:</td>
                    <td className="py-1">{getTranslation('value.alloy.steel', getCountryConfig(selectedCountry.code).language)}</td>
                  </tr>
                  <tr>
                    <td className="font-medium py-1 pr-4 align-top">{getTranslation('spec.dimensions', getCountryConfig(selectedCountry.code).language)}:</td>
                    <td className="py-1">30.1D x 102.1W x 55.1H cm</td>
                  </tr>
                  <tr>
                    <td className="font-medium py-1 pr-4 align-top">{getTranslation('spec.drawers', getCountryConfig(selectedCountry.code).language)}:</td>
                    <td className="py-1">5</td>
                  </tr>
                  <tr>
                    <td className="font-medium py-1 pr-4 align-top">{getTranslation('spec.weight', getCountryConfig(selectedCountry.code).language)}:</td>
                    <td className="py-1">10.3 kg</td>
                  </tr>
                  <tr>
                    <td className="font-medium py-1 pr-4 align-top">{getTranslation('spec.assembly', getCountryConfig(selectedCountry.code).language)}:</td>
                    <td className="py-1">{getTranslation('value.required', getCountryConfig(selectedCountry.code).language)}</td>
                  </tr>
                </tbody>
              </table>
              
              {/* {getTranslation('ui.3rd.image.under.details', getCountryConfig(selectedCountry.code).language)} */}
              <div className="mt-6 lg:hidden">
                <img 
                  src={productImages[2]} 
                  alt="Amazon Basics Storage Organizer - Detail View"
                  className="w-full h-auto rounded-lg shadow-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* {getTranslation('ui.technical.specifications', getCountryConfig(selectedCountry.code).language)} */}
        <div className="mt-6 sm:mt-8 border-t border-gray-300 pt-6 sm:pt-8">
          {/* {getTranslation('ui.2nd.image.above.technical', getCountryConfig(selectedCountry.code).language)} */}
          <div className="hidden lg:block mb-6">
            <img 
              src={productImages[1]} 
              alt="Amazon Basics Storage Organizer - Side View"
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
                <span>BSK-008WH</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">{getTranslation('spec.colour', getCountryConfig(selectedCountry.code).language)}</span>
                <span>{getTranslation('value.white', getCountryConfig(selectedCountry.code).language)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">{getTranslation('spec.product.dimensions', getCountryConfig(selectedCountry.code).language)}</span>
                <span>102.11 x 30.1 x 55.12 cm</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">{getTranslation('spec.item.weight', getCountryConfig(selectedCountry.code).language)}</span>
                <span>10.3 kg</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">{getTranslation('spec.material', getCountryConfig(selectedCountry.code).language)}</span>
                <span>{getTranslation('value.plastic.wood', getCountryConfig(selectedCountry.code).language)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">{getTranslation('spec.frame.material', getCountryConfig(selectedCountry.code).language)}</span>
                <span>{getTranslation('value.alloy.steel', getCountryConfig(selectedCountry.code).language)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">{getTranslation('spec.number.drawers', getCountryConfig(selectedCountry.code).language)}</span>
                <span>5</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">{getTranslation('spec.assembly.required', getCountryConfig(selectedCountry.code).language)}</span>
                <span>{getTranslation('value.yes', getCountryConfig(selectedCountry.code).language)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">{getTranslation('spec.upc', getCountryConfig(selectedCountry.code).language)}</span>
                <span>843019100671</span>
              </div>
            </div>
          </div>
        </div>

        {/* {getTranslation('ui.customer.reviews.section', getCountryConfig(selectedCountry.code).language)} */}
        <ProductReviews 
          reviews={[
            {
              id: 1,
              author: getTranslation('reviews.amazon.customer', getCountryConfig(selectedCountry.code).language),
              rating: 5,
              title: "Perfect closet organization solution",
              content: "This 5-drawer storage organizer has transformed my closet! The fabric drawers are sturdy and the white color matches my decor perfectly. Each drawer holds a surprising amount - I use them for underwear, socks, t-shirts, and accessories. Assembly was super easy and the unit feels very stable. Worth every penny!",
              date: "17 November 2024",
              verified: true,
              helpful: 52,
              images: [
                "https://m.media-amazon.com/images/I/71+8ZL2u-xL._AC_SL1500_.jpg",
                "https://m.media-amazon.com/images/I/81bZqWQ+9EL._AC_SL1500_.jpg"
              ]
            },
            {
              id: 2,
              author: getTranslation('reviews.verified.buyer', getCountryConfig(selectedCountry.code).language),
              rating: 4,
              title: "Great for small spaces",
              content: "Perfect size for my small apartment bedroom. The drawers slide smoothly and the fabric is good quality. Much better than plastic alternatives I've tried. Only minor issue is that it's not super wide, but that's exactly what I needed for my narrow closet space.",
              date: "09 November 2024",
              verified: true,
              helpful: 38,
              images: [
                "https://m.media-amazon.com/images/I/71FX2R7j1sL._AC_SL1500_.jpg"
              ]
            },
            {
              id: 3,
              author: getTranslation('reviews.happy.customer', getCountryConfig(selectedCountry.code).language),
              rating: 5,
              title: "Excellent build quality",
              content: "Really impressed with how solid this storage unit is. The metal frame is sturdy and the fabric drawers are well-made. Perfect for organizing clothes, linens, or even kids' toys. The white color is clean and neutral. Highly recommend for anyone needing extra storage.",
              date: "01 November 2024",
              verified: true,
              helpful: 29,
              images: [
                "https://m.media-amazon.com/images/I/71a4T4gGrQL._AC_SL1500_.jpg",
                "https://m.media-amazon.com/images/I/81rTGNHBKVL._AC_SL1500_.jpg"
              ]
            },
            {
              id: 4,
              author: "OrganizedMom",
              rating: 5,
              title: "Life-changing for organization",
              content: "This has made organizing my kids' rooms so much easier. The drawers are the perfect size and the unit fits perfectly in their closets. Great value for money!",
              date: "24 October 2024",
              verified: true,
              helpful: 21
            }
          ]}
          productRating={4.6}
        />

        {/* Questions & Answers Section */}

        {/* {getTranslation('ui.product.information', getCountryConfig(selectedCountry.code).language)} */}
        <div className="mt-6 sm:mt-8 border-t border-gray-300 pt-6 sm:pt-8">
          <h2 className="text-lg sm:text-xl font-medium mb-4">{getTranslation('product.product.information', getCountryConfig(selectedCountry.code).language)}</h2>
          <div className="bg-gray-50 p-4 rounded text-sm space-y-2">
            <div><strong>{getTranslation('spec.product.dimensions', getCountryConfig(selectedCountry.code).language)}:</strong> 102.11 x 30.1 x 55.12 cm; 10.3 kg</div>
            <div><strong>{getTranslation('spec.special.features', getCountryConfig(selectedCountry.code).language)}:</strong> {getTranslation('value.space.saving', getCountryConfig(selectedCountry.code).language)}</div>
            <div><strong>{getTranslation('spec.item.weight', getCountryConfig(selectedCountry.code).language)}:</strong> 10.3 kg</div>
            <div><strong>{getTranslation('spec.material', getCountryConfig(selectedCountry.code).language)}:</strong> {getTranslation('value.plastic.wood', getCountryConfig(selectedCountry.code).language)}</div>
            <div><strong>{getTranslation('spec.frame.material', getCountryConfig(selectedCountry.code).language)}:</strong> {getTranslation('value.alloy.steel', getCountryConfig(selectedCountry.code).language)}</div>
            <div><strong>{getTranslation('spec.asin', getCountryConfig(selectedCountry.code).language)}:</strong> B07SJ2CTV5</div>
            <div><strong>{getTranslation('spec.date.first.available', getCountryConfig(selectedCountry.code).language)}:</strong> 13 Jun. 2019</div>
            <div><strong>{getTranslation('spec.manufacturer', getCountryConfig(selectedCountry.code).language)}:</strong> Amazon Basics</div>
          </div>
        </div>
      </div>
      <StickyATC onBuyNow={handleBuyNow} isVisible={showStickyATC} />
      <Footer />
    </div>
  );
};

export default StorageOrganizerPage; 