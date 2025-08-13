
import React from 'react';
import Header from '../components/Header';
import AmazonHero from '../components/AmazonHero';
import Footer from '../components/Footer';
import HomeShelf from '../components/HomeShelf';
import { getAllCollectionsWithCreated } from '../data/productRegistry';

const Index = () => {
  const [hydrateTick, setHydrateTick] = React.useState(0);

  // Recompute collections after unified storage hydration event
  React.useEffect(() => {
    const onHydrated = () => setHydrateTick((t) => t + 1);
    window.addEventListener('unified-storage-hydrated', onHydrated);
    return () => window.removeEventListener('unified-storage-hydrated', onHydrated);
  }, []);

  const collections = getAllCollectionsWithCreated();
  // Ensure a comprehensive set of potential collections exists even before products
  const desiredOrder = [
    // High-priority retail groupings
    'deals-today',
    'newcomers',
    'smart-storage-solutions',
    'storage-solutions',
    'garden-outdoor',
    'office-gaming',
    'cleaning-essentials',
    'bedroom-furniture',
    'home-kitchen',
    'electronics',
    'beauty-personal-care',
    'sports-outdoors',
    'toys-games',
    'automotive',
    'tools-home-improvement',
    'baby-nursery',
    'security-safety',
    'pet-supplies',
    'books-media',
  ];

  // Sort by product count desc first, then by desired order
  const sorted = [...collections]
    .sort((a, b) => b.products.length - a.products.length)
    .sort((a, b) => {
      const ai = desiredOrder.indexOf(a.id);
      const bi = desiredOrder.indexOf(b.id);
      if (ai === -1 && bi === -1) return 0;
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    });

  return (
    <div className="min-h-screen bg-[#eaeded]">
      <Header />
      <AmazonHero />
      {sorted.map(col => (
        col.products && col.products.length > 0 ? (
          <HomeShelf
            key={col.id}
            title={col.title}
            products={col.products.slice(0, 10)}
            seeMoreHref={`/collection/${col.id}`}
          />
        ) : null
      ))}
      <Footer />
    </div>
  );
};

export default Index;
