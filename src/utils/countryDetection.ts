// Country detection service for automatic country selection
export interface CountryDetectionResult {
  countryCode: string;
  confidence: 'high' | 'medium' | 'low';
  method: 'ip' | 'locale' | 'fallback';
}

// Supported countries mapping - ALL countries in Country Selector are directly supported
// Only unsupported countries get mapped to closest supported region
const SUPPORTED_COUNTRIES = {
  // Direct support for all Country Selector countries
  'GB': 'gb', // United Kingdom
  'DK': 'dk', // Denmark
  'NO': 'no', // Norway
  'CH': 'ch', // Switzerland
  'FR': 'fr', // France - This should work with VPN!
  'ES': 'es', // Spain
  'TR': 'tr', // Turkey
  'ZA': 'za', // South Africa
  
  // European countries mapped to closest supported region
  'DE': 'ch', // Germany -> Switzerland (German-speaking)
  'AT': 'ch', // Austria -> Switzerland (German-speaking)
  'IT': 'ch', // Italy -> Switzerland (Italian-speaking)
  'NL': 'dk', // Netherlands -> Denmark (close proximity)
  'BE': 'fr', // Belgium -> France (French-speaking)
  'SE': 'no', // Sweden -> Norway (Scandinavian)
  'FI': 'no', // Finland -> Norway (Scandinavian)
  'PL': 'ch', // Poland -> Switzerland (Central European)
  'CZ': 'ch', // Czech Republic -> Switzerland (Central European)
  'HU': 'ch', // Hungary -> Switzerland (Central European)
  'RO': 'ch', // Romania -> Switzerland (Central European)
  'BG': 'ch', // Bulgaria -> Switzerland (Eastern European)
  'HR': 'ch', // Croatia -> Switzerland (Central European)
  'SI': 'ch', // Slovenia -> Switzerland (Central European)
  'SK': 'ch', // Slovakia -> Switzerland (Central European)
  'LT': 'no', // Lithuania -> Norway (Baltic)
  'LV': 'no', // Latvia -> Norway (Baltic)
  'EE': 'no', // Estonia -> Norway (Baltic)
  'IE': 'gb', // Ireland -> UK (English-speaking)
  'PT': 'es', // Portugal -> Spain (Iberian)
  'GR': 'tr', // Greece -> Turkey (Mediterranean)
  'CY': 'tr', // Cyprus -> Turkey (Mediterranean)
  'MT': 'es', // Malta -> Spain (Mediterranean)
  'LU': 'ch', // Luxembourg -> Switzerland (Central European)
  'IS': 'no', // Iceland -> Norway (Nordic)
  'AD': 'es', // Andorra -> Spain (Pyrenees)
  'MC': 'fr', // Monaco -> France (French-speaking)
  'LI': 'ch', // Liechtenstein -> Switzerland (German-speaking)
  'SM': 'ch', // San Marino -> Switzerland (Italian-speaking)
  'VA': 'ch', // Vatican City -> Switzerland (Italian-speaking)
};

// Fallback to GB for unsupported countries
const FALLBACK_COUNTRY = 'gb';

/**
 * Detect user's country using multiple methods
 */
export const detectUserCountry = async (): Promise<CountryDetectionResult> => {
  try {
    // Method 1: Try IP-based geolocation (most accurate)
    // Guard: browsers can block or rate-limit these services and cause CORS/429 spam. Throttle to once per session.
    let ipResult: { countryCode: string } | null = null;
    try {
      const alreadyTried = sessionStorage.getItem('ipGeoTried');
      if (!alreadyTried) {
        sessionStorage.setItem('ipGeoTried', '1');
        ipResult = await detectCountryByIP();
      }
    } catch {}
    
    if (ipResult) {
      const mappedCountry = SUPPORTED_COUNTRIES[ipResult.countryCode as keyof typeof SUPPORTED_COUNTRIES];
      if (mappedCountry) {
        console.log(`🌍 IP detection: ${ipResult.countryCode} -> ${mappedCountry}`);
        return {
          countryCode: mappedCountry,
          confidence: 'high',
          method: 'ip'
        };
      }
    }

    // Method 2: Try browser locale detection
    const localeResult = detectCountryByLocale();
    if (localeResult) {
      const mappedCountry = SUPPORTED_COUNTRIES[localeResult.countryCode as keyof typeof SUPPORTED_COUNTRIES];
      if (mappedCountry) {
        console.log(`🌍 Locale detection: ${localeResult.countryCode} -> ${mappedCountry}`);
        return {
          countryCode: mappedCountry,
          confidence: 'medium',
          method: 'locale'
        };
      }
    }

    // Method 3: Fallback to GB
    console.log('🌍 Using fallback: GB');
    return {
      countryCode: FALLBACK_COUNTRY,
      confidence: 'low',
      method: 'fallback'
    };

  } catch (error) {
    console.warn('Country detection failed, using fallback:', error);
    return {
      countryCode: FALLBACK_COUNTRY,
      confidence: 'low',
      method: 'fallback'
    };
  }
};

/**
 * Detect country using IP geolocation
 */
const detectCountryByIP = async (): Promise<{ countryCode: string } | null> => {
  try {
    // Multiple IP geolocation services for redundancy
    const services = [
      'https://ipinfo.io/json',
      'https://ipgeolocation.io/json?api-key=free',
      'https://ipapi.co/json'
    ];

    for (const service of services) {
      try {
        const response = await fetch(service, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
          // Add timeout to prevent hanging
          signal: AbortSignal.timeout(5000)
        });

        if (!response.ok) {
          console.warn(`IP geolocation service ${service} returned ${response.status}`);
          continue;
        }

        const data = await response.json();
        let countryCode: string | null = null;

        // Extract country code based on service
        if (service.includes('ipinfo.io')) {
          countryCode = data.country;
        } else if (service.includes('ipgeolocation.io')) {
          countryCode = data.country_code2;
        } else if (service.includes('ipapi.co')) {
          countryCode = data.country_code;
        }

        if (countryCode && typeof countryCode === 'string') {
          console.log(`🌍 IP detection result from ${service}: ${countryCode}`);
          return { countryCode: countryCode.toUpperCase() };
        }
      } catch (serviceError: any) {
        // Silence noisy CORS/429 errors to avoid console spam in dev
        const msg = String(serviceError?.message || '');
        const isCors = /CORS/i.test(msg) || /disallows reading/i.test(msg);
        const is429 = /429/.test(msg);
        if (!isCors && !is429) {
          console.warn(`IP geolocation service ${service} failed:`, serviceError);
        }
        continue; // Try next service
      }
    }

    return null;
  } catch (error) {
    console.warn('All IP geolocation services failed:', error);
    return null;
  }
};

/**
 * Detect country using browser locale
 */
const detectCountryByLocale = (): { countryCode: string } | null => {
  try {
    // Get browser locale
    const locale = navigator.language || navigator.languages?.[0] || 'en-GB';
    
    // Extract country code from locale (e.g., 'en-GB' -> 'GB', 'fr-FR' -> 'FR')
    const countryMatch = locale.match(/-([A-Z]{2})$/);
    if (countryMatch) {
      const countryCode = countryMatch[1];
      
      // Check if it's a supported country
      if (SUPPORTED_COUNTRIES[countryCode as keyof typeof SUPPORTED_COUNTRIES]) {
        return { countryCode };
      }
    }

    // Try to map language to country for unsupported locales
    const languageToCountry: { [key: string]: string } = {
      'da': 'DK', // Danish -> Denmark
      'no': 'NO', // Norwegian -> Norway
      'de': 'CH', // German -> Switzerland (assuming Swiss German)
      'fr': 'FR', // French -> France
      'es': 'ES', // Spanish -> Spain
      'tr': 'TR', // Turkish -> Turkey
      'en': 'GB'  // English -> United Kingdom
    };

    const language = locale.split('-')[0];
    if (languageToCountry[language]) {
      const countryCode = languageToCountry[language];
      if (SUPPORTED_COUNTRIES[countryCode as keyof typeof SUPPORTED_COUNTRIES]) {
        return { countryCode };
      }
    }

    return null;
  } catch (error) {
    console.warn('Locale detection failed:', error);
    return null;
  }
};

/**
 * Get the detected country code, with fallback to GB
 */
export const getDetectedCountryCode = (): string => {
  try {
    if (typeof window !== 'undefined' && typeof sessionStorage !== 'undefined') {
      // Check if we already have a detected country in sessionStorage
      const cachedCountry = sessionStorage.getItem('detectedCountryCode');
      if (cachedCountry && SUPPORTED_COUNTRIES[cachedCountry as keyof typeof SUPPORTED_COUNTRIES]) {
        return cachedCountry;
      }
    }
  } catch {}
  // Return fallback
  return FALLBACK_COUNTRY;
};

/**
 * Cache the detected country code
 */
export const cacheDetectedCountry = (countryCode: string): void => {
  try {
    if (typeof window !== 'undefined' && typeof sessionStorage !== 'undefined') {
      if (SUPPORTED_COUNTRIES[countryCode as keyof typeof SUPPORTED_COUNTRIES]) {
        sessionStorage.setItem('detectedCountryCode', countryCode);
      }
    }
  } catch {}
};

/**
 * Force clear all country detection cache
 */
export const clearCountryDetectionCache = (): void => {
  try {
    if (typeof window !== 'undefined') {
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.removeItem('ipGeoTried');
        sessionStorage.removeItem('detectedCountryCode');
      }
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('selectedCountryCode');
      }
    }
  } catch {}
  
  // Reset the initialization flag in the country selector
  if (typeof window !== 'undefined') {
    // Access the global flag from the country selector via dynamic import to avoid require in browser
    import('../hooks/useCountrySelector')
      .then((countrySelectorModule) => {
        if (countrySelectorModule && countrySelectorModule.resetInitialization) {
          countrySelectorModule.resetInitialization();
        }
      })
      .catch(() => {
        // Silently ignore if module not available
      });
  }
  
  console.log('🧹 Cleared all country detection cache');
};

/**
 * Reset country detection initialization flag
 */
export const resetCountryDetectionInitialization = (): void => {
  if (typeof window !== 'undefined') {
    // This will be called by the country selector hook
    console.log('🔄 Reset country detection initialization flag');
  }
};

/**
 * Debug function to help troubleshoot country detection
 */
export const debugCountryDetection = async (): Promise<{
  ipResult: any;
  localeResult: any;
  cachedCountry: string | null;
  manualSelection: string | null;
  supportedCountries: string[];
}> => {
  try {
    // Test IP detection
    let ipResult = null;
    try {
      const alreadyTried = sessionStorage.getItem('ipGeoTried');
      if (!alreadyTried) {
        sessionStorage.setItem('ipGeoTried', '1');
        ipResult = await detectCountryByIP();
      }
    } catch (error) {
      console.warn('IP detection failed during debug:', error);
    }

    // Test locale detection
    const localeResult = detectCountryByLocale();
    
    // Check cached values
    const cachedCountry = sessionStorage.getItem('detectedCountryCode');
    const manualSelection = localStorage.getItem('selectedCountryCode');
    
    // Get list of supported countries
    const supportedCountries = Object.keys(SUPPORTED_COUNTRIES);

    return {
      ipResult,
      localeResult,
      cachedCountry,
      manualSelection,
      supportedCountries
    };
  } catch (error) {
    console.error('Debug country detection failed:', error);
    return {
      ipResult: null,
      localeResult: null,
      cachedCountry: null,
      manualSelection: null,
      supportedCountries: []
    };
  }
};
