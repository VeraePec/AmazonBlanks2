import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { useCountrySelector } from '../hooks/useCountrySelector';
import { getTranslation, getCountryConfig, formatPrice } from '../utils/translations';
import { ArrowLeft, Copy, Eye, ExternalLink, Globe, Search, Filter, Package, Grid3X3, List, CheckCircle, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AdCopy {
  id: string;
  productName: string;
  headline: string;
  copy: string;
  createdAt: string;
  originalLanguage: string;
  productImage?: string;
  productUrl?: string;
  simplifiedName?: string;
  isLaunched?: boolean;
  productImages?: string[];
  reviewImages?: string[];
}

const FacebookAdsPage: React.FC = () => {
  const { selectedCountry, setSelectedCountry } = useCountrySelector();
  const [adCopies, setAdCopies] = useState<AdCopy[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState(selectedCountry.code);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [filterByDate, setFilterByDate] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [launchFilter, setLaunchFilter] = useState('all'); // 'all', 'launched', 'needs_launch'
  const [copyNotification, setCopyNotification] = useState<{ message: string; type: 'success' | 'info' } | null>(null);
  const [productFilter, setProductFilter] = useState('all'); // 'all', 'storage', 'garden', 'kitchen', 'bathroom', 'bedroom'
  const [lengthFilter, setLengthFilter] = useState('all'); // 'all', 'short', 'medium', 'long'
  const [performanceFilter, setPerformanceFilter] = useState('all'); // 'all', 'high', 'medium', 'low'
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<number>(0);

  // Load ad copies from localStorage and enrich with product data
  useEffect(() => {
    const loadAdCopiesWithProductData = async () => {
              const savedAdCopies = localStorage.getItem('facebookAdCopies');
        if (savedAdCopies) {
          const adCopies = JSON.parse(savedAdCopies);
          
          // Filter ad copies based on selected language/country
          const filteredAdCopies = adCopies.filter((adCopy: AdCopy) => {
            // If it's a country-specific ad copy, check if it matches the selected language
            if (adCopy.id.includes('-')) {
              const countryCode = adCopy.id.split('-').pop();
              return countryCode === selectedLanguage;
            }
            // If it's a general ad copy, include it for all languages
            return true;
          });
          
          console.log(`🔍 Filtered ad copies for ${selectedLanguage}:`, filteredAdCopies.length, 'out of', adCopies.length);
          
          // Enrich ad copies with product data from dynamic registry
          const enrichedAdCopies = await Promise.all(
            filteredAdCopies.map(async (adCopy: AdCopy) => {
            try {
              // Try to get product data from dynamic registry
              const { getDynamicProduct } = await import('../utils/dynamicProductRegistry');
              const productData = getDynamicProduct(adCopy.id);
              
              if (productData) {
                // Resolve image if it's an idb-ref
                let productImage = productData.images?.[0];
                if (productImage && productImage.startsWith('idb-ref:')) {
                  const { imageStorage } = await import('../utils/imageStorage');
                  const resolvedImages = await imageStorage.resolveImageUrlsAsync([productImage]);
                  productImage = resolvedImages[0] || '/placeholder.svg';
                }
                
                // Get all product images
                let productImages = productData.images || [];
                if (productImages.length > 0 && productImages[0].startsWith('idb-ref:')) {
                  const { imageStorage } = await import('../utils/imageStorage');
                  productImages = await imageStorage.resolveImageUrlsAsync(productImages);
                }
                
                // Get review images
                const reviewImages: string[] = [];
                if (productData.reviews && Array.isArray(productData.reviews)) {
                  for (const review of productData.reviews) {
                    if (review.images && Array.isArray(review.images)) {
                      for (const img of review.images) {
                        if (img && typeof img === 'string') {
                          let resolvedImg = img;
                          if (img.startsWith('idb-ref:')) {
                            const { imageStorage } = await import('../utils/imageStorage');
                            const resolved = await imageStorage.resolveImageUrlsAsync([img]);
                            resolvedImg = resolved[0] || img;
                          }
                          reviewImages.push(resolvedImg);
                        }
                      }
                    }
                  }
                }
                
                return {
                  ...adCopy,
                  productImage: productImages[0] || '/placeholder.svg',
                  productImages,
                  reviewImages,
                  productUrl: `${window.location.origin}${productData.route}`,
                  simplifiedName: simplifyProductName(productData.name)
                };
              }
            } catch (error) {
              console.warn('Failed to load product data for ad copy:', adCopy.id);
            }
            
            return {
              ...adCopy,
              productImage: '/placeholder.svg',
              productImages: [],
              reviewImages: [],
              productUrl: `${window.location.origin}/${adCopy.id}`,
              simplifiedName: simplifyProductName(adCopy.productName)
            };
          })
        );
        
        setAdCopies(enrichedAdCopies);
      }
    };
    
    loadAdCopiesWithProductData();
  }, [selectedLanguage]);

  // Function to simplify product names for ad naming
  const simplifyProductName = (name: string): string => {
    return name
      .replace(/Amazon\s+Basics\s+/gi, '')
      .replace(/\b(Storage|Organizer|Cabinet|Chest|Box|Unit|Set|Pack)\b/gi, '')
      .replace(/\b\d+[L|l|cm|kg|W|inch|ft]\b/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .split(' ')
      .slice(0, 3)
      .join(' ');
  };

  // Update language when country changes
  useEffect(() => {
    setSelectedLanguage(selectedCountry.code);
  }, [selectedCountry]);

  // Language options
  const languageOptions = [
    { code: 'gb', name: 'English (UK)', flag: '🇬🇧', currency: 'GBP' },
    { code: 'dk', name: 'Dansk (DK)', flag: '🇩🇰', currency: 'DKK' },
    { code: 'no', name: 'Norsk (NO)', flag: '🇳🇴', currency: 'NOK' },
    { code: 'es', name: 'Español (ES)', flag: '🇪🇸', currency: 'EUR' },
    { code: 'ch', name: 'Deutsch (CH)', flag: '🇨🇭', currency: 'CHF' }
  ];

  // Translate ad copy based on selected language
  const translateAdCopy = (copy: string, headline: string, productName: string, targetLang: string) => {
    if (targetLang === 'gb') {
      return { headline, copy };
    }

    // Translation mappings for common phrases and Keter Storage Shed specific content
    const translations = {
      dk: {
        // Headlines
        'Amazing Amazon Deal!': 'Fantastisk Amazon Tilbud!',
        'Clearance Sale Find!': 'Udsalgs Fund!',
        'Secret Amazon Sale!': 'Hemmelig Amazon Udsalg!',
        'Limited Time Deal!': 'Begrænset Tid Tilbud!',
        'Honestly didn\'t expect this quality': 'Ærligt talt forventede jeg ikke denne kvalitet',
        '£9.99 well spent': '£9.99 godt brugt',
        
        // Ad copy phrases
        'Just snagged this': 'Har lige snuppet denne',
        'from Amazon for only': 'fra Amazon for kun',
        'originally': 'oprindeligt',
        'Amazon has these secret clearance sales': 'Amazon har disse hemmelige udsalg',
        'that most people don\'t know about': 'som de fleste ikke ved om',
        'I couldn\'t believe the price': 'Jeg kunne ikke tro prisen',
        'Grabbed it before it sold out': 'Tog den før den blev udsolgt',
        'Link in comments': 'Link i kommentarerne',
        'Thank me later': 'Tak mig senere',
        'Still available': 'Stadig tilgængelig',
        'Hurry before it\'s gone': 'Skynd dig før den forsvinder',
        
        // Keter Storage Shed specific translations
        'Wasn\'t planning to buy anything, but saw this Keter Store it Out Nova Outdoor Garden Storage Shed for £9.99 and couldn\'t resist': 'Planlagde ikke at købe noget, men så denne Keter Store it Out Nova Udendørs Have Opbevaring Skur for £9.99 og kunne ikke modstå',
        'Best impulse buy I\'ve made in ages': 'Bedste impulsindkøb jeg har lavet i årevis',
        'Quality is surprisingly good, and it\'s exactly what I needed': 'Kvaliteten er overraskende god, og det er præcis hvad jeg havde brug for',
        'Arrived quickly, easy to set up, and it\'s been working perfectly': 'Ankom hurtigt, nem at sætte op, og det har fungeret perfekt',
        'The design is clean and modern, not cheap-looking like some budget items': 'Designet er rent og moderne, ikke billigt udseende som nogle budgetvarer',
        'Really happy with this purchase': 'Virkelig tilfreds med dette køb',
        'At this price, you can\'t go wrong': 'Til denne pris kan du ikke gå galt',
        'Grab it while it\'s still available': 'Snup den mens den stadig er tilgængelig',
        '£9.99 for this quality is mad': '£9.99 for denne kvalitet er vanvittigt',
        'Keter Store it Out Nova Outdoor Garden Storage Shed': 'Keter Store it Out Nova Udendørs Have Opbevaring Skur'
      },
      no: {
        // Headlines
        'Amazing Amazon Deal!': 'Fantastisk Amazon Tilbud!',
        'Clearance Sale Find!': 'Utsalgsfunn!',
        'Secret Amazon Sale!': 'Hemmelig Amazon Utsalg!',
        'Limited Time Deal!': 'Begrenset Tid Tilbud!',
        'Honestly didn\'t expect this quality': 'Ærlig talt forventet jeg ikke denne kvaliteten',
        '£9.99 well spent': '£9.99 godt brukt',
        
        // Ad copy phrases
        'Just snagged this': 'Har akkurat snappet denne',
        'from Amazon for only': 'fra Amazon for bare',
        'originally': 'opprinnelig',
        'Amazon has these secret clearance sales': 'Amazon har disse hemmelige utsalgene',
        'that most people don\'t know about': 'som de fleste ikke vet om',
        'I couldn\'t believe the price': 'Jeg kunne ikke tro prisen',
        'Grabbed it before it sold out': 'Tok den før den ble utsolgt',
        'Link in comments': 'Link i kommentarene',
        'Thank me later': 'Takk meg senere',
        'Still available': 'Fortsatt tilgjengelig',
        'Hurry before it\'s gone': 'Skynd deg før den forsvinner',
        
        // Keter Storage Shed specific translations
        'Wasn\'t planning to buy anything, but saw this Keter Store it Out Nova Outdoor Garden Storage Shed for £9.99 and couldn\'t resist': 'Planla ikke å kjøpe noe, men så denne Keter Store it Out Nova Utenomhus Hage Oppbevaring Skur for £9.99 og kunne ikke motstå',
        'Best impulse buy I\'ve made in ages': 'Beste impulsinnkjøp jeg har gjort på årevis',
        'Quality is surprisingly good, and it\'s exactly what I needed': 'Kvaliteten er overraskende god, og det er akkurat det jeg trengte',
        'Arrived quickly, easy to set up, and it\'s been working perfectly': 'Ankom raskt, enkelt å sette opp, og det har fungert perfekt',
        'The design is clean and modern, not cheap-looking like some budget items': 'Designet er rent og moderne, ikke billig utseende som noen budgetvarer',
        'Really happy with this purchase': 'Virkelig fornøyd med dette kjøpet',
        'At this price, you can\'t go wrong': 'Til denne prisen kan du ikke gå galt',
        'Grab it while it\'s still available': 'Ta den mens den fortsatt er tilgjengelig',
        '£9.99 for this quality is mad': '£9.99 for denne kvaliteten er galskap',
        'Keter Store it Out Nova Outdoor Garden Storage Shed': 'Keter Store it Out Nova Utenomhus Hage Oppbevaring Skur'
      },
      es: {
        // Headlines
        'Amazing Amazon Deal!': '¡Oferta Increíble de Amazon!',
        'Clearance Sale Find!': '¡Hallazgo de Liquidación!',
        'Secret Amazon Sale!': '¡Venta Secreta de Amazon!',
        'Limited Time Deal!': '¡Oferta por Tiempo Limitado!',
        'Honestly didn\'t expect this quality': 'Honestamente no esperaba esta calidad',
        '£9.99 well spent': '£9.99 bien gastado',
        
        // Ad copy phrases
        'Just snagged this': 'Acabo de conseguir esto',
        'from Amazon for only': 'de Amazon por solo',
        'originally': 'originalmente',
        'Amazon has these secret clearance sales': 'Amazon tiene estas ventas secretas de liquidación',
        'that most people don\'t know about': 'que la mayoría de la gente no conoce',
        'I couldn\'t believe the price': 'No podía creer el precio',
        'Grabbed it before it sold out': 'Lo agarré antes de que se agotara',
        'Link in comments': 'Enlace en los comentarios',
        'Thank me later': 'Agradéceme después',
        'Still available': 'Todavía disponible',
        'Hurry before it\'s gone': 'Date prisa antes de que se vaya',
        
        // Keter Storage Shed specific translations
        'Wasn\'t planning to buy anything, but saw this Keter Store it Out Nova Outdoor Garden Storage Shed for £9.99 and couldn\'t resist': 'No planeaba comprar nada, pero vi este Keter Store it Out Nova Cobertizo de Almacenamiento de Jardín Exterior por £9.99 y no pude resistir',
        'Best impulse buy I\'ve made in ages': 'La mejor compra por impulso que he hecho en años',
        'Quality is surprisingly good, and it\'s exactly what I needed': 'La calidad es sorprendentemente buena, y es exactamente lo que necesitaba',
        'Arrived quickly, easy to set up, and it\'s been working perfectly': 'Llegó rápidamente, fácil de configurar, y ha estado funcionando perfectamente',
        'The design is clean and modern, not cheap-looking like some budget items': 'El diseño es limpio y moderno, no se ve barato como algunos artículos de presupuesto',
        'Really happy with this purchase': 'Realmente feliz con esta compra',
        'At this price, you can\'t go wrong': 'A este precio, no puedes equivocarte',
        'Grab it while it\'s still available': 'Agárralo mientras aún esté disponible',
        '£9.99 for this quality is mad': '£9.99 por esta calidad es una locura',
        'Keter Store it Out Nova Outdoor Garden Storage Shed': 'Keter Store it Out Nova Cobertizo de Almacenamiento de Jardín Exterior'
      },
      ch: {
        // Headlines
        'Amazing Amazon Deal!': 'Unglaubliches Amazon Angebot!',
        'Clearance Sale Find!': 'Ausverkaufs-Fund!',
        'Secret Amazon Sale!': 'Geheimer Amazon Ausverkauf!',
        'Limited Time Deal!': 'Zeitlich begrenztes Angebot!',
        'Honestly didn\'t expect this quality': 'Ehrlich gesagt habe ich diese Qualität nicht erwartet',
        '£9.99 well spent': '£9.99 gut investiert',
        
        // Ad copy phrases
        'Just snagged this': 'Habe gerade das hier geschnappt',
        'from Amazon for only': 'von Amazon für nur',
        'originally': 'ursprünglich',
        'Amazon has these secret clearance sales': 'Amazon hat diese geheimen Ausverkäufe',
        'that most people don\'t know about': 'von denen die meisten nichts wissen',
        'I couldn\'t believe the price': 'Ich konnte den Preis nicht glauben',
        'Grabbed it before it sold out': 'Habe es geholt bevor es ausverkauft war',
        'Link in comments': 'Link in den Kommentaren',
        'Thank me later': 'Dankt mir später',
        'Still available': 'Noch verfügbar',
        'Hurry before it\'s gone': 'Beeilt euch bevor es weg ist',
        
        // Keter Storage Shed specific translations
        'Wasn\'t planning to buy anything, but saw this Keter Store it Out Nova Outdoor Garden Storage Shed for £9.99 and couldn\'t resist': 'Hatte nicht vor, etwas zu kaufen, aber sah diesen Keter Store it Out Nova Außen-Garten-Lagerschuppen für £9.99 und konnte nicht widerstehen',
        'Best impulse buy I\'ve made in ages': 'Der beste Impulskauf, den ich seit Jahren gemacht habe',
        'Quality is surprisingly good, and it\'s exactly what I needed': 'Die Qualität ist überraschend gut und es ist genau das, was ich brauchte',
        'Arrived quickly, easy to set up, and it\'s been working perfectly': 'Kam schnell an, einfach aufzubauen und funktioniert perfekt',
        'The design is clean and modern, not cheap-looking like some budget items': 'Das Design ist sauber und modern, sieht nicht billig aus wie einige Budget-Artikel',
        'Really happy with this purchase': 'Wirklich zufrieden mit diesem Kauf',
        'At this price, you can\'t go wrong': 'Zu diesem Preis kann nichts schiefgehen',
        'Grab it while it\'s still available': 'Schnapp es dir, solange es noch verfügbar ist',
        '£9.99 for this quality is mad': '£9.99 für diese Qualität ist verrückt',
        'Keter Store it Out Nova Outdoor Garden Storage Shed': 'Keter Store it Out Nova Außen-Garten-Lagerschuppen'
      }
    };

    // Simple translation replacement
    let translatedHeadline = headline;
    let translatedCopy = copy;

    const langTranslations = translations[targetLang as keyof typeof translations];
    if (langTranslations) {
      // Translate headline
      Object.entries(langTranslations).forEach(([english, translated]) => {
        translatedHeadline = translatedHeadline.replace(new RegExp(english, 'gi'), translated);
      });

      // Translate copy
      Object.entries(langTranslations).forEach(([english, translated]) => {
        translatedCopy = translatedCopy.replace(new RegExp(english, 'gi'), translated);
      });

      // Update currency
      translatedCopy = translatedCopy.replace(/£9\.99/g, formatPrice('9.99', targetLang));
      translatedCopy = translatedCopy.replace(/£\d+\.?\d*/g, (match) => {
        const number = match.replace('£', '');
        return formatPrice(number, targetLang);
      });
    }

    return { headline: translatedHeadline, copy: translatedCopy };
  };

  // Filter and sort ad copies
  const filteredAndSortedAdCopies = React.useMemo(() => {
    const filtered = adCopies.filter(adCopy => {
      // Search filter
      const matchesSearch = 
        adCopy.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        adCopy.simplifiedName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        adCopy.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        adCopy.copy.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Date filter
      const now = new Date();
      const adDate = new Date(adCopy.createdAt);
      const daysDiff = Math.floor((now.getTime() - adDate.getTime()) / (1000 * 60 * 60 * 24));
      
      const matchesDate = filterByDate === 'all' || 
        (filterByDate === 'today' && daysDiff === 0) ||
        (filterByDate === 'week' && daysDiff <= 7) ||
        (filterByDate === 'month' && daysDiff <= 30);

      // Launch filter
      const matchesLaunch = launchFilter === 'all' ||
        (launchFilter === 'launched' && adCopy.isLaunched) ||
        (launchFilter === 'needs_launch' && !adCopy.isLaunched);
      
      // Product category filter
      const matchesProduct = productFilter === 'all' || 
        adCopy.productName.toLowerCase().includes(productFilter.toLowerCase());
      
      // Length filter
      const matchesLength = lengthFilter === 'all' || (() => {
        const wordCount = adCopy.copy.split(' ').length;
        if (lengthFilter === 'short') return wordCount <= 50;
        if (lengthFilter === 'medium') return wordCount > 50 && wordCount <= 100;
        if (lengthFilter === 'long') return wordCount > 100;
        return true;
      })();
      
      // Performance filter (based on length and engagement potential)
      const matchesPerformance = performanceFilter === 'all' || (() => {
        const wordCount = adCopy.copy.split(' ').length;
        const hasUrgency = adCopy.copy.toLowerCase().includes('hurry') || 
                          adCopy.copy.toLowerCase().includes('limited') ||
                          adCopy.copy.toLowerCase().includes('sale');
        
        if (performanceFilter === 'high') return wordCount >= 80 && hasUrgency;
        if (performanceFilter === 'medium') return wordCount >= 50 && wordCount < 80;
        if (performanceFilter === 'low') return wordCount < 50;
        return true;
      })();
      
      return matchesSearch && matchesDate && matchesLaunch && matchesProduct && matchesLength && matchesPerformance;
    });

    // Sort results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'name':
          return (a.simplifiedName || a.productName).localeCompare(b.simplifiedName || b.productName);
        case 'length':
          return b.copy.split(' ').length - a.copy.split(' ').length;
        case 'performance': {
          const aScore = (a.copy.split(' ').length * 0.3) + (a.isLaunched ? 10 : 0);
          const bScore = (b.copy.split(' ').length * 0.3) + (b.isLaunched ? 10 : 0);
          return bScore - aScore;
        }
        default:
          return 0;
      }
    });

    return filtered;
  }, [adCopies, searchQuery, sortBy, filterByDate, launchFilter, productFilter, lengthFilter, performanceFilter]);

  const copyToClipboard = async (text: string, label: string = 'Text') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyNotification({
        message: `${label} copied to clipboard!`,
        type: 'success'
      });
      
      // Auto-hide notification after 3 seconds
      setTimeout(() => {
        setCopyNotification(null);
      }, 3000);
    } catch (err) {
      setCopyNotification({
        message: 'Failed to copy to clipboard',
        type: 'info'
      });
      
      setTimeout(() => {
        setCopyNotification(null);
      }, 3000);
    }
  };

  const toggleLaunchStatus = (adCopyId: string) => {
    const updatedAdCopies = adCopies.map(adCopy => 
      adCopy.id === adCopyId 
        ? { ...adCopy, isLaunched: !adCopy.isLaunched }
        : adCopy
    );
    
    setAdCopies(updatedAdCopies);
    localStorage.setItem('facebookAdCopies', JSON.stringify(updatedAdCopies));
  };
  
  const handleDownloadCreatives = async (adCopy: AdCopy) => {
    if (!adCopy.productImages || adCopy.productImages.length === 0) {
      setCopyNotification({
        message: 'No images available for this product',
        type: 'info'
      });
      setTimeout(() => setCopyNotification(null), 3000);
      return;
    }
    
    try {
      setDownloadingId(adCopy.id);
      setDownloadProgress(0);
      
      const { downloadProductCreatives } = await import('../utils/downloadImages');
      
      await downloadProductCreatives(
        adCopy.productName,
        {
          productImages: adCopy.productImages || [],
          reviewImages: adCopy.reviewImages || []
        },
        (progress) => setDownloadProgress(progress)
      );
      
      setCopyNotification({
        message: 'Creatives downloaded successfully!',
        type: 'success'
      });
      setTimeout(() => setCopyNotification(null), 3000);
    } catch (error) {
      console.error('Error downloading creatives:', error);
      setCopyNotification({
        message: 'Failed to download creatives',
        type: 'info'
      });
      setTimeout(() => setCopyNotification(null), 3000);
    } finally {
      setDownloadingId(null);
      setDownloadProgress(0);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      <Header />
      
      {/* Copy Notification */}
      {copyNotification && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right-2 duration-300">
          <div className={`px-6 py-4 rounded-2xl shadow-lg border backdrop-blur-sm ${
            copyNotification.type === 'success' 
              ? 'bg-green-50/90 border-green-200 text-green-800' 
              : 'bg-blue-50/90 border-blue-200 text-blue-800'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                copyNotification.type === 'success' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-blue-500 text-white'
              }`}>
                {copyNotification.type === 'success' ? '✓' : 'ℹ'}
              </div>
              <span className="font-medium">{copyNotification.message}</span>
            </div>
          </div>
        </div>
      )}
      
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Link to="/admin-dashboard" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-3 py-2 rounded-lg transition-all duration-200">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
          </div>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <ExternalLink className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  Facebook Ads Studio
                </h1>
                <p className="text-gray-600 text-lg">Manage your generated ad copies and headlines</p>
              </div>
            </div>
            
            {/* Language Selector */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-blue-100 rounded-xl flex items-center justify-center">
                <Globe className="w-5 h-5 text-blue-600" />
              </div>
              <select
                value={selectedLanguage}
                onChange={(e) => {
                  setSelectedLanguage(e.target.value);
                  const selectedOption = languageOptions.find(opt => opt.code === e.target.value) || languageOptions[0];
                  setSelectedCountry(selectedOption);
                }}
                className="border-2 border-gray-200 rounded-xl px-4 py-3 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200 font-medium"
              >
                {languageOptions.map((option) => (
                  <option key={option.code} value={option.code}>
                    {option.flag} {option.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <ExternalLink className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{adCopies.length}</p>
                <p className="text-sm text-gray-600">Total Ad Copies</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{adCopies.filter(ad => ad.isLaunched).length}</p>
                <p className="text-sm text-gray-600">Launched</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{adCopies.filter(ad => !ad.isLaunched).length}</p>
                <p className="text-sm text-gray-600">Pending Launch</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{languageOptions.length}</p>
                <p className="text-sm text-gray-600">Languages</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-8 mb-8">
          <div className="flex flex-col gap-6">
            {/* Top Row: Search and View Mode */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search ad copies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200 text-base"
                />
              </div>
              
              {/* View Mode Toggle */}
              <div className="flex border-2 border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-3 flex items-center gap-2 text-sm font-medium transition-all duration-200 ${
                    viewMode === 'grid'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-3 flex items-center gap-2 text-sm font-medium transition-all duration-200 ${
                    viewMode === 'list'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <List className="w-4 h-4" />
                  List
                </button>
              </div>
            </div>
            
            {/* Bottom Row: Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border-2 border-gray-200 rounded-xl px-4 py-3 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200 font-medium"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name">Product Name</option>
                <option value="length">Length (Long to Short)</option>
                <option value="performance">Performance Score</option>
              </select>
              
              <select
                value={filterByDate}
                onChange={(e) => setFilterByDate(e.target.value)}
                className="border-2 border-gray-200 rounded-xl px-4 py-3 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200 font-medium"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
              
              <select
                value={launchFilter}
                onChange={(e) => setLaunchFilter(e.target.value)}
                className="border-2 border-gray-200 rounded-xl px-4 py-3 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200 font-medium"
              >
                <option value="all">All Status</option>
                <option value="launched">Launched</option>
                <option value="needs_launch">Needs Launch</option>
              </select>

              <select
                value={productFilter}
                onChange={(e) => setProductFilter(e.target.value)}
                className="border-2 border-gray-200 rounded-xl px-4 py-3 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200 font-medium"
              >
                <option value="all">All Products</option>
                <option value="storage">Storage</option>
                <option value="garden">Garden</option>
                <option value="kitchen">Kitchen</option>
                <option value="bathroom">Bathroom</option>
                <option value="bedroom">Bedroom</option>
              </select>

              <select
                value={lengthFilter}
                onChange={(e) => setLengthFilter(e.target.value)}
                className="border-2 border-gray-200 rounded-xl px-4 py-3 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200 font-medium"
              >
                <option value="all">All Lengths</option>
                <option value="short">Short (50 words or less)</option>
                <option value="medium">Medium (51-100 words)</option>
                <option value="long">Long (over 100 words)</option>
              </select>

              <select
                value={performanceFilter}
                onChange={(e) => setPerformanceFilter(e.target.value)}
                className="border-2 border-gray-200 rounded-xl px-4 py-3 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200 font-medium"
              >
                <option value="all">All Performance</option>
                <option value="high">High (80+ words + urgency)</option>
                <option value="medium">Medium (50-79 words)</option>
                <option value="low">Low (under 50 words)</option>
              </select>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200/50">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-6">
                <span className="font-medium text-gray-600">
                  Showing {filteredAndSortedAdCopies.length} of {adCopies.length} ad copies
                </span>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>•</span>
                  <span>{filteredAndSortedAdCopies.filter(ad => ad.isLaunched).length} launched</span>
                  <span>•</span>
                  <span>{filteredAndSortedAdCopies.filter(ad => !ad.isLaunched).length} pending</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-3 py-2 rounded-lg transition-all duration-200 font-medium"
                  >
                    Clear search
                  </button>
                )}
                <button
                  onClick={() => {
                    const allText = filteredAndSortedAdCopies.map(ad => {
                      const translated = translateAdCopy(ad.copy, ad.headline, ad.productName, selectedLanguage);
                      return `${ad.productName}\n${translated.headline}\n${translated.copy}\n\n`;
                    }).join('---\n');
                    copyToClipboard(allText, 'All filtered ad copies');
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 text-sm font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  📋 Copy All Filtered
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Ad Copies Display */}
        {filteredAndSortedAdCopies.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-8">
              <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <ExternalLink className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">No Ad Copies Found</h3>
              <p className="text-gray-600 mb-8 text-lg">
                {searchQuery || filterByDate !== 'all' || launchFilter !== 'all'
                  ? 'Try adjusting your search or filters to see more results.'
                  : 'Start by creating products with the AI Product Builder to generate ad copies.'}
              </p>
              <Link
                to="/admin-dashboard"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Go to Product Builder
              </Link>
            </div>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 gap-6' : 'space-y-4'}>
            {filteredAndSortedAdCopies.map((adCopy) => {
              const translated = translateAdCopy(adCopy.copy, adCopy.headline, adCopy.productName, selectedLanguage);
              
              return (
                <div 
                  key={adCopy.id} 
                  className={`bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border-2 transition-all duration-200 hover:shadow-xl ${
                    adCopy.isLaunched 
                      ? 'border-green-400 shadow-green-100/50' 
                      : 'border-gray-200/50 hover:border-gray-300'
                  } ${viewMode === 'grid' ? 'p-8' : 'p-6'}`}
                >
                  {/* Product Header with Image */}
                  <div className={`flex items-start gap-6 ${viewMode === 'grid' ? 'mb-8' : 'mb-6'}`}>
                    <div className={`bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-2xl flex items-center justify-center flex-shrink-0 border border-gray-200/50 ${
                      viewMode === 'grid' ? 'w-20 h-20' : 'w-16 h-16'
                    }`}>
                      {adCopy.productImage ? (
                        <img 
                          src={adCopy.productImage} 
                          alt={adCopy.productName}
                          className="w-full h-full object-contain rounded-xl"
                          onError={(e) => {
                            e.currentTarget.src = '/placeholder.svg';
                          }}
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gradient-to-r from-gray-200 to-blue-200 rounded-xl flex items-center justify-center">
                          <Package className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-semibold text-gray-900 mb-3 truncate ${
                        viewMode === 'grid' ? 'text-lg' : 'text-base'
                      }`}>
                        {adCopy.productName}
                      </h3>
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`text-gray-600 ${viewMode === 'grid' ? 'text-sm' : 'text-xs'} font-medium`}>
                          Simplified: <span className="font-semibold text-gray-700">{adCopy.simplifiedName}</span>
                        </span>
                        <button
                          onClick={() => copyToClipboard(adCopy.simplifiedName || adCopy.productName, 'Simplified name')}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                          title="Copy simplified name"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center gap-3 mb-3">
                        {adCopy.productUrl && (
                          <a
                            href={adCopy.productUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-3 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 font-medium ${
                              viewMode === 'grid' ? 'text-sm' : 'text-xs'
                            }`}
                          >
                            <Eye className="w-4 h-4" />
                            View Product
                          </a>
                        )}
                        {adCopy.productUrl && (
                          <button
                            onClick={() => copyToClipboard(adCopy.productUrl || '', 'Product URL')}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                            title="Copy product URL"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      <div className="flex items-center gap-4">
                        <p className={`text-gray-500 ${viewMode === 'grid' ? 'text-sm' : 'text-xs'} font-medium`}>
                          Created {new Date(adCopy.createdAt).toLocaleDateString()}
                        </p>
                        
                        {/* Launched Status Checkbox */}
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={adCopy.isLaunched || false}
                            onChange={() => toggleLaunchStatus(adCopy.id)}
                            className="sr-only"
                          />
                          <div className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${
                            adCopy.isLaunched
                              ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-300 shadow-sm'
                              : 'bg-gradient-to-r from-gray-100 to-blue-100 text-gray-600 border border-gray-300 hover:from-gray-200 hover:to-blue-200'
                          }`}>
                            <CheckCircle className={`w-4 h-4 ${adCopy.isLaunched ? 'text-green-600' : 'text-gray-400'}`} />
                            {adCopy.isLaunched ? 'Launched' : 'Launch'}
                          </div>
                        </label>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => copyToClipboard(`${translated.headline}\n\n${translated.copy}`, 'Full ad copy')}
                        className="p-3 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200"
                        title="Copy all"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {viewMode === 'grid' ? (
                    <>
                      {/* Headline */}
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-3">
                          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                            Headline
                          </label>
                          <button
                            onClick={() => copyToClipboard(translated.headline, 'Headline')}
                            className="text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-3 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 font-medium"
                          >
                            <Copy className="w-3 h-3" />
                            Copy
                          </button>
                        </div>
                        <div className="bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-xl p-4 border border-gray-200/50">
                          <button
                            onClick={() => copyToClipboard(translated.headline, 'Headline')}
                            className="w-full text-left hover:bg-blue-50/50 rounded-lg p-2 transition-all duration-200 group"
                          >
                            <p className="font-semibold text-gray-900 text-lg group-hover:text-blue-700">{translated.headline}</p>
                            <div className="mt-2 text-xs text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              Click to copy headline
                            </div>
                          </button>
                        </div>
                      </div>

                      {/* Ad Copy */}
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-3">
                          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                            <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
                            Ad Copy
                          </label>
                          <button
                            onClick={() => copyToClipboard(translated.copy, 'Ad copy')}
                            className="text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-3 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 font-medium"
                          >
                            <Copy className="w-3 h-3" />
                            Copy
                          </button>
                        </div>
                        <div className="bg-gradient-to-r from-gray-50 to-green-50/30 rounded-xl p-5 border border-gray-200/50">
                          <button
                            onClick={() => copyToClipboard(translated.copy, 'Ad copy')}
                            className="w-full text-left hover:bg-green-50/50 rounded-lg p-2 transition-all duration-200 group"
                          >
                            <p className="text-gray-700 whitespace-pre-wrap text-base leading-relaxed group-hover:text-green-700">{translated.copy}</p>
                            <div className="mt-3 text-xs text-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              Click to copy ad copy
                            </div>
                          </button>
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div className="mt-6 pt-6 border-t border-gray-200/50">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-sm font-semibold text-gray-700">Quick Actions</h4>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          <button
                            onClick={() => copyToClipboard(translated.headline, 'Headline')}
                            className="px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border border-blue-200 rounded-xl hover:from-blue-100 hover:to-purple-100 hover:border-blue-300 transition-all duration-200 text-sm font-medium"
                          >
                            📋 Copy Headline
                          </button>
                          <button
                            onClick={() => copyToClipboard(translated.copy, 'Ad copy')}
                            className="px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border border-green-200 rounded-xl hover:from-green-100 hover:to-emerald-100 hover:border-green-300 transition-all duration-200 text-sm font-medium"
                          >
                            📝 Copy Ad Copy
                          </button>
                          <button
                            onClick={() => copyToClipboard(adCopy.simplifiedName || adCopy.productName, 'Simplified name')}
                            className="px-4 py-2 bg-gradient-to-r from-orange-50 to-red-50 text-orange-700 border border-orange-200 rounded-xl hover:from-orange-100 hover:to-red-100 hover:border-orange-300 transition-all duration-200 text-sm font-medium"
                          >
                            🏷️ Copy Name
                          </button>
                          {adCopy.productUrl && (
                            <button
                              onClick={() => copyToClipboard(adCopy.productUrl || '', 'Product URL')}
                              className="px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 border border-purple-200 rounded-xl hover:from-purple-100 hover:to-pink-100 hover:border-purple-300 transition-all duration-200 text-sm font-medium"
                            >
                              🔗 Copy URL
                            </button>
                          )}
                          <button
                            onClick={() => handleDownloadCreatives(adCopy)}
                            disabled={downloadingId === adCopy.id}
                            className="px-4 py-2 bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-700 border border-indigo-200 rounded-xl hover:from-indigo-100 hover:to-blue-100 hover:border-indigo-300 transition-all duration-200 text-sm font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {downloadingId === adCopy.id ? (
                              <>
                                <div className="animate-spin h-4 w-4 border-2 border-indigo-700 border-t-transparent rounded-full"></div>
                                <span>Downloading {Math.round(downloadProgress)}%</span>
                              </>
                            ) : (
                              <>
                                <Download className="w-4 h-4" />
                                <span>Download Creatives</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Currency Info */}
                      <div className="mt-4 pt-4 border-t border-gray-200/50">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 font-medium">
                            Language: {getCountryConfig(selectedLanguage).language.charAt(0).toUpperCase() + getCountryConfig(selectedLanguage).language.slice(1)} ({selectedLanguage.toUpperCase()})
                          </span>
                          <span className="text-gray-600 font-medium">
                            Currency: {getCountryConfig(selectedLanguage).currency}
                          </span>
                        </div>
                      </div>
                    </>
                  ) : (
                    /* List Mode - Condensed View */
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Headline */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-xs font-semibold text-gray-700 flex items-center gap-2">
                            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                            Headline
                          </label>
                                                      <button
                              onClick={() => copyToClipboard(translated.headline, 'Headline')}
                              className="text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-2 py-1 rounded-lg transition-all duration-200 flex items-center gap-1 font-medium"
                            >
                              <Copy className="w-3 h-3" />
                              Copy
                            </button>
                        </div>
                        <div className="bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-lg p-3 border border-gray-200/50">
                          <button
                            onClick={() => copyToClipboard(translated.headline, 'Headline')}
                            className="w-full text-left hover:bg-blue-50/50 rounded-lg p-1 transition-all duration-200 group"
                          >
                            <p className="font-semibold text-gray-900 text-sm group-hover:text-blue-700">{translated.headline}</p>
                          </button>
                        </div>
                      </div>

                      {/* Ad Copy Preview */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-xs font-semibold text-gray-700 flex items-center gap-2">
                            <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
                            Ad Copy Preview
                          </label>
                                                      <button
                              onClick={() => copyToClipboard(translated.copy, 'Ad copy')}
                              className="text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-2 py-1 rounded-lg transition-all duration-200 flex items-center gap-1 font-medium"
                            >
                              <Copy className="w-3 h-3" />
                              Copy Full
                            </button>
                        </div>
                        <div className="bg-gradient-to-r from-gray-50 to-green-50/30 rounded-lg p-3 border border-gray-200/50">
                          <button
                            onClick={() => copyToClipboard(translated.copy, 'Ad copy')}
                            className="w-full text-left hover:bg-green-50/50 rounded-lg p-1 transition-all duration-200 group"
                          >
                            <p className="text-gray-700 text-sm line-clamp-3 group-hover:text-green-700">
                              {translated.copy.length > 120 
                                ? `${translated.copy.substring(0, 120)}...`
                                : translated.copy
                              }
                            </p>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default FacebookAdsPage;
