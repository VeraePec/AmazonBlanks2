import React from 'react';
import { useNavigate } from 'react-router-dom';
import Thumbnail from './Thumbnail';

export interface ShelfProduct {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  rating: number;
  reviews: number;
  image: string;
  images?: string[];
  prime?: boolean;
  amazonChoice?: boolean;
  route?: string;
}

interface HomeShelfProps {
  title: string;
  products: ShelfProduct[];
  seeMoreHref?: string;
}

const HomeShelf: React.FC<HomeShelfProps> = ({ title, products, seeMoreHref }) => {
  const navigate = useNavigate();

  if (!products || products.length === 0) return null;

  return (
    <section className="bg-white py-4 sm:py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">{title}</h2>
          {seeMoreHref && (
            <button onClick={() => navigate(seeMoreHref)} className="text-[#007185] hover:text-[#c7511f] hover:underline text-sm font-medium">See more</button>
          )}
        </div>

        <div className="flex overflow-x-auto gap-3 sm:gap-4 pb-3 scrollbar-hide scroll-smooth touch-pan-x">
          {products.map((product) => {
            const source = (product as any).images || product.image;
            return (
              <div
                key={product.id}
                className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow cursor-pointer flex-shrink-0 w-44 sm:w-56 lg:w-64"
                onClick={() => product.route && navigate(product.route)}
              >
                <div className="aspect-square mb-3 relative flex items-center justify-center bg-white border border-gray-200 rounded">
                  <Thumbnail source={source} alt={product.name} className="w-full h-full object-contain" />
                  {product.amazonChoice && (
                    <div className="absolute top-2 left-2">
                      <span className="bg-[#232f3e] text-white text-[10px] px-2 py-1 rounded font-bold">Amazon's Choice</span>
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <h3 className="text-xs sm:text-sm font-medium line-clamp-2 hover:text-[#c7511f] hover:underline">{product.name}</h3>
                  <div className="text-xs text-gray-600">({product.reviews.toLocaleString()})</div>
                  <div className="flex items-center gap-2">
                    <span className="text-base sm:text-lg font-bold text-gray-900">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-xs sm:text-sm text-gray-500 line-through">{product.originalPrice}</span>
                    )}
                  </div>
                  {product.prime && (
                    <span className="text-[11px] text-[#007185]">Prime</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HomeShelf;


