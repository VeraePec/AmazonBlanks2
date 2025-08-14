// Centralized Product Registry
// Add all your product pages here and they'll automatically appear on the home page

export interface Product {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  rating: number;
  reviews: number;
  image: string;
  images?: string[];
  prime: boolean;
  amazonChoice?: boolean;
  category: string;
  route?: string; // The route to the product page
  description?: string;
  features?: string[];
  collection?: string; // For homepage collections
  createdAt?: number; // Timestamp for sorting (AI products have this)
}

export interface ProductCollection {
  id: string;
  title: string;
  subtitle?: string;
  products: Product[];
}

// Lazy load dynamic products to avoid circular dependencies
const getDynamicProductsLazy = (): any[] => {
  try {
    // For now, return empty array to avoid async complexity
    return [];
  } catch (error) {
    console.warn('Could not load dynamic products (registry may not be initialized yet):', error);
    return [];
  }
};

export const productRegistry: Product[] = [
  // Your existing product pages

  {
    id: 'bedside-cabinet',
    name: 'Vida Designs White Bedside Cabinet',
    price: '£9.99',
    originalPrice: '£99.99',
    rating: 4.3,
    reviews: 1751,
    image: '/lovable-uploads/3a981dc9-7942-4f6b-802f-4ede10aee488.png',
    prime: true,
    amazonChoice: true,
    category: 'Home & Garden',
    route: '/bedside-cabinet',
    description: 'Modern white bedside cabinet with storage',
    features: ['Solid wood construction', 'Easy assembly', 'Multiple color options'],
    collection: 'bedroom-furniture',
    createdAt: 1704067200000 // January 1, 2024
  },
  {
    id: 'storage-organizer',
    name: 'Amazon Basics Extra Wide Fabric 5-Drawer Storage Organizer Unit',
    price: '£9.99',
    originalPrice: '£99.99',
    rating: 4.5,
    reviews: 6534,
    image: 'https://m.media-amazon.com/images/I/A1j7MYhY6JL._AC_SL1500_.jpg',
    prime: true,
    category: 'Home & Kitchen',
    route: '/storage-organizer',
    description: '5-drawer fabric storage organizer for closets and bedrooms',
    features: ['5 removable fabric drawers', 'Sturdy steel frame', 'Easy assembly', 'Adjustable feet'],
    collection: 'storage-solutions',
    createdAt: 1704153600000 // January 2, 2024
  },
  {
    id: 'nicehill-dresser',
    name: 'Nicehill Dresser for Bedroom with 5 Drawers, Storage Organizer, Wide Chest of Drawers for Closet, Clothes, Kids, Baby, TV Stand, Wood Board, Fabric Drawers(Black Grey),30*100*61',
    price: '£9.99',
    originalPrice: '£99.99',
    rating: 4.5,
    reviews: 4630,
    image: 'https://m.media-amazon.com/images/I/81zPSAFB75L._AC_SL1500_.jpg',
    prime: true,
    category: 'Home & Kitchen',
    route: '/nicehill-dresser',
    description: 'MULTIFUNCTIONAL DRESSER: This chest of drawers is great for bedroom, closet, living room, nursery room, hallway and bedside',
    features: [
      'LARGE STORAGE SPACE: This 5-drawer dresser for bedroom is ideal for organizing lingerie, blankets, underwear as well as clothes of your kids and babies',
      'PREMIUM MATERIAL: We choose premium material which is harder, smoother, brighter, more durable and not easy to get wrinkled and moldy',
      'STURDY DRAWER ORGANIZER: Thickened wooden top board and metal frame with reinforced solder joints make this dresser stronger',
      'SAFETY CARE: Anti-tip kits is included. Don\'t worry about naughty boys or girls. Assembly usually only takes no more than half an hour'
    ],
    collection: 'bedroom-furniture',
    createdAt: 1704240000000 // January 3, 2024
  },
  {
    id: 'vacuum-cleaner',
    name: 'Amazon Basics Cylinder Bagless Vacuum Cleaner with HEPA filter for Hardfloor, Carpet & Car, Compact & Lightweight, 700W, 1.5L, Black',
    price: '£9.99',
    originalPrice: '£99.99',
    rating: 4.4,
    reviews: 11569,
    image: 'https://m.media-amazon.com/images/I/71dvtiSQt5S._AC_SL1500_.jpg',
    prime: true,
    amazonChoice: true,
    category: 'Home & Kitchen',
    route: '/vacuum-cleaner',
    description: '700W bagless cylinder vacuum cleaner with HEPA filter',
    features: ['700W motor', 'HEPA filter', '1.5L capacity', 'Lightweight', 'Multiple attachments'],
    collection: 'cleaning-essentials',
    createdAt: 1704326400000 // January 4, 2024
  },
  {
    id: 'storage-shelf',
    name: 'Amazon Basics 5-Shelf Storage Unit With Height Adjustable Shelves and Levelling Feet, 795 kg Max Weight, Black, 35.6 D x 91.4 W x 182.9 H cm',
    price: '£9.99',
    originalPrice: '£99.99',
    rating: 4.6,
    reviews: 246241,
    image: 'https://m.media-amazon.com/images/I/71ZPJe9hoLL._AC_SL1500_.jpg',
    prime: true,
    amazonChoice: true,
    category: 'Home & Kitchen',
    route: '/storage-shelf',
    description: '5-shelf storage unit with adjustable shelves and levelling feet',
    features: ['5 adjustable shelves', '795kg max weight', 'Height adjustable', 'Levelling feet', 'Guardrails'],
    collection: 'storage-solutions',
    createdAt: 1704412800000 // January 5, 2024
  },
  {
    id: 'security-safe',
    name: 'Amazon Basics Fire Resistant Security Safe with Programmable Electronic Keypad, 60 l, Black, 43 cm W x 35 cm Dx 66 cm H',
    price: '£9.99',
    originalPrice: '£99.99',
    rating: 4.2,
    reviews: 2740,
    image: 'https://m.media-amazon.com/images/I/71oKOv71hBL._AC_SL1500_.jpg',
    prime: true,
    amazonChoice: true,
    category: 'DIY & Tools',
    route: '/security-safe',
    description: 'Fire resistant security safe with electronic keypad',
    features: ['Fire resistant', 'Electronic keypad', '60L capacity', 'Wall mountable', 'Backup keys'],
    collection: 'security-safety',
    createdAt: 1704499200000 // January 6, 2024
  },
  {
    id: 'stick-vacuum',
    name: 'Amazon Basics 2-in-1 Corded Upright Vacuum Cleaner, ECO Motor, HEPA filtration, Lightweight Stick, Black',
    price: '£9.99',
    originalPrice: '£99.99',
    rating: 4.1,
    reviews: 3171,
    image: 'https://m.media-amazon.com/images/I/61fRYNOGoDL._AC_SL1500_.jpg',
    prime: true,
    amazonChoice: true,
    category: 'Home & Kitchen',
    route: '/stick-vacuum',
    description: '2-in-1 corded stick vacuum with HEPA filtration',
    features: ['2-in-1 design', 'HEPA filter', 'Lightweight', '6m cord', 'Swivel brush'],
    collection: 'cleaning-essentials',
    createdAt: 1704585600000 // January 7, 2024
  },
  {
    id: 'gaming-desk',
    name: 'Amazon Basics Height-Adjustable Rectangular Gaming Computer Desk with Raised Monitor Shelf, Blue, 140 x 63.5 x109-126 cm',
    price: '£9.99',
    originalPrice: '£99.99',
    rating: 4.5,
    reviews: 234,
    image: 'https://m.media-amazon.com/images/I/61cSk9gJPnS._AC_SL1500_.jpg',
    prime: true,
    amazonChoice: true,
    category: 'Home & Kitchen',
    route: '/gaming-desk',
    description: 'Height-adjustable gaming desk with raised monitor shelf',
    features: ['Height adjustable', 'Raised monitor shelf', '140cm wide desktop', 'Durable construction', 'Easy assembly'],
    collection: 'office-gaming',
    createdAt: 1704672000000 // January 8, 2024
  },
  {
    id: 'garden-chair',
    name: 'Amazon Basics High-Back 5-Position Adjustable and Foldable Outdoor, Garden, Patio Furniture & Camping Chair with Side Arms, Set of 2, 69D x 60,5W x 110H cm, Grey',
    price: '£9.99',
    originalPrice: '£99.99',
    rating: 4.6,
    reviews: 1507,
    image: 'https://m.media-amazon.com/images/I/912vcDn1qeL._AC_SL1500_.jpg',
    prime: true,
    amazonChoice: true,
    category: 'Garden',
    route: '/garden-chair',
    description: 'High-back 5-position adjustable and foldable outdoor garden chair',
    features: ['5-position adjustable backrest', 'Foldable design', 'Weather resistant', '113kg weight capacity', 'Lightweight and portable'],
    collection: 'garden-outdoor',
    createdAt: 1704758400000 // January 9, 2024
  },
  {
    id: 'baby-cot',
    name: 'Love For Sleep TOKYO Baby Cot Bed 120x60cm FREE Deluxe Aloe Vera Mattress & Safety Wooden Barrier (White/Pine)',
    price: '£9.99',
    originalPrice: '£182.99',
    rating: 4.4,
    reviews: 328,
    image: 'https://m.media-amazon.com/images/I/71zLwxRskhL._AC_SL1500_.jpg',
    prime: true,
    amazonChoice: true,
    category: 'Baby Products',
    route: '/baby-cot',
    description: 'Modern design cot bed made from strong natural pine wood with deluxe Aloe Vera mattress',
    features: ['Made from sturdy natural pine wood', 'Converts to toddler bed', 'Three mattress base positions', 'Large covered drawer', 'Deluxe 6cm foam mattress with Aloe Vera cover'],
    collection: 'baby-nursery',
    createdAt: 1704844800000 // January 10, 2024
  },
  {
    id: 'storage-chest',
    name: 'VASAGLE Storage Chest, Storage Bench, Blanket Box with 2 Safety Hinges, Shoe Storage Bench, Modern Style, 40 x 100 x 46 cm, for Hallway, Bedroom, Living Room, Matte White LSB061T10',
    price: '£9.99',
    originalPrice: '£59.99',
    rating: 4.6,
    reviews: 2980,
    image: 'https://m.media-amazon.com/images/I/51Xtd-TBo8L._AC_SL1500_.jpg',
    prime: true,
    amazonChoice: true,
    category: 'Home & Kitchen',
    route: '/storage-chest',
    description: 'Elegant storage chest with safety hinges and large capacity for blankets, shoes, or toys',
    features: ['Elegant addition to your home', 'Large storage space', 'Handle for comfort, hinge for safety', 'Sturdy construction', 'Easy assembly'],
    collection: 'storage-solutions',
    createdAt: 1704931200000 // January 11, 2024
  }
];

// Helper functions
export const getProductsByCategory = (category: string): Product[] => {
  return productRegistry.filter(product => product.category === category);
};

export const getProductsWithRoutes = (): Product[] => {
  const allProducts = getAllProductsWithCreated();
  return allProducts.filter(product => product.route);
};

export const getProductById = (id: string): Product | undefined => {
  const allProducts = getAllProductsWithCreated();
  return allProducts.find(product => product.id === id);
};

export const getProductByRoute = (route: string): Product | undefined => {
  const allProducts = getAllProductsWithCreated();
  return allProducts.find(product => product.route === route);
};

// Get all products for display on home page
export const getAllProducts = (): Product[] => {
  return productRegistry;
};

// Get featured products (products with routes get priority)
export const getFeaturedProducts = (limit: number = 10): Product[] => {
  const allProducts = getAllProductsWithCreated();
  const productsWithRoutes = allProducts.filter(product => product.route);
  const otherProducts = allProducts.filter(product => !product.route);
  
  // Prioritize products with routes, then add others
  const featured = [...productsWithRoutes, ...otherProducts];
  return featured.slice(0, limit);
};

// Get products by collection
export const getProductsByCollection = (collectionId: string): Product[] => {
  const allProducts = getAllProductsWithCreated();
  return allProducts.filter(product => product.collection === collectionId);
};

// Get all collections with their products
export const getAllCollections = (): ProductCollection[] => {
  const collections: ProductCollection[] = [
    {
      id: 'storage-solutions',
      title: 'Smart Storage Solutions',
      subtitle: 'Organize your home with style',
      products: getProductsByCollection('storage-solutions')
    },
    {
      id: 'bedroom-furniture',
      title: 'Bedroom Essentials',
      subtitle: 'Create your perfect bedroom',
      products: getProductsByCollection('bedroom-furniture')
    },
    {
      id: 'cleaning-essentials',
      title: 'Cleaning Made Easy',
      subtitle: 'Keep your home spotless',
      products: getProductsByCollection('cleaning-essentials')
    },
    {
      id: 'office-gaming',
      title: 'Office & Gaming Setup',
      subtitle: 'Work and play in comfort',
      products: getProductsByCollection('office-gaming')
    },
    {
      id: 'garden-outdoor',
      title: 'Garden & Outdoor',
      subtitle: 'Enjoy your outdoor space',
      products: getProductsByCollection('garden-outdoor')
    },
    {
      id: 'baby-nursery',
      title: 'Baby & Nursery',
      subtitle: 'Everything for your little one',
      products: getProductsByCollection('baby-nursery')
    },
    {
      id: 'security-safety',
      title: 'Security & Safety',
      subtitle: 'Protect what matters most',
      products: getProductsByCollection('security-safety')
    }
  ];
  
  // Filter out empty collections and sort by product count (descending)
  return collections
    .filter(collection => collection.products.length > 0)
    .map(c => ({
      ...c,
      // Humanize title when not provided by translations
      title: c.title || c.id.replace(/-/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase())
    }))
    .sort((a, b) => b.products.length - a.products.length);
};

// Get Amazon's Choice products
export const getAmazonsChoiceProducts = (): Product[] => {
  // Get all products including AI products, then filter for Amazon's Choice
  const allProducts = getAllProductsWithCreated();
  return allProducts.filter(product => product.amazonChoice);
};

// Auto-assign collection based on category and product type
export const autoAssignCollection = (product: Product): string => {
  const name = product.name.toLowerCase();
  const category = product.category.toLowerCase();
  const description = product.description?.toLowerCase() || '';

  // Storage-related products
  if (name.includes('storage') || name.includes('organizer') || name.includes('drawer') || 
      name.includes('shelf') || name.includes('chest') || description.includes('storage')) {
    return 'storage-solutions';
  }
  
  // Bedroom furniture
  if (name.includes('bedside') || name.includes('dresser') || name.includes('cabinet') || 
      category.includes('bedroom') || description.includes('bedroom')) {
    return 'bedroom-furniture';
  }
  
  // Cleaning equipment
  if (name.includes('vacuum') || name.includes('cleaner') || name.includes('cleaning') ||
      description.includes('clean')) {
    return 'cleaning-essentials';
  }
  
  // Gaming/Office equipment
  if (name.includes('gaming') || name.includes('desk') || name.includes('office') ||
      description.includes('gaming') || description.includes('office')) {
    return 'office-gaming';
  }
  
  // Garden & Outdoor
  if (category.includes('garden') || name.includes('outdoor') || name.includes('chair') ||
      description.includes('outdoor') || description.includes('garden')) {
    return 'garden-outdoor';
  }
  
  // Baby products
  if (category.includes('baby') || name.includes('baby') || name.includes('cot') ||
      description.includes('baby') || description.includes('nursery')) {
    return 'baby-nursery';
  }
  
  // Security & Safety
  if (name.includes('safe') || name.includes('security') || category.includes('security') ||
      description.includes('security') || description.includes('safe')) {
    return 'security-safety';
  }
  
  // Default to storage-solutions for home & kitchen items
  if (category.includes('home') || category.includes('kitchen')) {
    return 'storage-solutions';
  }
  
  // Fallback
  return 'featured-products';
};

// Add a new product with auto-collection assignment
export const addProductWithAutoCollection = (product: Omit<Product, 'collection'>): Product => {
  const collection = autoAssignCollection(product as Product);
  const newProduct = { ...product, collection };
  
  // Add to the registry
  productRegistry.push(newProduct);
  
  return newProduct;
};

// Get collection route URL
export const getCollectionRoute = (collectionId: string): string => {
  return `/collection/${collectionId}`;
};

// Get all available collection routes
export const getAllCollectionRoutes = (): { [key: string]: string } => {
  const collections = getAllCollections();
  const routes: { [key: string]: string } = {};
  
  collections.forEach(collection => {
    routes[collection.id] = getCollectionRoute(collection.id);
  });
  
  return routes;
};

// Get created products from localStorage
export const getCreatedProductsFromStorage = (): Product[] => {
  try {
    const savedProducts = localStorage.getItem('createdProducts');
    if (!savedProducts) return [];
    
    const parsedProducts = JSON.parse(savedProducts);
    if (!Array.isArray(parsedProducts)) return [];
    
    return parsedProducts
      .map((product: any) => {
        try {
          // Convert to Product interface format
          const convertedProduct: Product = {
            id: product.id || `created-${Date.now()}`,
            name: product.name || 'Unknown Product',
            price: product.price || '£9.99',
            originalPrice: product.originalPrice,
            rating: product.rating || 4.5,
            reviews: product.reviewCount || product.reviews || Math.floor(Math.random() * 1000) + 100,
            image: (() => {
              // Handle both old and new product formats
              let imageUrl = '/placeholder.svg';
              
              if (product.images && Array.isArray(product.images) && product.images.length > 0) {
                imageUrl = product.images[0];
              } else if (product.image && typeof product.image === 'string') {
                imageUrl = product.image;
              }
              
              console.log('🔍 Loading product for homepage:', {
                productName: product.name,
                hasImagesArray: !!(product.images && product.images.length > 0),
                hasImageProperty: !!product.image,
                finalImageUrl: imageUrl?.substring(0, 100) + '...',
                imageType: imageUrl?.startsWith('data:') ? 'base64' : 'url'
              });
              
              return imageUrl;
            })(),
            prime: true,
            amazonChoice: product.amazonChoice || false,
            category: product.category || 'Home & Kitchen',
            route: product.route || `/${product.id}`,
            description: product.description || 'Product description',
            features: product.features || ['High quality', 'Great value'],
            collection: product.collection || autoAssignCollection(product as Product)
          };
          return convertedProduct;
        } catch (error) {
          console.warn('Error converting created product:', error);
          return null;
        }
      })
      .filter(Boolean) as Product[];
  } catch (error) {
    console.error('Error loading created products:', error);
    return [];
  }
};

// Get all products including created ones
export const getAllProductsWithCreated = (): Product[] => {
  try {
    const staticProducts = getAllProducts();
    const createdProducts = getCreatedProductsFromStorage();
    // For now, return empty array for dynamic products to avoid async complexity
    const aiDynamicProducts: any[] = [];

    // Map AI dynamic products to homepage Product shape and auto-assign collection
    const aiProducts: Product[] = aiDynamicProducts.map((dp: any) => {
      // Ensure route is preserved correctly
      let productRoute = dp.route;
      if (!productRoute && dp.slug) {
        productRoute = dp.slug.startsWith('/') ? dp.slug : `/${dp.slug}`;
      } else if (!productRoute) {
        productRoute = `/${dp.id}`;
      }
      
      // Get the main image - it should be the first image in the array
      // If it's an idb-ref: or blob-ref:, useResolvedImage will handle it
      const mainImage = (dp.images && dp.images.length > 0) ? dp.images[0] : '/placeholder.svg';
      
      console.log('🔍 Mapping AI product for homepage:', {
        productName: dp.name,
        imageCount: dp.images?.length || 0,
        mainImage: mainImage?.substring(0, 100) + '...',
        imageType: mainImage?.startsWith('data:') ? 'base64' : 
                  mainImage?.startsWith('idb-ref:') ? 'idb-ref' :
                  mainImage?.startsWith('blob-ref:') ? 'blob-ref' : 'url'
      });
      
      const mapped: Product = {
        id: dp.id,
        name: dp.name,
        price: dp.price,
        originalPrice: dp.originalPrice,
        rating: dp.rating,
        reviews: dp.reviewCount,
        image: mainImage,
        prime: dp.prime ?? true,
        amazonChoice: dp.amazonChoice ?? false,
        category: dp.category || 'Home & Kitchen',
        route: productRoute,
        description: dp.productInfo?.Description || dp.aboutThisItem?.[0] || '',
        features: dp.features || [],
        collection: '',
        createdAt: dp.createdAt // Include creation timestamp for sorting
      };
      mapped.collection = autoAssignCollection(mapped);
      return mapped;
    });

    // Fallback: Also check localStorage directly for any products that might have been saved
    // Enhancement: if dynamic products exist, read their full records (product_<id>) to get image arrays
    let fallbackProducts: Product[] = [];
    try {
      const dynamicProducts = JSON.parse(localStorage.getItem('dynamicProducts') || '[]');
      const createdProductsStorage = JSON.parse(localStorage.getItem('createdProducts') || '[]');

      const mappedDynamics: Product[] = (dynamicProducts || []).map((dp: any) => {
        // Try to load the full product record to get actual images array
        let full: any = null;
        try {
          const fullStr = localStorage.getItem('product_' + dp.id);
          if (fullStr) full = JSON.parse(fullStr);
        } catch {}

        const imagesArray: string[] = Array.isArray(full?.images) ? full.images : Array.isArray(dp?.images) ? dp.images : [];

        let route = dp?.route;
        if (!route && dp?.slug) route = dp.slug.startsWith('/') ? dp.slug : `/${dp.slug}`;
        if (!route && dp?.id) route = `/${dp.id}`;
        if (!route) route = `/fallback-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        const product: Product = {
          id: dp.id || `fallback-${Date.now()}-${Math.random()}`,
          name: dp.name || 'Unknown Product',
          price: dp.price || '£9.99',
          originalPrice: dp.originalPrice,
          rating: dp.rating || 4.0,
          reviews: dp.reviews || dp.reviewCount || 100,
          image: imagesArray?.[0] || dp.image || '/placeholder.svg',
          // include images array so Thumbnail can prefer it
          // @ts-ignore allow extra field on Product for rendering path
          images: imagesArray,
          prime: dp.prime ?? true,
          amazonChoice: dp.amazonChoice ?? false,
          category: dp.category || 'Home & Kitchen',
          route,
          description: dp.description || dp.aboutThisItem?.[0] || '',
          features: dp.features || [],
          collection: ''
        } as any;
        product.collection = autoAssignCollection(product);
        return product;
      });

      const mappedCreated: Product[] = (createdProductsStorage || []).map((p: any) => {
        let fallbackRoute = p.route;
        if (!fallbackRoute && p.slug) fallbackRoute = p.slug.startsWith('/') ? p.slug : `/${p.slug}`;
        else if (!fallbackRoute && p.id) fallbackRoute = `/${p.id}`;
        else if (!fallbackRoute) fallbackRoute = `/fallback-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        const product: Product = {
          id: p.id || `fallback-${Date.now()}-${Math.random()}`,
          name: p.name || 'Unknown Product',
          price: p.price || '£9.99',
          originalPrice: p.originalPrice,
          rating: p.rating || 4.0,
          reviews: p.reviews || p.reviewCount || 100,
          image: p.image || p.images?.[0] || '/placeholder.svg',
          // pass through any images list present
          // @ts-ignore allow extra field for rendering
          images: Array.isArray(p.images) ? p.images : [],
          prime: p.prime ?? true,
          amazonChoice: p.amazonChoice ?? false,
          category: p.category || 'Home & Kitchen',
          route: fallbackRoute,
          description: p.description || p.aboutThisItem?.[0] || '',
          features: p.features || [],
          collection: ''
        } as any;
        product.collection = autoAssignCollection(product);
        return product;
      });

      // Combine
      fallbackProducts = [...mappedDynamics, ...mappedCreated];
    } catch (fallbackError) {
      console.warn('Fallback product loading failed:', fallbackError);
    }

    // Merge products, with created/AI products taking precedence if same ID
    const mergedProducts: Product[] = [...staticProducts];

    const isRicher = (a?: any, b?: any): boolean => {
      const aHasImages = Array.isArray((a as any)?.images) && (a as any).images.length > 0;
      const bHasImages = Array.isArray((b as any)?.images) && (b as any).images.length > 0;
      if (aHasImages !== bHasImages) return aHasImages; // prefer one with images array
      // Otherwise prefer one whose image is not placeholder
      const aImg = (a as any)?.image;
      const bImg = (b as any)?.image;
      const isPlaceholder = (img: string) => !img || img === '/placeholder.svg';
      if (isPlaceholder(aImg) !== isPlaceholder(bImg)) return !isPlaceholder(aImg);
      return true; // default to new
    };

    const upsert = (p: Product) => {
      const existingIndex = mergedProducts.findIndex(x => x.id === p.id);
      if (existingIndex !== -1) {
        const existing = mergedProducts[existingIndex];
        mergedProducts[existingIndex] = isRicher(p, existing) ? p : existing;
      } else {
        mergedProducts.push(p);
      }
    };

    createdProducts.forEach(upsert);
    aiProducts.forEach(upsert);
    fallbackProducts.forEach(upsert); // Add fallback products

    // Sort products by creation date (most recent first)
    const sortedProducts = mergedProducts.sort((a, b) => {
      // If both have creation dates, sort by most recent
      if (a.createdAt && b.createdAt) {
        return b.createdAt - a.createdAt;
      }
      // If only one has creation date, prioritize it
      if (a.createdAt && !b.createdAt) return -1;
      if (!a.createdAt && b.createdAt) return 1;
      // If neither has creation date, maintain original order
      return 0;
    });

    return sortedProducts;
  } catch (error) {
    console.error('Error merging products:', error);
    // Even if everything fails, try to return at least the static products
    return getAllProducts();
  }
};

// Get all collections including created products
export const getAllCollectionsWithCreated = (): ProductCollection[] => {
  try {
    const allProducts = getAllProductsWithCreated();

    // Group products dynamically by their assigned collection
    const grouped: Record<string, Product[]> = allProducts.reduce((acc, p) => {
      const key = p.collection || 'newcomers';
      if (!acc[key]) acc[key] = [];
      acc[key].push(p);
      return acc;
    }, {} as Record<string, Product[]>);

    const titleize = (id: string) => id
      .replace(/-/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase());

    const collections: ProductCollection[] = Object.entries(grouped).map(([id, products]) => ({
      id,
      title: titleize(id),
      subtitle: undefined,
      products
    }));

    return collections
      .filter(c => c.products.length > 0)
      .map(c => ({
        ...c,
        title: c.id === 'newcomers' ? 'Newcomers' : (c.title || titleize(c.id))
      }))
      .sort((a, b) => b.products.length - a.products.length);
  } catch (error) {
    console.error('Error building collections with created products:', error);
    return getAllCollections(); // Fallback to static collections only
  }
};