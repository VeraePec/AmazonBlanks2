import { getTranslation, getCountryConfig } from './translations';

// Default reviews that will be automatically added to all products
export const getDefaultReviews = (language: string = 'en') => {
  const currentDate = new Date();
  
  return [
    // Long review 1
    {
      id: 'default-1',
      author: getTranslation('reviews.amazon.customer', language),
      rating: 5,
      title: getTranslation('reviews.default.long.1.title', language),
      content: getTranslation('reviews.default.long.1.content', language),
      date: new Date(currentDate.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(language === 'da' ? 'da-DK' : language === 'no' ? 'nb-NO' : language === 'es' ? 'es-ES' : language === 'ch' ? 'de-CH' : 'en-GB'),
      verified: true,
      helpful: Math.floor(Math.random() * 50) + 10,
      size: undefined,
      images: []
    },
    // Long review 2
    {
      id: 'default-2',
      author: getTranslation('reviews.verified.buyer', language),
      rating: 4,
      title: getTranslation('reviews.default.long.2.title', language),
      content: getTranslation('reviews.default.long.2.content', language),
      date: new Date(currentDate.getTime() - Math.random() * 45 * 24 * 60 * 60 * 1000).toLocaleDateString(language === 'da' ? 'da-DK' : language === 'no' ? 'nb-NO' : language === 'es' ? 'es-ES' : language === 'ch' ? 'de-CH' : 'en-GB'),
      verified: true,
      helpful: Math.floor(Math.random() * 30) + 5,
      size: undefined,
      images: []
    },
    // Short review 1
    {
      id: 'default-3',
      author: getTranslation('reviews.happy.customer', language),
      rating: 5,
      title: getTranslation('reviews.default.short.1.title', language),
      content: getTranslation('reviews.default.short.1.content', language),
      date: new Date(currentDate.getTime() - Math.random() * 20 * 24 * 60 * 60 * 1000).toLocaleDateString(language === 'da' ? 'da-DK' : language === 'no' ? 'nb-NO' : language === 'es' ? 'es-ES' : language === 'ch' ? 'de-CH' : 'en-GB'),
      verified: true,
      helpful: Math.floor(Math.random() * 20) + 3,
      size: undefined,
      images: []
    },
    // Short review 2
    {
      id: 'default-4',
      author: getTranslation('reviews.amazon.customer', language),
      rating: 4,
      title: getTranslation('reviews.default.short.2.title', language),
      content: getTranslation('reviews.default.short.2.content', language),
      date: new Date(currentDate.getTime() - Math.random() * 15 * 24 * 60 * 60 * 1000).toLocaleDateString(language === 'da' ? 'da-DK' : language === 'no' ? 'nb-NO' : language === 'es' ? 'es-ES' : language === 'ch' ? 'de-CH' : 'en-GB'),
      verified: true,
      helpful: Math.floor(Math.random() * 15) + 2,
      size: undefined,
      images: []
    }
  ];
}; 