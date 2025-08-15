// Translation system for all countries and languages
export interface CountryConfig {
  code: string;
  name: string;
  flag: string;
  language: string;
  currency: string;
  currencySymbol: string;
  default: boolean;
}

export const COUNTRIES: CountryConfig[] = [
  { code: 'gb', name: 'United Kingdom', flag: '🇬🇧', language: 'en', currency: 'GBP', currencySymbol: '£', default: true },
  { code: 'dk', name: 'Denmark', flag: '🇩🇰', language: 'da', currency: 'DKK', currencySymbol: 'kr', default: false },
  { code: 'no', name: 'Norway', flag: '🇳🇴', language: 'no', currency: 'NOK', currencySymbol: 'kr', default: false },
  { code: 'ch', name: 'Switzerland', flag: '🇨🇭', language: 'de', currency: 'CHF', currencySymbol: 'CHF', default: false },
  { code: 'fr', name: 'France', flag: '🇫🇷', language: 'fr', currency: 'EUR', currencySymbol: '€', default: false },
  { code: 'es', name: 'Spain', flag: '🇪🇸', language: 'es', currency: 'EUR', currencySymbol: '€', default: false },
  { code: 'tr', name: 'Turkey', flag: '🇹🇷', language: 'tr', currency: 'TRY', currencySymbol: '₺', default: false },
  { code: 'za', name: 'South Africa', flag: '🇿🇦', language: 'en', currency: 'ZAR', currencySymbol: 'R', default: false }
];

// Translation keys and their translations
export const TRANSLATIONS = {
  en: {
    // Header
    'search.placeholder': 'Search',
    'account.hello': 'Hello, Your Account',
    'account.returns': 'Returns & Orders',
    'account.cart': 'Cart',
    'deliver.to': 'Deliver to',
    
    // Navigation
    'nav.home': 'Home',
    'nav.garden': 'Garden',
    'nav.storage': 'Storage',
    
    // Footer
    'footer.back.to.top': 'Back to top',
    'footer.copyright': '© 1996-2024, Amazon.com, Inc. or its affiliates',
    'footer.change.country': 'Change country/region',
    'footer.get.to.know': 'Get to Know Us',
    'footer.make.money': 'Make Money with Us',
    'footer.payment.products': 'Amazon Payment Products',
    'footer.help.you': 'Let Us Help You',
    
    // Footer Links (moved to main section)
    
    // Product pages
    'product.visit.store': 'Visit the {store} Store',
    'product.out.of.stars': '{rating} out of 5 stars',
    'product.ratings': '{count} ratings',
    'product.bought.in.month': '{count}+ bought in past month',
    'product.name.keter.storage.shed': 'Keter Store it Out Nova Outdoor Garden Storage Shed',
    
    // Delivery and shipping information
    'product.delivery.free': 'FREE delivery',
    'product.delivery.free.date': 'FREE delivery {date}',
    'product.delivery.free.august.17': 'FREE delivery 17 Aug',
    'product.delivery.free.august.17.short': 'FREE delivery 17 Aug',
    
    // Customer review elements
    'reviews.customer.review': 'Customer review',
    'reviews.customer.review.plural': 'Customer reviews',
    'reviews.review.button': 'Review',
    'reviews.review.button.short': 'Review',
    
    // Product information labels
    'product.info.category': 'Category',
    'product.info.brand': 'Brand',
    'product.info.material': 'Material',
    'product.info.capacity': 'Capacity',
    
    // Product detail labels
    'product.detail.brand': 'Brand',
    'product.detail.colour': 'Colour',
    'product.detail.material': 'Material',
    'product.detail.product.dimensions': 'Product Dimensions',
    'product.detail.item.weight': 'Item Weight',
    'product.detail.volume': 'Volume',
    'product.detail.uv.protection': 'UV Protection',
    'product.detail.special.features': 'Special Features',
    'product.detail.usage': 'Usage',
    'product.detail.assembly.time': 'Assembly Time',
    'product.detail.recommended.assembly': 'Recommended Assembly',
    
    // Technical detail labels
    'product.technical.manufacturer': 'Manufacturer',
    'product.technical.part.number': 'Part Number',
    'product.technical.item.model.number': 'Item Model Number',
    'product.technical.size': 'Size',
    'product.technical.style': 'Style',
    'product.technical.pattern': 'Pattern',
    'product.technical.shape': 'Shape',
    'product.technical.item.package.quantity': 'Item Package Quantity',
    'product.technical.batteries.required': 'Batteries Required',
    'product.technical.asin': 'ASIN',
    'product.technical.date.first.available': 'Date First Available',
    
    // Keter product specific translations
    'product.about.keter.storage.shed.1': 'Ideal outdoor storage solution for garden tools and equipment, BBQ and accessories and x2 120L wheelie bins.',
    'product.about.keter.storage.shed.2': 'Elegant wood effect panels that opens from the top or the front and with a lockable feature for secure closure.',
    'product.about.keter.storage.shed.3': 'Heavy-duty floor with built-in support for shelving and 880 L capacity. Shelves not included.',
    'product.about.keter.storage.shed.4': 'Assembled dimensions: 132 x 71.5 x 113.5 cm (L x W x H); internal dimensions: 122 x 61 x 108.8 cm (L x W x H).',
    'product.about.keter.storage.shed.5': 'Weatherproof, zero maintenance, easy clean, fade free construction.',
    'product.about.keter.storage.shed.6': 'Built-in ventilation panels for ample airflow.',
    'product.about.keter.storage.shed.7': 'Two doors on front and a top lid with unique locking system.',
    'product.about.keter.storage.shed.8': 'Can lock doors and top together or just lock doors for child-safe access from above (padlock not included).',
    'product.about.keter.storage.shed.9': 'Assembly time: approximately 20-40 minutes, recommended for 1 person.',
    
    'product.features.keter.storage.shed.1': '880L storage capacity',
    'product.features.keter.storage.shed.2': 'Light Grey with Dark Grey Lid',
    'product.features.keter.storage.shed.3': 'Resin construction with wood effect finish',
    'product.features.keter.storage.shed.4': 'UV resistant and waterproof',
    'product.features.keter.storage.shed.5': 'Lockable for security',
    'product.features.keter.storage.shed.6': 'Built-in shelf support',
    'product.features.keter.storage.shed.7': 'Ventilated design',
    'product.features.keter.storage.shed.8': 'Heavy-duty floor panel',
    'product.features.keter.storage.shed.9': 'Easy assembly',
    'product.features.keter.storage.shed.10': 'Weatherproof outdoor storage',
    
    'product.color.light.grey.dark.cover': 'Light Grey with Dark Cover',
    'product.color.beige.brown': 'Beige Brown',
    'product.color.dark.grey': 'Dark Grey',
    'product.material.resin': 'Resin',
    'product.dimensions.71.5x132x113.5': '71.5D x 132W x 113.5H centimetres',
    'product.weight.21.5kg': '21.5 Kilograms',
    'product.volume.880l': '880 litres',
    'product.uv.resistant': 'UV Resistant',
    'product.special.features.heavy.duty': 'Heavy Duty, Water-Resistant, Waterproof',
    'product.usage.outdoor.storage': 'outdoor storage, indoor storage, garden storage',
    'product.assembly.time.20.40.minutes': '20-40 minutes',
    'product.assembly.recommended.1.person': '1 person',
    'product.size.132x71.5x113.5.cm': '132 x 71.5 x 113.5 cm',
    'product.size.ultra': 'Ultra',
    'product.style.single': 'Single',
    'product.pattern.single': 'Single',
    'product.shape.horizontal': 'Horizontal',
    'product.batteries.no': 'No',
    'product.date.first.available.march.2021': '1 Mar. 2021',
    'product.variant.size': 'Size',
    'product.variant.colour': 'Colour',
    'product.delivery.free.prime': 'Free Prime delivery',
    'product.safety.lockable.design': 'Lockable design',
    'product.safety.uv.resistant': 'UV resistant',
    'product.safety.weatherproof.construction': 'Weatherproof construction',
    'product.category.garden.storage': 'Garden Storage',
    
    'product.review.title.space.saving': 'Your Space-Saving Storage Solution!',
    'product.review.content.space.saving': 'The Keter 249317 Store it Out Nova Outdoor Garden Storage Shed is the perfect storage solution for your outdoor space. With its compact size and clever design, this storage shed offers ample space to keep your garden tools, equipment, and other belongings organized and protected from the elements.',
    'product.review.title.fab': 'Fab',
    'product.review.content.fab': 'Once built, the storage unit appears nice and sturdy. Everything lines up during build and the lock device is a nice touch. You have two holes for locks. I haven\'t noticed any leaks of yet!! Cons, my product didn\'t come with instructions but it took me all of ten minutes to figure out construction and another 10mins to put together. I was informed later, instruction can found on utube!!. That aside, it looks good and all belonging are safe and dry.... so it\'s perfect.',
    'product.review.title.great.product': 'Great product, easy to assemble, neat and tidy storage for garden stuff',
    'product.review.content.great.product': 'Great product, easy to assemble, neat and tidy storage for garden stuff. The only criticism is that it does not have a simple lid stay, so you need to hold up the lid with one hand. So I will make one to hold the lid up as necessary.',
    'product.review.title.waterproof.spacious': 'Waterproof, spacious & easy to build',
    'product.review.content.waterproof.spacious': 'This arrived quickly. Took 30 mins to construct. Very easy to do. Ideal to have second pair of hands to hold pieces in place whilst putting screws in. Watertight, spacious and robust. Nice 😊',
    'product.review.title.bin.storage': 'Bin storage',
    'product.review.content.bin.storage': 'Very lightweight and if honest a little flimsy we have drilled it into the floor to prevent movement. Doesnt fit all of the recycling bins in due to hight it on fits the black ones. Does the job of hiding unsightly bins',
    
    // Customer Reviews
    'reviews.customer.reviews': 'Customer reviews',
    'reviews.all.reviews': 'All reviews',
    'reviews.verified.purchase.only': 'Verified purchase only',
    'reviews.with.images': 'With images',
    'reviews.global.ratings': '{count} global ratings',
    'reviews.out.of.stars': '{rating} out of 5',
    'reviews.verified.purchase': 'Verified Purchase',
    'reviews.reviewed.in': 'Reviewed in the {country} on {date}',
    'reviews.helpful': 'Helpful ({count})',
    'reviews.report': 'Report',
    'reviews.see.all': 'See all reviews',
    'reviews.how.work': 'How customer reviews and ratings work',
    'product.amazons.choice': 'Amazon\'s Choice',
    'product.clearance.sale': 'Clearance Sale',
    'product.clearance.sale.badge': 'Clearance Sale',
    
    // Urgency Messages
    'urgency.clearance.sale': 'Clearance Sale',
    'urgency.people.viewing': '{count} people viewing now',
    'urgency.stock.only.left': 'Stock: Only {count} left',
    'urgency.ends.in': 'Ends in: {time}',
    'urgency.bought.today': 'Bought today: {count} people',
    'urgency.delivery.free.tomorrow': 'Delivery: FREE tomorrow',
    
    // Clearance sale specific
    'clearance.sale.label': 'Clearance sale:',
    'product.lowest.price': 'Lowest price in last 30 days:',
    'product.rrp': 'RRP:',
    'product.save': 'Save {amount} ({percentage})',
    'product.in.stock': 'In Stock',
    // keep single definition of free returns
    'product.free.returns': 'FREE Returns',
    'product.quantity': 'Quantity:',
    'product.add.to.basket': 'Add to Basket',
    'product.buy.now': 'Buy Now',
    'product.secure.transaction': 'Secure transaction',
    'product.ships.from': 'Ships from',
    'product.sold.by': 'Sold by',
    'product.add.to.wishlist': 'Add to Wish List',
    'product.add.gift.options': 'Add gift options',
    'product.about.this.item': 'About this item',
    'product.details': 'Product details',
    'product.technical.details': 'Technical Details',
    'product.customer.reviews': 'Customer reviews',
    'product.global.ratings': '{count} global ratings',
    'product.all.reviews': 'All reviews',
    'product.verified.purchase': 'Verified Purchase',
    'product.see.all.reviews': 'See all reviews',
    'product.delivery.info': 'FREE delivery {date}',
    'product.delivery.to': 'Deliver to {country}',
    'product.usually.dispatched': 'Usually dispatched within 1 to 2 months',
    'product.only.left': 'Only {count} left in stock!',
    'product.free.ups': 'FREE UPS Delivery',
    'product.fast.free.ups': 'Fast, FREE UPS Delivery',
    'product.delivery.tomorrow': 'FREE delivery tomorrow',
    'product.delivery.info.blue': 'FREE delivery {date}',
    'product.stock.count': 'In Stock',
    'product.secure.transaction.text': 'Secure transaction',
    'product.ships.from.text': 'Ships from',
    'product.sold.by.text': 'Sold by',
    'product.add.to.wishlist.text': 'Add to Wish List',
    'product.add.gift.options.text': 'Add gift options',
    'product.about.this.item.text': 'About this item',
    'product.details.text': 'Product details',
    'product.technical.details.text': 'Technical Details',
    'product.customer.reviews.text': 'Customer reviews',
    'product.global.ratings.text': '{count} global ratings',
    'product.all.reviews.text': 'All reviews',
    'product.verified.purchase.text': 'Verified Purchase',
    'product.see.all.reviews.text': 'See all reviews',
    
    // Homepage
    'homepage.todays.deals': 'Today\'s Deals',
    'homepage.see.more': 'See more',
    'homepage.see.all': 'See all',
    'homepage.amazon.choice': 'Amazon\'s Choice',
    'homepage.prime': 'Prime',
    'homepage.free.delivery': 'FREE delivery',
    'homepage.all.products': 'All Products',
    'homepage.all.products.subtitle': 'Discover our complete collection of products',
    'homepage.view.all.products': 'View All Products',
    'product.quantity.warning': 'Maximum {limit} per customer due to high demand clearance sale',
    'trust.delivery.info': '{date}',
    
    // Collections
    'collections.storage.solutions': 'Smart Storage Solutions',
    'collections.storage.subtitle': 'Organize your home with style',
    'collections.bedroom.furniture': 'Bedroom Essentials',
    'collections.bedroom.subtitle': 'Create your perfect bedroom',
    'collections.cleaning.essentials': 'Cleaning Made Easy',
    'collections.cleaning.subtitle': 'Keep your home spotless',
    'collections.office.gaming': 'Office & Gaming Setup',
    'collections.office.subtitle': 'Work and play in comfort',
    'collections.garden.outdoor': 'Garden & Outdoor',
    'collections.garden.subtitle': 'Enjoy your outdoor space',
    'collections.baby.nursery': 'Baby & Nursery',
    'collections.baby.subtitle': 'Everything for your little one',
    'collections.security.safety': 'Security & Safety',
    'collections.security.subtitle': 'Protect what matters most',
    
    // Search
    'search.results.for': 'results for',
    'search.no.results': 'No results found',
    'search.try.adjusting': 'Try adjusting your search or filter criteria',
    'search.all.categories': 'All',
    
    // Navigation menu
    'nav.todays.deals': 'Today\'s Deals',
    'nav.customer.service': 'Customer Service',
    'nav.registry': 'Registry',
    'nav.gift.cards': 'Gift Cards',
    'nav.sell': 'Sell',
    
    // Admin
    'admin.pin.required': 'Admin Access Required',
    'admin.enter.pin': 'Enter your 6-digit PIN to access the Product Builder',
    'admin.access.builder': 'Access Product Builder',
    'admin.back.to.homepage': '← Back to Homepage',
    'admin.product.builder': 'Product Builder',
    'admin.manage.products': 'Manage Products',
    'admin.create.product': 'Create New Product',
    'admin.link.rotator': 'Link Rotator',
    'admin.global.settings': 'Global Settings',
    'admin.country.specific': 'Country-Specific Links',
    'admin.default.link': 'Default Fallback Link',
    'admin.save.settings': 'Save Settings',
    'admin.settings.saved': 'Settings saved successfully!',
    
    // Product Builder
    'builder.product.images': 'Product Images',
    'builder.upload.photos': 'Upload high-quality photos. First image becomes the main thumbnail.',
    'builder.add.images': 'Add Images',
    'builder.product.info': 'Product Information',
    'builder.product.name': 'Product Name',
    'builder.product.price': 'Price',
    'builder.original.price': 'Original Price',
    'builder.product.description': 'Product Description',
    'builder.product.category': 'Category',
    'builder.features': 'Features',
    'builder.add.feature': 'Add Feature',
    'builder.customer.reviews': 'Customer Reviews',
    'builder.review.count': 'Total Review Count (e.g., 12743)',
    'builder.review.count.help': 'This will display as "(12743) reviews" on the product page. Includes both your custom reviews and 4 auto-generated default reviews.',
    'builder.add.review': 'Add Review',
    'builder.reviewer.name': 'Reviewer name',
    'builder.review.title': 'Review title',
    'builder.review.content': 'Review content',
    'builder.verified.purchase': 'Verified Purchase',
    'builder.helpful.votes': 'Helpful votes',
    'builder.save.product': 'Save Product',
    'builder.update.product': 'Update Product',
    'builder.product.saved': 'Product saved successfully!',
    'builder.product.updated': 'Product updated successfully!',
    'builder.delete.product': 'Delete Product',
    'builder.confirm.delete': 'Are you sure you want to delete this product?',
    'builder.product.deleted': 'Product deleted successfully!',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.view': 'View',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.close': 'Close',
    'common.yes': 'Yes',
    'common.no': 'No',
    'common.ok': 'OK',
    
    // Breadcrumb navigation
    'breadcrumb.home.kitchen': 'Home & Kitchen',
    'breadcrumb.furniture': 'Furniture',
    'breadcrumb.bedroom.furniture': 'Bedroom Furniture',
    'breadcrumb.chest.drawers': 'Chest of Drawers',
    'breadcrumb.kitchen.appliances': 'Kitchen & Home Appliances',
    'breadcrumb.vacuums.floor.care': 'Vacuums & Floor Care',
    'breadcrumb.vacuums': 'Vacuums',
    'breadcrumb.cylinder.vacuums': 'Cylinder Vacuums',
    'breadcrumb.baby.products': 'Baby Products',
    'breadcrumb.nursery': 'Nursery',
    'breadcrumb.cots.beds': 'Cots & Beds',
    'breadcrumb.garden.outdoors': 'Garden & Outdoors',
    'breadcrumb.garden.furniture': 'Garden Furniture',
    'breadcrumb.chairs': 'Chairs',
    'breadcrumb.office.products': 'Office Products',
    'breadcrumb.office.furniture': 'Office Furniture',
    'breadcrumb.desks': 'Desks',
    'breadcrumb.security': 'Security',
    'breadcrumb.safes': 'Safes',
    
    // Product page specific (no duplicates)
    'product.style.name': 'Style Name:',
    'product.material.name': 'Material Name:',
    'product.pattern.name': 'Pattern Name:',
    'product.finish.name': 'Finish Name:',
    
    // Vacuum cleaner features
    'feature.vacuum.700w': '700 Watt: Lightweight (9.9lbs), bagless cyclonic vacuum cleaner with triple action nozzle & slide knob to regulate suction',
    'feature.vacuum.hygienic': 'Hygienic: With anti-allergen HEPA 12 filter, to remove odours & capture 99.5 percent of dust, dirt, pollen & allergens',
    'feature.vacuum.quiet': 'Quiet & Efficient: Exceptionally quiet bagless cylinder hoover (78 decibels). With \'A\' energy rating & washable filters',
    'feature.vacuum.convenient': 'Convenient: With easy-to-empty dust cup (1.5L / 50.7oz capacity), smooth-rolling wheels & 1.5m (4.9ft) adjustable hose',
    'feature.vacuum.home.office': 'For Home & Office Use: Ideal to vacuum rugs, carpets, hard floors, upholstery, car interior. Picks up animal fur & hair',
    'feature.vacuum.versatile': 'Versatile: Includes upholstery nozzle, dusting & parquet brush, crevice tool & accessory holder. With 5m (16.4 ft) cord',
    
    // Stick vacuum features
    'feature.stick.design': '2-in-1 customisable design; corded stick vacuum with eco-motor',
    'feature.stick.suction': 'Offers up to 13kPa of suction for powerful cleaning',
    'feature.stick.cord': '6m cord offers up to 7m of cleaning reach for convenient operation',
    'feature.stick.hepa': 'Highly-effective HEPA filter that\'s removable for easy washing',
    'feature.stick.swivel': 'Swivel brush allows for smoother steering and better maneuverability',
    'feature.stick.container': 'Quick and mess-free dust container removal for easy maintenance',
    
    // Security safe features
    'feature.safe.fire.resistant': '60 l fire-resistant safe for protecting digital media, important documents, and other valuables from theft and fire',
    'feature.safe.ul.standard': 'Complies with modified UL 72 Standard for Safety Tests for Fire Resistance of Record Protection Equipment for 20 minutes at 650 degrees Celcius tested by Intertek',
    'feature.safe.construction': 'Durable 14-gauge heavy-duty steel body construction; 5 large 0.75-inch bolts for superior security',
    'feature.safe.keypad': 'Electronic keypad provides quick and easy access; includes back-up key for emergency use',
    'feature.safe.dimensions': 'Exterior measures 16.9 x 13.8 x 26 inch (L x W x H); interior space measurement 15.2 x 9.6 x 24.4 inch (L x W x H)',
    'feature.safe.bolt': 'Contains one M8*60 expansion bolt for secure mounting',
    
    // Storage chest features
    'feature.chest.elegant': 'Elegant addition to your home: Matte white storage bench easily matches the rest of your furniture with ribbed design',
    'feature.chest.storage': 'Large storage space: 100 x 40 x 46 cm size with plenty of storage for blankets, shoes, or toys',
    'feature.chest.handle': 'Handle for comfort, hinge for safety: 2 handles for easy transport, 2 safety hinges prevent finger injuries',
    'feature.chest.sturdy': 'Sturdy construction: Particle board frame supports up to 100kg, perfect as a shoe bench',
    'feature.chest.assembly': 'Easy assembly: Clear instructions included with all necessary tools',
    
    // Bedside cabinet features
    'feature.cabinet.storage': 'Plenty of storage space: Pull-out drawer and spacious cabinet to keep small items like remote controllers, keys, glasses within reach',
    'feature.cabinet.colors': 'Various colour options: Suitable for practically anywhere! Easy to match with other furniture, suitable for many different-style decors',
    'feature.cabinet.durable': 'Durable construction: Strong durable materials to ensure long lasting use with matt surface that\'s easy to clean',
    'feature.cabinet.versatile': 'Versatile use: Can be used not only as a bedside table but also as filing cabinet, storage cabinet or sofa end table',
    'feature.cabinet.size': 'Perfect size: Product Size: H 47 x W 40 x D 36 Cm Approx - ideal for bedroom, living room, dining room, lobby, hallway',
    
    // Dresser features
    'feature.dresser.multifunctional': 'MULTIFUNCTIONAL DRESSER: This chest of drawers is great for bedroom, closet, living room, nursery room, hallway and bedside. It\'s also a TV stand dresser with storage drawers!',
    'feature.dresser.storage': 'LARGE STORAGE SPACE: This 5-drawer dresser for bedroom is ideal for organizing lingerie, blankets, underwear as well as clothes of your kids and babies.',
    'feature.dresser.material': 'PREMIUM MATERIAL: We choose premium material which is harder, smoother, brighter, more durable and not easy to get wrinkled and moldy.',
    'feature.dresser.sturdy': 'STURDY DRAWER ORGANIZER: Thickened wooden top board and metal frame with reinforced solder joints make this dresser stronger.',
    'feature.dresser.safety': 'SAFETY CARE: Anti-tip kits is included. Don\'t worry about naughty boys or girls. Assembly usually only takes no more than half an hour.',
    
    // Gaming desk features
    'feature.desk.durable': 'Durable design: sturdy square-tube metal legs with a wood desktop; overall, consists of 60% metal and 40% particle board with melamine for reliable strength',
    'feature.desk.oversized': 'Oversized desktop: the 140 cm-wide desk can accommodate two large monitors - great for creating an expanded workspace or an immersive gaming experience',
    'feature.desk.adjustable': 'Height adjustable: the built-in handle can be used to manually raise or lower the height of the desk as needed',
    'feature.desk.shelf': 'Raised shelf: provides convenient monitor placement for space savings and more comfortable screen viewing',
    'feature.desk.assembly': 'Easy assembly, the multi-functional gaming desk assembles quickly and easily',
    
    // Garden chair features
    'feature.chair.box': 'In-the-Box: Set of 2 adjustable & long-lasting outdoor chairs. Support maximum weight of up to 113kg',
    'feature.chair.durable': 'Durable: Made of weather-resistant fabric & powder-coated aluminum to withstand snow, rain & sunlight exposure',
    'feature.chair.convenient': 'Convenient: Foldable garden dining chair with five-position adjustable backrest for optimal positioning',
    
    // Storage shelf features - titles only
    'feature.shelf.unit.title': '5-Shelf Shelving Unit:',
    'feature.shelf.unit.desc': 'Made from durable steel construction with black-coated finish; with adjustable levelling feet for increased stability on uneven ground',
    'feature.shelf.adjustable.title': 'Height Adjustable Shelves:',
    'feature.shelf.adjustable.desc': 'Shelves of mobile stand can be adjusted in 2.54cm increments, no tools required',
    'feature.shelf.capacity.title': 'Shelf Capacity:',
    'feature.shelf.capacity.desc': 'Each shelf holds up to 159kg (evenly distributed); total maximum load weight is 795kg',
    'feature.shelf.guardrails.title': 'With Guardrails:',
    'feature.shelf.guardrails.desc': 'Guardrails at the edge of each shelf to prevent items from falling',
    'feature.shelf.versatile.title': 'Versatile:',
    'feature.shelf.versatile.desc': 'Ideal piece of furniture to store household essentials, appliances, dry food, tools and other accessories in kitchen, bathroom, living room or garden',
    
    // Product titles
    'product.title.vacuum.cylinder': 'Amazon Basics Cylinder Bagless Vacuum Cleaner with HEPA filter for Hardfloor, Carpet & Car, Compact & Lightweight, 700W, 1.5L, Black',
    'product.title.vacuum.stick': 'Amazon Basics 2-in-1 Corded Upright Vacuum Cleaner, ECO Motor, HEPA filtration, Lightweight Stick, Black',
    'product.title.security.safe': 'Amazon Basics Fire Resistant Security Safe with Programmable Electronic Keypad, 60 l, Black, 43 cm W x 35 cm Dx 66 cm H',
    'product.title.storage.organizer': 'Amazon Basics Extra Wide Fabric 5-Drawer Storage Organizer Unit for Closet, White',
    'product.title.storage.shelf': 'Amazon Basics 5-Shelf Storage Unit With Height Adjustable Shelves and Levelling Feet, 795 kg Max Weight, Black, 35.6 D x 91.4 W x 182.9 H cm',
    'product.title.storage.chest': 'VASAGLE Storage Chest, Blanket Box with Hinged Lid, Storage Bench, 100 x 40 x 46 cm, White',
    'product.title.bedside.cabinet': 'Vida Designs White Bedside Cabinet, 2 Drawer With Metal Handles & Runners, Unique Anti-Bowing Drawer Support, Riano Bedroom Furniture',
    'product.title.dresser': 'Nicehill Dresser for Bedroom with 5 Drawers, Storage Organizer, Wide Chest of Drawers for Closet, Clothes, Kids, Baby, TV Stand, Wood Board, Fabric Drawers(Black Grey),30*100*61',
    'product.title.gaming.desk': 'HOMCOM Gaming Desk, 140cm Computer Desk with Raised Shelf and Height Adjustment, Office Table with Large Desktop and Steel Frame, Black',
    'product.title.garden.chair': 'Giantex Set of 2 Outdoor Garden Chairs, Patio Dining Chairs with 5-Position Adjustable Backrest, Folding Beach Lounger Chair',
    'product.title.baby.cot': 'Babymore Eva Sleigh Cot Bed Dropside with Drawer - White + Foam Mattress',
    'product.sold.out': 'SOLD OUT',
    'product.climate.friendly': 'Climate Pledge Friendly',
    'product.day.returns': '30-Day Returns',
    'product.returns.eligible': 'This item is eligible for free returns within 30 days of delivery.',
    'product.warranty.included': '2-year warranty included',
    'product.return.policy': '30-day return policy',
    
    // Product specifications
    'spec.brand': 'Brand',
    'spec.colour': 'Colour',
    'spec.material': 'Material',
    'spec.room.type': 'Room type',
    'spec.number.shelves': 'Number of shelves',
    'spec.style': 'Style',
    'spec.finish.type': 'Finish type',
    
    // Product information section
    'spec.product.dimensions': 'Product Dimensions',
    'spec.special.features': 'Special Features',
    'spec.item.weight': 'Item Weight',
    'spec.asin': 'ASIN',
    'spec.date.first.available': 'Date First Available',
    'spec.manufacturer': 'Manufacturer',
    
    // Product features
    'product.feature.high.quality.construction': 'High-quality construction',
    'product.feature.safety.tested': 'Safety tested',
    'product.feature.return.policy': '30-day return policy',
    
    // Product features - generic
    'product.feature.lockable.design': 'Lockable design',
    'product.feature.uv.resistant': 'UV resistant',
    'product.feature.weatherproof.construction': 'Weatherproof construction',
    'product.feature.storage.capacity': 'Storage capacity',
    'product.feature.light.grey.dark.lid': 'Light Grey with Dark Grey Lid',
    'product.feature.resin.construction': 'Resin construction with wood effect finish',
    'product.feature.waterproof': 'Waterproof',
    'product.feature.security': 'Security',
    'product.feature.built.in.shelf.support': 'Built-in shelf support',
    'product.feature.ventilated.design': 'Ventilated design',
    'product.feature.heavy.duty.floor': 'Heavy-duty floor panel',
    'product.feature.easy.assembly': 'Easy assembly',
    'product.feature.outdoor.storage': 'Outdoor storage',
    
    // Store and returns (moved to main section)
    
    // Color and size options
    'product.color.name': 'Color Name',
    'product.size.name': 'Size Name',
    
    // Specification values
    'value.kitchen': 'Kitchen',
    'value.adjustable': 'Adjustable',
    'value.no.wheels': 'No Wheels',
    'value.black.finish': 'Black Finish',
    'value.metal': 'Metal',
    'value.chrome': 'Chrome',
    'value.currently.unavailable': 'Currently unavailable',
    'spec.frame': 'Frame',
    'spec.dimensions': 'Dimensions',
    'spec.drawers': 'Drawers',
    'spec.weight': 'Weight',
    'spec.assembly': 'Assembly',
    'spec.model.number': 'Model Number',
    'spec.frame.material': 'Frame Material',
    'spec.number.drawers': 'Number of Drawers',
    'spec.assembly.required': 'Assembly Required',
    'spec.upc': 'UPC',
    'spec.capacity': 'Capacity',
    'spec.number.speeds': 'Number of Speeds',
    'spec.noise.level': 'Noise Level',
    'spec.filter.type': 'Filter type',
    'spec.included.components': 'Included components',
    'spec.is.cordless': 'Is cordless?',
    'spec.surface.recommendation': 'Surface recommendation',
    'spec.power.source': 'Power source',
    'spec.voltage': 'Voltage',
    
    // Product features
    'feature.extra.wide.organizer': '5-Drawer extra wide fabric storage organizer:',
    'feature.extra.wide.desc': 'Perfect for closets, bedrooms, playrooms, and more',
    'feature.contemporary.look': 'Contemporary, minimal look:',
    'feature.contemporary.desc': 'Fits in nicely with a variety of décor styles',
    'feature.sturdy.frame': 'Sturdy steel frame:',
    'feature.sturdy.desc': 'With laminated wood top for durability',
    'feature.lightweight.drawers': 'Lightweight, extra wide, removable fabric drawers:',
    'feature.lightweight.desc': 'Easy to clean and reorganize',
    'feature.easy.handles': 'Easy pull-out fabric handles:',
    'feature.easy.handles.desc': 'Convenient access to stored items',
    'feature.adjustable.feet': 'Adjustable-height plastic feet:',
    'feature.adjustable.desc': 'Prevents wobbling and floor damage',
    'feature.perfect.spaces': 'Perfect for small spaces:',
    'feature.perfect.desc': 'Ideal for dorm rooms, kid\'s rooms, and compact living areas',
    'feature.easy.assembly': 'Easy assembly:',
    'feature.easy.assembly.desc': 'Simple setup with clear instructions',
    
    // Values for specifications
    'value.white': 'White',
    'value.black': 'Black',
    'value.plastic.wood': 'Plastic Wood',
    'value.alloy.steel': 'Alloy Steel',
    'value.required': 'Required',
    'value.yes': 'Yes',
    'value.space.saving': 'Space Saving, Removable Drawers',
    
    // UI elements
    'ui.maximum.quantity.warning': 'Maximum 1 per customer due to high demand clearance sale',
    'ui.clearance.sale.badge': 'Clearance Sale',
    'ui.secure.transaction': 'Secure transaction',
    
    // Comments and additional UI text
    'ui.red.banner': 'Red Banner',
    'ui.pricing.section': 'Pricing Section',
    'ui.price.history': 'Price History',
    'ui.enhanced.urgency.message': 'Enhanced Urgency Message',
    'ui.color.selection': 'Color Selection',
    'ui.mobile.price.display': 'Mobile Price Display - Amazon Style',
    'ui.price.section': 'Price Section',
    'ui.quantity.warning': 'Quantity Warning',
    'ui.trust.indicators': 'Trust indicators',
    'ui.additional.options': 'Additional Options',
    'ui.product.description.section': 'Product Description Section',
    'ui.2nd.image.above.about': '2nd Image above "About this item" - Mobile only',
    'ui.3rd.image.under.details': '3rd Image under "Product details" - Mobile only',
    'ui.technical.specifications': 'Technical Specifications',
    'ui.2nd.image.above.technical': '2nd Image above Technical Details - Desktop only',
    'ui.customer.reviews.section': 'Customer Reviews Section',
    'ui.product.information': 'Product information',
    
    // Default review content
    'reviews.amazon.customer': 'Amazon Customer',
    'reviews.verified.buyer': 'Verified Buyer',
    'reviews.happy.customer': 'Happy Customer',
    'reviews.great.product': 'Great product!',
    'reviews.good.value': 'Good value for money',
    'reviews.highly.recommended': 'Highly recommended!',
    'reviews.excellent.quality': 'Excellent quality and exceeded my expectations!',
    'reviews.works.expected': 'Very good product with minor considerations',
    'reviews.perfect.needs': 'Perfect! Exactly what I needed',
    
    // Default review content (long reviews)
    'reviews.default.long.1.title': 'Excellent quality and exceeded my expectations!',
    'reviews.default.long.1.content': 'I was initially hesitant about purchasing this product, but I\'m so glad I did! The quality is absolutely outstanding and it has exceeded all my expectations. The build quality is solid, the materials feel premium, and it performs exactly as advertised. I\'ve been using it for several weeks now and it still looks and works like new. The attention to detail is impressive, from the packaging to the finish. I would definitely recommend this to anyone looking for a reliable, high-quality product. It\'s worth every penny and I can see this lasting for years to come. Great value for money!',
    
    'reviews.default.long.2.title': 'Very good product with minor considerations',
    'reviews.default.long.2.content': 'This is a well-made product that delivers on its promises. The quality is good and it functions as expected. I\'ve been using it for about a month now and it\'s holding up well. The design is practical and user-friendly, though there are a couple of minor improvements that could be made. The instructions were clear and easy to follow, and assembly was straightforward. I appreciate the attention to detail in the design, and the materials used feel durable. While it\'s not perfect, it represents good value for the price point. I would recommend it to others, especially if you\'re looking for something reliable and well-built.',
    
    'reviews.default.short.1.title': 'Perfect!',
    'reviews.default.short.1.content': 'Exactly what I was looking for. Great quality and fast delivery.',
    
    'reviews.default.short.2.title': 'Good value',
    'reviews.default.short.2.content': 'Solid product for the price. Works well and looks good.',
    
    // Review dates
    'reviews.date.november.15': '15 November {year}',
    'reviews.date.october.28': '28 October {year}',
    'reviews.date.november.2': '2 November {year}',

    // Footer sections
    'footer.about.us': 'About Us',
    'footer.careers': 'Careers',
    'footer.press.releases': 'Press Releases',
    'footer.amazon.science': 'Amazon Science',
    'footer.sell.products': 'Sell products on Amazon',
    'footer.sell.business': 'Sell on Amazon Business',
    'footer.sell.apps': 'Sell apps on Amazon',
    'footer.become.affiliate': 'Become an Affiliate',
    'footer.business.card': 'Amazon Business Card',
    'footer.shop.points': 'Shop with Points',
    'footer.reload.balance': 'Reload Your Balance',
    'footer.currency.converter': 'Amazon Currency Converter',
    'footer.covid': 'Amazon and COVID-19',
    'footer.your.account': 'Your Account',
    'footer.your.orders': 'Your Orders',
    'footer.shipping.rates': 'Shipping Rates & Policies',

    // Product information section
    'product.information.title': 'Product information',
    'product.technical.details.title': 'Technical Details',
  },
  
  da: { // Danish
    'search.placeholder': 'Søg',
    'account.hello': 'Hej, Din konto',
    'account.returns': 'Returner og ordrer',
    'account.cart': 'Indkøbskurv',
    'deliver.to': 'Lever til',
    
    // Navigation
    'nav.home': 'Hjem',
    'nav.garden': 'Have',
    'nav.storage': 'Opbevaring',
    'product.add.to.basket': 'Tilføj til kurv',
    'product.buy.now': 'Køb nu',
    'product.in.stock': 'På lager',
    'product.free.returns': 'GRATIS returnering',
    'product.quantity': 'Antal:',
    'product.about.this.item': 'Om denne vare',
    'product.customer.reviews': 'Kundeanmeldelser',
    'reviews.customer.reviews': 'Kundeanmeldelser',
    'reviews.out.of.stars': '{rating} ud af 5',
    'product.global.ratings': '{count} globale vurderinger',
    'reviews.how.work': 'Hvordan kundeanmeldelser og vurderinger fungerer',
    'product.delivery.info': 'GRATIS levering {date}',
    'product.delivery.to': 'Lever til {country}',
    'product.usually.dispatched': 'Sendes normalt inden for 1 til 2 måneder',
    'product.only.left': 'Kun {count} tilbage på lager!',
    'product.free.ups': 'GRATIS UPS levering',
    'product.fast.free.ups': 'Hurtig, GRATIS UPS levering',
    'product.delivery.tomorrow': 'GRATIS levering i morgen',
    'product.delivery.info.blue': 'GRATIS levering {date}',
    'product.stock.count': 'På lager',
    'product.secure.transaction.text': 'Sikker transaktion',
    'product.ships.from.text': 'Sendes fra',
    'product.sold.by.text': 'Sælges af',
    'product.add.to.wishlist.text': 'Tilføj til ønskeliste',
    'product.add.gift.options.text': 'Tilføj gaveindpakning',
    'product.about.this.item.text': 'Om denne vare',
    'product.details.text': 'Produktdetaljer',
    'product.technical.details.text': 'Tekniske detaljer',
    'product.customer.reviews.text': 'Kundeanmeldelser',
    'product.global.ratings.text': '{count} globale vurderinger',
    'product.all.reviews.text': 'Alle anmeldelser',
    'product.verified.purchase.text': 'Verificeret køb',
    'product.see.all.reviews.text': 'Se alle anmeldelser',
    'homepage.todays.deals': 'Dagens tilbud',
    'nav.todays.deals': 'Dagens tilbud',
    'nav.customer.service': 'Kundeservice',
    'nav.registry': 'Ønskeliste',
    'nav.gift.cards': 'Gavekort',
    'nav.sell': 'Sælg',
    'homepage.see.more': 'Se mere',
    'homepage.free.delivery': 'GRATIS levering',
    'homepage.all.products': 'Alle produkter',
    'homepage.all.products.subtitle': 'Udforsk vores komplette produktsamling',
    'homepage.view.all.products': 'Se alle produkter',
    'product.quantity.warning': 'Maksimum {limit} per kunde på grund af høj efterspørgsel udsalg',
    'product.secure.transaction': 'Sikker transaktion',
    'product.ships.from': 'Sendes fra',
    'product.sold.by': 'Sælges af',
    'product.add.to.wishlist': 'Tilføj til ønskeliste',
    'product.add.gift.options': 'Tilføj gaveindpakning',
    'product.rrp': 'Vejl. pris:',
    'product.save': 'Spar',
    'product.bought.in.month': '{count}+ købt den sidste måned',
    'product.lowest.price': 'Laveste pris de sidste 30 dage:',
    'homepage.prime': 'Prime',
    
    // Review titles and content - Danish
    'product.review.title.space.saving': 'Din pladsbesparende opbevaringsløsning!',
    'product.review.title.fab': 'Fantastisk',
    'product.review.title.great.product': 'Godt produkt, nem at samle, pæn og ryddelig opbevaring til haveudstyr',
    'product.review.title.waterproof.spacious': 'Vandtæt, rummelig og nem at bygge',
    'product.review.title.bin.storage': 'Skraldespandsopbevaring',
    
    'product.review.content.space.saving': 'Keter 249317 Store it Out Nova udendørs haveopbevaringsskur er den perfekte opbevaringsløsning til dit udendørsrum. Med sin kompakte størrelse og smarte design tilbyder dette opbevaringsskur rigeligt plads til at holde dine haveværktøj, udstyr og andre ejendele organiseret og beskyttet mod elementerne. Pladsbesparende design: Det fremtrædende træk ved Keter Store it Out Nova er dens pladsbesparende design. På trods af sin generøse opbevaringskapacitet tillader skurets kompakte dimensioner på 32 x 71,5 x 113,5 cm, at det nemt kan passe i små udendørsrum, såsom terrasser, altaner eller haver. Rigeligt opbevaringsplads: Lad ikke størrelsen narre dig; dette opbevaringsskur tilbyder masser af plads til at opbevare dine haveessentials og mere. Uanset om det er haveværktøj, puder, udendørs legetøj eller endda cykler, kan du holde dem alle pænt opbevaret og nemt tilgængelige. Vejrbestandig og holdbar: Store it Out Nova er bygget til at modstå elementerne. Fremstillet af høj kvalitet, vejrbestandige materialer, sikrer dette opbevaringsskur, at dine ejendele forbliver tørre og beskyttet mod regn, sol og vind. Nem adgang: De dobbelte døre med et hængsel låg giver nem adgang til indholdet af skuret. Du kan nemt åbne og lukke dørene for at hente eller opbevare genstande uden problemer. Lys grå træ-lignende finish: Skuret har en stilfuld lys grå træ-lignende finish, der tilføjer et strejf af elegance til dit udendørsrum. Det blander sig problemfrit med din haveindretning og komplementerer enhver indstilling. Låsbar for sikkerhed: For øget sikkerhed kommer Store it Out Nova med en indbygget låsemekanisme. Du kan sikkert låse dørene for at holde dine ejendele sikre og beskyttede. Nem samling: Opbevaringsskuret er designet til nem samling, så du kan sætte det op hurtigt og begynde at bruge det med det samme. Alsidig brug: Mens det er perfekt til haveopbevaring, er dette skur også alsidigt i sin brug. Det kan bruges som ekstra opbevaring til din terrasse, poolside eller endda i en garage eller forsyningsområde. Samlet set er Keter 249317 Store it Out Nova udendørs haveopbevaringsskur en smart og praktisk løsning til at holde dit udendørsrum organiseret og ryddeligt. Med sit pladsbesparende design, rigelige opbevaringsplads, vejrbestandig konstruktion og nem adgang, opfylder dette skur alle krav til effektiv udendørs opbevaring. Opgrader din udendørs organisation med Keter Store it Out Nova og nyd et pænt og velholdt haveområde.',
    'product.review.content.fab': 'Fantastisk produkt, nem at samle, pæn og ryddelig opbevaring til haveudstyr. Det eneste problem er, at det ikke har en simpel lågholder, så du skal holde låget oppe med den ene hånd. Så jeg vil lave en til at holde låget oppe efter behov.',
    'product.review.content.great.product': 'Godt produkt, nem at samle, pæn og ryddelig opbevaring til haveudstyr. Den eneste kritik er, at det ikke har en simpel lågholder, så du skal holde låget oppe med den ene hånd. Så jeg vil lave en til at holde låget oppe efter behov.',
    'product.review.content.waterproof.spacious': 'Dette ankom hurtigt. Tog 30 minutter at konstruere. Meget nemt at gøre. Idealt at have et andet par hænder til at holde stykkerne på plads, mens du sætter skruer i. Vandtæt, rummeligt og robust. Pænt.',
    'product.review.content.bin.storage': 'Meget let og ærligt talt lidt skrøbeligt. Vi har boret det fast i gulvet for at forhindre bevægelse. Det passer ikke alle genbrugscontainere på grund af højden, det passer kun de sorte. Gør jobbet med at skjule grimme containere.',
    
    // Product elements
    'product.amazons.choice': 'Amazons valg',
    'product.clearance.sale': 'Udsalg',
    'product.clearance.sale.badge': 'Udsalg',
    'product.climate.friendly': 'Klimaforpliktelse Vennlig',
    'product.day.returns': '30 dagers retur',
    'product.returns.eligible': 'Denne varen er kvalifisert for gratis retur innen 30 dager etter levering.',
    'product.free.delivery': 'GRATIS levering',
    'product.verified.purchase': 'Verifisert kjøp',
    'reviews.see.all': 'Se alle anmeldelser',
    'reviews.reviewed.in': 'Anmeldt i {country} den {date}',
    'reviews.with.images': 'Med billeder',
    'footer.back.to.top': 'Tilbage til toppen',
    'trust.secure': 'Sikker',
    'trust.easy.returns': 'Nem returnering',
    'trust.delivery.info': '{date}',
    
    // Delivery and shipping information
    'product.delivery.free': 'GRATIS levering',
    'product.delivery.free.date': 'GRATIS levering {date}',
    'product.delivery.free.august.17': 'GRATIS levering 17. august',
    'product.delivery.free.august.17.short': 'GRATIS levering 17 aug',
    
    // Customer review elements
    'reviews.customer.review': 'Kundeanmeldelse',
    'reviews.customer.review.plural': 'Kundeanmeldelser',
    'reviews.review.button': 'Anmeldelse',
    'reviews.review.button.short': 'Anmeld',
    
    // Product information labels
    'product.info.category': 'Kategori',
    'product.info.brand': 'Mærke',
    'product.info.material': 'Materiale',
    'product.info.capacity': 'Kapacitet',
    
    // Product detail labels
    'product.detail.brand': 'Mærke',
    'product.detail.colour': 'Farve',
    'product.detail.material': 'Materiale',
    'product.detail.product.dimensions': 'Produktdimensioner',
    'product.detail.item.weight': 'Varevægt',
    'product.detail.volume': 'Volumen',
    'product.detail.uv.protection': 'UV-beskyttelse',
    'product.detail.special.features': 'Særlige funktioner',
    'product.detail.usage': 'Anvendelse',
    'product.detail.assembly.time': 'Samletid',
    'product.detail.recommended.assembly': 'Anbefalet samling',
    
    // Technical detail labels
    'product.technical.manufacturer': 'Producent',
    'product.technical.part.number': 'Varenummer',
    'product.technical.item.model.number': 'Varemodelnummer',
    'product.technical.size': 'Størrelse',
    'product.technical.style': 'Stil',
    'product.technical.pattern': 'Mønster',
    'product.technical.shape': 'Form',
    'product.technical.item.package.quantity': 'Varepakkeantal',
    'product.technical.batteries.required': 'Batterier påkrevd',
    'product.technical.asin': 'ASIN',
    'product.technical.date.first.available': 'Dato først tilgjengelig',
    
    // Urgency Messages
    'urgency.clearance.sale': 'Udsalg',
    'urgency.people.viewing': '{count} personer ser nu',
    'urgency.stock.only.left': 'Lager: Kun {count} tilbage',
    'urgency.ends.in': 'Slutter om: {time}',
    'urgency.bought.today': 'Købt i dag: {count} personer',
    'urgency.delivery.free.tomorrow': 'Levering: GRATIS i morgen',
    
    // Default review content
    'reviews.amazon.customer': 'Amazon Kunde',
    'reviews.verified.buyer': 'Verificeret Køber',
    'reviews.happy.customer': 'Glad Kunde',
    'reviews.great.product': 'Fantastisk produkt!',
    'reviews.good.value': 'God værdi for pengene',
    'reviews.highly.recommended': 'Varmt anbefalet!',
    'reviews.excellent.quality': 'Fremragende kvalitet og overgik mine forventninger!',
    'reviews.works.expected': 'Meget godt produkt med mindre overvejelser',
    'product.name.keter.storage.shed': 'Keter Store it Out Nova Udendørs Haveopbevaring',
    'reviews.perfect.needs': 'Perfekt! Præcis hvad jeg havde brug for',
    
    // Default review content (long reviews)
    'reviews.default.long.1.title': 'Fremragende kvalitet og overgik mine forventninger!',
    'reviews.default.long.1.content': 'Jeg var oprindeligt tøvende med at købe dette produkt, men jeg er så glad for at jeg gjorde det! Kvaliteten er helt udmærket og den har overgået alle mine forventninger. Byggekvaliteten er solid, materialerne føles premium, og den fungerer præcis som annonceret. Jeg har brugt den i flere uger nu, og den ser og fungerer stadig som ny. Opmærksomheden på detaljer er imponerende, fra emballagen til afslutningen. Jeg ville helt bestemt anbefale dette til alle, der leder efter et pålideligt, højkvalitetsprodukt. Det er hver øre værd, og jeg kan se, at dette holder i årevis. Fantastisk værdi for pengene!',
    
    'reviews.default.long.2.title': 'Meget godt produkt med mindre overvejelser',
    'reviews.default.long.2.content': 'Dette er et velgjort produkt, der lever op til sine løfter. Kvaliteten er god, og det fungerer som forventet. Jeg har brugt det i omkring en måned nu, og det holder sig godt. Designet er praktisk og brugervenligt, selv om der er et par mindre forbedringer, der kunne laves. Instruktionerne var klare og nemme at følge, og samlingen var ligetil. Jeg sætter pris på opmærksomheden på detaljer i designet, og de anvendte materialer føles holdbare. Selvom det ikke er perfekt, repræsenterer det god værdi for prisniveauet. Jeg ville anbefale det til andre, især hvis du leder efter noget pålideligt og velbygget.',
    
    'reviews.default.short.1.title': 'Perfekt!',
    'reviews.default.short.1.content': 'Præcis hvad jeg ledte efter. Fantastisk kvalitet og hurtig levering.',
    
    'reviews.default.short.2.title': 'God værdi',
    'reviews.default.short.2.content': 'Solidt produkt til prisen. Fungerer godt og ser godt ud.',
    
    // Review dates
    'reviews.date.november.15': '15. november {year}',
    'reviews.date.october.28': '28. oktober {year}',
    'reviews.date.november.2': '2. november {year}',

    // Footer sections
    'footer.about.us': 'Om os',
    'footer.careers': 'Karrierer',
    'footer.press.releases': 'Pressemeddelelser',
    'footer.amazon.science': 'Amazon Science',
    'footer.sell.products': 'Sælg produkter på Amazon',
    'footer.sell.business': 'Sælg på Amazon Business',
    'footer.sell.apps': 'Sælg apps på Amazon',
    'footer.become.affiliate': 'Bliv affiliate',
    'footer.business.card': 'Amazon Business Card',
    'footer.shop.points': 'Shop med point',
    'footer.reload.balance': 'Genopfyld din saldo',
    'footer.currency.converter': 'Amazon valutaomregner',
    'footer.covid': 'Amazon og COVID-19',
    'footer.your.account': 'Din konto',
    'footer.your.orders': 'Dine ordrer',
    'footer.shipping.rates': 'Fragtrater og politikker',

    // Product information section
    'product.information.title': 'Produktinformation',
    'product.technical.details.title': 'Tekniske detaljer',
    
    // Product specifications
    'spec.product.dimensions': 'Produktdimensioner',
    'spec.special.features': 'Særlige funktioner',
    'spec.item.weight': 'Varevægt',
    'spec.asin': 'ASIN',
    'spec.date.first.available': 'Dato først tilgængelig',
    'spec.manufacturer': 'Producent',
    
    // Product features
    'product.feature.high.quality.construction': 'Højkvalitets konstruktion',
    'product.feature.safety.tested': 'Sikkerhedstestet',
    'product.feature.return.policy': '30 dages returpolitik',
    
    // Product features - generic
    'product.feature.lockable.design': 'Låsbar design',
    'product.feature.uv.resistant': 'UV-resistent',
    'product.feature.weatherproof.construction': 'Vejrbestandig konstruktion',
    'product.feature.storage.capacity': 'Opbevaringskapacitet',
    'product.feature.light.grey.dark.lid': 'Lys grå med mørk grå lokk',
    'product.feature.resin.construction': 'Harpiks konstruktion med træeffekt finish',
    'product.feature.waterproof': 'Vandtæt',
    'product.feature.security': 'Sikkerhed',
    'product.feature.built.in.shelf.support': 'Indbygget hyldestøtte',
    'product.feature.ventilated.design': 'Ventileret design',
    'product.feature.heavy.duty.floor': 'Kraftig gulvpanel',
    'product.feature.easy.assembly': 'Nem samling',
    'product.feature.outdoor.storage': 'Udendørs opbevaring',
    
    // Color and size options
    'product.color.name': 'Farvenavn',
    'product.size.name': 'Størrelsesnavn',
    
    // Store and returns
    'product.visit.store': 'Besøg {store} butikken'
  },
  
  no: { // Norwegian
    'search.placeholder': 'Søk',
    'account.hello': 'Hei, Din konto',
    'account.returns': 'Returer og bestillinger',
    'account.cart': 'Handlekurv',
    'deliver.to': 'Lever til',
    
    // Navigation
    'nav.home': 'Hjem',
    'nav.garden': 'Hage',
    'nav.storage': 'Oppbevaring',
    'product.add.to.basket': 'Legg til i handlekurv',
    'product.buy.now': 'Kjøp nå',
    'product.in.stock': 'På lager',
    'product.free.returns': 'GRATIS retur',
    'product.quantity': 'Antall:',
    'product.about.this.item': 'Om denne varen',
    'product.customer.reviews': 'Kundeanmeldelser',
    'product.delivery.to': 'Lever til {country}',
    'product.usually.dispatched': 'Sendes normalt innen 1 til 2 måneder',
    'product.only.left': 'Kun {count} igjen på lager!',
    'product.free.ups': 'GRATIS UPS levering',
    'product.fast.free.ups': 'Rask, GRATIS UPS levering',
    'product.delivery.tomorrow': 'GRATIS levering i morgen',
    'product.stock.count': 'På lager',
    'product.secure.transaction.text': 'Sikker transaksjon',
    'product.ships.from.text': 'Sendes fra',
    'product.sold.by.text': 'Selges av',
    'product.add.to.wishlist.text': 'Legg til ønskeliste',
    'product.add.gift.options.text': 'Legg til gaveinnpakning',
    'product.about.this.item.text': 'Om denne varen',
    'product.details.text': 'Produktdetaljer',
    'product.technical.details.text': 'Tekniske detaljer',
    'product.customer.reviews.text': 'Kundeanmeldelser',
    'product.global.ratings.text': '{count} globale vurderinger',
    'product.all.reviews.text': 'Alle anmeldelser',
    'product.see.all.reviews.text': 'Se alle anmeldelser',
    'homepage.all.products': 'Alle produkter',
    'homepage.all.products.subtitle': 'Utforsk vår komplette produktsamling',
    'homepage.view.all.products': 'Se alle produkter',
    
    // Additional translations for complete coverage
    'homepage.welcome': 'Velkommen til Amazon',
    'homepage.amazon.choice': 'Amazons valg',
    'homepage.prime': 'Prime',
    
    // Navigation
    'nav.todays.deals': 'Dagens tilbud',
    'nav.customer.service': 'Kundeservice',
    'nav.registry': 'Ønskeliste',
    'nav.gift.cards': 'Gavekort',
    'nav.sell': 'Selg',
    
    // Product elements
    'product.amazons.choice': 'Amazons valg',
    'product.climate.friendly': 'Klimaforpligtelse Venlig',
    'product.day.returns': '30 dagers retur',
    'product.returns.eligible': 'Denne varen er kvalifisert for gratis retur innen 30 dager etter levering.',
    'product.free.delivery': 'GRATIS levering',
    'product.secure.transaction': 'Sikker transaksjon',
    'product.ships.from': 'Sendes fra',
    'product.sold.by': 'Selges av',
    'product.add.to.wishlist': 'Legg til ønskeliste',
    'product.add.gift.options': 'Legg til gaveinnpakning',
    'product.lowest.price': 'Laveste pris siste 30 dager:',
    'product.rrp': 'Vejl. pris:',
    'product.save': 'Spar {amount} ({percentage})',
    'product.out.of.stars': '{rating} av 5',
    'product.ratings': '{count} vurderinger',
    'product.bought.in.month': 'Kjøpt i denne måneden: {count}+',
    'product.verified.purchase': 'Verifisert kjøp',
    'product.verified.purchase.text': 'Verifisert kjøp',
    'product.clearance.sale': 'Utsalg',
    'product.clearance.sale.badge': 'Utsalg',
    
    // Review titles and content - Norwegian
    'product.review.title.space.saving': 'Din plassbesparende oppbevaringsløsning!',
    'product.review.title.fab': 'Fantastisk',
    'product.review.title.great.product': 'Godt produkt, enkelt å montere, pent og ryddig oppbevaring til hageutstyr',
    'product.review.title.waterproof.spacious': 'Vanntett, romslig og enkel å bygge',
    'product.review.title.bin.storage': 'Søppelbøtteoppbevaring',
    
    'product.review.content.space.saving': 'Keter 249317 Store it Out Nova utendørs hageoppbevaringsskur er den perfekte oppbevaringsløsningen for ditt utendørsrom. Med sin kompakte størrelse og smarte design tilbyr dette oppbevaringsskuret rikelig plass til å holde hageverktøy, utstyr og andre eiendeler organisert og beskyttet mot elementene. Plassbesparende design: Det fremtredende trekk ved Keter Store it Out Nova er dens plassbesparende design. Til tross for sin generøse oppbevaringskapasitet tillater skurets kompakte dimensjoner på 32 x 71,5 x 113,5 cm at det enkelt kan passe i små utendørsrom, som terrasser, altaner eller hager. Rikelig oppbevaringsplass: La ikke størrelsen lure deg; dette oppbevaringsskuret tilbyr masse plass til å oppbevare hageessentials og mer. Uansett om det er hageverktøy, puter, utendørs leker eller til og med sykler, kan du holde dem alle pent oppbevart og enkelt tilgjengelige. Værbestandig og holdbar: Store it Out Nova er bygget til å motstå elementene. Fremstilt av høy kvalitet, værbestandige materialer, sikrer dette oppbevaringsskuret at dine eiendeler forblir tørre og beskyttet mot regn, sol og vind. Enkel tilgang: De doble dørene med et hengslet lokk gir enkel tilgang til innholdet i skuret. Du kan enkelt åpne og lukke dørene for å hente eller oppbevare gjenstander uten problemer. Lys grå tre-lignende finish: Skuret har en stilfull lys grå tre-lignende finish som legger til et snev av eleganse til ditt utendørsrom. Det blander seg problemfritt med hageinnredningen din og komplementerer enhver innstilling. Låsbar for sikkerhet: For økt sikkerhet kommer Store it Out Nova med en innebygd låsemekanisme. Du kan sikkert låse dørene for å holde dine eiendeler sikre og beskyttede. Enkel montering: Oppbevaringsskuret er designet for enkel montering, så du kan sette det opp raskt og begynne å bruke det med en gang. Alsidig bruk: Mens det er perfekt for hageoppbevaring, er dette skuret også alsidig i sin bruk. Det kan brukes som ekstra oppbevaring for terrassen din, poolside eller til og med i en garasje eller forsyningsområde. Samlet sett er Keter 249317 Store it Out Nova utendørs hageoppbevaringsskur en smart og praktisk løsning for å holde ditt utendørsrom organisert og ryddig. Med sitt plassbesparende design, rikelig oppbevaringsplass, værbestandig konstruksjon og enkel tilgang, oppfyller dette skuret alle krav til effektiv utendørs oppbevaring. Oppgrader din utendørs organisering med Keter Store it Out Nova og nyt et pent og velholdt hageområde.',
    'product.review.content.fab': 'Fantastisk produkt, enkelt å montere, pent og ryddig oppbevaring til hageutstyr. Det eneste problemet er at det ikke har en enkel lokkholder, så du må holde lokket oppe med den ene hånden. Så jeg vil lage en til å holde lokket oppe etter behov.',
    'product.review.content.great.product': 'Godt produkt, enkelt å montere, pent og ryddig oppbevaring til hageutstyr. Den eneste kritikken er at det ikke har en enkel lokkholder, så du må holde lokket oppe med den ene hånden. Så jeg vil lage en til å holde lokket oppe etter behov.',
    'product.review.content.waterproof.spacious': 'Dette ankom raskt. Tok 30 minutter å konstruere. Veldig enkelt å gjøre. Ideelt å ha et annet par hender til å holde stykkene på plass mens du setter skruer i. Vanntett, romslig og robust. Pent.',
    'product.review.content.bin.storage': 'Veldig lett og ærlig talt litt skrøpelig. Vi har boret det fast i gulvet for å forhindre bevegelse. Det passer ikke alle resirkuleringscontainere på grunn av høyden, det passer kun de svarte. Gjør jobbet med å skjule stygge containere.',
    
    // Trust indicators
    'trust.secure': 'Sikker',
    'trust.easy.returns': 'Enkel retur',
    'trust.delivery.info': '{date}',
    
    // Delivery and shipping information
    'product.delivery.free': 'GRATIS levering',
    'product.delivery.free.date': 'GRATIS levering {date}',
    'product.delivery.free.august.17': 'GRATIS levering 17. august',
    'product.delivery.free.august.17.short': 'GRATIS levering 17 aug',
    
    // Customer review elements
    'reviews.customer.review': 'Kundeanmeldelse',
    'reviews.customer.review.plural': 'Kundeanmeldelser',
    'reviews.review.button': 'Anmeldelse',
    'reviews.review.button.short': 'Anmeld',
    
    // Product information labels
    'product.info.category': 'Kategori',
    'product.info.brand': 'Merke',
    'product.info.material': 'Materiale',
    'product.info.capacity': 'Kapasitet',
    
    // Product detail labels
    'product.detail.brand': 'Merke',
    'product.detail.colour': 'Farge',
    'product.detail.material': 'Materiale',
    'product.detail.product.dimensions': 'Produktdimensjoner',
    'product.detail.item.weight': 'Varevekt',
    'product.detail.volume': 'Volum',
    'product.detail.uv.protection': 'UV-beskyttelse',
    'product.detail.special.features': 'Spesielle funksjoner',
    'product.detail.usage': 'Bruk',
    'product.detail.assembly.time': 'Samletid',
    'product.detail.recommended.assembly': 'Anbefalt samling',
    
    // Technical detail labels
    'product.technical.manufacturer': 'Produsent',
    'product.technical.part.number': 'Varenummer',
    'product.technical.item.model.number': 'Varemodelnummer',
    'product.technical.size': 'Størrelse',
    'product.technical.style': 'Stil',
    'product.technical.pattern': 'Mønster',
    'product.technical.shape': 'Form',
    'product.technical.item.package.quantity': 'Varepakkeantall',
    'product.technical.batteries.required': 'Batterier påkrevd',
    'product.technical.asin': 'ASIN',
    'product.technical.date.first.available': 'Dato først tilgjengelig',
    
    // Reviews
    'reviews.customer.reviews': 'Kundeanmeldelser',
    'reviews.out.of.stars': '{rating} av 5',
    'reviews.global.ratings': '{count} globale vurderinger',
    'reviews.how.work': 'Slik fungerer kundeanmeldelser og vurderinger',
    'reviews.with.images': 'Med bilder',
    'reviews.helpful': 'Nyttig ({count})',
    'reviews.report': 'Rapporter',
    'reviews.see.all': 'Se alle anmeldelser',
    'reviews.reviewed.in': 'Anmeldt i {country} den {date}',
    'reviews.verified.purchase.only': 'Kun verifiserte kjøp',
    'reviews.verified.purchase': 'Verifisert kjøp',
    
    // Default review content
    'reviews.amazon.customer': 'Amazon Kunde',
    'reviews.verified.buyer': 'Verifisert Kjøper',
    'reviews.happy.customer': 'Glad Kunde',
    'reviews.great.product': 'Fantastisk produkt!',
    'reviews.good.value': 'God verdi for pengene',
    'reviews.highly.recommended': 'Varmt anbefalt!',
    'reviews.excellent.quality': 'Utmerket kvalitet og overgikk mine forventninger!',
    'reviews.works.expected': 'Meget godt produkt med mindre overveielser',
    'reviews.perfect.needs': 'Perfekt! Nøyaktig det jeg trengte',
    'product.name.keter.storage.shed': 'Keter Store it Out Nova Utenomshus Hageoppbevaring',
    
    // Detailed review content
    'reviews.detailed.well.made': 'Dette er et godt laget produkt som leverer på sine løfter. Kvaliteten er god og det fungerer som forventet. Jeg har brukt det i omtrent en måned nå og det holder seg bra. Designet er praktisk og brukervennlig, selv om det er et par mindre forbedringer som kunne gjøres. Instruksjonene var tydelige og enkle å følge, og monteringen var grei. Jeg setter pris på oppmerksomheten på detaljer i designet, og materialene som brukes føles holdbare. Selv om det ikke er perfekt, representerer det god verdi for prisklassen. Jeg ville anbefalt det til andre, spesielt hvis du leter etter noe pålitelig og godt bygget.',
    'reviews.detailed.exceeds.expectations': 'Dette produktet overgikk virkelig mine forventninger! Kvaliteten er utmerket og det føles solid og godt laget. Jeg har brukt det i flere uker nå og det fungerer perfekt. Designet er både funksjonelt og estetisk tiltalende. Instruksjonene var klare og monteringen tok bare noen minutter. Materialene bruker høy kvalitet og det ser ut til å være bygget for å vare. Det er verdt hver krone og jeg ville definitivt kjøpt det igjen. Anbefaler det til alle som leter etter et pålitelig og godt designet produkt.',
    'reviews.detailed.great.value': 'Utmerket verdi for pengene! Dette produktet leverer på alle nivåer. Die Qualität ist überraschend gut für den Preis, und es funktioniert genau wie beschrieben. Ich benutze es seit einem Monat und es hält sich gut. Das Design ist praktisch und benutzerfreundlich. Die Anweisungen waren einfach zu befolgen und die Montage war schnell. Obwohl es nicht die teuerste Option ist, fühlt es sich solide und gut gemacht an. Es ist definitiv ein Produkt, das ich anderen empfehlen würde. Gute Qualität zu einem vernünftigen Preis.',
    'reviews.detailed.reliable.quality': 'Sehr zufrieden mit diesem Produkt. Es ist mit guter Qualität gebaut und fühlt sich solide an. Ich benutze es seit mehreren Wochen und es funktioniert konsistent. Das Design ist praktisch und funktional. Die Anweisungen waren klar und die Montage war einfach. Die Materialien verwenden gute Qualität und es sieht so aus, als wäre es gemacht, um zu halten. Es ist ein Produkt, auf das ich vertrauen kann und würde es definitiv wieder kaufen. Empfehle es anderen, die nach etwas Zuverlässigem suchen.',
    'reviews.detailed.solid.construction': 'Solide Konstruktion und gute Qualität. Dieses Produkt ist gut gemacht und fühlt sich robust an. Ich benutze es seit einem Monat und es hält sich gut. Das Design ist funktional und benutzerfreundlich. Die Anweisungen waren klar und die Montage dauerte nicht lange. Die Materialien verwenden hohe Qualität und es sieht so aus, als wäre es gebaut, um zu halten. Es ist die Investition wert und ich würde es anderen empfehlen. Gutes Preis-Leistungs-Verhältnis.',
    
    'reviews.date.november.15': '15. november {year}',
    'reviews.date.october.28': '28. oktober {year}',
    'reviews.date.november.2': '2. november {year}',
    
    // Default review content (long reviews) - Norwegian
    'reviews.default.long.1.title': 'Utmerket kvalitet og overgikk mine forventninger!',
    'reviews.default.long.1.content': 'Jeg var opprinnelig nølende med å kjøpe dette produktet, men jeg er så glad for at jeg gjorde det! Kvaliteten er helt utmerket og den har overgått alle mine forventninger. Byggekvaliteten er solid, materialene føles premium, og den fungerer akkurat som annonsert. Jeg har brukt den i flere uker nå, og den ser og fungerer fortsatt som ny. Oppmerksomheten på detaljer er imponerende, fra emballasjen til avslutningen. Jeg ville helt bestemt anbefalt dette til alle som leter etter et pålitelig, høykvalitetsprodukt. Det er hver krone verdt, og jeg kan se at dette holder i årevis. Fantastisk verdi for pengene!',
    
    'reviews.default.long.2.title': 'Meget godt produkt med mindre overveielser',
    'reviews.default.long.2.content': 'Dette er et velgjort produkt som leverer på sine løfter. Kvaliteten er god, og det fungerer som forventet. Jeg har brukt det i omtrent en måned nå, og det holder seg bra. Designet er praktisk og brukervennlig, selv om det er et par mindre forbedringer som kunne gjøres. Instruksjonene var klare og enkle å følge, og monteringen var grei. Jeg setter pris på oppmerksomheten på detaljer i designet, og materialene som brukes føles holdbare. Selv om det ikke er perfekt, representerer det god verdi for prisklassen. Jeg ville anbefalt det til andre, spesielt hvis du leter etter noe pålitelig og godt bygget.',
    
    'reviews.default.short.1.title': 'Perfekt!',
    'reviews.default.short.1.content': 'Nøyaktig det jeg lette etter. Fantastisk kvalitet og rask levering.',
    
    'reviews.default.short.2.title': 'God verdi',
    'reviews.default.short.2.content': 'Solidt produkt til prisen. Fungerer godt og ser godt ut.',
    
    // Urgency messages
    'urgency.clearance.sale': 'Utsalg',
    'urgency.people.viewing': '{count} personer ser nå',
    'urgency.stock.only.left': 'Lager: Kun {count} igjen',
    'urgency.ends.in': 'Slutter om: {time}',
    'urgency.bought.today': 'Kjøpt i dag: {count} personer',
    'urgency.delivery.free.tomorrow': 'Levering: GRATIS i morgen',
    
    // Collections
    'collections.deals.today': 'Dagens tilbud',
    'collections.newcomers': 'Nykommere',
    'collections.smart.storage.solutions': 'Smart lagringsløsninger',
    'collections.storage.solutions': 'Lagringsløsninger',
    'collections.garden.outdoor': 'Hage og ute',
    'collections.office.gaming': 'Kontor og gaming',
    'collections.cleaning.essentials': 'Rengjøringsesentials',
    'collections.bedroom.furniture': 'Soveromsmøbler',
    'collections.home.kitchen': 'Hjem og kjøkken',
    'collections.electronics': 'Elektronikk',
    'collections.beauty.personal.care': 'Skjønnhet og personlig pleie',
    'collections.sports.outdoors': 'Sport og friluft',
    'collections.toys.games': 'Leker og spill',
    'collections.automotive': 'Bil og motorsykkel',
    'collections.tools.home.improvement': 'Verktøy og hjemmeforbedring',
    'collections.baby.nursery': 'Baby og barneværelse',
    'collections.security.safety': 'Sikkerhet og trygghet',
    'collections.pet.supplies': 'Dyreutstyr',
    'collections.books.media': 'Bøker og media',
    
    // Footer sections
    'footer.back.to.top': 'Tilbake til toppen',
    'footer.copyright': '© 1996-2024, Amazon.com, Inc. eller dets associerte selskaper',
    'footer.change.country': 'Endre land/region',
    'footer.about.us': 'Om oss',
    'footer.careers': 'Karrierer',
    'footer.press.releases': 'Pressemeldinger',
    'footer.amazon.science': 'Amazon Science',
    'footer.get.to.know': 'Lær oss å kjenne',
    'footer.make.money': 'Tjen penger med oss',
    'footer.sell.products': 'Selg produkter på Amazon',
    'footer.sell.business': 'Selg på Amazon Business',
    'footer.sell.apps': 'Selg apper på Amazon',
    'footer.become.affiliate': 'Bli affiliate',
    'footer.business.card': 'Amazon Business Card',
    'footer.shop.points': 'Handla med poeng',
    'footer.reload.balance': 'Fyll opp saldoen din',
    'footer.currency.converter': 'Amazon valutaomregner',
    'footer.covid': 'Amazon og COVID-19',
    'footer.payment.products': 'Amazon betalingsprodukter',
    'footer.help.you': 'La oss hjelpe deg',
    'footer.your.account': 'Din konto',
    'footer.your.orders': 'Dine bestillinger',
    'footer.shipping.rates': 'Fraktpriser og retningslinjer',
    
    // Product information
    'product.information.title': 'Produktinformasjon',
    'product.technical.details.title': 'Tekniske detaljer',
    'spec.product.dimensions': 'Produktdimensjoner',
    'spec.special.features': 'Spesielle funksjoner',
    'spec.item.weight': 'Varevekt',
    'spec.material': 'Materiale',
    'spec.asin': 'ASIN',
    'spec.date.first.available': 'Dato først tilgjengelig',
    'spec.manufacturer': 'Produsent',
    
    // Product features
    'product.feature.high.quality.construction': 'Høy kvalitets konstruksjon',
    'product.feature.safety.tested': 'Sikkerhetstestet',
    'product.feature.return.policy': '30 dages returpolitikk',
    
    // Product features - generic
    'product.feature.lockable.design': 'Låsbar design',
    'product.feature.uv.resistant': 'UV-bestandig',
    'product.feature.weatherproof.construction': 'Værbestandig konstruksjon',
    'product.feature.storage.capacity': 'Lagringskapasitet',
    'product.feature.light.grey.dark.lid': 'Lys grå med mørk grå lokk',
    'product.feature.resin.construction': 'Harpiks konstruksjon med tre-effekt finish',
    'product.feature.waterproof': 'Vanntett',
    'product.feature.security': 'Sikkerhet',
    'product.feature.built.in.shelf.support': 'Innebygd hyllebrakett',
    'product.feature.ventilated.design': 'Ventilert design',
    'product.feature.heavy.duty.floor': 'Kraftig gulvpanel',
    'product.feature.easy.assembly': 'Enkel montering',
    'product.feature.outdoor.storage': 'Utendørs lagring',
    
    // Color and size options
    'product.color.name': 'Fargenavn',
    'product.size.name': 'Størrelsesnavn',
    
    // Store and returns
    'product.visit.store': 'Besøk {store} butikken',
    
    // Clearance sale
    'clearance.sale.label': 'Utsalg:',
    'product.quantity.warning': 'Maksimum {limit} per kunde på grunn av høy etterspørsel utsalg'
  },
  
  de: { // German (Switzerland)
    'product.delivery.info': 'KOSTENLOSE Lieferung {date}',
    'product.deliver.to': 'Liefern an {country}',
    'product.delivery.info.blue': 'KOSTENLOSE Lieferung {date}',
    'homepage.todays.deals': 'Heutige Angebote',
    'homepage.see.more': 'Mehr anzeigen',
    'homepage.free.delivery': 'KOSTENLOSE Lieferung',
  },
  
  fr: { // French
    'product.style.name': 'Nom du style:',
    'product.material.name': 'Nom du matériau:',
    'product.pattern.name': 'Nom du motif:',
    'product.finish.name': 'Nom de la finition:',
    'search.all.categories': 'Tout',
    
    // Navigation menu
    
    // Customer Reviews
    'reviews.all.reviews': 'Tous les avis',
    
    // Urgency Messages
    'urgency.ends.in': 'Se termine dans : {time}',
    'urgency.bought.today': 'Acheté aujourd\'hui : {count} personnes',
    
    // Breadcrumb navigation
    'breadcrumb.home.kitchen': 'Maison et Cuisine',
    'breadcrumb.furniture': 'Meubles',
    'breadcrumb.bedroom.furniture': 'Meubles de chambre',
    'breadcrumb.chest.drawers': 'Commodes',
    'breadcrumb.kitchen.appliances': 'Électroménager cuisine et maison',
    'breadcrumb.vacuums.floor.care': 'Aspirateurs et entretien des sols',
    'breadcrumb.vacuums': 'Aspirateurs',
    'breadcrumb.cylinder.vacuums': 'Aspirateurs cylindriques',
    'breadcrumb.baby.products': 'Produits pour bébé',
    'breadcrumb.nursery': 'Chambre de bébé',
    'breadcrumb.cots.beds': 'Lits et berceaux',
    'breadcrumb.garden.outdoors': 'Jardin et extérieur',
    'breadcrumb.garden.furniture': 'Mobilier de jardin',
    'breadcrumb.chairs': 'Chaises',
    'breadcrumb.office.products': 'Produits de bureau',
    'breadcrumb.office.furniture': 'Mobilier de bureau',
    'breadcrumb.desks': 'Bureaux',
    'breadcrumb.security': 'Sécurité',
    'breadcrumb.safes': 'Coffres-forts',
    
    // Product page specific
    'product.colour.name': 'Nom de couleur :',
    'product.more.buying.choices': 'Plus d\'options d\'achat',
    'product.used.very.good': 'Occasion - Très bon état',
    'product.new.offers': 'Neuf ({count} offres)',
    'product.product.information': 'Informations sur le produit',
    
    // Vacuum cleaner features
    'feature.vacuum.700w': '700 Watts : Aspirateur cyclonique sans sac léger (4,5 kg) avec buse triple action et bouton coulissant pour réguler l\'aspiration',
    'feature.vacuum.hygienic': 'Hygiénique : Avec filtre HEPA 12 anti-allergènes, pour éliminer les odeurs et capturer 99,5 % de la poussière, saleté, pollen et allergènes',
    'feature.vacuum.quiet': 'Silencieux et efficace : Aspirateur-traîneau sans sac exceptionnellement silencieux (78 décibels). Avec classification énergétique \'A\' et filtres lavables',
    'feature.vacuum.convenient': 'Pratique : Avec bac à poussière facile à vider (1,5L / 50,7oz), roues qui roulent facilement et tuyau réglable de 1,5m',
    'feature.vacuum.home.office': 'Pour la maison et le bureau : Idéal pour aspirer tapis, moquettes, sols durs, tissus d\'ameublement, intérieur de voiture. Ramasse les poils d\'animaux',
    'feature.vacuum.versatile': 'Polyvalent : Comprend buse pour tissus d\'ameublement, brosse à épousseter et parquet, suceur plat et support d\'accessoires. Avec cordon de 5m',
    
    // Stick vacuum features
    'feature.stick.design': 'Conception personnalisable 2-en-1 ; aspirateur-balai avec éco-moteur',
    'feature.stick.suction': 'Offre jusqu\'à 13kPa d\'aspiration pour un nettoyage puissant',
    'feature.stick.cord': 'Cordon de 6m offre jusqu\'à 7m de portée de nettoyage pour un fonctionnement pratique',
    'feature.stick.hepa': 'Filtre HEPA très efficace qui est amovible pour un lavage facile',
    'feature.stick.swivel': 'La brosse pivotante permet une direction plus fluide et une meilleure maniabilité',
    'feature.stick.container': 'Retrait du conteneur à poussière rapide et sans désordre pour un entretien facile',
    
    // Security safe features
    'feature.safe.fire.resistant': 'Coffre-fort ignifuge de 60 l pour protéger les médias numériques, documents importants et autres objets de valeur du vol et du feu',
    'feature.safe.ul.standard': 'Conforme à la norme UL 72 modifiée pour les tests de sécurité de résistance au feu des équipements de protection d\'enregistrements pendant 20 minutes à 650 degrés Celsius testé par Intertek',
    'feature.safe.construction': 'Construction robuste en acier lourd de calibre 14 ; 5 gros boulons de 0,75 pouce pour une sécurité supérieure',
    'feature.safe.keypad': 'Le clavier électronique fournit un accès rapide et facile ; comprend une clé de secours pour usage d\'urgence',
    'feature.safe.dimensions': 'L\'extérieur mesure 16,9 x 13,8 x 26 pouces (L x l x H) ; mesure de l\'espace intérieur 15,2 x 9,6 x 24,4 pouces (L x l x H)',
    'feature.safe.bolt': 'Contient un boulon d\'expansion M8*60 pour un montage sécurisé',
    
    // Storage chest features
    'feature.chest.elegant': 'Ajout élégant à votre maison : Banc de rangement blanc mat s\'accorde facilement avec le reste de vos meubles avec un design côtelé',
    'feature.chest.storage': 'Grand espace de rangement : Taille 100 x 40 x 46 cm avec beaucoup de rangement pour couvertures, chaussures ou jouets',
    'feature.chest.handle': 'Poignée pour le confort, charnière pour la sécurité : 2 poignées pour un transport facile, 2 charnières de sécurité empêchent les blessures aux doigts',
    'feature.chest.sturdy': 'Construction robuste : Cadre en panneau de particules supporte jusqu\'à 100kg, parfait comme banc à chaussures',
    'feature.chest.assembly': 'Assemblage facile : Instructions claires incluses avec tous les outils nécessaires',
    
    // Bedside cabinet features
    'feature.cabinet.storage': 'Beaucoup d\'espace de rangement : Tiroir coulissant et armoire spacieuse pour garder les petits objets comme télécommandes, clés, lunettes à portée de main',
    'feature.cabinet.colors': 'Diverses options de couleur : Convient pratiquement partout ! Facile à assortir avec d\'autres meubles, convient à de nombreux styles de décoration différents',
    'feature.cabinet.durable': 'Construction durable : Matériaux solides et durables pour assurer une utilisation longue durée avec surface mate facile à nettoyer',
    'feature.cabinet.versatile': 'Utilisation polyvalente : Peut être utilisé non seulement comme table de chevet mais aussi comme classeur, armoire de rangement ou table d\'appoint de canapé',
    'feature.cabinet.size': 'Taille parfaite : Taille du produit : H 47 x L 40 x P 36 cm environ - idéal pour chambre, salon, salle à manger, hall, couloir',
    
    // Dresser features
    'feature.dresser.multifunctional': 'COMMODE MULTIFONCTIONNELLE : Cette commode est idéale pour chambre, placard, salon, chambre de bébé, couloir et chevet. C\'est aussi un meuble TV avec tiroirs de rangement !',
    'feature.dresser.storage': 'GRAND ESPACE DE RANGEMENT : Cette commode 5 tiroirs pour chambre est idéale pour organiser lingerie, couvertures, sous-vêtements ainsi que vêtements de vos enfants et bébés.',
    'feature.dresser.material': 'MATÉRIAU PREMIUM : Nous choisissons un matériau premium qui est plus dur, plus lisse, plus brillant, plus durable et ne se froisse pas facilement et ne moisit pas.',
    'feature.dresser.sturdy': 'ORGANISATEUR DE TIROIRS ROBUSTE : Plateau en bois épaissi et cadre métallique avec joints de soudure renforcés rendent cette commode plus solide.',
    'feature.dresser.safety': 'SOIN DE SÉCURITÉ : Kits anti-basculement inclus. Ne vous inquiétez pas pour les garçons ou filles espiègles. L\'assemblage ne prend généralement pas plus d\'une demi-heure.',
    
    // Gaming desk features
    'feature.desk.durable': 'Conception durable : pieds métalliques tubulaires carrés robustes avec plateau en bois ; globalement, composé de 60% de métal et 40% de panneau de particules avec mélamine pour une résistance fiable',
    'feature.desk.oversized': 'Bureau surdimensionné : le bureau de 140 cm de large peut accueillir deux grands moniteurs - idéal pour créer un espace de travail étendu ou une expérience de jeu immersive',
    'feature.desk.adjustable': 'Hauteur réglable : la poignée intégrée peut être utilisée pour monter ou baisser manuellement la hauteur du bureau selon les besoins',
    'feature.desk.shelf': 'Étagère surélevée : fournit un placement pratique du moniteur pour économiser l\'espace et une visualisation plus confortable de l\'écran',
    'feature.desk.assembly': 'Assemblage facile, le bureau de jeu multifonctionnel s\'assemble rapidement et facilement',
    
    // Garden chair features
    'feature.chair.box': 'Dans la boîte : Ensemble de 2 chaises d\'extérieur réglables et durables. Supporte un poids maximum jusqu\'à 113kg',
    'feature.chair.durable': 'Durable : Fabriqué en tissu résistant aux intempéries et aluminium enduit de poudre pour résister à l\'exposition à la neige, pluie et soleil',
    'feature.chair.convenient': 'Pratique : Chaise de jardin pliable avec dossier réglable à cinq positions pour un positionnement optimal',
    
    // Storage shelf features - titles only
    'feature.shelf.unit.title': 'Unité d\'étagères 5 niveaux :',
    'feature.shelf.unit.desc': 'Fabriquée en construction d\'acier durable avec finition enduite de noir ; avec pieds de nivellement réglables pour une stabilité accrue sur sol inégal',
    'feature.shelf.adjustable.title': 'Étagères réglables en hauteur :',
    'feature.shelf.adjustable.desc': 'Les étagères du support mobile peuvent être ajustées par incréments de 2,54 cm, aucun outil requis',
    'feature.shelf.capacity.title': 'Capacité d\'étagère :',
    'feature.shelf.capacity.desc': 'Chaque étagère supporte jusqu\'à 159 kg (répartis uniformément) ; poids de charge maximum total est de 795 kg',
    'feature.shelf.guardrails.title': 'Avec garde-corps :',
    'feature.shelf.guardrails.desc': 'Garde-corps au bord de chaque étagère pour empêcher les objets de tomber',
    'feature.shelf.versatile.title': 'Polyvalent :',
    'feature.shelf.versatile.desc': 'Meuble idéal pour ranger les produits essentiels ménagers, appareils électroménagers, aliments secs, outils et autres accessoires dans la cuisine, salle de bain, salon ou jardin',
    
    // Product titles
    'product.title.vacuum.cylinder': 'Aspirateur Amazon Basics Cylindrique Sans Sac avec Filtre HEPA pour Sol Dur, Tapis et Voiture, Compact et Léger, 700W, 1.5L, Noir',
    'product.title.vacuum.stick': 'Aspirateur Vertical Amazon Basics 2-en-1 avec Fil, Moteur ECO, Filtration HEPA, Balai Léger, Noir',
    'product.title.security.safe': 'Coffre-Fort Ignifuge Amazon Basics avec Clavier Électronique Programmable, 60 l, Noir, 43 cm L x 35 cm P x 66 cm H',
    'product.title.storage.organizer': 'Organisateur de Rangement Amazon Basics Extra Large en Tissu 5 Tiroirs pour Placard, Blanc',
    'product.title.storage.shelf': 'Étagère de Rangement Amazon Basics 5 Niveaux avec Étagères Réglables en Hauteur et Pieds de Nivellement, 795 kg Poids Max, Noir, 35.6 P x 91.4 L x 182.9 H cm',
    'product.title.storage.chest': 'Coffre de Rangement VASAGLE, Boîte à Couvertures avec Couvercle à Charnières, Banc de Rangement, 100 x 40 x 46 cm, Blanc',
    'product.title.bedside.cabinet': 'Table de Chevet Blanche Vida Designs, 2 Tiroirs avec Poignées et Glissières Métalliques, Support Anti-Flexion Unique, Mobilier de Chambre Riano',
    'product.title.dresser': 'Commode Nicehill pour Chambre à 5 Tiroirs, Organisateur de Rangement, Large Commode pour Placard, Vêtements, Enfants, Bébé, Meuble TV, Plateau Bois, Tiroirs Tissu (Gris Noir), 30*100*61',
    'product.title.gaming.desk': 'Bureau Gaming HOMCOM, Bureau Ordinateur 140cm avec Étagère Surélevée et Réglage Hauteur, Table Bureau avec Large Plateau et Cadre Acier, Noir',
    'product.title.garden.chair': 'Ensemble Giantex de 2 Chaises de Jardin Extérieur, Chaises de Salle à Manger Patio avec Dossier Réglable 5 Positions, Chaise Longue Pliable Plage',
    'product.title.baby.cot': 'Lit Bébé Babymore Eva Sleigh avec Côté Abaissable et Tiroir - Blanc + Matelas Mousse',
    
    'product.bought.in.month': '{count}+ achetés le mois dernier',
    'product.sold.out': 'ÉPUISÉ',
    'product.warranty.included': 'Garantie de 2 ans incluse',
    'product.return.policy': 'Politique de retour de 30 jours',
    
    // Product specifications
    'spec.brand': 'Marque',
    'spec.colour': 'Couleur',
    'spec.room.type': 'Type de pièce',
    'spec.number.shelves': 'Nombre d\'étagères',
    'spec.style': 'Style',
    'spec.finish.type': 'Type de finition',
    
    // Specification values
    'value.kitchen': 'Cuisine',
    'value.adjustable': 'Réglable',
    'value.no.wheels': 'Sans roues',
    'value.black.finish': 'Finition noire',
    'value.metal': 'Métal',
    'value.chrome': 'Chrome',
    'value.currently.unavailable': 'Actuellement indisponible',
    'spec.frame': 'Cadre',
    'spec.dimensions': 'Dimensions',
    'spec.drawers': 'Tiroirs',
    'spec.weight': 'Poids',
    'spec.assembly': 'Assemblage',
    'spec.model.number': 'Numéro de modèle',
    'spec.frame.material': 'Matériau du cadre',
    'spec.number.drawers': 'Nombre de tiroirs',
    'spec.assembly.required': 'Assemblage requis',
    'spec.upc': 'UPC',
    'spec.capacity': 'Capacité',
    'spec.number.speeds': 'Nombre de vitesses',
    'spec.noise.level': 'Niveau sonore',
    'spec.filter.type': 'Type de filtre',
    'spec.included.components': 'Composants inclus',
    'spec.is.cordless': 'Sans fil ?',
    'spec.surface.recommendation': 'Recommandation de surface',
    'spec.power.source': 'Source d\'alimentation',
    'spec.voltage': 'Tension',
    
    // Product features
    'feature.extra.wide.organizer': 'Organisateur de rangement extra large à 5 tiroirs en tissu :',
    'feature.extra.wide.desc': 'Parfait pour les placards, chambres, salles de jeux et plus encore',
    'feature.contemporary.look': 'Style contemporain et minimaliste :',
    'feature.contemporary.desc': 'S\'intègre parfaitement à une variété de styles de décoration',
    'feature.sturdy.frame': 'Cadre en acier robuste :',
    'feature.sturdy.desc': 'Avec plateau en bois stratifié pour la durabilité',
    'feature.lightweight.drawers': 'Tiroirs en tissu extra larges, légers et amovibles :',
    'feature.lightweight.desc': 'Faciles à nettoyer et à réorganiser',
    'feature.easy.handles': 'Poignées en tissu faciles à tirer :',
    'feature.easy.handles.desc': 'Accès pratique aux objets stockés',
    'feature.adjustable.feet': 'Pieds en plastique à hauteur réglable :',
    'feature.adjustable.desc': 'Empêche les oscillations et les dommages au sol',
    'feature.perfect.spaces': 'Parfait pour les petits espaces :',
    'feature.perfect.desc': 'Idéal pour les dortoirs, chambres d\'enfants et espaces de vie compacts',
    'feature.easy.assembly': 'Assemblage facile :',
    'feature.easy.assembly.desc': 'Installation simple avec des instructions claires',
    
    // Values for specifications
    'value.white': 'Blanc',
    'value.black': 'Noir',
    'value.plastic.wood': 'Bois plastique',
    'value.alloy.steel': 'Acier allié',
    'value.required': 'Requis',
    'value.yes': 'Oui',
    'value.space.saving': 'Gain d\'espace, Tiroirs amovibles',
    
    // UI elements
    'ui.maximum.quantity.warning': 'Maximum 1 par client en raison de la forte demande lors de la vente de liquidation',
    'ui.clearance.sale.badge': 'Vente de liquidation',
    'ui.secure.transaction': 'Transaction sécurisée',
    
    // Comments and additional UI text
    'ui.red.banner': 'Bannière rouge',
    'ui.pricing.section': 'Section des prix',
    'ui.price.history': 'Historique des prix',
    'ui.enhanced.urgency.message': 'Message d\'urgence amélioré',
    'ui.color.selection': 'Sélection de couleur',
    'ui.mobile.price.display': 'Affichage des prix mobile - Style Amazon',
    'ui.price.section': 'Section des prix',
    'ui.quantity.warning': 'Avertissement de quantité',
    'ui.trust.indicators': 'Indicateurs de confiance',
    'ui.additional.options': 'Options supplémentaires',
    'ui.product.description.section': 'Section de description du produit',
    'ui.2nd.image.above.about': '2ème image au-dessus de "À propos de cet article" - Mobile uniquement',
    'ui.3rd.image.under.details': '3ème image sous "Détails du produit" - Mobile uniquement',
    'ui.technical.specifications': 'Spécifications techniques',
    'ui.2nd.image.above.technical': '2ème image au-dessus des détails techniques - Bureau uniquement',
    'ui.customer.reviews.section': 'Section des avis clients',
    'ui.product.information': 'Informations sur le produit',
    
    // Footer translations
    
    // Footer Links
    
    // Product titles
    
    'product.clearance.sale': 'Vente de liquidation',
    'product.lowest.price': 'Prix le plus bas des 30 derniers jours :',
    'product.rrp': 'PVP :',
    'product.save': 'Économisez',
    'product.climate.friendly': 'Respectueux du climat',
    'product.day.returns': 'Retours sous 30 jours',
    'product.returns.eligible': 'Cet article est éligible aux retours gratuits dans les 30 jours suivant la livraison.',
    
    // Product specifications
    'spec.material': 'Matériau',
    
    // Specification values
    'spec.product.dimensions': 'Dimensions du produit',
    'spec.item.weight': 'Poids de l\'article',
    'spec.special.features': 'Caractéristiques spéciales',
    'spec.asin': 'ASIN',
    'spec.date.first.available': 'Date de première disponibilité',
    'spec.manufacturer': 'Fabricant',
    
    // Product features
    
    // Values for specifications
    
    // UI elements
    
    // Comments and additional UI text
    
    // Footer translations
    'footer.back.to.top': 'Retour en haut de page',
    'footer.copyright': '© 1996-2024, Amazon.com, Inc. ou ses affiliés',
    'footer.change.country': 'Changer de pays/région',
    'footer.get.to.know': 'Apprenez à nous connaître',
    'footer.make.money': 'Gagnez de l\'argent avec nous',
    'footer.payment.products': 'Produits de paiement Amazon',
    'footer.help.you': 'Laissez-nous vous aider',
    
    // Footer Links
    'footer.about.us': 'À propos de nous',
    'footer.careers': 'Carrières',
    'footer.press.releases': 'Communiqués de presse',
    'footer.amazon.science': 'Amazon Science',
    'footer.sell.products': 'Vendre des produits sur Amazon',
    'footer.sell.business': 'Vendre sur Amazon Business',
    'footer.sell.apps': 'Vendre des applications sur Amazon',
    'footer.become.affiliate': 'Devenir un affilié',
    'footer.business.card': 'Carte de crédit Amazon Business',
    'footer.shop.points': 'Acheter avec des points',
    'footer.reload.balance': 'Rechargez votre solde',
    'footer.currency.converter': 'Convertisseur de devise Amazon',
    'footer.covid': 'Amazon et COVID-19',
    'footer.your.account': 'Votre compte',
    'footer.your.orders': 'Vos commandes',
    'footer.shipping.rates': 'Tarifs et politiques d\'expédition'
  },
  
  es: { // Spanish (Spain)
    // Basic translations
    'homepage.welcome': 'Bienvenido a Amazon',
    'homepage.see.more': 'Ver más',
    'homepage.amazon.choice': 'Elección de Amazon',
    'homepage.prime': 'Prime',
    'homepage.free.delivery': 'Envío GRATIS',
    
    // Navigation
    'nav.todays.deals': 'Ofertas del día',
    'nav.customer.service': 'Servicio al cliente',
    'nav.registry': 'Lista de deseos',
    'nav.gift.cards': 'Tarjetas regalo',
    'nav.sell': 'Vender',
    
    // Product elements
    'product.amazons.choice': 'Elección de Amazon',
    'product.free.delivery': 'Envío GRATIS',
    'product.secure.transaction': 'Transacción segura',
    'product.ships.from': 'Enviado desde',
    'product.sold.by': 'Vendido por',
    'product.add.to.wishlist': 'Añadir a la lista de deseos',
    'product.add.gift.options': 'Añadir opciones de regalo',
    'product.delivery.info': 'Envío GRATIS {date}',
    'product.out.of.stars': '{rating} de 5',
    'product.ratings': '{count} valoraciones',
    'product.bought.in.month': 'Comprado este mes: {count}+',
    'product.verified.purchase': 'Compra verificada',
    'product.verified.purchase.text': 'Compra verificada',
    'product.clearance.sale.badge': 'Liquidación',
    
    // Trust indicators
    'trust.secure': 'Seguro',
    'trust.easy.returns': 'Devoluciones fáciles',
    'trust.delivery.info': '{date}',
    
    // Reviews
    'reviews.customer.reviews': 'Opiniones de clientes',
    'reviews.out.of.stars': '{rating} de 5',
    'reviews.global.ratings': '{count} valoraciones globales',
    'reviews.how.work': 'Cómo funcionan las opiniones y valoraciones de clientes',
    'reviews.with.images': 'Con imágenes',
    'reviews.helpful': 'Útil ({count})',
    'reviews.report': 'Reportar',
    'reviews.see.all': 'Ver todas las opiniones',
    'reviews.reviewed.in': 'Opinión en {country} el {date}',
    'reviews.verified.purchase.only': 'Solo compras verificadas',
    'reviews.verified.purchase': 'Compra verificada',
    
    // Default review content
    'reviews.amazon.customer': 'Cliente de Amazon',
    'reviews.verified.buyer': 'Comprador verificado',
    'reviews.happy.customer': 'Cliente satisfecho',
  },

  ch: { // Swiss German (Switzerland)
    // Basic translations
    'homepage.welcome': 'Willkommen bei Amazon',
    'homepage.see.more': 'Mehr anzeigen',
    'homepage.amazon.choice': 'Amazons Wahl',
    'homepage.prime': 'Prime',
    'homepage.free.delivery': 'KOSTENLOSE Lieferung',
    
    // Navigation
    'nav.todays.deals': 'Heutige Angebote',
    'nav.customer.service': 'Kundenservice',
    'nav.registry': 'Wunschliste',
    'nav.gift.cards': 'Geschenkkarten',
    'nav.sell': 'Verkaufen',
    
    // Product elements
    'product.amazons.choice': 'Amazons Wahl',
    'product.climate.friendly': 'Klima-Pledge Freundlich',
    'product.day.returns': '30-Tage Rückgabe',
    'product.returns.eligible': 'Dieser Artikel ist für kostenlose Rückgabe innerhalb von 30 Tagen nach Lieferung berechtigt.',
    'product.free.delivery': 'KOSTENLOSE Lieferung',
    'product.secure.transaction': 'Sichere Transaktion',
    'product.ships.from': 'Versand von',
    'product.sold.by': 'Verkauft von',
    'product.add.to.wishlist': 'Zur Wunschliste hinzufügen',
    'product.add.gift.options': 'Geschenkoptionen hinzufügen',
    'product.lowest.price': 'Niedrigster Preis in den letzten 30 Tagen:',
    'product.rrp': 'Empf. VK:',
    'product.save': 'Sparen Sie {amount} ({percentage})',
    'product.delivery.info': 'KOSTENLOSE Lieferung {date}',
    'product.out.of.stars': '{rating} von 5',
    'product.ratings': '{count} Bewertungen',
    'product.bought.in.month': 'Diesen Monat gekauft: {count}+',
    'product.verified.purchase': 'Verifizierter Kauf',
    'product.verified.purchase.text': 'Verifizierter Kauf',
    'product.quantity.warning': 'Maximum {limit} pro Kunde aufgrund hoher Nachfrage Ausverkauf',
    'product.clearance.sale': 'Ausverkauf',
    'product.clearance.sale.badge': 'Ausverkauf',
    
    // Trust indicators
    'trust.secure': 'Sicher',
    'trust.easy.returns': 'Einfache Rückgabe',
    'trust.delivery.info': '{date}',
    
    // Reviews
    'reviews.customer.reviews': 'Kundenbewertungen',
    'reviews.out.of.stars': '{rating} von 5',
    'reviews.global.ratings': '{count} globale Bewertungen',
    'reviews.how.work': 'So funktionieren Kundenbewertungen und Bewertungen',
    'reviews.with.images': 'Mit Bildern',
    'reviews.helpful': 'Hilfreich ({count})',
    'reviews.report': 'Melden',
    'reviews.see.all': 'Alle Bewertungen anzeigen',
    'reviews.reviewed.in': 'Bewertet in {country} am {date}',
    'reviews.verified.purchase.only': 'Nur verifizierte Käufe',
    'reviews.verified.purchase': 'Verifizierter Kauf',
    
    // Default review content
    'reviews.amazon.customer': 'Amazon Kunde',
    'reviews.verified.buyer': 'Verifizierter Käufer',
    'reviews.happy.customer': 'Zufriedener Kunde',
    'reviews.great.product': 'Tolles Produkt!',
    'reviews.good.value': 'Gutes Preis-Leistungs-Verhältnis',
    'reviews.highly.recommended': 'Sehr empfehlenswert!',
    'reviews.excellent.quality': 'Ausgezeichnete Qualität und übertraf meine Erwartungen!',
    'reviews.works.expected': 'Sehr gutes Produkt mit kleineren Überlegungen',
    'reviews.perfect.needs': 'Perfekt! Genau das, was ich brauchte',
    
    // Default review content (long reviews) - Swiss German
    'reviews.default.long.1.title': 'Ausgezeichnete Qualität und übertraf meine Erwartungen!',
    'reviews.default.long.1.content': 'Ich war anfangs zögerlich, dieses Produkt zu kaufen, aber ich bin so froh, dass ich es getan habe! Die Qualität ist absolut herausragend und es hat alle meine Erwartungen übertroffen. Die Verarbeitungsqualität ist solide, die Materialien fühlen sich hochwertig an und es funktioniert genau wie angekündigt. Ich benutze es seit mehreren Wochen und es sieht und funktioniert immer noch wie neu. Die Aufmerksamkeit für Details ist beeindruckend, von der Verpackung bis zur Fertigung. Ich würde es definitiv jedem empfehlen, der nach einem zuverlässigen, hochwertigen Produkt sucht. Es ist jeden Cent wert und ich kann sehen, dass es jahrelang hält. Großartiges Preis-Leistungs-Verhältnis!',
    
    'reviews.default.long.2.title': 'Sehr gutes Produkt mit kleineren Überlegungen',
    'reviews.default.long.2.content': 'Dies ist ein gut gemachtes Produkt, das seine Versprechen hält. Die Qualität ist gut und es funktioniert wie erwartet. Ich benutze es seit etwa einem Monat und es hält sich gut. Das Design ist praktisch und benutzerfreundlich, obwohl es ein paar kleinere Verbesserungen geben könnte. Die Anweisungen waren klar und einfach zu befolgen, und die Montage war unkompliziert. Ich schätze die Aufmerksamkeit für Details im Design, und die verwendeten Materialien fühlen sich langlebig an. Obwohl es nicht perfekt ist, stellt es einen guten Wert für den Preis dar. Ich würde es anderen empfehlen, besonders wenn Sie nach etwas Zuverlässigem und Gutem suchen.',
    
    'reviews.default.short.1.title': 'Perfekt!',
    'reviews.default.short.1.content': 'Genau das, was ich gesucht habe. Ausgezeichnete Qualität und schnelle Lieferung.',
    
    'reviews.default.short.2.title': 'Gutes Preis-Leistungs-Verhältnis',
    'reviews.default.short.2.content': 'Solides Produkt für den Preis. Funktioniert gut und sieht gut aus.',
    
    // Detailed review content
    'reviews.detailed.well.made': 'Dies ist ein gut gemachtes Produkt, das seine Versprechen hält. Die Qualität ist gut und es funktioniert wie erwartet. Ich benutze es seit etwa einem Monat und es hält sich gut. Das Design ist praktisch und benutzerfreundlich, obwohl es ein paar kleinere Verbesserungen geben könnte. Die Anweisungen waren klar und einfach zu befolgen, und die Montage war unkompliziert. Ich schätze die Aufmerksamkeit für Details im Design, und die verwendeten Materialien fühlen sich langlebig an. Obwohl es nicht perfekt ist, stellt es einen guten Wert für den Preis dar. Ich würde es anderen empfehlen, besonders wenn Sie nach etwas Zuverlässigem und Gutem suchen.',
    'reviews.detailed.exceeds.expectations': 'Dieses Produkt hat wirklich meine Erwartungen übertroffen! Die Qualität ist ausgezeichnet und es fühlt sich solide und gut gemacht an. Ich benutze es seit mehreren Wochen und es funktioniert perfekt. Das Design ist sowohl funktional als auch ästhetisch ansprechend. Die Anweisungen waren klar und die Montage dauerte nur wenige Minuten. Die Materialien verwenden hohe Qualität und es sieht so aus, als wäre es gebaut, um zu halten. Es ist jeden Cent wert und ich würde es definitiv wieder kaufen. Empfehle es jedem, der nach einem zuverlässigen und gut gestalteten Produkt sucht.',
    'reviews.detailed.great.value': 'Ausgezeichnetes Preis-Leistungs-Verhältnis! Dieses Produkt liefert auf allen Ebenen. Die Qualität ist überraschend gut für den Preis, und es funktioniert genau wie beschrieben. Ich benutze es seit einem Monat und es hält sich gut. Das Design ist praktisch und benutzerfreundlich. Die Anweisungen waren einfach zu befolgen und die Montage war schnell. Obwohl es nicht die teuerste Option ist, fühlt es sich solide und gut gemacht an. Es ist definitiv ein Produkt, das ich anderen empfehlen würde. Gute Qualität zu einem vernünftigen Preis.',
    'reviews.detailed.reliable.quality': 'Sehr zufrieden mit diesem Produkt. Es ist mit guter Qualität gebaut und fühlt sich solide an. Ich benutze es seit mehreren Wochen und es funktioniert konsistent. Das Design ist praktisch und funktional. Die Anweisungen waren klar und die Montage war einfach. Die Materialien verwenden gute Qualität und es sieht so aus, als wäre es gemacht, um zu halten. Es ist ein Produkt, auf das ich vertrauen kann und würde es definitiv wieder kaufen. Empfehle es anderen, die nach etwas Zuverlässigem suchen.',
    'reviews.detailed.solid.construction': 'Solide Konstruktion und gute Qualität. Dieses Produkt ist gut gemacht und fühlt sich robust an. Ich benutze es seit einem Monat und es hält sich gut. Das Design ist funktional und benutzerfreundlich. Die Anweisungen waren klar und die Montage dauerte nicht lange. Die Materialien verwenden hohe Qualität und es sieht so aus, als wäre es gebaut, um zu halten. Es ist die Investition wert und ich würde es anderen empfehlen. Gutes Preis-Leistungs-Verhältnis.',
    
    // Review dates
    'reviews.date.november.15': '15. November {year}',
    'reviews.date.october.28': '28. Oktober {year}',
    'reviews.date.november.2': '2. November {year}',
    
    // Urgency messages
    'urgency.clearance.sale': 'Ausverkauf',
    'urgency.people.viewing': '{count} Personen schauen jetzt',
    'urgency.stock.only.left': 'Lager: Nur noch {count} verfügbar',
    'urgency.ends.in': 'Endet in: {time}',
    'urgency.bought.today': 'Heute gekauft: {count} Personen',
    'urgency.delivery.free.tomorrow': 'Lieferung: KOSTENLOS morgen',
    
    // Collections
    'collections.deals.today': 'Heutige Angebote',
    'collections.newcomers': 'Neuankömmlinge',
    'collections.smart.storage.solutions': 'Intelligente Lagerlösungen',
    'collections.storage.solutions': 'Lagerlösungen',
    'collections.garden.outdoor': 'Garten und Außenbereich',
    'collections.office.gaming': 'Büro und Gaming',
    'collections.cleaning.essentials': 'Reinigungsgrundlagen',
    'collections.bedroom.furniture': 'Schlafzimmermöbel',
    'collections.home.kitchen': 'Haus und Küche',
    'collections.electronics': 'Elektronik',
    'collections.beauty.personal.care': 'Schönheit und Körperpflege',
    'collections.sports.outdoors': 'Sport und Outdoor',
    'collections.toys.games': 'Spielzeug und Spiele',
    'collections.automotive': 'Automobil',
    'collections.tools.home.improvement': 'Werkzeuge und Heimwerker',
    'collections.baby.nursery': 'Baby und Kinderzimmer',
    'collections.security.safety': 'Sicherheit und Schutz',
    'collections.pet.supplies': 'Tierbedarf',
    'collections.books.media': 'Bücher und Medien',
    
    // Footer sections
    'footer.back.to.top': 'Nach oben',
    'footer.copyright': '© 1996-2024, Amazon.com, Inc. oder seine Tochtergesellschaften',
    'footer.change.country': 'Land/Region ändern',
    'footer.about.us': 'Über uns',
    'footer.careers': 'Karriere',
    'footer.press.releases': 'Pressemitteilungen',
    'footer.amazon.science': 'Amazon Science',
    'footer.get.to.know': 'Lernen Sie uns kennen',
    'footer.make.money': 'Verdienen Sie Geld mit uns',
    'footer.sell.products': 'Verkaufen Sie Produkte auf Amazon',
    'footer.sell.business': 'Verkaufen Sie auf Amazon Business',
    'footer.sell.apps': 'Verkaufen Sie Apps auf Amazon',
    'footer.become.affiliate': 'Werden Sie Affiliate',
    'footer.business.card': 'Amazon Business Karte',
    'footer.shop.points': 'Einkaufen mit Punkten',
    'footer.reload.balance': 'Laden Sie Ihr Guthaben auf',
    'footer.currency.converter': 'Amazon Währungsrechner',
    'footer.covid': 'Amazon und COVID-19',
    'footer.payment.products': 'Amazon Zahlungsprodukte',
    'footer.help.you': 'Lassen Sie uns Ihnen helfen',
    'footer.your.account': 'Ihr Konto',
    'footer.your.orders': 'Ihre Bestellungen',
    'footer.shipping.rates': 'Versandkosten und Richtlinien',
    
    // Product information
    'product.information.title': 'Produktinformationen',
    'product.technical.details.title': 'Technische Details',
    'spec.product.dimensions': 'Produktabmessungen',
    'spec.special.features': 'Besondere Merkmale',
    'spec.item.weight': 'Artikelgewicht',
    'spec.material': 'Material',
    'spec.asin': 'ASIN',
    'spec.date.first.available': 'Erstverfügbarkeitsdatum',
    'spec.manufacturer': 'Hersteller',
    
    // Product features
    'product.feature.high.quality.construction': 'Hochwertige Konstruktion',
    'product.feature.safety.tested': 'Sicherheitstestet',
    'product.feature.return.policy': '30-Tage Rückgabepolitik',
    
    // Color and size options
    'product.color.name': 'Farbname',
    'product.size.name': 'Größenname',
    
    // Store and returns
    'product.visit.store': 'Besuchen Sie den {store} Store',
    
    // Clearance sale
    'clearance.sale.label': 'Ausverkauf:',
    
    // Additional translations
    'search.placeholder': 'Suchen',
    'account.hello': 'Hallo, Ihr Konto',
    'account.returns': 'Rücksendungen & Bestellungen',
    'account.cart': 'Warenkorb',
    'deliver.to': 'Liefern an',
    'product.add.to.basket': 'In den Warenkorb',
    'product.buy.now': 'Jetzt kaufen',
    'product.in.stock': 'Auf Lager',
    'product.free.returns': 'KOSTENLOSE Rückgabe',
    'product.quantity': 'Menge:',
    'product.about.this.item': 'Über diesen Artikel',
    'product.customer.reviews': 'Kundenbewertungen',
    'product.delivery.to': 'Liefern an {country}',
    'product.usually.dispatched': 'Normalerweise innerhalb von 1 bis 2 Monaten versandt',
    'product.only.left': 'Nur noch {count} auf Lager!',
    'product.free.ups': 'KOSTENLOSE UPS Lieferung',
    'product.fast.free.ups': 'Schnelle, KOSTENLOSE UPS Lieferung',
    'product.delivery.tomorrow': 'KOSTENLOSE Lieferung morgen',
    'product.stock.count': 'Auf Lager',
    'product.secure.transaction.text': 'Sichere Transaktion',
    'product.ships.from.text': 'Versand von',
    'product.sold.by.text': 'Verkauft von',
    'product.add.to.wishlist.text': 'Zur Wunschliste hinzufügen',
    'product.add.gift.options.text': 'Geschenkoptionen hinzufügen',
    'product.about.this.item.text': 'Über diesen Artikel',
    'product.details.text': 'Produktdetails',
    'product.technical.details.text': 'Technische Details',
    'product.customer.reviews.text': 'Kundenbewertungen',
    'product.global.ratings.text': '{count} globale Bewertungen',
    'product.all.reviews.text': 'Alle Bewertungen',
    'product.see.all.reviews.text': 'Alle Bewertungen anzeigen',
    'homepage.todays.deals': 'Heutige Angebote',
    'homepage.all.products': 'Alle Produkte',
    'homepage.all.products.subtitle': 'Entdecken Sie unsere komplette Produktsammlung',
    'homepage.view.all.products': 'Alle Produkte anzeigen'
  },
  
  tr: { // Turkish
  }
};

// Get translation for a key in the current language
export const getTranslation = (key: string, language: string = 'en', params?: Record<string, string | number>): string => {
  // Convert language code to match our translation keys
  const langKey = language === 'gb' ? 'en' : language;
  
  const translations = TRANSLATIONS[langKey as keyof typeof TRANSLATIONS] || TRANSLATIONS.en;
  let text: string = (translations as Record<string, string>)[key] || (TRANSLATIONS.en as Record<string, string>)[key] || key;
  
  // Replace parameters
  if (params) {
    Object.entries(params).forEach(([param, value]) => {
      text = text.replace(new RegExp(`{${param}}`, 'g'), String(value));
    });
  }
  
  return text;
};

// Get country configuration
export const getCountryConfig = (countryCode: string): CountryConfig => {
  return COUNTRIES.find(country => country.code === countryCode) || COUNTRIES[0];
};

// Format price with correct currency and country-specific pricing
export const formatPrice = (price: string, countryCode: string): string => {
  const country = getCountryConfig(countryCode);
  const numericPrice = parseFloat(price.replace(/[^0-9.]/g, ''));
  
  if (isNaN(numericPrice)) return price;
  
  // Convert GBP price to local currency based on country
  let convertedPrice = numericPrice;
  
  switch (country.currency) {
    case 'EUR':
      // Convert £ to € (approximately €1.15 per £1)
      convertedPrice = numericPrice * 1.15;
      return `€${convertedPrice.toFixed(2)}`;
    case 'DKK':
      // Convert £ to DKK (approximately 8.5 kr per £1)
      convertedPrice = numericPrice * 8.5;
      return `${convertedPrice.toFixed(0)} kr`;
    case 'NOK':
      // Convert £ to NOK (approximately 13 kr per £1)
      convertedPrice = numericPrice * 13;
      return `${convertedPrice.toFixed(0)} kr`;
    case 'CHF':
      // Convert £ to CHF (approximately CHF 1.12 per £1)
      convertedPrice = numericPrice * 1.12;
      return `CHF ${convertedPrice.toFixed(2)}`;
    case 'TRY':
      // Convert £ to TRY (approximately ₺40 per £1)
      convertedPrice = numericPrice * 40;
      return `₺${convertedPrice.toFixed(0)}`;
    case 'ZAR':
      // Convert £ to ZAR (approximately R 23 per £1)
      convertedPrice = numericPrice * 23;
      return `R${convertedPrice.toFixed(0)}`;
    default:
      // Keep original price for GBP
      return `£${numericPrice.toFixed(2)}`;
  }
}; 