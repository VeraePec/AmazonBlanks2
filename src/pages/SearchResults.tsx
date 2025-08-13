import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Star, Filter, Grid, List } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getAllProductsWithCreated } from '../data/productRegistry';
import { getTranslation, getCountryConfig, formatPrice } from '../utils/translations';
import { useCountrySelector } from '../hooks/useCountrySelector';
import Thumbnail from '../components/Thumbnail';

const SearchResults = () => {
  const { selectedCountry } = useCountrySelector();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [sortBy, setSortBy] = useState('relevance');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [query]);

  // Get all products and filter by search query
  const allProducts = getAllProductsWithCreated();
  
  const searchProducts = (searchQuery: string) => {
    if (!searchQuery.trim()) return [];
    
    const lowercaseQuery = searchQuery.toLowerCase();
    
    return allProducts.filter(product => {
      const matchesName = product.name.toLowerCase().includes(lowercaseQuery);
      const matchesDescription = product.description?.toLowerCase().includes(lowercaseQuery) || false;
      const matchesCategory = product.category.toLowerCase().includes(lowercaseQuery);
      const matchesFeatures = product.features?.some(feature => 
        feature.toLowerCase().includes(lowercaseQuery)
      ) || false;
      
      return matchesName || matchesDescription || matchesCategory || matchesFeatures;
    });
  };

  const searchResults = searchProducts(query);
  
  // Filter by category
  const filteredResults = selectedCategory === 'All' 
    ? searchResults 
    : searchResults.filter(product => product.category === selectedCategory);

  // Sort results
  const sortedResults = [...filteredResults].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return parseFloat(a.price.replace('£', '')) - parseFloat(b.price.replace('£', ''));
      case 'price-high':
        return parseFloat(b.price.replace('£', '')) - parseFloat(a.price.replace('£', ''));
      case 'rating':
        return b.rating - a.rating;
      case 'reviews':
        return b.reviews - a.reviews;
      case 'name':
        return a.name.localeCompare(b.name);
      default: // relevance
        return 0;
    }
  });

  // Get unique categories from search results
  const availableCategories = ['All', ...Array.from(new Set(searchResults.map(p => p.category)))];

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

  if (!query.trim()) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Enter a search term</h1>
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

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      <div className="flex-1">
        <div className="max-w-7xl mx-auto">
          {/* Results Header - Amazon Style */}
          <div className="px-4 py-3 border-b border-gray-200">
            <div className="text-sm text-gray-700">
              <span className="font-bold">1-{Math.min(16, sortedResults.length)} of {sortedResults.length}</span> {getTranslation('search.results.for', getCountryConfig(selectedCountry.code).language)} {' '}
              <span className="text-[#c45500] font-bold">"{query}"</span>
            </div>
          </div>

          {/* Sort Bar - Amazon Style */}
          <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Check each product page for other buying options.
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-gray-700">Sort by:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded text-sm px-2 py-1 bg-white"
                >
                  <option value="relevance">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Avg. Customer Review</option>
                  <option value="reviews">Newest Arrivals</option>
                </select>
              </div>
            </div>
          </div>

          {/* Search Results - Amazon Style Grid */}
          {sortedResults.length > 0 ? (
            <div className="px-4 py-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {sortedResults.map((product) => {
                  const candidate = (product as any).images || product.image;
                  return (
                  <div 
                    key={product.id} 
                    className="bg-white rounded-lg p-3 hover:shadow-lg transition-all cursor-pointer group border border-transparent hover:border-gray-200"
                    onClick={() => handleProductClick(product.route || '')}
                  >
                    {/* Product Image */}
                    <div className="aspect-square mb-3 relative flex items-center justify-center bg-white border border-gray-200 rounded group-hover:border-orange-300 transition-colors duration-200">
                      <Thumbnail source={candidate} alt={product.name} className="w-full h-full object-contain max-w-full max-h-full" />
                      {product.amazonChoice && (
                        <div className="absolute top-2 left-2">
                          <span className="bg-[#232f3e] text-white text-xs px-2 py-1 rounded font-bold">
                            Amazon's Choice
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {/* Product Title */}
                    <h3 className="text-sm font-normal mb-2 line-clamp-3 leading-tight text-[#0066c0] hover:text-[#c45500] hover:underline">
                      {product.name}
                    </h3>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-1">
                      {renderStars(product.rating)}
                      <span className="text-xs text-[#0066c0] hover:underline cursor-pointer">
                        ({product.reviews.toLocaleString()})
                      </span>
                    </div>
                    
                    {/* Price */}
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-lg font-bold text-gray-900">{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          {product.originalPrice}
                        </span>
                      )}
                    </div>
                    
                    {/* Prime */}
                    {product.prime && (
                      <div className="flex items-center text-xs text-gray-600 mb-2">
                        <span className="text-[#0066c0] font-bold mr-1">{getTranslation('homepage.prime', getCountryConfig(selectedCountry.code).language)}</span>
                        {getTranslation('homepage.free.delivery', getCountryConfig(selectedCountry.code).language)}
                      </div>
                    )}
                    
                    {/* Delivery Info */}
                    <div className="text-xs text-gray-600">
                      Get it <span className="font-bold">tomorrow, {new Date(Date.now() + 86400000).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}</span>
                    </div>
                  </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="px-4 py-12 text-center">
              <h2 className="text-xl font-bold mb-4">No results found for "{query}"</h2>
              <div className="text-sm text-gray-600 space-y-2 max-w-md mx-auto">
                <p>Try checking your spelling or use more general terms</p>
                <div className="mt-4">
                  <button 
                    onClick={() => navigate('/')}
                    className="text-[#0066c0] hover:text-[#c45500] hover:underline"
                  >
                    ← Back to Amazon.co.uk
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SearchResults;