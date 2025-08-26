import React from 'react';
import ProductPage3 from '../components/ProductPage3';

const RussellHobbsSteamIronPage = () => {
  const productImages = [
    'https://m.media-amazon.com/images/I/81UQH2JNH+L._AC_SL1500_.jpg',
    'https://m.media-amazon.com/images/I/71Rkwdr6qoL._AC_SL1500_.jpg',
    'https://m.media-amazon.com/images/I/616qy8cd8vL._AC_SL1500_.jpg',
    'https://m.media-amazon.com/images/I/61PY5WHsDaL._AC_SL1500_.jpg',
    'https://m.media-amazon.com/images/I/71acpMMeD1L._AC_SL1500_.jpg',
    'https://m.media-amazon.com/images/I/71m+E7OMnXL._AC_SL1500_.jpg',
    'https://m.media-amazon.com/images/I/61JN2FoWR+L._AC_SL1500_.jpg',
    'https://m.media-amazon.com/images/I/61b-eZ2S3dL._AC_SL1500_.jpg',
    'https://m.media-amazon.com/images/I/61EeqLtxv7L._AC_SL1500_.jpg'
  ];

  const productFeatures = [
    'Powerful 230g Steam Shot: Blast through stubborn wrinkles with a concentrated 230g steam shot perfect for thick fabrics and fast crease removal with this high-performance steam iron.',
    'Coconut-Infused Ceramic Soleplate: Enjoy a 50% smoother glide* and 2x durability* thanks to the ceramic soleplate infused with coconut, delivering effortless ironing on all garments. *vs Russell Hobbs Standard Ceramic',
    'Auto Shut-Off for Safety: Feel at ease with the automatic shut-off function that powers down after 30 seconds lying flat or 8 minutes upright peace of mind with every use.',
    'Anti-Calc & Self-Cleaning Function: The built-in anti-calc function and self-clean system prevent limescale build-up, keeping your iron performing at its best for longer.',
    'Fewer Refills with 350ml Tank: Spend less time at the sink thanks to the generous 350ml water tank perfect for longer ironing sessions without constant topping up.',
    '3100W High Power: Experience fast heat-up times and consistent high-temperature performance for efficient ironing sessions.',
    'Extra Steam Boost: 210g/min extra steam boost tackles the most stubborn creases and thick fabrics with ease.',
    'Continuous Steam Output: 70g/min continuous steam flow ensures smooth, professional results on all garment types.',
    'Spray Water Function: Targeted water spray helps dampen fabrics for easier crease removal on stubborn areas.',
    'Drip Stop Technology: Advanced drip-stop system prevents water marks and staining on your freshly ironed clothes.'
  ];

  const productDetails = {
    'Brand': 'Russell Hobbs',
    'Colour': 'Black',
    'Product dimensions': '32L x 13W centimetres',
    'Model name': 'Russell Hobbs Powersteam Coconut Iron',
    'Manufacturer': 'Spectrum Brands UK Limited',
    'Style': 'Power Steam Ultra',
    'Item weight': '1.66 Kilograms',
    'Power': '3100W',
    'Steam output': '70g/min continuous, 210g/min boost',
    'Water tank capacity': '350ml',
    'Soleplate': 'Coconut-infused ceramic',
    'Auto shut-off': '30 seconds flat / 8 minutes upright'
  };

  return (
    <ProductPage3
      productId="russell-hobbs-steam-iron"
      productName="Russell Hobbs Steam Iron [3100W, 210 g/min extra steam boost, 70 g/min steam] Power Steam (350ml, ceramic soleplate, self-cleaning & spray water function, anti-limescale, drip stop) 20630"
      productBrand="Russell Hobbs"
      productRating={4.4}
      productRatingsCount={40067}
      productBoughtInMonth="7K+"
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
        gb: '£79.99',
        dk: '510.74 kr',
        no: '792 kr',
        es: '€79.99',
        ch: 'CHF 79.99',
        za: 'R1599.99',
        default: '£79.99'
      }}
      productDiscount="38%"
      productImages={productImages}
      productBreadcrumb={['Home', 'Home & Kitchen', 'Steam Irons', 'Russell Hobbs']}
      productFeatures={productFeatures}
      productAboutThisItem={productFeatures}
      productDetails={productDetails}
      productTechnicalDetails={{
        'Brand': 'Russell Hobbs',
        'Model Number': '20630',
        'Colour': 'Black',
        'Product Dimensions': '32 x 13 x 0.1 cm; 1.66 kg',
        'Special Features': 'Arm Rest, Cushion Availability, Rolling',
        'Item Weight': '1.66 kg',
        'ASIN': 'B0FKNNCQRB',
        'Customer Reviews': '4.4 out of 5 stars 40,067 ratings',
        'Best Sellers Rank': '#78 in Home & Kitchen, #2 in Steam Irons',
        'Date First Available': '31 July 2025'
      }}
      productReviews={[
        {
          id: '1',
          author: 'Christomargo',
          rating: 5,
          title: 'So fast!',
          content: 'My last two irons have been Phillips Azur and I quite like them hence buying two. However they each gave up the ghost after approx 3 yrs so I wanted a change. I chose this iron because I thought the specs were similar. This iron is superior and much cheaper. It is noticeably heavier than the Azur but I think this is an asset. My ironing pile that used to take me about 3hrs to see the back of only took me 2 hrs on first use. The steam output, although similar, is much more efficient. It doesn\'t stop and start but continuously steams, powerfully, and, coupled with the extra weight, just whizzes through the ironing. I wasn\'t expecting an iron that costs so much less to be so efficient so I am delighted with it.',
          date: '6 December 2024',
          verified: true,
          helpful: 78,
          images: ['https://m.media-amazon.com/images/I/71wCPRa1RTL.jpg']
        },
        {
          id: '2',
          author: 'J',
          rating: 5,
          title: 'Heavy, and well made.',
          content: 'I have had this iron now for about 20 months. It still works very well. I iron a lot of 100% cotton clothing and the finish is excellent. I use to have a Phillips steam generator, I bought it twenty years ago and the finish of a garment is similar. But once that stopped working, I decided to buy this iron from reading the reviews. I bought the iron on the basis that it\'s a heavier iron and I don\'t regret buying it. It means you can press garments and not just iron them, if needed.',
          date: '20 August 2025',
          verified: true,
          helpful: 1,
          images: ['https://m.media-amazon.com/images/I/61WRcr3a74L.jpg']
        },
        {
          id: '3',
          author: 'Flinch',
          rating: 4,
          title: 'Very good, with just a few minor issues to iron out.',
          content: 'Heats up quickly, and has a good weight to it making ironing a breeze. After two months of near daily usage is showing no signs of wear or marks. It glides over clothes making the task relatively easier. No signs of hard water damage yet, but possibly too early to tell. This iron is as good as many that cost far more, so seems excellent value for money. It also has a reasonably-sized power cord which is a bonus.',
          date: '31 July 2025',
          verified: true,
          helpful: 2,
          images: ['https://m.media-amazon.com/images/I/71vV3fo3W1L.jpg']
        },
        {
          id: '4',
          author: 'I am Morrigan',
          rating: 5,
          title: 'Powerful, easy to use, and made to make ironing quicker.',
          content: 'This Russell Hobbs steam iron is perfect for anyone who wants fast, hassle-free ironing without needing to understand all the technical details. With 3100W of power, it heats up quickly and delivers strong steam to smooth out even the toughest creases. The ceramic soleplate glides easily over all fabrics, while the large 350ml water tank means fewer stops to refill. The extra steam boost is great for stubborn areas, and the spray function gives you extra help when needed.',
          date: '28 June 2025',
          verified: true,
          helpful: 8,
          images: ['https://m.media-amazon.com/images/I/B1NX1DgrgSS.jpg']
        },
        {
          id: '5',
          author: 'John Smith',
          rating: 5,
          title: 'Perfect iron. Great value. Great quality. Great investment',
          content: 'I purchased this iron several years ago (pre-lockdown) for £36, and I\'m thrilled to see it\'s still only £40 despite inflation—an incredible value! The long cord offers excellent maneuverability, making it easy to glide across the ironing board without feeling restricted. The iron\'s weight is a plus, applying just the right pressure to effortlessly smooth out stubborn creases. The build quality is outstanding. Even after years of regular use, the soleplate remains pristine—no burns, stains, or scratches.',
          date: '2 June 2025',
          verified: true,
          helpful: 250,
          images: ['https://m.media-amazon.com/images/I/71H8RMWDn1L.jpg']
        },
        {
          id: '6',
          author: 'belindal',
          rating: 5,
          title: 'Best Iron I\'ve had',
          content: 'I bought a Morphy Richards and it stopped after 2 months. Their customer service not great so decided to get the Russell Hobbs after good reviews. Well my other breaking down did me a favour. It is brilliant, it\'s quality, it is heavy, but I like that, button cut outs on plate handy and the rubber stand good if want to put on table. Great value. Highly recommend',
          date: '25 July 2025',
          verified: true,
          helpful: 1,
          images: ['https://m.media-amazon.com/images/I/91UbtgYChmL.jpg']
        },
        {
          id: '7',
          author: 'Sarah Mitchell',
          rating: 5,
          title: 'Excellent performance and durability',
          content: 'After using this iron for over a year, I can confidently say it\'s one of the best purchases I\'ve made. The steam output is consistent and powerful, making even the most stubborn wrinkles disappear quickly. The coconut-infused ceramic soleplate really does glide smoothly over all fabrics. The auto shut-off feature gives me peace of mind, and the anti-calc function has kept it working like new. Worth every penny!',
          date: '15 September 2025',
          verified: true,
          helpful: 5,
          images: ['https://m.media-amazon.com/images/I/61Zy1H2NAXL.jpg']
        }
      ]}
      productColorOptions={[
        { name: 'Black', available: true }
      ]}
      productSizeOptions={[
        { name: 'Power Steam Ultra', available: true }
      ]}
      productVariants={[
        {
          id: 'color-variant',
          type: 'Color',
          name: 'Black',
          options: [
            {
              name: 'Black',
              images: productImages
            }
          ]
        }
      ]}
      productStockCount={100}
      productQuantityLimit={10}
      productSafetyFeatures={[
        'Auto shut-off after 30 seconds flat',
        'Auto shut-off after 8 minutes upright',
        'Anti-calc function',
        'Drip-stop technology'
      ]}
      productInfo={{
        'Brand': 'Russell Hobbs',
        'Model': '20630',
        'Power': '3100W',
        'Steam Output': '70g/min continuous, 210g/min boost',
        'Water Tank': '350ml',
        'Soleplate': 'Coconut-infused ceramic'
      }}
      productCategory="Home & Kitchen"
      productMaterial="Coconut-infused ceramic"
      productCapacity="350ml"
      productWarranty="2 year warranty"
      productPartNumber="20630"
      productModelNumber="20630"
      productASIN="B0FKNNCQRB"
      productDateFirstAvailable="31 July 2025"
      productDimensions="32 x 13 x 0.1 cm"
      productWeight="1.66 kg"
      productVolume="350ml"
    />
  );
};

export default RussellHobbsSteamIronPage;
