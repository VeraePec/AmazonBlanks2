import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllCollectionsWithCreated, ProductCollection } from '../data/productRegistry';
import { getTranslation, getCountryConfig, formatPrice } from '../utils/translations';
import { useCountrySelector } from '../hooks/useCountrySelector';
import Thumbnail from './Thumbnail';

const ProductCollections = () => {
  const navigate = useNavigate();
  const { selectedCountry } = useCountrySelector();
  const collections = getAllCollectionsWithCreated();
  const [isNavigating, setIsNavigating] = React.useState(false);
  

  

  const [scrollStates, setScrollStates] = React.useState<{[key: string]: {showIndicator: boolean, isAtEnd: boolean, isAtStart: boolean}}>({});
  const scrollRefs = React.useRef<{[key: string]: HTMLDivElement | null}>({});

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
      // Use setTimeout to ensure navigation works reliably
      setTimeout(() => {
        window.location.href = productRoute;
      }, 0);
    }
  };

  const handleSeeMoreClick = (collectionId: string) => {
    navigate(`/collection/${collectionId}`);
  };

  // Function to get translated collection title (fallback to default when missing)
  const getTranslatedCollectionTitle = (collectionId: string, defaultTitle: string) => {
    const translationKey = `collections.${collectionId.replace(/-/g, '.')}`;
    const t = getTranslation(translationKey, getCountryConfig(selectedCountry.code).language);
    return t === translationKey ? defaultTitle : t;
  };

  // Function to get translated collection subtitle (fallback to default when missing)
  const getTranslatedCollectionSubtitle = (collectionId: string, defaultSubtitle: string) => {
    const translationKey = `collections.${collectionId.replace(/-/g, '.')}.subtitle`;
    const t = getTranslation(translationKey, getCountryConfig(selectedCountry.code).language);
    return t === translationKey ? defaultSubtitle : t;
  };

  // Check scroll state for collections
  React.useEffect(() => {
    const checkScrollStates = () => {
      const newStates: {[key: string]: {showIndicator: boolean, isAtEnd: boolean, isAtStart: boolean}} = {};
      
      collections.forEach(collection => {
        const container = scrollRefs.current[collection.id];
        if (container) {
          const isScrollable = container.scrollWidth > container.clientWidth;
          const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 1;
          const isAtStart = container.scrollLeft <= 1;
          newStates[collection.id] = {
            showIndicator: isScrollable && collection.products.length > 5,
            isAtEnd,
            isAtStart
          };
        }
      });
      
      setScrollStates(newStates);
    };

    const handleScroll = (collectionId: string) => {
      const container = scrollRefs.current[collectionId];
      if (container) {
        const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 1;
        const isAtStart = container.scrollLeft <= 1;
        setScrollStates(prev => ({
          ...prev,
          [collectionId]: {
            ...prev[collectionId],
            isAtEnd,
            isAtStart
          }
        }));
      }
    };

    checkScrollStates();
    window.addEventListener('resize', checkScrollStates);
    
    return () => window.removeEventListener('resize', checkScrollStates);
  }, [collections]);

  // Image card component that safely resolves stored image refs
  const CollectionItemCard: React.FC<{ product: any } > = ({ product }) => {
    const candidate = (product as any).images || product.image;
    return (
      <div 
        key={product.id} 
        className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-lg transition-shadow cursor-pointer group flex-shrink-0 w-40 sm:w-auto"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          
          // Prevent multiple rapid clicks
          if (isNavigating) return;
          setIsNavigating(true);
          
          const route = product.route || `/${product.id}`;
          
          // Try React Router first, then fallback to direct navigation
          try {
            navigate(route);
          } catch (error) {
            // Fallback to direct navigation
            window.location.href = route;
          }
          
          // Reset navigation state after a short delay
          setTimeout(() => setIsNavigating(false), 1000);
        }}
      >
        <div className="aspect-square mb-3 sm:mb-4 relative flex items-center justify-center bg-white border border-gray-200 rounded group-hover:border-orange-300 transition-colors duration-200">
          <Thumbnail source={candidate} alt={product.name} className="w-full h-full object-contain max-w-full max-h-full" />
          {product.amazonChoice && (
            <div className="absolute top-2 left-2">
              <span className="bg-[#232f3e] text-white text-xs px-2 py-1 rounded font-bold">
                {getTranslation('homepage.amazon.choice', getCountryConfig(selectedCountry.code).language)}
              </span>
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <h3 className="font-medium text-xs sm:text-sm hover:text-[#c7511f] hover:underline line-clamp-2 leading-tight">
            {product.name}
          </h3>
          {renderStars(product.rating)}
          <div className="text-xs text-gray-600">({typeof product.reviews === 'number' ? product.reviews.toLocaleString() : '100'})</div>
          <div className="flex items-center space-x-2">
            <span className="text-base sm:text-lg font-bold text-gray-900">{formatPrice(product.price, selectedCountry.code)}</span>
            {product.originalPrice && (
              <span className="text-xs sm:text-sm text-gray-500 line-through">
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
  };

  // Removed complex desktop scroller. We restore simple behavior:
  // - Mobile: horizontal scroll strip
  // - Desktop: single grid row (up to 5 items), no horizontal/vertical scrolling

  return (
    <div className="bg-gray-50 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4">
        {collections.map((collection: ProductCollection) => (
          <div key={collection.id} className="mb-8">
            {/* Collection Header */}
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{getTranslatedCollectionTitle(collection.id, collection.title)}</h2>
                {scrollStates[collection.id]?.showIndicator && (
                  <p className="text-sm text-gray-500 mt-1">Scroll to see more products →</p>
                )}
              </div>
              <button 
                onClick={() => handleSeeMoreClick(collection.id)}
                className="text-[#007185] hover:text-[#c7511f] hover:underline font-medium text-sm sm:text-base"
              >
                {getTranslation('homepage.see.more', getCountryConfig(selectedCountry.code).language)}
              </button>
            </div>

            {/* Mobile: horizontal scroll */}
            <div className="flex overflow-x-auto gap-3 pb-2 sm:hidden scrollbar-hide scroll-smooth touch-pan-x">
              {collection.products.map((product) => (
                <div key={`m-${product.id}`} className="flex-shrink-0 w-40">
                  <CollectionItemCard product={product} />
                </div>
              ))}
            </div>

            {/* Desktop: horizontal scroll */}
            <div className="hidden sm:block relative">
              <div 
                ref={(el) => scrollRefs.current[collection.id] = el}
                className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide scroll-smooth touch-pan-x"
                onScroll={() => {
                  const container = scrollRefs.current[collection.id];
                  if (container) {
                    const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 1;
                    const isAtStart = container.scrollLeft <= 1;
                    setScrollStates(prev => ({
                      ...prev,
                      [collection.id]: {
                        ...prev[collection.id],
                        isAtEnd,
                        isAtStart
                      }
                    }));
                  }
                }}
              >
                {collection.products.map((product) => (
                  <div key={`d-${product.id}`} className="flex-shrink-0 w-48 sm:w-56 lg:w-64 xl:w-72">
                    <CollectionItemCard product={product} />
                  </div>
                ))}
              </div>
              {/* Fade effects for desktop */}
              {scrollStates[collection.id]?.showIndicator && !scrollStates[collection.id]?.isAtEnd && (
                <div className="absolute right-0 top-0 bottom-4 w-8 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none"></div>
              )}
              {scrollStates[collection.id]?.showIndicator && !scrollStates[collection.id]?.isAtStart && (
                <div className="absolute left-0 top-0 bottom-4 w-8 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none"></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCollections;