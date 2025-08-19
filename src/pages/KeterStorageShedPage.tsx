import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductPageTemplate from '../components/ProductPageTemplate';
import { useCountrySelector } from '../hooks/useCountrySelector';
import { getTranslation, getCountryConfig, formatPrice } from '../utils/translations';
import { getDeliveryInfo } from '../utils/deliveryDate';

// Simple Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; onError: () => void },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; onError: () => void }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.props.onError();
  }

  render() {
    if (this.state.hasError) {
      return null; // Let parent handle the error
    }
    return this.props.children;
  }
}

const KeterStorageShedPage: React.FC = () => {
  const navigate = useNavigate();
  const { selectedCountry } = useCountrySelector();
  
  // Add error boundary state
  const [hasError, setHasError] = React.useState(false);
  
  // Handle country changes and update product data
  React.useEffect(() => {
    // Reset error state when country changes
    setHasError(false);
  }, [selectedCountry.code]);
  
  // Error boundary
  if (hasError) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
            <p className="text-gray-600 mb-4">The product page encountered an error.</p>
            <button 
              onClick={() => setHasError(false)}
              className="px-4 py-2 bg-[#007185] text-white rounded hover:bg-[#005a6b] mr-2"
            >
              Try Again
            </button>
            <button 
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Go to Homepage
            </button>
          </div>
        </div>
      </div>
    );
  }

  const productData = React.useMemo(() => ({
    name: getTranslation('product.name.keter.storage.shed', getCountryConfig(selectedCountry.code).language),
    brand: 'Keter',
    store: 'Keter',
    rating: 4.4,
    ratingsCount: 7246,
    boughtInMonth: '1K+',
    amazonChoice: true,
    price: formatPrice('£9.99', selectedCountry.code),
    originalPrice: formatPrice('£14.99', selectedCountry.code),
    discount: '33%',
    images: [
      'https://m.media-amazon.com/images/I/81nkADjDAbL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/910TF1aqBKL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/91L1fuj4+hL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/81ByjoSNTZL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/911s9OrxX-L._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/611Ypdn2IlL._AC_SL1500_.jpg'
    ],
    breadcrumb: [
      getTranslation('nav.home', getCountryConfig(selectedCountry.code).language),
      getTranslation('nav.garden', getCountryConfig(selectedCountry.code).language),
      getTranslation('nav.storage', getCountryConfig(selectedCountry.code).language),
      getTranslation('product.name.keter.storage.shed', getCountryConfig(selectedCountry.code).language)
    ],
    stockCount: 15,
    aboutThisItem: [
      getTranslation('product.about.keter.storage.shed.1', getCountryConfig(selectedCountry.code).language),
      getTranslation('product.about.keter.storage.shed.2', getCountryConfig(selectedCountry.code).language),
      getTranslation('product.about.keter.storage.shed.3', getCountryConfig(selectedCountry.code).language),
      getTranslation('product.about.keter.storage.shed.4', getCountryConfig(selectedCountry.code).language),
      getTranslation('product.about.keter.storage.shed.5', getCountryConfig(selectedCountry.code).language),
      getTranslation('product.about.keter.storage.shed.6', getCountryConfig(selectedCountry.code).language),
      getTranslation('product.about.keter.storage.shed.7', getCountryConfig(selectedCountry.code).language),
      getTranslation('product.about.keter.storage.shed.8', getCountryConfig(selectedCountry.code).language),
      getTranslation('product.about.keter.storage.shed.9', getCountryConfig(selectedCountry.code).language)
    ],
    features: [
      getTranslation('product.features.keter.storage.shed.1', getCountryConfig(selectedCountry.code).language),
      getTranslation('product.features.keter.storage.shed.2', getCountryConfig(selectedCountry.code).language),
      getTranslation('product.features.keter.storage.shed.3', getCountryConfig(selectedCountry.code).language),
      getTranslation('product.features.keter.storage.shed.4', getCountryConfig(selectedCountry.code).language),
      getTranslation('product.features.keter.storage.shed.5', getCountryConfig(selectedCountry.code).language),
      getTranslation('product.features.keter.storage.shed.6', getCountryConfig(selectedCountry.code).language),
      getTranslation('product.features.keter.storage.shed.7', getCountryConfig(selectedCountry.code).language),
      getTranslation('product.features.keter.storage.shed.8', getCountryConfig(selectedCountry.code).language),
      getTranslation('product.features.keter.storage.shed.9', getCountryConfig(selectedCountry.code).language),
      getTranslation('product.features.keter.storage.shed.10', getCountryConfig(selectedCountry.code).language)
    ],
    productDetails: {
      [getTranslation('product.detail.brand', getCountryConfig(selectedCountry.code).language)]: 'Keter',
      [getTranslation('product.detail.colour', getCountryConfig(selectedCountry.code).language)]: getTranslation('product.color.light.grey.dark.cover', getCountryConfig(selectedCountry.code).language),
      [getTranslation('product.detail.material', getCountryConfig(selectedCountry.code).language)]: getTranslation('product.material.resin', getCountryConfig(selectedCountry.code).language),
      [getTranslation('product.detail.product.dimensions', getCountryConfig(selectedCountry.code).language)]: getTranslation('product.dimensions.71.5x132x113.5', getCountryConfig(selectedCountry.code).language),
      [getTranslation('product.detail.item.weight', getCountryConfig(selectedCountry.code).language)]: getTranslation('product.weight.21.5kg', getCountryConfig(selectedCountry.code).language),
      [getTranslation('product.detail.volume', getCountryConfig(selectedCountry.code).language)]: getTranslation('product.volume.880l', getCountryConfig(selectedCountry.code).language),
      [getTranslation('product.detail.uv.protection', getCountryConfig(selectedCountry.code).language)]: getTranslation('product.uv.resistant', getCountryConfig(selectedCountry.code).language),
      [getTranslation('product.detail.special.features', getCountryConfig(selectedCountry.code).language)]: getTranslation('product.special.features.heavy.duty', getCountryConfig(selectedCountry.code).language),
      [getTranslation('product.detail.usage', getCountryConfig(selectedCountry.code).language)]: getTranslation('product.usage.outdoor.storage', getCountryConfig(selectedCountry.code).language),
      [getTranslation('product.detail.assembly.time', getCountryConfig(selectedCountry.code).language)]: getTranslation('product.assembly.time.20.40.minutes', getCountryConfig(selectedCountry.code).language),
      [getTranslation('product.detail.recommended.assembly', getCountryConfig(selectedCountry.code).language)]: getTranslation('product.assembly.recommended.1.person', getCountryConfig(selectedCountry.code).language)
    },
    technicalDetails: {
      [getTranslation('product.technical.manufacturer', getCountryConfig(selectedCountry.code).language)]: 'Keter',
      [getTranslation('product.technical.part.number', getCountryConfig(selectedCountry.code).language)]: '249317',
      [getTranslation('product.technical.item.model.number', getCountryConfig(selectedCountry.code).language)]: '249317',
      [getTranslation('product.technical.size', getCountryConfig(selectedCountry.code).language)]: getTranslation('product.size.132x71.5x113.5.cm', getCountryConfig(selectedCountry.code).language),
      [getTranslation('product.technical.style', getCountryConfig(selectedCountry.code).language)]: getTranslation('product.style.single', getCountryConfig(selectedCountry.code).language),
      [getTranslation('product.technical.pattern', getCountryConfig(selectedCountry.code).language)]: getTranslation('product.pattern.single', getCountryConfig(selectedCountry.code).language),
      [getTranslation('product.technical.shape', getCountryConfig(selectedCountry.code).language)]: getTranslation('product.shape.horizontal', getCountryConfig(selectedCountry.code).language),
      [getTranslation('product.technical.item.package.quantity', getCountryConfig(selectedCountry.code).language)]: '1',
      [getTranslation('product.technical.batteries.required', getCountryConfig(selectedCountry.code).language)]: getTranslation('product.batteries.no', getCountryConfig(selectedCountry.code).language),
      [getTranslation('product.technical.asin', getCountryConfig(selectedCountry.code).language)]: 'B08XQVQPQ5',
      [getTranslation('product.technical.date.first.available', getCountryConfig(selectedCountry.code).language)]: getTranslation('product.date.first.available.march.2021', getCountryConfig(selectedCountry.code).language)
    },
    reviews: [
      {
        id: '1',
        author: 'PaTi',
        rating: 5,
        title: getTranslation('product.review.title.space.saving', getCountryConfig(selectedCountry.code).language),
        content: getTranslation('product.review.content.space.saving', getCountryConfig(selectedCountry.code).language),
        date: '2023-07-23',
        verified: true,
        helpful: 45,
        images: ['https://m.media-amazon.com/images/I/810IFH0goHL.jpg']
      },
      {
        id: '2',
        author: 'Miss Pickles',
        rating: 5,
        title: getTranslation('product.review.title.fab', getCountryConfig(selectedCountry.code).language),
        content: getTranslation('product.review.content.fab', getCountryConfig(selectedCountry.code).language),
        date: '2025-06-04',
        verified: true,
        helpful: 6,
        images: ['https://m.media-amazon.com/images/I/81THZPlwE7L.jpg']
      },
      {
        id: '3',
        author: 'Steve Bowden',
        rating: 4,
        title: getTranslation('product.review.title.great.product', getCountryConfig(selectedCountry.code).language),
        content: getTranslation('product.review.content.great.product', getCountryConfig(selectedCountry.code).language),
        date: '2025-08-08',
        verified: true,
        helpful: 1,
        images: ['https://m.media-amazon.com/images/I/714V2x9+LKL.jpg']
      },
      {
        id: '4',
        author: 'Nia',
        rating: 5,
        title: getTranslation('product.review.title.waterproof.spacious', getCountryConfig(selectedCountry.code).language),
        content: getTranslation('product.review.content.waterproof.spacious', getCountryConfig(selectedCountry.code).language),
        date: '2025-08-03',
        verified: true,
        helpful: 1,
        images: ['https://m.media-amazon.com/images/I/71FX507VNHL.jpg']
      },
      {
        id: '5',
        author: 'Janey',
        rating: 5,
        title: getTranslation('product.review.title.bin.storage', getCountryConfig(selectedCountry.code).language),
        content: getTranslation('product.review.content.bin.storage', getCountryConfig(selectedCountry.code).language),
        date: '2025-04-24',
        verified: true,
        helpful: 0,
        images: ['https://m.media-amazon.com/images/I/81zZUOHACSL.jpg']
      }
    ],
    colorOptions: [
      { name: getTranslation('product.color.light.grey.dark.cover', getCountryConfig(selectedCountry.code).language), price: formatPrice('£9.99', selectedCountry.code), available: true },
      { name: getTranslation('product.color.beige.brown', getCountryConfig(selectedCountry.code).language), price: formatPrice('£9.99', selectedCountry.code), available: true },
      { name: getTranslation('product.color.dark.grey', getCountryConfig(selectedCountry.code).language), price: formatPrice('£9.99', selectedCountry.code), available: true }
    ],
    sizeOptions: [
      { name: getTranslation('product.size.132x71.5x113.5.cm', getCountryConfig(selectedCountry.code).language), price: formatPrice('£9.99', selectedCountry.code), available: true },
              { name: getTranslation('product.size.ultra', getCountryConfig(selectedCountry.code).language), price: formatPrice('£14.99', selectedCountry.code), available: true }
    ],
    variants: [
      {
        id: 'size',
        type: 'size',
        name: getTranslation('product.variant.size', getCountryConfig(selectedCountry.code).language),
        options: [
          { name: getTranslation('product.size.132x71.5x113.5.cm', getCountryConfig(selectedCountry.code).language), images: ['https://m.media-amazon.com/images/I/81nkADjDAbL._AC_SL1500_.jpg'] },
          { name: getTranslation('product.size.ultra', getCountryConfig(selectedCountry.code).language), images: ['https://m.media-amazon.com/images/I/910TF1aqBKL._AC_SL1500_.jpg'] }
        ]
      },
      {
        id: 'color',
        type: 'color',
        name: getTranslation('product.variant.colour', getCountryConfig(selectedCountry.code).language),
        options: [
          { name: getTranslation('product.color.light.grey.dark.cover', getCountryConfig(selectedCountry.code).language), images: ['https://m.media-amazon.com/images/I/81nkADjDAbL._AC_SL1500_.jpg'] },
          { name: getTranslation('product.color.beige.brown', getCountryConfig(selectedCountry.code).language), images: ['https://m.media-amazon.com/images/I/91L1fuj4+hL._AC_SL1500_.jpg'] },
          { name: getTranslation('product.color.dark.grey', getCountryConfig(selectedCountry.code).language), images: ['https://m.media-amazon.com/images/I/81ByjoSNTZL._AC_SL1500_.jpg'] }
        ]
      }
    ],
    prime: true,
    deliveryInfo: getTranslation('product.delivery.free.prime', getCountryConfig(selectedCountry.code).language),
    quantityLimit: 5,
    safetyFeatures: [
      getTranslation('product.safety.lockable.design', getCountryConfig(selectedCountry.code).language),
      getTranslation('product.safety.uv.resistant', getCountryConfig(selectedCountry.code).language),
      getTranslation('product.safety.weatherproof.construction', getCountryConfig(selectedCountry.code).language)
    ],
    productInfo: {
      'Category': getTranslation('product.category.garden.storage', getCountryConfig(selectedCountry.code).language),
      'Brand': 'Keter',
      'Material': getTranslation('product.material.resin', getCountryConfig(selectedCountry.code).language),
      'Capacity': '880L'
    },
    countryRedirects: []
  }), [selectedCountry.code]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      <React.Suspense fallback={
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#007185] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading product...</p>
          </div>
        </div>
      }>
        <ErrorBoundary onError={() => setHasError(true)}>
          <ProductPageTemplate productData={productData} />
        </ErrorBoundary>
      </React.Suspense>
    </div>
  );
};

export default KeterStorageShedPage;
