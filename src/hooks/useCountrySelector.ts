import { useState, useEffect } from 'react';
import { COUNTRIES, CountryConfig } from '../utils/translations';
import { detectUserCountry, getDetectedCountryCode, cacheDetectedCountry } from '../utils/countryDetection';

export interface Country {
  code: string;
  name: string;
  flag: string;
  default?: boolean;
}

// Shared countries list for both header and footer - now includes South Africa
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

// Initialize from localStorage, detected country, or default
const initializeSelectedCountry = () => {
  // First, check if user has manually selected a country
  const savedCountryCode = localStorage.getItem('selectedCountryCode');
  if (savedCountryCode) {
    const savedCountry = countries.find(c => c.code === savedCountryCode);
    if (savedCountry) {
      return savedCountry;
    }
  }

  // If no manual selection, try to use detected country
  const detectedCountryCode = getDetectedCountryCode();
  if (detectedCountryCode !== 'gb') { // Only use detection if it's not the fallback
    const detectedCountry = countries.find(c => c.code === detectedCountryCode);
    if (detectedCountry) {
      return detectedCountry;
    }
  }

  // Fallback to default country (UK)
  return countries[0];
};

// Global state for selected country
let globalSelectedCountry = initializeSelectedCountry();
let listeners: Array<(country: Country) => void> = [];

export const useCountrySelector = () => {
  const [selectedCountry, setSelectedCountryState] = useState<Country>(globalSelectedCountry);
  const [isDetecting, setIsDetecting] = useState(false);

  // Perform automatic country detection on first use
  useEffect(() => {
    const performCountryDetection = async () => {
      // Only detect if we don't have a manually selected country
      const hasManualSelection = localStorage.getItem('selectedCountryCode');
      if (hasManualSelection || isDetecting) return;

      setIsDetecting(true);
      try {
        const detectionResult = await detectUserCountry();
        
        if (detectionResult.confidence !== 'low' && detectionResult.countryCode !== 'gb') {
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
            
            console.log(`🌍 Auto-detected country: ${detectedCountry.name} (${detectionResult.method}, confidence: ${detectionResult.confidence})`);
          }
        }
      } catch (error) {
        console.warn('Country detection failed:', error);
      } finally {
        setIsDetecting(false);
      }
    };

    performCountryDetection();
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
    localStorage.setItem('selectedCountryCode', country.code);
    
    // Notify all other components
    listeners.forEach(listener => {
      listener(country);
    });
    
    // Refresh page if country actually changed to apply new redirect links
    if (previousCountry.code !== country.code) {
      console.log('Country changed from', previousCountry.code, 'to', country.code, '- refreshing page');
      setTimeout(() => {
        window.location.reload();
      }, 100); // Small delay to ensure state updates complete
    }
  };

  const detectAndSetCountry = async () => {
    setIsDetecting(true);
    try {
      const detectionResult = await detectUserCountry();
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
        
        console.log(`🌍 Manual country detection: ${detectedCountry.name} (${detectionResult.method}, confidence: ${detectionResult.confidence})`);
        
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