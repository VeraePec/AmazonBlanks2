import React from 'react';
import ProductPage2 from '../components/ProductPage2';

const PawzRoadCatTreePage: React.FC = () => {
  return (
    <ProductPage2
      // Basic Information
      productId="pawz-road-cat-tree"
      productName="PAWZ Road 116cm Cat Tree Medium Cat Tower with 4 Sisal Scratching Posts, Metal Frame Large Hammock and Cozy Condo, Activity Center Stable and Sturdy, Size M Beige"
      productBrand="PAWZ Road"
      productRating={4.6}
      productRatingsCount={1533}
      productBoughtInMonth="50+"

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
        gb: '£45.99',
        dk: '459.90 kr',
        no: '459.90 kr',
        es: '€45.99',
        ch: 'CHF 49.00',
        za: 'R920',
        default: '£45.99'
      }}
      productDiscount="78%"

      // Product Images
      productImages={[
        'https://m.media-amazon.com/images/I/61gNjG8MjmL._AC_SL1500_.jpg',
        'https://m.media-amazon.com/images/I/71Ae1toSqGL._AC_SL1500_.jpg',
        'https://m.media-amazon.com/images/I/711Khe2+51L._AC_SL1500_.jpg',
        'https://m.media-amazon.com/images/I/71TRP3PS-7L._AC_SL1500_.jpg',
        'https://m.media-amazon.com/images/I/61zovUWIVtL._AC_SL1500_.jpg',
        'https://m.media-amazon.com/images/I/61j-rrpxIML._AC_SL1500_.jpg',
        'https://m.media-amazon.com/images/I/71J-JNFIdUL._AC_SL1500_.jpg',
        'https://m.media-amazon.com/images/I/81MwuIg5T5L._AC_SL1500_.jpg'
      ]}

      // Breadcrumb
      productBreadcrumb={['Home', 'Pet Supplies', 'Cat Supplies', 'Cat Trees & Towers', 'Cat Trees']}

      // Features
      productFeatures={[
        '116cm height for medium cats',
        '4 natural sisal scratching posts',
        'Large hammock (45x40cm)',
        'Cozy plush condo',
        'Top perch with raised rim',
        'Metal frame construction',
        'Stable and sturdy base',
        'Easy assembly',
        'CARB-certified materials',
        'Suitable for heavy cats'
      ]}

      // About This Item
      productAboutThisItem={[
        'Ultimate Activity House: Equipped with a roomy condo, spacious hammock, cozy plush top perch, natural sisal covered scratching posts and fluffy dangling ball, this 116cm cat tree is an ideal place for entertaining as well as taking a good rest.',
        'Comfy Rest Sports for Heavy Cats: Featuring a super large hammock with length of 45*40cm, fixed in each corner points, it\'s strong enough to support your fatty fuzzy baby.',
        'Exercise & Nail Health Taken Care: 4 natural sisal covered posts allows them to release emotions and have daily claw exercises without damaging your delicate furniture.',
        'Reliable Quality: Stability and safety are always the key points. Crafted by soft plush fabric, CARB-certified natural particle boards, firm sisal wrapped posts and strengthened base.',
        'Easy Installation: Illustrated assemble manual included, also you could look up video on YouTube for easier installation. No need extra tools with the contained hardware pack.'
      ]}

      // Product Details
      productDetails={{
        color: 'Beige',
        material: 'Engineered Wood',
        dimensions: '45L x 41W x 116H centimetres',
        weight: '9.06 Kilograms',
        size: 'M-116cm',
        breedRecommendation: 'Large Breeds, Small Breeds',
        specificUses: 'Indoor',
        careInstructions: 'Top hanger can be machine washed and dried'
      }}

      // Technical Details
      productTechnicalDetails={{
        manufacturer: 'PAWZ Road',
        partNumber: 'AY401-AMT0110BG-M',
        modelNumber: 'AY401-AMT0110BG-M',
        asin: 'B0CDKQ252C',
        dateFirstAvailable: '3 Aug. 2023',
        dimensions: '45 x 41 x 116 cm',
        weight: '9.06 kg',
        material: 'Engineered Wood',
        style: 'Medium Cat Tower',
        finish: 'Beige',
        pieces: '1',
        shippingWeight: '9.06 Kilograms'
      }}

      // Customer Reviews
      productReviews={[
        {
          id: 'review-1',
          author: 'SOOZY',
          rating: 5,
          title: 'Gets my cats approval',
          content: 'Nice sturdy cat tree which was bought to replace one that eventually became wobbly with age. The old one was mainly used by only one of my four cats who claimed it even before I finished putting it together and she would let the other three know they weren\'t welcome when she was on it. So I made sure to assemble this one with her out of the room so the others could try it out first and it worked because she is happy to share it with the others. Just a little tip for anyone who has a similar problem. Plenty of room for four cats with several places to nap or just watch the comings and goings of the household. It easily holds the combined weight of 20kgs of all four cats without wobbling when they climb or jump on and off. I am useless at putting flat pack things together but I found assembling this cat tree easy and it came with clear instructions. The cats love using the tree and there\'s usually at least one of them on it at any time day and night and I love it because it\'s nice looking at a bargain price. A good buy.',
          date: '15 November 2023',
          verified: true,
          helpful: 30,
          images: ['https://m.media-amazon.com/images/I/71of5FIMv5L.jpg']
        },
        {
          id: 'review-2',
          author: 'Sophie Wolf',
          rating: 5,
          title: 'Looks lovely, cats happy',
          content: 'As usual the numbers/letter were incorrect on the items. We just took a screenshot of the product on Amazon\'s site to provide a proper idea of what goes where. Once that was sorted it was fairly easy to put together. All the necessary screws are provided plus an allen key. Both cats have already been on it and seem to like it, although the best bit for them was noisily rolling around on the plastic bag (supervised ofc). The tree appears to be stable even with a cat or two jumping on and off it. The teddy bear fleece covering all the structures of the tree are lovely and soft, the colours are as pictured, however, other than the cactus and the border around the top level, the fleece is rather thin. This however doesn\'t detract from how nice it looks.',
          date: '7 May 2025',
          verified: true,
          helpful: 3,
          images: ['https://m.media-amazon.com/images/I/71JOZ01epQL.jpg']
        },
        {
          id: 'review-3',
          author: 'Phoebe',
          rating: 5,
          title: 'Perfect for larger cats!',
          content: 'Our very large snowshoe cat always struggles to squeeze herself onto most cat trees + they wobble under her weight. This tree is very sturdy, no wobbling at all and she fits perfectly on every level. She immediately went to sleep on the highest section. This is the third cat tree we\'ve tried and by far the best! Worth every penny. We now have a very happy cat. Was very easy to put together.',
          date: '28 January 2025',
          verified: true,
          helpful: 6,
          images: ['https://m.media-amazon.com/images/I/61SjHx9PM5L.jpg']
        },
        {
          id: 'review-4',
          author: 'charlotte',
          rating: 5,
          title: 'Lovely lil purchase',
          content: 'Seems pretty decent quality for the price. Nice and sturdy. Cats love it (for reference my cats are huge, easily 5-8kg😂)',
          date: '10 July 2025',
          verified: true,
          helpful: 2,
          images: ['https://m.media-amazon.com/images/I/71KbZ71OeJL.jpg']
        },
        {
          id: 'review-5',
          author: 'Emma',
          rating: 4,
          title: 'My cat likes it but I think the design & build could be more cat friendly',
          content: 'Overall it\'s a pretty good product, was easy to put together and seems sturdy once built. My cat took to it very quickly and spends lots of time snoozing in the top bed. She even uses the sisal wrapped posts for her claws. But she has never used the little \'den\' compartment and has only recently used the bottom \'hammock\' part. My main gripe is that there is not much \'foothold\' space, and she often has to do a controlled fall to get off it. It could also be better padded, for safety. When she is playing, she often loses her footing or her balance, and when trying to catch herself, has hurt herself on the sharp edges, despite them being covered in fur fabric, (which is the only thing she can grip on to stop or slow a fall). She also has fallen out of the top bed whilst having a stretch or a roll. Poor baby! But she does like it, so I\'m generally happy.',
          date: '24 August 2024',
          verified: true,
          helpful: 9,
          images: []
        }
      ]}

      // Color Options
      productColorOptions={[
        { name: 'Beige', available: true }
      ]}

      // Size Options
      productSizeOptions={[
        { name: 'M-116cm', available: true }
      ]}

      // Variants
      productVariants={[
        {
          id: 'size-medium-116cm',
          type: 'size',
          name: 'Size',
          options: [
            { name: 'M-116cm', images: ['https://m.media-amazon.com/images/I/61gNjG8MjmL._AC_SL1500_.jpg'] }
          ]
        }
      ]}

      // Stock and Quantity
      productStockCount={25}
      productQuantityLimit={3}

      // Safety Features
      productSafetyFeatures={[
        'Stable and sturdy construction',
        'Metal frame reinforcement',
        'Strengthened base',
        'CARB-certified materials',
        'Safe for heavy cats',
        'Non-toxic materials'
      ]}

      // Product Info
      productInfo={{
        category: 'Cat Trees & Towers',
        brand: 'PAWZ Road',
        material: 'Engineered Wood',
        size: 'M-116cm',
        warranty: '30 Days Return',
        specialFeatures: 'Sturdy construction for heavy cats'
      }}

      // Additional Product Details
      productCategory="Cat Trees & Towers"
      productMaterial="Engineered Wood"
      productCapacity="Medium cats up to 8kg"
      productWarranty="30 Days Return"
      productRecycledContent="CARB-certified natural particle boards"
      productPartNumber="AY401-AMT0110BG-M"
      productModelNumber="AY401-AMT0110BG-M"
      productASIN="B0CDKQ252C"
      productDateFirstAvailable="3 Aug. 2023"
      productDimensions="45L x 41W x 116H centimetres"
      productWeight="9.06 Kilograms"
      productVolume="116cm height"
      productStyle="Medium Cat Tower"
      productPattern="Single"
      productShape="Tower"
      productBatteriesRequired="No"
      productPackageQuantity="1"
    />
  );
};

export default PawzRoadCatTreePage;
