// Utility function to calculate delivery date (2 days from today)
import { getCountryConfig } from './translations';
import { countries } from '../hooks/useCountrySelector';

export const getDeliveryDate = (lang: string = 'en'): string => {
  const today = new Date();
  const deliveryDate = new Date(today);
  deliveryDate.setDate(today.getDate() + 2);
  
  // Format localized date e.g. 14. august (da-DK) or 14 Aug (en-GB)
  return deliveryDate.toLocaleDateString(lang === 'da' ? 'da-DK' : 'en-GB', {
    day: 'numeric',
    month: lang === 'da' ? 'long' : 'short',
  });
};

// Get delivery info string formatted like Amazon
export const getDeliveryInfo = (countryCode?: string): string => {
  const lang = countryCode ? getCountryConfig(countryCode).language : 'en';
  const deliveryDate = getDeliveryDate(lang);
  if (lang === 'da') return `GRATIS levering ${deliveryDate}`;
  if (lang === 'fr') return `Livraison GRATUITE ${deliveryDate}`;
  if (lang === 'de') return `KOSTENLOSE Lieferung ${deliveryDate}`;
  if (lang === 'es') return `Entrega GRATIS ${deliveryDate}`;
  if (lang === 'no') return `GRATIS levering ${deliveryDate}`;
  return `FREE delivery ${deliveryDate}`;
}; 