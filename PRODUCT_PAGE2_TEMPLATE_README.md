# 🎯 ProductPage2 Template - Complete Guide

## Overview
`ProductPage2` is a comprehensive, reusable template for creating product pages with full internationalization, Facebook ad integration, and error handling. This template is based on the successful Keter Eden Bench structure and should be used for ALL future products.

## ✨ Features
- ✅ **Full Internationalization** - Supports GB, DK, NO, ES, CH with proper translations
- ✅ **Dynamic Pricing** - Country-specific pricing with proper currency formatting
- ✅ **Facebook Ad Integration** - Automatically generates ad copies when page loads
- ✅ **Error Handling** - Built-in error boundaries and recovery
- ✅ **Responsive Design** - Works on all devices
- ✅ **SEO Optimized** - Proper meta tags and structure
- ✅ **Performance Optimized** - Lazy loading and efficient rendering

## 🚀 Quick Start

### 1. Import the Template
```tsx
import ProductPage2 from '../components/ProductPage2';
```

### 2. Use the Template
```tsx
const MyProductPage: React.FC = () => {
  return (
    <ProductPage2
      productId="my-product-123"
      productName="My Amazing Product"
      productBrand="My Brand"
      // ... all other props
    />
  );
};
```

## 📋 Required Props

### Basic Information
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `productId` | string | ✅ | Unique product identifier (used for Facebook ads) |
| `productName` | string | ✅ | Full product name |
| `productBrand` | string | ✅ | Brand name |
| `productRating` | number | ✅ | Product rating (1-5) |
| `productRatingsCount` | number | ✅ | Total number of ratings |
| `productBoughtInMonth` | string | ✅ | Sales indicator (e.g., "500+") |

### Pricing (Country-Specific)
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `productPrice` | object | ✅ | Price for each country |
| `productOriginalPrice` | object | ✅ | Original price for each country |
| `productDiscount` | string | ✅ | Discount percentage |

**Price Object Structure:**
```tsx
productPrice={{
  gb: '£29.99',      // United Kingdom
  dk: '350 kr',      // Denmark
  no: '380 kr',      // Norway
  es: '€34.50',      // Spain
  ch: 'CHF 37.00',   // Switzerland
  default: '£29.99'  // Fallback price
}}
```

### Content
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `productImages` | string[] | ✅ | Array of image URLs |
| `productBreadcrumb` | string[] | ✅ | Navigation breadcrumb |
| `productFeatures` | string[] | ✅ | Product features list |
| `productAboutThisItem` | string[] | ✅ | About this item points |
| `productReviews` | Review[] | ✅ | Customer reviews array |

### Technical Details
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `productPartNumber` | string | ✅ | Manufacturer part number |
| `productModelNumber` | string | ✅ | Model number |
| `productASIN` | string | ✅ | Amazon ASIN |
| `productDateFirstAvailable` | string | ✅ | First available date |
| `productDimensions` | string | ✅ | Product dimensions |
| `productWeight` | string | ✅ | Product weight |
| `productVolume` | string | ✅ | Storage volume |

### Options & Variants
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `productColorOptions` | ColorOption[] | ✅ | Available colors |
| `productSizeOptions` | SizeOption[] | ✅ | Available sizes |
| `productVariants` | Variant[] | ✅ | Product variants |

### Additional Info
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `productStockCount` | number | ✅ | Available stock |
| `productQuantityLimit` | number | ✅ | Max quantity per order |
| `productSafetyFeatures` | string[] | ✅ | Safety features list |
| `productCategory` | string | ✅ | Product category |
| `productMaterial` | string | ✅ | Product material |
| `productCapacity` | string | ✅ | Storage capacity |
| `productWarranty` | string | ✅ | Warranty information |

## 🔧 Complete Example

```tsx
import React from 'react';
import ProductPage2 from '../components/ProductPage2';

const KeterStorageShedPage: React.FC = () => {
  return (
    <ProductPage2
      // Basic Information
      productId="keter-storage-shed"
      productName="Keter Store it Out Nova Outdoor Garden Storage Shed"
      productBrand="Keter"
      productRating={4.4}
      productRatingsCount={7246}
      productBoughtInMonth="1K+"
      
      // Pricing
      productPrice={{
        gb: '£9.99',
        dk: '63.58 kr',
        no: '99 kr',
        es: '€11.50',
        ch: 'CHF 10.50',
        default: '£9.99'
      }}
      productOriginalPrice={{
        gb: '£14.99',
        dk: '95.37 kr',
        no: '148.50 kr',
        es: '€17.25',
        ch: 'CHF 15.00',
        default: '£14.99'
      }}
      productDiscount="33%"
      
      // Content
      productImages={[
        'https://m.media-amazon.com/images/I/81nkADjDAbL._AC_SL1500_.jpg',
        'https://m.media-amazon.com/images/I/910TF1aqBKL._AC_SL1500_.jpg'
      ]}
      productBreadcrumb={[
        'Home',
        'Garden',
        'Storage',
        'Keter Storage Shed'
      ]}
      productFeatures={[
        '880L storage capacity',
        'Weather-resistant construction',
        'Easy assembly'
      ]}
      productAboutThisItem={[
        'Spacious outdoor storage solution',
        'Perfect for garden tools and equipment',
        'Durable resin construction'
      ]}
      
      // Reviews
      productReviews={[
        {
          id: '1',
          author: 'John Doe',
          rating: 5,
          title: 'Excellent product!',
          content: 'Great storage solution for my garden.',
          date: '2025-01-15',
          verified: true,
          helpful: 12,
          images: ['https://example.com/review1.jpg']
        }
      ]}
      
      // Options
      productColorOptions={[
        { name: 'Grey', available: true },
        { name: 'Beige', available: true }
      ]}
      productSizeOptions={[
        { name: '132x71.5x113.5 cm', available: true }
      ]}
      productVariants={[
        {
          id: 'color',
          type: 'color',
          name: 'Color',
          options: [
            { name: 'Grey', images: ['https://example.com/grey.jpg'] },
            { name: 'Beige', images: ['https://example.com/beige.jpg'] }
          ]
        }
      ]}
      
      // Technical Details
      productStockCount={15}
      productQuantityLimit={5}
      productSafetyFeatures={[
        'Weather resistant',
        'UV resistant',
        'Lockable design'
      ]}
      productInfo={{
        'Category': 'Garden Storage',
        'Brand': 'Keter',
        'Material': 'Resin',
        'Capacity': '880L',
        'Warranty': '2 years'
      }}
      productCategory="Garden Storage"
      productMaterial="Resin"
      productCapacity="880L"
      productWarranty="2 years"
      productPartNumber="249317"
      productModelNumber="249317"
      productASIN="B08XQVQPQ5"
      productDateFirstAvailable="March 2021"
      productDimensions="132 x 71.5 x 113.5 cm"
      productWeight="21.5kg"
      productVolume="880L"
    />
  );
};

export default KeterStorageShedPage;
```

## 🌍 Translation Support

The template automatically handles translations for:
- Product details
- Technical specifications
- Safety features
- Delivery information
- Error messages

**Translation Keys Used:**
- `product.detail.*` - Product detail labels
- `product.technical.*` - Technical detail labels
- `product.safety.*` - Safety feature labels
- `product.delivery.*` - Delivery information
- `product.style.*` - Style options
- `product.pattern.*` - Pattern options
- `product.shape.*` - Shape options
- `product.batteries.*` - Battery requirements

## 📱 Facebook Ad Integration

The template automatically:
1. **Generates ad copies** when the page loads
2. **Creates country-specific** ad content
3. **Integrates with Facebook Ads page** for easy access
4. **Uses product ID** for proper linking

**Ad Copy Generation:**
- Automatically creates ads for all supported countries
- Uses the new Facebook-style prompt format
- Generates both headlines and body copy
- Includes proper pricing and product information

## 🚨 Error Handling

The template includes:
- **Error Boundaries** for React errors
- **Graceful fallbacks** for missing data
- **User-friendly error messages**
- **Recovery options** (Try Again, Go Home)

## 📁 File Structure

```
src/
├── components/
│   └── ProductPage2.tsx          # Main template
├── pages/
│   ├── ExampleProductPage.tsx     # Usage example
│   └── YourProductPage.tsx        # Your product page
└── utils/
    └── translations.ts            # Translation system
```

## 🔄 Updates & Maintenance

### Adding New Countries
1. Update the `productPrice` and `productOriginalPrice` objects
2. Add new country codes to the pricing logic
3. Update translation files if needed

### Adding New Features
1. Extend the `ProductPage2Props` interface
2. Update the template logic
3. Add new props to your product pages

## 🎯 Best Practices

1. **Always use this template** for new products
2. **Provide all required props** - don't skip any
3. **Use proper image URLs** - ensure they're accessible
4. **Test all countries** before deploying
5. **Keep product IDs unique** across the entire system
6. **Use descriptive names** for better SEO
7. **Include high-quality images** for better conversion

## 🚀 Deployment

1. **Build the project**: `npm run build`
2. **Deploy to Netlify**: `npx netlify deploy --prod --dir=dist`
3. **Test all countries** on the live site
4. **Verify Facebook ads** are generated correctly

## 📞 Support

If you encounter issues:
1. Check that all required props are provided
2. Verify image URLs are accessible
3. Check browser console for errors
4. Ensure translation keys exist
5. Test with a working product page as reference

---

**Remember: This template is the ONLY way to create new product pages. Use it for ALL future products! 🎉**
