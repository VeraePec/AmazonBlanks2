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
      date: new Date(currentDate.getTime() - 25 * 24 * 60 * 60 * 1000).toLocaleDateString(language === 'da' ? 'da-DK' : language === 'no' ? 'nb-NO' : language === 'es' ? 'es-ES' : language === 'ch' ? 'de-CH' : 'en-GB'),
      verified: true,
      helpful: 37,
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
      date: new Date(currentDate.getTime() - 42 * 24 * 60 * 60 * 1000).toLocaleDateString(language === 'da' ? 'da-DK' : language === 'no' ? 'nb-NO' : language === 'es' ? 'es-ES' : language === 'ch' ? 'de-CH' : 'en-GB'),
      verified: true,
      helpful: 24,
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
      date: new Date(currentDate.getTime() - 18 * 24 * 60 * 60 * 1000).toLocaleDateString(language === 'da' ? 'da-DK' : language === 'no' ? 'nb-NO' : language === 'es' ? 'es-ES' : language === 'ch' ? 'de-CH' : 'en-GB'),
      verified: true,
      helpful: 15,
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
      date: new Date(currentDate.getTime() - 12 * 24 * 60 * 60 * 1000).toLocaleDateString(language === 'da' ? 'da-DK' : language === 'no' ? 'nb-NO' : language === 'es' ? 'es-ES' : language === 'ch' ? 'de-CH' : 'en-GB'),
      verified: true,
      helpful: 8,
      size: undefined,
      images: []
    }
  ];
}; 