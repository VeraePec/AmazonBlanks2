import React from 'react';
import ProductPage2 from '../components/ProductPage2';

const NinjaFoodiAirFryerPage: React.FC = () => {
  return (
    <ProductPage2
      // Basic Information
      productId="ninja-foodi-air-fryer"
      productName="Ninja Foodi Dual Zone Digital Air Fryer, 2 Drawers, 7.6L, 6-in-1, Uses No Oil, Air Fry, Max Crisp, Roast, Bake, Reheat, Dehydrate, Cooks 4-6 Portions, Non-Stick, Dishwasher Safe Baskets, Black AF300UK"
      productBrand="Ninja"
      productRating={4.8}
      productRatingsCount={16735}
      productBoughtInMonth="1K+"

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
        gb: '£172.00',
        dk: '1720.00 kr',
        no: '1720.00 kr',
        es: '€172.00',
        ch: 'CHF 187.00',
        za: 'R3440',
        default: '£172.00'
      }}
      productDiscount="94%"

      // Product Images
      productImages={[
        'https://m.media-amazon.com/images/I/71lLLGyzpBL._AC_SL1500_.jpg',
        'https://m.media-amazon.com/images/I/61QrifOv3UL._AC_SL1400_.jpg',
        'https://m.media-amazon.com/images/I/61oIbqz4byL._AC_SL1400_.jpg',
        'https://m.media-amazon.com/images/I/71y7mzbZBAL._AC_SL1400_.jpg',
        'https://m.media-amazon.com/images/I/71ZW5KQNMPL._AC_SL1400_.jpg',
        'https://m.media-amazon.com/images/I/71mFwo3r-lL._AC_SL1400_.jpg',
        'https://m.media-amazon.com/images/I/71c7YHgYa6L._AC_SL1400_.jpg',
        'https://m.media-amazon.com/images/I/71uxvMMjdzL._AC_SL1400_.jpg',
        'https://m.media-amazon.com/images/I/61lhlYPkouL._AC_SL1400_.jpg'
      ]}

      // Breadcrumb
      productBreadcrumb={['Home', 'Home & Kitchen', 'Kitchen & Dining', 'Small Kitchen Appliances', 'Air Fryers']}

      // Features
      productFeatures={[
        '7.6L total capacity with 2 independent cooking zones',
        '6 cooking functions: Air Fry, Max Crisp, Roast, Bake, Reheat, Dehydrate',
        'Saves up to 75% on energy bills compared to conventional ovens',
        'Cook 2 foods, 2 ways, both ready at the same time',
        'Each drawer fits up to 1kg of fries or a 1.6kg chicken',
        'Cook up to 75% faster than fan ovens',
        'Up to 75% less fat using Air Fry function',
        'Non-stick, dishwasher-safe baskets and crisper plates',
        '2400W power with UK plug',
        '2-year guarantee upon registration'
      ]}

      // About This Item
      productAboutThisItem={[
        'ENERGY-SAVING: Save up to 75% on your energy bill* (*testing and calculations based on recommended cook time for sausages, using air fry function versus conventional ovens).',
        '2 INDEPENDENT COOKING ZONES: Cook 2 foods, 2 ways, both ready at the same time. Use different functions, times and temps in each drawer to create complete meals in one appliance, or cater to 2 tastes.',
        '6 COOKING FUNCTIONS: Max Crisp, Air Fry, Roast, Bake, Reheat, Dehydrate. Cook from frozen to crispy. Up to 75% less fat* using the Air Fry function (*Tested against deep fried, hand-cut French fries).',
        'LARGE CAPACITY: Cook 4-6 portions. Each drawer fits up to 1kg of fries or a 1.6kg chicken. Cook up to 75% faster than fan ovens* (*Tested against fish fingers and sausages, including preheat).',
        'INCLUDES: Ninja Air Fryer (UK Plug), 2x Non-stick, dishwasher-safe 3.8L Drawers (7.6L total capacity) & Crisper Plates. Chef-Created Recipe Guide. Weight: 8.2kg. Colour: Black.'
      ]}

      // Product Details
      productDetails={{
        color: 'Black/Silver',
        material: 'Aluminium, Plastic',
        dimensions: '26.5D x 38W x 31.5H centimetres',
        weight: '9.89 Kilograms',
        size: '9.5L',
        brand: 'Ninja',
        style: '6-in-1 Dual Drawer',
        assembly: 'No',
        shape: 'Rectangular'
      }}

      // Technical Details
      productTechnicalDetails={{
        manufacturer: 'Ninja',
        partNumber: 'AF300UK',
        modelNumber: 'AF300UK',
        asin: 'B08CN3G4N9',
        dateFirstAvailable: '5 Aug. 2020',
        dimensions: '26.5 x 38 x 31.5 cm',
        weight: '9.89 kg',
        material: 'Aluminium, Plastic',
        style: '6-in-1 Dual Drawer Air Fryer',
        finish: 'Black/Silver',
        pieces: '1',
        shippingWeight: '9.89 Kilograms',
        power: '2400 watts',
        voltage: '220 Volts',
        capacity: '7.6 litres'
      }}

      // Customer Reviews
      productReviews={[
        {
          id: 'review-1',
          author: 'Ken D',
          rating: 5,
          title: 'pays for itself....',
          content: 'The best thing about this product is that it pays for itself through energy savings Since getting this Ninja my deep fat fryer is now obsolete, my grill is almost obsolete and my oven hasn\'t been used since. This product cooks great chips but one does have to learn a little first. When cooking chips it\'s critical that one folows the instructions and washes the potato starch out before air frying them otherwise they will burn. Next one needs to work out the times and temperatures for different potato varieties as cooking times do vary between the different types. Once one has a good idea of the cooking times and temperatures chips are quickly produced in the air fryer. Although the air fryer works well there are the other options available; Roast, Bake, Dehydrate, Max Crisp and reheat. As the saying goes, "practice makes perfect" and it certainly applies to this Ninja. One has fun messing with this product as one tries to find the best and most successful way to cook food. Roasting duck breasts is a typical example. I have cooked them with the Roast option but I have found that they cook best by giving them 8 minutes on Roast followed by six minutes on Max crisp to get the skin well cooked and crispy. As my images show, this "compact cooker" roasts some great chicken quarters. The same applies with the chicken as it does the duck, partially roast the chicken and finish off using the max crisp setting which operates at 240c and that is 10c higher than domestic ovens so it cooks and crisps skin perfectly and quickly. I have used this Ninja for toasting garlic bread slices and it does it much quicker and much better than my Solarplus grill does so that is something exceptional. As this Ninja has much smaller cavities than a domestic oven it can rapidly heat up, that is how it works. When cooking there is no need to preheat the Ninja as the cavities reach their temperatures in a matter of a small few seconds and that is where the energy savings come into play. By not having to pay to preheat a large cavity domestic oven ones uses much less energy thus one isn\'t paying the 30p+ per kWh for an element that requires a 3.6+kWh input. If one has a cheap cooker then it\'s cheap for a reason... it needs more energy thus it would probably use a good kWh just to preheat the oven so one can easily be paying 40p to 50p just to warm the oven up. A more expensive cooker, like mine, can have triple glazing in the oven doors thus they are much more enrgy efficient and save money when comared to cheaper cookers. As the Ninja only has to heat up a small space the food is cooking almost immediately and it does cook evenly. I did mention duck, chicken and garlic bread but what about roasting coffee beans? I did think about it and after doing a little reading online I tried it. I don\'t advise using this Ninja for roasting coff beans as it does become "expensive". Many people claim that one can get a "dark roast" in six to eight minutes, with others claiming it takes around 15 minutes. Well, I don\'t believe any of them have actually tried it as even after a good 1/2 hour the beans were only light roasted. To get a dark roast will tale close to one hour at the highest temperature so that becomes costly for a small amount of coffe bean. One can invest in a domestic coffee bean roaster but personally I do prefer to do it the traditional way, which is much more cost effective. One simply puts the beans into a pan (frying pans are good for this) or a traditional roasting pan that imported. Next, one simply heats the pan on a high heat hob or gas burner for a few minutes. Whilst the beans are roasting one simply stirs them around from time to time. A light roast, like what the Ninja produced, can be obtianed in only two to three minutes with a dark raost taking around five mionutes. What the Ninja produced in 1/2 hour would have taken me around 10 minutes and I would have got two small batches of dark roast for my espressos. So, this Ninja is excellent for cooking almost anything but there will be the exception such as my fresh green bean coffee.It is so easy to keep clean so that is a very good bonus One thing I did note from some negative reviews is that some reviewers gave negative ratings and claimed the product is fauly because "lots of steam" was coming out. Well, I can honestly say that is not the case. The problem is not with the Ninja but is with the user. During my second use of this I seen some steam coming out and instantly worked it out that the pan hadn\'t been insertred correctly. When using the Ninja it is important to insert the pans flush so that they are firmply sealed with the machione otherwise steam will escape thus cooking will be uneven and will take longer. As soon as I seen the steam I simply pulled pan number one out a bit and reinserted it thus no more steam. Another issue with those that cook with incorrectly positioned pans is that apart fromcosting more to cook the food and not cooking the food well... it will dry the food.The steam from the cooking food is part of the cooking process and helps keep the food moist but losing the water will mean the food, especially meats, will go dry. Overall I am impressed with my Ninja and I should have bought one much sooner than I did as it is saving me money, it is saving me a lot of time and most importantly it produces some excellently cooked food. One day I will risk it and try to make some jam in it and maybe even dehydrate some fruits. If successful thenit will mean my dehydrater will become obsolete aling with my deep fat fryer. I am recommending this product as it is made to a high quality standard, it works very well and with the energy and cost savings this is very good value.',
          date: '7 September 2023',
          verified: true,
          helpful: 1138,
          images: ['https://m.media-amazon.com/images/I/61+0wQHxjmL.jpg']
        },
        {
          id: 'review-2',
          author: 'Merv',
          rating: 5,
          title: 'Saw the show, bought the product',
          content: 'We\'ve been putting off buying an air fryer for quite a while, not being sure if we wanted or needed one. After watching the Ch4 show with Denise Van Outen we decided to take the plunge. We\'ve had it for 3 weeks now & it was an excellent purchase. It\'s a nice fit on our kitchen worktop, the mains lead isn\'t very long though, so take that into consideration. We decided to try something easy for our first attempt at cooking a meal & went for chicken dippers & fries, both cooked on the Max Crisp option. It was a success & tasted very nice. It was a bit of guesswork at first with further meals, mainly on the time settings. For the temperature we have kept to what the guideline is on the packet of food we are cooking. For the timing, we have used a method mentioned online, & that is to knock 25% of the guideline on the packet, & this has worked well. So, if it says to cook for 20 minutes in an oven on the packet, then cook for 15 minutes instead. When using Max Crisp though, the temperature is set at 240 degrees. The Max Crisp option doesn\'t seem to be for too many food items, so most of our cooking has been done with the Air Fry option which works very well. The only other option we\'ve tried is Roast & that was for carrots which also turned out fine. We haven\'t tried Dehydrate, Defrost, or Bake, so can\'t comment on those options. The option to sync the cooking times if using both cooking trays is brilliant. At the moment, some companies are putting cooking times for air fryers on their packets, which is handy, but there\'s a long way to go yet before they all do. I did read that Iceland is rolling out an air fryer aisle for their branches. What we\'re doing until everyone is on board is to keep a notebook going with details of how we have cooked a meal. So, for example, we have written " crinkle cut chips, 12 minutes, Max Crisp or cod in breadcrumbs, 200 degrees, 15 minutes, Air Fry or steak pie, 190 degrees, 22 minutes, Air Fry ". Suffice it to say, once you have the hang of the air fryer it is very easy to use. I should point out that there are two of us using it, I\'m not sure how it would be for a large family who all eat at the same time due to the amount of space in the cooking trays. Speaking of which, when it comes to cleaning the cooking trays & the shelves that come with them, again, it\'s very easy. There has been talk of needing silicon insert trays or using baking paper but it is so easy & quick to wash the cooking trays & shelves that it isn\'t really necessary for those items. I would recommend buying silicon tongs though for turning food & taking the food out when cooked. To summarise, it\'s a great product, cooks food really well & does it faster than an oven which should help with electricity bills & it\'s easy to clean. If you\'ve been thinking of buying one we can definitely recommend it.',
          date: '18 July 2023',
          verified: true,
          helpful: 95,
          images: ['https://m.media-amazon.com/images/I/71pWZ7pEzPL.jpg']
        },
        {
          id: 'review-3',
          author: 'Sarah Johnson',
          rating: 5,
          title: 'Absolutely love this air fryer!',
          content: 'This Ninja air fryer has completely transformed my cooking! The dual zones are amazing - I can cook chicken and vegetables at the same time with different settings. Everything comes out perfectly crispy without any oil. The energy savings are incredible and it cooks so much faster than my oven. Assembly was straightforward and the dishwasher-safe baskets make cleanup a breeze. Highly recommend this to anyone looking for a quality air fryer!',
          date: '31 May 2025',
          verified: true,
          helpful: 0,
          images: ['https://m.media-amazon.com/images/I/C1MxNIEY-dS.jpg']
        },
        {
          id: 'review-4',
          author: 'Michael Chen',
          rating: 5,
          title: 'Excellent quality and performance',
          content: 'I\'ve been using this air fryer for several months now and I\'m extremely impressed. The build quality is solid, it\'s easy to use, and the results are consistently excellent. The dual cooking zones are perfect for meal prep - I can cook proteins and sides simultaneously. The Max Crisp function gives amazing results, and the energy savings are noticeable on my electricity bill. The included recipe guide is helpful for getting started. This is definitely worth the investment!',
          date: '7 August 2024',
          verified: true,
          helpful: 0,
          images: ['https://m.media-amazon.com/images/I/71W7liEMQdL.jpg']
        },
        {
          id: 'review-5',
          author: 'Emma Thompson',
          rating: 5,
          title: 'Best kitchen investment ever!',
          content: 'I was hesitant about buying an air fryer, but this Ninja model exceeded all my expectations! The dual drawer system is brilliant - I can cook different foods with different settings at the same time. The food comes out perfectly cooked every time, and the non-stick coating makes cleanup incredibly easy. The energy efficiency is amazing - I\'ve noticed a significant reduction in my electricity usage. The 2-year warranty gives me confidence in this purchase. Absolutely love it!',
          date: '12 June 2025',
          verified: true,
          helpful: 0,
          images: ['https://m.media-amazon.com/images/I/61N-I1d1ZQL.jpg']
        }
      ]}

      // Color Options
      productColorOptions={[
        { name: 'Black/Silver', available: true }
      ]}

      // Size Options
      productSizeOptions={[
        { name: '9.5L', available: true }
      ]}

      // Variants
      productVariants={[
        {
          id: 'size-9-5l',
          type: 'size',
          name: 'Size',
          options: [
            { name: '9.5L', images: ['https://m.media-amazon.com/images/I/71lLLGyzpBL._AC_SL1500_.jpg'] }
          ]
        }
      ]}

      // Stock and Quantity
      productStockCount={15}
      productQuantityLimit={2}

      // Safety Features
      productSafetyFeatures={[
        'Auto shutoff for safety',
        'Non-stick, dishwasher-safe parts',
        '2 independent cooking zones',
        'Clear digital controls',
        'UK safety standards compliant',
        '2-year guarantee upon registration'
      ]}

      // Product Info
      productInfo={{
        category: 'Air Fryers',
        brand: 'Ninja',
        material: 'Aluminium, Plastic',
        size: '9.5L (7.6L total capacity)',
        warranty: '2-year guarantee upon registration',
        specialFeatures: '6-in-1 cooking functions, dual zone cooking'
      }}

      // Additional Product Details
      productCategory="Air Fryers"
      productMaterial="Aluminium, Plastic"
      productCapacity="7.6L total capacity"
      productWarranty="2-year guarantee upon registration"
      productRecycledContent="Energy efficient design saves up to 75% on energy bills"
      productPartNumber="AF300UK"
      productModelNumber="AF300UK"
      productASIN="B08CN3G4N9"
      productDateFirstAvailable="5 Aug. 2020"
      productDimensions="26.5D x 38W x 31.5H centimetres"
      productWeight="9.89 Kilograms"
      productVolume="7.6L capacity"
      productStyle="6-in-1 Dual Drawer Air Fryer"
      productPattern="Digital"
      productShape="Rectangular"
      productBatteriesRequired="No"
      productPackageQuantity="1"
    />
  );
};

export default NinjaFoodiAirFryerPage;
