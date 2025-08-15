import React, { useState } from 'react';
import { Star, ThumbsUp, X } from 'lucide-react';
import { getTranslation, getCountryConfig } from '../utils/translations';
import { useCountrySelector } from '../hooks/useCountrySelector';
import { useResolvedImage } from '../hooks/useResolvedImage';

interface Review {
  id: string | number;
  author: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  verified?: boolean;
  helpful?: number;
  size?: string;
  images?: string[];
}

interface ProductReviewsProps {
  reviews?: Review[];
  productRating?: number;
  totalReviewCount?: number;
}

// Helper component for resolved review images
const ResolvedReviewImage: React.FC<{
  src: string;
  alt: string;
  className: string;
  onClick?: () => void;
  onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
}> = ({ src, alt, className, onClick, onError }) => {
  const resolvedSrc = useResolvedImage(src);
  return (
    <img 
      src={resolvedSrc} 
      alt={alt} 
      className={className}
      onClick={onClick}
      onError={onError}
    />
  );
};

const ProductReviews: React.FC<ProductReviewsProps> = ({ reviews, productRating, totalReviewCount }) => {
  const { selectedCountry } = useCountrySelector();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  // Use provided reviews (which now include memoized default reviews from parent)
  const displayReviews = reviews || [];
  const displayRating = productRating || 4.5;

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? 'text-[#ffa41c] fill-[#ffa41c]' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  // Calculate rating breakdown based on actual reviews
  const calculateRatingBreakdown = () => {
    const breakdown = [
      { stars: 5, count: 0, percentage: 0 },
      { stars: 4, count: 0, percentage: 0 },
      { stars: 3, count: 0, percentage: 0 },
      { stars: 2, count: 0, percentage: 0 },
      { stars: 1, count: 0, percentage: 0 }
    ];

    displayReviews.forEach(review => {
      const starIndex = breakdown.findIndex(b => b.stars === review.rating);
      if (starIndex !== -1) {
        breakdown[starIndex].count++;
      }
    });

    // Calculate percentages
    const totalReviewsForBreakdown = displayReviews.length;
    breakdown.forEach(item => {
      item.percentage = totalReviewsForBreakdown > 0 ? Math.round((item.count / totalReviewsForBreakdown) * 100) : 0;
    });

    return breakdown; // 5-star first (no reverse needed)
  };

  // Filter reviews based on selected filter
  const filteredReviews = displayReviews.filter(review => {
    if (selectedFilter === 'verified') {
      return review.verified;
    }
    if (selectedFilter === 'images') {
      return review.images && review.images.length > 0;
    }
    return true; // 'all'
  });

  // Get all review images for the gallery
    const reviewImages = displayReviews.flatMap(review =>
    review.images ? review.images.map(img => ({ image: img, review })) : []
  );

  const ratingBreakdown = calculateRatingBreakdown();
  const totalReviews = displayReviews.length;

  return (
    <div className="mt-8 border-t border-gray-300 pt-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Rating Summary */}
        <div className="lg:col-span-1">
          <h2 className="text-xl font-medium mb-4">Customer reviews</h2>
          
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              {renderStars(displayRating)}
              <span className="text-sm">{getTranslation('reviews.out.of.stars', getCountryConfig(selectedCountry.code).language, { rating: displayRating })}</span>
            </div>
            <div className="text-sm text-gray-600">{getTranslation('product.global.ratings', getCountryConfig(selectedCountry.code).language, { count: (totalReviewCount || totalReviews).toLocaleString() })}</div>
          </div>

          <div className="space-y-2 mb-6">
            {ratingBreakdown.map((item) => (
              <div key={item.stars} className="flex items-center gap-2 text-sm">
                <span className="w-6">{item.stars}</span>
                <Star className="w-3 h-3 text-[#ffa41c] fill-[#ffa41c]" />
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-[#ffa41c] h-2 rounded-full" 
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <span className="w-8 text-right">{item.percentage}%</span>
              </div>
            ))}
          </div>

                      <div className="text-sm space-y-1">
              <div className="text-gray-600">{getTranslation('reviews.how.work', getCountryConfig(selectedCountry.code).language)}</div>
            </div>

          {/* Reviews with Images Gallery */}
          {reviewImages.length > 0 && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium">{getTranslation('reviews.with.images', getCountryConfig(selectedCountry.code).language)}</h3>
                <button className="text-[#007185] hover:underline text-sm">{getTranslation('reviews.see.all', getCountryConfig(selectedCountry.code).language)}</button>
              </div>
              
              <div className="flex gap-3 overflow-x-auto pb-2">
                {reviewImages.slice(0, 6).map((item, idx) => (
                  <ResolvedReviewImage
                    key={idx}
                    src={item.image} 
                    alt="Customer review" 
                    className="w-20 h-20 object-contain rounded cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0"
                    onClick={() => {
                      setSelectedImage(item.image);
                      setSelectedReview(item.review);
                    }}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Individual Reviews */}
        <div className="lg:col-span-2">
          <div className="flex flex-wrap gap-2 mb-6">
            <button 
              className={`px-3 py-1 text-sm border rounded-full ${
                selectedFilter === 'all' ? 'border-gray-800 bg-gray-100' : 'border-gray-300'
              }`}
              onClick={() => setSelectedFilter('all')}
            >
              {getTranslation('product.all.reviews', getCountryConfig(selectedCountry.code).language)}
            </button>
            <button 
              className={`px-3 py-1 text-sm border rounded-full ${
                selectedFilter === 'verified' ? 'border-gray-800 bg-gray-100' : 'border-gray-300'
              }`}
              onClick={() => setSelectedFilter('verified')}
            >
              {getTranslation('reviews.verified.purchase.only', getCountryConfig(selectedCountry.code).language)}
            </button>
            <button 
              className={`px-3 py-1 text-sm border rounded-full ${
                selectedFilter === 'images' ? 'border-gray-800 bg-gray-100' : 'border-gray-300'
              }`}
              onClick={() => setSelectedFilter('images')}
            >
              {getTranslation('reviews.with.images', getCountryConfig(selectedCountry.code).language)}
            </button>
          </div>

          <div className="space-y-6">
            {filteredReviews.map((review) => (
              <div key={review.id} className="border-b border-gray-200 pb-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium">{review.author.charAt(0)}</span>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{review.author}</span>
                      {review.verified && (
                        <span className="text-xs text-[#007185]">{getTranslation('product.verified.purchase', getCountryConfig(selectedCountry.code).language)}</span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 mb-2">
                      {renderStars(review.rating)}
                      <span className="font-medium text-sm">{review.title}</span>
                    </div>
                    
                    <div className="text-xs text-gray-600 mb-2">
                      {getTranslation('reviews.reviewed.in', getCountryConfig(selectedCountry.code).language, { country: getCountryConfig(selectedCountry.code).name, date: review.date })}
                    </div>
                    
                    {review.size && (
                      <div className="text-xs text-gray-600 mb-2">
                        Colour: {review.size} | Style: Modern
                      </div>
                    )}
                    
                    <p className="text-sm mb-3">{review.content}</p>
                    
                    {review.images && review.images.length > 0 && (
                      <div className="flex gap-2 mb-3">
                        {review.images.map((img, idx) => (
                          <ResolvedReviewImage
                            key={idx} 
                            src={img} 
                            alt="Review" 
                            className="w-16 h-16 object-contain rounded border cursor-pointer hover:opacity-80 transition-opacity" 
                            onClick={() => {
                              setSelectedImage(img);
                              setSelectedReview(review);
                            }}
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        ))}
                      </div>
                    )}
                    
                    <div className="flex items-center gap-4 text-sm">
                      <button className="flex items-center gap-1 text-gray-600 hover:text-gray-800">
                        <ThumbsUp className="w-3 h-3" />
                        {getTranslation('reviews.helpful', getCountryConfig(selectedCountry.code).language, { count: review.helpful || 0 })}
                      </button>
                      <button className="text-[#007185] hover:underline">{getTranslation('reviews.report', getCountryConfig(selectedCountry.code).language)}</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6">
            <button className="text-[#007185] hover:underline font-medium">
              {getTranslation('reviews.see.all', getCountryConfig(selectedCountry.code).language)}
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => {
            setSelectedImage(null);
            setSelectedReview(null);
          }}
        >
          <div className="relative max-w-4xl max-h-full bg-white rounded-lg overflow-hidden">
            <button 
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 z-10 bg-white rounded-full p-1 shadow-lg"
              onClick={() => {
                setSelectedImage(null);
                setSelectedReview(null);
              }}
            >
              <X className="w-5 h-5" />
            </button>
            
            {/* Review Details */}
            {selectedReview && (
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium">{selectedReview.author.charAt(0)}</span>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{selectedReview.author}</span>
                      {selectedReview.verified && (
                        <span className="text-xs text-[#007185]">{getTranslation('product.verified.purchase', getCountryConfig(selectedCountry.code).language)}</span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 mb-2">
                      {renderStars(selectedReview.rating)}
                      <span className="font-medium text-sm">{selectedReview.title}</span>
                    </div>
                    
                    <div className="text-xs text-gray-600 mb-2">
                      {getTranslation('reviews.reviewed.in', getCountryConfig(selectedCountry.code).language, { country: getCountryConfig(selectedCountry.code).name, date: selectedReview.date })}
                    </div>
                    
                    <p className="text-sm text-gray-700">{selectedReview.content}</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Image */}
            <div className="p-6">
              <ResolvedReviewImage
                src={selectedImage || '/placeholder.svg'} 
                alt="Fullscreen review" 
                className="max-w-full max-h-[70vh] object-contain mx-auto"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductReviews;