import React, { useState, useEffect, useRef } from 'react';
import { Search, ShoppingCart, MapPin, ChevronDown, Menu, Globe, User, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getAllProductsWithCreated } from '../data/productRegistry';
import { useCountrySelector } from '../hooks/useCountrySelector';
import { getTranslation, getCountryConfig, formatPrice } from '../utils/translations';
import { useAdminAuth } from '../contexts/AdminAuthContext';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [accountClickCount, setAccountClickCount] = useState(0);
  const [logoClickCount, setLogoClickCount] = useState(0);
  const [showPinDialog, setShowPinDialog] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const { selectedCountry, setSelectedCountry, countries } = useCountrySelector();
  const { login } = useAdminAuth();
  const searchRef = useRef<HTMLDivElement>(null);
  const countryRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    // Check if it's mobile (screen width < 640px which is Tailwind's sm breakpoint)
    const isMobile = window.innerWidth < 640;
    
    if (!isMobile) {
      // On desktop, navigate immediately (single click)
      navigate('/');
      return;
    }
    
    // On mobile, require 4 clicks
    const newCount = logoClickCount + 1;
    setLogoClickCount(newCount);
    
    if (newCount >= 4) {
      navigate('/');
      setLogoClickCount(0); // Reset counter
    } else {
      // Reset counter after 2 seconds if not completed (longer timeout for 4 clicks)
      setTimeout(() => {
        setLogoClickCount(0);
      }, 2000);
    }
  };

  const handleAmazonsChoiceClick = () => {
    navigate('/amazons-choice');
  };

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
      setShowSuggestions(false);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  // Generate search suggestions
  const generateSuggestions = (query: string) => {
    if (!query.trim() || query.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const allProducts = getAllProductsWithCreated();
    const lowercaseQuery = query.toLowerCase();
    const suggestionSet = new Set<string>();

    // Add exact product name matches
    allProducts.forEach(product => {
      const productName = product.name.toLowerCase();
      if (productName.includes(lowercaseQuery)) {
        suggestionSet.add(product.name);
      }
    });

    // Add category matches
    allProducts.forEach(product => {
      const category = product.category.toLowerCase();
      if (category.includes(lowercaseQuery)) {
        suggestionSet.add(product.category);
      }
    });

    // Add common search terms based on product features
    const commonTerms = [
      'vacuum cleaner', 'storage', 'bedroom furniture', 'baby cot', 
      'gaming desk', 'security safe', 'Amazon Basics', 'dresser',
      'cabinet', 'organizer', 'chair', 'garden', 'cleaning'
    ];

    commonTerms.forEach(term => {
      if (term.toLowerCase().includes(lowercaseQuery)) {
        suggestionSet.add(term);
      }
    });

    const suggestionsArray = Array.from(suggestionSet).slice(0, 8);
    setSuggestions(suggestionsArray);
    setShowSuggestions(suggestionsArray.length > 0);
  };

  // Handle input change with suggestions
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    generateSuggestions(value);
  };

  const handleSuggestionClick = (suggestion: string, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    navigate(`/search?q=${encodeURIComponent(suggestion)}`);
  };

  const handleAccountClick = () => {
    const newCount = accountClickCount + 1;
    setAccountClickCount(newCount);
    
    if (newCount >= 5) {
      setShowPinDialog(true);
      setAccountClickCount(0); // Reset counter
    } else {
      // Reset counter after 3 seconds if not completed
      setTimeout(() => {
        setAccountClickCount(0);
      }, 3000);
    }
  };

  // PIN dialog handlers
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(pinInput)) {
      setPinError('');
      setPinInput('');
      setShowPinDialog(false);
      navigate('/admin');
    } else {
      setPinError('Incorrect PIN. Please try again.');
      setPinInput('');
    }
  };

  const handlePinCancel = () => {
    setShowPinDialog(false);
    setPinInput('');
    setPinError('');
  };

  // Close suggestions and country dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
      if (countryRef.current && !countryRef.current.contains(event.target as Node)) {
        setIsCountryDropdownOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showPinDialog) {
        handlePinCancel();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showPinDialog]);

  return (
    <header className="bg-[#131921] text-white">
      {/* Top navigation bar */}
      <div className="px-2 sm:px-4 py-2">
        {/* Mobile Layout */}
        <div className="block sm:hidden">
          {/* Mobile top section - Logo and Cart above search */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <img 
                src={selectedCountry.code === 'gb' ? 
                  "https://i.postimg.cc/yxQnRNTn/amazon-uk-logo-feature.png" : 
                  "https://www.pngmart.com/files/23/Amazon-Logo-White-PNG-Image.png"
                } 
                alt={`Amazon ${getCountryConfig(selectedCountry.code).name}`} 
                className="h-8 w-auto cursor-pointer hover:opacity-80 transition-opacity"
                onClick={handleLogoClick}
              />
            </div>
            
            <div className="flex items-center hover:border border-white p-2 rounded cursor-pointer">
              <ShoppingCart className="w-6 h-6" />
            </div>
          </div>
          
          {/* Search bar */}
          <div className="relative" ref={searchRef}>
            <form onSubmit={handleSearch} className="flex">
              <input 
                type="text" 
                value={searchQuery} 
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                onFocus={() => generateSuggestions(searchQuery)}
                placeholder={getTranslation('search.placeholder', getCountryConfig(selectedCountry.code).language)} 
                className="flex-1 px-3 py-2 text-black text-sm outline-none rounded-l-md" 
              />
              <button 
                type="submit"
                className="bg-[#febd69] hover:bg-[#f3a847] px-3 py-2 rounded-r-md"
              >
                <Search className="w-4 h-4 text-black" />
              </button>
            </form>
            
            {/* Mobile Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-b-md shadow-lg z-50 max-h-60 overflow-y-auto">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="px-3 py-2 text-black text-sm hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                    onClick={(e) => handleSuggestionClick(suggestion, e)}
                  >
                    <div className="flex items-center">
                      <Search className="w-3 h-3 text-gray-400 mr-2" />
                      {suggestion}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden sm:flex items-center justify-between">
          {/* Left section */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Amazon logo */}
            <div className="flex items-center">
              <img 
                src={selectedCountry.code === 'gb' ? 
                  "https://i.postimg.cc/yxQnRNTn/amazon-uk-logo-feature.png" : 
                  "https://www.pngmart.com/files/23/Amazon-Logo-White-PNG-Image.png"
                } 
                alt={`Amazon ${getCountryConfig(selectedCountry.code).name}`} 
                className="h-8 sm:h-10 w-auto cursor-pointer hover:opacity-80 transition-opacity"
                onClick={handleLogoClick}
              />
            </div>
            
            {/* Delivery location - Hidden on mobile */}
            <div className="hidden lg:flex items-center space-x-1 text-sm hover:border border-white p-2 rounded cursor-pointer">
              <MapPin className="w-4 h-4" />
              <div>
                <div className="text-gray-300 text-xs">{getTranslation('deliver.to', getCountryConfig(selectedCountry.code).language)}</div>
                <div className="font-bold">{getCountryConfig(selectedCountry.code).name}</div>
              </div>
            </div>
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-3xl mx-2 sm:mx-4 relative">
            <form onSubmit={handleSearch} className="flex">
              <div className="hidden sm:flex bg-gray-200 border border-gray-300 rounded-l-md px-3 py-2 text-black text-sm hover:bg-gray-300 cursor-pointer items-center">
                {getTranslation('search.all.categories', getCountryConfig(selectedCountry.code).language)}
                <ChevronDown className="w-4 h-4 ml-1" />
              </div>
              <input 
                type="text" 
                value={searchQuery} 
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                onFocus={() => generateSuggestions(searchQuery)}
                placeholder={getTranslation('search.placeholder', getCountryConfig(selectedCountry.code).language)} 
                className="flex-1 px-2 sm:px-4 py-2 text-black text-sm sm:text-lg outline-none rounded-l-md sm:rounded-l-none" 
              />
              <button 
                type="submit"
                className="bg-[#febd69] hover:bg-[#f3a847] px-2 sm:px-4 py-2 rounded-r-md"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
              </button>
            </form>
            
            {/* Desktop Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-b-md shadow-lg z-50 max-h-60 overflow-y-auto">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="px-4 py-3 text-black text-sm hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                    onClick={(e) => handleSuggestionClick(suggestion, e)}
                  >
                    <div className="flex items-center">
                      <Search className="w-4 h-4 text-gray-400 mr-3" />
                      {suggestion}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Country Selector - Desktop Only */}
            <div className="hidden lg:block relative" ref={countryRef}>
              <button
                onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                className="flex items-center space-x-1 px-2 py-2 hover:border border-white rounded cursor-pointer text-xs"
              >
                <span className="text-lg">{selectedCountry.flag}</span>
                <span className="font-sans font-bold">{selectedCountry.code.toUpperCase()}</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {isCountryDropdownOpen && (
                <div className="absolute top-full right-0 mt-1 w-72 bg-white border border-gray-300 rounded shadow-lg z-50">
                  <div className="py-2">
                    <div className="px-4 py-2 text-sm font-semibold text-gray-700 border-b font-sans">
                      🌍 Change country/region
                    </div>
                    
                    {/* Country List */}
                    {countries.map((country) => (
                      <button
                        key={country.code}
                        onClick={() => {
                          setSelectedCountry(country);
                          setIsCountryDropdownOpen(false);
                        }}
                        className={`w-full flex items-center space-x-3 px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                          selectedCountry.code === country.code ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                        }`}
                      >
                        <span className="text-lg">{country.flag}</span>
                        <span className="font-sans">{country.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Account & Lists */}
            <div 
              className="hidden sm:flex flex-col text-xs hover:border border-white p-2 rounded cursor-pointer"
              onClick={handleAccountClick}
            >
              <div className="text-gray-300 font-sans">{getTranslation('account.hello', getCountryConfig(selectedCountry.code).language).split(',')[0]},</div>
              <div className="font-bold font-sans">{getTranslation('account.hello', getCountryConfig(selectedCountry.code).language).split(',')[1]?.trim() || 'Your Account'}</div>
            </div>
            
            {/* Returns & Orders */}
            <div className="hidden sm:flex flex-col text-xs hover:border border-white p-2 rounded cursor-pointer">
              <div className="text-gray-300 font-sans">{getTranslation('account.returns', getCountryConfig(selectedCountry.code).language).split('&')[0]?.trim()}</div>
              <div className="font-bold font-sans">& {getTranslation('account.returns', getCountryConfig(selectedCountry.code).language).split('&')[1]?.trim()}</div>
            </div>
            
            {/* Cart */}
            <div className="flex items-center hover:border border-white p-2 rounded cursor-pointer">
              <ShoppingCart className="w-6 h-6 sm:w-8 sm:h-8" />
              <span className="hidden sm:block ml-1 font-bold font-sans">{getTranslation('account.cart', getCountryConfig(selectedCountry.code).language)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary navigation - Improved mobile layout */}
      <div className="bg-[#232f3e] px-2 sm:px-4 py-2 flex items-center space-x-2 sm:space-x-6 text-xs sm:text-sm overflow-x-auto">
        <div className="flex items-center hover:border border-white p-1 rounded cursor-pointer whitespace-nowrap">
          <Menu className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
          {getTranslation('search.all.categories', getCountryConfig(selectedCountry.code).language)}
        </div>
        {[
          { key: 'todays-deals', translationKey: 'nav.todays.deals' },
          { key: 'customer-service', translationKey: 'nav.customer.service' },
          { key: 'registry', translationKey: 'nav.registry' },
          { key: 'gift-cards', translationKey: 'nav.gift.cards' },
          { key: 'sell', translationKey: 'nav.sell' }
        ].map(item => (
          <div key={item.key} className="hover:border border-white p-1 rounded cursor-pointer whitespace-nowrap">
            {getTranslation(item.translationKey, getCountryConfig(selectedCountry.code).language)}
          </div>
        ))}
        <div 
          className="text-[#febd69] hover:border border-white p-1 rounded cursor-pointer whitespace-nowrap"
          onClick={handleAmazonsChoiceClick}
        >
          Amazon's Choice
        </div>
      </div>

      {/* PIN Dialog */}
      {showPinDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Admin Access Required</h2>
              <button
                onClick={handlePinCancel}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-gray-600 mb-4">
              Enter your 6-digit PIN to access the admin dashboard
            </p>
            <form onSubmit={handlePinSubmit}>
              <input
                type="password"
                maxLength={6}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center tracking-widest text-lg"
                placeholder="Enter PIN"
                autoFocus
              />
              {pinError && (
                <p className="text-red-600 text-sm mt-2 text-center">{pinError}</p>
              )}
              <div className="flex space-x-3 mt-4">
                <button
                  type="button"
                  onClick={handlePinCancel}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Access Dashboard
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;