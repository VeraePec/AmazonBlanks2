// Country detection service for automatic country selection
export interface CountryDetectionResult {
  countryCode: string;
  confidence: 'high' | 'medium' | 'low';
  method: 'ip' | 'locale' | 'fallback';
}

// Supported countries mapping
const SUPPORTED_COUNTRIES = {
  'GB': 'gb', // United Kingdom
  'DK': 'dk', // Denmark
  'NO': 'no', // Norway
  'CH': 'ch', // Switzerland
  'FR': 'fr', // France
  'ES': 'es', // Spain
  'TR': 'tr', // Turkey
  'ZA': 'za'  // South Africa
};

// Fallback to GB for unsupported countries
const FALLBACK_COUNTRY = 'gb';

/**
 * Detect user's country using multiple methods
 */
export const detectUserCountry = async (): Promise<CountryDetectionResult> => {
  try {
    // Method 1: Try IP-based geolocation (most accurate)
    const ipResult = await detectCountryByIP();
    if (ipResult && SUPPORTED_COUNTRIES[ipResult.countryCode as keyof typeof SUPPORTED_COUNTRIES]) {
      return {
        countryCode: SUPPORTED_COUNTRIES[ipResult.countryCode as keyof typeof SUPPORTED_COUNTRIES],
        confidence: 'high',
        method: 'ip'
      };
    }

    // Method 2: Try browser locale detection
    const localeResult = detectCountryByLocale();
    if (localeResult && SUPPORTED_COUNTRIES[localeResult.countryCode as keyof typeof SUPPORTED_COUNTRIES]) {
      return {
        countryCode: SUPPORTED_COUNTRIES[localeResult.countryCode as keyof typeof SUPPORTED_COUNTRIES],
        confidence: 'medium',
        method: 'locale'
      };
    }

    // Method 3: Fallback to GB
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
    // Try multiple IP geolocation services for better reliability
    const services = [
      'https://ipapi.co/json/',
      'https://ipinfo.io/json',
      'https://api.ipgeolocation.io/ipgeo?apiKey=free'
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

        if (response.ok) {
          const data = await response.json();
          
          // Extract country code based on service response format
          let countryCode: string | null = null;
          
          if (service.includes('ipapi.co')) {
            countryCode = data.country_code;
          } else if (service.includes('ipinfo.io')) {
            countryCode = data.country;
          } else if (service.includes('ipgeolocation.io')) {
            countryCode = data.country_code2;
          }

          if (countryCode && typeof countryCode === 'string') {
            return { countryCode: countryCode.toUpperCase() };
          }
        }
      } catch (serviceError) {
        console.warn(`IP geolocation service ${service} failed:`, serviceError);
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
  // Check if we already have a detected country in sessionStorage
  const cachedCountry = sessionStorage.getItem('detectedCountryCode');
  if (cachedCountry && SUPPORTED_COUNTRIES[cachedCountry as keyof typeof SUPPORTED_COUNTRIES]) {
    return cachedCountry;
  }

  // Return fallback
  return FALLBACK_COUNTRY;
};

/**
 * Cache the detected country code
 */
export const cacheDetectedCountry = (countryCode: string): void => {
  if (SUPPORTED_COUNTRIES[countryCode as keyof typeof SUPPORTED_COUNTRIES]) {
    sessionStorage.setItem('detectedCountryCode', countryCode);
  }
};
