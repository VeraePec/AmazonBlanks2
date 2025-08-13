
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getFeaturedProducts } from '../data/productRegistry';
import { getDeliveryInfo } from '../utils/deliveryDate';
import { useCountrySelector } from '../hooks/useCountrySelector';
import Thumbnail from './Thumbnail';

const ProductGrid = () => {
  const navigate = useNavigate();
  const { selectedCountry } = useCountrySelector();
  const [showScrollIndicator, setShowScrollIndicator] = React.useState(false);
  const [isAtEnd, setIsAtEnd] = React.useState(false);
  const [isAtStart, setIsAtStart] = React.useState(true);
  const scrollContainerRef = React.useRef(null);

  // Get products from the centralized registry
  // Products with routes (your product pages) get priority
  const products = getFeaturedProducts(10); // Now dynamically loaded from registry

  // Check if scrolling is needed
  React.useEffect(() => {
    const checkScrollNeeded = () => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const isScrollable = container.scrollWidth > container.clientWidth;
        setShowScrollIndicator(isScrollable && products.length > 5);
      }
    };

    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 1;
        const isAtStart = container.scrollLeft <= 1;
        setIsAtEnd(isAtEnd);
        setIsAtStart(isAtStart);
      }
    };

    checkScrollNeeded();
    window.addEventListener('resize', checkScrollNeeded);
    
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    
    return () => {
      window.removeEventListener('resize', checkScrollNeeded);
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [products.length]);

  const renderStars = (rating) => {
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

  const handleProductClick = (product) => {
    if (product.route) {
      navigate(product.route);
    } else {
      // For products without specific routes, you can implement a generic product page
      // or redirect to a search results page
      console.log(`Clicked on ${product.name}`);
    }
  };

  return (
    <div className="bg-gray-50 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Frequently repurchased in Electronics & Home</h2>
            {showScrollIndicator && (
              <p className="text-sm text-gray-500 mt-1">Scroll to see more products →</p>
            )}
          </div>
          <button className="text-[#007185] hover:text-[#c7511f] hover:underline font-medium text-sm sm:text-base">
            See more
          </button>
        </div>
        
        <div className="relative">
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-3 sm:gap-4 pb-4 scrollbar-hide scroll-smooth touch-pan-x"
          >
            {products.map((product, index) => (
              <div 
                key={product.id || index} // Changed key to use product.id
                className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-lg transition-shadow cursor-pointer group flex-shrink-0 w-48 sm:w-56 lg:w-64 xl:w-72"
                onClick={() => handleProductClick(product)}
              >
                <div className="aspect-square mb-3 sm:mb-4 relative bg-white flex items-center justify-center border border-gray-200 rounded group-hover:border-orange-300 transition-colors duration-200">
                <Thumbnail source={(product as any).images || product.image} alt={product.name} className="w-full h-full object-contain rounded max-w-full max-h-full" />
                {product.amazonChoice && (
                  <div className="absolute top-2 left-2">
                    <span className="bg-[#232f3e] text-white text-xs px-2 py-1 rounded font-bold">
                      Amazon's Choice
                    </span>
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium text-xs sm:text-sm hover:text-[#c7511f] hover:underline line-clamp-2 leading-tight">
                  {product.name}
                </h3>
                
                {renderStars(product.rating)}
                
                <div className="text-xs text-gray-600">
                  ({product.reviews.toLocaleString()})
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-base sm:text-lg font-bold text-gray-900">{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-xs sm:text-sm text-gray-500 line-through">
                      {product.originalPrice}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-2 flex-wrap">
                  {product.prime && (
                    <span className="text-xs bg-[#007185] text-white px-2 py-1 rounded">
                      Prime
                    </span>
                  )}
                </div>
                
                <div className="text-xs text-gray-600">
                  {getDeliveryInfo()}
                </div>
              </div>
            </div>
          ))}
          {/* Fade effect to indicate more content */}
          {showScrollIndicator && !isAtEnd && (
            <div className="absolute right-0 top-0 bottom-4 w-8 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none"></div>
          )}
          {/* Fade effect on the left when scrolled */}
          {showScrollIndicator && !isAtStart && (
            <div className="absolute left-0 top-0 bottom-4 w-8 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none"></div>
          )}
        </div>

        <div className="mt-6 sm:mt-8 text-center">
          <button className="text-[#007185] hover:text-[#c7511f] hover:underline font-medium text-sm sm:text-base">
            See more
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
