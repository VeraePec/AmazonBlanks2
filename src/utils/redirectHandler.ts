// Utility functions for handling redirect logic with proper fallback chain
import { getSmartBlankOfferUrl } from './blankOfferRedirect';

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
const DEFAULT_FALLBACK_URL = 'https://linkly.link/2D5Sx';

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
  actionType: 'buy-now' | 'add-to-basket' = 'buy-now',
  productData?: {
    name: string;
    images: string[];
    options?: Record<string, any>; // Add options parameter
  }
) => {
  try {
    const redirectUrl = getRedirectUrl(selectedCountryCode, productOverrides);
    
    // Validate URL before proceeding
    if (!redirectUrl || !isValidRedirectUrl(redirectUrl)) {
      console.warn('Invalid redirect URL, using fallback:', redirectUrl);
      window.open(DEFAULT_FALLBACK_URL, '_blank', 'noopener,noreferrer');
      return;
    }
    
    // Build checkout page URL with all necessary parameters
    const checkoutUrl = new URL('/product-redirect', window.location.origin);
    checkoutUrl.searchParams.set('name', productData?.name || 'Product');
    checkoutUrl.searchParams.set('image', productData?.images?.[0] || '');
    checkoutUrl.searchParams.set('url', redirectUrl);
    checkoutUrl.searchParams.set('action', actionType);
    checkoutUrl.searchParams.set('country', selectedCountryCode);
    
    // Add selected options if they exist
    if (productData?.options && Object.keys(productData.options).length > 0) {
      checkoutUrl.searchParams.set('options', encodeURIComponent(JSON.stringify(productData.options)));
    }
    
    // Redirect to our checkout page instead of directly to external URL
    window.location.href = checkoutUrl.toString();
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
 * Now imports from the single source of truth
 */
export const getAvailableCountries = () => {
  // Import from the single source of truth to avoid duplication
  // Use dynamic import to remain ESM/browser-friendly
  try {
    const modPromise = import('../hooks/useCountrySelector');
    // Return a placeholder; callers that need sync data should pass it in instead.
    // For backward compatibility, if called synchronously, we try to read from window cache.
    // Prefer using the async helper below.
    (modPromise as any).catch(() => {});
  } catch {}
  // Fallback synchronous list to avoid undefined in callers that expect immediate data
  // This should match the countries in useCountrySelector
  const fallback = [
    { name: 'English (UK)', code: 'GB', flag: '🇬🇧' },
    { name: 'Dansk (Denmark)', code: 'DK', flag: '🇩🇰' },
    { name: 'Norsk (Norway)', code: 'NO', flag: '🇳🇴' },
    { name: 'Deutsch (Switzerland)', code: 'CH', flag: '🇨🇭' },
    { name: 'Français (France)', code: 'FR', flag: '🇫🇷' },
    { name: 'Español (Spain)', code: 'ES', flag: '🇪🇸' },
    { name: 'Türkçe (Turkey)', code: 'TR', flag: '🇹🇷' },
    { name: 'English (South Africa)', code: 'ZA', flag: '🇿🇦' }
  ];
  return fallback;
};

// Async helper when you can await
export const getAvailableCountriesAsync = async () => {
  try {
    const mod = await import('../hooks/useCountrySelector');
    const countries = (mod as any).countries || [];
    return countries.map((country: any) => ({
      name: country.name,
      code: String(country.code || '').toUpperCase(),
      flag: country.flag
    }));
  } catch {
    return getAvailableCountries();
  }
};

export default {
  getRedirectUrl,
  handleRedirectAction,
  getRedirectPreview,
  isValidRedirectUrl,
  getGlobalCountryLinks,
  getDefaultRedirectUrl,
  getAvailableCountries
};