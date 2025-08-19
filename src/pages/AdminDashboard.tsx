import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, Filter, Plus, Eye, Edit, Trash2, Settings, Link, 
  Package, BarChart3, Users, Globe, ChevronDown, X, Save,
  ShoppingCart, Star, Calendar, ArrowUpDown, Copy, Download,
  Sparkles, Lightbulb, MapPin, ChevronLeft, ChevronRight,
  TrendingUp, PieChart
} from 'lucide-react';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import Header from '../components/Header';
import { imageStorage } from '../utils/imageStorage';
import { unifiedStorage } from '../utils/unifiedStorage';
import { getAllDynamicProducts, deleteDynamicProduct, cleanupProductsByName } from '../utils/dynamicProductRegistry';
import { useCrossBrowserSync } from '../hooks/useCrossBrowserSync';
import { crossTabSync } from '../utils/crossTabSync';

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
  specifications: { [key: string]: string };
  stock: number;
  store: string;
  route?: string;
  aboutThisItem: string[];
  productDetails: { [key: string]: string };
  technicalDetails: { [key: string]: string };
  countryRedirects: any[];
  notes?: string;
  createdBy?: 'ai' | 'manual';
  createdAt?: number;
  pageViews?: number;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAdminAuth();
  
  // PIN protection
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  
  // Dashboard state
  const [activeTab, setActiveTab] = useState('products');
  const [createdProducts, setCreatedProducts] = useState<ProductData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCreationType, setSelectedCreationType] = useState('all'); // New filter for AI/Manual
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Export selection state
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
  const [showExportModal, setShowExportModal] = useState(false);
  
  // Creation modal state
  const [showCreationModal, setShowCreationModal] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(20); // 5 rows * 4 columns = 20 products per page
  const [refreshKey, setRefreshKey] = useState(0); // For forcing re-renders
  
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

  // Function to load products
  const loadProducts = React.useCallback(() => {
    if (!isAuthenticated) return;
    
    console.log('🔄 Loading products in Admin Dashboard...');
    
    return new Promise<void>((resolve) => {
      try {
        // Load manual products
        const savedProducts = localStorage.getItem('createdProducts');
        let manualProducts: ProductData[] = [];
        if (savedProducts) {
          const products = JSON.parse(savedProducts);
          manualProducts = Array.isArray(products) ? products.map(p => ({
            ...p,
            createdBy: 'manual' as const
          })) : [];
        }

        // Load AI products (dedupe by id) and resolve image refs for thumbnails
        const seenIds = new Set<string>();
        const aiProducts = getAllDynamicProducts().filter(p => {
          if (!p?.id) return false;
          if (seenIds.has(p.id)) return false;
          seenIds.add(p.id);
          return true;
        }).map(p => ({
          id: p.id,
          name: p.name,
          price: p.price,
          originalPrice: p.originalPrice || p.price,
          description: p.aboutThisItem?.[0] || '',
          category: p.category,
          features: p.features,
          images: p.images,
          amazonChoice: p.amazonChoice || false,
          prime: p.prime || false,
          rating: p.rating,
          reviews: p.reviews,
          reviewCount: p.reviewCount,
          variants: p.variants || [],
          specifications: p.productDetails,
          stock: 100,
          store: p.store,
          route: p.route,
          aboutThisItem: p.aboutThisItem,
          productDetails: p.productDetails,
          technicalDetails: p.technicalDetails,
          countryRedirects: [],
          createdBy: 'ai' as const,
          createdAt: p.createdAt
        }));

        // Always resolve and ensure persistence for thumbnails (AI + manual)
        const resolveThumbnails = async (items: ProductData[]): Promise<ProductData[]> => {
          const resolved = await Promise.all(items.map(async (p) => {
            const rawImages = Array.isArray(p.images) ? p.images : [];
            // Resolve any idb-ref/blob-ref to object URLs for display
            const resolvedUrls = await imageStorage.resolveImageUrlsAsync(rawImages);
            // Persist for durability so refresh in Admin doesn't lose images
            const persisted = await imageStorage.processImagesForPersistence(resolvedUrls);
            // For Admin cards, keep actual displayable URLs (resolvedUrls). Product pages will re-resolve as needed
            const imagesForAdmin = resolvedUrls.length > 0 ? resolvedUrls : persisted;
            return { ...p, images: imagesForAdmin } as ProductData;
          }));
          return resolved;
        };

        (async () => {
          // Prefer AI products when duplicates exist by route or id
          const aiByKey = new Map<string, ProductData>();
          aiProducts.forEach(p => {
            const key = (p.route || p.id || '').toLowerCase();
            if (key) aiByKey.set(key, p);
          });

          // Clean up manual duplicates that collide with AI by route/id
          const cleanedManual = manualProducts.filter(p => {
            const key = (p.route || p.id || '').toLowerCase();
            return key ? !aiByKey.has(key) : true;
          });

          // Persist cleanup back to localStorage (one-time fix for old duplicates)
          try {
            const persistable = cleanedManual.map(({ createdBy, createdAt, ...rest }) => rest);
            localStorage.setItem('createdProducts', JSON.stringify(persistable));
          } catch (e) {
            console.warn('Could not persist cleaned createdProducts', e);
          }

          const combined = [...cleanedManual, ...aiProducts];
          const withResolved = await resolveThumbnails(combined);

          // Final dedupe by key across the combined array (guard against any remaining)
          const seen = new Set<string>();
          const deduped: ProductData[] = [];
          for (const p of withResolved) {
            const key = (p.route || p.id || '').toLowerCase();
            if (!key) { deduped.push(p); continue; }
            if (seen.has(key)) continue;
            seen.add(key);
            deduped.push(p);
          }

          setCreatedProducts(deduped);
        })();

        // Clean up test products on load (disabled to prevent accidental deletion)
        // cleanupProductsByName('aze');
      } catch (error) {
        console.error('Error loading products:', error);
        setCreatedProducts([]);
      } finally {
        resolve();
      }
    });
  }, [isAuthenticated]);
  
  // Load products on mount and auth change
  useEffect(() => {
    loadProducts();
  }, [loadProducts, refreshKey]);
  
  // Listen for cross-browser sync events
  useCrossBrowserSync('product-added', React.useCallback((event) => {
    console.log('🔄 Product added event received in Admin Dashboard:', event);
    // Increment refresh key to trigger reload
    setRefreshKey(prev => prev + 1);
  }, []));
  
  useCrossBrowserSync('product-updated', React.useCallback((event) => {
    console.log('🔄 Product updated event received in Admin Dashboard:', event);
    // Increment refresh key to trigger reload
    setRefreshKey(prev => prev + 1);
  }, []));
  
  useCrossBrowserSync('product-deleted', React.useCallback((event) => {
    console.log('🔄 Product deleted event received in Admin Dashboard:', event);
    // Increment refresh key to trigger reload
    setRefreshKey(prev => prev + 1);
  }, []));
  
  // Listen for storage sync events
  useCrossBrowserSync('storage-sync', React.useCallback((event) => {
    console.log('🔄 Storage sync event received in Admin Dashboard:', event);
    // Increment refresh key to trigger reload
    setRefreshKey(prev => prev + 1);
  }, []));
  
  // Listen for cross-tab sync events
  useEffect(() => {
    const unsubscribeAdded = crossTabSync.addListener('product-added', () => {
      console.log('🔄 Cross-tab product added event received');
      setRefreshKey(prev => prev + 1);
    });
    
    const unsubscribeUpdated = crossTabSync.addListener('product-updated', () => {
      console.log('🔄 Cross-tab product updated event received');
      setRefreshKey(prev => prev + 1);
    });
    
    const unsubscribeDeleted = crossTabSync.addListener('product-deleted', () => {
      console.log('🔄 Cross-tab product deleted event received');
      setRefreshKey(prev => prev + 1);
    });
    
    return () => {
      unsubscribeAdded();
      unsubscribeUpdated();
      unsubscribeDeleted();
    };
  }, []);

  // Close export modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (showExportModal && !target.closest('.export-modal')) {
        setShowExportModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showExportModal]);

  // Filter and search products
  const filteredProducts = createdProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesCreationType = selectedCreationType === 'all' || product.createdBy === selectedCreationType;
    return matchesSearch && matchesCategory && matchesCreationType;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'price':
        return parseFloat(a.price.replace('£', '')) - parseFloat(b.price.replace('£', ''));
      case 'category':
        return a.category.localeCompare(b.category);
      case 'date':
        return (b.id || '').localeCompare(a.id || '');
      default:
        return 0;
    }
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedCreationType, sortBy]);

  // Pagination functions
  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Delete product (handles both manual and AI products)
  const deleteProduct = async (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const productToDelete = createdProducts.find(p => p.id === productId);
      
      // Normalize route key for cross-source matching
      const routeKey = (() => {
        const r = productToDelete?.route || '';
        if (!r) return '';
        return r.startsWith('/') ? r.toLowerCase() : ('/' + r.toLowerCase());
      })();

      // Always remove from in-memory/local dynamic registry if AI
      if (productToDelete?.createdBy === 'ai') {
        deleteDynamicProduct(productId);
      }

      // Ensure local legacy storage also drops it (for manual or legacy formats)
      try {
        const manualProducts = (JSON.parse(localStorage.getItem('createdProducts') || '[]') || [])
          .filter((p: any) => {
            const pr = typeof p?.route === 'string' ? p.route.toLowerCase() : '';
            const prNorm = pr ? (pr.startsWith('/') ? pr : '/' + pr) : '';
            return p?.id !== productId && (!routeKey || prNorm !== routeKey);
          });
        localStorage.setItem('createdProducts', JSON.stringify(manualProducts));
      } catch {}

      // Delete from centralized backend so it disappears in all browsers (by id and by matching route duplicates)
      try {
        await unifiedStorage.deleteProduct(productId);
        if (routeKey) {
          const all = await unifiedStorage.getAllProducts();
          const toDelete = all.filter((p) => {
            const pr = (p.route || '').toLowerCase();
            const prNorm = pr ? (pr.startsWith('/') ? pr : '/' + pr) : '';
            return prNorm === routeKey && p.id !== productId;
          });
          for (const other of toDelete) {
            try { await unifiedStorage.deleteProduct(other.id); } catch {}
          }
        }
      } catch (e) {
        console.warn('Centralized delete failed (will still be removed locally):', e);
      }
      
      // Update local state
      const updatedProducts = createdProducts.filter(p => p.id !== productId);
      setCreatedProducts(updatedProducts);

      // Best-effort sync + notify other views to rehydrate
      try { await unifiedStorage.forceSync(); } catch {}
      try { window.dispatchEvent(new Event('unified-storage-hydrated')); } catch {}
    }
  };

  // Export/Import functionality
  const exportAllProducts = () => {
    try {
      const productsData = JSON.stringify(createdProducts, null, 2);
      const blob = new Blob([productsData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `amazon-products-all-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      alert(`All ${createdProducts.length} products exported successfully!`);
    } catch (error) {
      console.error('Error exporting products:', error);
      alert('Error exporting products. Please try again.');
    }
  };

  const exportSelectedProducts = () => {
    if (selectedProducts.size === 0) {
      alert('Please select at least one product to export.');
      return;
    }

    try {
      const selectedProductsData = createdProducts.filter(product => 
        product.id && selectedProducts.has(product.id)
      );
      const productsData = JSON.stringify(selectedProductsData, null, 2);
      const blob = new Blob([productsData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `amazon-products-selected-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      alert(`${selectedProductsData.length} selected products exported successfully!`);
      setSelectedProducts(new Set());
      setShowExportModal(false);
    } catch (error) {
      console.error('Error exporting products:', error);
      alert('Error exporting products. Please try again.');
    }
  };

  const toggleProductSelection = (productId: string) => {
    const newSelected = new Set(selectedProducts);
    if (newSelected.has(productId)) {
      newSelected.delete(productId);
    } else {
      newSelected.add(productId);
    }
    setSelectedProducts(newSelected);
  };

  const selectAllProducts = () => {
    const allIds = new Set(createdProducts.map(p => p.id).filter(Boolean));
    setSelectedProducts(allIds);
  };

  const clearSelection = () => {
    setSelectedProducts(new Set());
  };

  const importProducts = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedProducts = JSON.parse(e.target?.result as string);
        
        if (Array.isArray(importedProducts)) {
          // Merge with existing products, avoiding duplicates
          const existingIds = new Set(createdProducts.map(p => p.id));
          const newProducts = importedProducts.filter((p: ProductData) => !existingIds.has(p.id));
          
          if (newProducts.length === 0) {
            alert('No new products to import. All products already exist.');
            return;
          }

          const updatedProducts = [...createdProducts, ...newProducts];
          localStorage.setItem('createdProducts', JSON.stringify(updatedProducts));
          setCreatedProducts(updatedProducts);
          
          alert(`Successfully imported ${newProducts.length} products!`);
        } else {
          alert('Invalid file format. Please select a valid export file.');
        }
      } catch (error) {
        console.error('Error importing products:', error);
        alert('Error importing products. Please check the file format.');
      }
    };
    reader.readAsText(file);
    
    // Reset the input
    event.target.value = '';
  };

  // Dashboard tabs
  const tabs = [
    { id: 'products', label: 'Products', icon: Package, count: createdProducts.length },
    { id: 'link-rotator', label: 'Link Rotator', icon: Link, count: null },
    { id: 'facebook-ads', label: 'Facebook Ads', icon: BarChart3, count: null, navigate: true },
    { id: 'settings', label: 'Settings', icon: Settings, count: null },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, count: null },
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Settings className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
            <p className="text-white/70 text-lg">Secure access required</p>
          </div>
          
          <form onSubmit={handlePinSubmit} className="space-y-6">
            <div className="relative">
              <input
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="••••••"
                className="w-full px-6 py-4 bg-white/10 backdrop-blur border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center text-2xl tracking-[0.5em] text-white placeholder-white/50 transition-all duration-200"
                maxLength={6}
                autoFocus
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 hover:opacity-100 transition-opacity pointer-events-none"></div>
            </div>
            {pinError && (
              <div className="text-red-400 text-sm text-center bg-red-500/10 backdrop-blur border border-red-500/20 rounded-lg py-2 px-4">
                {pinError}
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Access Dashboard
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-white/50 text-xs">
              Authorized personnel only • All access logged
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      <Header />
      
      {/* Modern Dashboard Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 shadow-sm">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center space-x-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
                <p className="text-gray-600 mt-1">Manage products, analytics, and system settings</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* Status Indicators */}
              <div className="hidden lg:flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-200 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-700 text-sm font-medium">System Online</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg">
                  <Package className="w-4 h-4 text-blue-600" />
                  <span className="text-blue-700 text-sm font-medium">{createdProducts.length} Products</span>
                </div>
              </div>
              
              {createdProducts.length > 0 && (
                <div className="relative">
                  <button
                    onClick={() => setShowExportModal(!showExportModal)}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 flex items-center gap-2 text-sm font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <Download className="w-4 h-4" />
                    Export
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  
                  {showExportModal && (
                    <div className="absolute right-0 mt-3 w-64 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 z-50 export-modal overflow-hidden">
                      <div className="py-3">
                        <div className="px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200/50 bg-gradient-to-r from-gray-50 to-blue-50/30">
                          Export Options
                        </div>
                        <button
                          onClick={exportAllProducts}
                          className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 flex items-center gap-3 group"
                        >
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                            <Package className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-medium">Export All</div>
                            <div className="text-xs text-gray-500">{createdProducts.length} products</div>
                          </div>
                        </button>
                        <button
                          onClick={() => {
                            setShowExportModal(false);
                            // The selection will be handled in the products view
                          }}
                          className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-all duration-200 flex items-center gap-3 group"
                        >
                          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                            <Eye className="w-4 h-4 text-green-600" />
                          </div>
                          <div>
                            <div className="font-medium">Export Selected</div>
                            <div className="text-xs text-gray-500">{selectedProducts.size} selected</div>
                          </div>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
              <label className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 cursor-pointer flex items-center gap-2 text-sm font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                <Plus className="w-4 h-4" />
                Import
                <input
                  type="file"
                  accept=".json"
                  onChange={importProducts}
                  className="hidden"
                />
              </label>
              <button
                onClick={() => setShowCreationModal(true)}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 flex items-center gap-2 text-sm font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Plus className="w-4 h-4" />
                Create Product
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Modern Sidebar */}
          <div className="lg:w-72 flex-shrink-0">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Navigation</h2>
                <p className="text-sm text-gray-600">Manage your store efficiently</p>
              </div>
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        if (tab.navigate && tab.id === 'facebook-ads') {
                          navigate('/facebook-ads');
                        } else {
                          setActiveTab(tab.id);
                        }
                      }}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                          activeTab === tab.id
                            ? 'bg-white/20'
                            : 'bg-gray-100 group-hover:bg-gray-200'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        {tab.label}
                      </div>
                      {tab.count !== null && (
                        <span className={`px-2.5 py-1 text-xs rounded-lg font-semibold ${
                          activeTab === tab.id
                            ? 'bg-white/20 text-white'
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {tab.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Quick Stats */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                Quick Stats
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl border border-blue-100">
                  <span className="text-sm font-medium text-blue-700">Total Products</span>
                  <span className="font-bold text-blue-900 text-lg">{createdProducts.length}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-xl border border-purple-100">
                  <span className="text-sm font-medium text-purple-700">Categories</span>
                  <span className="font-bold text-purple-900 text-lg">{new Set(createdProducts.map(p => p.category)).size}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl border border-green-100">
                  <span className="text-sm font-medium text-green-700">Avg. Rating</span>
                  <span className="font-bold text-green-900 text-lg">
                    {createdProducts.length > 0 
                      ? (createdProducts.reduce((sum, p) => sum + p.rating, 0) / createdProducts.length).toFixed(1)
                      : '0.0'
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'products' && (
              <div className="space-y-6">
                {/* Search and Filters */}
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200"
                      />
                    </div>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category === 'all' ? 'All Categories' : category}
                        </option>
                      ))}
                    </select>
                    <select
                      value={selectedCreationType}
                      onChange={(e) => setSelectedCreationType(e.target.value)}
                      className="px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200"
                    >
                      <option value="all">All Products</option>
                      <option value="manual">Manually Created</option>
                      <option value="ai">Made with AI</option>
                    </select>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200"
                    >
                      <option value="name">Sort by Name</option>
                      <option value="price">Sort by Price</option>
                      <option value="category">Sort by Category</option>
                      <option value="date">Sort by Date</option>
                    </select>
                    <div className="flex border border-gray-200 rounded-xl overflow-hidden bg-gray-50/50">
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`px-4 py-3 text-sm font-medium transition-all duration-200 ${
                          viewMode === 'grid' 
                            ? 'bg-blue-600 text-white shadow-lg' 
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        Grid
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`px-4 py-3 text-sm font-medium transition-all duration-200 ${
                          viewMode === 'list' 
                            ? 'bg-blue-600 text-white shadow-lg' 
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        List
                      </button>
                    </div>
                  </div>
                  
                  {/* Selection Controls */}
                  {sortedProducts.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-gray-200/50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <label className="flex items-center gap-3 cursor-pointer group">
                            <input
                              type="checkbox"
                              checked={selectedProducts.size === sortedProducts.length && sortedProducts.length > 0}
                              onChange={() => {
                                if (selectedProducts.size === sortedProducts.length) {
                                  clearSelection();
                                } else {
                                  selectAllProducts();
                                }
                              }}
                              className="w-5 h-5 rounded-lg border-2 border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 transition-all duration-200"
                            />
                            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                              {selectedProducts.size === 0 
                                ? 'Select All' 
                                : `${selectedProducts.size} of ${currentProducts.length} selected (Page ${currentPage} of ${totalPages})`
                              }
                            </span>
                          </label>
                          {selectedProducts.size > 0 && (
                            <button
                              onClick={clearSelection}
                              className="text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 px-3 py-1 rounded-lg transition-all duration-200"
                            >
                              Clear Selection
                            </button>
                          )}
                        </div>
                        {selectedProducts.size > 0 && (
                          <button
                            onClick={exportSelectedProducts}
                            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 flex items-center gap-2 text-sm font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                          >
                            <Download className="w-4 h-4" />
                            Export Selected ({selectedProducts.size})
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Products Display */}
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50">
                  {sortedProducts.length === 0 ? (
                    <div className="text-center py-12">
                      <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {searchQuery || selectedCategory !== 'all' ? 'No products found' : 'No products created yet'}
                      </h3>
                      <p className="text-gray-500 mb-4">
                        {searchQuery || selectedCategory !== 'all' 
                          ? 'Try adjusting your search or filter criteria'
                          : 'Get started by creating your first product'
                        }
                      </p>
                      <button
                        onClick={() => navigate('/product-builder?create=true')}
                        className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                      >
                        Create Product
                      </button>
                    </div>
                  ) : viewMode === 'grid' ? (
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {currentProducts.map((product) => (
                        <div key={product.id} className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 overflow-hidden hover:shadow-xl transition-all duration-200 relative group">
                          {/* Selection Checkbox */}
                          <div className="absolute top-3 left-3 z-10">
                            <input
                              type="checkbox"
                              checked={product.id ? selectedProducts.has(product.id) : false}
                              onChange={() => product.id && toggleProductSelection(product.id)}
                              className="w-5 h-5 rounded-lg border-2 border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 transition-all duration-200"
                            />
                          </div>
                          {/* AI Tag */}
                          {product.createdBy === 'ai' && (
                            <div className="absolute top-3 right-3 z-10">
                              <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
                                AI
                              </span>
                            </div>
                          )}
                          <div className="aspect-square bg-gradient-to-br from-gray-50 to-blue-50/30 flex items-center justify-center p-4">
                            {product.images?.[0] ? (
                              <img src={product.images[0]} alt={product.name} className="max-w-full max-h-full object-contain rounded-xl" />
                            ) : (
                              <div className="w-16 h-16 bg-gradient-to-r from-gray-200 to-blue-200 rounded-2xl flex items-center justify-center">
                                <Package className="w-8 h-8 text-gray-400" />
                              </div>
                            )}
                          </div>
                          <div className="p-6">
                            <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2 text-sm leading-tight">{product.name}</h3>
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{product.price}</span>
                              <div className="flex items-center gap-1.5 text-yellow-500">
                                <Star className="w-4 h-4 fill-current" />
                                <span className="text-sm font-medium text-gray-700">{product.rating}</span>
                              </div>
                            </div>
                            <div className="text-sm text-gray-600 mb-4 font-medium">{product.category}</div>
                            {product.notes && (
                              <div className="mb-4 p-3 bg-gradient-to-r from-yellow-50 to-orange-50/50 border border-yellow-200/50 rounded-xl text-xs text-yellow-800">
                                <strong className="flex items-center gap-2">
                                  <span className="w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                                    <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                                  </span>
                                  Notes:
                                </strong> 
                                {product.notes.length > 100 ? `${product.notes.substring(0, 100)}...` : product.notes}
                              </div>
                            )}
                            <div className="flex gap-2">
                              <button
                                onClick={() => window.open(product.route || '', '_blank')}
                                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:from-blue-700 hover:to-indigo-700 flex items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                              >
                                <Eye className="w-4 h-4" /> View
                              </button>
                              <button
                                onClick={() => {
                                  navigate(`/product-builder?edit=${product.id}`);
                                }}
                                className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:from-green-700 hover:to-emerald-700 flex items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                              >
                                <Edit className="w-4 h-4" /> Edit
                              </button>
                              <button
                                onClick={() => deleteProduct(product.id!)}
                                className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:from-red-700 hover:to-pink-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4 px-2">
                      {currentProducts.map((product) => (
                        <div key={product.id} className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-4 lg:p-6 hover:shadow-xl transition-all duration-200 group max-w-full overflow-hidden">
                          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6">
                          {/* Selection Checkbox */}
                            <div className="flex items-center gap-3 lg:gap-4">
                          <input
                            type="checkbox"
                            checked={product.id ? selectedProducts.has(product.id) : false}
                            onChange={() => product.id && toggleProductSelection(product.id)}
                                className="w-5 h-5 rounded-lg border-2 border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 transition-all duration-200 flex-shrink-0"
                          />
                              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-2xl flex items-center justify-center flex-shrink-0 border border-gray-200/50">
                            {product.images?.[0] ? (
                                  <img src={product.images[0]} alt={product.name} className="max-w-full max-h-full object-contain rounded-xl" />
                            ) : (
                                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-gray-200 to-blue-200 rounded-xl flex items-center justify-center">
                                    <Package className="w-5 h-5 lg:w-6 lg:h-6 text-gray-400" />
                                  </div>
                            )}
                          </div>
                            </div>
                            
                            <div className="flex-1 min-w-0 w-full">
                              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3">
                                <h3 className="font-semibold text-gray-900 text-base lg:text-lg leading-tight line-clamp-2">{product.name}</h3>
                              {product.createdBy === 'ai' && (
                                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-semibold px-2 py-1 lg:px-3 lg:py-1.5 rounded-full shadow-md flex-shrink-0">
                                  AI
                                </span>
                              )}
                            </div>
                              
                              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 lg:gap-6 mb-3">
                                <span className="text-sm text-gray-600 font-medium">{product.category}</span>
                                <span className="font-bold text-lg lg:text-xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{product.price}</span>
                                <div className="flex items-center gap-1.5 text-yellow-500">
                                  <Star className="w-4 h-4 fill-current" />
                                  <span className="text-sm font-medium text-gray-700">{product.rating}</span>
                              </div>
                            </div>
                              
                            {product.notes && (
                                <div className="text-xs text-yellow-700 bg-gradient-to-r from-yellow-50 to-orange-50/50 px-3 py-2 rounded-xl border border-yellow-200/50 mb-3">
                                  <strong className="flex items-center gap-2">
                                    <span className="w-3 h-3 bg-yellow-500 rounded-full flex items-center justify-center">
                                      <span className="w-1 h-1 bg-white rounded-full"></span>
                                    </span>
                                    Notes:
                                  </strong> 
                                  <span className="line-clamp-2">{product.notes.length > 80 ? `${product.notes.substring(0, 80)}...` : product.notes}</span>
                              </div>
                            )}
                          </div>
                            
                            <div className="flex flex-col sm:flex-row gap-2 lg:gap-3 w-full sm:w-auto">
                            <button
                              onClick={() => window.open(product.route || '', '_blank')}
                                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-2 lg:px-4 lg:py-2.5 rounded-xl text-sm font-medium hover:from-blue-700 hover:to-indigo-700 flex items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex-1 sm:flex-none"
                            >
                                <Eye className="w-4 h-4" /> View
                            </button>
                            <button
                              onClick={() => {
                                navigate(`/product-builder?edit=${product.id}`);
                              }}
                                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-3 py-2 lg:px-4 lg:py-2.5 rounded-xl text-sm font-medium hover:from-green-700 hover:to-emerald-700 flex items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex-1 sm:flex-none"
                            >
                                <Edit className="w-4 h-4" /> Edit
                            </button>
                            <button
                              onClick={() => deleteProduct(product.id!)}
                                className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-3 py-2 lg:px-4 lg:py-2.5 rounded-xl text-sm font-medium hover:from-red-700 hover:to-pink-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex-1 sm:flex-none"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                            </div>
                          </div>
                        </div>
                      ))}
              </div>
            )}

                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="mt-8 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6">
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-sm text-gray-600">
                          Showing {startIndex + 1} to {Math.min(endIndex, sortedProducts.length)} of {sortedProducts.length} products
                  </div>
                  
                        <div className="flex items-center gap-2">
                          {/* Previous Page Button */}
                          <button
                            onClick={goToPreviousPage}
                            disabled={currentPage === 1}
                            className="px-3 py-2 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-lg hover:from-gray-200 hover:to-gray-300 disabled:from-gray-50 disabled:to-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
                          >
                            <ChevronLeft className="w-4 h-4" />
                            Previous
                          </button>
                          
                          {/* Page Numbers */}
                          <div className="flex items-center gap-1">
                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                              let pageNum;
                              if (totalPages <= 5) {
                                pageNum = i + 1;
                              } else if (currentPage <= 3) {
                                pageNum = i + 1;
                              } else if (currentPage >= totalPages - 2) {
                                pageNum = totalPages - 4 + i;
                              } else {
                                pageNum = currentPage - 2 + i;
                              }
                              
                              return (
                                <button
                                  key={pageNum}
                                  onClick={() => goToPage(pageNum)}
                                  className={`w-10 h-10 rounded-lg transition-all duration-200 flex items-center justify-center text-sm font-medium ${
                                    currentPage === pageNum
                                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                  }`}
                                >
                                  {pageNum}
                                </button>
                              );
                            })}
                    </div>

                          {/* Next Page Button */}
                          <button
                            onClick={goToNextPage}
                            disabled={currentPage === totalPages}
                            className="px-3 py-2 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-lg hover:from-gray-200 hover:to-gray-300 disabled:from-gray-50 disabled:to-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
                          >
                            Next
                            <ChevronRight className="w-4 h-4" />
                          </button>
                      </div>
                      </div>
                    </div>
                  )}
                  </div>
                </div>
            )}

            {activeTab === 'facebook-ads' && (
              <div className="space-y-6">
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-8">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">Facebook Ads</h2>
                      <p className="text-gray-600">Manage generated ad copies and headlines for your products</p>
                    </div>
                    <button
                      onClick={() => navigate('/facebook-ads')}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      <BarChart3 className="w-5 h-5" />
                      Open Facebook Ads Studio
                    </button>
                              </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                          <BarChart3 className="w-5 h-5 text-white" />
                                    </div>
                        <h3 className="font-semibold text-blue-900">Ad Copies Generated</h3>
                                    </div>
                      <div className="text-3xl font-bold text-blue-700 mb-1">
                        {(() => {
                          const savedAdCopies = localStorage.getItem('facebookAdCopies');
                          return savedAdCopies ? JSON.parse(savedAdCopies).length : 0;
                        })()}
                                  </div>
                      <div className="text-sm text-blue-600">ready for Facebook ads</div>
                    </div>
                    
                    <div className="p-6 bg-green-50 rounded-2xl border border-green-100">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
                          <Globe className="w-5 h-5 text-white" />
                                    </div>
                        <h3 className="font-semibold text-green-900">Languages Supported</h3>
                                    </div>
                      <div className="text-3xl font-bold text-green-700 mb-1">5</div>
                      <div className="text-sm text-green-600">with currency conversion</div>
                                  </div>

                    <div className="p-6 bg-purple-50 rounded-2xl border border-purple-100">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center">
                          <Sparkles className="w-5 h-5 text-white" />
                                    </div>
                        <h3 className="font-semibold text-purple-900">AI Generated</h3>
                                        </div>
                      <div className="text-3xl font-bold text-purple-700 mb-1">
                        {createdProducts.filter(p => p.createdBy === 'ai').length}
                                        </div>
                      <div className="text-sm text-purple-600">products with auto-ads</div>
                                    </div>
                              </div>

                  <div className="p-6 bg-gradient-to-r from-gray-50 to-blue-50/50 rounded-2xl border border-gray-200/50">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-yellow-500" />
                      How it works:
                    </h4>
                    <ul className="text-sm text-gray-700 space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-blue-600">1</span>
                              </div>
                        <div><strong>Auto-Generation:</strong> Ad copies are automatically created when using AI Product Builder</div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-green-600">2</span>
                            </div>
                        <div><strong>Multi-Language:</strong> Supports English, Danish, Norwegian, Spanish, and Swiss German</div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-purple-600">3</span>
                          </div>
                        <div><strong>Currency Conversion:</strong> Prices automatically convert based on selected country</div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-orange-600">4</span>
                        </div>
                        <div><strong>Copy & Use:</strong> One-click copying for easy use in Facebook Ads Manager</div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'link-rotator' && (
              <div className="space-y-6">
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-8">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-3">Link Rotator</h2>
                      <p className="text-gray-600">Configure country-specific redirect URLs for Buy Now and Add to Basket buttons</p>
                    </div>
                    <button
                      onClick={() => navigate('/link-rotator')}
                      className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-green-700 hover:to-blue-700 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      <Link className="w-5 h-5" />
                      Open Link Rotator
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                          <Globe className="w-5 h-5 text-white" />
                      </div>
                        <h3 className="font-semibold text-blue-900">Global Redirect</h3>
                      </div>
                      <div className="text-sm text-blue-600 mb-3">Default fallback URL for all countries</div>
                      <div className="text-xs text-blue-800 bg-blue-100 p-3 rounded-xl font-mono">
                        https://linkly.link/2D5Sx
                      </div>
                    </div>
                    
                    <div className="p-6 bg-green-50 rounded-2xl border border-green-100">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-white" />
                      </div>
                        <h3 className="font-semibold text-green-900">Country-Specific URLs</h3>
                      </div>
                      <div className="text-sm text-green-600 mb-3">Custom redirects for specific countries</div>
                      <div className="text-xs text-green-800 bg-green-100 p-3 rounded-xl">
                        Configure in Link Rotator
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-gradient-to-r from-gray-50 to-green-50/50 rounded-2xl border border-gray-200/50">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Settings className="w-5 h-5 text-green-500" />
                      How it works:
                    </h4>
                    <ul className="text-sm text-gray-700 space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-blue-600">1</span>
                        </div>
                        <div><strong>Global Default:</strong> Used when no country-specific URL is set</div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-green-600">2</span>
                        </div>
                        <div><strong>Country Override:</strong> Takes priority over global settings</div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-purple-600">3</span>
                        </div>
                        <div><strong>Product Override:</strong> Individual products can have their own redirects</div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-orange-600">4</span>
                        </div>
                        <div><strong>Automatic Detection:</strong> Based on user's selected country</div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-8">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-8 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                      <Settings className="w-4 h-4 text-white" />
                    </div>
                    System Settings
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <button
                      onClick={() => navigate('/link-rotator')}
                      className="group p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl hover:border-blue-300 hover:shadow-lg transition-all duration-200 text-left transform hover:-translate-y-1"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                          <Link className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="font-semibold text-gray-900">Link Rotator</h3>
                      </div>
                      <p className="text-sm text-gray-600">Configure country-specific redirect URLs for Buy Now and Add to Basket buttons</p>
                    </button>
                    
                    <button
                      onClick={() => navigate('/product-builder?create=true')}
                      className="group p-6 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl hover:border-green-300 hover:shadow-lg transition-all duration-200 text-left transform hover:-translate-y-1"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                          <Plus className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="font-semibold text-gray-900">Product Builder</h3>
                      </div>
                      <p className="text-sm text-gray-600">Create new products with variants, images, and custom settings</p>
                    </button>

                    <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-2xl">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                          <Globe className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="font-semibold text-gray-900">Country Settings</h3>
                      </div>
                      <p className="text-sm text-gray-600">Manage supported countries, currencies, and localization</p>
                    </div>

                    <div className="p-6 bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 rounded-2xl">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl flex items-center justify-center">
                          <Users className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="font-semibold text-gray-900">Access Control</h3>
                      </div>
                      <p className="text-sm text-gray-600">Manage admin access and security settings</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                {/* Enhanced Analytics Overview */}
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-8">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-8 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-xl flex items-center justify-center">
                      <BarChart3 className="w-4 h-4 text-white" />
                    </div>
                    Analytics Overview
                  </h2>
                  
                  {/* Key Metrics Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                          <Package className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="text-3xl font-bold text-indigo-700">{createdProducts.length}</div>
                          <div className="text-sm text-indigo-600 font-medium">Total Products</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6 bg-green-50 rounded-2xl border border-green-100">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center">
                          <BarChart3 className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="text-3xl font-bold text-green-700">{new Set(createdProducts.map(p => p.category)).size}</div>
                          <div className="text-sm text-green-600 font-medium">Categories</div>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 bg-yellow-50 rounded-2xl border border-yellow-100">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-xl flex items-center justify-center">
                          <Star className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="text-3xl font-bold text-yellow-700">
                            {createdProducts.length > 0 
                              ? (createdProducts.reduce((sum, p) => sum + p.rating, 0) / createdProducts.length).toFixed(1)
                              : '0.0'
                            }
                          </div>
                          <div className="text-sm text-yellow-600 font-medium">Avg. Rating</div>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center">
                          <Eye className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="text-3xl font-bold text-blue-700">
                            {createdProducts.reduce((sum, p) => sum + (p.pageViews || 0), 0).toLocaleString()}
                          </div>
                          <div className="text-sm text-blue-600 font-medium">Total Page Views</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
                      <h3 className="text-lg font-semibold text-purple-800 mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5" />
                        Top Performing Products
                      </h3>
                      <div className="space-y-3">
                        {createdProducts
                          .sort((a, b) => (b.pageViews || 0) - (a.pageViews || 0))
                          .slice(0, 5)
                          .map((product, index) => (
                            <div key={product.id} className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                                  {index + 1}
                                </div>
                                <div>
                                  <div className="font-medium text-purple-800">{product.name}</div>
                                  <div className="text-xs text-purple-600">{product.category}</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-bold text-purple-800">{product.pageViews || 0}</div>
                                <div className="text-xs text-purple-600">views</div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>

                    <div className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100">
                      <h3 className="text-lg font-semibold text-emerald-800 mb-4 flex items-center gap-2">
                        <Star className="w-5 h-5" />
                        Highest Rated Products
                      </h3>
                      <div className="space-y-3">
                        {createdProducts
                          .sort((a, b) => b.rating - a.rating)
                          .slice(0, 5)
                          .map((product, index) => (
                            <div key={product.id} className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                                  {index + 1}
                                </div>
                                <div>
                                  <div className="font-medium text-emerald-800">{product.name}</div>
                                  <div className="text-xs text-emerald-600">{product.category}</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-bold text-emerald-800">{product.rating}</div>
                                <div className="text-xs text-emerald-600">rating</div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>

                  {/* Category Performance */}
                  <div className="p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl border border-orange-100">
                    <h3 className="text-lg font-semibold text-orange-800 mb-4 flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Category Performance Analysis
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {Object.entries(
                        createdProducts.reduce((acc, product) => {
                          if (!acc[product.category]) {
                            acc[product.category] = {
                              count: 0,
                              totalViews: 0,
                              avgRating: 0,
                              totalRating: 0
                            };
                          }
                          acc[product.category].count++;
                          acc[product.category].totalViews += (product.pageViews || 0);
                          acc[product.category].totalRating += product.rating;
                          return acc;
                        }, {} as Record<string, { count: number; totalViews: number; avgRating: number; totalRating: number }>)
                      ).map(([category, stats]) => (
                        <div key={category} className="p-4 bg-white/50 rounded-lg">
                          <div className="font-semibold text-orange-800 mb-2">{category}</div>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-orange-600">Products:</span>
                              <span className="font-medium">{stats.count}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-orange-600">Total Views:</span>
                              <span className="font-medium">{stats.totalViews.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-orange-600">Avg Rating:</span>
                              <span className="font-medium">{(stats.totalRating / stats.count).toFixed(1)}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Enhanced Category Distribution */}
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-8">
                  <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-blue-600" />
                    Category Distribution & Trends
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      {Object.entries(
                        createdProducts.reduce((acc, product) => {
                          acc[product.category] = (acc[product.category] || 0) + 1;
                          return acc;
                        }, {} as Record<string, number>)
                      ).map(([category, count]) => (
                        <div key={category} className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">{category}</span>
                          <div className="flex items-center gap-3">
                            <div className="w-32 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300" 
                                style={{ width: `${(count / createdProducts.length) * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-800 min-w-[2rem] text-right">{count}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-700 mb-3">Recent Activity</h4>
                      {createdProducts
                        .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
                        .slice(0, 5)
                        .map((product) => (
                          <div key={product.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                              <Package className="w-4 h-4 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-gray-800">{product.name}</div>
                              <div className="text-xs text-gray-500">
                                {new Date(product.createdAt || Date.now()).toLocaleDateString()}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium text-gray-800">{product.category}</div>
                              <div className="text-xs text-gray-500">{product.pageViews || 0} views</div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Creation Method Modal */}
      {showCreationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Creation Method</h3>
            <p className="text-gray-600 mb-6">How would you like to create your product?</p>
            
            <div className="space-y-3">
              <button
                onClick={() => {
                  setShowCreationModal(false);
                  navigate('/ai-product-builder');
                }}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-4 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-colors flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Create with AI
              </button>
              
              <button
                onClick={() => {
                  setShowCreationModal(false);
                  navigate('/product-builder?create=true');
                }}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Create Manually
              </button>
              
            </div>
            
            <button
              onClick={() => setShowCreationModal(false)}
              className="w-full mt-4 text-gray-500 hover:text-gray-700 py-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;