import React, { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown, X } from 'lucide-react';

const SecuritySafeProductReviews = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedReview, setSelectedReview] = useState<any>(null);

  const reviews = [
    {
      id: 1,
      author: "RB",
      rating: 5,
      title: "Safe",
      content: "Good, Just as advertised",
      date: "5 July 2025",
      verified: true,
      helpful: 0,
      size: "60 L"
    },
    {
      id: 2,
      author: "mrs patricia best",
      rating: 5,
      title: "Good solid safe",
      content: "Great safe easy to use",
      date: "31 December 2024",
      verified: true,
      helpful: 0,
      size: "35 L"
    },
    {
      id: 3,
      author: "John Deehan",
      rating: 5,
      title: "Very happy with this purchase",
      content: "Excellent value product that arrived in perfect condition. The safe is well-built and the electronic keypad works flawlessly. Setup was straightforward and the mounting hardware is very sturdy. The fire resistance rating gives me confidence that my important documents are well protected. Great investment for home security!",
      date: "10 March 2025",
      verified: true,
      helpful: 1,
      size: "60 L"
    },
    {
      id: 4,
      author: "Amazon Customer",
      rating: 5,
      title: "Great so far",
      content: "Great product, works perfectly for my needs.",
      date: "30 November 2024",
      verified: true,
      helpful: 0,
      size: "35 L"
    },
    {
      id: 5,
      author: "Macerator",
      rating: 5,
      title: "Excellent quality and durability",
      content: "I've had this safe for over 12 months now and it's still working perfectly. The keypad is very responsive and the battery life is impressive. The build quality is excellent and it provides great peace of mind for storing important documents and valuables. Highly recommend!",
      date: "3 April 2025",
      verified: true,
      helpful: 1,
      size: "23.5 L"
    },
    {
      id: 6,
      author: "amcl94",
      rating: 5,
      title: "Great quality safe",
      content: "Simple to set up and get going in hardly any time. The safe is very high quality and weighty. All you need to do is add a 9V Alkaline battery and add your unique code to get set up. It comes with : - Mounting bolt. - 2 Backup keys.",
      date: "21 December 2020",
      verified: true,
      helpful: 5,
      size: "23.5 L"
    },
    {
      id: 7,
      author: "Mike",
      rating: 5,
      title: "Safe",
      content: "It does exactly as advertised",
      date: "18 December 2022",
      verified: true,
      helpful: 1,
      size: "35 L"
    },
    {
      id: 8,
      author: "It's me not u",
      rating: 4,
      title: "It's a safe that's safe",
      content: "No drama, works as expected.",
      date: "3 March 2025",
      verified: true,
      helpful: 0,
      size: "60 L"
    }
  ];

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

  const ratingBreakdown = [
    { stars: 5, count: 1726, percentage: 63 },
    { stars: 4, count: 521, percentage: 19 },
    { stars: 3, count: 164, percentage: 6 },
    { stars: 2, count: 110, percentage: 4 },
    { stars: 1, count: 219, percentage: 8 }
  ];

  return (
    <div className="mt-8 border-t border-gray-300 pt-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Rating Summary */}
        <div className="lg:col-span-1">
          <h2 className="text-xl font-medium mb-4">Customer reviews</h2>
          
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              {renderStars(4.2)}
              <span className="text-sm">4.2 out of 5</span>
            </div>
            <div className="text-sm text-gray-600">2,740 global ratings</div>
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
            <div className="text-gray-600">How customer reviews and ratings work</div>
          </div>

          {/* Reviews with Images Gallery */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium">Reviews with images</h3>
              <button className="text-[#007185] hover:underline text-sm">View all photos</button>
            </div>
            
            <div className="flex gap-3 overflow-x-auto pb-2">
              {/* No review images available for this product */}
            </div>
          </div>
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
              All reviews
            </button>
            <button 
              className={`px-3 py-1 text-sm border rounded-full ${
                selectedFilter === 'verified' ? 'border-gray-800 bg-gray-100' : 'border-gray-300'
              }`}
              onClick={() => setSelectedFilter('verified')}
            >
              Verified purchase only
            </button>
            <button 
              className={`px-3 py-1 text-sm border rounded-full ${
                selectedFilter === 'images' ? 'border-gray-800 bg-gray-100' : 'border-gray-300'
              }`}
              onClick={() => setSelectedFilter('images')}
            >
              With images
            </button>
          </div>

          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-200 pb-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium">{review.author.charAt(0)}</span>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{review.author}</span>
                      {review.verified && (
                        <span className="text-xs text-[#007185]">Verified Purchase</span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 mb-2">
                      {renderStars(review.rating)}
                      <span className="font-medium text-sm">{review.title}</span>
                    </div>
                    
                    <div className="text-xs text-gray-600 mb-2">
                      Reviewed in the United Kingdom on {review.date}
                    </div>
                    
                    {review.size && (
                      <div className="text-xs text-gray-600 mb-2">
                        Size: {review.size}
                      </div>
                    )}
                    
                    <p className="text-sm mb-3">{review.content}</p>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <button className="flex items-center gap-1 text-gray-600 hover:text-gray-800">
                        <ThumbsUp className="w-3 h-3" />
                        Helpful ({review.helpful})
                      </button>
                      <button className="text-[#007185] hover:underline">Report</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6">
            <button className="text-[#007185] hover:underline font-medium">
              See all reviews
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
          <div className="relative max-w-4xl w-full max-h-[90vh] bg-white rounded-lg overflow-hidden flex flex-col">
            <button 
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 z-10 bg-white rounded-full p-1 shadow-lg"
              onClick={() => {
                setSelectedImage(null);
                setSelectedReview(null);
              }}
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="flex-1 overflow-y-auto">
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
                          <span className="text-xs text-[#007185]">Verified Purchase</span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2 mb-2">
                        {renderStars(selectedReview.rating)}
                        <span className="font-medium text-sm">{selectedReview.title}</span>
                      </div>
                      
                      <div className="text-xs text-gray-600 mb-2">
                        Reviewed in the United Kingdom on {selectedReview.date}
                      </div>
                      
                      <p className="text-sm text-gray-700">{selectedReview.content}</p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Image */}
              <div className="p-6 flex justify-center">
                <img 
                  src={selectedImage} 
                  alt="Fullscreen review" 
                  className="max-w-full max-h-[60vh] object-contain"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecuritySafeProductReviews; 