// Alternative to page refresh - manage redirect URLs reactively without refreshing

export interface CountryRedirectState {
  selectedCountryCode: string;
  globalLinks: any[];
  defaultFallback: string;
}

// Global state for redirect URLs - updates without page refresh
let globalRedirectState: CountryRedirectState = {
  selectedCountryCode: 'gb',
  globalLinks: [],
  defaultFallback: 'https://linkly.link/2C4ln'
};

// Listeners for redirect state changes
let redirectListeners: Array<(state: CountryRedirectState) => void> = [];

/**
 * Update the global redirect state when country changes
 * This allows all components to get fresh redirect URLs without page refresh
 */
export const updateCountryRedirectState = (countryCode: string) => {
  // Load fresh data from localStorage
  const globalLinks = JSON.parse(localStorage.getItem('globalCountryLinks') || '[]');
  const defaultFallback = localStorage.getItem('defaultRedirectLink') || 'https://linkly.link/2C4ln';
  
  // Update global state
  globalRedirectState = {
    selectedCountryCode: countryCode,
    globalLinks,
    defaultFallback
  };
  
  // Notify all listeners
  redirectListeners.forEach(listener => {
    try {
      listener(globalRedirectState);
    } catch (error) {
      console.error('Error in redirect state listener:', error);
    }
  });
};

/**
 * Subscribe to redirect state changes
 */
export const subscribeToRedirectState = (listener: (state: CountryRedirectState) => void) => {
  redirectListeners.push(listener);
  
  // Immediately call with current state
  listener(globalRedirectState);
  
  // Return unsubscribe function
  return () => {
    redirectListeners = redirectListeners.filter(l => l !== listener);
  };
};

/**
 * Get current redirect state
 */
export const getCurrentRedirectState = (): CountryRedirectState => {
  return globalRedirectState;
};

/**
 * Initialize redirect state from localStorage
 */
export const initializeRedirectState = () => {
  const savedCountryCode = localStorage.getItem('selectedCountryCode') || 'gb';
  updateCountryRedirectState(savedCountryCode);
};

// Initialize on module load
if (typeof window !== 'undefined') {
  initializeRedirectState();
}

export default {
  updateCountryRedirectState,
  subscribeToRedirectState,
  getCurrentRedirectState,
  initializeRedirectState
};