
import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { useCountrySelector } from '../hooks/useCountrySelector';
import { getTranslation, getCountryConfig } from '../utils/translations';

const Footer = () => {
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const { selectedCountry, setSelectedCountry, countries } = useCountrySelector();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLanguageDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const footerSections = [
    {
      titleKey: 'footer.get.to.know',
      links: [
        { textKey: 'footer.about.us' },
        { textKey: 'footer.careers' },
        { textKey: 'footer.press.releases' },
        { textKey: 'footer.amazon.science' }
      ]
    },
    {
      titleKey: 'footer.make.money',
      links: [
        { textKey: 'footer.sell.products' },
        { textKey: 'footer.sell.business' },
        { textKey: 'footer.sell.apps' },
        { textKey: 'footer.become.affiliate' }
      ]
    },
    {
      titleKey: 'footer.payment.products',
      links: [
        { textKey: 'footer.business.card' },
        { textKey: 'footer.shop.points' },
        { textKey: 'footer.reload.balance' },
        { textKey: 'footer.currency.converter' }
      ]
    },
    {
      titleKey: 'footer.help.you',
      links: [
        { textKey: 'footer.covid' },
        { textKey: 'footer.your.account' },
        { textKey: 'footer.your.orders' },
        { textKey: 'footer.shipping.rates' }
      ]
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-[#232f3e] text-white">
      {/* Back to top button */}
      <div className="bg-[#37475a] py-3 text-center">
        <button 
          onClick={scrollToTop}
          className="text-sm hover:underline cursor-pointer"
        >
          {getTranslation('footer.back.to.top', getCountryConfig(selectedCountry.code).language)}
        </button>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-bold text-sm mb-3">{getTranslation(section.titleKey, getCountryConfig(selectedCountry.code).language)}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href="#" 
                      className="text-gray-300 hover:text-white text-xs sm:text-sm block"
                    >
                      {getTranslation(link.textKey, getCountryConfig(selectedCountry.code).language)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom footer */}
      <div className="border-t border-[#37475a]">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <img 
                src={selectedCountry.code === 'gb' ? 
                  "https://i.postimg.cc/yxQnRNTn/amazon-uk-logo-feature.png" : 
                  "https://www.pngmart.com/files/23/Amazon-Logo-White-PNG-Image.png"
                } 
                alt={`Amazon ${getCountryConfig(selectedCountry.code).name}`} 
                className="h-6 sm:h-8 w-auto"
              />
              
              {/* Country/Language Switcher */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                  className="flex items-center space-x-2 px-3 py-2 border border-[#37475a] rounded bg-[#37475a] hover:bg-[#485769] transition-colors"
                >
                  <span className="text-lg">{selectedCountry.flag}</span>
                  <span className="text-sm font-sans font-bold">{selectedCountry.code.toUpperCase()}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {isLanguageDropdownOpen && (
                  <div className="absolute bottom-full left-0 mb-2 w-64 bg-white border border-gray-300 rounded shadow-lg z-50">
                    <div className="py-2">
                      <div className="px-4 py-2 text-sm font-semibold text-gray-700 border-b font-sans">
                        🌍 {getTranslation('footer.change.country', getCountryConfig(selectedCountry.code).language)}
                      </div>
                      {countries.map((country) => (
                        <button
                          key={country.code}
                          onClick={() => {
                            setSelectedCountry(country);
                            setIsLanguageDropdownOpen(false);
                          }}
                          className={`w-full flex items-center space-x-3 px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                            selectedCountry.code === country.code ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                          }`}
                        >
                          <span className="text-lg">{country.flag}</span>
                          <span className="font-sans">{country.name}</span>
                          {country.default && (
                            <span className="ml-auto text-xs text-gray-500 font-sans">(Default)</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-4 text-xs sm:text-sm text-gray-300">
              <span className="font-sans">{getTranslation('footer.copyright', getCountryConfig(selectedCountry.code).language)}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
