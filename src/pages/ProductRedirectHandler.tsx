import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCountrySelector } from '../hooks/useCountrySelector';
import { getTranslation, getCountryConfig } from '../utils/translations';

/**
 * Professional Amazon-style Checkout/Order Preparation Page
 * - Uses the same header as homepage (mobile & desktop)
 * - Multi-language support for all countries
 * - Shows selected product options (size, color, etc.)
 * - Professional Amazon design style
 */
const ProductRedirectHandler = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { selectedCountry } = useCountrySelector();
  const [countdown, setCountdown] = useState(3);
  const [productData, setProductData] = useState<any>(null);

  // Get language for translations
  const language = getCountryConfig(selectedCountry?.code || 'gb').language;

  useEffect(() => {
    const handleRedirect = async () => {
      try {
        // Get product data from URL parameters
        const productName = searchParams.get('name');
        const productImage = searchParams.get('image');
        const redirectUrl = searchParams.get('url');
        const actionType = searchParams.get('action') || 'buy-now';
        const countryCode = searchParams.get('country') || 'UK';
        const selectedOptions = searchParams.get('options') || '';

        console.log('🔍 Debug - Redirect URL:', redirectUrl);
        console.log('🔍 Debug - Product Name:', productName);

        if (!productName || !redirectUrl) {
          console.error('Missing required parameters');
          navigate('/');
          return;
        }

        // Parse selected options if they exist
        let parsedOptions = {};
        if (selectedOptions) {
          try {
            parsedOptions = JSON.parse(decodeURIComponent(selectedOptions));
          } catch (e) {
            console.log('No options to parse');
          }
        }

        // Store product data in localStorage (this will survive the redirect)
        const dataToStore = {
          name: productName,
          image: productImage || '',
          pixel: '1289141292863424',
          action: actionType,
          country: countryCode,
          options: parsedOptions,
          timestamp: Date.now(),
          source: 'product-page'
        };

        setProductData(dataToStore);

        // Store in multiple places for maximum compatibility
        localStorage.setItem('currentProductData', JSON.stringify(dataToStore));
        sessionStorage.setItem('currentProductData', JSON.stringify(dataToStore));
        
        // Also store with a unique key
        const uniqueKey = `product_${Date.now()}`;
        localStorage.setItem(uniqueKey, JSON.stringify(dataToStore));
        
        // Store the unique key for easy retrieval
        localStorage.setItem('lastProductKey', uniqueKey);

        // Add a small delay to ensure storage is complete
        await new Promise(resolve => setTimeout(resolve, 100));

        // Start countdown
        const countdownInterval = setInterval(() => {
          setCountdown(prev => {
            if (prev <= 1) {
              clearInterval(countdownInterval);
              // Force redirect with multiple methods
              console.log('🚀 Force redirect to:', redirectUrl);
              
              // Try multiple redirect methods
              try {
                // Method 1: window.location.href
                window.location.href = redirectUrl;
              } catch (error) {
                console.error('Method 1 failed:', error);
                try {
                  // Method 2: window.location.replace
                  window.location.replace(redirectUrl);
                } catch (error2) {
                  console.error('Method 2 failed:', error2);
                  try {
                    // Method 3: window.open
                    window.open(redirectUrl, '_self');
                  } catch (error3) {
                    console.error('Method 3 failed:', error3);
                    // Method 4: Navigate programmatically
                    window.location = redirectUrl as any;
                  }
                }
              }
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

        return () => clearInterval(countdownInterval);

      } catch (error) {
        console.error('Error in redirect handler:', error);
        navigate('/');
      }
    };

    handleRedirect();
  }, [searchParams, navigate]);

  // Helper function to get plural form
  const getPlural = (count: number) => {
    return count === 1 ? '' : 's';
  };

  // Helper function to render selected options
  const renderSelectedOptions = () => {
    if (!productData?.options || Object.keys(productData.options).length === 0) {
      return null;
    }

    console.log('🔍 ProductRedirectHandler DEBUG:', {
      productOptions: productData.options,
      language,
      translationKeys: Object.keys(productData.options).map(key => `checkout.${key}`)
    });

    return (
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          {getTranslation('checkout.selected.options', language)}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(productData.options).map(([key, value]) => {
            // Get proper translation for the key
            const translatedKey = getTranslation(`checkout.${key}`, language);
            console.log(`🔍 Translation for checkout.${key}:`, translatedKey);
            
            return (
              <div key={key} className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-sm font-medium text-gray-600 capitalize">
                  {translatedKey}
                </span>
                <span className="text-sm text-gray-900">
                  {String(value)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Use the same Header component as homepage */}
      <Header />
      
      {/* Main content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8">
          {/* Progress indicator */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-[#ff9900] rounded-full flex items-center justify-center text-white font-bold text-lg">
                1
              </div>
              <div className="text-gray-400 text-xl">→</div>
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold text-lg">
                2
              </div>
              <div className="text-gray-400 text-xl">→</div>
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold text-lg">
                3
              </div>
            </div>
          </div>

          {/* Status message */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-[#ff9900] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <h1 className="text-3xl font-semibold text-gray-900 mb-3">
              {getTranslation('checkout.preparing.order', language)}
            </h1>
            <p className="text-gray-600 text-lg">
              {getTranslation('checkout.please.wait', language)}
            </p>
          </div>

          {/* Product info */}
          {productData && (
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-medium text-gray-900 mb-4">
                {getTranslation('checkout.order.summary', language)}
              </h2>
              <div className="flex items-start space-x-4">
                {productData.image && (
                  <img 
                    src={productData.image} 
                    alt={productData.name}
                    className="w-24 h-24 object-cover rounded border shadow-sm"
                  />
                )}
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 text-base leading-tight mb-2">
                    {productData.name}
                  </h3>
                  <div className="space-y-1 text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{getTranslation('checkout.country', language)}:</span>
                      <span>{productData.country}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Selected Options */}
          {renderSelectedOptions()}

          {/* Countdown and redirect info */}
          <div className="text-center">
            <div className="text-xl font-medium text-gray-900 mb-3">
              {getTranslation('checkout.redirecting.in', language, { 
                seconds: countdown, 
                plural: getPlural(countdown) 
              })}
            </div>
            <div className="text-gray-600 mb-6">
              {getTranslation('checkout.redirecting.to.partner', language)}
            </div>
            
            {/* Manual redirect button */}
            <button 
              onClick={() => {
                const redirectUrl = searchParams.get('url');
                if (redirectUrl) {
                  window.location.href = redirectUrl;
                }
              }}
              className="bg-[#ff9900] hover:bg-[#ff8c00] text-white px-8 py-4 rounded-lg font-medium text-lg transition-colors shadow-md hover:shadow-lg transform hover:scale-105"
            >
              {getTranslation('checkout.continue.to.checkout', language)}
            </button>
          </div>

          {/* Security badges */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>{getTranslation('checkout.secure.checkout', language)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>{getTranslation('checkout.ssl.encrypted', language)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>{getTranslation('checkout.trusted.partner', language)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Use the same Footer component as homepage */}
      <Footer />
    </div>
  );
};

export default ProductRedirectHandler;
