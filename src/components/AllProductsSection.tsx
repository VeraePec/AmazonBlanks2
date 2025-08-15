import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllProductsWithCreated } from '../data/productRegistry';
import { getTranslation, getCountryConfig, formatPrice } from '../utils/translations';
import { useCountrySelector } from '../hooks/useCountrySelector';
import Thumbnail from './Thumbnail';

const AllProductsSection = () => {
  const navigate = useNavigate();
  const { selectedCountry } = useCountrySelector();
  const allProducts = getAllProductsWithCreated();

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <span 
            key={i} 
            className={`text-sm ${
              i < fullStars 
                ? 'text-[#ffa41c]' 
                : i === fullStars && hasHalfStar 
                  ? 'text-[#ffa41c]' 
                  : 'text-gray-300'
            }`}
          >
            ★
          </span>
        ))}
        <span className="text-sm text-[#007185] ml-1 hover:underline cursor-pointer">
          {rating}
        </span>
      </div>
    );
  };

  const handleProductClick = (productRoute: string) => {
    if (productRoute) {
      navigate(productRoute);
    }
  };

  return (
    <div className="bg-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {getTranslation('homepage.all.products', getCountryConfig(selectedCountry.code).language)}
          </h2>
          <p className="text-gray-600">
            {getTranslation('homepage.all.products.subtitle', getCountryConfig(selectedCountry.code).language)}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {allProducts.map((product) => {
            return (
              <div 
                key={product.id}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => handleProductClick(product.route || `/${product.id}`)}
              >
                {/* Product Image */}
                <div className="aspect-square mb-4 relative flex items-center justify-center bg-white border border-gray-200 rounded group-hover:border-orange-300 transition-colors duration-200">
                  <Thumbnail source={(product as any).images || product.image} alt={product.name} className="w-full h-full object-contain max-w-full max-h-full" />
                  {product.amazonChoice && (
                    <div className="absolute top-2 left-2">
                      <span className="bg-[#232f3e] text-white text-xs px-2 py-1 rounded font-bold">
                        {getTranslation('homepage.amazon.choice', getCountryConfig(selectedCountry.code).language)}
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Product Info */}
                <div className="space-y-2">
                  <h3 className="font-medium text-sm hover:text-[#c7511f] hover:underline line-clamp-2 leading-tight">
                    {product.name}
                  </h3>
                  {renderStars(product.rating)}
                  <div className="text-xs text-gray-600">({product.reviews.toLocaleString()})</div>
                  <div className="flex items-center space-x-2">
                    <span className="text-base font-bold text-gray-900">{formatPrice(product.price, selectedCountry.code)}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        {formatPrice(product.originalPrice, selectedCountry.code)}
                      </span>
                    )}
                  </div>
                  {product.prime && (
                    <div className="flex items-center text-xs text-gray-600">
                      <span className="text-[#007185] font-bold mr-1">{getTranslation('homepage.prime', getCountryConfig(selectedCountry.code).language)}</span>
                      {getTranslation('homepage.free.delivery', getCountryConfig(selectedCountry.code).language)}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Show More Button (if there are many products) */}
        {allProducts.length > 20 && (
          <div className="text-center mt-8">
            <button 
              onClick={() => navigate('/search')}
              className="bg-[#007185] text-white px-6 py-3 rounded-lg hover:bg-[#005a6b] transition-colors"
            >
              {getTranslation('homepage.view.all.products', getCountryConfig(selectedCountry.code).language)}
            </button>
          </div>
        )}


      </div>
    </div>
  );
};

export default AllProductsSection;
