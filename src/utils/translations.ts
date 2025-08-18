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
    'nav.outdoor.storage': 'Outdoor Storage',
    'nav.garden.benches': 'Garden Benches',
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
      'product.name.keter.eden.bench': 'Keter Eden Bench 265L Outdoor Garden Furniture Storage Box',
    'product.features.keter.eden.bench.1': '265L storage capacity',
    'product.features.keter.eden.bench.2': 'Comfortably seats two adults',
    'product.features.keter.eden.bench.3': 'Lockable option for added security',
    'product.features.keter.eden.bench.4': 'Made of durable, weather-resistant resin',
    'product.features.keter.eden.bench.5': '60% recycled material',
    'product.features.keter.eden.bench.6': 'Fade-free and maintenance-free',
    'product.features.keter.eden.bench.7': 'Wood effect panel traditional beige cream finish',
    'product.features.keter.eden.bench.8': 'All weather resistant construction',
    'product.about.keter.eden.bench.1': 'Ideal outdoor garden bench for garden tools and equipment, garden furniture cushions, garden games and accessories',
    'product.about.keter.eden.bench.2': 'Decorative wood panelled style with 265 Litre capacity keeping all ventilated and dry',
    'product.about.keter.eden.bench.3': 'Comfortably seats two adults and has lockable option for added security',
    'product.about.keter.eden.bench.4': 'Made of durable, weather-resistant, maintenance fade-free and 60% recycled resin',
    'product.about.keter.eden.bench.5': 'Assembled external dimensions: 132.5L x 75W x 18.5H',
    'product.review.title.excellent.good.sized.bench': 'Excellent good sized bench',
    'product.review.content.excellent.good.sized.bench': 'Reasonably priced & practical. Good sized bench, easy to put together with clear instructions, you just need a screwdriver and maybe another pair of hands. Seems a little flimsy when assembling but once all together it\'s very sturdy. Holds loads of garden cushions and looks very stylish too.',
    'product.review.title.damn.good.garden.storage.bench': 'Damn good garden storage bench',
    'product.review.content.damn.good.garden.storage.bench': 'I read alot of the reviews about this and there are some quite negative ones. However, I read them carefully and came to the conclusion that some people are a bit picky. I received this bench, very well packaged. I really can\'t complain about how tidy it was packed and the polystyrene around the parts. As with anything flat packed, you do need to understand how to put a lego set together. Having a lego set when you were a child would be a bonus for understanding the instructions. The instructions are very clear if you read very carefully and ensure you take notice of what parts go where and what screws to use where. It\'s not difficult to understand, but just requires being organised and ensuring you understand the parts before putting it together. If you do that, it\'s a breeze. Some people have complained about left over plastic on some parts from the injection mould. In all honesty, when you buy anything that is injection moulded you should expect a little thin left over plastic. Mine did have this in one or two small places, but it is so thin that it is easy to break off.',
    'product.review.title.value.for.money.sturdy.storage.bench': 'Value for money, sturdy storage bench',
    'product.review.content.value.for.money.sturdy.storage.bench': 'Read lots of the reviews for this product before placing my order on the 15/2/25. I needed an item for storage while emptying my garage/workshop. The idea of it being a seat proved even more useful. The reviews were very mixed but so long as all the bits were there and it went together I\'d be happy. Large box arrived on 18/2/25, well packed which was good becaused the delivery driver tried to carry it by one of the plastic ties around it which broke! Not surprisingly, he dropped the box. He placed it in my garage for me to open at leisure. Morning of the 19/2/25, I opened the box and carfully removed all componants, checking them off and checking over them for faults. Nothing missing (in fact, extra screws were supplied), a couple a bits looked slghtly warped but from previous experience with flat packs, all had a bit of give in it so should go together. Layed an old sheet on the living room carpet and began putting it together (didn\'t want to do it on a hard service and scratch it). Everything was stamped with its number and the instructions were clear to follow. All was going well, I even managed step 4 on my own where it said 2 people. Step 5 took the longest time, getting the 2 slots in the centre to click in ( they had not been pressed out thoroughly) but an old flat bladed screwdriver serviced as a good mini chisel to cut the plastic away. Following steps all went smoothly until 12, fitting the 2nd side end on. Again a little cutting away of a slightly warped piece of plastic and it all clicked in fine. By click, you do hear a proper click when it falls into place. They suggest wearing work gloves, please do, I got a nasty pinch mark in the palm of my hand pushing one of the foot bases on, my own fault, I took the gloves of to do that bit! Took me 2 & 1/2 hours on my own from start to finish. Once finished it feels very sturdy and doesn\'t look too bad either, with a cushion on the seat and even a throw over the whole bench you would never know. Lots of storage space (it does say a maximum of 71lb inside). Very pleased with it considering the price. I would recommend this piece of furniture/storage. Can\'t say if its waterproof yet, it has only been stood ouside for 90 mins on a dry day! In the safety instructions it mentions "Wear safety googles and follow the manufacturers instructions when using power tools." You do NOT need any power tools to assemble this bench.',
    'product.review.title.great.bench': 'Great Bench',
    'product.review.content.great.bench': 'Bought the bench as a replacement for a garden box and it is perfect. Looks great, bought the mushroom/beige/ brown seat. Good area for storage, very sturdy. All the components were clearly labelled and easy to follow instructions. Extremely pleased with this bench and would definitely recommend.',
    'product.review.title.good.quality.and.looks.great': 'Good quality and looks great',
    'product.review.content.good.quality.and.looks.great': 'Why did you choose this product over others?: Good value for money and easy to assemble with clear instructions and even spare screws! Very pleased with this purchase. Arrived quickly too and with good communication from the delivery team.',
    
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
    'product.info.warranty': 'Warranty',
    'product.info.recycled.content': 'Recycled Content',
    
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
    'product.detail.seat.height': 'Seat Height',
    'product.detail.storage.capacity': 'Storage Capacity',
    'product.detail.lockable': 'Lockable',
    'product.detail.yes': 'Yes',
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
    
    // Keter City Storage Box translations
    'product.about.keter.city.storage.box.1': 'Ideal outdoor garden storage box for garden tools and equipment, garden furniture cushions, garden games and accessories',
    'product.about.keter.city.storage.box.2': 'Decorative wood effect panelled style with 113 L capacity keeping all ventilated and dry',
    'product.about.keter.city.storage.box.3': 'Perfect for balconies and small areas and ready to use in just 5 minutes',
    'product.about.keter.city.storage.box.4': 'Made of durable, weatherproof, maintenance and fade-free and 96% recycled resin',
    'product.about.keter.city.storage.box.5': 'Assembled external dimensions: 57.8 x 44 x 55 cm (L x W x H); Internal dimensions: 57.7 x 41.6 x 51.6 cm (L x W x H)',
    
    'product.features.keter.city.storage.box.1': '113L storage capacity',
    'product.features.keter.city.storage.box.2': 'Perfect for balconies and small areas',
    'product.features.keter.city.storage.box.3': 'Lockable option for added security',
    'product.features.keter.city.storage.box.4': 'Made of durable, weatherproof resin',
    'product.features.keter.city.storage.box.5': '96% recycled material',
    'product.features.keter.city.storage.box.6': 'Fade-free and maintenance-free',
    'product.features.keter.city.storage.box.7': 'Grey wood panel effect finish',
    'product.features.keter.city.storage.box.8': 'All weather resistant construction',
    'product.features.keter.city.storage.box.9': 'Built-in handles for easy moving',
    'product.features.keter.city.storage.box.10': '5-minute assembly with no tools required',
    
    // Keter Bevy Bar translations
    'product.about.keter.bevy.bar.1': 'The Bevy Bar is the perfect party accessory as it combines a beverage cooler and cocktail table.',
    'product.about.keter.bevy.bar.2': 'Equipped with a double wall cooler that keeps contents cold, it can store up to 65 bottles or 130 cans.',
    'product.about.keter.bevy.bar.3': 'Lock the lid securely when open and use it as a side table to serve food and drinks.',
    'product.about.keter.bevy.bar.4': 'Open size: 83.5cm (L) x 75cm (W) x 40.5cm (H) Closed size: 83.5cm (L) x 52cm (W) x 5cm (H)',
    'product.about.keter.bevy.bar.5': 'Made from recycled plastic, the Bevy Bar requires little maintenance.',
    'product.about.keter.bevy.bar.6': 'Three-in-one furniture: combine a drink cooler, a cocktail table or a coffee table.',
    'product.about.keter.bevy.bar.7': 'The Bevy Bar can be used open or closed.',
    
    'product.features.keter.bevy.bar.1': '60 litre capacity',
    'product.features.keter.bevy.bar.2': 'UV treated',
    'product.features.keter.bevy.bar.3': 'Insulated',
    'product.features.keter.bevy.bar.4': 'Maintenance-free',
    'product.features.keter.bevy.bar.5': 'Double wall cooler',
    'product.features.keter.bevy.bar.6': 'Stores up to 65 bottles or 130 cans',
    'product.features.keter.bevy.bar.7': 'Lockable lid',
    'product.features.keter.bevy.bar.8': 'Three-in-one furniture design',
    'product.features.keter.bevy.bar.9': 'Made from recycled plastic',
    'product.features.keter.bevy.bar.10': 'Easy to clean and maintain',
    
    // Keter Marvel Storage Box translations - English
    'product.about.keter.marvel.storage.box.1': 'Ideal outdoor garden storage box for garden tools and equipment, garden furniture cushions, garden games and accessories',
    'product.about.keter.marvel.storage.box.2': 'Decorative wood panel-style finishing with 71G capacity keeping all items ventilated and dry',
    'product.about.keter.marvel.storage.box.3': 'Built-in handles for convenient portability and can comfortably seats two adults',
    'product.about.keter.marvel.storage.box.4': 'Made of durable, weatherproof, maintenance and fade-free and 65% recycled resin',
    'product.about.keter.marvel.storage.box.5': 'Assembled external dimensions: 116.7 x 44.7 x 57 cm (L x W x H); Internal dimensions: 114.4 x 40 x 51.2 cm (L x W x H)',
    
    // Keter Marvel Storage Box Features - English
    'product.features.keter.marvel.storage.box.1': '270L storage capacity for garden tools and equipment',
    'product.features.keter.marvel.storage.box.2': 'Decorative wood panel-style finishing with 71G capacity',
    'product.features.keter.marvel.storage.box.3': 'Built-in handles for convenient portability',
    'product.features.keter.marvel.storage.box.4': 'Can comfortably seat two adults (supports up to 220 kg)',
    'product.features.keter.marvel.storage.box.5': 'Made of durable, weatherproof, maintenance and fade-free resin',
    'product.features.keter.marvel.storage.box.6': '65% recycled resin material for sustainability',
    'product.features.keter.marvel.storage.box.7': 'Lockable design for added security (lock not included)',
    'product.features.keter.marvel.storage.box.8': 'Rollable with built-in wheels for easy movement',
    'product.features.keter.marvel.storage.box.9': 'All weather resistant and waterproof',
    'product.features.keter.marvel.storage.box.10': 'Zero maintenance required',
    
    // PAWZ Road Cat Tree translations
    'product.about.pawz.road.cat.tree.1': 'Ultimate Activity House: Equipped with a roomy condo, spacious hammock, cozy plush top perch, natural sisal covered scratching posts and fluffy dangling ball, this 116cm cat tree is an ideal place for entertaining as well as taking a good rest.',
    'product.about.pawz.road.cat.tree.2': 'Comfy Rest Sports for Heavy Cats: Featuring a super large hammock with length of 45*40cm, fixed in each corner points, it\'s strong enough to support your fatty fuzzy baby.',
    'product.about.pawz.road.cat.tree.3': 'Exercise & Nail Health Taken Care: 4 natural sisal covered posts allows them to release emotions and have daily claw exercises without damaging your delicate furniture.',
    'product.about.pawz.road.cat.tree.4': 'Reliable Quality: Stability and safety are always the key points. Crafted by soft plush fabric, CARB-certified natural particle boards, firm sisal wrapped posts and strengthened base.',
    'product.about.pawz.road.cat.tree.5': 'Easy Installation: Illustrated assemble manual included, also you could look up video on YouTube for easier installation. No need extra tools with the contained hardware pack.',
    
    'product.features.pawz.road.cat.tree.1': '116cm height for medium cats',
    'product.features.pawz.road.cat.tree.2': '4 natural sisal scratching posts',
    'product.features.pawz.road.cat.tree.3': 'Large hammock (45x40cm)',
    'product.features.pawz.road.cat.tree.4': 'Cozy plush condo',
    'product.features.pawz.road.cat.tree.5': 'Top perch with raised rim',
    'product.features.pawz.road.cat.tree.6': 'Metal frame construction',
    'product.features.pawz.road.cat.tree.7': 'Stable and sturdy base',
    'product.features.pawz.road.cat.tree.8': 'Easy assembly',
    'product.features.pawz.road.cat.tree.9': 'CARB-certified materials',
    'product.features.pawz.road.cat.tree.10': 'Suitable for heavy cats',
    
    // Feandrea Cat Tree translations
    'product.about.feandrea.cat.tree.1': 'Give Your Cute Kitty A Comfy Home! - Large size of 100 x 90 x 165 cm (W x D x H); this cat tree provides enough space for almost all cats of different ages and sizes',
    'product.about.feandrea.cat.tree.2': 'Still Sturdy & Stable Even Your Cats Are Overactive - The base is made of high quality chipboard and the anti-toppling strap included to secure the stability of the entire cat tree; rounded corners of each board prevents harm to you & your felines',
    'product.about.feandrea.cat.tree.3': 'Scratching Posts - Natural sisal covered posts satisfy cats\' instinct for scratching and rubbing, spare your furniture from their sharp claws',
    'product.about.feandrea.cat.tree.4': 'Relax & Lounge Comfortably - Equipped with a plush cat house, hanging basket and cozy perches, even the pickiest cat can always find itself a pleasant space',
    'product.about.feandrea.cat.tree.5': 'Fun to Play - Multi-leveled design allows your cats to freely jump, climb and explore around their cat tower, cozy tunnel and ball with bell provide even more options for your cats to enjoy themselves',
    
    'product.features.feandrea.cat.tree.1': 'Large size 100 x 90 x 165 cm',
    'product.features.feandrea.cat.tree.2': 'Multi-level design for multiple cats',
    'product.features.feandrea.cat.tree.3': 'Natural sisal covered scratching posts',
    'product.features.feandrea.cat.tree.4': 'Plush cat house with cozy perches',
    'product.features.feandrea.cat.tree.5': 'Hanging basket for lounging',
    'product.features.feandrea.cat.tree.6': 'Anti-toppling strap included',
    'product.features.feandrea.cat.tree.7': 'Rounded corners for safety',
    'product.features.feandrea.cat.tree.8': 'High quality chipboard base',
    'product.features.feandrea.cat.tree.9': 'Compressed cardboard supporting tubes',
    'product.features.feandrea.cat.tree.10': 'Suitable for cats up to 7kg',
    
    // PAWZ Road Cat Tree Review translations
    'product.review.pawz.road.cat.tree.title.gets.cats.approval': 'Gets my cats approval',
    'product.review.pawz.road.cat.tree.content.gets.cats.approval': 'Nice sturdy cat tree which was bought to replace one that eventually became wobbly with age. The old one was mainly used by only one of my four cats who claimed it even before I finished putting it together and she would let the other three know they weren\'t welcome when she was on it. So I made sure to assemble this one with her out of the room so the others could try it out first and it worked because she is happy to share it with the others. Just a little tip for anyone who has a similar problem. Plenty of room for four cats with several places to nap or just watch the comings and goings of the household. It easily holds the combined weight of 20kgs of all four cats without wobbling when they climb or jump on and off. I am useless at putting flat pack things together but I found assembling this cat tree easy and it came with clear instructions. The cats love using the tree and there\'s usually at least one of them on it at any time day and night and I love it because it\'s nice looking at a bargain price. A good buy.',
    
    'product.review.pawz.road.cat.tree.title.looks.lovely.cats.happy': 'Looks lovely, cats happy',
    'product.review.pawz.road.cat.tree.content.looks.lovely.cats.happy': 'As usual the numbers/letter were incorrect on the items. We just took a screenshot of the product on Amazon\'s site to provide a proper idea of what goes where. Once that was sorted it was fairly easy to put together. All the necessary screws are provided plus an allen key. Both cats have already been on it and seem to like it, although the best bit for them was noisily rolling around on the plastic bag (supervised ofc). The tree appears to be stable even with a cat or two jumping on and off it. The teddy bear fleece covering all the structures of the tree are lovely and soft, the colours are as pictured, however, other than the cactus and the border around the top level, the fleece is rather thin. This however doesn\'t detract from how nice it looks.',
    
    'product.review.pawz.road.cat.tree.title.perfect.larger.cats': 'Perfect for larger cats!',
    'product.review.pawz.road.cat.tree.content.perfect.larger.cats': 'Our very large snowshoe cat always struggles to squeeze herself onto most cat trees + they wobble under her weight. This tree is very sturdy, no wobbling at all and she fits perfectly on every level. She immediately went to sleep on the highest section. This is the third cat tree we\'ve tried and by far the best! Worth every penny. We now have a very happy cat. Was very easy to put together.',
    
    'product.review.pawz.road.cat.tree.title.lovely.lil.purchase': 'Lovely lil purchase',
    'product.review.pawz.road.cat.tree.content.lovely.lil.purchase': 'Seems pretty decent quality for the price. Nice and sturdy. Cats love it (for reference my cats are huge, easily 5-8kg😂)',
    
    'product.review.pawz.road.cat.tree.title.cat.likes.design.build': 'My cat likes it but I think the design & build could be more cat friendly',
    'product.review.pawz.road.cat.tree.content.cat.likes.design.build': 'Overall it\'s a pretty good product, was easy to put together and seems sturdy once built. My cat took to it very quickly and spends lots of time snoozing in the top bed. She even uses the sisal wrapped posts for her claws. But she has never used the little \'den\' compartment and has only recently used the bottom \'hammock\' part. My main gripe is that there is not much \'foothold\' space, and she often has to do a controlled fall to get off it. It could also be better padded, for safety. When she is playing, she often loses her footing or her balance, and when trying to catch herself, has hurt herself on the sharp edges, despite them being covered in fur fabric, (which is the only thing she can grip on to stop or slow a fall). She also has fallen out of the top bed whilst having a stretch or a roll. Poor baby! But she does like it, so I\'m generally happy.',
    
    // Keter Bevy Bar Review translations
    'product.review.keter.bevy.bar.title.excellent.size': 'Excellent size for what I needed',
    'product.review.keter.bevy.bar.content.excellent.size': 'Perfect size and shape. Very sturdy and easy to use/ move around in the garden to where I want/need it 👍',
    
    'product.review.keter.bevy.bar.title.great.cool.box': 'Great cool box',
    'product.review.keter.bevy.bar.content.great.cool.box': 'Great cool box which turns into a decent height table which you can use to put drinks on. We get loads of compliments about it and asked where it\'s from. Great price and easy to put together with easy to clean with a wipe. Only this to note is that you shouldn\'t sit on it as it cannot hold a persons weight. It is light weight and easy to move.',
    
    'product.review.keter.bevy.bar.title.worth.price': 'Worth the price',
    'product.review.keter.bevy.bar.content.worth.price': 'Great for hosting, I left the box outside for guests to take their drinks and their drinks remained cold. Great product.',
    
    'product.review.keter.bevy.bar.title.nice.looking.multifunctional': 'Nice looking multifunctional table',
    'product.review.keter.bevy.bar.content.nice.looking.multifunctional': 'Really well made, solid outdoors table. The table top lifts up to show the ice bucket below that means it is multifunctional. It looks really beautiful on a patio. Easy to clean. I have left mine out over winter with no problems at all.',
    
    'product.review.keter.bevy.bar.title.statement.piece': 'Statement piece',
    'product.review.keter.bevy.bar.content.statement.piece': 'Great addition to the summer BBQs. Very easy to assemble and adjust. We have been putting in 2 bags of ice with space for about 25-30 cans. It is so much more convenient then taking up fridge space and going back and forth to top up guests. Also acts as another table for the garden which is useful. Everyone has complimented us on what a smart little table it is. Would have been 5 stars however the handle to the plug came off after the second use. Not a major issue as it is very easy to push the plug from the bottom to drain.',
    
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
    'product.pattern.wood.effect': 'Wood effect',
    'product.shape.horizontal': 'Horizontal',
    'product.shape.rectangular': 'Rectangular',
    'product.batteries.no': 'No',
    'product.date.first.available.march.2021': '1 Mar. 2021',
    'product.date.first.available.january.2011': '1 Jan. 2011',
    'product.variant.size': 'Size',
    'product.variant.colour': 'Colour',
    'product.delivery.free.prime': 'Free Prime delivery',
    'product.safety.lockable.design': 'Lockable design',
    'product.safety.uv.resistant': 'UV resistant',
    'product.safety.weatherproof.construction': 'Weatherproof construction',
    'product.safety.weather.resistant': 'Weather resistant',
    'product.safety.fade.free': 'Fade free',
    'product.safety.all.weather.resistant': 'All weather resistant',
    'product.safety.safe.and.secure': 'Safe and secure',
    'product.safety.zero.maintenance': 'Zero maintenance',
    
    // Keter Bevy Bar Safety Features
    'product.safety.uv.treated': 'UV treated',
    'product.safety.insulated': 'Insulated',
    'product.safety.maintenance.free': 'Maintenance-free',
    'product.safety.child.safe.construction': 'Child-safe construction',
    
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
    
    // Keter City Storage Box Customer Reviews
    'product.review.keter.city.title.perfect': 'It\'s perfect 👌',
    'product.review.keter.city.content.perfect': 'Absolutely perfect! So very pleased with this garden storage container. It\'s very sturdy, fits and clips into the relevant slots, looks amazing, very good value for money along with adding a padlock if needed and the lid is a great feature, highly recommend.',
    
    'product.review.keter.city.title.great.assembly': 'Great assembly, nice product, good value.',
    'product.review.keter.city.content.great.assembly': 'This was really well packed. All pieces fitted together well, a couple needed a little persuasion with a flat block of wood, just because they were a bit tight for me to push together. Easy to move into position, very sturdy once assembled, and lid fits well on top. Hopefully it will be watertight as all edges overlap and there are no holes anywhere. Perfect for regularly used tools on the patio, saving a trip to the garage, and keeping everything close at hand.',
    
    'product.review.keter.city.title.keter.storage.box': 'Keter Storage Box',
    'product.review.keter.city.content.keter.storage.box': 'Bought this as a parcel box for the front door and it fitted the space perfectly. It was really easy to put together as no tools required and simple to move as it is light weight. Build quality feels good as I would expect from ketter and the lid opens and closes without catching. This Keter storage box was great value for money and is currently on offer.',
    
    'product.review.keter.city.title.solid.so.far': 'Solid so far so good',
    'product.review.keter.city.content.solid.so.far': 'I recently bought this Keter City 113L outdoor storage box and I\'m really pleased with it so far. It fits perfectly on my small balcony and offers a decent amount of storage for its size. The grey wood panel effect looks stylish and modern, and I love that it\'s made from 96% recycled materials. It feels sturdy and has already stood up well to a bit of rain, with no signs of fading or damage.',
    
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
    'trust.secure': 'Secure',
    'trust.easy.returns': 'Easy Returns',
    
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
    'nav.outdoor.storage': 'Udendørs Opbevaring',
    'nav.garden.benches': 'Havebænke',
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
    
    // About this item content - Danish
    'product.about.keter.storage.shed.1': 'Ideel udendørs opbevaringsløsning til haveværktøj og udstyr, BBQ og tilbehør og x2 120L skraldespande.',
    'product.about.keter.storage.shed.2': 'Elegante træeffektpaneler, der åbner fra toppen eller fronten og med en låsbar funktion til sikker lukning.',
    'product.about.keter.storage.shed.3': 'Tungt gulv med indbygget støtte til hylder og 880 L kapacitet. Hylder er ikke inkluderet.',
    'product.about.keter.storage.shed.4': 'Samlet dimensioner: 132 x 71,5 x 113,5 cm (L x B x H); interne dimensioner: 122 x 61 x 108,8 cm (L x B x H).',
    'product.about.keter.storage.shed.5': 'Vejrbestandig, nul vedligeholdelse, nem at rense, fade-fri konstruktion.',
    'product.about.keter.storage.shed.6': 'Indbyggede ventilationspaneler til rigelig luftstrøm.',
    'product.about.keter.storage.shed.7': 'To døre på fronten og et toplåg med unikt låsesystem.',
    'product.about.keter.storage.shed.8': 'Kan låse døre og top sammen eller kun låse døre for barnesikker adgang ovenfra (hængelås er ikke inkluderet).',
    'product.about.keter.storage.shed.9': 'Samletid: cirka 20-40 minutter, anbefalet til 1 person.',
    
    // Product detail values - Danish
    'product.color.light.grey.dark.cover': 'Lys grå med mørk grå låg',
    'product.material.resin': 'Harpiks',
    'product.dimensions.71.5x132x113.5': '71,5D x 132B x 113,5H centimeter',
    'product.weight.21.5kg': '21,5 kilogram',
    'product.volume.880l': '880 liter',
    'product.uv.resistant': 'UV-bestandig',
    'product.special.features.heavy.duty': 'Tungt, Vandbestandig, Vandtæt',
    'product.usage.outdoor.storage': 'udendørs opbevaring, indendørs opbevaring, haveopbevaring',
    'product.assembly.time.20.40.minutes': '20-40 minutter',
    'product.assembly.recommended.1.person': '1 person',
    
    // Technical detail values - Danish
    'product.size.132x71.5x113.5.cm': '132 x 71,5 x 113,5 cm',
    'product.style.single': 'Enkelt',
    'product.pattern.single': 'Enkelt',
    'product.pattern.wood.effect': 'Træeffekt',
    'product.shape.horizontal': 'Horisontal',
    'product.shape.rectangular': 'Rektangulær',
    'product.batteries.no': 'Nej',
    'product.date.first.available.march.2021': '1. marts 2021',
    'product.date.first.available.january.2011': '1. januar 2011',
    'product.style.name': 'Stilnavn:',
    
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
    'product.info.warranty': 'Garanti',
    'product.info.recycled.content': 'Genanvendt Indhold',
    
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
    'product.detail.seat.height': 'Sædehøjde',
    'product.detail.storage.capacity': 'Opbevaringskapacitet',
    'product.detail.lockable': 'Låsbar',
    'product.detail.yes': 'Ja',
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
    'product.technical.details': 'Tekniske detaljer',
    
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
      'product.name.keter.eden.bench': 'Keter Eden Bænk 265L Udendørs Have Møbel Opbevaringsboks',
    'product.features.keter.eden.bench.1': '265L opbevaringskapacitet',
    'product.features.keter.eden.bench.2': 'Komfortabel siddeplads til to voksne',
    'product.features.keter.eden.bench.3': 'Låsbar mulighed for øget sikkerhed',
    'product.features.keter.eden.bench.4': 'Fremstillet af holdbart, vejrbestandigt harpiks',
    'product.features.keter.eden.bench.5': '60% genanvendt materiale',
    'product.features.keter.eden.bench.6': 'Fade-fri og vedligeholdelsesfri',
    'product.features.keter.eden.bench.7': 'Træeffekt panel traditionel beige creme finish',
    'product.features.keter.eden.bench.8': 'Al vejr bestandig konstruktion',
    'product.about.keter.eden.bench.1': 'Ideel udendørs havebænk til haveværktøj og udstyr, havemøbel puder, havelege og tilbehør',
    'product.about.keter.eden.bench.2': 'Dekorativ træpanelet stil med 265 Liter kapacitet der holder alt ventileret og tørt',
    'product.about.keter.eden.bench.3': 'Komfortabel siddeplads til to voksne og har låsbar mulighed for øget sikkerhed',
    'product.about.keter.eden.bench.4': 'Fremstillet af holdbart, vejrbestandigt, vedligeholdelsesfrit fade-frit og 60% genanvendt harpiks',
    'product.about.keter.eden.bench.5': 'Samlet eksterne dimensioner: 132,5L x 75B x 18,5H',
    
    // Keter City Storage Box Danish translations
    'product.about.keter.city.storage.box.1': 'Ideel udendørs haveopbevaringsboks til haveværktøj og udstyr, havemøbel puder, havelege og tilbehør',
    'product.about.keter.city.storage.box.2': 'Dekorativ træeffekt paneleret stil med 113 L kapacitet der holder alt ventileret og tørt',
    'product.about.keter.city.storage.box.3': 'Perfekt til balkoner og små områder og klar til brug på kun 5 minutter',
    'product.about.keter.city.storage.box.4': 'Fremstillet af holdbart, vejrbestandigt, vedligeholdelsesfrit fade-frit og 96% genanvendt harpiks',
    'product.about.keter.city.storage.box.5': 'Samlet eksterne dimensioner: 57,8 x 44 x 55 cm (L x B x H); Interne dimensioner: 57,7 x 41,6 x 51,6 cm (L x B x H)',
    
    'product.features.keter.city.storage.box.1': '113L opbevaringskapacitet',
    'product.features.keter.city.storage.box.2': 'Perfekt til balkoner og små områder',
    'product.features.keter.city.storage.box.3': 'Låsbar mulighed for øget sikkerhed',
    'product.features.keter.city.storage.box.4': 'Fremstillet af holdbart, vejrbestandigt harpiks',
    'product.features.keter.city.storage.box.5': '96% genanvendt materiale',
    'product.features.keter.city.storage.box.6': 'Fade-fri og vedligeholdelsesfri',
    'product.features.keter.city.storage.box.7': 'Grå træeffekt panel finish',
    'product.features.keter.city.storage.box.8': 'Al vejr bestandig konstruktion',
    'product.features.keter.city.storage.box.9': 'Indbyggede håndtag til nem flytning',
    'product.features.keter.city.storage.box.10': '5-minutters samling uden værktøj påkrævet',
    
    // Keter Bevy Bar Danish translations
    'product.about.keter.bevy.bar.1': 'Bevy Bar er det perfekte festtilbehør da den kombinerer en drikkekøler og cocktailbord.',
    'product.about.keter.bevy.bar.2': 'Udrustet med en dobbeltvægskøler der holder indholdet koldt, kan den opbevare op til 65 flasker eller 130 dåser.',
    'product.about.keter.bevy.bar.3': 'Lås lokket sikkert når det er åbent og brug det som et sidebord til at servere mad og drikke.',
    'product.about.keter.bevy.bar.4': 'Åben størrelse: 83,5cm (L) x 75cm (B) x 40,5cm (H) Lukket størrelse: 83,5cm (L) x 52cm (B) x 5cm (H)',
    'product.about.keter.bevy.bar.5': 'Fremstillet af genanvendt plastik kræver Bevy Bar kun lidt vedligeholdelse.',
    'product.about.keter.bevy.bar.6': 'Tre-i-én møbel: kombiner en drikkekøler, et cocktailbord eller et kaffebord.',
    'product.about.keter.bevy.bar.7': 'Bevy Bar kan bruges åben eller lukket.',
    
    'product.features.keter.bevy.bar.1': '60 liter kapacitet',
    'product.features.keter.bevy.bar.2': 'UV-behandlet',
    'product.features.keter.bevy.bar.3': 'Isoleret',
    'product.features.keter.bevy.bar.4': 'Vedligeholdelsesfri',
    'product.features.keter.bevy.bar.5': 'Dobbeltvægskøler',
    'product.features.keter.bevy.bar.6': 'Opbevarer op til 65 flasker eller 130 dåser',
    'product.features.keter.bevy.bar.7': 'Låsbart lok',
    'product.features.keter.bevy.bar.8': 'Tre-i-én møbeldesign',
    'product.features.keter.bevy.bar.9': 'Fremstillet af genanvendt plastik',
    'product.features.keter.bevy.bar.10': 'Nem at rense og vedligeholde',
    
    // Keter Marvel Storage Box Danish translations
    'product.about.keter.marvel.storage.box.1': 'Ideel udendørs haveopbevaringsboks til haveværktøj og udstyr, havemøbel puder, havelege og tilbehør',
    'product.about.keter.marvel.storage.box.2': 'Dekorativ træpanelet stil finish med 71G kapacitet der holder alle genstande ventileret og tørre',
    'product.about.keter.marvel.storage.box.3': 'Indbyggede håndtag til nem portabilitet og kan komfortabelt sidde to voksne',
    'product.about.keter.marvel.storage.box.4': 'Fremstillet af holdbart, vejrbestandigt, vedligeholdelsesfrit fade-frit og 65% genanvendt harpiks',
    'product.about.keter.marvel.storage.box.5': 'Samlet eksterne dimensioner: 116,7 x 44,7 x 57 cm (L x B x H); Interne dimensioner: 114,4 x 40 x 51,2 cm (L x B x H)',
    
    // Keter Marvel Storage Box Features - Danish
    'product.features.keter.marvel.storage.box.1': '270L opbevaringskapacitet til haveværktøj og udstyr',
    'product.features.keter.marvel.storage.box.2': 'Dekorativ træpanelet stil finish med 71G kapacitet',
    'product.features.keter.marvel.storage.box.3': 'Indbyggede håndtag til nem portabilitet',
    'product.features.keter.marvel.storage.box.4': 'Kan komfortabelt sidde to voksne (understøtter op til 220 kg)',
    'product.features.keter.marvel.storage.box.5': 'Fremstillet af holdbart, vejrbestandigt, vedligeholdelsesfrit fade-frit harpiks',
    'product.features.keter.marvel.storage.box.6': '65% genanvendt harpiks materiale til bæredygtighed',
    'product.features.keter.marvel.storage.box.7': 'Låsbar design til øget sikkerhed (lås er ikke inkluderet)',
    'product.features.keter.marvel.storage.box.8': 'Rullebar med indbyggede hjul til nem bevægelse',
    'product.features.keter.marvel.storage.box.9': 'Alt vejr bestandig og vandtæt',
    'product.features.keter.marvel.storage.box.10': 'Nul vedligeholdelse påkrævet',
    
    // PAWZ Road Cat Tree Danish translations
    'product.about.pawz.road.cat.tree.1': 'Ultimativ aktivitetshus: Udrustet med et rummeligt condo, rummelig hængekøje, hyggelig blød top-perch, naturlige sisal-dækkede kløpæle og fluffy dinglende bold, er denne 116cm katte-træ et ideelt sted til underholdning samt at tage en god hvile.',
    'product.about.pawz.road.cat.tree.2': 'Komfortable hvile-sports for tunge katte: Med en super stor hængekøje med længde på 45*40cm, fastgjort i hvert hjørnepunkt, er den stærk nok til at understøtte din fede fuzzy baby.',
    'product.about.pawz.road.cat.tree.3': 'Træning og negle-sundhed taget sig af: 4 naturlige sisal-dækkede pæle giver dem mulighed for at frigive følelser og have daglig klo-træning uden at beskadige dit delikate møbler.',
    'product.about.pawz.road.cat.tree.4': 'Pålidelig kvalitet: Stabilitet og sikkerhed er altid nøglepunkterne. Fremstillet af blød blød stof, CARB-certificerede naturlige spånplader, faste sisal-indviklede pæle og forstærket base.',
    'product.about.pawz.road.cat.tree.5': 'Nem installation: Illustreret samle-manual inkluderet, du kan også slå video op på YouTube for nemmere installation. Ingen ekstra værktøjer nødvendige med det indeholdte hardware-pakke.',
    
    'product.features.pawz.road.cat.tree.1': '116cm højde til mellem-katte',
    'product.features.pawz.road.cat.tree.2': '4 naturlige sisal kløpæle',
    'product.features.pawz.road.cat.tree.3': 'Stor hængekøje (45x40cm)',
    'product.features.pawz.road.cat.tree.4': 'Hyggelig blød condo',
    'product.features.pawz.road.cat.tree.5': 'Top-perch med hævet kant',
    'product.features.pawz.road.cat.tree.6': 'Metalframe konstruktion',
    'product.features.pawz.road.cat.tree.7': 'Stabil og solid base',
    'product.features.pawz.road.cat.tree.8': 'Nem samling',
    'product.features.pawz.road.cat.tree.9': 'CARB-certificerede materialer',
    'product.features.pawz.road.cat.tree.10': 'Egnet til tunge katte',
    
    // Feandrea Cat Tree Danish translations
    'product.about.feandrea.cat.tree.1': 'Giv din søde killing et komfortabelt hjem! - Stor størrelse på 100 x 90 x 165 cm (B x D x H); dette katte-træ giver nok plads til næsten alle katte af forskellige aldre og størrelser',
    'product.about.feandrea.cat.tree.2': 'Stadig solidt og stabilt selv når dine katte er overaktive - Basen er lavet af høj kvalitet spånplade og anti-vipestropen er inkluderet for at sikre stabiliteten af hele katte-træet; runde hjørner af hver plade forhindrer skade på dig og dine felines',
    'product.about.feandrea.cat.tree.3': 'Kløpæle - Naturlige sisal-dækkede pæle tilfredsstiller kattes instinkt for at klø og gnide, sparer dit møbler fra deres skarpe kløer',
    'product.about.feandrea.cat.tree.4': 'Slap af og hvil komfortabelt - Udrustet med et blød kattehus, hængende kurv og hyggelige percher, kan selv den mest kræsne kat altid finde sig et behageligt rum',
    'product.about.feandrea.cat.tree.5': 'Sjovt at lege - Multi-niveau design giver dine katte mulighed for frit at hoppe, klatre og udforske rundt om deres katte-tårn, hyggelig tunnel og bold med klokke giver endnu flere muligheder for dine katte at nyde sig selv',
    
    'product.features.feandrea.cat.tree.1': 'Stor størrelse 100 x 90 x 165 cm',
    'product.features.feandrea.cat.tree.2': 'Multi-niveau design til flere katte',
    'product.features.feandrea.cat.tree.3': 'Naturlige sisal-dækkede kløpæle',
    'product.features.feandrea.cat.tree.4': 'Blød kattehus med hyggelige percher',
    'product.features.feandrea.cat.tree.5': 'Hængende kurv til afslapning',
    'product.features.feandrea.cat.tree.6': 'Anti-vipestrop inkluderet',
    'product.features.feandrea.cat.tree.7': 'Runde hjørner for sikkerhed',
    'product.features.feandrea.cat.tree.8': 'Høj kvalitet spånplade base',
    'product.features.feandrea.cat.tree.9': 'Komprimeret papkarton støtterør',
    'product.features.feandrea.cat.tree.10': 'Egnet til katte op til 7kg',
    
    // VASAGLE TV Unit Danish translations
    'product.about.vasagle.tv.unit.1': 'LIGESOM PÅ TV: Det hvide TV-bord tilføjer et strejf af unik charme til dit rum. Du vil ikke føle nogen misundelse når du ser interiøret af lofts i Paris og New York i film og på TV.',
    'product.about.vasagle.tv.unit.2': 'Nok plads TV-bordet kan rumme TV op til 65 tommer. For små TV er det nok at placere planter på begge sider.',
    'product.about.vasagle.tv.unit.3': 'Alt er klar: vil din yndlingsfilm snart være på TV? Du kan placere spillekonsoller og modtagere i de 2 åbne rum og opbevare DVD\'er i rummene med døre. Filmen er i gang og du skal bare læne dig tilbage og nyde den.',
    'product.about.vasagle.tv.unit.4': 'Så simpelt som 1x1: takket være de klare instruktioner og de velidentificerede dele, sker samlingen uden at bryde hovedet. Efter arbejde har du stadig tid til at slå dig ned før visningen af din yndlingsfilm kl. 20:15.',
    'product.about.vasagle.tv.unit.5': '3, 2, 1, Action: Dette moderne TV-bord vil være din perfekte søndag aften ledsager. Tag chipsen gemt bag den tryk-åbne dør og nyd din film aften med familie eller venner.',
    
    'product.features.vasagle.tv.unit.1': '140 cm langt TV-bord til TV op til 65 tommer',
    'product.features.vasagle.tv.unit.2': '2 døre med justerbare hylder',
    'product.features.vasagle.tv.unit.3': 'Åbne rum til spillekonsoller og modtagere',
    'product.features.vasagle.tv.unit.4': 'Lukkede rum til DVD\'er og opbevaring',
    'product.features.vasagle.tv.unit.5': 'Høj kvalitet vandafvisende spånplade',
    'product.features.vasagle.tv.unit.6': '12 cm plads nedenunder til robotstøvsugning',
    'product.features.vasagle.tv.unit.7': 'To kabelhuller til nem kabelstyring',
    'product.features.vasagle.tv.unit.8': 'Moderne hvidt design til ethvert rum',
    'product.features.vasagle.tv.unit.9': 'Nem samling med klare instruktioner',
    'product.features.vasagle.tv.unit.10': 'Maksimal statisk belastningskapacitet: 50 kg',
    
    // VASAGLE TV Unit Danish translations
    'product.about.vasagle.tv.unit.1.dk': 'LIGESOM PÅ TV: Det hvide TV-bord tilføjer et strejf af unik charme til dit rum. Du vil ikke føle nogen misundelse når du ser interiøret af lofts i Paris og New York i film og på TV.',
    'product.about.vasagle.tv.unit.2.dk': 'Nok plads TV-bordet kan rumme TV op til 65 tommer. For små TV er det nok at placere planter på begge sider.',
    'product.about.vasagle.tv.unit.3.dk': 'Alt er klar: vil din yndlingsfilm snart være på TV? Du kan placere spillekonsoller og modtagere i de 2 åbne rum og opbevare DVD\'er i rummene med døre. Filmen er i gang og du skal bare læne dig tilbage og nyde den.',
    'product.about.vasagle.tv.unit.4.dk': 'Så simpelt som 1x1: takket være de klare instruktioner og de velidentificerede dele, sker samlingen uden at bryde hovedet. Efter arbejde har du stadig tid til at slå dig ned før visningen af din yndlingsfilm kl. 20:15.',
    'product.about.vasagle.tv.unit.5.dk': '3, 2, 1, Action: Dette moderne TV-bord vil være din perfekte søndag aften ledsager. Tag chipsen gemt bag den tryk-åbne dør og nyd din film aften med familie eller venner.',
    
    'product.features.vasagle.tv.unit.1.dk': '140 cm langt TV-bord til TV op til 65 tommer',
    'product.features.vasagle.tv.unit.2.dk': '2 døre med justerbare hylder',
    'product.features.vasagle.tv.unit.3.dk': 'Åbne rum til spillekonsoller og modtagere',
    'product.features.vasagle.tv.unit.4.dk': 'Lukkede rum til DVD\'er og opbevaring',
    'product.features.vasagle.tv.unit.5.dk': 'Høj kvalitet vandafvisende spånplade',
    'product.features.vasagle.tv.unit.6.dk': '12 cm plads nedenunder til robotstøvsugning',
    'product.features.vasagle.tv.unit.7.dk': 'To kabelhuller til nem kabelstyring',
    'product.features.vasagle.tv.unit.8.dk': 'Moderne hvidt design til ethvert rum',
    'product.features.vasagle.tv.unit.9.dk': 'Nem samling med klare instruktioner',
    'product.features.vasagle.tv.unit.10.dk': 'Maksimal statisk belastningskapacitet: 50 kg',
    
    // VASAGLE TV Unit Review translations
    'product.review.vasagle.tv.unit.title.easy.assemble.quick.delivery': 'Easy to assemble, quick delivery, value for money, beautiful furniture',
    'product.review.vasagle.tv.unit.content.easy.assemble.quick.delivery': 'I had the bright idea of buying two of these to make a longer stronger tv unit and I\'m so glad I did. I broke my wrist a week ago but I was still able to put both together in a day, beautifully made and so easy to put together I was so pleased. So much storage too! The units arrived 3 days earlier than stated and although the boxes were a bit beat up the pieces were packed safely. And because I had two I could see care was taken with each unit. The photos don\'t give the pattern in the wood the justice it deserves. I have a sky glass 55" tv weighing 12kg and it fits beautifully on the units. Highly recommend',
    
    'product.review.vasagle.tv.unit.title.quality.price.buy.it': 'This quality, at this price....buy it!',
    'product.review.vasagle.tv.unit.content.quality.price.buy.it': 'I needed a tv unit for a large tv in a smaller space, this fitted the bill, holds my 65" perfectly, matches my coffee table perfectly. It\'s very sturdy, it was straightforward building, and would lie if I said I wasn\'t impressed with that screwdriver - nice touch! Everything was well labelled, well packaged and arrived a day earlier. What\'s left to say?',
    
    'product.review.vasagle.tv.unit.title.great.value.money': 'Great value for money',
    'product.review.vasagle.tv.unit.content.great.value.money': 'A solid tv unit, much higher quality than more expensive high street brands like B&M and Argos. Really solid, and went together no problem. Looks great and modern, while being very functional. All screws fit well first time.',
    
    'product.review.vasagle.tv.unit.title.good.value': 'Good value',
    'product.review.vasagle.tv.unit.content.good.value': 'Some slight damage to the top piece of wood, but not too noticeable. Pretty easy to put together (each piece is lettered) but the front cabinets do not align properly; one door sits slightly higher than the other due to the pre-drilled holes. Slightly too gloss to match my other walnut furniture but good overall for the price.',
    
    'product.review.vasagle.tv.unit.title.great.tv.unit': 'Great tv unit.',
    'product.review.vasagle.tv.unit.content.great.tv.unit': 'I had a bit of trouble with the delivery. It comes in 2 boxes and I only received 1 which I only discovered 2 weeks after the delivery. I contacted the seller and their customer service was great 3 days later I had my 2nd box. They did offer a refund but I\'d taken a while to pick the tv stand I wanted so was happy to get the missing box. Great customer service. It took me nearly 3 hours to put together in my defence I\'m 68 with arthritic hands so I\'m sure it could be put together quicker. The unit is lovely very sturdy. I had no scratches, dents etc. The instructions very clear and easy to follow. I\'d recommend this unit.',
    
    // VASAGLE TV Unit Review Danish translations
    'product.review.vasagle.tv.unit.title.easy.assemble.quick.delivery.dk': 'Nem at samle, hurtig levering, værdi for pengene, smukt møbel',
    'product.review.vasagle.tv.unit.content.easy.assemble.quick.delivery.dk': 'Jeg havde den lyse idé at købe to af disse for at lave en længere stærkere tv-enhed og jeg er så glad for at jeg gjorde det. Jeg brækkede mit håndled for en uge siden, men jeg var stadig i stand til at sætte begge sammen på en dag, smukt lavet og så nem at sætte sammen jeg var så tilfreds. Så meget opbevaring også! Enhederne ankom 3 dage tidligere end angivet, og selvom boksene var lidt slået op, var stykkerne pakket sikkert. Og fordi jeg havde to, kunne jeg se, at der blev taget sig af hver enhed. Fotos giver ikke mønsteret i træet den retfærdighed det fortjener. Jeg har en sky glass 55" tv der vejer 12kg og den passer perfekt på enhederne. Kan varmt anbefales',
    
    'product.review.vasagle.tv.unit.title.quality.price.buy.it.dk': 'Denne kvalitet til denne pris....køb det!',
    'product.review.vasagle.tv.unit.content.quality.price.buy.it.dk': 'Jeg havde brug for en tv-enhed til en stor tv i et mindre rum, dette passede til regningen, holder min 65" perfekt, matcher mit kaffebord perfekt. Det er meget solidt, det var ligetil at bygge, og ville lyve hvis jeg sagde, at jeg ikke var imponeret over den skruetrækker - flot touch! Alt var godt mærket, godt pakket og ankom en dag tidligere. Hvad er der tilbage at sige?',
    
    'product.review.vasagle.tv.unit.title.great.value.money.dk': 'Fantastisk værdi for pengene',
    'product.review.vasagle.tv.unit.content.great.value.money.dk': 'En solid tv-enhed, meget højere kvalitet end dyrere high street mærker som B&M og Argos. Virkelig solid, og gik sammen uden problemer. Ser fantastisk og moderne ud, mens det er meget funktionelt. Alle skruer passer godt første gang.',
    
    'product.review.vasagle.tv.unit.title.good.value.dk': 'God værdi',
    'product.review.vasagle.tv.unit.content.good.value.dk': 'Lidt skade på det øverste stykke træ, men ikke for synlig. Ret nem at sætte sammen (hvert stykke er bogstaveret), men frontskabene justerer ikke ordentligt; en dør sidder lidt højere end den anden på grund af de forudboredte huller. Lidt for glans til at matche mit andet valnødtræsmøbel, men godt samlet set til prisen.',
    
    'product.review.vasagle.tv.unit.title.great.tv.unit.dk': 'Fantastisk tv-enhed.',
    'product.review.vasagle.tv.unit.content.great.tv.unit.dk': 'Jeg havde lidt problemer med leveringen. Det kommer i 2 kasser og jeg modtog kun 1, hvilket jeg kun opdagede 2 uger efter leveringen. Jeg kontaktede sælgeren og deres kundeservice var fantastisk 3 dage senere havde jeg min 2. kasse. De tilbød en refusion, men jeg havde brugt tid på at vælge tv-stativet jeg ville have, så jeg var glad for at få den manglende kasse. Fantastisk kundeservice. Det tog mig næsten 3 timer at sætte sammen i min forsvar jeg er 68 med artritiske hænder, så jeg er sikker på, at det kunne sættes sammen hurtigere. Enheden er dejlig meget solid. Jeg havde ingen ridser, buer osv. Instruktionerne meget klare og nemme at følge. Jeg ville anbefale denne enhed.',
    
    // VASAGLE TV Unit Review Norwegian translations
    'product.review.vasagle.tv.unit.title.easy.assemble.quick.delivery.no': 'Enkel å montere, rask levering, verdi for pengene, vakker møbel',
    'product.review.vasagle.tv.unit.content.easy.assemble.quick.delivery.no': 'Jeg hadde den lyse ideen om å kjøpe to av disse for å lage en lengre sterkere tv-enhet og jeg er så glad for at jeg gjorde det. Jeg brakk håndleddet mitt for en uke siden, men jeg var fortsatt i stand til å sette begge sammen på en dag, vakker laget og så enkel å sette sammen jeg var så fornøyd. Så mye lagring også! Enhetene ankom 3 dager tidligere enn oppgitt, og selv om boksene var litt slått opp, var stykkene pakket sikkert. Og fordi jeg hadde to, kunne jeg se at det ble tatt vare på hver enhet. Bilder gir ikke mønsteret i treet den rettferdigheten det fortjener. Jeg har en sky glass 55" tv som veier 12kg og den passer perfekt på enhetene. Kan varmt anbefales',
    
    'product.review.vasagle.tv.unit.title.quality.price.buy.it.no': 'Denne kvaliteten til denne prisen....kjøp det!',
    'product.review.vasagle.tv.unit.content.quality.price.buy.it.no': 'Jeg trengte en tv-enhet til en stor tv i et mindre rom, dette passet til regningen, holder min 65" perfekt, matcher kaffebordet mitt perfekt. Det er veldig solidt, det var greit å bygge, og ville lyve hvis jeg sa at jeg ikke var imponert over den skrutrekkeren - fin touch! Alt var godt merket, godt pakket og ankom en dag tidligere. Hva er det igjen å si?',
    
    'product.review.vasagle.tv.unit.title.great.value.money.no': 'Fantastisk verdi for pengene',
    'product.review.vasagle.tv.unit.content.great.value.money.no': 'En solid tv-enhet, mye høyere kvalitet enn dyrere high street merker som B&M og Argos. Veldig solid, og gikk sammen uten problemer. Ser fantastisk og moderne ut, mens det er veldig funksjonelt. Alle skruer passer godt første gang.',
    
    'product.review.vasagle.tv.unit.title.good.value.no': 'God verdi',
    'product.review.vasagle.tv.unit.content.good.value.no': 'Litt skade på det øverste stykket tre, men ikke for synlig. Ganske enkelt å sette sammen (hvert stykke er bokstavert), men frontskapene justerer ikke ordentlig; en dør sitter litt høyere enn den andre på grunn av de forhullborte hullene. Litt for glans til å matche det andre valnøttmøbelet mitt, men godt samlet sett til prisen.',
    
    'product.review.vasagle.tv.unit.title.great.tv.unit.no': 'Fantastisk tv-enhet.',
    'product.review.vasagle.tv.unit.content.great.tv.unit.no': 'Jeg hadde litt problemer med leveringen. Det kommer i 2 esker og jeg mottok kun 1, som jeg kun oppdaget 2 uker etter leveringen. Jeg kontaktet selgeren og deres kundeservice var fantastisk 3 dager senere hadde jeg min 2. eske. De tilbød en refusjon, men jeg hadde brukt tid på å velge tv-stativet jeg ville ha, så jeg var glad for å få den manglende esken. Fantastisk kundeservice. Det tok meg nesten 3 timer å sette sammen i min forsvar jeg er 68 med artritiske hender, så jeg er sikker på at det kunne satt sammen raskere. Enheten er nydelig veldig solid. Jeg hadde ingen riper, bulker osv. Instruksjonene veldig klare og enkle å følge. Jeg ville anbefalt denne enheten.',
    
    // VASAGLE TV Unit Product Details translations
    'product.details.vasagle.tv.unit.brand': 'Brand',
    'product.details.vasagle.tv.unit.brand.dk': 'Mærke',
    'product.details.vasagle.tv.unit.brand.no': 'Merke',
    
    'product.details.vasagle.tv.unit.color': 'Color',
    'product.details.vasagle.tv.unit.color.dk': 'Farve',
    'product.details.vasagle.tv.unit.color.no': 'Farge',
    
    'product.details.vasagle.tv.unit.material': 'Material',
    'product.details.vasagle.tv.unit.material.dk': 'Materiale',
    'product.details.vasagle.tv.unit.material.no': 'Materiale',
    
    'product.details.vasagle.tv.unit.dimensions': 'Product dimensions',
    'product.details.vasagle.tv.unit.dimensions.dk': 'Produktdimensioner',
    'product.details.vasagle.tv.unit.dimensions.no': 'Produktdimensjoner',
    
    'product.details.vasagle.tv.unit.weight': 'Item weight',
    'product.details.vasagle.tv.unit.weight.dk': 'Varevægt',
    'product.details.vasagle.tv.unit.weight.no': 'Varevekt',
    
    'product.details.vasagle.tv.unit.volume': 'Volume',
    'product.details.vasagle.tv.unit.volume.dk': 'Volumen',
    'product.details.vasagle.tv.unit.volume.no': 'Volum',
    
    'product.details.vasagle.tv.unit.size': 'Size',
    'product.details.vasagle.tv.unit.size.dk': 'Størrelse',
    'product.details.vasagle.tv.unit.size.no': 'Størrelse',
    
    'product.details.vasagle.tv.unit.style': 'Style',
    'product.details.vasagle.tv.unit.style.dk': 'Stil',
    'product.details.vasagle.tv.unit.style.no': 'Stil',
    
    'product.details.vasagle.tv.unit.assembly': 'Assembly',
    'product.details.vasagle.tv.unit.assembly.dk': 'Samling',
    'product.details.vasagle.tv.unit.assembly.no': 'Montering',
    
    'product.details.vasagle.tv.unit.shape': 'Shape',
    'product.details.vasagle.tv.unit.shape.dk': 'Form',
    'product.details.vasagle.tv.unit.shape.no': 'Form',
    
    // Ninja Foodi Air Fryer Product Details translations
    'product.details.ninja.air.fryer.brand': 'Brand',
    'product.details.ninja.air.fryer.brand.dk': 'Mærke',
    'product.details.ninja.air.fryer.brand.no': 'Merke',
    
    'product.details.ninja.air.fryer.model': 'Model Number',
    'product.details.ninja.air.fryer.model.dk': 'Modelnummer',
    'product.details.ninja.air.fryer.model.no': 'Modellnummer',
    
    'product.details.ninja.air.fryer.color': 'Color',
    'product.details.ninja.air.fryer.color.dk': 'Farve',
    'product.details.ninja.air.fryer.color.no': 'Farge',
    
    'product.details.ninja.air.fryer.capacity': 'Capacity',
    'product.details.ninja.air.fryer.capacity.dk': 'Kapacitet',
    'product.details.ninja.air.fryer.capacity.no': 'Kapasitet',
    
    'product.details.ninja.air.fryer.material': 'Material',
    'product.details.ninja.air.fryer.material.dk': 'Materiale',
    'product.details.ninja.air.fryer.material.no': 'Materiale',
    
    'product.details.ninja.air.fryer.power': 'Power / Wattage',
    'product.details.ninja.air.fryer.power.dk': 'Effekt / Watt',
    'product.details.ninja.air.fryer.power.no': 'Effekt / Watt',
    
    'product.details.ninja.air.fryer.voltage': 'Voltage',
    'product.details.ninja.air.fryer.voltage.dk': 'Spænding',
    'product.details.ninja.air.fryer.voltage.no': 'Spenning',
    
    'product.details.ninja.air.fryer.weight': 'Item Weight',
    'product.details.ninja.air.fryer.weight.dk': 'Varevægt',
    'product.details.ninja.air.fryer.weight.no': 'Varevekt',
    
    // FEANDREA Cat Tree Product Details translations
    'product.details.feandrea.cat.tree.brand': 'Brand',
    'product.details.feandrea.cat.tree.brand.dk': 'Mærke',
    'product.details.feandrea.cat.tree.brand.no': 'Merke',
    
    'product.details.feandrea.cat.tree.color': 'Color',
    'product.details.feandrea.cat.tree.color.dk': 'Farve',
    'product.details.feandrea.cat.tree.color.no': 'Farge',
    
    'product.details.feandrea.cat.tree.material': 'Material',
    'product.details.feandrea.cat.tree.material.dk': 'Materiale',
    'product.details.feandrea.cat.tree.material.no': 'Materiale',
    
    'product.details.feandrea.cat.tree.dimensions': 'Product dimensions',
    'product.details.feandrea.cat.tree.dimensions.dk': 'Produktdimensioner',
    'product.details.feandrea.cat.tree.dimensions.no': 'Produktdimensjoner',
    
    'product.details.feandrea.cat.tree.weight': 'Item weight',
    'product.details.feandrea.cat.tree.weight.dk': 'Varevægt',
    'product.details.feandrea.cat.tree.weight.no': 'Varevekt',
    
    'product.details.feandrea.cat.tree.size': 'Size',
    'product.details.feandrea.cat.tree.size.dk': 'Størrelse',
    'product.details.feandrea.cat.tree.size.no': 'Størrelse',
    
    'product.details.feandrea.cat.tree.breed': 'Breed recommendation',
    'product.details.feandrea.cat.tree.breed.dk': 'Race anbefaling',
    'product.details.feandrea.cat.tree.breed.no': 'Rase anbefaling',
    
    'product.details.feandrea.cat.tree.uses': 'Specific uses for product',
    'product.details.feandrea.cat.tree.uses.dk': 'Specifikke anvendelser for produktet',
    'product.details.feandrea.cat.tree.uses.no': 'Spesifikke bruksområder for produktet',
    
    'product.details.feandrea.cat.tree.recommended': 'Recommended uses for product',
    'product.details.feandrea.cat.tree.recommended.dk': 'Anbefalede anvendelser for produktet',
    'product.details.feandrea.cat.tree.recommended.no': 'Anbefalte bruksområder for produktet',
    
    // PAWZ Road Cat Tree Product Details translations
    'product.details.pawz.road.cat.tree.brand': 'Brand',
    'product.details.pawz.road.cat.tree.brand.dk': 'Mærke',
    'product.details.pawz.road.cat.tree.brand.no': 'Merke',
    
    'product.details.pawz.road.cat.tree.color': 'Color',
    'product.details.pawz.road.cat.tree.color.dk': 'Farve',
    'product.details.pawz.road.cat.tree.color.no': 'Farge',
    
    'product.details.pawz.road.cat.tree.material': 'Material',
    'product.details.pawz.road.cat.tree.material.dk': 'Materiale',
    'product.details.pawz.road.cat.tree.material.no': 'Materiale',
    
    'product.details.pawz.road.cat.tree.dimensions': 'Product dimensions',
    'product.details.pawz.road.cat.tree.dimensions.dk': 'Produktdimensioner',
    'product.details.pawz.road.cat.tree.dimensions.no': 'Produktdimensjoner',
    
    'product.details.pawz.road.cat.tree.weight': 'Item weight',
    'product.details.pawz.road.cat.tree.weight.dk': 'Varevægt',
    'product.details.pawz.road.cat.tree.weight.no': 'Varevekt',
    
    'product.details.pawz.road.cat.tree.size': 'Size',
    'product.details.pawz.road.cat.tree.size.dk': 'Størrelse',
    'product.details.pawz.road.cat.tree.size.no': 'Størrelse',
    
    'product.details.pawz.road.cat.tree.breed': 'Breed recommendation',
    'product.details.pawz.road.cat.tree.breed.dk': 'Race anbefaling',
    'product.details.pawz.road.cat.tree.breed.no': 'Rase anbefaling',
    
    'product.details.pawz.road.cat.tree.uses': 'Specific uses for product',
    'product.details.pawz.road.cat.tree.uses.dk': 'Specifikke anvendelser for produktet',
    'product.details.pawz.road.cat.tree.uses.no': 'Spesifikke bruksområder for produktet',
    
    'product.details.pawz.road.cat.tree.recommended': 'Recommended uses for product',
    'product.details.pawz.road.cat.tree.recommended.dk': 'Anbefalede anvendelser for produktet',
    'product.details.pawz.road.cat.tree.recommended.no': 'Anbefalte bruksområder for produktet',
    
    // Keter Products Product Details translations
    'product.details.keter.brand': 'Brand',
    'product.details.keter.brand.dk': 'Mærke',
    'product.details.keter.brand.no': 'Merke',
    
    'product.details.keter.color': 'Color',
    'product.details.keter.color.dk': 'Farve',
    'product.details.keter.color.no': 'Farge',
    
    'product.details.keter.material': 'Material',
    'product.details.keter.material.dk': 'Materiale',
    'product.details.keter.material.no': 'Materiale',
    
    'product.details.keter.dimensions': 'Product dimensions',
    'product.details.keter.dimensions.dk': 'Produktdimensioner',
    'product.details.keter.dimensions.no': 'Produktdimensjoner',
    
    'product.details.keter.weight': 'Item weight',
    'product.details.keter.weight.dk': 'Varevægt',
    'product.details.keter.weight.no': 'Varevekt',
    
    'product.details.keter.capacity': 'Capacity',
    'product.details.keter.capacity.dk': 'Kapacitet',
    'product.details.keter.capacity.no': 'Kapasitet',
    
    'product.details.keter.style': 'Style',
    'product.details.keter.style.dk': 'Stil',
    'product.details.keter.style.no': 'Stil',
    
    'product.details.keter.assembly': 'Assembly',
    'product.details.keter.assembly.dk': 'Samling',
    'product.details.keter.assembly.no': 'Montering',
    
    'product.details.keter.shape': 'Shape',
    'product.details.keter.shape.dk': 'Form',
    'product.details.keter.shape.no': 'Form',
    
    // FEANDREA Cat Tree Review translations
    'product.review.feandrea.cat.tree.title.very.impressed': 'Very impressed',
    'product.review.feandrea.cat.tree.content.very.impressed': 'Had a feeling when this arrived that I would need help from a friend to assemble this, very pleasantly surprised, I managed it on my own, and I\'m under 5ft and not got the strongest of wrists and extremely bad back. Took me just over 2 hours from start to finish. The instruction booklet was very helpful - for once, not many are, but this one was. its very sturdy, and feels very plush. Only issue is one of the screws in the \'house bit\' doesnt lie totally flat, but, a little cat blanket will cover that - though in saying that, that could be the fact that I\'m not strong enough to make it totally flush with the base of that part, shall get a friend to try to tighten it down, but like I said, not a big issue, my cats love their blankies so one in there will make it extra cosy. On the whole, I am very very pleased with it. Certainly worth the money, there are some that are far more expensive and I didnt think had as many features. Whether my cats love it or not remains to be seen. Only just finished it and it needs moving to a more suitable place than the middle of my living room lol',
    
    'product.review.feandrea.cat.tree.title.amazing': 'Amazing !',
    'product.review.feandrea.cat.tree.content.amazing': 'I have never had a complaint about feandrea cat posts and still I can\'t complain... as you can see my cats absolutely love this , the only suggestion I have is to take the tube away and add another cat cave . None of my cats use it and it\'s not very sturdy. I\'m ordering another one at the end of the month then all 4 kitties have 1 feandrea post each I have 3 😁. 5 stars 🌟 fantastic value for money at £96 , took less than 35 mins to assemble as I already have them . Very sturdy I don\'t need to assemble them to the wall . Over all very happy cats I think they give it 10/10',
    
    'product.review.feandrea.cat.tree.title.larger.metal.washers': 'Get some larger diameter metal washers, it strengthens the top tube, spreads weight, & sturdier.',
    'product.review.feandrea.cat.tree.content.larger.metal.washers': 'After taking delivery of this item today, I set about assembling it. It took me 45 minutes to put together. I especially like the multi levels of this, which means that several cats can climb, play and scratch at the same time. I\'m impressed with the quality, weight and sturdiness of this item. Once I had it assembled and moved into place, 6 of our 9 cats were already checking it out with plenty of room for more. They were quite vigorous and this item showed no signs of toppling over. The attached wall strap is a good idea, but actually does not need to be used. The instructions were very clear and extremely easy to follow. With this in mind anyone could easily put it together. This is one of the more expensive Cat Activity Centres on the market, but for the money you get a well designed, sturdy and large item. One other point I would like to say is that this is very heavy. I will and would highly recommend this item and if you decide to purchase it, you and your cats will not be disappointed. Buy it and watch the fun your cats will have unfold.',
    
    'product.review.feandrea.cat.tree.title.couldnt.be.happier': 'Couldn\'t be happier',
    'product.review.feandrea.cat.tree.content.couldnt.be.happier': 'Got this during black Friday for €57, worth the price, sturdy, I have 2 cats that are over 6kg so I am concerned with the little basket, no way that will stay up for a very long time, other than that everything is perfect, easy to assemble, love the colour, my cats seem to be happy :)',
    
    'product.review.feandrea.cat.tree.title.great.smaller.cats': 'Great for smaller cats',
    'product.review.feandrea.cat.tree.content.great.smaller.cats': 'It\'s really sturdy and looks nice and is fairly simple to assemble. However, our cat is a bit picky and is not really using it. He is in the top house from time to time but not for longer periods as it seems like he is too big for it. (He is 4.6kg). It might just take some time for him to get used to it, but right now, a normal moving box has 1st place',
    
    'product.review.feandrea.cat.tree.title.superb.quality': 'Superb quality',
    'product.review.feandrea.cat.tree.content.superb.quality': 'As my cats are indoor I needed to get a big multi level one for both my two cats to replace the small little ones that I already had that were falling apart, I was amazed at the quality, it looks really good. It\'s nice and sturdy, well worth the money. Everyone has commented on how lush it looks. Both my cats keep using it. My older ginger cat loves the house to hide in as it\'s big enough for her when her little brother starts annoying her, it gives her a place to hide away from him. I\'ve seen them sleep on all levels. Since that photo was taken I\'ve moved it round the other way so they can see from outside the big window when the curtains and blinds are open during the day. *Update 3/7/19* I\'m still impressed, the cat post was leaning sideways at the top which made my cat look like the leaning tower of Coco plus another part had broken due to them jumping on them. I emailed the company and was really grateful they sent me out new replacement parts for free.',
    
    'product.review.feandrea.cat.tree.title.amazing.sturdy.well.structured': 'Amazing, sturdy and well structured. Worth the price',
    'product.review.feandrea.cat.tree.content.amazing.sturdy.well.structured': 'I purchased this product after getting a £40 one of eBay that I thought would be good enough, but unfortunately it was incredibly wobbly as it only had two pillars at the bottom. This cat tree however is the most secure and sturdy thing I could have hoped for. The base is heavy, the structure is well designed and the material and spacing is fantastic. My cat loves this, she was scared of the previous one as she jumps straight from the floor to the top level (making my previous cheaper one fall over) but with this one there isn\'t even the slightest wobble no matter how badly she jumps on it. I highly recommend this to any cat owner who wants a good present to entertain your cat. Don\'t cheap out on these things, spend a bit more and get an amazing product that is safe for your cat.',
    
    'product.review.feandrea.cat.tree.title.not.strong.larger.heavier.cats': 'Not strong enough for larger, heavier cats!',
    'product.review.feandrea.cat.tree.content.not.strong.larger.heavier.cats': 'Bought this on sale, but £62 or so appears to be the regular price. The top posts noticably flex at the joint when my largest cat (flame tip ragdoll) jumps on them, and even when my much smaller and lighter persian and seal tip ragdoll use them. I\'ve tried tightening them up but that isn\'t the issue, I assume it\'s the fact it has such skinny posts and not particularly strong connectors. Tempted to try and use some large metal washers to put less strain on the joints. Nowhere near as strong or sturdy as the old Amazon Basics cat tree it replaced. If it lasts more than 3 months I\'ll be amazed. The Amazon one has lasted several years and is still very solid, it\'s just sthe scratching posts are so tatty I was embarrassed to keep it on display!',
    
    // FEANDREA Cat Tree Review Danish translations
    'product.review.feandrea.cat.tree.title.very.impressed.dk': 'Meget imponeret',
    'product.review.feandrea.cat.tree.content.very.impressed.dk': 'Havde en følelse da dette ankom at jeg ville have brug for hjælp fra en ven til at samle dette, meget behageligt overrasket, jeg klarede det på egen hånd, og jeg er under 5 fod og har ikke de stærkeste håndled og ekstremt dårlig ryg. Det tog mig lidt over 2 timer fra start til slut. Instruktionsbogen var meget hjælpsom - for en gangs skyld, ikke mange er, men denne var. den er meget solid og føles meget blød. Eneste problem er at en af skruerne i \'huset\' ikke ligger helt fladt, men, et lille katte-tæppe vil dække det - selvom det sagt, kunne det være det faktum at jeg ikke er stærk nok til at gøre det helt flugt med bunden af den del, skal få en ven til at prøve at stramme det ned, men som jeg sagde, ikke et stort problem, mine katte elsker deres tæpper så et derinde vil gøre det ekstra hyggeligt. På det hele taget er jeg meget meget tilfreds med det. Bestemt pengene værd, der er nogle der er meget dyrere og jeg troede ikke havde så mange funktioner. Hvorvidt mine katte elsker det eller ej er endnu ikke set. Kun lige færdig med det og det skal flyttes til et mere passende sted end midten af min stue lol',
    
    'product.review.feandrea.cat.tree.title.amazing.dk': 'Fantastisk !',
    'product.review.feandrea.cat.tree.content.amazing.dk': 'Jeg har aldrig haft en klage over feandrea katte-pæle og stadig kan jeg ikke klage... som du kan se elsker mine katte dette absolut, det eneste forslag jeg har er at tage røret væk og tilføje en anden katte-hule. Ingen af mine katte bruger det og det er ikke særligt solidt. Jeg bestiller en anden i slutningen af måneden så alle 4 killinger har 1 feandrea pæl hver jeg har 3 😁. 5 stjerner 🌟 fantastisk værdi for pengene til £96, tog mindre end 35 minutter at samle da jeg allerede har dem. Meget solid jeg behøver ikke at samle dem til væggen. Over det hele meget glade katte jeg tror de giver det 10/10',
    
    'product.review.feandrea.cat.tree.title.larger.metal.washers.dk': 'Få nogle større diameter metal-rundskiver, det styrker det øverste rør, spreder vægt, og gør det mere solidt.',
    'product.review.feandrea.cat.tree.content.larger.metal.washers.dk': 'Efter at have modtaget denne vare i dag, begyndte jeg at samle den. Det tog mig 45 minutter at sætte sammen. Jeg kan særligt godt lide de mange niveauer af dette, hvilket betyder at flere katte kan klatre, lege og kradse på samme tid. Jeg er imponeret over kvaliteten, vægten og soliditeten af denne vare. Da jeg havde samlet den og flyttet den på plads, var 6 af vores 9 katte allerede ved at tjekke den ud med masser af plads til flere. De var ret energiske og denne vare viste ingen tegn på at vælte. Det tilhørende vægstropp er en god idé, men behøver faktisk ikke at blive brugt. Instruktionerne var meget klare og ekstremt nemme at følge. Med dette i tankerne kan enhver nemt sætte det sammen. Dette er et af de dyrere Katte Aktivitetscentre på markedet, men for pengene får du et veldesignet, solidt og stort produkt. Et andet punkt jeg gerne vil sige er at dette er meget tungt. Jeg vil og ville varmt anbefale denne vare og hvis du beslutter dig for at købe den, vil du og dine katte ikke blive skuffet. Køb den og se den sjov dine katte vil have udfolde sig.',
    
    'product.review.feandrea.cat.tree.title.couldnt.be.happier.dk': 'Kunne ikke være gladere',
    'product.review.feandrea.cat.tree.content.couldnt.be.happier.dk': 'Fik dette under black Friday for €57, pengene værd, solidt, jeg har 2 katte der er over 6kg så jeg er bekymret for den lille kurv, ingen måde at det vil holde sig oppe i meget lang tid, ud over det er alt perfekt, nemt at samle, elsker farven, mine katte synes at være glade :)',
    
    'product.review.feandrea.cat.tree.title.great.smaller.cats.dk': 'Fantastisk til mindre katte',
    'product.review.feandrea.cat.tree.content.great.smaller.cats.dk': 'Det er virkelig solidt og ser pænt ud og er ret simpelt at samle. Men vores kat er lidt kræsen og bruger det ikke rigtigt. Han er i det øverste hus fra tid til anden men ikke i længere perioder da det synes som om han er for stor til det. (Han er 4.6kg). Det kan bare tage noget tid for ham at vænne sig til det, men lige nu har en normal flyttekasse 1. plads',
    
    'product.review.feandrea.cat.tree.title.superb.quality.dk': 'Fremragende kvalitet',
    'product.review.feandrea.cat.tree.content.superb.quality.dk': 'Da mine katte er indendørs havde jeg brug for at få en stor flerniveau en til begge mine to katte for at erstatte de små små som jeg allerede havde der faldt fra hinanden, jeg var forbløffet over kvaliteten, det ser virkelig godt ud. Det er pænt og solidt, pengene værd. Alle har kommenteret på hvor flot det ser ud. Begge mine katte bliver ved med at bruge det. Min ældre rødhårede kat elsker huset at gemme sig i da det er stort nok til hende når hendes lillebror begynder at irritere hende, det giver hende et sted at gemme sig væk fra ham. Jeg har set dem sove på alle niveauer. Siden det billede blev taget har jeg flyttet det rundt den anden vej så de kan se ud ad det store vindue når gardinerne og persiennerne er åbne om dagen. *Opdatering 3/7/19* Jeg er stadig imponeret, kattenpælen lænede sig sidelæns øverst hvilket fik min kat til at ligne det hældende tårn af Coco plus en anden del var gået i stykker på grund af at de hoppede på dem. Jeg sendte en email til firmaet og var virkelig taknemmelig for at de sendte mig nye erstatningsdele gratis.',
    
    'product.review.feandrea.cat.tree.title.amazing.sturdy.well.structured.dk': 'Fantastisk, solidt og velstruktureret. Pengene værd',
    'product.review.feandrea.cat.tree.content.amazing.sturdy.well.structured.dk': 'Jeg købte dette produkt efter at have fået en til £40 fra eBay som jeg troede ville være god nok, men desværre var den utrolig vakkelvorn da den kun havde to søjler i bunden. Dette kattetræ er dog den mest sikre og solide ting jeg kunne have håbet på. Bunden er tung, strukturen er veldesignet og materialet og afstanden er fantastisk. Min kat elsker dette, hun var bange for den forrige da hun hopper lige fra gulvet til det øverste niveau (hvilket får min forrige billigere til at falde omkuld) men med denne er der ikke engang den mindste vaklen uanset hvor slemt hun hopper på den. Jeg anbefaler varmt dette til enhver katteejer der vil have en god gave til at underholde din kat. Spar ikke på disse ting, brug lidt mere og få et fantastisk produkt der er sikkert for din kat.',
    
    'product.review.feandrea.cat.tree.title.not.strong.larger.heavier.cats.dk': 'Ikke stærk nok til større, tungere katte!',
    'product.review.feandrea.cat.tree.content.not.strong.larger.heavier.cats.dk': 'Købte dette på tilbud, men £62 eller deromkring ser ud til at være den almindelige pris. De øverste pæle bøjer mærkbart ved leddet når min største kat (flamme tip ragdoll) hopper på dem, og selv når min meget mindre og lettere perser og seal tip ragdoll bruger dem. Jeg har prøvet at stramme dem op men det er ikke problemet, jeg antager det er det faktum at den har så tynde pæle og ikke særligt stærke forbindelser. Fristet til at prøve at bruge nogle store metal-rundskiver til at lægge mindre belastning på leddene. Ingenlunde så stærk eller solid som det gamle Amazon Basics kattetræ den erstattede. Hvis den holder mere end 3 måneder vil jeg blive forbløffet. Amazon en har holdt i flere år og er stadig meget solid, det er bare at kradsepælene er så lurvet at jeg var flov over at beholde den på display!',
    
    // FEANDREA Cat Tree Review Norwegian translations
    'product.review.feandrea.cat.tree.title.very.impressed.no': 'Veldig imponert',
    'product.review.feandrea.cat.tree.content.very.impressed.no': 'Hadde en følelse da dette ankom at jeg ville trenge hjelp fra en venn til å montere dette, veldig behagelig overrasket, jeg klarte det på egen hånd, og jeg er under 5 fot og har ikke de sterkeste håndledd og ekstremt dårlig rygg. Det tok meg litt over 2 timer fra start til slutt. Instruksjonsboken var veldig hjelpsom - for en gangs skyld, ikke mange er, men denne var. den er veldig solid og føles veldig myk. Eneste problem er at en av skruene i \'huset\' ikke ligger helt flatt, men, et lite katte-teppe vil dekke det - selv om det sagt, kunne det være det faktum at jeg ikke er sterk nok til å gjøre det helt flukt med bunnen av den delen, skal få en venn til å prøve å stramme det ned, men som jeg sa, ikke et stort problem, mine katter elsker teppene sine så et derinne vil gjøre det ekstra koselig. På det hele tatt er jeg veldig veldig fornøyd med det. Bestemt pengene verdt, det er noen som er mye dyrere og jeg trodde ikke hadde så mange funksjoner. Hvorvidt mine katter elsker det eller ikke er ennå ikke sett. Kun akkurat ferdig med det og det må flyttes til et mer passende sted enn midten av stuen min lol',
    
    'product.review.feandrea.cat.tree.title.amazing.no': 'Fantastisk !',
    'product.review.feandrea.cat.tree.content.amazing.no': 'Jeg har aldri hatt en klage over feandrea katte-pæler og fortsatt kan jeg ikke klage... som du kan se elsker mine katter dette absolutt, det eneste forslaget jeg har er å ta røret bort og legge til en annen katte-hule. Ingen av mine katter bruker det og det er ikke særlig solidt. Jeg bestiller en annen i slutten av måneden så alle 4 killinger har 1 feandrea pæl hver jeg har 3 😁. 5 stjerner 🌟 fantastisk verdi for pengene til £96, tok mindre enn 35 minutter å montere da jeg allerede har dem. Veldig solid jeg trenger ikke å montere dem til veggen. Over det hele veldig glade katter jeg tror de gir det 10/10',
    
    'product.review.feandrea.cat.tree.title.larger.metal.washers.no': 'Få noen større diameter metall-rundskiver, det styrker det øverste røret, sprer vekt, og gjør det mer solidt.',
    'product.review.feandrea.cat.tree.content.larger.metal.washers.no': 'Etter å ha mottatt denne varen i dag, begynte jeg å montere den. Det tok meg 45 minutter å sette sammen. Jeg kan spesielt godt like de mange nivåene av dette, som betyr at flere katter kan klatre, leke og kradse på samme tid. Jeg er imponert over kvaliteten, vekten og soliditeten av denne varen. Da jeg hadde montert den og flyttet den på plass, var 6 av våre 9 katter allerede ved å sjekke den ut med massevis av plass til flere. De var ganske energiske og denne varen viste ingen tegn på å velte. Den tilhørende veggstroppen er en god idé, men behøver faktisk ikke å bli brukt. Instruksjonene var veldig klare og ekstremt enkle å følge. Med dette i tankene kan hvem som helst enkelt sette det sammen. Dette er et av de dyrere Katte Aktivitets-sentre på markedet, men for pengene får du et veldesignet, solidt og stort produkt. Et annet punkt jeg gjerne vil si er at dette er veldig tungt. Jeg vil og ville varmt anbefale denne varen og hvis du bestemmer deg for å kjøpe den, vil du og dine katter ikke bli skuffet. Kjøp den og se den moro dine katter vil ha utfolde seg.',
    
    'product.review.feandrea.cat.tree.title.couldnt.be.happier.no': 'Kunne ikke vært gladere',
    'product.review.feandrea.cat.tree.content.couldnt.be.happier.no': 'Fikk dette under black Friday for €57, pengene verdt, solidt, jeg har 2 katter som er over 6kg så jeg er bekymret for den lille kurven, ingen måte at det vil holde seg oppe i veldig lang tid, ut over det er alt perfekt, enkelt å montere, elsker fargen, mine katter synes å være glade :)',
    
    'product.review.feandrea.cat.tree.title.great.smaller.cats.no': 'Fantastisk til mindre katter',
    'product.review.feandrea.cat.tree.content.great.smaller.cats.no': 'Det er veldig solidt og ser pent ut og er ganske enkelt å montere. Men katten vår er litt kresen og bruker det ikke egentlig. Han er i det øverste huset fra tid til annen men ikke i lengre perioder da det synes som om han er for stor til det. (Han er 4.6kg). Det kan bare ta litt tid for ham å venne seg til det, men akkurat nå har en normal flytteeske 1. plass',
    
    'product.review.feandrea.cat.tree.title.superb.quality.no': 'Fremragende kvalitet',
    'product.review.feandrea.cat.tree.content.superb.quality.no': 'Da mine katter er innendørs hadde jeg behov for å få en stor flernivå en til begge mine to katter for å erstatte de små små som jeg allerede hadde som falt fra hverandre, jeg var forbløffet over kvaliteten, det ser veldig godt ut. Det er pent og solidt, pengene verdt. Alle har kommentert på hvor flott det ser ut. Begge mine katter fortsetter å bruke det. Min eldre rødhårede katt elsker huset å gjemme seg i da det er stort nok til henne når hennes lillebror begynner å irritere henne, det gir henne et sted å gjemme seg bort fra ham. Jeg har sett dem sove på alle nivåer. Siden det bildet ble tatt har jeg flyttet det rundt den andre veien så de kan se ut av det store vinduet når gardinene og persienner er åpne om dagen. *Oppdatering 3/7/19* Jeg er fortsatt imponert, kattenpælen lente seg sidelengs øverst som fikk katten min til å ligne det hellende tårnet av Coco pluss en annen del hadde gått i stykker på grunn av at de hoppet på dem. Jeg sendte en e-post til firmaet og var veldig takknemlig for at de sendte meg nye erstatningsdeler gratis.',
    
    'product.review.feandrea.cat.tree.title.amazing.sturdy.well.structured.no': 'Fantastisk, solidt og velstrukturert. Pengene verdt',
    'product.review.feandrea.cat.tree.content.amazing.sturdy.well.structured.no': 'Jeg kjøpte dette produktet etter å ha fått en til £40 fra eBay som jeg trodde ville være god nok, men dessverre var den utrolig vaklevoren da den kun hadde to søyler i bunnen. Dette kattetreet er imidlertid den mest sikre og solide tingen jeg kunne ha håpet på. Bunnen er tung, strukturen er veldesignet og materialet og avstanden er fantastisk. Katten min elsker dette, hun var redd for den forrige da hun hopper rett fra gulvet til det øverste nivået (som får min forrige billigere til å falle omkull) men med denne er det ikke engang den minste vaklingen uansett hvor slemt hun hopper på den. Jeg anbefaler varmt dette til enhver katteeier som vil ha en god gave til å underholde katten din. Ikke spar på disse tingene, bruk litt mer og få et fantastisk produkt som er trygt for katten din.',
    
    'product.review.feandrea.cat.tree.title.not.strong.larger.heavier.cats.no': 'Ikke sterk nok til større, tyngre katter!',
    'product.review.feandrea.cat.tree.content.not.strong.larger.heavier.cats.no': 'Kjøpte dette på tilbud, men £62 eller deromkring ser ut til å være den vanlige prisen. De øverste pælene bøyer merkbar ved leddet når min største katt (flamme tip ragdoll) hopper på dem, og selv når min mye mindre og lettere perser og seal tip ragdoll bruker dem. Jeg har prøvd å stramme dem opp men det er ikke problemet, jeg antar det er det faktum at den har så tynne pæler og ikke særlig sterke forbindelser. Fristet til å prøve å bruke noen store metall-rundskiver til å legge mindre belastning på leddene. Ingenlunde så sterk eller solid som det gamle Amazon Basics kattetreet den erstattet. Hvis den holder mer enn 3 måneder vil jeg bli forbløffet. Amazon en har holdt i flere år og er fortsatt veldig solid, det er bare at kradsepælene er så lurvete at jeg var flau over å beholde den på display!',
    
    // Ninja Foodi Air Fryer translations
    'product.about.ninja.air.fryer.1': 'ENERGY-SAVING: Save up to 75% on your energy bill* (*testing and calculations based on recommended cook time for sausages, using air fry function versus conventional ovens).',
    'product.about.ninja.air.fryer.2': '2 INDEPENDENT COOKING ZONES: Cook 2 foods, 2 ways, both ready at the same time. Use different functions, times and temps in each drawer to create complete meals in one appliance, or cater to 2 tastes.',
    'product.about.ninja.air.fryer.3': '6 COOKING FUNCTIONS: Max Crisp, Air Fry, Roast, Bake, Reheat, Dehydrate. Cook from frozen to crispy. Up to 75% less fat* using the Air Fry function (*Tested against deep fried, hand-cut French fries).',
    'product.about.ninja.air.fryer.4': 'LARGE CAPACITY: Cook 4-6 portions. Each drawer fits up to 1kg of fries or a 1.6kg chicken. Cook up to 75% faster than fan ovens* (*Tested against fish fingers and sausages, including preheat).',
    'product.about.ninja.air.fryer.5': 'INCLUDES: Ninja Air Fryer (UK Plug), 2x Non-stick, dishwasher-safe 3.8L Drawers (7.6L total capacity) & Crisper Plates. Chef-Created Recipe Guide. Weight: 8.2kg. Colour: Black.',
    
    'product.features.ninja.air.fryer.1': '7.6L total capacity with 2 independent cooking zones',
    'product.features.ninja.air.fryer.2': '6 cooking functions: Air Fry, Max Crisp, Roast, Bake, Reheat, Dehydrate',
    'product.features.ninja.air.fryer.3': 'Saves up to 75% on energy bills compared to conventional ovens',
    'product.features.ninja.air.fryer.4': 'Cook 2 foods, 2 ways, both ready at the same time',
    'product.features.ninja.air.fryer.5': 'Each drawer fits up to 1kg of fries or a 1.6kg chicken',
    'product.features.ninja.air.fryer.6': 'Cook up to 75% faster than fan ovens',
    'product.features.ninja.air.fryer.7': 'Up to 75% less fat using Air Fry function',
    'product.features.ninja.air.fryer.8': 'Non-stick, dishwasher-safe baskets and crisper plates',
    'product.features.ninja.air.fryer.9': '2400W power with UK plug',
    'product.features.ninja.air.fryer.10': '2-year guarantee upon registration',
    
    // Ninja Foodi Air Fryer Danish translations
    'product.about.ninja.air.fryer.1.dk': 'ENERGIBESPARELSE: Spar op til 75% på din energiregning* (*test og beregninger baseret på anbefalet tilberedningstid for pølser, ved brug af luftfriturefunktion versus konventionelle ovne).',
    'product.about.ninja.air.fryer.2.dk': '2 UAFHÆNGIGE TILBEREDNINGSSONER: Tilbered 2 fødevarer, 2 måder, begge klar på samme tid. Brug forskellige funktioner, tider og temperaturer i hver skuffe for at skabe komplette måltider i ét apparat, eller imødekom 2 smage.',
    'product.about.ninja.air.fryer.3.dk': '6 TILBEREDNINGSFUNKTIONER: Max Crisp, Air Fry, Roast, Bake, Reheat, Dehydrate. Tilbered fra frossen til sprød. Op til 75% mindre fedt* ved brug af Air Fry-funktionen (*Testet mod friturestegte, håndskårne pommes frites).',
    'product.about.ninja.air.fryer.4.dk': 'STOR KAPACITET: Tilbered 4-6 portioner. Hver skuffe kan rumme op til 1kg pommes frites eller en 1,6kg kylling. Tilbered op til 75% hurtigere end varmluftsovne* (*Testet mod fiskefingre og pølser, inklusive forvarmning).',
    'product.about.ninja.air.fryer.5.dk': 'INKLUDERER: Ninja Air Fryer (UK stik), 2x Non-stick, opvaskemaskinesikre 3,8L skuffer (7,6L total kapacitet) & Crisper Plates. Chef-Created Recipe Guide. Vægt: 8,2kg. Farve: Sort.',
    
    'product.features.ninja.air.fryer.1.dk': '7,6L total kapacitet med 2 uafhængige tilberedningssoner',
    'product.features.ninja.air.fryer.2.dk': '6 tilberedningsfunktioner: Air Fry, Max Crisp, Roast, Bake, Reheat, Dehydrate',
    'product.features.ninja.air.fryer.3.dk': 'Sparer op til 75% på energiregninger sammenlignet med konventionelle ovne',
    'product.features.ninja.air.fryer.4.dk': 'Tilbered 2 fødevarer, 2 måder, begge klar på samme tid',
    'product.features.ninja.air.fryer.5.dk': 'Hver skuffe kan rumme op til 1kg pommes frites eller en 1,6kg kylling',
    'product.features.ninja.air.fryer.6.dk': 'Tilbered op til 75% hurtigere end varmluftsovne',
    'product.features.ninja.air.fryer.7.dk': 'Op til 75% mindre fedt ved brug af Air Fry-funktion',
    'product.features.ninja.air.fryer.8.dk': 'Non-stick, opvaskemaskinesikre kurve og crisper plates',
    'product.features.ninja.air.fryer.9.dk': '2400W effekt med UK stik',
    'product.features.ninja.air.fryer.10.dk': '2-års garanti ved registrering',
    
    // Ninja Foodi Air Fryer Norwegian translations
    'product.about.ninja.air.fryer.1.no': 'ENERGIBESPARELSE: Spar opptil 75% på energiregningen din* (*testing og beregninger basert på anbefalt tilberedningstid for pølser, ved bruk av luftfriturefunksjon versus konvensjonelle ovner).',
    'product.about.ninja.air.fryer.2.no': '2 UAVHENGIGE TILBEREDNINGSSONER: Tilbered 2 matvarer, 2 måter, begge klare på samme tid. Bruk forskjellige funksjoner, tider og temperaturer i hver skuffe for å skape komplette måltider i ett apparat, eller imøtekom 2 smaker.',
    'product.about.ninja.air.fryer.3.no': '6 TILBEREDNINGSFUNKSJONER: Max Crisp, Air Fry, Roast, Bake, Reheat, Dehydrate. Tilbered fra frossen til sprø. Opptil 75% mindre fett* ved bruk av Air Fry-funksjonen (*Testet mot friturestekte, håndskårne pommes frites).',
    'product.about.ninja.air.fryer.4.no': 'STOR KAPASITET: Tilbered 4-6 porsjoner. Hver skuffe kan romme opptil 1kg pommes frites eller en 1,6kg kylling. Tilbered opptil 75% raskere enn varmluftsovner* (*Testet mot fiskefingre og pølser, inkludert forvarming).',
    'product.about.ninja.air.fryer.5.no': 'INKLUDERER: Ninja Air Fryer (UK støpsel), 2x Non-stick, oppvaskemaskinsikre 3,8L skuffer (7,6L total kapasitet) & Crisper Plates. Chef-Created Recipe Guide. Vekt: 8,2kg. Farge: Svart.',
    
    'product.features.ninja.air.fryer.1.no': '7,6L total kapasitet med 2 uavhengige tilberedningssoner',
    'product.features.ninja.air.fryer.2.no': '6 tilberedningsfunksjoner: Air Fry, Max Crisp, Roast, Bake, Reheat, Dehydrate',
    'product.features.ninja.air.fryer.3.no': 'Sparer opptil 75% på energiregninger sammenlignet med konvensjonelle ovner',
    'product.features.ninja.air.fryer.4.no': 'Tilbered 2 matvarer, 2 måter, begge klare på samme tid',
    'product.features.ninja.air.fryer.5.no': 'Hver skuffe kan romme opptil 1kg pommes frites eller en 1,6kg kylling',
    'product.features.ninja.air.fryer.6.no': 'Tilbered opptil 75% raskere enn varmluftsovner',
    'product.features.ninja.air.fryer.7.no': 'Opptil 75% mindre fett ved bruk av Air Fry-funksjon',
    'product.features.ninja.air.fryer.8.no': 'Non-stick, oppvaskemaskinsikre kurver og crisper plates',
    'product.features.ninja.air.fryer.9.no': '2400W effekt med UK støpsel',
    'product.features.ninja.air.fryer.10.no': '2-års garanti ved registrering',
    
    // Ninja Foodi Air Fryer Review translations
    'product.review.ninja.air.fryer.title.pays.for.itself': 'pays for itself....',
    'product.review.ninja.air.fryer.content.pays.for.itself': 'The best thing about this product is that it pays for itself through energy savings Since getting this Ninja my deep fat fryer is now obsolete, my grill is almost obsolete and my oven hasn\'t been used since. This product cooks great chips but one does have to learn a little first. When cooking chips it\'s critical that one folows the instructions and washes the potato starch out before air frying them otherwise they will burn. Next one needs to work out the times and temperatures for different potato varieties as cooking times do vary between the different types. Once one has a good idea of the cooking times and temperatures chips are quickly produced in the air fryer. Although the air fryer works well there are the other options available; Roast, Bake, Dehydrate, Max Crisp and reheat. As the saying goes, "practice makes perfect" and it certainly applies to this Ninja. One has fun messing with this product as one tries to find the best and most successful way to cook food. Roasting duck breasts is a typical example. I have cooked them with the Roast option but I have found that they cook best by giving them 8 minutes on Roast followed by six minutes on Max crisp to get the skin well cooked and crispy. As my images show, this "compact cooker" roasts some great chicken quarters. The same applies with the chicken as it does the duck, partially roast the chicken and finish off using the max crisp setting which operates at 240c and that is 10c higher than domestic ovens so it cooks and crisps skin perfectly and quickly. I have used this Ninja for toasting garlic bread slices and it does it much quicker and much better than my Solarplus grill does so that is something exceptional. As this Ninja has much smaller cavities than a domestic oven it can rapidly heat up, that is how it works. When cooking there is no need to preheat the Ninja as the cavities reach their temperatures in a matter of a small few seconds and that is where the energy savings come into play. By not having to pay to preheat a large cavity domestic oven ones uses much less energy thus one isn\'t paying the 30p+ per kWh for an element that requires a 3.6+kWh input. If one has a cheap cooker then it\'s cheap for a reason... it needs more energy thus it would probably use a good kWh just to preheat the oven so one can easily be paying 40p to 50p just to warm the oven up. A more expensive cooker, like mine, can have triple glazing in the oven doors thus they are much more enrgy efficient and save money when comared to cheaper cookers. As the Ninja only has to heat up a small space the food is cooking almost immediately and it does cook evenly. I did mention duck, chicken and garlic bread but what about roasting coffee beans? I did think about it and after doing a little reading online I tried it. I don\'t advise using this Ninja for roasting coff beans as it does become "expensive". Many people claim that one can get a "dark roast" in six to eight minutes, with others claiming it takes around 15 minutes. Well, I don\'t believe any of them have actually tried it as even after a good 1/2 hour the beans were only light roasted. To get a dark roast will tale close to one hour at the highest temperature so that becomes costly for a small amount of coffe bean. One can invest in a domestic coffee bean roaster but personally I do prefer to do it the traditional way, which is much more cost effective. One simply puts the beans into a pan (frying pans are good for this) or a traditional roasting pan that imported. Next, one simply heats the pan on a high heat hob or gas burner for a few minutes. Whilst the beans are roasting one simply stirs them around from time to time. A light roast, like what the Ninja produced, can be obtianed in only two to three minutes with a dark raost taking around five mionutes. What the Ninja produced in 1/2 hour would have taken me around 10 minutes and I would have got two small batches of dark roast for my espressos. So, this Ninja is excellent for cooking almost anything but there will be the exception such as my fresh green bean coffee.It is so easy to keep clean so that is a very good bonus One thing I did note from some negative reviews is that some reviewers gave negative ratings and claimed the product is fauly because "lots of steam" was coming out. Well, I can honestly say that is not the case. The problem is not with the Ninja but is with the user. During my second use of this I seen some steam coming out and instantly worked it out that the pan hadn\'t been insertred correctly. When using the Ninja it is important to insert the pans flush so that they are firmply sealed with the machione otherwise steam will escape thus cooking will be uneven and will take longer. As soon as I seen the steam I simply pulled pan number one out a bit and reinserted it thus no more steam. Another issue with those that cook with incorrectly positioned pans is that apart fromcosting more to cook the food and not cooking the food well... it will dry the food.The steam from the cooking food is part of the cooking process and helps keep the food moist but losing the water will mean the food, especially meats, will go dry. Overall I am impressed with my Ninja and I should have bought one much sooner than I did as it is saving me money, it is saving me a lot of time and most importantly it produces some excellently cooked food. One day I will risk it and try to make some jam in it and maybe even dehydrate some fruits. If successful thenit will mean my dehydrater will become obsolete aling with my deep fat fryer. I am recommending this product as it is made to a high quality standard, it works very well and with the energy and cost savings this is very good value.',
    
    'product.review.ninja.air.fryer.title.saw.show.bought.product': 'Saw the show, bought the product',
    'product.review.ninja.air.fryer.content.saw.show.bought.product': 'I saw this on TV and thought it looked good. I was not disappointed. It is easy to use and the food comes out perfectly cooked. I have used it for chips, chicken, fish and vegetables. All have been excellent. The dual drawer system is great as you can cook different things at the same time. I would definitely recommend this product.',
    
    'product.review.ninja.air.fryer.title.excellent.quality.performance': 'Excellent quality and performance',
    'product.review.ninja.air.fryer.content.excellent.quality.performance': 'I\'ve been using this air fryer for several months now and I\'m extremely impressed. The build quality is solid, it\'s easy to use, and the results are consistently excellent. The dual cooking zones are perfect for meal prep - I can cook proteins and sides simultaneously. The Max Crisp function gives amazing results, and the energy savings are noticeable on my electricity bill. The included recipe guide is helpful for getting started. This is definitely worth the investment!',
    
    'product.review.ninja.air.fryer.title.best.kitchen.investment': 'Best kitchen investment ever!',
    'product.review.ninja.air.fryer.content.best.kitchen.investment': 'I was hesitant about buying an air fryer, but this Ninja model exceeded all my expectations! The dual drawer system is brilliant - I can cook different foods with different settings at the same time. The food comes out perfectly cooked every time, and the non-stick coating makes cleanup incredibly easy. The energy efficiency is amazing - I\'ve noticed a significant reduction in my electricity usage. The 2-year warranty gives me confidence in this purchase. Absolutely love it!',
    
    'product.review.ninja.air.fryer.title.fantastic.air.fryer': 'Fantastic air fryer!',
    'product.review.ninja.air.fryer.content.fantastic.air.fryer': 'This Ninja air fryer has completely transformed my cooking! The dual zones are amazing - I can cook chicken and vegetables at the same time with different settings. Everything comes out perfectly crispy without any oil. The energy savings are incredible and it cooks so much faster than my oven. Assembly was straightforward and the dishwasher-safe baskets make cleanup a breeze. Highly recommend this to anyone looking for a quality air fryer!',
    
    // PAWZ Road Cat Tree Review Danish translations
    'product.review.pawz.road.cat.tree.title.gets.cats.approval': 'Får mine katters godkendelse',
    'product.review.pawz.road.cat.tree.content.gets.cats.approval': 'Nice solidt katte-træ som blev købt til at erstatte et der til sidst blev vakkelvorn med alderen. Det gamle blev hovedsageligt brugt af kun en af mine fire katte som gjorde krav på det endda før jeg var færdig med at samle det sammen og hun ville lade de andre tre vide at de ikke var velkomne når hun var på det. Så jeg sørgede for at samle dette med hende ude af rummet så de andre kunne prøve det først og det virkede fordi hun er glad for at dele det med de andre. Bare et lille tip til enhver der har et lignende problem. Masser af plads til fire katte med flere steder at tage en lur eller bare se på husets gang og gå. Det holder nemt den kombinerede vægt af 20kg af alle fire katte uden at vakle når de klatrer eller hopper på og af. Jeg er ubrugelig til at samle fladpakke ting sammen men jeg fandt samling af dette katte-træ nemt og det kom med klare instruktioner. Kattene elsker at bruge træet og der er normalt mindst en af dem på det på ethvert tidspunkt dag og nat og jeg elsker det fordi det ser pænt ud til en fornuftig pris. En god køb.',
    
    'product.review.pawz.road.cat.tree.title.looks.lovely.cats.happy': 'Ser dejligt ud, katte glade',
    'product.review.pawz.road.cat.tree.content.looks.lovely.cats.happy': 'Som sædvanlig var tallene/bogstaverne forkerte på emnerne. Vi tog bare et screenshot af produktet på Amazons side for at give en ordentlig idé om hvad der går hvor. Når det var sorteret ud var det ret nemt at samle sammen. Alle de nødvendige skruer er leveret plus en allen-nøgle. Begge katte har allerede været på det og synes at kunne lide det, selvom den bedste del for dem var støjende at rulle rundt på plastikposen (overvåget selvfølgelig). Træet ser ud til at være stabilt selv med en kat eller to der hopper på og af det. Teddy-bear fleece der dækker alle strukturerne i træet er dejlige og bløde, farverne er som afbildet, men bortset fra kaktussen og kanten omkring det øverste niveau er fleece\'en ret tynd. Dette fratager dog ikke fra hvor pænt det ser ud.',
    
    'product.review.pawz.road.cat.tree.title.perfect.larger.cats': 'Perfekt til større katte!',
    'product.review.pawz.road.cat.tree.content.perfect.larger.cats': 'Vores meget store snøsko-kat kæmper altid med at presse sig selv ind på de fleste katte-træer + de vakler under hendes vægt. Dette træ er meget solidt, ingen vaklen overhovedet og hun passer perfekt på hvert niveau. Hun gik straks i søvn på det højeste afsnit. Dette er det tredje katte-træ vi har prøvet og langt det bedste! Værd hver øre. Vi har nu en meget glad kat. Var meget nem at samle sammen.',
    
    'product.review.pawz.road.cat.tree.title.lovely.lil.purchase': 'Dejlig lille køb',
    'product.review.pawz.road.cat.tree.content.lovely.lil.purchase': 'Synes at være ret anstændig kvalitet for prisen. Nice og solidt. Katte elsker det (for reference mine katte er enorme, nemt 5-8kg😂)',
    
    'product.review.pawz.road.cat.tree.title.cat.likes.design.build': 'Min kat kan lide det men jeg tror designet og bygningen kunne være mere katte-venligt',
    'product.review.pawz.road.cat.tree.content.cat.likes.design.build': 'Samlet set er det et ret godt produkt, var nemt at samle sammen og synes at være solidt når det er bygget. Min kat tog til det meget hurtigt og bruger meget tid på at sove i den øverste seng. Hun bruger endda sisal-indviklede pæle til hendes kløer. Men hun har aldrig brugt det lille \'hule\'-rum og har kun for nylig brugt den nederste \'hængekøje\'-del. Mit hovedbekymring er at der ikke er meget \'fodfæste\'-plads, og hun skal ofte lave et kontrolleret fald for at komme af det. Det kunne også være bedre polstret, for sikkerhed. Når hun leger, mister hun ofte fodfæste eller hendes balance, og når hun prøver at fange sig selv, har hun skadet sig på de skarpe kanter, på trods af at de er dækket i pels-stof, (som er den eneste ting hun kan gribe fat i for at stoppe eller bremse et fald). Hun er også faldet ud af den øverste seng mens hun strakte sig eller rullede. Stakkels baby! Men hun kan godt lide det, så jeg er generelt glad.',
    
    // Keter Bevy Bar Review Danish translations
    'product.review.keter.bevy.bar.title.excellent.size': 'Fremragende størrelse til det jeg havde brug for',
    'product.review.keter.bevy.bar.content.excellent.size': 'Perfekt størrelse og form. Meget solid og nem at bruge/flytte rundt i haven til hvor jeg vil/har brug for det 👍',
    
    'product.review.keter.bevy.bar.title.great.cool.box': 'Fantastisk køleboks',
    'product.review.keter.bevy.bar.content.great.cool.box': 'Fantastisk køleboks som forvandler sig til et anstændigt højde bord som du kan bruge til at sætte drikke på. Vi får masser af komplimenter om det og bliver spurgt hvor det er fra. Fantastisk pris og nem at samle med nem at rense med et klud. Kun dette at bemærke er at du ikke skal sidde på det da det ikke kan holde en persons vægt. Det er let og nemt at flytte.',
    
    'product.review.keter.bevy.bar.title.worth.price': 'Værdi for pengene',
    'product.review.keter.bevy.bar.content.worth.price': 'Fantastisk til hosting, jeg lod boksen stå udenfor til gæster at tage deres drikke og deres drikke forblev kolde. Fantastisk produkt.',
    
    'product.review.keter.bevy.bar.title.nice.looking.multifunctional': 'Flot flerfunktionelt bord',
    'product.review.keter.bevy.bar.content.nice.looking.multifunctional': 'Virkelig godt lavet, solidt udendørs bord. Bordpladen løftes op for at vise isbunken nedenunder hvilket betyder at den er flerfunktionel. Den ser virkelig smuk ud på en terrasse. Nem at rense. Jeg har ladet min stå udenfor over vinteren uden problemer overhovedet.',
    
    'product.review.keter.bevy.bar.title.statement.piece': 'Statement stykke',
    'product.review.keter.bevy.bar.content.statement.piece': 'Fantastisk tilføjelse til sommerens BBQs. Meget nem at samle og justere. Vi har lagt 2 poser is i med plads til omkring 25-30 dåser. Det er så meget mere praktisk end at optage køleskabsplads og gå frem og tilbage for at fylde gæster op. Fungerer også som et andet bord til haven hvilket er nyttigt. Alle har komplimenteret os på hvilket smart lille bord det er. Ville have været 5 stjerner dog kom håndtaget til proppen af efter anden brug. Ikke et stort problem da det er meget nemt at skubbe proppen fra bunden for at dræne.',
    
    'product.review.title.excellent.good.sized.bench': 'Fremragende god størrelse bænk',
    'product.review.content.excellent.good.sized.bench': 'Rimelig priset & praktisk. God størrelse bænk, nem at samle med klare instruktioner, du skal bare bruge en skruetrækker og måske et ekstra par hænder. Virker lidt skrøbelig under samling, men når alt er samlet er den meget solid. Holder masser af havepuder og ser meget stilfuld ud.',
    'product.review.title.damn.good.garden.storage.bench': 'Forbandet god have opbevaringsbænk',
    'product.review.content.damn.good.garden.storage.bench': 'Jeg læste mange af anmeldelserne om dette og der er nogle ret negative. Men jeg læste dem omhyggeligt og kom til den konklusion, at nogle mennesker er lidt kræsne. Jeg modtog denne bænk, meget godt pakket. Jeg kan virkelig ikke klage over hvor ryddeligt den var pakket og polystyrenen omkring delene. Som med alt fladpakket skal du forstå hvordan du samler et lego sæt. At have et lego sæt da du var barn ville være en bonus for at forstå instruktionerne. Instruktionerne er meget klare hvis du læser meget omhyggeligt og sørger for at lægge mærke til hvilke dele der går hvor og hvilke skruer der skal bruges hvor. Det er ikke svært at forstå, men kræver bare at være organiseret og sørge for at forstå delene før du samler det. Hvis du gør det, er det en leg. Nogle mennesker har klaget over tilbageværende plastik på nogle dele fra sprøjtestøbningen. I al ærlighed, når du køber noget der er sprøjtestøbt, skal du forvente lidt tyndt tilbageværende plastik. Min havde dette på et eller to små steder, men det er så tyndt at det er nemt at bryde af.',
    'product.review.title.value.for.money.sturdy.storage.bench': 'Værdi for pengene, solid opbevaringsbænk',
    'product.review.content.value.for.money.sturdy.storage.bench': 'Læste mange anmeldelser for dette produkt før jeg placerede min bestilling den 15/2/25. Jeg havde brug for en vare til opbevaring mens jeg tømte min garage/værksted. Ideen om at den var en sæde viste sig endnu mere nyttig. Anmeldelserne var meget blandede, men så længe alle stykkerne var der og det gik sammen, ville jeg være glad. Stor kasse ankom den 18/2/25, godt pakket, hvilket var godt fordi chaufføren prøvede at bære den ved en af plastikbåndene omkring den, som gik i stykker! Ikke overraskende, tabte han kassen. Han placerede den i min garage til mig at åbne når jeg havde tid. Morgenen den 19/2/25 åbnede jeg kassen og fjernede omhyggeligt alle komponenter, tjekkede dem af og tjekkede dem for fejl. Intet manglede (faktisk blev ekstra skruer leveret), et par stykker så lidt buet ud, men fra tidligere erfaring med fladpak, havde alle lidt spil i sig, så skulle gå sammen. Lagde et gammelt lagen på stuen tæppet og begyndte at samle det (ville ikke gøre det på en hård overflade og ridse det). Alt var stemplet med sit nummer og instruktionerne var klare at følge. Alt gik godt, jeg klarede endda trin 4 på egen hånd hvor det sagde 2 personer. Trin 5 tog længst tid, at få de 2 spor i midten til at klikke ind (de var ikke blevet presset ud grundigt), men en gammel fladbladet skruetrækker fungerede som en god mini mejsler til at skære plastikken væk. Følgende trin gik glat indtil 12, montering af 2. sideende. Igen lidt skæring væk af en lidt buet stykke plastik og det klikkede alle sammen fint. Ved klik hører du et ordentligt klik når det falder på plads. De foreslår at bære arbejdshandsker, gør det venligst, jeg fik et grimt klemmerke i håndfladen ved at skubbe en af fodstøtterne på, min egen skyld, jeg tog handskerne af for at gøre det stykke! Tog mig 2 & 1/2 time på egen hånd fra start til slut. Når det er færdigt, føles det meget solidt og ser ikke så slemt ud, med en pude på sædet og endda et tæppe over hele bænken ville du aldrig vide det. Masser af opbevaringsplads (det siger faktisk et maksimum af 71lb indeni). Meget tilfreds med det i betragtning af prisen. Jeg vil anbefale dette møbel/opbevaring. Kan ikke sige om det er vandtæt endnu, det har kun stået udenfor i 90 minutter på en tør dag! I sikkerhedsinstruktionerne nævner det "Bær sikkerhedsbriller og følg producentens instruktioner når du bruger kraftværktøj." Du skal IKKE bruge kraftværktøj til at samle denne bænk.',
    'product.review.title.great.bench': 'Fantastisk Bænk',
    'product.review.content.great.bench': 'Købte bænken som erstatning for en havekasse og den er perfekt. Ser fantastisk ud, købte den svampe/beige/brune sæde. Godt område til opbevaring, meget solid. Alle komponenterne var tydeligt mærket og nemme at følge instruktioner. Ekstremt tilfreds med denne bænk og vil helt sikkert anbefale.',
    'product.review.title.good.quality.and.looks.great': 'God kvalitet og ser fantastisk ud',
    'product.review.content.good.quality.and.looks.great': 'Hvorfor valgte du dette produkt frem for andre?: God værdi for pengene og nem at samle med klare instruktioner og endda ekstra skruer! Meget tilfreds med dette køb. Ankom også hurtigt med god kommunikation fra leveringsteamet.',
    'reviews.perfect.needs': 'Perfekt! Præcis hvad jeg havde brug for',
    
    // Keter City Storage Box Customer Reviews - Danish
    'product.review.keter.city.title.perfect': 'Det er perfekt 👌',
    'product.review.keter.city.content.perfect': 'Absolut perfekt! Så meget tilfreds med denne haveopbevaringscontainer. Den er meget solid, passer og klikker ind i de relevante spor, ser fantastisk ud, meget god værdi for pengene sammen med at tilføje en hængelås hvis nødvendigt og lokket er en fantastisk funktion, kan varmt anbefale.',
    
    'product.review.keter.city.title.great.assembly': 'Fantastisk samling, flot produkt, god værdi.',
    'product.review.keter.city.content.great.assembly': 'Dette var virkelig godt pakket. Alle stykker passede godt sammen, et par stykker havde brug for lidt overtalelse med en flad træblok, bare fordi de var lidt stramme for mig at skubbe sammen. Nem at flytte på plads, meget solid når den er samlet, og lokket passer godt på toppen. Forhåbentlig vil den være vandtæt da alle kanter overlapper og der er ingen huller nogle steder. Perfekt til regelmæssigt brugte værktøjer på terrassen, sparer en tur til garagen og holder alt tæt på hånden.',
    
    'product.review.keter.city.title.keter.storage.box': 'Keter Opbevaringsboks',
    'product.review.keter.city.content.keter.storage.box': 'Købte dette som en pakkeboks til hoveddøren og den passede perfekt til pladsen. Den var virkelig nem at samle da der ikke krævedes værktøj og enkel at flytte da den er let. Byggekvaliteten føles god som jeg ville forvente fra Keter og lokket åbner og lukker uden at hage. Denne Keter opbevaringsboks var fantastisk værdi for pengene og er i øjeblikket på tilbud.',
    
    'product.review.keter.city.title.solid.so.far': 'Solid indtil videre så god',
    'product.review.keter.city.content.solid.so.far': 'Jeg købte fornylig denne Keter City 113L udendørs opbevaringsboks og jeg er virkelig tilfreds med den indtil videre. Den passer perfekt på min lille balkon og tilbyder en anstændig mængde opbevaring for dens størrelse. Den grå træeffekt panel ser stilfuld og moderne ud, og jeg elsker at den er fremstillet af 96% genanvendte materialer. Den føles solid og har allerede stået sig godt til lidt regn, uden tegn på at falme eller beskadigelse.',
    
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
    
    // Safety features - Danish
    'product.safety.weather.resistant': 'Vejrbestandig',
    'product.safety.fade.free': 'Fade-fri',
    'product.safety.all.weather.resistant': 'Alt vejr bestandig',
    'product.safety.safe.and.secure': 'Sikker og sikker',
    'product.safety.zero.maintenance': 'Nul vedligeholdelse',
    
    // Keter Bevy Bar Safety Features Danish
    'product.safety.uv.treated': 'UV-behandlet',
    'product.safety.insulated': 'Isoleret',
    'product.safety.maintenance.free': 'Vedligeholdelsesfri',
    'product.safety.child.safe.construction': 'Børnesikker konstruktion',
    
    // Color and size options
    'product.color.name': 'Farvenavn',
    'product.size.name': 'Størrelsesnavn',
    
    // Store and returns
    'product.visit.store': 'Besøg {store} butikken',
    

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
    'nav.outdoor.storage': 'Utendørs Oppbevaring',
    'nav.garden.benches': 'Hagebenker',
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
    
    // About this item content - Norwegian
    'product.about.keter.storage.shed.1': 'Ideell utendørs oppbevaringsløsning til hageverktøy og utstyr, BBQ og tilbehør og x2 120L søppelbøtter.',
    'product.about.keter.storage.shed.2': 'Elegante treffektpaneler som åpner fra toppen eller fronten og med en låsbar funksjon til sikker lukking.',
    'product.about.keter.storage.shed.3': 'Tungt gulv med innebygd støtte til hyller og 880 L kapasitet. Hyller er ikke inkludert.',
    'product.about.keter.storage.shed.4': 'Samlet dimensjoner: 132 x 71,5 x 113,5 cm (L x B x H); interne dimensjoner: 122 x 61 x 108,8 cm (L x B x H).',
    'product.about.keter.storage.shed.5': 'Værbestandig, null vedlikehold, enkel å rense, fade-fri konstruksjon.',
    'product.about.keter.storage.shed.6': 'Innebygde ventilasjonspaneler til rikelig luftstrøm.',
    'product.about.keter.storage.shed.7': 'To dører på fronten og et topplokk med unikt låsesystem.',
    'product.about.keter.storage.shed.8': 'Kan låse dører og topp sammen eller kun låse dører for barnesikker tilgang ovenfra (hengelås er ikke inkludert).',
    'product.about.keter.storage.shed.9': 'Samletid: omtrent 20-40 minutter, anbefalt til 1 person.',
    
    // Product detail values - Norwegian
    'product.color.light.grey.dark.cover': 'Lys grå med mørk grå lokk',
    'product.material.resin': 'Harpiks',
    'product.dimensions.71.5x132x113.5': '71,5D x 132B x 113,5H centimeter',
    'product.weight.21.5kg': '21,5 kilogram',
    'product.volume.880l': '880 liter',
    'product.uv.resistant': 'UV-bestandig',
    'product.special.features.heavy.duty': 'Tungt, Vannbestandig, Vanntett',
    'product.usage.outdoor.storage': 'utendørs oppbevaring, innendørs oppbevaring, hageoppbevaring',
    'product.assembly.time.20.40.minutes': '20-40 minutter',
    'product.assembly.recommended.1.person': '1 person',
    
    // Technical detail values - Norwegian
    'product.size.132x71.5x113.5.cm': '132 x 71,5 x 113,5 cm',
    'product.style.single': 'Enkelt',
    'product.pattern.single': 'Enkelt',
    'product.pattern.wood.effect': 'Trefeffekt',
    'product.shape.horizontal': 'Horisontal',
    'product.shape.rectangular': 'Rektangulær',
    'product.batteries.no': 'Nei',
    'product.date.first.available.march.2021': '1. mars 2021',
    'product.date.first.available.january.2011': '1. januar 2011',
    'product.style.name': 'Stilnavn:',
    'product.material.name': 'Materialnavn:',
    'product.pattern.name': 'Mønsternavn:',
    'product.finish.name': 'Ferdigstillelsesnavn:',
    
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
    'product.info.warranty': 'Garanti',
    'product.info.recycled.content': 'Gjenbrukt Innhold',
    
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
    'product.detail.seat.height': 'Sittehøyde',
    'product.detail.storage.capacity': 'Lagringskapasitet',
    'product.detail.lockable': 'Låsbar',
    'product.detail.yes': 'Ja',
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
    'product.technical.details': 'Tekniske detaljer',
    
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
    
    // Keter City Storage Box Customer Reviews - Norwegian
    'product.review.keter.city.title.perfect': 'Det er perfekt 👌',
    'product.review.keter.city.content.perfect': 'Absolutt perfekt! Så fornøyd med denne hageoppbevaringscontaineren. Den er veldig solid, passer og klikker inn i de relevante sporene, ser fantastisk ut, veldig god verdi for pengene sammen med å legge til en hengelås hvis nødvendig og lokket er en fantastisk funksjon, kan varmt anbefale.',
    
    'product.review.keter.city.title.great.assembly': 'Fantastisk samling, flott produkt, god verdi.',
    'product.review.keter.city.content.great.assembly': 'Dette var virkelig godt pakket. Alle brikkene passet godt sammen, et par stykker trengte litt overtalelse med en flat treblokk, bare fordi de var litt stramme for meg å dytte sammen. Enkel å flytte på plass, veldig solid når den er samlet, og lokket passer godt på toppen. Forhåpentligvis vil den være vanntett siden alle kanter overlapper og det er ingen hull noe sted. Perfekt til regelmessig brukte verktøy på terrassen, sparer en tur til garasjen og holder alt nærme hånden.',
    
    'product.review.keter.city.title.keter.storage.box': 'Keter Oppbevaringsboks',
    'product.review.keter.city.content.keter.storage.box': 'Kjøpte dette som en pakkeboks til hoveddøren og den passet perfekt til plassen. Den var virkelig enkel å sette sammen siden det ikke krevdes verktøy og enkel å flytte siden den er lett. Byggekvaliteten føles god som jeg ville forvente fra Keter og lokket åpner og lukker uten å henge. Denne Keter oppbevaringsboks var fantastisk verdi for pengene og er for øyeblikket på tilbud.',
    
    'product.review.keter.city.title.solid.so.far': 'Solid så langt så god',
    'product.review.keter.city.content.solid.so.far': 'Jeg kjøpte nylig denne Keter City 113L utendørs oppbevaringsboks og jeg er virkelig fornøyd med den så langt. Den passer perfekt på min lille balkong og tilbyr en anstendig mengde oppbevaring for sin størrelse. Den grå treffekt panelen ser stilfull og moderne ut, og jeg elsker at den er fremstilt av 96% gjenbrukte materialer. Den føles solid og har allerede stått seg bra til litt regn, uten tegn på å falme eller skade.',
    
    'product.name.keter.storage.shed': 'Keter Store it Out Nova Utenomshus Hageoppbevaring',
      'product.name.keter.eden.bench': 'Keter Eden Benk 265L Utenomshus Hagemøbel Lagringsboks',
    
    // Keter City Storage Box Norwegian translations
    'product.about.keter.city.storage.box.1': 'Ideell utendørs hageoppbevaringsboks til hageverktøy og utstyr, hagemøbelputer, hageleker og tilbehør',
    'product.about.keter.city.storage.box.2': 'Dekorativ treffekt panelerte stil med 113 L kapasitet som holder alt ventilerte og tørt',
    'product.about.keter.city.storage.box.3': 'Perfekt til balkonger og små områder og klar til bruk på kun 5 minutter',
    'product.about.keter.city.storage.box.4': 'Fremstilt av holdbart, værbestandig, vedlikeholdsfritt fade-fritt og 96% gjenbrukt harpiks',
    'product.about.keter.city.storage.box.5': 'Samlet eksterne dimensjoner: 57,8 x 44 x 55 cm (L x B x H); Interne dimensjoner: 57,7 x 41,6 x 51,6 cm (L x B x H)',
    
    'product.features.keter.city.storage.box.1': '113L oppbevaringskapasitet',
    'product.features.keter.city.storage.box.2': 'Perfekt til balkonger og små områder',
    'product.features.keter.city.storage.box.3': 'Låsbar mulighet for økt sikkerhet',
    'product.features.keter.city.storage.box.4': 'Fremstilt av holdbart, værbestandig harpiks',
    'product.features.keter.city.storage.box.5': '96% gjenbrukt materiale',
    'product.features.keter.city.storage.box.6': 'Fade-fri og vedlikeholdsfri',
    'product.features.keter.city.storage.box.7': 'Grå treffekt panel finish',
    'product.features.keter.city.storage.box.8': 'Alt vær bestandig konstruksjon',
    'product.features.keter.city.storage.box.9': 'Innbygde håndtak til enkel flytting',
    'product.features.keter.city.storage.box.10': '5-minutters samling uten verktøy påkrevd',
    
    // Keter Bevy Bar Norwegian translations
    'product.about.keter.bevy.bar.1': 'Bevy Bar er det perfekte festtilbehør siden den kombinerer en drikkekjøler og cocktailbord.',
    'product.about.keter.bevy.bar.2': 'Utrustet med en dobbeltveggskjøler som holder innholdet kaldt, kan den lagre opptil 65 flasker eller 130 bokser.',
    'product.about.keter.bevy.bar.3': 'Lås lokket sikkert når det er åpent og bruk det som et sidebord til å servere mat og drikke.',
    'product.about.keter.bevy.bar.4': 'Åpen størrelse: 83,5cm (L) x 75cm (B) x 40,5cm (H) Lukket størrelse: 83,5cm (L) x 52cm (B) x 5cm (H)',
    'product.about.keter.bevy.bar.5': 'Fremstilt av gjenbrukt plastikk krever Bevy Bar lite vedlikehold.',
    'product.about.keter.bevy.bar.6': 'Tre-i-ett møbel: kombiner en drikkekjøler, et cocktailbord eller et kaffebord.',
    'product.about.keter.bevy.bar.7': 'Bevy Bar kan brukes åpen eller lukket.',
    
    'product.features.keter.bevy.bar.1': '60 liter kapasitet',
    'product.features.keter.bevy.bar.2': 'UV-behandlet',
    'product.features.keter.bevy.bar.3': 'Isolert',
    'product.features.keter.bevy.bar.4': 'Vedlikeholdsfri',
    'product.features.keter.bevy.bar.5': 'Dobbeltveggskjøler',
    'product.features.keter.bevy.bar.6': 'Lagrer opptil 65 flasker eller 130 bokser',
    'product.features.keter.bevy.bar.7': 'Låsbart lokk',
    'product.features.keter.bevy.bar.8': 'Tre-i-ett møbeldesign',
    'product.features.keter.bevy.bar.9': 'Fremstilt av gjenbrukt plastikk',
    'product.features.keter.bevy.bar.10': 'Enkel å rense og vedlikeholde',
    
    // Keter Marvel Storage Box Norwegian translations
    'product.about.keter.marvel.storage.box.1': 'Ideell utendørs hageoppbevaringsboks til hageverktøy og utstyr, hagemøbelputer, hageleker og tilbehør',
    'product.about.keter.marvel.storage.box.2': 'Dekorativ trepanelet stil finish med 71G kapasitet som holder alle gjenstander ventilerte og tørre',
    'product.about.keter.marvel.storage.box.3': 'Innbygde håndtak til enkel portabilitet og kan komfortabelt sitte to voksne',
    'product.about.keter.marvel.storage.box.4': 'Fremstilt av holdbart, værbestandig, vedlikeholdsfritt fade-fritt og 65% gjenbrukt harpiks',
    'product.about.keter.marvel.storage.box.5': 'Samlet eksterne dimensjoner: 116,7 x 44,7 x 57 cm (L x B x H); Interne dimensjoner: 114,4 x 40 x 51,2 cm (L x B x H)',
    
    // Keter Marvel Storage Box Features - Norwegian
    'product.features.keter.marvel.storage.box.1': '270L oppbevaringskapasitet til hageverktøy og utstyr',
    'product.features.keter.marvel.storage.box.2': 'Dekorativ trepanelet stil finish med 71G kapasitet',
    'product.features.keter.marvel.storage.box.3': 'Innbygde håndtak til enkel portabilitet',
    'product.features.keter.marvel.storage.box.4': 'Kan komfortabelt sitte to voksne (støtter opptil 220 kg)',
    'product.features.keter.marvel.storage.box.5': 'Fremstilt av holdbart, værbestandig, vedlikeholdsfritt fade-fritt harpiks',
    'product.features.keter.marvel.storage.box.6': '65% gjenbrukt harpiks materiale til bærekraft',
    'product.features.keter.marvel.storage.box.7': 'Låsbar design til økt sikkerhet (lås er ikke inkludert)',
    'product.features.keter.marvel.storage.box.8': 'Rullebar med innbygde hjul til enkel bevegelse',
    'product.features.keter.marvel.storage.box.9': 'Alt vær bestandig og vanntett',
    'product.features.keter.marvel.storage.box.10': 'Null vedlikehold påkrevd',
    
    // PAWZ Road Cat Tree Norwegian translations
    'product.about.pawz.road.cat.tree.1': 'Ultimativ aktivitetshus: Utrustet med et rommelig condo, rommelig hengekøye, koselig myk topp-perch, naturlige sisal-dekkede klopæler og fluffy dinglende ball, er denne 116cm kattetre et ideelt sted til underholdning samt å ta en god hvile.',
    'product.about.pawz.road.cat.tree.2': 'Komfortable hvile-sports for tunge katter: Med en super stor hengekøye med lengde på 45*40cm, festet i hvert hjørnepunkt, er den sterk nok til å støtte din fete fuzzy baby.',
    'product.about.pawz.road.cat.tree.3': 'Trening og negle-helse tatt seg av: 4 naturlige sisal-dekkede pæler gir dem mulighet til å frigjøre følelser og ha daglig klo-trening uten å skade ditt delikate møbler.',
    'product.about.pawz.road.cat.tree.4': 'Pålitelig kvalitet: Stabilitet og sikkerhet er alltid nøkkelpunktene. Fremstilt av myk myk stoff, CARB-sertifiserte naturlige sponplater, faste sisal-innviklede pæler og forsterket base.',
    'product.about.pawz.road.cat.tree.5': 'Enkel installasjon: Illustrert samle-manual inkludert, du kan også slå opp video på YouTube for enklere installasjon. Ingen ekstra verktøy nødvendig med den inneholdte hardware-pakken.',
    
    'product.features.pawz.road.cat.tree.1': '116cm høyde til mellom-katter',
    'product.features.pawz.road.cat.tree.2': '4 naturlige sisal klopæler',
    'product.features.pawz.road.cat.tree.3': 'Stor hengekøye (45x40cm)',
    'product.features.pawz.road.cat.tree.4': 'Koselig myk condo',
    'product.features.pawz.road.cat.tree.5': 'Topp-perch med hevet kant',
    'product.features.pawz.road.cat.tree.6': 'Metallramme konstruksjon',
    'product.features.pawz.road.cat.tree.7': 'Stabil og solid base',
    'product.features.pawz.road.cat.tree.8': 'Enkel samling',
    'product.features.pawz.road.cat.tree.9': 'CARB-sertifiserte materialer',
    'product.features.pawz.road.cat.tree.10': 'Egnet til tunge katter',
    
    // Feandrea Cat Tree Norwegian translations
    'product.about.feandrea.cat.tree.1': 'Gi din søte killing et komfortabelt hjem! - Stor størrelse på 100 x 90 x 165 cm (B x D x H); dette kattetre gir nok plass til nesten alle katter av forskjellige aldre og størrelser',
    'product.about.feandrea.cat.tree.2': 'Fortsatt solidt og stabilt selv når dine katter er overaktive - Basen er laget av høy kvalitet sponplade og anti-vipestroppen er inkludert for å sikre stabiliteten av hele kattetreet; runde hjørner av hver plade forhindrer skade på deg og dine felines',
    'product.about.feandrea.cat.tree.3': 'Klopæler - Naturlige sisal-dekkede pæler tilfredsstiller katters instinkt for å klø og gni, sparer møblene dine fra deres skarpe klør',
    'product.about.feandrea.cat.tree.4': 'Slapp av og hvil komfortabelt - Utrustet med et mykt kattehus, hengende kurv og koselige percher, kan selv den mest kresne katt alltid finne seg et behagelig rom',
    'product.about.feandrea.cat.tree.5': 'Morsomt å leke - Multi-nivå design gir dine katter mulighet til fritt å hoppe, klatre og utforske rundt om deres katte-tårn, koselig tunnel og ball med klokke gir enda flere muligheter for dine katter å nyte seg selv',
    
    'product.features.feandrea.cat.tree.1': 'Stor størrelse 100 x 90 x 165 cm',
    'product.features.feandrea.cat.tree.2': 'Multi-nivå design til flere katter',
    'product.features.feandrea.cat.tree.3': 'Naturlige sisal-dekkede klopæler',
    'product.features.feandrea.cat.tree.4': 'Mykt kattehus med koselige percher',
    'product.features.feandrea.cat.tree.5': 'Hengende kurv til avslapning',
    'product.features.feandrea.cat.tree.6': 'Anti-vipestrop inkludert',
    'product.features.feandrea.cat.tree.7': 'Runde hjørner for sikkerhet',
    'product.features.feandrea.cat.tree.8': 'Høy kvalitet sponplade base',
    'product.features.feandrea.cat.tree.9': 'Komprimert pappkarton støtterør',
    'product.features.feandrea.cat.tree.10': 'Egnet til katter opp til 7kg',
    
    // VASAGLE TV Unit translations
    'product.about.vasagle.tv.unit.1': 'LIKE ON TV: The white TV stand adds a touch of unique charm to your room. You will not feel any jealousy seeing the interiors of lofts in Paris and New York in movies and on TV.',
    'product.about.vasagle.tv.unit.2': 'Enough Space The TV stand can accommodate TVs up to 65 inches. For small TVs, it is enough to place plants on both sides.',
    'product.about.vasagle.tv.unit.3': 'Everything is ready: will your favorite movie be on TV soon? You can place the game consoles and receivers in the 2 open compartments and store the DVDs in the compartments with doors. The movie is in progress and you just have to sit back and enjoy it.',
    'product.about.vasagle.tv.unit.4': 'As simple as 1x1: thanks to the clear instructions and the well-identified parts, assembly is done without breaking your head. After work, you still have time to settle down before the screening of your favorite movie at 8:15 p.m.',
    'product.about.vasagle.tv.unit.5': '3, 2, 1, Action: This modern TV stand will be your perfect Sunday night companion. Grab the chips hidden behind the push-opening door and enjoy your movie night with family or friends.',
    
    'product.features.vasagle.tv.unit.1': '140 cm long TV unit for TVs up to 65 inches',
    'product.features.vasagle.tv.unit.2': '2 doors with adjustable shelves',
    'product.features.vasagle.tv.unit.3': 'Open compartments for game consoles and receivers',
    'product.features.vasagle.tv.unit.4': 'Closed compartments for DVDs and storage',
    'product.features.vasagle.tv.unit.5': 'High-quality water-resistant particleboard panels',
    'product.features.vasagle.tv.unit.6': '12 cm space underneath for robotic vacuuming',
    'product.features.vasagle.tv.unit.7': 'Two cable holes for easy cable management',
    'product.features.vasagle.tv.unit.8': 'Modern white design for any room',
    'product.features.vasagle.tv.unit.9': 'Easy assembly with clear instructions',
    'product.features.vasagle.tv.unit.10': 'Maximum static load capacity: 50 kg',
    
    // VASAGLE TV Unit Norwegian translations
    'product.about.vasagle.tv.unit.1.no': 'LIKESOM PÅ TV: Det hvite TV-bordet legger til et snev av unik sjarm til rommet ditt. Du vil ikke føle noen sjalusi når du ser interiøret av lofts i Paris og New York i filmer og på TV.',
    'product.about.vasagle.tv.unit.2.no': 'Nok plass TV-bordet kan romme TV opp til 65 tommer. For små TV er det nok å plassere planter på begge sider.',
    'product.about.vasagle.tv.unit.3.no': 'Alt er klart: vil favorittfilmen din snart være på TV? Du kan plassere spillkonsoller og mottakere i de 2 åpne rommene og lagre DVD-er i rommene med dører. Filmen er i gang og du trenger bare å lene deg tilbake og nyte den.',
    'product.about.vasagle.tv.unit.4.no': 'Så enkelt som 1x1: takket være de klare instruksjonene og de velidentifiserte delene, skjer monteringen uten å bryte hodet. Etter jobb har du fortsatt tid til å slå deg ned før visningen av favorittfilmen din kl. 20:15.',
    'product.about.vasagle.tv.unit.5.no': '3, 2, 1, Action: Dette moderne TV-bordet vil være din perfekte søndag kveld ledsager. Ta chipsen gjemt bak den trykk-åpne døren og nyt filmkvelden din med familie eller venner.',
    
    'product.features.vasagle.tv.unit.1.no': '140 cm langt TV-bord til TV opp til 65 tommer',
    'product.features.vasagle.tv.unit.2.no': '2 dører med justerbare hyller',
    'product.features.vasagle.tv.unit.3.no': 'Åpne rom til spillkonsoller og mottakere',
    'product.features.vasagle.tv.unit.4.no': 'Lukkede rom til DVD-er og lagring',
    'product.features.vasagle.tv.unit.5.no': 'Høy kvalitet vannavstøtende sponplade',
    'product.features.vasagle.tv.unit.6.no': '12 cm plass under for robotstøvsuging',
    'product.features.vasagle.tv.unit.7.no': 'To kabelhull for enkel kabelstyring',
    'product.features.vasagle.tv.unit.8.no': 'Moderne hvitt design til ethvert rom',
    'product.features.vasagle.tv.unit.9.no': 'Enkel montering med klare instruksjoner',
    'product.features.vasagle.tv.unit.10.no': 'Maksimal statisk belastningskapasitet: 50 kg',
    
    // PAWZ Road Cat Tree Review Norwegian translations
    'product.review.pawz.road.cat.tree.title.gets.cats.approval': 'Får mine katters godkjenning',
    'product.review.pawz.road.cat.tree.content.gets.cats.approval': 'Nice solidt kattetre som ble kjøpt for å erstatte et som til slutt ble vaklevorne med alderen. Det gamle ble hovedsakelig brukt av kun en av mine fire katter som gjorde krav på det enda før jeg var ferdig med å sette det sammen og hun ville la de andre tre vite at de ikke var velkomne når hun var på det. Så jeg sørget for å sette sammen dette med henne ute av rommet så de andre kunne prøve det først og det fungerte fordi hun er glad for å dele det med de andre. Bare et lite tips til enhver som har et lignende problem. Masser av plass til fire katter med flere steder å ta en lur eller bare se på husets gang og gå. Det holder enkelt den kombinerte vekten av 20kg av alle fire katter uten å vakle når de klatrer eller hopper på og av. Jeg er ubrukelig til å sette sammen flatepakke ting men jeg fant sammenføyning av dette kattetre enkelt og det kom med klare instruksjoner. Kattene elsker å bruke treet og det er normalt minst en av dem på det på ethvert tidspunkt dag og natt og jeg elsker det fordi det ser pent ut til en fornuftig pris. En god kjøp.',
    
    'product.review.pawz.road.cat.tree.title.looks.lovely.cats.happy': 'Ser deilig ut, katter glade',
    'product.review.pawz.road.cat.tree.content.looks.lovely.cats.happy': 'Som vanlig var tallene/bokstavene feil på emnene. Vi tok bare et screenshot av produktet på Amazons side for å gi en ordentlig idé om hva som går hvor. Når det var sortert ut var det ganske enkelt å sette sammen. Alle de nødvendige skruene er levert pluss en allen-nøkkel. Begge katter har allerede vært på det og synes å kunne like det, selv om den beste delen for dem var støyende å rulle rundt på plastikkposen (overvåket selvfølgelig). Treet ser ut til å være stabilt selv med en katt eller to som hopper på og av det. Teddy-bear fleece som dekker alle strukturene i treet er deilige og myke, fargene er som avbildet, men bortsett fra kaktussen og kanten rundt det øverste nivået er fleece\'en ganske tynn. Dette fratar dog ikke fra hvor pent det ser ut.',
    
    'product.review.pawz.road.cat.tree.title.perfect.larger.cats': 'Perfekt til større katter!',
    'product.review.pawz.road.cat.tree.content.perfect.larger.cats': 'Vår meget store snøsko-katt kjemper alltid med å presse seg selv inn på de fleste kattetrær + de vakler under hennes vekt. Dette treet er meget solidt, ingen vakling i det hele tatt og hun passer perfekt på hvert nivå. Hun gikk straks i søvn på den høyeste seksjonen. Dette er det tredje kattetre vi har prøvd og langt det beste! Verdt hver øre. Vi har nå en meget glad katt. Var meget enkelt å sette sammen.',
    
    'product.review.pawz.road.cat.tree.title.lovely.lil.purchase': 'Deilig liten kjøp',
    'product.review.pawz.road.cat.tree.content.lovely.lil.purchase': 'Synes å være ganske anstendig kvalitet for prisen. Nice og solidt. Katter elsker det (for referanse mine katter er enorme, enkelt 5-8kg😂)',
    
    'product.review.pawz.road.cat.tree.title.cat.likes.design.build': 'Min katt liker det men jeg tror designet og byggingen kunne vært mer katt-vennlig',
    'product.review.pawz.road.cat.tree.content.cat.likes.design.build': 'Samlet sett er det et ganske godt produkt, var enkelt å sette sammen og synes å være solidt når det er bygget. Min katt tok til det veldig raskt og bruker mye tid på å sove i den øverste sengen. Hun bruker enda sisal-innviklede pæler til hennes klør. Men hun har aldri brukt det lille \'hule\'-rommet og har kun nylig brukt den nederste \'hengekøye\'-delen. Min hovedbekymring er at det ikke er mye \'fotfeste\'-plass, og hun må ofte gjøre et kontrollert fall for å komme av det. Det kunne også vært bedre polstret, for sikkerhet. Når hun leker, mister hun ofte fotfestet eller hennes balanse, og når hun prøver å fange seg selv, har hun skadet seg på de skarpe kantene, til tross for at de er dekket i pels-stoff, (som er den eneste tingen hun kan gripe tak i for å stoppe eller bremse et fall). Hun har også falt ut av den øverste sengen mens hun strakte seg eller rullede. Stakkels baby! Men hun liker det, så jeg er generelt glad.',
    
    // Keter Bevy Bar Review Norwegian translations
    'product.review.keter.bevy.bar.title.excellent.size': 'Utmerket størrelse til det jeg trengte',
    'product.review.keter.bevy.bar.content.excellent.size': 'Perfekt størrelse og form. Veldig solid og enkel å bruke/flytte rundt i hagen til hvor jeg vil/trenger det 👍',
    
    'product.review.keter.bevy.bar.title.great.cool.box': 'Fantastisk kjøleboks',
    'product.review.keter.bevy.bar.content.great.cool.box': 'Fantastisk kjøleboks som forvandler seg til et anstendig høyde bord som du kan bruke til å sette drikke på. Vi får massevis av komplimenter om det og blir spurt hvor det er fra. Fantastisk pris og enkel å sette sammen med enkel å rense med en klut. Kun dette å merke seg er at du ikke skal sitte på det siden det ikke kan holde en persons vekt. Det er lett og enkelt å flytte.',
    
    'product.review.keter.bevy.bar.title.worth.price': 'Verdi for pengene',
    'product.review.keter.bevy.bar.content.worth.price': 'Fantastisk til hosting, jeg lot boksen stå utenfor til gjester å ta deres drikke og deres drikke forblev kalde. Fantastisk produkt.',
    
    'product.review.keter.bevy.bar.title.nice.looking.multifunctional': 'Flott flerfunksjonelt bord',
    'product.review.keter.bevy.bar.content.nice.looking.multifunctional': 'Virkelig godt laget, solidt utendørs bord. Bordplaten løftes opp for å vise isbunken nedenfor som betyr at den er flerfunksjonell. Den ser virkelig vakker ut på en terrasse. Enkel å rense. Jeg har latt min stå utenfor over vinteren uten problemer i det hele tatt.',
    
    'product.review.keter.bevy.bar.title.statement.piece': 'Statement stykke',
    'product.review.keter.bevy.bar.content.statement.piece': 'Fantastisk tilføyelse til sommerens BBQs. Veldig enkel å sette sammen og justere. Vi har lagt 2 poser is i med plass til omkring 25-30 bokser. Det er så mye mer praktisk enn å ta opp kjøleskappsplass og gå frem og tilbake for å fylle opp gjester. Fungerer også som et annet bord til hagen som er nyttig. Alle har komplimentert oss på hvilket smart lite bord det er. Ville ha vært 5 stjerner dog kom håndtaket til proppen av etter andre bruk. Ikke et stort problem siden det er veldig enkelt å dytte proppen fra bunnen for å drenere.',
    
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
    
    // Ninja Air Fryer translations - Norwegian
    'product.about.ninja.air.fryer.1': 'ENERGIBESPARELSE: Spar opptil 75% på energiregningen din* (*testing og beregninger basert på anbefalt tilberedningstid for pølser ved bruk av luftfriturefunksjon versus konvensjonelle ovner).',
    'product.about.ninja.air.fryer.2': '2 UAVHENGIGE TILBEREDNINGSSONER: Tilbered 2 matvarer, 2 måter, begge klare samtidig. Bruk forskjellige funksjoner, tider og temperaturer i hver skuffe for å lage komplette måltider i ett apparat, eller imøtekom 2 smaker.',
    'product.about.ninja.air.fryer.3': '6 TILBEREDNINGSFUNKSJONER: Max Crisp, Air Fry, Roast, Bake, Reheat, Dehydrate. Tilbered fra frossen til sprø. Opptil 75% mindre fett* ved bruk av Air Fry-funksjonen (*Testet mot friturestekte, håndskårne pommes frites).',
    'product.about.ninja.air.fryer.4': 'STOR KAPASITET: Tilbered 4-6 porsjoner. Hver skuffe kan inneholde opptil 1kg pommes frites eller en 1,6kg kylling. Tilbered opptil 75% raskere enn varmluftsovner* (*Testet mot fiskefingre og pølser, inkludert forvarming).',
    'product.about.ninja.air.fryer.5': 'INKLUDERER: Ninja Air Fryer (UK Stikk), 2x Non-stick, oppvaskemaskinsikre 3,8L Skuffer (7,6L total kapasitet) & Crisper Plater. Chef-Skapt Oppskriftsguide. Vekt: 8,2kg. Farge: Svart.',
    
    'product.features.ninja.air.fryer.1': '7,6L total kapasitet med 2 uavhengige tilberedningssoner',
    'product.features.ninja.air.fryer.2': '6 tilberedningsfunksjoner: Air Fry, Max Crisp, Roast, Bake, Reheat, Dehydrate',
    'product.features.ninja.air.fryer.3': 'Sparer opptil 75% på energiregninger sammenlignet med konvensjonelle ovner',
    'product.features.ninja.air.fryer.4': 'Tilbered 2 matvarer, 2 måter, begge klare samtidig',
    'product.features.ninja.air.fryer.5': 'Hver skuffe kan inneholde opptil 1kg pommes frites eller en 1,6kg kylling',
    'product.features.ninja.air.fryer.6': 'Tilbered opptil 75% raskere enn varmluftsovner',
    'product.features.ninja.air.fryer.7': 'Opptil 75% mindre fett ved bruk av Air Fry-funksjonen',
    'product.features.ninja.air.fryer.8': 'Non-stick, oppvaskemaskinsikre kurver og sprøhetsplater',
    'product.features.ninja.air.fryer.9': '2400W effekt med UK stikk',
    'product.features.ninja.air.fryer.10': '2 års garanti ved registrering',
    
    'product.details.ninja.air.fryer.brand': 'Merke',
    'product.details.ninja.air.fryer.color': 'Farge',
    'product.details.ninja.air.fryer.material': 'Materiale',
    'product.details.ninja.air.fryer.capacity': 'Kapasitet',
    'product.details.ninja.air.fryer.power': 'Effekt',
    'product.details.ninja.air.fryer.voltage': 'Spenning',
    'product.details.ninja.air.fryer.weight': 'Vekt',
    'product.details.ninja.air.fryer.model': 'Modell',
    
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
  
  // Norwegian Safety Features
  'product.safety.uv.treated': 'UV-behandlet',
  'product.safety.insulated': 'Isolert',
  'product.safety.maintenance.free': 'Vedlikeholdsfri',
  'product.safety.child.safe.construction': 'Barnesikker konstruksjon',
  
  es: { // Spanish (Spain)
    // Basic translations
    'homepage.welcome': 'Bienvenido a Amazon',
    'homepage.see.more': 'Ver más',
    'homepage.amazon.choice': 'Elección de Amazon',
    'homepage.prime': 'Prime',
    'homepage.free.delivery': 'Envío GRATIS',
    
    // Navigation
    'nav.home': 'Inicio',
    'nav.garden': 'Jardín',
    'nav.outdoor.storage': 'Almacenamiento Exterior',
    'nav.garden.benches': 'Bancos de Jardín',
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
    'product.name.keter.eden.bench': 'Keter Eden Banco 265L Caja de Almacenamiento de Muebles de Jardín al Aire Libre',
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
    
    // Safety features - Spanish
    'product.safety.weather.resistant': 'Resistente al clima',
    'product.safety.fade.free': 'Sin desvanecimiento',
    'product.safety.all.weather.resistant': 'Resistente a todo clima',
    'product.safety.safe.and.secure': 'Seguro y protegido',
    'product.safety.zero.maintenance': 'Sin mantenimiento',
    
    // Technical detail values - Spanish
    'product.style.single': 'Único',
    'product.style.name': 'Nombre del estilo:',
    'product.material.name': 'Nombre del material:',
    'product.pattern.name': 'Nombre del patrón:',
    'product.finish.name': 'Nombre del acabado:',
    'product.pattern.single': 'Único',
    'product.pattern.wood.effect': 'Efecto madera',
    'product.shape.horizontal': 'Horizontal',
    'product.shape.rectangular': 'Rectangular',
    'product.batteries.no': 'No',
    'product.date.first.available.march.2021': '1 mar. 2021',
    'product.date.first.available.january.2011': '1 ene. 2011',
    
    // Technical detail labels - Spanish
    'product.technical.manufacturer': 'Fabricante',
    'product.technical.part.number': 'Número de pieza',
    'product.technical.item.model.number': 'Número de modelo del artículo',
    'product.technical.size': 'Tamaño',
    'product.technical.style': 'Estilo',
    'product.technical.pattern': 'Patrón',
    'product.technical.shape': 'Forma',
    'product.technical.item.package.quantity': 'Cantidad del paquete del artículo',
    'product.technical.batteries.required': 'Baterías requeridas',
    'product.technical.asin': 'ASIN',
    'product.technical.date.first.available': 'Fecha de primera disponibilidad',
    'product.technical.details': 'Detalles técnicos',
    'product.technical.details.title': 'Detalles técnicos',
  },

  ch: { // Swiss German (Switzerland)
    // Basic translations
    'homepage.welcome': 'Willkommen bei Amazon',
    'homepage.see.more': 'Mehr anzeigen',
    'homepage.amazon.choice': 'Amazons Wahl',
    'homepage.prime': 'Prime',
    'homepage.free.delivery': 'KOSTENLOSE Lieferung',
    
    // Navigation
    'nav.home': 'Startseite',
    'nav.garden': 'Garten',
    'nav.outdoor.storage': 'Außenlagerung',
    'nav.garden.benches': 'Gartenbänke',
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
    'product.name.keter.eden.bench': 'Keter Eden Bank 265L Außengarten-Möbel-Lagerbox',
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
    'homepage.view.all.products': 'Alle Produkte anzeigen',
    
    // About this item content - Swiss German
    'product.about.keter.storage.shed.1': 'Ideale Außenlagerlösung für Gartengeräte und -ausrüstung, BBQ und Zubehör sowie x2 120L Mülltonnen.',
    'product.about.keter.storage.shed.2': 'Elegante Holzeffekt-Paneele, die sich von oben oder vorne öffnen und mit einer abschließbaren Funktion für sicheren Verschluss.',
    'product.about.keter.storage.shed.3': 'Hochwertiger Boden mit eingebauter Stütze für Regale und 880 L Kapazität. Regale sind nicht im Lieferumfang enthalten.',
    'product.about.keter.storage.shed.4': 'Montierte Abmessungen: 132 x 71,5 x 113,5 cm (L x B x H); Innenabmessungen: 122 x 61 x 108,8 cm (L x B x H).',
    'product.about.keter.storage.shed.5': 'Wetterbeständig, wartungsfrei, einfach zu reinigen, verblassungsfreie Konstruktion.',
    'product.about.keter.storage.shed.6': 'Eingebaute Lüftungsöffnungen für ausreichende Luftzirkulation.',
    'product.about.keter.storage.shed.7': 'Zwei Türen vorne und ein Deckel mit einzigartigem Verriegelungssystem.',
    'product.about.keter.storage.shed.8': 'Kann Türen und Deckel zusammen oder nur Türen für kindersicheren Zugang von oben verriegeln (Vorhängeschloss nicht im Lieferumfang enthalten).',
    'product.about.keter.storage.shed.9': 'Montagezeit: etwa 20-40 Minuten, empfohlen für 1 Person.',
    
    // Product detail values - Swiss German
    'product.color.light.grey.dark.cover': 'Hellgrau mit dunkelgrauem Deckel',
    'product.material.resin': 'Kunstharz',
    'product.dimensions.71.5x132x113.5': '71,5D x 132B x 113,5H Zentimeter',
    'product.weight.21.5kg': '21,5 Kilogramm',
    'product.volume.880l': '880 Liter',
    'product.uv.resistant': 'UV-beständig',
    'product.special.features.heavy.duty': 'Hochwertig, Wasserdicht, Wasserdicht',
    'product.usage.outdoor.storage': 'Außenlagerung, Innenlagerung, Gartenlagerung',
    'product.assembly.time.20.40.minutes': '20-40 Minuten',
    'product.assembly.recommended.1.person': '1 Person',
    
    // Technical detail values - Swiss German
    'product.size.132x71.5x113.5.cm': '132 x 71,5 x 113,5 cm',
    'product.style.single': 'Einzeln',
    'product.style.name': 'Stilname:',
    'product.material.name': 'Materialname:',
    'product.pattern.name': 'Muster-Name:',
    'product.finish.name': 'Finish-Name:',
    'product.pattern.single': 'Einzeln',
    'product.pattern.wood.effect': 'Holzeffekt',
    'product.shape.horizontal': 'Horizontal',
    'product.shape.rectangular': 'Rechteckig',
    'product.batteries.no': 'Nein',
    'product.date.first.available.march.2021': '1. März 2021',
    'product.date.first.available.january.2011': '1. Jan. 2021',
    
    // Review titles and content - Swiss German
    'product.review.title.space.saving': 'Ihre platzsparende Lagerlösung!',
    'product.review.title.fab': 'Fantastisch',
    'product.review.title.great.product': 'Gutes Produkt, einfach zu montieren, ordentlich und saubere Lagerung für Gartensachen',
    'product.review.title.waterproof.spacious': 'Wasserdicht, geräumig und einfach zu bauen',
    'product.review.title.bin.storage': 'Mülltonnenlagerung',
    
    'product.review.content.space.saving': 'Das Keter 249317 Store it Out Nova Außengartenlagerhaus ist die perfekte Lagerlösung für Ihren Außenbereich. Mit seiner kompakten Größe und cleveren Gestaltung bietet dieses Lagerhaus reichlich Platz, um Ihre Gartengeräte, Ausrüstung und andere Besitztümer organisiert und vor den Elementen geschützt zu halten. Platzsparendes Design: Das herausragende Merkmal des Keter Store it Out Nova ist sein platzsparendes Design. Trotz seiner großzügigen Lagerkapazität ermöglichen die kompakten Abmessungen von 32 x 71,5 x 113,5 cm, dass es problemlos in kleine Außenbereiche passt, wie Terrassen, Balkone oder Gärten. Reichlich Lagerplatz: Lassen Sie sich nicht von der Größe täuschen; dieses Lagerhaus bietet viel Platz, um Ihre Gartenessentials und mehr zu lagern. Egal ob Gartengeräte, Kissen, Außenspielzeug oder sogar Fahrräder, Sie können sie alle ordentlich gelagert und leicht zugänglich halten. Wetterbeständig und langlebig: Der Store it Out Nova ist gebaut, um den Elementen zu widerstehen. Hergestellt aus hochwertigen, wetterbeständigen Materialien, stellt dieses Lagerhaus sicher, dass Ihre Besitztümer trocken und vor Regen, Sonne und Wind geschützt bleiben. Einfacher Zugang: Die Doppeltüren mit einem Scharnierdeckel bieten einfachen Zugang zum Inhalt des Hauses. Sie können die Türen problemlos öffnen und schließen, um Gegenstände zu holen oder zu lagern. Hellgrauer Holzeffekt-Finish: Das Haus hat einen stilvollen hellgrauen Holzeffekt-Finish, der Ihrem Außenbereich einen Hauch von Eleganz verleiht. Es fügt sich nahtlos in Ihre Gartendekoration ein und ergänzt jede Umgebung. Abschließbar für Sicherheit: Für zusätzliche Sicherheit kommt der Store it Out Nova mit einem eingebauten Verriegelungsmechanismus. Sie können die Türen sicher verriegeln, um Ihre Besitztümer sicher und geschützt zu halten. Einfache Montage: Das Lagerhaus ist für einfache Montage konzipiert, sodass Sie es schnell aufbauen und sofort verwenden können. Vielseitige Verwendung: Während es perfekt für Gartenlagerung ist, ist dieses Haus auch vielseitig in seiner Verwendung. Es kann als zusätzliche Lagerung für Ihre Terrasse, Poolseite oder sogar in einer Garage oder einem Versorgungsbereich verwendet werden. Zusammenfassend ist das Keter 249317 Store it Out Nova Außengartenlagerhaus eine intelligente und praktische Lösung, um Ihren Außenbereich organisiert und aufgeräumt zu halten. Mit seinem platzsparenden Design, reichlich Lagerplatz, wetterbeständiger Konstruktion und einfachem Zugang erfüllt dieses Haus alle Anforderungen für effiziente Außenlagerung. Aktualisieren Sie Ihre Außenorganisation mit dem Keter Store it Out Nova und genießen Sie einen ordentlichen und gepflegten Gartenbereich.',
    'product.review.content.fab': 'Fantastisches Produkt, einfach zu montieren, ordentlich und saubere Lagerung für Gartensachen. Das einzige Problem ist, dass es keinen einfachen Deckelhalter hat, also müssen Sie den Deckel mit der einen Hand hochhalten. Also werde ich einen machen, um den Deckel nach Bedarf hochzuhalten.',
    'product.review.content.great.product': 'Gutes Produkt, einfach zu montieren, ordentlich und saubere Lagerung für Gartensachen. Die einzige Kritik ist, dass es keinen einfachen Deckelhalter hat, also müssen Sie den Deckel mit der einen Hand hochhalten. Also werde ich einen machen, um den Deckel nach Bedarf hochzuhalten.',
    'product.review.content.waterproof.spacious': 'Das kam schnell an. Dauerte 30 Minuten zu konstruieren. Sehr einfach zu machen. Ideal, ein zweites Paar Hände zu haben, um die Stücke an Ort und Stelle zu halten, während Sie Schrauben einsetzen. Wasserdicht, geräumig und robust. Schön.',
    'product.review.content.bin.storage': 'Sehr leicht und ehrlich gesagt ein bisschen zerbrechlich. Wir haben es im Boden verankert, um Bewegung zu verhindern. Es passt nicht alle Recyclingbehälter wegen der Höhe, es passt nur die schwarzen. Macht den Job, hässliche Behälter zu verstecken.',
    
    // Missing translation keys for Swiss German
    'product.name.keter.storage.shed': 'Keter Store it Out Nova Außengartenlagerhaus',
    'nav.storage': 'Lagerung',
    'product.delivery.free': 'KOSTENLOSE Lieferung',
    'product.delivery.free.date': 'KOSTENLOSE Lieferung {date}',
    'product.delivery.free.august.17': 'KOSTENLOSE Lieferung 17. August',
    'product.delivery.free.august.17.short': '17. August',
    'reviews.customer.review': 'Kundenbewertung',
    'reviews.customer.review.plural': 'Kundenbewertungen',
    'reviews.review.button': 'Bewertung schreiben',
    'reviews.review.button.short': 'Bewertung',
    'product.info.category': 'Kategorie',
    'product.info.brand': 'Marke',
    'product.info.material': 'Material',
    'product.info.capacity': 'Kapazität',
    'product.detail.brand': 'Marke',
    'product.detail.colour': 'Farbe',
    'product.detail.material': 'Material',
    'product.detail.product.dimensions': 'Produktabmessungen',
    'product.detail.item.weight': 'Artikelgewicht',
    'product.detail.volume': 'Volumen',
    'product.detail.uv.protection': 'UV-Schutz',
    'product.detail.special.features': 'Besondere Merkmale',
    'product.detail.usage': 'Verwendung',
    'product.detail.assembly.time': 'Montagezeit',
    'product.detail.recommended.assembly': 'Empfohlene Montage',
    'product.technical.manufacturer': 'Hersteller',
    'product.technical.part.number': 'Teilenummer',
    'product.technical.item.model.number': 'Artikelmodellnummer',
    'product.technical.size': 'Größe',
    'product.technical.style': 'Stil',
    'product.technical.pattern': 'Muster',
    'product.technical.shape': 'Form',
    'product.technical.item.package.quantity': 'Artikelpaketmenge',
    'product.technical.batteries.required': 'Batterien erforderlich',
    'product.technical.asin': 'ASIN',
    'product.technical.date.first.available': 'Datum der ersten Verfügbarkeit',
    'product.technical.details': 'Technische Details',
    'product.feature.lockable.design': 'Abschließbares Design',
    'product.feature.uv.resistant': 'UV-beständig',
    'product.feature.weatherproof.construction': 'Wetterbeständige Konstruktion',
    'product.feature.storage.capacity': 'Lagerkapazität',
    'product.feature.light.grey.dark.lid': 'Hellgrauer Deckel mit dunkler Abdeckung',
    'product.feature.resin.construction': 'Kunstharz-Konstruktion',
    'product.feature.waterproof': 'Wasserdicht',
    'product.feature.security': 'Sicherheit',
    'product.feature.built.in.shelf.support': 'Eingebaute Regalstütze',
    'product.feature.ventilated.design': 'Belüftetes Design',
    'product.feature.heavy.duty.floor': 'Hochwertiger Boden',
    'product.feature.easy.assembly': 'Einfache Montage',
    'product.feature.outdoor.storage': 'Außenlagerung'
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