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

interface ProductPage2Props {
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
    default: string;
  };
  productOriginalPrice: {
    gb: string;
    dk: string;
    no: string;
    es: string;
    ch: string;
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

const ProductPage2: React.FC<ProductPage2Props> = ({
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
    id: productId,
    name: productName,
    brand: productBrand,
    store: productBrand,
    rating: productRating,
    ratingsCount: productRatingsCount,
    boughtInMonth: productBoughtInMonth,
    amazonChoice: true,
    price: selectedCountry.code === 'gb' ? productPrice.gb : 
           selectedCountry.code === 'dk' ? productPrice.dk :
           selectedCountry.code === 'no' ? productPrice.no :
           selectedCountry.code === 'es' ? productPrice.es :
           selectedCountry.code === 'ch' ? productPrice.ch :
           productPrice.default,
    originalPrice: selectedCountry.code === 'gb' ? productOriginalPrice.gb : 
                  selectedCountry.code === 'dk' ? productOriginalPrice.dk :
                  selectedCountry.code === 'no' ? productOriginalPrice.no :
                  selectedCountry.code === 'es' ? productOriginalPrice.es :
                  selectedCountry.code === 'ch' ? productOriginalPrice.ch :
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
                        if (item === 'LIKE ON TV: The white TV stand adds a touch of unique charm to your room. You will not feel any jealousy seeing the interiors of lofts in Paris and New York in movies and on TV.') {
                          return getTranslation('product.about.vasagle.tv.unit.1', getCountryConfig(selectedCountry.code).language);
                        } else if (item === 'Enough Space The TV stand can accommodate TVs up to 65 inches. For small TVs, it is enough to place plants on both sides.') {
                          return getTranslation('product.about.vasagle.tv.unit.2', getCountryConfig(selectedCountry.code).language);
                        } else if (item === 'Everything is ready: will your favorite movie be on TV soon? You can place the game consoles and receivers in the 2 open compartments and store the DVDs in the compartments with doors. The movie is in progress and you just have to sit back and enjoy it.') {
                          return getTranslation('product.about.vasagle.tv.unit.3', getCountryConfig(selectedCountry.code).language);
                        } else if (item === 'As simple as 1x1: thanks to the clear instructions and the well-identified parts, assembly is done without breaking your head. After work, you still have time to settle down before the screening of your favorite movie at 8:15 p.m.') {
                          return getTranslation('product.about.vasagle.tv.unit.4', getCountryConfig(selectedCountry.code).language);
                        } else if (item === '3, 2, 1, Action: This modern TV stand will be your perfect Sunday night companion. Grab the chips hidden behind the push-opening door and enjoy your movie night with family or friends.') {
                          return getTranslation('product.about.vasagle.tv.unit.5', getCountryConfig(selectedCountry.code).language);
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
      // Translate features based on the feature text
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
      } else if (productId === 'keter-bevy-bar') {
        if (feature === '60 litre capacity') {
          return getTranslation('product.features.keter.bevy.bar.1', getCountryConfig(selectedCountry.code).language);
        } else if (feature === 'UV treated') {
          return getTranslation('product.features.keter.bevy.bar.2', getCountryConfig(selectedCountry.code).language);
        } else if (feature === 'Insulated') {
          return getTranslation('product.features.keter.bevy.bar.3', getCountryConfig(selectedCountry.code).language);
        } else if (feature === 'Maintenance-free') {
          return getTranslation('product.features.keter.bevy.bar.4', getCountryConfig(selectedCountry.code).language);
        } else if (feature === 'Double wall cooler') {
          return getTranslation('product.features.keter.bevy.bar.5', getCountryConfig(selectedCountry.code).language);
        } else if (feature === 'Stores up to 65 bottles or 130 cans') {
          return getTranslation('product.features.keter.bevy.bar.6', getCountryConfig(selectedCountry.code).language);
        } else if (feature === 'Lockable lid') {
          return getTranslation('product.features.keter.bevy.bar.7', getCountryConfig(selectedCountry.code).language);
        } else if (feature === 'Three-in-one furniture design') {
          return getTranslation('product.features.keter.bevy.bar.8', getCountryConfig(selectedCountry.code).language);
        } else if (feature === 'Made from recycled plastic') {
          return getTranslation('product.features.keter.bevy.bar.9', getCountryConfig(selectedCountry.code).language);
        } else if (feature === 'Easy to clean and maintain') {
          return getTranslation('product.features.keter.bevy.bar.10', getCountryConfig(selectedCountry.code).language);
        }
      } else if (productId === 'keter-marvel-storage-box') {
        if (feature === '270L storage capacity for garden tools and equipment') {
          return getTranslation('product.features.keter.marvel.storage.box.1', getCountryConfig(selectedCountry.code).language);
        } else if (feature === 'Decorative wood panel-style finishing with 71G capacity') {
          return getTranslation('product.features.keter.marvel.storage.box.2', getCountryConfig(selectedCountry.code).language);
        } else if (feature === 'Built-in handles for convenient portability') {
          return getTranslation('product.features.keter.marvel.storage.box.3', getCountryConfig(selectedCountry.code).language);
        } else if (feature === 'Can comfortably seat two adults (supports up to 220 kg)') {
          return getTranslation('product.features.keter.marvel.storage.box.4', getCountryConfig(selectedCountry.code).language);
        } else if (feature === 'Made of durable, weatherproof, maintenance and fade-free resin') {
          return getTranslation('product.features.keter.marvel.storage.box.5', getCountryConfig(selectedCountry.code).language);
        } else if (feature === '65% recycled resin material for sustainability') {
          return getTranslation('product.features.keter.marvel.storage.box.6', getCountryConfig(selectedCountry.code).language);
        } else if (feature === 'Lockable design for added security (lock not included)') {
          return getTranslation('product.features.keter.marvel.storage.box.7', getCountryConfig(selectedCountry.code).language);
        } else if (feature === 'Rollable with built-in wheels for easy movement') {
          return getTranslation('product.features.keter.marvel.storage.box.8', getCountryConfig(selectedCountry.code).language);
        } else if (feature === 'All weather resistant and waterproof') {
          return getTranslation('product.features.keter.marvel.storage.box.9', getCountryConfig(selectedCountry.code).language);
        } else if (feature === 'Zero maintenance required') {
          return getTranslation('product.features.keter.marvel.storage.box.10', getCountryConfig(selectedCountry.code).language);
        }
      } else if (productId === 'pawz-road-cat-tree') {
          if (feature === '116cm height for medium cats') {
            return getTranslation('product.features.pawz.road.cat.tree.1', getCountryConfig(selectedCountry.code).language);
          } else if (feature === '4 natural sisal scratching posts') {
            return getTranslation('product.features.pawz.road.cat.tree.2', getCountryConfig(selectedCountry.code).language);
          } else if (feature === 'Large hammock (45x40cm)') {
            return getTranslation('product.features.pawz.road.cat.tree.3', getCountryConfig(selectedCountry.code).language);
          } else if (feature === 'Cozy plush condo') {
            return getTranslation('product.features.pawz.road.cat.tree.4', getCountryConfig(selectedCountry.code).language);
          } else if (feature === 'Top perch with raised rim') {
            return getTranslation('product.features.pawz.road.cat.tree.5', getCountryConfig(selectedCountry.code).language);
          } else if (feature === 'Metal frame construction') {
            return getTranslation('product.features.pawz.road.cat.tree.6', getCountryConfig(selectedCountry.code).language);
          } else if (feature === 'Stable and sturdy base') {
            return getTranslation('product.features.pawz.road.cat.tree.7', getCountryConfig(selectedCountry.code).language);
          } else if (feature === 'Easy assembly') {
            return getTranslation('product.features.pawz.road.cat.tree.8', getCountryConfig(selectedCountry.code).language);
          } else if (feature === 'CARB-certified materials') {
            return getTranslation('product.features.pawz.road.cat.tree.9', getCountryConfig(selectedCountry.code).language);
          } else if (feature === 'Suitable for heavy cats') {
            return getTranslation('product.features.pawz.road.cat.tree.10', getCountryConfig(selectedCountry.code).language);
          }
        } else if (productId === 'feandrea-cat-tree') {
          if (feature === 'Large size 100 x 90 x 165 cm') {
            return getTranslation('product.features.feandrea.cat.tree.1', getCountryConfig(selectedCountry.code).language);
          } else if (feature === 'Multi-level design for multiple cats') {
            return getTranslation('product.features.feandrea.cat.tree.2', getCountryConfig(selectedCountry.code).language);
          } else if (feature === 'Natural sisal covered scratching posts') {
            return getTranslation('product.features.feandrea.cat.tree.3', getCountryConfig(selectedCountry.code).language);
          } else if (feature === 'Plush cat house with cozy perches') {
            return getTranslation('product.features.feandrea.cat.tree.4', getCountryConfig(selectedCountry.code).language);
          } else if (feature === 'Hanging basket for lounging') {
            return getTranslation('product.features.feandrea.cat.tree.5', getCountryConfig(selectedCountry.code).language);
          } else if (feature === 'Anti-toppling strap included') {
            return getTranslation('product.features.feandrea.cat.tree.6', getCountryConfig(selectedCountry.code).language);
          } else if (feature === 'Rounded corners for safety') {
            return getTranslation('product.features.feandrea.cat.tree.7', getCountryConfig(selectedCountry.code).language);
          } else if (feature === 'High quality chipboard base') {
            return getTranslation('product.features.feandrea.cat.tree.8', getCountryConfig(selectedCountry.code).language);
          } else if (feature === 'Compressed cardboard supporting tubes') {
            return getTranslation('product.features.feandrea.cat.tree.9', getCountryConfig(selectedCountry.code).language);
                                  } else if (feature === 'Suitable for cats up to 7kg') {
                          return getTranslation('product.features.feandrea.cat.tree.10', getCountryConfig(selectedCountry.code).language);
                        }
                      } else if (productId === 'vasagle-tv-unit') {
                        if (feature === '140 cm long TV unit for TVs up to 65 inches') {
                          return getTranslation('product.features.vasagle.tv.unit.1', getCountryConfig(selectedCountry.code).language);
                        } else if (feature === '2 doors with adjustable shelves') {
                          return getTranslation('product.features.vasagle.tv.unit.2', getCountryConfig(selectedCountry.code).language);
                        } else if (feature === 'Open compartments for game consoles and receivers') {
                          return getTranslation('product.features.vasagle.tv.unit.3', getCountryConfig(selectedCountry.code).language);
                        } else if (feature === 'Closed compartments for DVDs and storage') {
                          return getTranslation('product.features.vasagle.tv.unit.4', getCountryConfig(selectedCountry.code).language);
                        } else if (feature === 'High-quality water-resistant particleboard panels') {
                          return getTranslation('product.features.vasagle.tv.unit.5', getCountryConfig(selectedCountry.code).language);
                        } else if (feature === '12 cm space underneath for robotic vacuuming') {
                          return getTranslation('product.features.vasagle.tv.unit.6', getCountryConfig(selectedCountry.code).language);
                        } else if (feature === 'Two cable holes for easy cable management') {
                          return getTranslation('product.features.vasagle.tv.unit.7', getCountryConfig(selectedCountry.code).language);
                        } else if (feature === 'Modern white design for any room') {
                          return getTranslation('product.features.vasagle.tv.unit.8', getCountryConfig(selectedCountry.code).language);
                        } else if (feature === 'Easy assembly with clear instructions') {
                          return getTranslation('product.features.vasagle.tv.unit.9', getCountryConfig(selectedCountry.code).language);
                        } else if (feature === 'Maximum static load capacity: 50 kg') {
                          return getTranslation('product.features.vasagle.tv.unit.10', getCountryConfig(selectedCountry.code).language);
                        }
                      } else if (productId === 'ninja-foodi-air-fryer') {
                        if (feature === '7.6L total capacity with 2 independent cooking zones') {
                          return getTranslation('product.features.ninja.air.fryer.1', getCountryConfig(selectedCountry.code).language);
                        } else if (feature === '6 cooking functions: Air Fry, Max Crisp, Roast, Bake, Reheat, Dehydrate') {
                          return getTranslation('product.features.ninja.air.fryer.2', getCountryConfig(selectedCountry.code).language);
                        } else if (feature === 'Saves up to 75% on energy bills compared to conventional ovens') {
                          return getTranslation('product.features.ninja.air.fryer.3', getCountryConfig(selectedCountry.code).language);
                        } else if (feature === 'Cook 2 foods, 2 ways, both ready at the same time') {
                          return getTranslation('product.features.ninja.air.fryer.4', getCountryConfig(selectedCountry.code).language);
                        } else if (feature === 'Each drawer fits up to 1kg of fries or a 1.6kg chicken') {
                          return getTranslation('product.features.ninja.air.fryer.5', getCountryConfig(selectedCountry.code).language);
                        } else if (feature === 'Cook up to 75% faster than fan ovens') {
                          return getTranslation('product.features.ninja.air.fryer.6', getCountryConfig(selectedCountry.code).language);
                        } else if (feature === 'Up to 75% less fat using Air Fry function') {
                          return getTranslation('product.features.ninja.air.fryer.7', getCountryConfig(selectedCountry.code).language);
                        } else if (feature === 'Non-stick, dishwasher-safe baskets and crisper plates') {
                          return getTranslation('product.features.ninja.air.fryer.8', getCountryConfig(selectedCountry.code).language);
                        } else if (feature === '2400W power with UK plug') {
                          return getTranslation('product.features.ninja.air.fryer.9', getCountryConfig(selectedCountry.code).language);
                        } else if (feature === '2-year guarantee upon registration') {
                          return getTranslation('product.features.ninja.air.fryer.10', getCountryConfig(selectedCountry.code).language);
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
            translatedKey = getTranslation('product.details.vasagle.tv.unit.brand', language);
          } else if (key.toLowerCase() === 'color') {
            translatedKey = getTranslation('product.details.vasagle.tv.unit.color', language);
          } else if (key.toLowerCase() === 'material') {
            translatedKey = getTranslation('product.details.vasagle.tv.unit.material', language);
          } else if (key.toLowerCase().includes('dimension')) {
            translatedKey = getTranslation('product.details.vasagle.tv.unit.dimensions', language);
          } else if (key.toLowerCase().includes('weight')) {
            translatedKey = getTranslation('product.details.vasagle.tv.unit.weight', language);
          } else if (key.toLowerCase() === 'volume') {
            translatedKey = getTranslation('product.details.vasagle.tv.unit.volume', language);
          } else if (key.toLowerCase() === 'size') {
            translatedKey = getTranslation('product.details.vasagle.tv.unit.size', language);
          } else if (key.toLowerCase() === 'style') {
            translatedKey = getTranslation('product.details.vasagle.tv.unit.style', language);
          } else if (key.toLowerCase() === 'assembly') {
            translatedKey = getTranslation('product.details.vasagle.tv.unit.assembly', language);
          } else if (key.toLowerCase() === 'shape') {
            translatedKey = getTranslation('product.details.vasagle.tv.unit.shape', language);
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
            translatedKey = getTranslation('product.details.feandrea.cat.tree.brand', language);
          } else if (key.toLowerCase() === 'color') {
            translatedKey = getTranslation('product.details.feandrea.cat.tree.color', language);
          } else if (key.toLowerCase() === 'material') {
            translatedKey = getTranslation('product.details.feandrea.cat.tree.material', language);
          } else if (key.toLowerCase().includes('dimension')) {
            translatedKey = getTranslation('product.details.feandrea.cat.tree.dimensions', language);
          } else if (key.toLowerCase().includes('weight')) {
            translatedKey = getTranslation('product.details.feandrea.cat.tree.weight', language);
          } else if (key.toLowerCase() === 'size') {
            translatedKey = getTranslation('product.details.feandrea.cat.tree.size', language);
          } else if (key.toLowerCase().includes('breed')) {
            translatedKey = getTranslation('product.details.feandrea.cat.tree.breed', language);
          } else if (key.toLowerCase().includes('uses')) {
            translatedKey = getTranslation('product.details.feandrea.cat.tree.uses', language);
          } else if (key.toLowerCase().includes('recommended')) {
            translatedKey = getTranslation('product.details.feandrea.cat.tree.recommended', language);
          }
        } else if (productId === 'pawz-road-cat-tree') {
          // PAWZ Road Cat Tree translations
          if (key.toLowerCase() === 'brand') {
            translatedKey = getTranslation('product.details.pawz.road.cat.tree.brand', language);
          } else if (key.toLowerCase() === 'color') {
            translatedKey = getTranslation('product.details.pawz.road.cat.tree.color', language);
          } else if (key.toLowerCase() === 'material') {
            translatedKey = getTranslation('product.details.pawz.road.cat.tree.material', language);
          } else if (key.toLowerCase().includes('dimension')) {
            translatedKey = getTranslation('product.details.pawz.road.cat.tree.dimensions', language);
          } else if (key.toLowerCase().includes('weight')) {
            translatedKey = getTranslation('product.details.pawz.road.cat.tree.weight', language);
          } else if (key.toLowerCase() === 'size') {
            translatedKey = getTranslation('product.details.pawz.road.cat.tree.size', language);
          } else if (key.toLowerCase().includes('breed')) {
            translatedKey = getTranslation('product.details.pawz.road.cat.tree.breed', language);
          } else if (key.toLowerCase().includes('uses')) {
            translatedKey = getTranslation('product.details.pawz.road.cat.tree.uses', language);
          } else if (key.toLowerCase().includes('recommended')) {
            translatedKey = getTranslation('product.details.pawz.road.cat.tree.recommended', language);
          }
        } else if (productId.includes('keter')) {
          // Keter Products translations
          if (key.toLowerCase() === 'brand') {
            translatedKey = getTranslation('product.details.keter.brand', language);
          } else if (key.toLowerCase() === 'color') {
            translatedKey = getTranslation('product.details.keter.color', language);
          } else if (key.toLowerCase() === 'material') {
            translatedKey = getTranslation('product.details.keter.material', language);
          } else if (key.toLowerCase().includes('dimension')) {
            translatedKey = getTranslation('product.details.keter.dimensions', language);
          } else if (key.toLowerCase().includes('weight')) {
            translatedKey = getTranslation('product.details.keter.weight', language);
          } else if (key.toLowerCase() === 'capacity') {
            translatedKey = getTranslation('product.details.keter.capacity', language);
          } else if (key.toLowerCase() === 'style') {
            translatedKey = getTranslation('product.details.keter.style', language);
          } else if (key.toLowerCase() === 'assembly') {
            translatedKey = getTranslation('product.details.keter.assembly', language);
          } else if (key.toLowerCase() === 'shape') {
            translatedKey = getTranslation('product.details.keter.shape', language);
          }
        }
        
        translatedDetails[translatedKey] = value;
      });
      
      // Add additional translated details
      translatedDetails[getTranslation('product.detail.brand', language)] = productBrand;
      if (productDimensions) {
        translatedDetails[getTranslation('product.detail.product.dimensions', language)] = productDimensions;
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
    reviews: productReviews.map(review => {
      // Translate review titles and content based on the review text
      let translatedTitle = review.title;
      let translatedContent = review.content;
      
      // Check if this is a Keter City Storage Box review and translate accordingly
      if (productId === 'keter-city-storage-box') {
        // Translate titles
        if (review.title === 'It\'s perfect 👌') {
          translatedTitle = getTranslation('product.review.keter.city.title.perfect', getCountryConfig(selectedCountry.code).language);
        } else if (review.title === 'Great assembly, nice product, good value.') {
          translatedTitle = getTranslation('product.review.keter.city.title.great.assembly', getCountryConfig(selectedCountry.code).language);
        } else if (review.title === 'Keter Storage Box') {
          translatedTitle = getTranslation('product.review.keter.city.title.keter.storage.box', getCountryConfig(selectedCountry.code).language);
        } else if (review.title === 'Solid so far so good') {
          translatedTitle = getTranslation('product.review.keter.city.title.solid.so.far', getCountryConfig(selectedCountry.code).language);
        }
        
        // Translate content
        if (review.content.includes('Absolutely perfect! So very pleased with this garden storage container')) {
          translatedContent = getTranslation('product.review.keter.city.content.perfect', getCountryConfig(selectedCountry.code).language);
        } else if (review.content.includes('This was really well packed. All pieces fitted together well')) {
          translatedContent = getTranslation('product.review.keter.city.content.great.assembly', getCountryConfig(selectedCountry.code).language);
        } else if (review.content.includes('Bought this as a parcel box for the front door')) {
          translatedContent = getTranslation('product.review.keter.city.content.keter.storage.box', getCountryConfig(selectedCountry.code).language);
        } else if (review.content.includes('I recently bought this Keter City 113L outdoor storage box')) {
          translatedContent = getTranslation('product.review.keter.city.content.solid.so.far', getCountryConfig(selectedCountry.code).language);
        }
      } else if (productId === 'keter-bevy-bar') {
        // Translate Keter Bevy Bar review titles
        if (review.title === 'Excellent size for what I needed') {
          translatedTitle = getTranslation('product.review.keter.bevy.bar.title.excellent.size', getCountryConfig(selectedCountry.code).language);
        } else if (review.title === 'Great cool box') {
          translatedTitle = getTranslation('product.review.keter.bevy.bar.title.great.cool.box', getCountryConfig(selectedCountry.code).language);
        } else if (review.title === 'Worth the price') {
          translatedTitle = getTranslation('product.review.keter.bevy.bar.title.worth.price', getCountryConfig(selectedCountry.code).language);
        } else if (review.title === 'Nice looking multifunctional table') {
          translatedTitle = getTranslation('product.review.keter.bevy.bar.title.nice.looking.multifunctional', getCountryConfig(selectedCountry.code).language);
        } else if (review.title === 'Statement piece') {
          translatedTitle = getTranslation('product.review.keter.bevy.bar.title.statement.piece', getCountryConfig(selectedCountry.code).language);
        }
        
        // Translate Keter Bevy Bar review content
        if (review.content.includes('Perfect size and shape. Very sturdy and easy to use/ move around in the garden')) {
          translatedContent = getTranslation('product.review.keter.bevy.bar.content.excellent.size', getCountryConfig(selectedCountry.code).language);
        } else if (review.content.includes('Great cool box which turns into a decent height table')) {
          translatedContent = getTranslation('product.review.keter.bevy.bar.content.great.cool.box', getCountryConfig(selectedCountry.code).language);
        } else if (review.content.includes('Great for hosting, I left the box outside for guests to take their drinks')) {
          translatedContent = getTranslation('product.review.keter.bevy.bar.content.worth.price', getCountryConfig(selectedCountry.code).language);
        } else if (review.content.includes('Really well made, solid outdoors table. The table top lifts up to show the ice bucket below')) {
          translatedContent = getTranslation('product.review.keter.bevy.bar.content.nice.looking.multifunctional', getCountryConfig(selectedCountry.code).language);
        } else if (review.content.includes('Great addition to the summer BBQs. Very easy to assemble and adjust')) {
          translatedContent = getTranslation('product.review.keter.bevy.bar.content.statement.piece', getCountryConfig(selectedCountry.code).language);
        }
      } else if (productId === 'pawz-road-cat-tree') {
        // Translate PAWZ Road Cat Tree review titles
        if (review.title === 'Gets my cats approval') {
          translatedTitle = getTranslation('product.review.pawz.road.cat.tree.title.gets.cats.approval', getCountryConfig(selectedCountry.code).language);
        } else if (review.title === 'Looks lovely, cats happy') {
          translatedTitle = getTranslation('product.review.pawz.road.cat.tree.title.looks.lovely.cats.happy', getCountryConfig(selectedCountry.code).language);
        } else if (review.title === 'Perfect for larger cats!') {
          translatedTitle = getTranslation('product.review.pawz.road.cat.tree.title.perfect.larger.cats', getCountryConfig(selectedCountry.code).language);
        } else if (review.title === 'Lovely lil purchase') {
          translatedTitle = getTranslation('product.review.pawz.road.cat.tree.title.lovely.lil.purchase', getCountryConfig(selectedCountry.code).language);
        } else if (review.title === 'My cat likes it but I think the design & build could be more cat friendly') {
          translatedTitle = getTranslation('product.review.pawz.road.cat.tree.title.cat.likes.design.build', getCountryConfig(selectedCountry.code).language);
        }
        
        // Translate PAWZ Road Cat Tree review content
        if (review.content.includes('Nice sturdy cat tree which was bought to replace one that eventually became wobbly with age')) {
          translatedContent = getTranslation('product.review.pawz.road.cat.tree.content.gets.cats.approval', getCountryConfig(selectedCountry.code).language);
        } else if (review.content.includes('As usual the numbers/letter were incorrect on the items')) {
          translatedContent = getTranslation('product.review.pawz.road.cat.tree.content.looks.lovely.cats.happy', getCountryConfig(selectedCountry.code).language);
        } else if (review.content.includes('Our very large snowshoe cat always struggles to squeeze herself onto most cat trees')) {
          translatedContent = getTranslation('product.review.pawz.road.cat.tree.content.perfect.larger.cats', getCountryConfig(selectedCountry.code).language);
        } else if (review.content.includes('Seems pretty decent quality for the price')) {
          translatedContent = getTranslation('product.review.pawz.road.cat.tree.content.lovely.lil.purchase', getCountryConfig(selectedCountry.code).language);
        } else if (review.content.includes('Overall it\'s a pretty good product, was easy to put together')) {
          translatedContent = getTranslation('product.review.pawz.road.cat.tree.content.cat.likes.design.build', getCountryConfig(selectedCountry.code).language);
        }
      } else if (productId === 'vasagle-tv-unit') {
        // Translate VASAGLE TV Unit review titles
        if (review.title === 'Easy to assemble, quick delivery, value for money, beautiful furniture') {
          translatedTitle = getTranslation('product.review.vasagle.tv.unit.title.easy.assemble.quick.delivery', getCountryConfig(selectedCountry.code).language);
        } else if (review.title === 'This quality, at this price....buy it!') {
          translatedTitle = getTranslation('product.review.vasagle.tv.unit.title.quality.price.buy.it', getCountryConfig(selectedCountry.code).language);
        } else if (review.title === 'Great value for money') {
          translatedTitle = getTranslation('product.review.vasagle.tv.unit.title.great.value.money', getCountryConfig(selectedCountry.code).language);
        } else if (review.title === 'Good value') {
          translatedTitle = getTranslation('product.review.vasagle.tv.unit.title.good.value', getCountryConfig(selectedCountry.code).language);
        } else if (review.title === 'Great tv unit.') {
          translatedTitle = getTranslation('product.review.vasagle.tv.unit.title.great.tv.unit', getCountryConfig(selectedCountry.code).language);
        }
        
        // Translate VASAGLE TV Unit review content
        if (review.content.includes('I had the bright idea of buying two of these to make a longer stronger tv unit')) {
          translatedContent = getTranslation('product.review.vasagle.tv.unit.content.easy.assemble.quick.delivery', getCountryConfig(selectedCountry.code).language);
        } else if (review.content.includes('I needed a tv unit for a large tv in a smaller space')) {
          translatedContent = getTranslation('product.review.vasagle.tv.unit.content.quality.price.buy.it', getCountryConfig(selectedCountry.code).language);
        } else if (review.content.includes('A solid tv unit, much higher quality than more expensive high street brands')) {
          translatedContent = getTranslation('product.review.vasagle.tv.unit.content.great.value.money', getCountryConfig(selectedCountry.code).language);
        } else if (review.content.includes('Some slight damage to the top piece of wood, but not too noticeable')) {
          translatedContent = getTranslation('product.review.vasagle.tv.unit.content.good.value', getCountryConfig(selectedCountry.code).language);
        } else if (review.content.includes('I had a bit of trouble with the delivery. It comes in 2 boxes')) {
          translatedContent = getTranslation('product.review.vasagle.tv.unit.content.great.tv.unit', getCountryConfig(selectedCountry.code).language);
        }
      } else if (productId === 'feandrea-cat-tree') {
        // Translate FEANDREA Cat Tree review titles
        if (review.title === 'Very impressed') {
          translatedTitle = getTranslation('product.review.feandrea.cat.tree.title.very.impressed', getCountryConfig(selectedCountry.code).language);
        } else if (review.title === 'Amazing !') {
          translatedTitle = getTranslation('product.review.feandrea.cat.tree.title.amazing', getCountryConfig(selectedCountry.code).language);
        } else if (review.title === 'Get some larger diameter metal washers, it strengthens the top tube, spreads weight, & sturdier.') {
          translatedTitle = getTranslation('product.review.feandrea.cat.tree.title.larger.metal.washers', getCountryConfig(selectedCountry.code).language);
        } else if (review.title === 'Couldn\'t be happier') {
          translatedTitle = getTranslation('product.review.feandrea.cat.tree.title.couldnt.be.happier', getCountryConfig(selectedCountry.code).language);
        } else if (review.title === 'Great for smaller cats') {
          translatedTitle = getTranslation('product.review.feandrea.cat.tree.title.great.smaller.cats', getCountryConfig(selectedCountry.code).language);
        } else if (review.title === 'Superb quality') {
          translatedTitle = getTranslation('product.review.feandrea.cat.tree.title.superb.quality', getCountryConfig(selectedCountry.code).language);
        } else if (review.title === 'Amazing, sturdy and well structured. Worth the price') {
          translatedTitle = getTranslation('product.review.feandrea.cat.tree.title.amazing.sturdy.well.structured', getCountryConfig(selectedCountry.code).language);
        } else if (review.title === 'Not strong enough for larger, heavier cats!') {
          translatedTitle = getTranslation('product.review.feandrea.cat.tree.title.not.strong.larger.heavier.cats', getCountryConfig(selectedCountry.code).language);
        }
        
        // Translate FEANDREA Cat Tree review content
        if (review.content.includes('Had a feeling when this arrived that I would need help from a friend to assemble this')) {
          translatedContent = getTranslation('product.review.feandrea.cat.tree.content.very.impressed', getCountryConfig(selectedCountry.code).language);
        } else if (review.content.includes('I have never had a complaint about feandrea cat posts and still I can\'t complain')) {
          translatedContent = getTranslation('product.review.feandrea.cat.tree.content.amazing', getCountryConfig(selectedCountry.code).language);
        } else if (review.content.includes('After taking delivery of this item today, I set about assembling it')) {
          translatedContent = getTranslation('product.review.feandrea.cat.tree.content.larger.metal.washers', getCountryConfig(selectedCountry.code).language);
        } else if (review.content.includes('Got this during black Friday for €57, worth the price')) {
          translatedContent = getTranslation('product.review.feandrea.cat.tree.content.couldnt.be.happier', getCountryConfig(selectedCountry.code).language);
        } else if (review.content.includes('It\'s really sturdy and looks nice and is fairly simple to assemble')) {
          translatedContent = getTranslation('product.review.feandrea.cat.tree.content.great.smaller.cats', getCountryConfig(selectedCountry.code).language);
        } else if (review.content.includes('As my cats are indoor I needed to get a big multi level one for both my two cats')) {
          translatedContent = getTranslation('product.review.feandrea.cat.tree.content.superb.quality', getCountryConfig(selectedCountry.code).language);
        } else if (review.content.includes('I purchased this product after getting a £40 one of eBay that I thought would be good enough')) {
          translatedContent = getTranslation('product.review.feandrea.cat.tree.content.amazing.sturdy.well.structured', getCountryConfig(selectedCountry.code).language);
        } else if (review.content.includes('Bought this on sale, but £62 or so appears to be the regular price')) {
          translatedContent = getTranslation('product.review.feandrea.cat.tree.content.not.strong.larger.heavier.cats', getCountryConfig(selectedCountry.code).language);
        }
      } else if (productId === 'ninja-foodi-air-fryer') {
        // Translate Ninja Foodi Air Fryer review titles
        if (review.title === 'pays for itself....') {
          translatedTitle = getTranslation('product.review.ninja.air.fryer.title.pays.for.itself', getCountryConfig(selectedCountry.code).language);
        } else if (review.title === 'Saw the show, bought the product') {
          translatedTitle = getTranslation('product.review.ninja.air.fryer.title.saw.show.bought.product', getCountryConfig(selectedCountry.code).language);
        } else if (review.title === 'Excellent quality and performance') {
          translatedTitle = getTranslation('product.review.ninja.air.fryer.title.excellent.quality.performance', getCountryConfig(selectedCountry.code).language);
        } else if (review.title === 'Best kitchen investment ever!') {
          translatedTitle = getTranslation('product.review.ninja.air.fryer.title.best.kitchen.investment', getCountryConfig(selectedCountry.code).language);
        } else if (review.title === 'Fantastic air fryer!') {
          translatedTitle = getTranslation('product.review.ninja.air.fryer.title.fantastic.air.fryer', getCountryConfig(selectedCountry.code).language);
        }
        
        // Translate Ninja Foodi Air Fryer review content
        if (review.content.includes('The best thing about this product is that it pays for itself through energy savings')) {
          translatedContent = getTranslation('product.review.ninja.air.fryer.content.pays.for.itself', getCountryConfig(selectedCountry.code).language);
        } else if (review.content.includes('I saw this on TV and thought it looked good')) {
          translatedContent = getTranslation('product.review.ninja.air.fryer.content.saw.show.bought.product', getCountryConfig(selectedCountry.code).language);
        } else if (review.content.includes('I\'ve been using this air fryer for several months now and I\'m extremely impressed')) {
          translatedContent = getTranslation('product.review.ninja.air.fryer.content.excellent.quality.performance', getCountryConfig(selectedCountry.code).language);
        } else if (review.content.includes('I was hesitant about buying an air fryer, but this Ninja model exceeded all my expectations')) {
          translatedContent = getTranslation('product.review.ninja.air.fryer.content.best.kitchen.investment', getCountryConfig(selectedCountry.code).language);
        } else if (review.content.includes('This Ninja air fryer has completely transformed my cooking')) {
          translatedContent = getTranslation('product.review.ninja.air.fryer.content.fantastic.air.fryer', getCountryConfig(selectedCountry.code).language);
        }
      }
      
      return {
        ...review,
        title: translatedTitle,
        content: translatedContent
      };
    }),
    colorOptions: productColorOptions.map(option => ({
      name: option.name,
      price: selectedCountry.code === 'gb' ? productPrice.gb : 
             selectedCountry.code === 'dk' ? productPrice.dk :
             selectedCountry.code === 'no' ? productPrice.no :
             selectedCountry.code === 'es' ? productPrice.es :
             selectedCountry.code === 'ch' ? productPrice.ch :
             productPrice.default,
      available: option.available
    })),
    sizeOptions: productSizeOptions.map(option => ({
      name: option.name,
      price: selectedCountry.code === 'gb' ? productPrice.gb : 
             selectedCountry.code === 'dk' ? productPrice.dk :
             selectedCountry.code === 'no' ? productPrice.no :
             selectedCountry.code === 'es' ? productPrice.es :
             selectedCountry.code === 'ch' ? productPrice.ch :
             productPrice.default,
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
      } else if (productId === 'keter-bevy-bar') {
        if (feature === 'UV treated') {
          return getTranslation('product.safety.uv.treated', getCountryConfig(selectedCountry.code).language);
        } else if (feature === 'Insulated') {
          return getTranslation('product.safety.insulated', getCountryConfig(selectedCountry.code).language);
        } else if (feature === 'Maintenance-free') {
          return getTranslation('product.safety.maintenance.free', getCountryConfig(selectedCountry.code).language);
        } else if (feature === 'Lockable design') {
          return getTranslation('product.safety.lockable.design', getCountryConfig(selectedCountry.code).language);
        } else if (feature === 'Weather resistant') {
          return getTranslation('product.safety.weather.resistant', getCountryConfig(selectedCountry.code).language);
        } else if (feature === 'Child-safe construction') {
          return getTranslation('product.safety.child.safe.construction', getCountryConfig(selectedCountry.code).language);
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
        redirectUrl: 'https://linkly.link/2C4ln'
      },
      {
        countryCode: 'DK',
        redirectUrl: 'https://linkly.link/2DexE'
      },
      {
        countryCode: 'NO',
        redirectUrl: 'https://linkly.link/2Dexv'
      }
    ]
  }), [selectedCountry.code, productId, productName, productBrand, productRating, productRatingsCount, productBoughtInMonth, productPrice, productOriginalPrice, productDiscount, productImages, productBreadcrumb, productFeatures, productAboutThisItem, productDetails, productTechnicalDetails, productReviews, productColorOptions, productSizeOptions, productVariants, productStockCount, productQuantityLimit, productSafetyFeatures, productInfo, productCategory, productMaterial, productCapacity, productWarranty, productRecycledContent, productPartNumber, productModelNumber, productASIN, productDateFirstAvailable, productDimensions, productWeight, productVolume, productSeatHeight, productStorageCapacity, productLockable, productAssemblyTime, productStyle, productPattern, productShape, productBatteriesRequired, productPackageQuantity]);

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

export default ProductPage2;
