import React, { useState, useEffect } from 'react';
import { Search, Filter, Star, ChevronDown } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getProductsWithRoutes } from '../data/productRegistry';
import { getDeliveryInfo } from '../utils/deliveryDate';
import { getTranslation, getCountryConfig, formatPrice } from '../utils/translations';
import { useCountrySelector } from '../hooks/useCountrySelector';
import Thumbnail from '../components/Thumbnail';

const AmazonsChoicePage = () => {
  const { selectedCountry } = useCountrySelector();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  // Get only products with routes (your product pages)
  const allProducts = getProductsWithRoutes();
  
  // Filter products based on search and category
  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return parseFloat(a.price.replace('£', '')) - parseFloat(b.price.replace('£', ''));
      case 'price-high':
        return parseFloat(b.price.replace('£', '')) - parseFloat(a.price.replace('£', ''));
      case 'rating':
        return b.rating - a.rating;
      case 'reviews':
        return b.reviews - a.reviews;
      case 'newest':
        // Sort by ID (assuming newer products have higher IDs or different naming)
        // For now, we'll sort alphabetically by ID in reverse order
        return (b.id || '').localeCompare(a.id || '');
      case 'oldest':
        // Sort by ID in ascending order
        return (a.id || '').localeCompare(b.id || '');
      default:
        return 0; // featured order
    }
  });

  // Get unique categories
  const categories = ['All', ...Array.from(new Set(allProducts.map(p => p.category)))];

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
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

  const handleProductClick = (product: any) => {
    if (product.route) {
      window.location.href = product.route;
    }
  };

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="text-sm text-[#007185]">
            <span className="hover:underline cursor-pointer">Home</span>
            <span className="text-gray-500 mx-1">&gt;</span>
            <span className="text-gray-900">{getTranslation('product.amazons.choice', getCountryConfig(selectedCountry.code).language)}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Amazon's Choice
          </h1>
          <p className="text-gray-600">
            Handpicked products with exceptional quality and customer satisfaction
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search Amazon's Choice products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007185] focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="sm:w-48">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007185] focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="sm:w-48">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007185] focus:border-transparent"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="reviews">Most Reviews</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Showing {sortedProducts.length} of {allProducts.length} {getTranslation('product.amazons.choice', getCountryConfig(selectedCountry.code).language)} products
          </p>
        </div>

        {/* Products Grid */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {sortedProducts.map((product, index) => {
              const candidate = (product as any).images || product.image;
              return (
              <div
                key={product.id || index}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer bg-white"
                onClick={() => handleProductClick(product)}
              >
                <div className="aspect-square mb-4">
                  <Thumbnail source={candidate} alt={product.name} className="w-full h-full object-contain rounded" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium text-sm hover:text-[#c7511f] hover:underline line-clamp-2 leading-tight">
                    {product.name}
                  </h3>
                  
                  {renderStars(product.rating)}
                  
                  <div className="text-xs text-gray-600">
                    ({product.reviews.toLocaleString()})
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
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
                    <span className="text-xs bg-[#232f3e] text-white px-2 py-1 rounded">
                      Amazon's Choice
                    </span>
                  </div>
                  
                  <div className="text-xs text-gray-600">
                    {getDeliveryInfo()}
                  </div>
                </div>
              </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default AmazonsChoicePage; 