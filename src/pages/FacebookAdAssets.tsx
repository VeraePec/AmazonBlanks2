import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Download, Copy, ExternalLink, Eye, 
  Package, Star, Calendar, Filter, Search, Grid, List
} from 'lucide-react';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface Folder {
  id: string;
  name: string;
  parentId?: string;
  path: string;
  createdAt: string;
  products: string[];
}

interface ProductData {
  id?: string;
  name: string;
  price: string;
  originalPrice: string;
  description: string;
  category: string;
  features: string[];
  images: string[];
  amazonChoice: boolean;
  prime: boolean;
  rating: number;
  reviews: any[];
  reviewCount: number;
  variants: any[];
  specifications: Record<string, string>;
  stock: number;
  store: string;
  route?: string;
  aboutThisItem: string[];
  productDetails: Record<string, string>;
  technicalDetails: Record<string, string>;
  countryRedirects: any[];
  notes?: string;
  amazonLink?: string;
  adHeadline?: string;
  adCopy?: string;
  adCreatives?: string[];
  autoIncludeReviewImages?: boolean;
  folderId?: string;
}

const FacebookAdAssets = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAdminAuth();
  
  // PIN protection
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  
  // Dashboard state
  const [createdProducts, setCreatedProducts] = useState<ProductData[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [currentFolder, setCurrentFolder] = useState<string>('root');
  
  // Categories for filtering
  const categories = [
    'all', 'Home & Garden', 'Electronics', 'Clothing', 'Sports & Outdoors',
    'Beauty', 'Books', 'Health & Personal Care', 'Baby', 'Toys & Games',
    'Automotive', 'Tools & Home Improvement', 'Office Products'
  ];

  // PIN Authentication
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(pinInput)) {
      setPinError('');
      setPinInput('');
    } else {
      setPinError('Incorrect PIN. Please try again.');
      setPinInput('');
    }
  };

  // Load data on mount
  useEffect(() => {
    const savedProducts = localStorage.getItem('createdProducts');
    if (savedProducts) {
      setCreatedProducts(JSON.parse(savedProducts));
    }
    
    const savedFolders = localStorage.getItem('productFolders');
    if (savedFolders) {
      setFolders(JSON.parse(savedFolders));
    }
  }, []);

  // Get products with ad assets
  const productsWithAssets = createdProducts.filter(product => 
    product.adHeadline || product.adCopy || (product.adCreatives && product.adCreatives.length > 0)
  );

  // Get products for current folder
  const getCurrentFolderProducts = () => {
    if (currentFolder === 'root') {
      return productsWithAssets.filter(product => !product.folderId);
    }
    return productsWithAssets.filter(product => product.folderId === currentFolder);
  };

  // Filter products
  const filteredProducts = getCurrentFolderProducts().filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Copy to clipboard function
  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      console.log(`${type} copied to clipboard`);
    });
  };

  // Download image function
  const downloadImage = (imageUrl: string, productName: string, index: number) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `${productName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_creative_${index + 1}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Copy URL function
  const copyUrl = (url: string) => {
    const fullUrl = `${window.location.origin}${url}`;
    copyToClipboard(fullUrl, 'Product URL');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-[#ff9900] rounded-full flex items-center justify-center mb-4">
              <span className="text-white text-2xl">🔒</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Access Required</h1>
            <p className="text-gray-600">Enter your 6-digit PIN to access Facebook Ad Assets</p>
          </div>
          
          <form onSubmit={handlePinSubmit} className="space-y-4">
            <input
              type="password"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value.replace(/\D/g, '').slice(0, 6))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center text-2xl tracking-widest focus:ring-2 focus:ring-blue-500"
              placeholder="••••••"
              maxLength={6}
            />
            {pinError && <p className="text-red-600 text-sm">{pinError}</p>}
            
            <button
              type="submit"
              disabled={pinInput.length !== 6}
              className="w-full bg-[#ff9900] hover:bg-[#e88800] disabled:bg-gray-300 text-white font-medium py-3 rounded-lg"
            >
              Access Facebook Ad Assets
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <button onClick={() => navigate('/')} className="text-[#007185] hover:underline text-sm">
              ← Back to Homepage
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate('/admin')}
                className="text-[#007185] hover:underline flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Admin Dashboard
              </button>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Facebook Ad Assets</h1>
          <p className="text-gray-600">Manage and download your product advertising assets</p>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Package className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Products with Assets</p>
                  <p className="text-2xl font-bold text-blue-600">{productsWithAssets.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Star className="w-8 h-8 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Total Creatives</p>
                  <p className="text-2xl font-bold text-green-600">
                    {productsWithAssets.reduce((sum, p) => sum + (p.adCreatives?.length || 0), 0)}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-8 h-8 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">Ready for Campaign</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {productsWithAssets.filter(p => p.adHeadline && p.adCopy && p.adCreatives?.length).length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
            
            {/* Folder Filter */}
            <select
              value={currentFolder}
              onChange={(e) => setCurrentFolder(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="root">All Folders</option>
              {folders.map(folder => (
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Products List */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-500 mb-2">No Products with Ad Assets</h3>
            <p className="text-gray-400">Create products with Facebook ad assets to see them here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">{product.name}</h3>
                      <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-[#ff9900]">{product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => copyUrl(product.route || '')}
                      className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" /> Copy URL
                    </button>
                    <button
                      onClick={() => window.open(product.route || '', '_blank')}
                      className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700 flex items-center gap-1"
                    >
                      <Eye className="w-3 h-3" /> View Product
                    </button>
                  </div>
                </div>

                {/* Ad Assets */}
                <div className="space-y-4">
                  {/* Headline */}
                  {product.adHeadline && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-gray-700">Headline</label>
                        <button
                          onClick={() => copyToClipboard(product.adHeadline!, 'Headline')}
                          className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                        >
                          <Copy className="w-3 h-3" /> Copy
                        </button>
                      </div>
                      <p className="text-gray-900 bg-gray-50 p-3 rounded border">{product.adHeadline}</p>
                    </div>
                  )}

                  {/* Ad Copy */}
                  {product.adCopy && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-gray-700">Ad Copy</label>
                        <button
                          onClick={() => copyToClipboard(product.adCopy!, 'Ad Copy')}
                          className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                        >
                          <Copy className="w-3 h-3" /> Copy
                        </button>
                      </div>
                      <p className="text-gray-900 bg-gray-50 p-3 rounded border">{product.adCopy}</p>
                    </div>
                  )}

                  {/* Creatives */}
                  {product.adCreatives && product.adCreatives.length > 0 && (
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-3 block">
                        Ad Creatives ({product.adCreatives.length})
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                        {product.adCreatives.map((creative, index) => (
                          <div key={index} className="relative group">
                            <div className="aspect-square border border-gray-200 rounded-lg overflow-hidden">
                              <img 
                                src={creative} 
                                alt={`Creative ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center">
                                <button
                                  onClick={() => downloadImage(creative, product.name, index)}
                                  className="bg-white text-gray-900 px-3 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1"
                                >
                                  <Download className="w-3 h-3" /> Download
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default FacebookAdAssets;