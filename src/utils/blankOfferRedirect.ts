/**
 * Utility functions for handling blank offer redirects
 * These functions add the required parameters for third-party checkouts:
 * - sub4: product title
 * - sub5: product image
 * - adv1: Facebook pixel ID
 * - Form prefill parameters
 */

/**
 * Add blank offer parameters to any redirect URL
 * @param url - The base redirect URL
 * @param productName - The product name/title
 * @param productImage - The product image URL (optional)
 * @returns URL with all required parameters
 */
export const addBlankOfferParameters = (
  url: string,
  productName: string,
  productImage?: string
): string => {
  try {
    const finalUrl = new URL(url);
    
    // sub4 - product title
    finalUrl.searchParams.set('sub4', encodeURIComponent(productName));
    
    // sub5 - product image (if provided)
    if (productImage) {
      finalUrl.searchParams.set('sub5', encodeURIComponent(productImage));
    }
    
    // adv1 - Facebook pixel ID
    finalUrl.searchParams.set('adv1', '1289141292863424');
    
    // Prefill instructions for form fields
    finalUrl.searchParams.set('first_name', '');
    finalUrl.searchParams.set('last_name', '');
    finalUrl.searchParams.set('address', '');
    finalUrl.searchParams.set('email', '');
    finalUrl.searchParams.set('phone', '');
    finalUrl.searchParams.set('city', '');
    finalUrl.searchParams.set('zip', '');
    
    return finalUrl.toString();
  } catch (error) {
    console.error('Error adding blank offer parameters:', error);
    return url; // Return original URL if there's an error
  }
};

/**
 * Add blank offer parameters specifically for link rotators
 * Link rotators like Linkly need special handling to preserve parameters
 * @param url - The link rotator URL
 * @param productName - The product name/title
 * @param productImage - The product image URL (optional)
 * @returns URL with rotator-compatible parameters
 */
export const addRotatorCompatibleParameters = (
  url: string,
  productName: string,
  productImage?: string
): string => {
  try {
    const finalUrl = new URL(url);
    
    // For link rotators, we need to use different parameter names
    // that are more likely to be preserved through the rotation
    
    // Product title - use multiple parameter names for compatibility
    finalUrl.searchParams.set('title', encodeURIComponent(productName));
    finalUrl.searchParams.set('name', encodeURIComponent(productName));
    finalUrl.searchParams.set('sub4', encodeURIComponent(productName));
    
    // Product image - use multiple parameter names for compatibility
    if (productImage) {
      finalUrl.searchParams.set('image', encodeURIComponent(productImage));
      finalUrl.searchParams.set('img', encodeURIComponent(productImage));
      finalUrl.searchParams.set('sub5', encodeURIComponent(productImage));
    }
    
    // Facebook pixel - use multiple parameter names for compatibility
    finalUrl.searchParams.set('pixel', '1289141292863424');
    finalUrl.searchParams.set('fb', '1289141292863424');
    finalUrl.searchParams.set('adv1', '1289141292863424');
    
    // Add a custom parameter to identify this as a product redirect
    finalUrl.searchParams.set('source', 'product-page');
    finalUrl.searchParams.set('type', 'blank-offer');
    
    // Prefill instructions - use multiple parameter names
    const prefillParams = {
      'first_name': '',
      'last_name': '',
      'address': '',
      'email': '',
      'phone': '',
      'city': '',
      'zip': '',
      'fname': '',
      'lname': '',
      'addr': '',
      'phone_num': '',
      'postal': ''
    };
    
    Object.entries(prefillParams).forEach(([key, value]) => {
      finalUrl.searchParams.set(key, value);
    });
    
    return finalUrl.toString();
  } catch (error) {
    console.error('Error adding rotator-compatible parameters:', error);
    return url; // Return original URL if there's an error
  }
};

/**
 * Create a custom redirect URL that bypasses link rotator limitations
 * This creates a URL with encoded product data that can be decoded on the target page
 * @param baseUrl - The base redirect URL
 * @param productName - The product name/title
 * @param productImage - The product image URL (optional)
 * @returns URL with encoded product data
 */
export const createCustomRedirectUrl = (
  baseUrl: string,
  productName: string,
  productImage?: string
): string => {
  try {
    // Create a custom data object
    const productData = {
      name: productName,
      image: productImage || '',
      pixel: '1289141292863424',
      timestamp: Date.now(),
      source: 'product-page'
    };
    
    // Encode the data as a base64 string
    const encodedData = btoa(JSON.stringify(productData));
    
    // Create the final URL with the encoded data
    const finalUrl = new URL(baseUrl);
    finalUrl.searchParams.set('data', encodedData);
    
    // Also add some human-readable parameters as fallback
    finalUrl.searchParams.set('p', encodeURIComponent(productName));
    finalUrl.searchParams.set('i', encodeURIComponent(productImage || ''));
    finalUrl.searchParams.set('fb', '1289141292863424');
    
    return finalUrl.toString();
  } catch (error) {
    console.error('Error creating custom redirect URL:', error);
    return baseUrl;
  }
};

/**
 * Create a URL with fragment-based parameters (some rotators preserve fragments)
 * @param baseUrl - The base redirect URL
 * @param productName - The product name/title
 * @param productImage - The product image URL (optional)
 * @returns URL with fragment-based parameters
 */
export const createFragmentBasedUrl = (
  baseUrl: string,
  productName: string,
  productImage?: string
): string => {
  try {
    // Create a URL with fragment-based parameters
    // Some link rotators preserve URL fragments better than query parameters
    const fragmentData = {
      title: productName,
      image: productImage || '',
      pixel: '1289141292863424',
      source: 'product-page'
    };
    
    const fragmentString = JSON.stringify(fragmentData);
    const encodedFragment = encodeURIComponent(fragmentString);
    
    return `${baseUrl}#${encodedFragment}`;
  } catch (error) {
    console.error('Error creating fragment-based URL:', error);
    return baseUrl;
  }
};

/**
 * Create a URL with path-based parameters (some rotators preserve path segments)
 * @param baseUrl - The base redirect URL
 * @param productName - The product name/title
 * @param productImage - The product image URL (optional)
 * @returns URL with path-based parameters
 */
export const createPathBasedUrl = (
  baseUrl: string,
  productName: string,
  productImage?: string
): string => {
  try {
    // Create a URL with path-based parameters
    // Some link rotators preserve path segments better than query parameters
    const url = new URL(baseUrl);
    
    // Add product data to the path
    const productPath = `/product/${encodeURIComponent(productName)}/image/${encodeURIComponent(productImage || '')}/pixel/1289141292863424`;
    
    // Insert the product path before any existing path
    const originalPath = url.pathname;
    url.pathname = originalPath + productPath;
    
    return url.toString();
  } catch (error) {
    console.error('Error creating path-based URL:', error);
    return baseUrl;
  }
};

/**
 * Open a redirect URL with blank offer parameters
 * @param url - The base redirect URL
 * @param productName - The product name/title
 * @param productImage - The product image URL (optional)
 * @param target - The target for window.open (default: '_blank')
 */
export const openBlankOfferRedirect = (
  url: string,
  productName: string,
  productImage?: string,
  target: string = '_blank'
): void => {
  const finalUrl = addBlankOfferParameters(url, productName, productImage);
  window.open(finalUrl, target, 'noopener,noreferrer');
};

/**
 * Get a redirect URL with blank offer parameters (without opening)
 * @param url - The base redirect URL
 * @param productName - The product name/title
 * @param productImage - The product image URL (optional)
 * @returns URL with all required parameters
 */
export const getBlankOfferRedirectUrl = (
  url: string,
  productName: string,
  productImage?: string
): string => {
  return addBlankOfferParameters(url, productName, productImage);
};

/**
 * Smart redirect function that detects link rotators and uses appropriate parameters
 * @param url - The redirect URL
 * @param productName - The product name/title
 * @param productImage - The product image URL (optional)
 * @returns URL with appropriate parameters based on URL type
 */
export const getSmartBlankOfferUrl = (
  url: string,
  productName: string,
  productImage?: string
): string => {
  // Check if this is a link rotator service
  const isLinkRotator = isLinkRotatorUrl(url);
  
  if (isLinkRotator) {
    console.log('🔗 Detected link rotator, using intermediate page approach...');
    
    // For link rotators, use our custom intermediate page
    // This stores the product data in localStorage before redirecting
    const intermediateUrl = new URL('/product-redirect', window.location.origin);
    intermediateUrl.searchParams.set('name', productName);
    if (productImage) {
      intermediateUrl.searchParams.set('image', productImage);
    }
    intermediateUrl.searchParams.set('url', url);
    intermediateUrl.searchParams.set('action', 'buy-now');
    intermediateUrl.searchParams.set('country', 'UK'); // Default, can be made dynamic
    
    console.log('🔗 Intermediate redirect URL:', intermediateUrl.toString());
    return intermediateUrl.toString();
  } else {
    console.log('🔗 Direct URL, using standard blank offer parameters');
    return addBlankOfferParameters(url, productName, productImage);
  }
};

/**
 * Detect if a URL is a link rotator service
 * @param url - The URL to check
 * @returns true if it's a link rotator
 */
export const isLinkRotatorUrl = (url: string): boolean => {
  const rotatorDomains = [
    'linkly.link',
    'linktr.ee',
    'biolink.co',
    'beacons.ai',
    'carrd.co',
    'taplink.cc',
    'linkin.bio',
    'manylink.co',
    'linkkle.com',
    'linktree.com'
  ];
  
  try {
    const urlObj = new URL(url);
    return rotatorDomains.some(domain => urlObj.hostname.includes(domain));
  } catch {
    return false;
  }
};
