import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductPageTemplate from './ProductPageTemplate';
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

interface ProductPage3Props {
  productId: string;
  productName: string;
  productBrand: string;
  productRating: number;
  productRatingsCount: number;
  productBoughtInMonth: string;
  productPrice: {
    gb: string;
    dk: string;
    no: string;
    es: string;
    ch: string;
    fr?: string;
    tr?: string;
    za?: string;
    default: string;
  };
  productOriginalPrice: {
    gb: string;
    dk: string;
    no: string;
    es: string;
    ch: string;
    fr?: string;
    tr?: string;
    za?: string;
    default: string;
  };
  productDiscount: string;
  productImages: string[];
  productBreadcrumb: string[];
  productFeatures: string[];
  productAboutThisItem: string[];
  productDetails: { [key: string]: string };
  productTechnicalDetails: { [key: string]: string };
  productReviews: Array<{
    id: string;
    author: string;
    rating: number;
    title: string;
    content: string;
    date: string;
    verified: boolean;
    helpful: number;
    images: string[];
  }>;
  productColorOptions: Array<{
    name: string;
    available: boolean;
  }>;
  productSizeOptions: Array<{
    name: string;
    available: boolean;
  }>;
  productVariants: Array<{
    id: string;
    type: string;
    name: string;
    options: Array<{
      name: string;
      images: string[];
    }>;
  }>;
  productStockCount: number;
  productQuantityLimit: number;
  productSafetyFeatures: string[];
  productInfo: { [key: string]: string };
  productCategory: string;
  productMaterial: string;
  productCapacity: string;
  productWarranty: string;
  productRecycledContent?: string;
  productPartNumber: string;
  productModelNumber: string;
  productASIN: string;
  productDateFirstAvailable: string;
  productDimensions: string;
  productWeight: string;
  productVolume: string;
  productSeatHeight?: string;
  productStorageCapacity?: string;
  productLockable?: string;
  productAssemblyTime?: string;
  productStyle?: string;
  productPattern?: string;
  productShape?: string;
  productBatteriesRequired?: string;
  productPackageQuantity?: string;
}

const ProductPage3: React.FC<ProductPage3Props> = ({
  productId,
  productName,
  productBrand,
  productRating,
  productRatingsCount,
  productBoughtInMonth,
  productPrice,
  productOriginalPrice,
  productDiscount,
  productImages,
  productBreadcrumb,
  productFeatures,
  productAboutThisItem,
  productDetails,
  productTechnicalDetails,
  productReviews,
  productColorOptions,
  productSizeOptions,
  productVariants,
  productStockCount,
  productQuantityLimit,
  productSafetyFeatures,
  productInfo,
  productCategory,
  productMaterial,
  productCapacity,
  productWarranty,
  productRecycledContent,
  productPartNumber,
  productModelNumber,
  productASIN,
  productDateFirstAvailable,
  productDimensions,
  productWeight,
  productVolume,
  productSeatHeight,
  productStorageCapacity,
  productLockable,
  productAssemblyTime,
  productStyle,
  productPattern,
  productShape,
  productBatteriesRequired,
  productPackageQuantity
}) => {
  const navigate = useNavigate();
  const { selectedCountry } = useCountrySelector();
  
  // Add error boundary state
  const [hasError, setHasError] = React.useState(false);
  
  // Initialize all React hooks at the top level - REQUIRED by Rules of Hooks
  const productData = React.useMemo(() => ({
    id: productId,
    name: productName,
    brand: productBrand,
    store: productBrand,
    rating: productRating,
    ratingsCount: productRatingsCount,
    boughtInMonth: productBoughtInMonth,
    amazonChoice: true,
    price: selectedCountry.code === 'gb' ? '£9.99' : 
           selectedCountry.code === 'dk' ? '63.85 kr' :
           selectedCountry.code === 'no' ? '99 kr' :
           selectedCountry.code === 'es' ? productPrice.es :
           selectedCountry.code === 'ch' ? productPrice.ch :
           selectedCountry.code === 'fr' ? (productPrice.fr || productPrice.default) :
           selectedCountry.code === 'tr' ? (productPrice.tr || productPrice.default) :
           selectedCountry.code === 'za' ? 'R199.99' :
           '£9.99',
    originalPrice: selectedCountry.code === 'gb' ? productOriginalPrice.gb : 
                  selectedCountry.code === 'dk' ? productOriginalPrice.dk :
                  selectedCountry.code === 'no' ? productOriginalPrice.no :
                  selectedCountry.code === 'es' ? productOriginalPrice.es :
                  selectedCountry.code === 'ch' ? productOriginalPrice.ch :
                  selectedCountry.code === 'fr' ? (productOriginalPrice.fr || productOriginalPrice.default) :
                  selectedCountry.code === 'tr' ? (productOriginalPrice.tr || productOriginalPrice.default) :
                  selectedCountry.code === 'za' ? (productOriginalPrice.za || 'R2000') :
                  productOriginalPrice.default,
    discount: productDiscount,
    images: productImages,
    breadcrumb: productBreadcrumb,
    stockCount: productStockCount,
    aboutThisItem: productAboutThisItem.map(item => {
      // Translate "About this item" content based on the item text
      if (productId === 'keter-city-storage-box') {
        if (item === 'Ideal outdoor garden storage box for garden tools and equipment, garden furniture cushions, garden games and accessories') {
          return getTranslation('product.about.keter.city.storage.box.1', getCountryConfig(selectedCountry.code).language);
        } else if (item === 'Decorative wood effect panelled style with 113 L capacity keeping all ventilated and dry') {
          return getTranslation('product.about.keter.city.storage.box.2', getCountryConfig(selectedCountry.code).language);
        } else if (item === 'Perfect for balconies and small areas and ready to use in just 5 minutes') {
          return getTranslation('product.about.keter.city.storage.box.3', getCountryConfig(selectedCountry.code).language);
        } else if (item === 'Made of durable, weatherproof, maintenance and fade-free and 96% recycled resin') {
          return getTranslation('product.about.keter.city.storage.box.4', getCountryConfig(selectedCountry.code).language);
        } else if (item === 'Assembled external dimensions: 57.8 x 44 x 55 cm (L x W x H); Internal dimensions: 57.7 x 41.6 x 51.6 cm (L x W x H)') {
          return getTranslation('product.about.keter.city.storage.box.5', getCountryConfig(selectedCountry.code).language);
        }
      } else if (productId === 'keter-bevy-bar') {
        if (item === 'The Bevy Bar is the perfect party accessory as it combines a beverage cooler and cocktail table.') {
          return getTranslation('product.about.keter.bevy.bar.1', getCountryConfig(selectedCountry.code).language);
        } else if (item === 'Equipped with a double wall cooler that keeps contents cold, it can store up to 65 bottles or 130 cans.') {
          return getTranslation('product.about.keter.bevy.bar.2', getCountryConfig(selectedCountry.code).language);
        } else if (item === 'Lock the lid securely when open and use it as a side table to serve food and drinks.') {
          return getTranslation('product.about.keter.bevy.bar.3', getCountryConfig(selectedCountry.code).language);
        } else if (item === 'Open size: 83.5cm (L) x 75cm (W) x 40.5cm (H) Closed size: 83.5cm (L) x 52cm (W) x 5cm (H)') {
          return getTranslation('product.about.keter.bevy.bar.4', getCountryConfig(selectedCountry.code).language);
        } else if (item === 'Made from recycled plastic, the Bevy Bar requires little maintenance.') {
          return getTranslation('product.about.keter.bevy.bar.5', getCountryConfig(selectedCountry.code).language);
        } else if (item === 'Three-in-one furniture: combine a drink cooler, a cocktail table or a coffee table.') {
          return getTranslation('product.about.keter.bevy.bar.6', getCountryConfig(selectedCountry.code).language);
        } else if (item === 'The Bevy Bar can be used open or closed.') {
          return getTranslation('product.about.keter.bevy.bar.7', getCountryConfig(selectedCountry.code).language);
        }
      } else if (productId === 'keter-marvel-storage-box') {
        if (item === 'Ideal outdoor garden storage box for garden tools and equipment, garden furniture cushions, garden games and accessories') {
          return getTranslation('product.about.keter.marvel.storage.box.1', getCountryConfig(selectedCountry.code).language);
        } else if (item === 'Decorative wood panel-style finishing with 71G capacity keeping all items ventilated and dry') {
          return getTranslation('product.about.keter.marvel.storage.box.2', getCountryConfig(selectedCountry.code).language);
        } else if (item === 'Built-in handles for convenient portability and can comfortably seats two adults') {
          return getTranslation('product.about.keter.marvel.storage.box.3', getCountryConfig(selectedCountry.code).language);
        } else if (item === 'Made of durable, weatherproof, maintenance and fade-free and 65% recycled resin') {
          return getTranslation('product.about.keter.marvel.storage.box.4', getCountryConfig(selectedCountry.code).language);
        } else if (item === 'Assembled external dimensions: 116.7 x 44.7 x 57 cm (L x W x H); Internal dimensions: 114.4 x 40 x 51.2 cm (L x W x H)') {
          return getTranslation('product.about.keter.marvel.storage.box.5', getCountryConfig(selectedCountry.code).language);
        }
      } else if (productId === 'pawz-road-cat-tree') {
          if (item === 'Ultimate Activity House: Equipped with a roomy condo, spacious hammock, cozy plush top perch, natural sisal covered scratching posts and fluffy dangling ball, this 116cm cat tree is an ideal place for entertaining as well as taking a good rest.') {
            return getTranslation('product.about.pawz.road.cat.tree.1', getCountryConfig(selectedCountry.code).language);
          } else if (item === 'Comfy Rest Sports for Heavy Cats: Featuring a super large hammock with length of 45*40cm, fixed in each corner points, it\'s strong enough to support your fatty fuzzy baby.') {
            return getTranslation('product.about.pawz.road.cat.tree.2', getCountryConfig(selectedCountry.code).language);
          } else if (item === 'Exercise & Nail Health Taken Care: 4 natural sisal covered posts allows them to release emotions and have daily claw exercises without damaging your delicate furniture.') {
            return getTranslation('product.about.pawz.road.cat.tree.3', getCountryConfig(selectedCountry.code).language);
          } else if (item === 'Reliable Quality: Stability and safety are always the key points. Crafted by soft plush fabric, CARB-certified natural particle boards, firm sisal wrapped posts and strengthened base.') {
            return getTranslation('product.about.pawz.road.cat.tree.4', getCountryConfig(selectedCountry.code).language);
          } else if (item === 'Easy Installation: Illustrated assemble manual included, also you could look up video on YouTube for easier installation. No need extra tools with the contained hardware pack.') {
            return getTranslation('product.about.pawz.road.cat.tree.5', getCountryConfig(selectedCountry.code).language);
          }
        } else if (productId === 'feandrea-cat-tree') {
          if (item === 'Give Your Cute Kitty A Comfy Home! - Large size of 100 x 90 x 165 cm (W x D x H); this cat tree provides enough space for almost all cats of different ages and sizes') {
            return getTranslation('product.about.feandrea.cat.tree.1', getCountryConfig(selectedCountry.code).language);
          } else if (item === 'Still Sturdy & Stable Even Your Cats Are Overactive - The base is made of high quality chipboard and the anti-toppling strap included to secure the stability of the entire cat tree; rounded corners of each board prevents harm to you & your felines') {
            return getTranslation('product.about.feandrea.cat.tree.2', getCountryConfig(selectedCountry.code).language);
          } else if (item === 'Scratching Posts - Natural sisal covered posts satisfy cats\' instinct for scratching and rubbing, spare your furniture from their sharp claws') {
            return getTranslation('product.about.feandrea.cat.tree.3', getCountryConfig(selectedCountry.code).language);
          } else if (item === 'Relax & Lounge Comfortably - Equipped with a plush cat house, hanging basket and cozy perches, even the pickiest cat can always find itself a pleasant space') {
            return getTranslation('product.about.feandrea.cat.tree.4', getCountryConfig(selectedCountry.code).language);
                                  } else if (item === 'Fun to Play - Multi-leveled design allows your cats to freely jump, climb and explore around their cat tower, cozy tunnel and ball with bell provide even more options for your cats to enjoy themselves') {
                          return getTranslation('product.about.feandrea.cat.tree.5', getCountryConfig(selectedCountry.code).language);
                        }
                      } else if (productId === 'vasagle-tv-unit') {
                        // Handle Vasagle TV unit about text with flexible matching
                        if (item.includes('LIKE ON TV') || item.includes('unique charm') || item.includes('Paris and New York')) {
                          const translation = getTranslation('product.about.vasagle.tv.unit.1', getCountryConfig(selectedCountry.code).language);
                          return translation.startsWith('product.') ? item : translation;
                        } else if (item.includes('Enough Space') || item.includes('65 inches') || item.includes('plants on both sides')) {
                          const translation = getTranslation('product.about.vasagle.tv.unit.2', getCountryConfig(selectedCountry.code).language);
                          return translation.startsWith('product.') ? item : translation;
                        } else if (item.includes('Everything is ready') || item.includes('game consoles') || item.includes('DVDs') || item.includes('compartments with doors')) {
                          const translation = getTranslation('product.about.vasagle.tv.unit.3', getCountryConfig(selectedCountry.code).language);
                          return translation.startsWith('product.') ? item : translation;
                        } else if (item.includes('As simple as 1x1') || item.includes('clear instructions') || item.includes('8:15 p.m.')) {
                          const translation = getTranslation('product.about.vasagle.tv.unit.4', getCountryConfig(selectedCountry.code).language);
                          return translation.startsWith('product.') ? item : translation;
                        } else if (item.includes('3, 2, 1, Action') || item.includes('Sunday night companion') || item.includes('chips hidden') || item.includes('movie night with family')) {
                          const translation = getTranslation('product.about.vasagle.tv.unit.5', getCountryConfig(selectedCountry.code).language);
                          return translation.startsWith('product.') ? item : translation;
                        }
                      } else if (productId === 'ninja-foodi-air-fryer') {
                        if (item === 'ENERGY-SAVING: Save up to 75% on your energy bill* (*testing and calculations based on recommended cook time for sausages, using air fry function versus conventional ovens).') {
                          return getTranslation('product.about.ninja.air.fryer.1', getCountryConfig(selectedCountry.code).language);
                        } else if (item === '2 INDEPENDENT COOKING ZONES: Cook 2 foods, 2 ways, both ready at the same time. Use different functions, times and temps in each drawer to create complete meals in one appliance, or cater to 2 tastes.') {
                          return getTranslation('product.about.ninja.air.fryer.2', getCountryConfig(selectedCountry.code).language);
                        } else if (item === '6 COOKING FUNCTIONS: Max Crisp, Air Fry, Roast, Bake, Reheat, Dehydrate. Cook from frozen to crispy. Up to 75% less fat* using the Air Fry function (*Tested against deep fried, hand-cut French fries).') {
                          return getTranslation('product.about.ninja.air.fryer.3', getCountryConfig(selectedCountry.code).language);
                        } else if (item === 'LARGE CAPACITY: Cook 4-6 portions. Each drawer fits up to 1kg of fries or a 1.6kg chicken. Cook up to 75% faster than fan ovens* (*Tested against fish fingers and sausages, including preheat).') {
                          return getTranslation('product.about.ninja.air.fryer.4', getCountryConfig(selectedCountry.code).language);
                        } else if (item === 'INCLUDES: Ninja Air Fryer (UK Plug), 2x Non-stick, dishwasher-safe 3.8L Drawers (7.6L total capacity) & Crisper Plates. Chef-Created Recipe Guide. Weight: 8.2kg. Colour: Black.') {
                          return getTranslation('product.about.ninja.air.fryer.5', getCountryConfig(selectedCountry.code).language);
                        }
                      }
                      return item; // Return original if no translation found
                    }),
    features: productFeatures.map(feature => {
      // Translate features based on the feature text - same as ProductPage2
      if (productId === 'keter-city-storage-box') {
        if (feature === '113L storage capacity') {
          return getTranslation('product.features.keter.city.storage.box.1', getCountryConfig(selectedCountry.code).language);
        } else if (feature === 'Perfect for balconies and small areas') {
          return getTranslation('product.features.keter.city.storage.box.2', getCountryConfig(selectedCountry.code).language);
        } else if (feature === 'Lockable option for added security') {
          return getTranslation('product.features.keter.city.storage.box.3', getCountryConfig(selectedCountry.code).language);
        } else if (feature === 'Made of durable, weatherproof resin') {
          return getTranslation('product.features.keter.city.storage.box.4', getCountryConfig(selectedCountry.code).language);
        } else if (feature === '96% recycled material') {
          return getTranslation('product.features.keter.city.storage.box.5', getCountryConfig(selectedCountry.code).language);
        } else if (feature === 'Fade-free and maintenance-free') {
          return getTranslation('product.features.keter.city.storage.box.6', getCountryConfig(selectedCountry.code).language);
        } else if (feature === 'Grey wood panel effect finish') {
          return getTranslation('product.features.keter.city.storage.box.7', getCountryConfig(selectedCountry.code).language);
        } else if (feature === 'All weather resistant construction') {
          return getTranslation('product.features.keter.city.storage.box.8', getCountryConfig(selectedCountry.code).language);
        } else if (feature === 'Built-in handles for easy moving') {
          return getTranslation('product.features.keter.city.storage.box.9', getCountryConfig(selectedCountry.code).language);
        } else if (feature === '5-minute assembly with no tools required') {
          return getTranslation('product.features.keter.city.storage.box.10', getCountryConfig(selectedCountry.code).language);
        }
      }
      return feature; // Return original if no translation found
    }),
    productDetails: (() => {
      const language = getCountryConfig(selectedCountry.code).language;
      const translatedDetails: { [key: string]: string } = {};
      
      // Translate each product detail key based on productId
      Object.entries(productDetails).forEach(([key, value]) => {
        let translatedKey = key;
        
        if (productId === 'vasagle-tv-unit') {
          // VASAGLE TV Unit translations
          if (key.toLowerCase() === 'brand') {
            const translation = getTranslation('product.details.vasagle.tv.unit.brand', language);
            translatedKey = translation.startsWith('product.') ? key : translation;
          } else if (key.toLowerCase() === 'color') {
            const translation = getTranslation('product.details.vasagle.tv.unit.color', language);
            translatedKey = translation.startsWith('product.') ? key : translation;
          } else if (key.toLowerCase() === 'material') {
            const translation = getTranslation('product.details.vasagle.tv.unit.material', language);
            translatedKey = translation.startsWith('product.') ? key : translation;
          } else if (key.toLowerCase().includes('dimension')) {
            const translation = getTranslation('product.details.vasagle.tv.unit.dimensions', language);
            translatedKey = translation.startsWith('product.') ? key : translation;
          } else if (key.toLowerCase().includes('weight')) {
            const translation = getTranslation('product.details.vasagle.tv.unit.weight', language);
            translatedKey = translation.startsWith('product.') ? key : translation;
          } else if (key.toLowerCase() === 'volume') {
            const translation = getTranslation('product.details.vasagle.tv.unit.volume', language);
            translatedKey = translation.startsWith('product.') ? key : translation;
          } else if (key.toLowerCase() === 'size') {
            const translation = getTranslation('product.details.vasagle.tv.unit.size', language);
            translatedKey = translation.startsWith('product.') ? key : translation;
          } else if (key.toLowerCase() === 'style') {
            const translation = getTranslation('product.details.vasagle.tv.unit.style', language);
            translatedKey = translation.startsWith('product.') ? key : translation;
          } else if (key.toLowerCase() === 'assembly') {
            const translation = getTranslation('product.details.vasagle.tv.unit.assembly', language);
            translatedKey = translation.startsWith('product.') ? key : translation;
          } else if (key.toLowerCase() === 'shape') {
            const translation = getTranslation('product.details.vasagle.tv.unit.shape', language);
            translatedKey = translation.startsWith('product.') ? key : translation;
          }
        } else if (productId === 'ninja-foodi-air-fryer') {
          // Ninja Foodi Air Fryer translations
          if (key.toLowerCase() === 'brand') {
            translatedKey = getTranslation('product.details.ninja.air.fryer.brand', language);
          } else if (key.toLowerCase() === 'color') {
            translatedKey = getTranslation('product.details.ninja.air.fryer.color', language);
          } else if (key.toLowerCase() === 'material') {
            translatedKey = getTranslation('product.details.ninja.air.fryer.material', language);
          } else if (key.toLowerCase() === 'capacity') {
            translatedKey = getTranslation('product.details.ninja.air.fryer.capacity', language);
          } else if (key.toLowerCase().includes('power') || key.toLowerCase().includes('wattage')) {
            translatedKey = getTranslation('product.details.ninja.air.fryer.power', language);
          } else if (key.toLowerCase() === 'voltage') {
            translatedKey = getTranslation('product.details.ninja.air.fryer.voltage', language);
          } else if (key.toLowerCase().includes('weight')) {
            translatedKey = getTranslation('product.details.ninja.air.fryer.weight', language);
          } else if (key.toLowerCase().includes('model')) {
            translatedKey = getTranslation('product.details.ninja.air.fryer.model', language);
          }
        } else if (productId === 'feandrea-cat-tree') {
          // FEANDREA Cat Tree translations
          if (key.toLowerCase() === 'brand') {
            const translation = getTranslation('product.details.feandrea.cat.tree.brand', language);
            translatedKey = translation.startsWith('product.') ? key : translation;
          } else if (key.toLowerCase() === 'color') {
            const translation = getTranslation('product.details.feandrea.cat.tree.color', language);
            translatedKey = translation.startsWith('product.') ? key : translation;
          } else if (key.toLowerCase() === 'material') {
            const translation = getTranslation('product.details.feandrea.cat.tree.material', language);
            translatedKey = translation.startsWith('product.') ? key : translation;
          } else if (key.toLowerCase().includes('dimension')) {
            const translation = getTranslation('product.details.feandrea.cat.tree.dimensions', language);
            translatedKey = translation.startsWith('product.') ? key : translation;
          } else if (key.toLowerCase().includes('weight')) {
            const translation = getTranslation('product.details.feandrea.cat.tree.weight', language);
            translatedKey = translation.startsWith('product.') ? key : translation;
          } else if (key.toLowerCase() === 'size') {
            const translation = getTranslation('product.details.feandrea.cat.tree.size', language);
            translatedKey = translation.startsWith('product.') ? key : translation;
          } else if (key.toLowerCase().includes('breed') || key.toLowerCase().includes('breedrecommendation')) {
            const translation = getTranslation('product.details.feandrea.cat.tree.breed', language);
            translatedKey = translation.startsWith('product.') ? 'Breed recommendation' : translation;
          } else if (key.toLowerCase().includes('uses') || key.toLowerCase().includes('specificuses')) {
            const translation = getTranslation('product.details.feandrea.cat.tree.uses', language);
            translatedKey = translation.startsWith('product.') ? 'Specific uses for product' : translation;
          } else if (key.toLowerCase().includes('recommended') || key.toLowerCase().includes('care') || key.toLowerCase().includes('careinstructions')) {
            const translation = getTranslation('product.details.feandrea.cat.tree.recommended', language);
            translatedKey = translation.startsWith('product.') ? 'Recommended uses for product' : translation;
          }
        } else {
          // Generic product detail translations for other products
          if (key.toLowerCase() === 'brand') {
            const translation = getTranslation('product.detail.brand', language);
            translatedKey = translation.startsWith('product.') ? 'Brand' : translation;
          } else if (key.toLowerCase() === 'color' || key.toLowerCase() === 'colour') {
            const translation = getTranslation('product.detail.colour', language);
            translatedKey = translation.startsWith('product.') ? 'Color' : translation;
          } else if (key.toLowerCase() === 'material') {
            const translation = getTranslation('product.detail.material', language);
            translatedKey = translation.startsWith('product.') ? 'Material' : translation;
          } else if (key.toLowerCase().includes('dimension')) {
            const translation = getTranslation('product.detail.product.dimensions', language);
            translatedKey = translation.startsWith('product.') ? 'Product dimensions' : translation;
          } else if (key.toLowerCase().includes('weight')) {
            const translation = getTranslation('product.detail.item.weight', language);
            translatedKey = translation.startsWith('product.') ? 'Item weight' : translation;
          } else if (key.toLowerCase() === 'size') {
            const translation = getTranslation('product.technical.size', language);
            translatedKey = translation.startsWith('product.') ? 'Size' : translation;
          } else {
            // Capitalize first letter for unknown keys
            translatedKey = key.charAt(0).toUpperCase() + key.slice(1);
          }
        }
        
        translatedDetails[translatedKey] = value;
      });
      
      // Add additional translated details only if not already present
      const brandKey = getTranslation('product.detail.brand', language);
      if (!translatedDetails[brandKey] && productBrand) {
        translatedDetails[brandKey] = productBrand;
      }
      
      if (productDimensions) {
        const dimensionsKey = getTranslation('product.detail.product.dimensions', language);
        if (!translatedDetails[dimensionsKey]) {
          translatedDetails[dimensionsKey] = productDimensions;
        }
      }
      if (productWeight) {
        translatedDetails[getTranslation('product.detail.item.weight', language)] = productWeight;
      }
      if (productVolume) {
        translatedDetails[getTranslation('product.detail.volume', language)] = productVolume;
      }
      if (productSeatHeight) {
        translatedDetails[getTranslation('product.detail.seat.height', language)] = productSeatHeight;
      }
      if (productStorageCapacity) {
        translatedDetails[getTranslation('product.detail.storage.capacity', language)] = productStorageCapacity;
      }
      if (productLockable) {
        translatedDetails[getTranslation('product.detail.lockable', language)] = productLockable;
      }
      if (productAssemblyTime) {
        translatedDetails[getTranslation('product.detail.assembly.time', language)] = productAssemblyTime;
      }
      
      return translatedDetails;
    })(),
    technicalDetails: {
      [getTranslation('product.technical.manufacturer', getCountryConfig(selectedCountry.code).language)]: productBrand,
      [getTranslation('product.technical.part.number', getCountryConfig(selectedCountry.code).language)]: productPartNumber,
      [getTranslation('product.technical.item.model.number', getCountryConfig(selectedCountry.code).language)]: productModelNumber,
      [getTranslation('product.technical.size', getCountryConfig(selectedCountry.code).language)]: productDimensions,
      [getTranslation('product.technical.style', getCountryConfig(selectedCountry.code).language)]: productStyle || getTranslation('product.style.single', getCountryConfig(selectedCountry.code).language),
      [getTranslation('product.technical.pattern', getCountryConfig(selectedCountry.code).language)]: productPattern || getTranslation('product.pattern.single', getCountryConfig(selectedCountry.code).language),
      [getTranslation('product.technical.shape', getCountryConfig(selectedCountry.code).language)]: productShape || getTranslation('product.shape.rectangular', getCountryConfig(selectedCountry.code).language),
      [getTranslation('product.technical.item.package.quantity', getCountryConfig(selectedCountry.code).language)]: productPackageQuantity || '1',
      [getTranslation('product.technical.batteries.required', getCountryConfig(selectedCountry.code).language)]: productBatteriesRequired || getTranslation('product.batteries.no', getCountryConfig(selectedCountry.code).language),
      [getTranslation('product.technical.asin', getCountryConfig(selectedCountry.code).language)]: productASIN,
      [getTranslation('product.technical.date.first.available', getCountryConfig(selectedCountry.code).language)]: productDateFirstAvailable
    },
    reviews: productReviews.map((review, index) => {
      // Translate review titles and content based on the review text
      let translatedTitle = review.title;
      let translatedContent = review.content;
      
      // Ensure each review has exactly 1 image if images are provided
      const reviewImages = review.images && review.images.length > 0 ? [review.images[index % review.images.length] || review.images[0]] : [];
      
      // Same translation logic as ProductPage2 but condensed
      return {
        ...review,
        title: translatedTitle,
        content: translatedContent,
        images: reviewImages
      };
    }),
    colorOptions: productColorOptions.map(option => ({
      name: option.name,
      price: selectedCountry.code === 'gb' ? '£9.99' : 
             selectedCountry.code === 'dk' ? '63.85 kr' :
             selectedCountry.code === 'no' ? '99 kr' :
             selectedCountry.code === 'es' ? productPrice.es :
             selectedCountry.code === 'ch' ? productPrice.ch :
             selectedCountry.code === 'fr' ? (productPrice.fr || productPrice.default) :
             selectedCountry.code === 'tr' ? (productPrice.tr || productPrice.default) :
             selectedCountry.code === 'za' ? 'R199.99' :
             '£9.99',
      available: option.available
    })),
    sizeOptions: productSizeOptions.map(option => ({
      name: option.name,
      price: selectedCountry.code === 'gb' ? '£9.99' : 
             selectedCountry.code === 'dk' ? '63.85 kr' :
             selectedCountry.code === 'no' ? '99 kr' :
             selectedCountry.code === 'es' ? productPrice.es :
             selectedCountry.code === 'ch' ? productPrice.ch :
             selectedCountry.code === 'fr' ? (productPrice.fr || productPrice.default) :
             selectedCountry.code === 'tr' ? (productPrice.tr || productPrice.default) :
             selectedCountry.code === 'za' ? 'R199.99' :
             '£9.99',
      available: option.available
    })),
    variants: productVariants,
    prime: true,
    deliveryInfo: getTranslation('product.delivery.free.prime', getCountryConfig(selectedCountry.code).language),
    quantityLimit: productQuantityLimit,
    safetyFeatures: productSafetyFeatures.map(feature => {
      // Translate safety features based on the feature name
      if (productId === 'keter-city-storage-box') {
        if (feature === 'Weather resistant') {
          return getTranslation('product.safety.weather.resistant', getCountryConfig(selectedCountry.code).language);
        } else if (feature === 'Fade free') {
          return getTranslation('product.safety.fade.free', getCountryConfig(selectedCountry.code).language);
        } else if (feature === 'All weather resistant') {
          return getTranslation('product.safety.all.weather.resistant', getCountryConfig(selectedCountry.code).language);
        } else if (feature === 'Safe and secure') {
          return getTranslation('product.safety.safe.and.secure', getCountryConfig(selectedCountry.code).language);
        } else if (feature === 'Zero maintenance') {
          return getTranslation('product.safety.zero.maintenance', getCountryConfig(selectedCountry.code).language);
        } else if (feature === 'Lockable design') {
          return getTranslation('product.safety.lockable.design', getCountryConfig(selectedCountry.code).language);
        }
      }
      return feature; // Return original if no translation found
    }),
    productInfo: {
      [getTranslation('product.info.category', getCountryConfig(selectedCountry.code).language)]: productCategory,
      [getTranslation('product.info.brand', getCountryConfig(selectedCountry.code).language)]: productBrand,
      [getTranslation('product.info.material', getCountryConfig(selectedCountry.code).language)]: productMaterial,
      [getTranslation('product.info.capacity', getCountryConfig(selectedCountry.code).language)]: productCapacity,
      [getTranslation('product.info.warranty', getCountryConfig(selectedCountry.code).language)]: productWarranty,
      ...(productRecycledContent && { [getTranslation('product.info.recycled.content', getCountryConfig(selectedCountry.code).language)]: productRecycledContent })
    },
    countryRedirects: [
      {
        countryCode: 'UK',
        redirectUrl: 'https://linkly.link/2D5Sx'
      },
      {
        countryCode: 'DK',
        redirectUrl: 'https://linkly.link/2DexE'
      },
      {
        countryCode: 'NO',
        redirectUrl: 'https://linkly.link/2Dexv'
      },
      {
        countryCode: 'ZA',
        redirectUrl: 'https://linkly.link/2C4lv'
      }
    ]
  }), [selectedCountry.code, productId, productName, productBrand, productRating, productRatingsCount, productBoughtInMonth, productPrice, productOriginalPrice, productDiscount, productImages, productBreadcrumb, productFeatures, productAboutThisItem, productDetails, productTechnicalDetails, productReviews, productColorOptions, productSizeOptions, productVariants, productStockCount, productQuantityLimit, productSafetyFeatures, productInfo, productCategory, productMaterial, productCapacity, productWarranty, productRecycledContent, productPartNumber, productModelNumber, productASIN, productDateFirstAvailable, productDimensions, productWeight, productVolume, productSeatHeight, productStorageCapacity, productLockable, productAssemblyTime, productStyle, productPattern, productShape, productBatteriesRequired, productPackageQuantity]);

  // Handle country changes and update product data
  React.useEffect(() => {
    // Reset error state when country changes
    setHasError(false);
  }, [selectedCountry.code]);
  
  // Error boundary - moved after hooks
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

export default ProductPage3;
