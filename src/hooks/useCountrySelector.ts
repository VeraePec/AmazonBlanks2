import { useState, useEffect } from 'react';
import { detectUserCountry, getDetectedCountryCode, cacheDetectedCountry } from '../utils/countryDetection';

export interface Country {
  code: string;
  name: string;
  flag: string;
  default?: boolean;
}

// Single source of truth for countries - no duplicates
export const countries: Country[] = [
  { code: 'gb', name: 'English (UK)', flag: '🇬🇧', default: true },
  { code: 'dk', name: 'Dansk (Denmark)', flag: '🇩🇰' },
  { code: 'no', name: 'Norsk (Norway)', flag: '🇳🇴' },
  { code: 'ch', name: 'Deutsch (Switzerland)', flag: '🇨🇭' },
  { code: 'fr', name: 'Français (France)', flag: '🇫🇷' },
  { code: 'es', name: 'Español (Spain)', flag: '🇪🇸' },
  { code: 'tr', name: 'Türkçe (Turkey)', flag: '🇹🇷' },
  { code: 'za', name: 'English (South Africa)', flag: '🇿🇦' }
];

// Initialize with this precedence:
// 1) Manual selection (localStorage)
// 2) Detected country (session cache)
// 3) Default (UK)
const initializeSelectedCountry = () => {
  try {
    const savedCountryCode = typeof localStorage !== 'undefined' ? localStorage.getItem('selectedCountryCode') : null;
    if (savedCountryCode) {
      const saved = countries.find(c => c.code === savedCountryCode);
      if (saved) {
        console.log('🌍 Using MANUAL country:', saved.name);
        return saved;
      }
    }
  } catch {}

  // Only try to use detected country (including VPN detection)
  const detectedCountryCode = getDetectedCountryCode();
  if (detectedCountryCode) {
    const detectedCountry = countries.find(c => c.code === detectedCountryCode);
    if (detectedCountry) {
      console.log('🌍 Using detected country:', detectedCountry.name);
      return detectedCountry;
    }
  }

  // Fallback to default country (UK)
  console.log('🌍 Using default country: UK');
  return countries[0];
};

// Global state for selected country
let globalSelectedCountry = initializeSelectedCountry();
let listeners: Array<(country: Country) => void> = [];
let hasInitialized = false;

// Function to reset initialization flag for testing
export const resetInitialization = (): void => {
  hasInitialized = false;
  console.log('🔄 Country detection initialization flag reset');
};

export const useCountrySelector = () => {
  const [selectedCountry, setSelectedCountryState] = useState<Country>(globalSelectedCountry);
  const [isDetecting, setIsDetecting] = useState(false);

  // Perform automatic country detection on first use - ONLY ONCE
  useEffect(() => {
    // If user has a manual selection, never auto-detect over it
    try {
      const savedCountryCode = typeof localStorage !== 'undefined' ? localStorage.getItem('selectedCountryCode') : null;
      if (savedCountryCode) {
        hasInitialized = true;
        return; // Respect manual selection
      }
    } catch {}

    // Prevent multiple initializations
    if (hasInitialized) return;
    
    const performCountryDetection = async () => {
      // Always try to detect country on first load when no manual selection exists
      if (isDetecting) return;

      console.log('🌍 Starting automatic country detection...');
      setIsDetecting(true);
      try {
        const detectionResult = await detectUserCountry();
        
        console.log('🌍 Country detection result:', detectionResult);
        
        // Apply detected country if confidence is good
        if (detectionResult.confidence !== 'low') {
          const detectedCountry = countries.find(c => c.code === detectionResult.countryCode);
          if (detectedCountry) {
            // Cache the detected country
            cacheDetectedCountry(detectionResult.countryCode);
            
            // Update the global state
            globalSelectedCountry = detectedCountry;
            setSelectedCountryState(detectedCountry);
            
            // Notify other components
            listeners.forEach(listener => {
              listener(detectedCountry);
            });
            
            console.log(`🌍 Auto-detected country applied: ${detectedCountry.name} (${detectionResult.method}, confidence: ${detectionResult.confidence})`);
            
            // Mark as initialized to prevent re-detection
            hasInitialized = true;
          }
        } else {
          console.log('🌍 Country detection confidence too low, keeping current country');
          hasInitialized = true;
        }
      } catch (error) {
        console.warn('Country detection failed:', error);
        hasInitialized = true;
      } finally {
        setIsDetecting(false);
      }
    };

    // Delay detection slightly to ensure component is fully mounted
    const timer = setTimeout(performCountryDetection, 500);
    return () => clearTimeout(timer);
  }, [isDetecting]);

  useEffect(() => {
    const listener = (country: Country) => {
      setSelectedCountryState(country);
    };
    
    listeners.push(listener);
    
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  }, []);

  const setSelectedCountry = (country: Country) => {
    const previousCountry = globalSelectedCountry;
    globalSelectedCountry = country;
    setSelectedCountryState(country);
    
    // Persist to localStorage for persistence across refreshes
    try { localStorage.setItem('selectedCountryCode', country.code); } catch {}
    
    // Notify all other components
    listeners.forEach(listener => {
      listener(country);
    });
    
    // Refresh page if country actually changed to apply new redirect links
    if (previousCountry.code !== country.code) {
      console.log('🌍 Country changed from', previousCountry.code, 'to', country.code, '- refreshing page');
      setTimeout(() => {
        window.location.reload();
      }, 100); // Small delay to ensure state updates complete
    }
  };

  const detectAndSetCountry = async () => {
    console.log('🌍 Manual country detection requested...');
    setIsDetecting(true);
    try {
      const detectionResult = await detectUserCountry();
      console.log('🌍 Manual detection result:', detectionResult);
      
      const detectedCountry = countries.find(c => c.code === detectionResult.countryCode);
      
      if (detectedCountry) {
        // Cache the detected country
        cacheDetectedCountry(detectionResult.countryCode);
        
        // Update the global state
        globalSelectedCountry = detectedCountry;
        setSelectedCountryState(detectedCountry);
        
        // Notify other components
        listeners.forEach(listener => {
          listener(detectedCountry);
        });
        
        console.log(`🌍 Manual country detection applied: ${detectedCountry.name} (${detectionResult.method}, confidence: ${detectionResult.confidence})`);
        
        return detectionResult;
      }
    } catch (error) {
      console.warn('Manual country detection failed:', error);
    } finally {
      setIsDetecting(false);
    }
    return null;
  };

  return {
    selectedCountry,
    setSelectedCountry,
    countries,
    detectAndSetCountry,
    isDetecting
  };
};