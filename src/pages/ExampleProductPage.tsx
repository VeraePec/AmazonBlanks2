import React from 'react';
import ProductPage2 from '../components/ProductPage2';

const ExampleProductPage: React.FC = () => {
  return (
    <ProductPage2
      productId="example-product-123"
      productName="Example Product Name"
      productBrand="Example Brand"
      productRating={4.5}
      productRatingsCount={1250}
      productBoughtInMonth="200+"
      productPrice={{
        gb: '£29.99',
        dk: '350 kr',
        no: '380 kr',
        es: '€34.50',
        ch: 'CHF 37.00',
        default: '£29.99'
      }}
      productOriginalPrice={{
        gb: '£39.99',
        dk: '450 kr',
        no: '480 kr',
        es: '€44.50',
        ch: 'CHF 47.00',
        default: '£39.99'
      }}
      productDiscount="25%"
      productImages={[
        'https://example.com/image1.jpg',
        'https://example.com/image2.jpg',
        'https://example.com/image3.jpg'
      ]}
      productBreadcrumb={[
        'Home',
        'Category',
        'Subcategory',
        'Product Name'
      ]}
      productFeatures={[
        'Feature 1 description',
        'Feature 2 description',
        'Feature 3 description',
        'Feature 4 description'
      ]}
      productAboutThisItem={[
        'About this item point 1',
        'About this item point 2',
        'About this item point 3'
      ]}
      productDetails={{
        color: 'Blue',
        material: 'Plastic'
      }}
      productTechnicalDetails={{}}
      productReviews={[
        {
          id: '1',
          author: 'John Doe',
          rating: 5,
          title: 'Great product!',
          content: 'This is an excellent product that works perfectly.',
          date: '2025-01-15',
          verified: true,
          helpful: 12,
          images: ['https://example.com/review1.jpg']
        }
      ]}
      productColorOptions={[
        { name: 'Blue', available: true },
        { name: 'Red', available: false }
      ]}
      productSizeOptions={[
        { name: 'Large', available: true },
        { name: 'Medium', available: true }
      ]}
      productVariants={[
        {
          id: 'color',
          type: 'color',
          name: 'Color',
          options: [
            { name: 'Blue', images: ['https://example.com/blue.jpg'] },
            { name: 'Red', images: ['https://example.com/red.jpg'] }
          ]
        }
      ]}
      productStockCount={50}
      productQuantityLimit={5}
      productSafetyFeatures={[
        'Weather resistant',
        'Fade free',
        'All weather resistant'
      ]}
      productInfo={{
        'Category': 'Example Category',
        'Brand': 'Example Brand',
        'Material': 'Example Material',
        'Capacity': '100L',
        'Warranty': '2 years'
      }}
      productCategory="Example Category"
      productMaterial="Example Material"
      productCapacity="100L"
      productWarranty="2 years"
      productPartNumber="12345"
      productModelNumber="12345"
      productASIN="B00EXAMPLE"
      productDateFirstAvailable="January 2025"
      productDimensions="100cm x 50cm x 75cm"
      productWeight="5kg"
      productVolume="100L"
    />
  );
};

export default ExampleProductPage;