// Utility functions for handling redirect logic with proper fallback chain

export interface CountryRedirect {
  countryCode: string;
  redirectUrl: string;
}

export interface GlobalCountryLink {
  country: string;
  countryCode: string;
  flag: string;
  redirectUrl: string;
}

// Default fallback URL
const DEFAULT_FALLBACK_URL = 'https://linkly.link/2C4ln';

/**
 * Get the appropriate redirect URL based on the current country and product-specific overrides
 * 
 * Priority order:
 * 1. Per-product country-specific override
 * 2. Global country-specific link
 * 3. Default fallback URL
 */
export const getRedirectUrl = (
  selectedCountryCode: string,
  productOverrides: CountryRedirect[] = []
): string => {
  // 1. Check for per-product override first
  const productOverride = productOverrides.find(
    redirect => redirect.countryCode === selectedCountryCode && redirect.redirectUrl.trim()
  );
  
  if (productOverride) {
    return productOverride.redirectUrl;
  }

  // 2. Check for global country-specific link
  const globalLinks = getGlobalCountryLinks();
  const globalLink = globalLinks.find(
    link => link.countryCode === selectedCountryCode && link.redirectUrl.trim()
  );
  
  if (globalLink) {
    return globalLink.redirectUrl;
  }

  // 3. Use default fallback or custom default
  const customDefault = getDefaultRedirectUrl();
  return customDefault || DEFAULT_FALLBACK_URL;
};

/**
 * Get all global country links from localStorage
 */
export const getGlobalCountryLinks = (): GlobalCountryLink[] => {
  try {
    const saved = localStorage.getItem('globalCountryLinks');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Error loading global country links:', error);
    return [];
  }
};

/**
 * Get the default redirect URL from localStorage
 */
export const getDefaultRedirectUrl = (): string => {
  try {
    const saved = localStorage.getItem('defaultRedirectLink');
    return saved || DEFAULT_FALLBACK_URL;
  } catch (error) {
    console.error('Error loading default redirect URL:', error);
    return DEFAULT_FALLBACK_URL;
  }
};

/**
 * Handle the redirect action for Buy Now and Add to Basket buttons
 */
export const handleRedirectAction = (
  selectedCountryCode: string,
  productOverrides: CountryRedirect[] = [],
  actionType: 'buy-now' | 'add-to-basket' = 'buy-now'
) => {
  try {
    const redirectUrl = getRedirectUrl(selectedCountryCode, productOverrides);
    
    // Validate URL before proceeding
    if (!redirectUrl || !isValidRedirectUrl(redirectUrl)) {
      console.warn('Invalid redirect URL, using fallback:', redirectUrl);
      window.open(DEFAULT_FALLBACK_URL, '_blank', 'noopener,noreferrer');
      return;
    }
    
    // Add tracking parameters if needed
    const finalUrl = new URL(redirectUrl);
    finalUrl.searchParams.set('action', actionType);
    finalUrl.searchParams.set('country', selectedCountryCode);
    finalUrl.searchParams.set('timestamp', Date.now().toString());
    
    // Open in new tab/window
    window.open(finalUrl.toString(), '_blank', 'noopener,noreferrer');
  } catch (error) {
    console.error('Error in handleRedirectAction:', error);
    // Fallback to default URL
    window.open(DEFAULT_FALLBACK_URL, '_blank', 'noopener,noreferrer');
  }
};

/**
 * Get a preview of what URL will be used for a given country
 * Useful for admin interfaces to show which link will be active
 */
export const getRedirectPreview = (
  selectedCountryCode: string,
  productOverrides: CountryRedirect[] = []
): {
  url: string;
  source: 'product-override' | 'global-setting' | 'default-fallback';
  countryName?: string;
} => {
  // Check product override
  const productOverride = productOverrides.find(
    redirect => redirect.countryCode === selectedCountryCode && redirect.redirectUrl.trim()
  );
  
  if (productOverride) {
    return {
      url: productOverride.redirectUrl,
      source: 'product-override'
    };
  }

  // Check global setting
  const globalLinks = getGlobalCountryLinks();
  const globalLink = globalLinks.find(
    link => link.countryCode === selectedCountryCode && link.redirectUrl.trim()
  );
  
  if (globalLink) {
    return {
      url: globalLink.redirectUrl,
      source: 'global-setting',
      countryName: globalLink.country
    };
  }

  // Default fallback
  const defaultUrl = getDefaultRedirectUrl();
  return {
    url: defaultUrl,
    source: 'default-fallback'
  };
};

/**
 * Validate if a URL is properly formatted
 */
export const isValidRedirectUrl = (url: string): boolean => {
  if (!url || !url.trim()) return false;
  
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Get all available countries for redirect configuration
 */
export const getAvailableCountries = () => [
  { name: 'United Kingdom', code: 'UK', flag: '🇬🇧' },
  { name: 'Denmark', code: 'DK', flag: '🇩🇰' },
  { name: 'Norway', code: 'NO', flag: '🇳🇴' },
  { name: 'Switzerland', code: 'CH', flag: '🇨🇭' },
  { name: 'France', code: 'FR', flag: '🇫🇷' },
  { name: 'Spain', code: 'ES', flag: '🇪🇸' },
  { name: 'Turkey', code: 'TR', flag: '🇹🇷' }
];

export default {
  getRedirectUrl,
  handleRedirectAction,
  getRedirectPreview,
  isValidRedirectUrl,
  getGlobalCountryLinks,
  getDefaultRedirectUrl,
  getAvailableCountries
};