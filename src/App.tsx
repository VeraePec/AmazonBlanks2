
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from './components/ui/tooltip';
import { useCountrySelector } from './hooks/useCountrySelector';
import { AdminAuthProvider } from './contexts/AdminAuthContext';
import { initializeDynamicRegistry } from './utils/dynamicProductRegistry';

// Pages
import Index from './pages/Index';
import Header from './components/Header';
import Footer from './components/Footer';
import BedsideCabinetPage from './pages/BedsideCabinetPage';
import AmazonsChoicePage from './pages/AmazonsChoicePage';
import StorageOrganizerPage from './pages/StorageOrganizerPage';
import NicehillDresserPage from './pages/NicehillDresserPage';
import VacuumCleanerPage from './pages/VacuumCleanerPage';
import StorageShelfPage from './pages/StorageShelfPage';
import SecuritySafePage from './pages/SecuritySafePage';
import StickVacuumPage from './pages/StickVacuumPage';
import GamingDeskPage from './pages/GamingDeskPage';
import GardenChairPage from './pages/GardenChairPage';
import BabyCotPage from './pages/BabyCotPage';
import StorageChestPage from './pages/StorageChestPage';
import CollectionPage from './pages/CollectionPage';
import SearchResults from './pages/SearchResults';
import ProductBuilderSimple from './pages/ProductBuilderSimple';
import AdminDashboard from './pages/AdminDashboard';
import LinkRotator from './pages/LinkRotator';
import AiProductBuilder from './pages/AiProductBuilder';
import FacebookAdAssets from './pages/FacebookAdAssets';
import FacebookAdsPage from './pages/FacebookAdsPage';
import SyncTestPage from './pages/SyncTestPage';
import KeterStorageShedPage from './pages/KeterStorageShedPage';
import KeterEdenBenchPage from './pages/KeterEdenBenchPage';
import KeterCityStorageBoxPage from './pages/KeterCityStorageBoxPage';
import KeterBevyBarPage from './pages/KeterBevyBarPage';
import KeterMarvelStorageBoxPage from './pages/KeterMarvelStorageBoxPage';
import PawzRoadCatTreePage from './pages/PawzRoadCatTreePage';
import FeandreaCatTreePage from './pages/FeandreaCatTreePage';
import VasagleTvUnitPage from './pages/VasagleTvUnitPage';
import NinjaFoodiAirFryerPage from './pages/NinjaFoodiAirFryerPage';
import ProductRedirectHandler from './pages/ProductRedirectHandler';
// Removed AiProductCreator page per request
import DynamicProductPageV2 from './components/DynamicProductPageV2';
import NotFound from './pages/NotFound';
import CountryDetectionNotification from './components/CountryDetectionNotification';
import { Toaster } from './components/ui/toaster';

// Dynamic registry is initialized in main.tsx

// DEBUG: Add test functions to window for debugging
(window as any).debugStorage = () => {
  console.log('=== DEBUGGING LOCALSTORAGE ===');
  
  // Check dynamic products
  const dynamicProducts = localStorage.getItem('dynamicProducts');
  if (dynamicProducts) {
    const parsed = JSON.parse(dynamicProducts);
    console.log('Dynamic Products in localStorage:', parsed.length);
    parsed.forEach((p: any, i: number) => {
      console.log(`Product ${i + 1}:`, {
        id: p.id,
        name: p.name?.substring(0, 30) + '...',
        route: p.route,
        slug: p.slug
      });
    });
  } else {
    console.log('No dynamic products in localStorage');
  }
  
  // Check created products (old format)
  const createdProducts = localStorage.getItem('createdProducts');
  if (createdProducts) {
    const parsed = JSON.parse(createdProducts);
    console.log('Created Products in localStorage:', parsed.length);
  } else {
    console.log('No created products in localStorage');
  }
  
  // Check individual product data
  const keys = Object.keys(localStorage).filter(key => key.startsWith('product_'));
  console.log('Individual product data entries:', keys.length);
  
  console.log('=== END DEBUG ===');
};

(window as any).createTestProduct = async () => {
  try {
    const { registerDynamicProduct } = await import('./utils/dynamicProductRegistry');
    
    const timestamp = Date.now();
    const testProduct = {
      id: `test-${timestamp}`,
      name: 'TEST Storage Box for Debugging',
      slug: `test-storage-box-${timestamp}`,
      route: `/test-storage-box-${timestamp}`,
      price: '£9.99',
      originalPrice: '£19.99',
      images: ['/placeholder.svg'],
      store: 'Test Store',
      category: 'Home & Kitchen',
      rating: 4.5,
      reviewCount: 100,
      aboutThisItem: ['Test feature 1', 'Test feature 2'],
      features: ['Test feature'],
      productDetails: {},
      technicalDetails: {},
      productInfo: {},
      reviews: [],
      variants: [],
      colors: [],
      amazonChoice: false,
      prime: true,
      countryRedirects: [],
      createdAt: timestamp
    };
    
    console.log('🔍 Creating test product with route:', testProduct.route);
    const registered = registerDynamicProduct(testProduct);
    console.log('✅ Test product created:', registered);
    
    // Reload page to see it appear
    setTimeout(() => {
      console.log('🔄 Reloading page to show test product...');
      window.location.reload();
    }, 1000);
    
    return registered;
  } catch (error) {
    console.error('❌ Error creating test product:', error);
    return null;
  }
};

(window as any).testDirectNavigation = (route = '/test-storage-box-123') => {
  console.log('🔍 Testing direct navigation to:', route);
  try {
    window.location.href = route;
  } catch (error) {
    console.error('❌ Navigation failed:', error);
  }
};

// Add global debug functions
(window as any).debugApp = async () => {
  console.log('🔍 === APP DEBUG INFO ===');
  
  // Check dynamic registry
  try {
    const { debugDynamicRegistry, getAllDynamicProducts } = await import('./utils/dynamicProductRegistry');
    const registryDebug = debugDynamicRegistry();
    console.log('🔍 Dynamic Registry:', registryDebug);
    
    const allProducts = getAllDynamicProducts();
    console.log('🔍 All Dynamic Products:', allProducts);
  } catch (error) {
    console.error('❌ Error accessing dynamic registry:', error);
  }
  
  // Check localStorage
  try {
    const createdProducts = JSON.parse(localStorage.getItem('createdProducts') || '[]');
    const dynamicProducts = JSON.parse(localStorage.getItem('dynamicProducts') || '[]');
    console.log('🔍 localStorage createdProducts:', createdProducts);
    console.log('🔍 localStorage dynamicProducts:', dynamicProducts);
  } catch (error) {
    console.error('❌ Error reading localStorage:', error);
  }
  
  // Check product registry
  try {
    const { getAllProductsWithCreated, getAllCollectionsWithCreated } = await import('./data/productRegistry');
    const allProducts = getAllProductsWithCreated();
    const allCollections = getAllCollectionsWithCreated();
    console.log('🔍 All Products with Created:', allProducts);
    console.log('🔍 All Collections with Created:', allCollections);
  } catch (error) {
    console.error('❌ Error accessing product registry:', error);
  }
};

(window as any).reinitializeRegistry = async () => {
  try {
    const { forceReinitializeRegistry } = await import('./utils/dynamicProductRegistry');
    const result = forceReinitializeRegistry();
    console.log('🔄 Registry reinitialized:', result);
    alert(`Registry reinitialized!\nIn Memory: ${result.inMemoryCount}\nProducts: ${result.registryProducts.map(p => p.name).join(', ')}`);
    return result;
  } catch (error) {
    console.error('❌ Error reinitializing registry:', error);
    alert(`Error reinitializing registry: ${error.message}`);
  }
};



const queryClient = new QueryClient();

// Simple error boundary component
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; error: Error | null }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-white flex flex-col">
          <Header />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
              <p className="text-gray-600 mb-4">The application encountered an unexpected error.</p>
              <button 
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-[#007185] text-white rounded hover:bg-[#005a6b] mr-2"
              >
                Reload Page
              </button>
              <button 
                onClick={() => window.location.href = '/'}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Go to Homepage
              </button>
            </div>
          </div>
          <Footer />
        </div>
      );
    }

    return this.props.children;
  }
}

// Dynamic title component
function DynamicTitle() {
  const { selectedCountry } = useCountrySelector();
  
  useEffect(() => {
    const countryCode = selectedCountry.code.toUpperCase();
    const title = `Amazon ${countryCode}`;
    document.title = title;
    
    // Update meta tags
    const metaTitle = document.querySelector('meta[property="og:title"]');
    if (metaTitle) {
      metaTitle.setAttribute('content', title);
    }
  }, [selectedCountry.code]);
  
  return null;
}

function App() {
  const [showCountryNotification, setShowCountryNotification] = React.useState(true);
  const { selectedCountry, isDetecting } = useCountrySelector();

  // Debug logging for country detection
  React.useEffect(() => {
    console.log('🌍 App component - Current country:', selectedCountry.name, 'Detecting:', isDetecting);
  }, [selectedCountry, isDetecting]);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AdminAuthProvider>
            <Router>
              <DynamicTitle />
              <div className="App">
                <Routes>
                  <Route path="/" element={<Index />} />

                  <Route path="/bedside-cabinet" element={<BedsideCabinetPage />} />
                  <Route path="/amazons-choice" element={<AmazonsChoicePage />} />
                  <Route path="/storage-organizer" element={<StorageOrganizerPage />} />
                  <Route path="/nicehill-dresser" element={<NicehillDresserPage />} />
                  <Route path="/vacuum-cleaner" element={<VacuumCleanerPage />} />
                  <Route path="/storage-shelf" element={<StorageShelfPage />} />
                  <Route path="/security-safe" element={<SecuritySafePage />} />
                  <Route path="/stick-vacuum" element={<StickVacuumPage />} />
                  <Route path="/gaming-desk" element={<GamingDeskPage />} />
                  <Route path="/garden-chair" element={<GardenChairPage />} />
                  <Route path="/baby-cot" element={<BabyCotPage />} />
                  <Route path="/storage-chest" element={<StorageChestPage />} />
                  <Route path="/collection/:collectionId" element={<CollectionPage />} />
                  <Route path="/search" element={<SearchResults />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/product-builder" element={<ProductBuilderSimple />} />
                  <Route path="/link-rotator" element={<LinkRotator />} />
                  <Route path="/facebook-ad-assets" element={<FacebookAdAssets />} />
                  <Route path="/facebook-ads" element={<FacebookAdsPage />} />
                  <Route path="/ai-product-builder" element={<AiProductBuilder />} />
                  <Route path="/sync-test" element={<SyncTestPage />} />
                  <Route path="/keter-storage-shed" element={<KeterStorageShedPage />} />
        <Route path="/keter-eden-bench" element={<KeterEdenBenchPage />} />
        <Route path="/keter-city-storage-box" element={<KeterCityStorageBoxPage />} />
        <Route path="/keter-bevy-bar" element={<KeterBevyBarPage />} />
        <Route path="/keter-marvel-storage-box" element={<KeterMarvelStorageBoxPage />} />
        <Route path="/pawz-road-cat-tree" element={<PawzRoadCatTreePage />} />
        <Route path="/feandrea-cat-tree" element={<FeandreaCatTreePage />} />
        <Route path="/vasagle-tv-unit" element={<VasagleTvUnitPage />} />
        <Route path="/ninja-foodi-air-fryer" element={<NinjaFoodiAirFryerPage />} />
        <Route path="/product-redirect" element={<ProductRedirectHandler />} />
                  
                  {/* Catch-all route for dynamic products - should be last */}
                  <Route path="*" element={<DynamicProductPageV2 />} />
                </Routes>
              </div>
              
              {/* Country Detection Notification */}
              {showCountryNotification && (
                <CountryDetectionNotification onClose={() => setShowCountryNotification(false)} />
              )}
              
              {/* Toast Notifications */}
              <Toaster />
              
              {/* Debug info for development */}
              {process.env.NODE_ENV === 'development' && (
                <div className="fixed bottom-4 left-4 z-40 bg-black bg-opacity-75 text-white text-xs p-2 rounded">
                  <div>Country: {selectedCountry.flag} {selectedCountry.name}</div>
                  <div>Detecting: {isDetecting ? 'Yes' : 'No'}</div>
                </div>
              )}
            </Router>
          </AdminAuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
