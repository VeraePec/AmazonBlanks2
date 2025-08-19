import React from 'react';
import ProductPage2 from '../components/ProductPage2';

const FeandreaCatTreePage: React.FC = () => {
  return (
    <ProductPage2
      // Basic Information
      productId="feandrea-cat-tree"
      productName="Feandrea Multi-level Large Cat Tree Cat Furniture Cat Play House Smoky Grey PCT17G"
      productBrand="Feandrea"
      productRating={4.5}
      productRatingsCount={4111}
      productBoughtInMonth=""

      // Pricing - ALWAYS £9.99 default structure
      productPrice={{
        gb: '£9.99',
        dk: '63.85 kr',
        no: '99 kr',
        es: '€32.50',
        ch: 'CHF 35.00',
        za: 'R199.99',
        default: '£9.99'
      }}
      productOriginalPrice={{
        gb: '£96.00',
        dk: '960.00 kr',
        no: '960.00 kr',
        es: '€96.00',
        ch: 'CHF 104.00',
        za: 'R1920',
        default: '£96.00'
      }}
      productDiscount="90%"

      // Product Images
      productImages={[
        'https://m.media-amazon.com/images/I/71gkKSo4CmL._AC_SL1500_.jpg',
        'https://m.media-amazon.com/images/I/81x+LPxXSzL._AC_SL1500_.jpg',
        'https://m.media-amazon.com/images/I/71Vqu-01feL._AC_SL1500_.jpg',
        'https://m.media-amazon.com/images/I/81TxABgJPIL._AC_SL1500_.jpg',
        'https://m.media-amazon.com/images/I/818F1loNL2L._AC_SL1500_.jpg',
        'https://m.media-amazon.com/images/I/71lR01sLK4L._AC_SL1500_.jpg',
        'https://m.media-amazon.com/images/I/71DIQ4rZLUL._AC_SL1500_.jpg',
        'https://m.media-amazon.com/images/I/71ObYaQ968L._AC_SL1500_.jpg',
        'https://m.media-amazon.com/images/I/819VlxKUULL._AC_SL1500_.jpg'
      ]}

      // Breadcrumb
      productBreadcrumb={['Home', 'Pet Supplies', 'Cat Supplies', 'Cat Trees & Towers', 'Cat Trees']}

      // Features
      productFeatures={[
        'Large size 100 x 90 x 165 cm',
        'Multi-level design for multiple cats',
        'Natural sisal covered scratching posts',
        'Plush cat house with cozy perches',
        'Hanging basket for lounging',
        'Anti-toppling strap included',
        'Rounded corners for safety',
        'High quality chipboard base',
        'Compressed cardboard supporting tubes',
        'Suitable for cats up to 7kg'
      ]}

      // About This Item
      productAboutThisItem={[
        'Give Your Cute Kitty A Comfy Home! - Large size of 100 x 90 x 165 cm (W x D x H); this cat tree provides enough space for almost all cats of different ages and sizes',
        'Still Sturdy & Stable Even Your Cats Are Overactive - The base is made of high quality chipboard and the anti-toppling strap included to secure the stability of the entire cat tree; rounded corners of each board prevents harm to you & your felines',
        'Scratching Posts - Natural sisal covered posts satisfy cats\' instinct for scratching and rubbing, spare your furniture from their sharp claws',
        'Relax & Lounge Comfortably - Equipped with a plush cat house, hanging basket and cozy perches, even the pickiest cat can always find itself a pleasant space',
        'Fun to Play - Multi-leveled design allows your cats to freely jump, climb and explore around their cat tower, cozy tunnel and ball with bell provide even more options for your cats to enjoy themselves'
      ]}

      // Product Details
      productDetails={{
        color: 'Smoky Grey',
        material: 'Sisal Covered',
        dimensions: '100L x 90W x 165H centimetres',
        weight: '21.8 Kilograms',
        size: 'L(60 x 60 x 165 cm)',
        breedRecommendation: 'Small Breeds',
        specificUses: 'Climbing, Scratching, Loungeing, Playing',
        careInstructions: 'Wipe clean with a damp cloth and spot clean. Store in a dry place.'
      }}

      // Technical Details
      productTechnicalDetails={{
        manufacturer: 'Feandrea',
        partNumber: 'PCT17G',
        modelNumber: 'PCT17G',
        asin: 'B076D1YFQJ',
        dateFirstAvailable: '1 Dec. 2017',
        dimensions: '100 x 90 x 165 cm',
        weight: '21.8 kg',
        material: 'Sisal Covered',
        style: 'Cat tree with cat houses',
        finish: 'Smoky Grey',
        pieces: '1',
        shippingWeight: '21.8 Kilograms'
      }}

      // Customer Reviews
      productReviews={[
        {
          id: 'review-1',
          author: 'lisa bennett',
          rating: 5,
          title: 'Very impressed',
          content: 'Had a feeling when this arrived that I would need help from a friend to assemble this, very pleasantly surprised, I managed it on my own, and I\'m under 5ft and not got the strongest of wrists and extremely bad back. Took me just over 2 hours from start to finish. The instruction booklet was very helpful - for once, not many are, but this one was. its very sturdy, and feels very plush. Only issue is one of the screws in the \'house bit\' doesnt lie totally flat, but, a little cat blanket will cover that - though in saying that, that could be the fact that I\'m not strong enough to make it totally flush with the base of that part, shall get a friend to try to tighten it down, but like I said, not a big issue, my cats love their blankies so one in there will make it extra cosy. On the whole, I am very very pleased with it. Certainly worth the money, there are some that are far more expensive and I didnt think had as many features. Whether my cats love it or not remains to be seen. Only just finished it and it needs moving to a more suitable place than the middle of my living room lol',
          date: '22 June 2020',
          verified: true,
          helpful: 0,
          images: ['https://m.media-amazon.com/images/I/71OyfAIomiL.jpg']
        },
        {
          id: 'review-2',
          author: 'Crazycatlady',
          rating: 5,
          title: 'Amazing !',
          content: 'I have never had a complaint about feandrea cat posts and still I can\'t complain... as you can see my cats absolutely love this , the only suggestion I have is to take the tube away and add another cat cave . None of my cats use it and it\'s not very sturdy. I\'m ordering another one at the end of the month then all 4 kitties have 1 feandrea post each I have 3 😁. 5 stars 🌟 fantastic value for money at £96 , took less than 35 mins to assemble as I already have them . Very sturdy I don\'t need to assemble them to the wall . Over all very happy cats I think they give it 10/10',
          date: '22 August 2022',
          verified: true,
          helpful: 0,
          images: ['https://m.media-amazon.com/images/I/71t53uniEmL.jpg']
        },
        {
          id: 'review-3',
          author: 'Jonathan King',
          rating: 5,
          title: 'Get some larger diameter metal washers, it strengthens the top tube, spreads weight, & sturdier.',
          content: 'After taking delivery of this item today, I set about assembling it. It took me 45 minutes to put together. I especially like the multi levels of this, which means that several cats can climb, play and scratch at the same time. I\'m impressed with the quality, weight and sturdiness of this item. Once I had it assembled and moved into place, 6 of our 9 cats were already checking it out with plenty of room for more. They were quite vigorous and this item showed no signs of toppling over. The attached wall strap is a good idea, but actually does not need to be used. The instructions were very clear and extremely easy to follow. With this in mind anyone could easily put it together. This is one of the more expensive Cat Activity Centres on the market, but for the money you get a well designed, sturdy and large item. One other point I would like to say is that this is very heavy. I will and would highly recommend this item and if you decide to purchase it, you and your cats will not be disappointed. Buy it and watch the fun your cats will have unfold.',
          date: '15 March 2019',
          verified: true,
          helpful: 11,
          images: ['https://m.media-amazon.com/images/I/619Adtbvn+L.jpg']
        },
        {
          id: 'review-4',
          author: 'Földi Nóra',
          rating: 5,
          title: 'Couldn\'t be happier',
          content: 'Got this during black Friday for €57, worth the price, sturdy, I have 2 cats that are over 6kg so I am concerned with the little basket, no way that will stay up for a very long time, other than that everything is perfect, easy to assemble, love the colour, my cats seem to be happy :)',
          date: '1 December 2023',
          verified: true,
          helpful: 0,
          images: ['https://m.media-amazon.com/images/I/71rhBLezFtL.jpg']
        },
        {
          id: 'review-5',
          author: 'Patrick',
          rating: 4,
          title: 'Great for smaller cats',
          content: 'It\'s really sturdy and looks nice and is fairly simple to assemble. However, our cat is a bit picky and is not really using it. He is in the top house from time to time but not for longer periods as it seems like he is too big for it. (He is 4.6kg). It might just take some time for him to get used to it, but right now, a normal moving box has 1st place',
          date: '11 April 2021',
          verified: true,
          helpful: 0,
          images: ['https://m.media-amazon.com/images/I/71J9OOrXDLL.jpg']
        },
        {
          id: 'review-6',
          author: 'somdra',
          rating: 5,
          title: 'Superb quality',
          content: 'As my cats are indoor I needed to get a big multi level one for both my two cats to replace the small little ones that I already had that were falling apart, I was amazed at the quality, it looks really good. It\'s nice and sturdy, well worth the money. Everyone has commented on how lush it looks. Both my cats keep using it. My older ginger cat loves the house to hide in as it\'s big enough for her when her little brother starts annoying her, it gives her a place to hide away from him. I\'ve seen them sleep on all levels. Since that photo was taken I\'ve moved it round the other way so they can see from outside the big window when the curtains and blinds are open during the day. *Update 3/7/19* I\'m still impressed, the cat post was leaning sideways at the top which made my cat look like the leaning tower of Coco plus another part had broken due to them jumping on them. I emailed the company and was really grateful they sent me out new replacement parts for free.',
          date: '14 June 2018',
          verified: true,
          helpful: 47,
          images: ['https://m.media-amazon.com/images/I/71hfbmFLGAL.jpg']
        }
      ]}

      // Color Options
      productColorOptions={[
        { name: 'Smoky Grey', available: true }
      ]}

      // Size Options
      productSizeOptions={[
        { name: 'L(60 x 60 x 165 cm)', available: true }
      ]}

      // Variants
      productVariants={[
        {
          id: 'size-large-165cm',
          type: 'size',
          name: 'Size',
          options: [
            { name: 'L(60 x 60 x 165 cm)', images: ['https://m.media-amazon.com/images/I/71gkKSo4CmL._AC_SL1500_.jpg'] }
          ]
        }
      ]}

      // Stock and Quantity
      productStockCount={15}
      productQuantityLimit={2}

      // Safety Features
      productSafetyFeatures={[
        'Anti-toppling strap included',
        'Rounded corners for safety',
        'High quality chipboard base',
        'Compressed cardboard supporting tubes',
        'Stable multi-level design',
        'Suitable for cats up to 7kg'
      ]}

      // Product Info
      productInfo={{
        category: 'Cat Trees & Towers',
        brand: 'Feandrea',
        material: 'Sisal Covered',
        size: 'L(60 x 60 x 165 cm)',
        warranty: '30 Days Return',
        specialFeatures: 'Multi-level design with cat houses'
      }}

      // Additional Product Details
      productCategory="Cat Trees & Towers"
      productMaterial="Sisal Covered"
      productCapacity="Cats up to 7kg"
      productWarranty="30 Days Return"
      productRecycledContent="High quality chipboard and compressed cardboard"
      productPartNumber="PCT17G"
      productModelNumber="PCT17G"
      productASIN="B076D1YFQJ"
      productDateFirstAvailable="1 Dec. 2017"
      productDimensions="100L x 90W x 165H centimetres"
      productWeight="21.8 Kilograms"
      productVolume="165cm height"
      productStyle="Multi-level Cat Tree"
      productPattern="Multi-level"
      productShape="Tower"
      productBatteriesRequired="No"
      productPackageQuantity="1"
    />
  );
};

export default FeandreaCatTreePage;
