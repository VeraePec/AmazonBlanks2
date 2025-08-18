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

const KeterEdenBenchPage: React.FC = () => {
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
    name: getTranslation('product.name.keter.eden.bench', getCountryConfig(selectedCountry.code).language),
    brand: 'Keter',
    store: 'Keter',
    rating: 4.5,
    ratingsCount: 13158,
    boughtInMonth: '500+',
    amazonChoice: true,
    price: selectedCountry.code === 'gb' ? '£9.99' : 
           selectedCountry.code === 'dk' ? '63 kr' :
           selectedCountry.code === 'no' ? '99 kr' :
           selectedCountry.code === 'es' ? '€11.50' :
           selectedCountry.code === 'ch' ? 'CHF 10.50' :
           formatPrice('9.99', selectedCountry.code),
    originalPrice: selectedCountry.code === 'gb' ? '£14.99' : 
                  selectedCountry.code === 'dk' ? '85 kr' :
                  selectedCountry.code === 'no' ? '130 kr' :
                  selectedCountry.code === 'es' ? '€17.25' :
                  selectedCountry.code === 'ch' ? 'CHF 15.00' :
                  formatPrice('14.99', selectedCountry.code),
    discount: '25%',
    images: [
      'https://m.media-amazon.com/images/I/61dr8C-RdeL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/81+9cCqWEhL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/61y+EMitnkL._AC_.jpg',
      'https://m.media-amazon.com/images/I/91wkFGkteWL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/718JSSP-rEL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/71qwGJ5RauL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/71GfYXFSRUL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/81K15tyCBLL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/81Ez7oPn2EL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/81OyLlXSZtL._AC_SL1500_.jpg'
    ],
    breadcrumb: [
      getTranslation('nav.home', getCountryConfig(selectedCountry.code).language),
      getTranslation('nav.garden', getCountryConfig(selectedCountry.code).language),
      getTranslation('nav.outdoor.storage', getCountryConfig(selectedCountry.code).language),
      getTranslation('nav.garden.benches', getCountryConfig(selectedCountry.code).language)
    ],
    features: [
      getTranslation('product.features.keter.eden.bench.1', getCountryConfig(selectedCountry.code).language),
      getTranslation('product.features.keter.eden.bench.2', getCountryConfig(selectedCountry.code).language),
      getTranslation('product.features.keter.eden.bench.3', getCountryConfig(selectedCountry.code).language),
      getTranslation('product.features.keter.eden.bench.4', getCountryConfig(selectedCountry.code).language),
      getTranslation('product.features.keter.eden.bench.5', getCountryConfig(selectedCountry.code).language),
      getTranslation('product.features.keter.eden.bench.6', getCountryConfig(selectedCountry.code).language),
      getTranslation('product.features.keter.eden.bench.7', getCountryConfig(selectedCountry.code).language),
      getTranslation('product.features.keter.eden.bench.8', getCountryConfig(selectedCountry.code).language)
    ],
    aboutThisItem: [
      getTranslation('product.about.keter.eden.bench.1', getCountryConfig(selectedCountry.code).language),
      getTranslation('product.about.keter.eden.bench.2', getCountryConfig(selectedCountry.code).language),
      getTranslation('product.about.keter.eden.bench.3', getCountryConfig(selectedCountry.code).language),
      getTranslation('product.about.keter.eden.bench.4', getCountryConfig(selectedCountry.code).language),
      getTranslation('product.about.keter.eden.bench.5', getCountryConfig(selectedCountry.code).language)
    ],
    productDetails: {
      [getTranslation('product.detail.brand', getCountryConfig(selectedCountry.code).language)]: 'Keter',
      [getTranslation('product.detail.colour', getCountryConfig(selectedCountry.code).language)]: getTranslation('product.color.beige.brown', getCountryConfig(selectedCountry.code).language),
      [getTranslation('product.detail.material', getCountryConfig(selectedCountry.code).language)]: getTranslation('product.material.resin', getCountryConfig(selectedCountry.code).language),
      [getTranslation('product.detail.product.dimensions', getCountryConfig(selectedCountry.code).language)]: '140cm x 60cm x 84cm',
      [getTranslation('product.detail.item.weight', getCountryConfig(selectedCountry.code).language)]: '15.8 kg',
      [getTranslation('product.detail.volume', getCountryConfig(selectedCountry.code).language)]: '265 litres',
      [getTranslation('product.detail.seat.height', getCountryConfig(selectedCountry.code).language)]: '33.07 inches',
      [getTranslation('product.detail.storage.capacity', getCountryConfig(selectedCountry.code).language)]: '265L / 70 gallons',
      [getTranslation('product.detail.lockable', getCountryConfig(selectedCountry.code).language)]: getTranslation('product.detail.yes', getCountryConfig(selectedCountry.code).language),
      [getTranslation('product.detail.assembly.time', getCountryConfig(selectedCountry.code).language)]: getTranslation('product.assembly.time.30.60.minutes', getCountryConfig(selectedCountry.code).language)
    },
    technicalDetails: {
      [getTranslation('product.technical.manufacturer', getCountryConfig(selectedCountry.code).language)]: 'Keter',
      [getTranslation('product.technical.part.number', getCountryConfig(selectedCountry.code).language)]: '226277',
      [getTranslation('product.technical.item.model.number', getCountryConfig(selectedCountry.code).language)]: '226277',
      [getTranslation('product.technical.size', getCountryConfig(selectedCountry.code).language)]: '140cm x 60cm x 84cm',
      [getTranslation('product.technical.style', getCountryConfig(selectedCountry.code).language)]: getTranslation('product.style.single', getCountryConfig(selectedCountry.code).language),
      [getTranslation('product.technical.pattern', getCountryConfig(selectedCountry.code).language)]: getTranslation('product.pattern.wood.effect', getCountryConfig(selectedCountry.code).language),
      [getTranslation('product.technical.shape', getCountryConfig(selectedCountry.code).language)]: getTranslation('product.shape.rectangular', getCountryConfig(selectedCountry.code).language),
      [getTranslation('product.technical.item.package.quantity', getCountryConfig(selectedCountry.code).language)]: '1',
      [getTranslation('product.technical.batteries.required', getCountryConfig(selectedCountry.code).language)]: getTranslation('product.batteries.no', getCountryConfig(selectedCountry.code).language),
      [getTranslation('product.technical.asin', getCountryConfig(selectedCountry.code).language)]: 'B003AQH3J2',
      [getTranslation('product.technical.date.first.available', getCountryConfig(selectedCountry.code).language)]: getTranslation('product.date.first.available.january.2011', getCountryConfig(selectedCountry.code).language)
    },
    reviews: [
      {
        id: '1',
        author: 'Beth',
        rating: 5,
        title: getTranslation('product.review.title.excellent.good.sized.bench', getCountryConfig(selectedCountry.code).language),
        content: getTranslation('product.review.content.excellent.good.sized.bench', getCountryConfig(selectedCountry.code).language),
        date: '2025-07-23',
        verified: true,
        helpful: 45,
        images: ['https://m.media-amazon.com/images/I/81v-LuMoFWL.jpg']
      },
      {
        id: '2',
        author: 'vcxvsdr',
        rating: 5,
        title: getTranslation('product.review.title.damn.good.garden.storage.bench', getCountryConfig(selectedCountry.code).language),
        content: getTranslation('product.review.content.damn.good.garden.storage.bench', getCountryConfig(selectedCountry.code).language),
        date: '2017-06-14',
        verified: true,
        helpful: 105,
        images: ['https://m.media-amazon.com/images/I/71Bzq-TZcTL.jpg']
      },
      {
        id: '3',
        author: 'Sue Goodsall',
        rating: 4,
        title: getTranslation('product.review.title.value.for.money.sturdy.storage.bench', getCountryConfig(selectedCountry.code).language),
        content: getTranslation('product.review.content.value.for.money.sturdy.storage.bench', getCountryConfig(selectedCountry.code).language),
        date: '2025-02-19',
        verified: true,
        helpful: 10,
        images: ['https://m.media-amazon.com/images/I/81YNryo1-hL.jpg']
      },
      {
        id: '4',
        author: 'Dee',
        rating: 5,
        title: getTranslation('product.review.title.great.bench', getCountryConfig(selectedCountry.code).language),
        content: getTranslation('product.review.content.great.bench', getCountryConfig(selectedCountry.code).language),
        date: '2025-06-01',
        verified: true,
        helpful: 9,
        images: ['https://m.media-amazon.com/images/I/81MeveEWzeL.jpg']
      },
      {
        id: '5',
        author: 'Rhian Peskett',
        rating: 5,
        title: getTranslation('product.review.title.good.quality.and.looks.great', getCountryConfig(selectedCountry.code).language),
        content: getTranslation('product.review.content.good.quality.and.looks.great', getCountryConfig(selectedCountry.code).language),
        date: '2025-07-01',
        verified: true,
        helpful: 8,
        images: ['https://m.media-amazon.com/images/I/81qsVS-qXYL.jpg']
      }
    ],
    colorOptions: [
      { name: getTranslation('product.color.beige.brown', getCountryConfig(selectedCountry.code).language), price: selectedCountry.code === 'gb' ? '£9.99' : selectedCountry.code === 'dk' ? '63 kr' : selectedCountry.code === 'no' ? '99 kr' : selectedCountry.code === 'es' ? '€11.50' : selectedCountry.code === 'ch' ? 'CHF 10.50' : formatPrice('9.99', selectedCountry.code), available: true },
      { name: getTranslation('product.color.grey', getCountryConfig(selectedCountry.code).language), price: selectedCountry.code === 'gb' ? '£9.99' : selectedCountry.code === 'dk' ? '63 kr' : selectedCountry.code === 'no' ? '99 kr' : selectedCountry.code === 'es' ? '€11.50' : selectedCountry.code === 'ch' ? 'CHF 10.50' : formatPrice('9.99', selectedCountry.code), available: true }
    ],
    sizeOptions: [
      { name: '140cm x 60cm x 84cm', price: selectedCountry.code === 'gb' ? '£9.99' : selectedCountry.code === 'dk' ? '63 kr' : selectedCountry.code === 'no' ? '99 kr' : selectedCountry.code === 'es' ? '€11.50' : selectedCountry.code === 'ch' ? 'CHF 10.50' : formatPrice('9.99', selectedCountry.code), available: true }
    ],
    variants: [
      {
        id: 'color',
        type: 'color',
        name: getTranslation('product.variant.colour', getCountryConfig(selectedCountry.code).language),
        options: [
          { name: getTranslation('product.color.beige.brown', getCountryConfig(selectedCountry.code).language), images: ['https://m.media-amazon.com/images/I/61dr8C-RdeL._AC_SL1500_.jpg'] },
          { name: getTranslation('product.color.grey', getCountryConfig(selectedCountry.code).language), images: ['https://m.media-amazon.com/images/I/81+9cCqWEhL._AC_SL1500_.jpg'] }
        ]
      }
    ],
    prime: true,
    deliveryInfo: getTranslation('product.delivery.free.prime', getCountryConfig(selectedCountry.code).language),
    quantityLimit: 3,
    safetyFeatures: [
      getTranslation('product.safety.weather.resistant', getCountryConfig(selectedCountry.code).language),
      getTranslation('product.safety.fade.free', getCountryConfig(selectedCountry.code).language),
      getTranslation('product.safety.all.weather.resistant', getCountryConfig(selectedCountry.code).language),
      getTranslation('product.safety.safe.and.secure', getCountryConfig(selectedCountry.code).language),
      getTranslation('product.safety.zero.maintenance', getCountryConfig(selectedCountry.code).language)
    ],
    productInfo: {
      'Category': getTranslation('product.category.garden.furniture', getCountryConfig(selectedCountry.code).language),
      'Brand': 'Keter',
      'Material': getTranslation('product.material.resin', getCountryConfig(selectedCountry.code).language),
      'Capacity': '265L',
      'Warranty': getTranslation('product.warranty.2.years', getCountryConfig(selectedCountry.code).language),
      'Recycled Content': '60%'
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

export default KeterEdenBenchPage;
