import React, { useState, useEffect } from 'react';
import { Globe, X, CheckCircle, MapPin } from 'lucide-react';
import { useCountrySelector } from '../hooks/useCountrySelector';

interface CountryDetectionNotificationProps {
  onClose: () => void;
}

const CountryDetectionNotification: React.FC<CountryDetectionNotificationProps> = ({ onClose }) => {
  const { selectedCountry, isDetecting } = useCountrySelector();
  const [isVisible, setIsVisible] = useState(false);
  const [detectionMethod, setDetectionMethod] = useState<string>('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile using multiple methods
    const checkMobile = () => {
      // Screen width check
      const screenWidth = window.innerWidth <= 768;
      
      // User agent check
      const userAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      // Touch capability check
      const touchCapable = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      // CSS media query check
      const mediaQuery = window.matchMedia('(max-width: 768px)').matches;
      
      // Set mobile if any condition is true
      const mobile = screenWidth || userAgent || touchCapable || mediaQuery;
      
      // Debug logging (remove in production)
      if (mobile) {
        console.log('📱 Mobile device detected:', {
          screenWidth,
          userAgent,
          touchCapable,
          mediaQuery,
          windowWidth: window.innerWidth,
          userAgentString: navigator.userAgent
        });
      }
      
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Also listen for orientation changes on mobile
    window.addEventListener('orientationchange', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('orientationchange', checkMobile);
    };
  }, []);

  useEffect(() => {
    // Show notification for both mobile and desktop when country is detected
    // Show notification after a short delay to allow country detection to complete
    const timer = setTimeout(() => {
      if (!isDetecting && selectedCountry.code !== 'gb') {
        setIsVisible(true);
        // Auto-hide after 10 seconds (increased from 8)
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(onClose, 300); // Wait for fade out animation
        }, 10000);
      }
    }, 1500); // Increased delay to ensure detection completes

    return () => clearTimeout(timer);
  }, [selectedCountry, isDetecting, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right-2 duration-300 md:block" 
         style={{ 
           display: isVisible ? 'block' : 'none',
           right: isMobile ? '1rem' : '1rem',
           top: isMobile ? '1rem' : '1rem',
           maxWidth: isMobile ? 'calc(100vw - 2rem)' : '24rem'
         }}>
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Globe className="w-4 h-4 text-blue-600" />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <p className="text-sm font-medium text-gray-900">
                Location detected!
              </p>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              We've automatically set your location to{' '}
              <span className="font-medium text-gray-900">
                {selectedCountry.flag} {selectedCountry.name}
              </span>
            </p>
            <div className="flex items-center space-x-1 text-xs text-gray-500 mb-2">
              <MapPin className="w-3 h-3" />
              <span>Prices and language updated for your region</span>
            </div>
            <p className="text-xs text-gray-500">
              You can change this anytime using the country selector in the header.
            </p>
          </div>
          
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(onClose, 300);
            }}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CountryDetectionNotification;
