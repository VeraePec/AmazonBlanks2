import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getAllCollectionsWithCreated } from '../data/productRegistry';
import Thumbnail from '../components/Thumbnail';

const CollectionPage = () => {
  const { collectionId } = useParams<{ collectionId: string }>();
  const navigate = useNavigate();
  const collections = getAllCollectionsWithCreated();
  
  const collection = collections.find(c => c.id === collectionId);

  // Scroll to top when component mounts or collection changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [collectionId]);

  if (!collection) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Collection not found</h1>
            <button 
              onClick={() => navigate('/')}
              className="text-[#007185] hover:underline"
            >
              Return to homepage
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

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
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="text-sm text-[#007185]">
            <span className="hover:underline cursor-pointer" onClick={() => navigate('/')}>
              Home
            </span>
            <span className="text-gray-500 mx-1">&gt;</span>
            <span className="text-gray-900">{collection.title}</span>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Collection Header */}
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              {collection.title}
            </h1>
            <p className="text-gray-600 text-lg">
              {collection.subtitle}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              {collection.products.length} {collection.products.length === 1 ? 'product' : 'products'}
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {collection.products.map((product) => {
              const candidate = (product as any).images || product.image;
              return (
              <div 
                key={product.id} 
                className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => handleProductClick(product.route || '')}
              >
                <div className="aspect-square mb-3 sm:mb-4 relative flex items-center justify-center bg-white border border-gray-200 rounded group-hover:border-orange-300 transition-colors duration-200">
                  <Thumbnail source={candidate} alt={product.name} className="w-full h-full object-contain max-w-full max-h-full" />
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

          {/* Empty state */}
          {collection.products.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products in this collection yet.</p>
              <button 
                onClick={() => navigate('/')}
                className="text-[#007185] hover:underline mt-4"
              >
                Browse other collections
              </button>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CollectionPage;