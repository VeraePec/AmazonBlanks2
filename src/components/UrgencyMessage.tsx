import React, { useState, useEffect } from 'react';
import { getTranslation, getCountryConfig } from '../utils/translations';
import { useCountrySelector } from '../hooks/useCountrySelector';

interface UrgencyMessageProps {
  productType?: string;
}

const UrgencyMessage: React.FC<UrgencyMessageProps> = ({ productType = 'product' }) => {
  const { selectedCountry } = useCountrySelector();
  const [viewers, setViewers] = useState(42);
  const [timeLeft, setTimeLeft] = useState('');
  const [peopleBought, setPeopleBought] = useState(52);

  // Calculate time left until end of day
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);
      
      const difference = endOfDay.getTime() - now.getTime();
      
      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        setTimeLeft(`${hours}h ${minutes}m`);
      } else {
        setTimeLeft('0h 0m');
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  // Dynamic people viewing effect
  useEffect(() => {
    const interval = setInterval(() => {
      setViewers(prev => {
        // Simulate people entering and leaving
        const change = Math.random() > 0.5 ? 1 : -1;
        const newCount = prev + change;
        return Math.max(35, Math.min(65, newCount)); // Keep between 35-65
      });
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Update people bought count
  useEffect(() => {
    const interval = setInterval(() => {
      setPeopleBought(prev => prev + Math.floor(Math.random() * 2) + 1);
    }, 30000); // Add 1-2 people every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
      <div className="space-y-3">
        {/* Main deal alert */}
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-red-600 rounded-full"></div>
          <span className="text-red-700 font-semibold text-sm">
            {getTranslation('urgency.clearance.sale', getCountryConfig(selectedCountry.code).language)} - {getTranslation('urgency.people.viewing', getCountryConfig(selectedCountry.code).language, { count: viewers })}
          </span>
        </div>
        
        {/* Deal details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div className="flex items-center space-x-2">
            <span className="text-red-700 font-medium">{getTranslation('urgency.stock.only.left', getCountryConfig(selectedCountry.code).language, { count: 8 })}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-red-700 font-medium">{getTranslation('urgency.ends.in', getCountryConfig(selectedCountry.code).language, { time: timeLeft })}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-900 font-medium">{getTranslation('urgency.bought.today', getCountryConfig(selectedCountry.code).language, { count: peopleBought })}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-green-700 font-medium">{getTranslation('urgency.delivery.free.tomorrow', getCountryConfig(selectedCountry.code).language)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UrgencyMessage; 