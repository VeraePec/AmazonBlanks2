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

const StorageChestPage = () => {
  const { selectedCountry } = useCountrySelector();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('Matte White');
  const [selectedSize, setSelectedSize] = useState('100W cm');
  const [showStickyATC, setShowStickyATC] = useState(false);
  const [timeLeft, setTimeLeft] = useState('');
  const [viewers, setViewers] = useState(45);
  const [peopleBought, setPeopleBought] = useState(18);
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
    'https://m.media-amazon.com/images/I/51Xtd-TBo8L._AC_SL1500_.jpg',
    'https://m.media-amazon.com/images/I/81PUI3WfocL._AC_SL1500_.jpg',
    'https://m.media-amazon.com/images/I/615m9vySElL._AC_SL1500_.jpg',
    'https://m.media-amazon.com/images/I/81Av0H8fICL._AC_SL1500_.jpg',
    'https://m.media-amazon.com/images/I/81D1cOFU50L._AC_SL1500_.jpg',
    'https://m.media-amazon.com/images/I/71DjFjPOfHL._AC_SL1500_.jpg',
    'https://m.media-amazon.com/images/I/71HidfOW75L._AC_SL1500_.jpg',
    'https://m.media-amazon.com/images/I/71MoBGSWhLL._AC_SL1500_.jpg'
  ];

  const colorOptions = [{
    name: 'Matte White',
    price: formatPrice('9.99', selectedCountry.code),
    originalPrice: formatPrice('59.99', selectedCountry.code),
    savings: '83%'
  }, {
    name: 'Greige',
    price: formatPrice('9.99', selectedCountry.code),
    originalPrice: formatPrice('59.49', selectedCountry.code),
    savings: '83%'
  }, {
    name: 'Honey Brown',
    price: formatPrice('9.99', selectedCountry.code),
    originalPrice: formatPrice('59.49', selectedCountry.code),
    savings: '83%'
  }, {
    name: 'Rustic Brown',
    price: formatPrice('9.99', selectedCountry.code),
    originalPrice: formatPrice('50.99', selectedCountry.code),
    savings: '80%'
  }];

  const sizeOptions = [{
    name: '80W cm',
    price: formatPrice('9.99', selectedCountry.code),
    originalPrice: formatPrice('59.99', selectedCountry.code),
    savings: '83%'
  }, {
    name: '100W cm',
    price: formatPrice('9.99', selectedCountry.code),
    originalPrice: formatPrice('59.99', selectedCountry.code),
    savings: '83%'
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
            <span className="hover:underline cursor-pointer">{getTranslation('breadcrumb.home.kitchen', getCountryConfig(selectedCountry.code).language)}</span>
            <span className="text-gray-500 mx-1">&gt;</span>
            <span className="hover:underline cursor-pointer">{getTranslation('breadcrumb.furniture', getCountryConfig(selectedCountry.code).language)}</span>
            <span className="text-gray-500 mx-1">&gt;</span>
            <span className="hover:underline cursor-pointer">Storage & Organisation</span>
            <span className="text-gray-500 mx-1">&gt;</span>
            <span className="hover:underline cursor-pointer">Storage Benches</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2 sm:py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8">
          {/* Left Column - Enhanced Image Gallery */}
          <div className="lg:col-span-5">
            <ProductImageGallery 
              images={productImages}
              productName="VASAGLE Storage Chest"
            />
          </div>

          {/* Middle Column - Product Details */}
          <div className="lg:col-span-4">
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-lg sm:text-2xl font-normal leading-tight">
                VASAGLE Storage Chest, Storage Bench, Blanket Box with 2 Safety Hinges, Shoe Storage Bench, Modern Style, 40 x 100 x 46 cm, for Hallway, Bedroom, Living Room, Matte White LSB061T10
              </h1>

              <div className="flex items-center gap-2">
                <span className="text-sm text-[#007185] hover:underline cursor-pointer">{getTranslation('product.visit.store', getCountryConfig(selectedCountry.code).language, { store: 'VASAGLE' })}</span>
              </div>

              {/* Rating Section - moved above pricing to match Amazon */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  {renderStars(4.6)}
                  <span className="text-sm text-[#007185] hover:underline cursor-pointer ml-1">4.6 out of 5 stars</span>
                  <span className="text-sm text-[#007185] hover:underline cursor-pointer">2,980 ratings</span>
                </div>
                <div className="text-xs text-gray-600">50+ bought in past month</div>
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
                  <span className="text-red-700 text-2xl font-bold">-83%</span>
                  <span className="text-3xl font-bold">{formatPrice('9.99', selectedCountry.code)}</span>
                </div>
                
                {/* Price History */}
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <span>{getTranslation('product.lowest.price', getCountryConfig(selectedCountry.code).language)}</span>
                    <span className="line-through">{formatPrice('59.99', selectedCountry.code)}</span>
                    <div className="w-4 h-4 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer">
                      <span className="text-xs text-gray-600">i</span>
                    </div>
                  </div>
                  <div>
                    <span>{getTranslation('product.rrp', getCountryConfig(selectedCountry.code).language)} </span>
                    <span className="line-through ml-1">{formatPrice('59.99', selectedCountry.code)}</span>
                    <span className="text-red-700 ml-1">-83%</span>
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

              {/* Size Selection */}
              <div className="border-t border-gray-300 pt-3 sm:pt-4">
                <div className="mb-3">
                  <span className="text-sm font-medium">{getTranslation('product.size.name', getCountryConfig(selectedCountry.code).language)} </span>
                  <span className="text-sm">{selectedSize}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {sizeOptions.map(size => <div key={size.name} className={`border rounded p-2 cursor-pointer hover:border-[#007185] ${selectedSize === size.name ? 'border-[#007185] bg-blue-50' : 'border-gray-300'}`} onClick={() => setSelectedSize(size.name)}>
                      <div className="text-xs font-medium">{size.name}</div>
                      {size.price !== 'Currently unavailable' ? <>
                          <div className="text-sm font-bold">{size.price}</div>
                          {size.savings && <div className="text-xs text-gray-600">
                              <span className="line-through">{size.originalPrice}</span>
                              <span className="text-red-700 ml-1">-{size.savings}</span>
                            </div>}
                        </> : <div className="text-xs text-gray-500">{size.price}</div>}
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
                        <span className="text-2xl font-bold text-red-700">{formatPrice('9.99', selectedCountry.code)}</span>
                      </div>
                      <div className="text-xs text-gray-600">
                        <span className="line-through">{getTranslation('product.rrp', getCountryConfig(selectedCountry.code).language)} {formatPrice('59.99', selectedCountry.code)}</span>
                        <span className="text-red-700 ml-2">{getTranslation('product.save', getCountryConfig(selectedCountry.code).language)} {formatPrice('50.00', selectedCountry.code)} (83%)</span>
                      </div>
                    </div>

                    <div className="text-sm">
                      <div className="text-green-700 font-medium">{getTranslation('product.in.stock', getCountryConfig(selectedCountry.code).language)}</div>
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
                  <span className="text-sm">2 safety hinges included</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-gray-600" />
                  <span className="text-sm">{getTranslation('product.return.policy', getCountryConfig(selectedCountry.code).language)}</span>
                </div>
                                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-gray-600" />
                    <span className="text-sm">{getDeliveryInfo()}</span>
                  </div>
              </div>

              {/* Product Features */}
              <div className="border-t border-gray-300 pt-3 sm:pt-4">
                <ul className="space-y-1 text-sm">
                  <li>• <strong>{getTranslation('feature.chest.elegant', getCountryConfig(selectedCountry.code).language)}</strong></li>
                  <li>• <strong>Large storage space:</strong> 100 x 40 x 46 cm size with plenty of storage for blankets, shoes, or toys</li>
                  <li>• <strong>{getTranslation('feature.chest.handle', getCountryConfig(selectedCountry.code).language)}</strong></li>
                  <li>• <strong>{getTranslation('feature.chest.sturdy', getCountryConfig(selectedCountry.code).language)}</strong></li>
                  <li>• <strong>{getTranslation('feature.chest.assembly', getCountryConfig(selectedCountry.code).language)}</strong></li>
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
                  <span className="line-through">{getTranslation('product.rrp', getCountryConfig(selectedCountry.code).language)} {formatPrice('£59.99', selectedCountry.code)}</span>
                  <span className="text-red-700 ml-2">{getTranslation('product.save', getCountryConfig(selectedCountry.code).language)} {formatPrice('£50.00', selectedCountry.code)} (83%)</span>
                </div>
                <div className="text-xs text-[#007185] font-medium">
                  {getDeliveryInfo()}
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
                  <div className="text-xs text-gray-600">{getTranslation('product.usually.dispatched', getCountryConfig(selectedCountry.code).language)}</div>
                  <div className="text-xs text-gray-600 mt-1">{getTranslation('product.free.returns', getCountryConfig(selectedCountry.code).language)}</div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Quantity:</span>
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
                  <div className="text-sm font-medium mb-2">Ships from</div>
                  <div className="text-sm text-gray-600">Amazon</div>
                  <div className="text-sm font-medium mt-2 mb-1">Sold by</div>
                  <div className="text-sm text-gray-600">VASAGLE</div>
                </div>

                <div className="text-xs text-center">
                  <div className="text-[#007185] hover:underline cursor-pointer mb-1">Add to Wish List</div>
                  <div className="text-[#007185] hover:underline cursor-pointer">Add gift options</div>
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
                  alt="VASAGLE Storage Chest - Side View"
                  className="w-full h-auto rounded-lg shadow-sm"
                />
              </div>
              
              <h2 className="text-lg sm:text-xl font-medium mb-4">{getTranslation('product.about.this.item', getCountryConfig(selectedCountry.code).language)}</h2>
              <ul className="space-y-2 text-sm">
                <li>• <strong>{getTranslation('feature.chest.elegant', getCountryConfig(selectedCountry.code).language)}</strong></li>
                <li>• <strong>{getTranslation('feature.chest.storage', getCountryConfig(selectedCountry.code).language)}</strong></li>
                <li>• <strong>{getTranslation('feature.chest.handle', getCountryConfig(selectedCountry.code).language)}</strong></li>
                <li>• <strong>{getTranslation('feature.chest.sturdy', getCountryConfig(selectedCountry.code).language)}</strong></li>
                <li>• <strong>{getTranslation('feature.chest.assembly', getCountryConfig(selectedCountry.code).language)}</strong></li>
              </ul>
            </div>
            <div className="lg:col-span-1">
              <h3 className="font-medium mb-4">{getTranslation('product.details', getCountryConfig(selectedCountry.code).language)}</h3>
              <table className="w-full text-sm">
                <tbody>
                  <tr>
                    <td className="font-medium py-1 pr-4 align-top">{getTranslation('spec.brand', getCountryConfig(selectedCountry.code).language)}:</td>
                    <td className="py-1">VASAGLE</td>
                  </tr>
                  <tr>
                    <td className="font-medium py-1 pr-4 align-top">{getTranslation('spec.colour', getCountryConfig(selectedCountry.code).language)}:</td>
                    <td className="py-1">Matte White</td>
                  </tr>
                  <tr>
                    <td className="font-medium py-1 pr-4 align-top">{getTranslation('spec.material', getCountryConfig(selectedCountry.code).language)}:</td>
                    <td className="py-1">Engineered Wood</td>
                  </tr>
                  <tr>
                    <td className="font-medium py-1 pr-4 align-top">Size:</td>
                    <td className="py-1">100W cm</td>
                  </tr>
                  <tr>
                    <td className="font-medium py-1 pr-4 align-top">Style:</td>
                    <td className="py-1">Modern</td>
                  </tr>
                </tbody>
              </table>
              
              {/* 3rd Image under "Product details" - Mobile only */}
              <div className="mt-6 lg:hidden">
                <img 
                  src={productImages[2]} 
                  alt="VASAGLE Storage Chest - Detail View"
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
              alt="VASAGLE Storage Chest - Side View"
              className="w-full h-auto rounded-lg shadow-sm"
            />
          </div>
          
          <h2 className="text-lg sm:text-xl font-medium mb-4">{getTranslation('product.technical.details', getCountryConfig(selectedCountry.code).language)}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-medium">{getTranslation('spec.brand', getCountryConfig(selectedCountry.code).language)}</span>
                <span>VASAGLE</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-medium">{getTranslation('spec.product.dimensions', getCountryConfig(selectedCountry.code).language)}</span>
                <span>100 x 40 x 46 cm</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-medium">{getTranslation('spec.colour', getCountryConfig(selectedCountry.code).language)}</span>
                <span>Matte White</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-medium">{getTranslation('spec.capacity', getCountryConfig(selectedCountry.code).language)}</span>
                <span>100 Kilograms</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-medium">{getTranslation('spec.material', getCountryConfig(selectedCountry.code).language)}</span>
                <span>Engineered Wood</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-medium">Frame Material</span>
                <span>Wood</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-medium">Style</span>
                <span>Modern</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-medium">{getTranslation('spec.item.weight', getCountryConfig(selectedCountry.code).language)}</span>
                <span>19.5 kg</span>
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
              title: "Excellent storage chest - perfect quality",
              content: "This VASAGLE storage chest is absolutely fantastic! The build quality is exceptional and it's the perfect size for storing blankets, pillows, and seasonal items. The safety hinges prevent slamming and the classic design fits beautifully in our living room. Assembly was straightforward and the instructions were clear.",
              date: "22 November 2024",
              verified: true,
              helpful: 49,
              images: [
                "/lovable-uploads/3a981dc9-7942-4f6b-802f-4ede10aee488.png",
                "/lovable-uploads/4430364d-bb1a-4348-a785-72435da320f4.png"
              ]
            },
            {
              id: 2,
              author: getTranslation('reviews.verified.buyer', getCountryConfig(selectedCountry.code).language),
              rating: 4,
              title: "Great storage solution",
              content: "Really happy with this storage chest. It holds a surprising amount and the lid stays open safely thanks to the hinges. The vintage brown finish looks great in our bedroom. Only minor complaint is that assembly took a bit longer than expected, but overall excellent value.",
              date: "14 November 2024",
              verified: true,
              helpful: 36,
              images: [
                "/lovable-uploads/5b0e164c-682b-49c5-b809-485a8dab6f6f.png"
              ]
            },
            {
              id: 3,
              author: getTranslation('reviews.happy.customer', getCountryConfig(selectedCountry.code).language),
              rating: 5,
              title: "Beautiful and functional",
              content: "Love this storage chest! It's sturdy, spacious, and the design is timeless. Perfect for storing extra bedding and the lid doubles as extra seating. The safety features give me peace of mind. Highly recommend for anyone needing stylish storage.",
              date: "06 November 2024",
              verified: true,
              helpful: 31,
              images: [
                "/lovable-uploads/8e457fb2-c2b2-44d8-95ec-0c71aedf5a8b.png",
                "/lovable-uploads/3a981dc9-7942-4f6b-802f-4ede10aee488.png"
              ]
            },
            {
              id: 4,
              author: "HomeOrganizer",
              rating: 5,
              title: "Perfect storage chest",
              content: "This chest is exactly what we needed. Great size, beautiful finish, and very well made. The safety hinges work perfectly and it holds so much stuff!",
              date: "30 October 2024",
              verified: true,
              helpful: 23
            }
          ]}
          productRating={4.6}
        />
{/* Product Information */}
        <div className="mt-6 sm:mt-8 border-t border-gray-300 pt-6 sm:pt-8">
          <h2 className="text-lg sm:text-xl font-medium mb-4">{getTranslation('product.product.information', getCountryConfig(selectedCountry.code).language)}</h2>
          <div className="bg-gray-50 p-4 rounded text-sm space-y-2">
            <div><strong>{getTranslation('spec.product.dimensions', getCountryConfig(selectedCountry.code).language)}:</strong> 100 x 40 x 46 cm; 19.5 kg</div>
            <div><strong>{getTranslation('spec.special.features', getCountryConfig(selectedCountry.code).language)}:</strong> Lockable</div>
            <div><strong>{getTranslation('spec.item.weight', getCountryConfig(selectedCountry.code).language)}:</strong> 19.5 kg</div>
            <div><strong>{getTranslation('spec.material', getCountryConfig(selectedCountry.code).language)}:</strong> Engineered Wood</div>
            <div><strong>{getTranslation('spec.asin', getCountryConfig(selectedCountry.code).language)}:</strong> B09B9WBQNY</div>
            <div><strong>{getTranslation('spec.date.first.available', getCountryConfig(selectedCountry.code).language)}:</strong> 27 July 2021</div>
            <div><strong>{getTranslation('spec.manufacturer', getCountryConfig(selectedCountry.code).language)}:</strong> VASAGLE</div>
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

export default StorageChestPage; 