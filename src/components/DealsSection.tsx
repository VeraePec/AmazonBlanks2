
import React from 'react';
import { Clock, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getAmazonsChoiceProducts } from '../data/productRegistry';
import { getTranslation, getCountryConfig, formatPrice } from '../utils/translations';
import { useCountrySelector } from '../hooks/useCountrySelector';
import Thumbnail from './Thumbnail';

const DealsSection = () => {
  const navigate = useNavigate();
  const { selectedCountry } = useCountrySelector();
  const amazonsChoiceProducts = getAmazonsChoiceProducts().slice(0, 4);

  const calculateDiscount = (originalPrice: string, currentPrice: string) => {
    const original = parseFloat(originalPrice.replace('£', ''));
    const current = parseFloat(currentPrice.replace('£', ''));
    const discount = Math.round(((original - current) / original) * 100);
    return `${discount}% off`;
  };

  const generateTimeLeft = (index: number) => {
    const times = ['2h 15m', '1h 30m', '3h 45m', '4h 20m', '5h 10m'];
    return times[index] || '1h 00m';
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-3 h-3 ${
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

  return (
    <div className="bg-white py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-red-600" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{getTranslation('homepage.todays.deals', getCountryConfig(selectedCountry.code).language)}</h2>
          </div>
          <button className="text-[#007185] hover:text-[#c7511f] hover:underline font-medium text-sm sm:text-base">
            See all deals
          </button>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {amazonsChoiceProducts.map((product, index) => {
            const candidate = (product as any).images || product.image;
            return (
            <div 
              key={product.id} 
              onClick={() => product.route && navigate(product.route)}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
            >
              <div className="relative aspect-square flex items-center justify-center bg-white border border-gray-200 group-hover:border-orange-300 transition-colors duration-200">
                <Thumbnail source={candidate} alt={product.name} className="max-w-full max-h-full object-contain" />
                <div className="absolute top-2 left-2">
                  <span className="bg-red-600 text-white text-xs px-2 py-1 rounded font-bold">
                    {product.originalPrice ? calculateDiscount(product.originalPrice, product.price) : '90% off'}
                  </span>
                </div>
                <div className="absolute top-2 right-2">
                  <div className="bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {generateTimeLeft(index)}
                  </div>
                </div>
                <div className="absolute bottom-2 left-2">
                  <span className="bg-[#232f3e] text-white text-xs px-2 py-1 rounded font-bold">
                    Amazon's Choice
                  </span>
                </div>
              </div>
              <div className="p-3 sm:p-4">
                <h3 className="font-medium text-sm sm:text-base mb-1 line-clamp-2 leading-tight group-hover:text-[#c7511f]">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-xs mb-2 line-clamp-1">
                  {product.description}
                </p>
                
                <div className="flex items-center space-x-2 mb-2">
                  {renderStars(product.rating)}
                  <span className="text-xs text-[#007185] hover:underline">
                    {product.rating}
                  </span>
                  <span className="text-xs text-gray-500">
                    ({product.reviews.toLocaleString()})
                  </span>
                </div>
                
                <div className="flex items-center space-x-2 mb-2">
                                      <span className="text-lg font-bold text-gray-900">{formatPrice(product.price, selectedCountry.code)}</span>
                  {product.originalPrice && (
                                          <span className="text-sm text-gray-500 line-through">
                        {formatPrice(product.originalPrice, selectedCountry.code)}
                      </span>
                  )}
                </div>
                
                <div className="text-xs text-gray-600">
                  {product.prime ? getTranslation('product.delivery.tomorrow', getCountryConfig(selectedCountry.code).language) : 'Standard delivery'}
                </div>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DealsSection;
