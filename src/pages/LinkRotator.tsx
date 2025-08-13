import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, Settings, Globe, Link, ArrowLeft, AlertCircle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { COUNTRIES } from '../utils/translations';

interface CountryLink {
  country: string;
  countryCode: string;
  flag: string;
  redirectUrl: string;
}

const LinkRotator = () => {
  const navigate = useNavigate();
  
  // PIN protection (same as ProductBuilder)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const CORRECT_PIN = '140776';
  
  // Link management
  const [countryLinks, setCountryLinks] = useState<CountryLink[]>([]);
  const [defaultLink, setDefaultLink] = useState('https://linkly.link/2C4ln');
  const [isLoading, setIsLoading] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  // Countries from the centralized configuration (automatically includes all countries)
  const ALL_COUNTRIES = COUNTRIES.map(country => ({
    name: country.name,
    code: country.code.toUpperCase(),
    flag: country.flag
  }));

  // PIN Authentication
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === CORRECT_PIN) {
      setIsAuthenticated(true);
      setPinError('');
    } else {
      setPinError('Incorrect PIN. Please try again.');
      setPinInput('');
    }
  };

  // Load saved links from localStorage
  useEffect(() => {
    if (isAuthenticated) {
      const savedLinks = localStorage.getItem('globalCountryLinks');
      const savedDefault = localStorage.getItem('defaultRedirectLink');
      
      if (savedLinks) {
        const parsedLinks = JSON.parse(savedLinks);
        
        // Ensure all current countries are included (migration for new countries)
        const existingCountryCodes = parsedLinks.map((link: CountryLink) => link.countryCode);
        const missingCountries = ALL_COUNTRIES.filter(country => 
          !existingCountryCodes.includes(country.code)
        );
        
        // Add any missing countries (like South Africa)
        const updatedLinks = [
          ...parsedLinks,
          ...missingCountries.map(country => ({
            country: country.name,
            countryCode: country.code,
            flag: country.flag,
            redirectUrl: ''
          }))
        ];
        
        setCountryLinks(updatedLinks);
      } else {
        // Initialize with empty links for all countries
        const initialLinks = ALL_COUNTRIES.map(country => ({
          country: country.name,
          countryCode: country.code,
          flag: country.flag,
          redirectUrl: ''
        }));
        setCountryLinks(initialLinks);
      }
      
      if (savedDefault) {
        setDefaultLink(savedDefault);
      }
    }
  }, [isAuthenticated]);

  // Update a country's redirect URL
  const updateCountryLink = (countryCode: string, url: string) => {
    setCountryLinks(prev => 
      prev.map(link => 
        link.countryCode === countryCode 
          ? { ...link, redirectUrl: url }
          : link
      )
    );
  };

  // Save all links to localStorage
  const handleSave = () => {
    setIsLoading(true);
    
    try {
      localStorage.setItem('globalCountryLinks', JSON.stringify(countryLinks));
      localStorage.setItem('defaultRedirectLink', defaultLink);
      
      setSaveMessage('✅ Global redirect links saved successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      console.error('Error saving links:', error);
      setSaveMessage('❌ Error saving links. Please try again.');
      setTimeout(() => setSaveMessage(''), 3000);
    }
    
    setIsLoading(false);
  };

  // Validate URL format
  const isValidUrl = (url: string) => {
    if (!url) return true; // Empty is valid (will use default)
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <Settings className="mx-auto h-12 w-12 text-gray-400" />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Link Rotator Access
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your PIN to manage global redirect links
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handlePinSubmit}>
            <div>
              <label htmlFor="pin" className="sr-only">
                PIN
              </label>
              <input
                id="pin"
                name="pin"
                type="password"
                maxLength={6}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm text-center tracking-widest"
                placeholder="Enter 6-digit PIN"
              />
            </div>
            {pinError && (
              <div className="text-red-600 text-sm text-center">{pinError}</div>
            )}
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Access Link Rotator
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      <Header />
      
      <div className="max-w-[1920px] mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => navigate('/admin')}
              className="flex items-center text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-3 py-2 rounded-lg transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </button>
            <span className="text-gray-300">|</span>
            <button
              onClick={() => navigate('/product-builder')}
              className="flex items-center text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-3 py-2 rounded-lg transition-all duration-200"
            >
              Product Builder
            </button>
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Link Rotator</h1>
              <p className="text-gray-600 mt-2">Manage global redirect links by country</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-green-50/50 border border-blue-200/50 rounded-2xl p-6 mb-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-5 h-5 text-white" />
              </div>
              <div className="text-sm text-blue-800">
                <strong className="text-base">How it works:</strong> Set global redirect URLs for each country. When users click "Buy Now" or "Add to Basket", 
                they'll be redirected to the country-specific link. If no link is set for a country, the default fallback link will be used.
                These can be overridden per-product in the Product Builder's Advanced section.
              </div>
            </div>
          </div>
        </div>

        {/* Save Message */}
        {saveMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-green-50 border border-green-200 text-green-800 flex items-center gap-3">
            <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            {saveMessage}
          </div>
        )}

        {/* Default Fallback Link */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <Link className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">Default Fallback Link</h2>
          </div>
          <p className="text-gray-600 text-sm mb-6">
            This link will be used when no country-specific link is defined, or as a fallback for any errors.
          </p>
          <input
            type="url"
            value={defaultLink}
            onChange={(e) => setDefaultLink(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200"
            placeholder="https://linkly.link/2C4ln"
          />
          {!isValidUrl(defaultLink) && (
            <div className="text-red-500 text-sm mt-2 flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
              Please enter a valid URL
            </div>
          )}
        </div>

        {/* Country-Specific Links */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">Country-Specific Redirect Links</h2>
          </div>

          <div className="space-y-4">
            {countryLinks.map((countryLink) => (
              <div key={countryLink.countryCode} className="border border-gray-200/50 rounded-2xl p-6 bg-white/50 backdrop-blur-sm hover:bg-white/70 transition-all duration-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-gray-100 to-blue-100 rounded-xl flex items-center justify-center border border-gray-200/50">
                    <span className="text-2xl">{countryLink.flag}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">{countryLink.country}</h3>
                    <p className="text-sm text-gray-500">Code: {countryLink.countryCode}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Redirect URL for {countryLink.country}
                    </label>
                    <input
                      type="url"
                      value={countryLink.redirectUrl}
                      onChange={(e) => updateCountryLink(countryLink.countryCode, e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200"
                      placeholder={`Enter redirect URL for ${countryLink.country} (optional)`}
                    />
                    {countryLink.redirectUrl && !isValidUrl(countryLink.redirectUrl) && (
                      <p className="text-red-500 text-sm mt-1">Please enter a valid URL</p>
                    )}
                    {!countryLink.redirectUrl && (
                      <p className="text-gray-500 text-sm mt-1">
                        Empty = will use default fallback link
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSave}
            disabled={isLoading || countryLinks.some(link => link.redirectUrl && !isValidUrl(link.redirectUrl)) || !isValidUrl(defaultLink)}
            className="flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl hover:from-green-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
          >
            <Save className="w-5 h-5 mr-3" />
            {isLoading ? 'Saving...' : 'Save Global Links'}
          </button>
        </div>

        {/* Usage Instructions */}
        <div className="mt-8 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-8">
          <h3 className="font-semibold text-gray-900 mb-6 flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Settings className="w-4 h-4 text-white" />
            </div>
            Usage Instructions
          </h3>
          <ul className="space-y-4 text-sm text-gray-700">
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-blue-600">1</span>
              </div>
              <div><strong>Priority Order:</strong> Per-product override → Global country link → Default fallback</div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-green-600">2</span>
              </div>
              <div><strong>Empty Links:</strong> Leave country links empty to always use the default fallback</div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-purple-600">3</span>
              </div>
              <div><strong>Valid URLs:</strong> All URLs must start with http:// or https://</div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-orange-600">4</span>
              </div>
              <div><strong>Per-Product Overrides:</strong> Can be set in the Product Builder's Advanced section</div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-red-600">5</span>
              </div>
              <div><strong>Auto-Refresh:</strong> Page refreshes when country is changed to apply new redirect links</div>
            </li>
          </ul>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default LinkRotator;