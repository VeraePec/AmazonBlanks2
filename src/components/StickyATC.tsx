import React from 'react';
import { getTranslation, getCountryConfig } from '../utils/translations';
import { useCountrySelector } from '../hooks/useCountrySelector';

interface StickyATCProps {
  onBuyNow: () => void;
  isVisible: boolean;
}

const StickyATC: React.FC<StickyATCProps> = ({
  onBuyNow,
  isVisible
}) => {
  const { selectedCountry } = useCountrySelector();
  
  return (

    <div className={`fixed bottom-0 left-0 right-0 z-50 transform transition-all duration-500 ease-out ${
      isVisible 
        ? 'translate-y-0 opacity-100' 
        : 'translate-y-full opacity-0'
    }`}>
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-center lg:justify-end">
          <button 
            onClick={onBuyNow}
            className="w-full max-w-md lg:max-w-xs bg-[#ffa41c] hover:bg-[#ff8f00] border border-[#ff9900] rounded-full py-4 px-8 text-lg transition-colors text-black shadow-lg"
          >
            {getTranslation('product.buy.now', getCountryConfig(selectedCountry.code).language)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StickyATC; 