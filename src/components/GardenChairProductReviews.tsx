import React, { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown, X } from 'lucide-react';

const GardenChairProductReviews = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedReview, setSelectedReview] = useState<any>(null);

  const reviews = [
    {
      id: 1,
      author: "Jane",
      rating: 5,
      title: "Great for larger, taller people",
      content: "These are a great size for taller or larger people. I'm 5'2\" and my feet don't reach the floor. They fold easily, they're sturdy but lightweight. They're easy to adjust from upright to reclined and back. The armrests are wider than most and comfortable. It's basically plastic and mesh but despite lots of use over a few months they haven't sagged yet. They look more expensive than they are. My friend who is 5'10\" was impressed with the size/ comfort and also purchased a pair. Highly recommended.",
      date: "1 November 2022",
      verified: true,
      helpful: 7,
      style: "Pack of 2",
      image: "https://m.media-amazon.com/images/I/81L2xEZkgpL.jpg"
    },
    {
      id: 2,
      author: "ian lowry",
      rating: 5,
      title: "Very comfortable and sturdy",
      content: "We now have six of these. They are incredibly comfortable and well-built. The adjustable backrest works perfectly and the chairs are very sturdy. Perfect for outdoor use and they fold up easily for storage. Highly recommend!",
      date: "6 February 2025",
      verified: true,
      helpful: 0,
      style: "Pack of 2"
    },
    {
      id: 3,
      author: "PhilB",
      rating: 5,
      title: "Excellent comfortable and well-designed chairs",
      content: "These chairs are absolutely fantastic! They are very comfortable and well-designed. The adjustable backrest works perfectly and the chairs are incredibly sturdy. They fold up easily for storage and are perfect for outdoor use. The quality is excellent and they look great. Highly recommend for anyone looking for comfortable outdoor seating!",
      date: "18 September 2021",
      verified: true,
      helpful: 0,
      style: "Pack of 2"
    },
    {
      id: 4,
      author: "JH",
      rating: 5,
      title: "Excellent product",
      content: "Have only had them for a few days. My husband is particularly pleased as he's quite fussy with chairs. He's larger than average but the chairs seem to hold him fine. Sturdy. Light. Easy to fold and open. They can also stand folded on their own without leaning against anything which is another plus. Bought some chair side clips at the same time and they fit these chairs nicely. So far so good and think good value for money.",
      date: "5 March 2022",
      verified: true,
      helpful: 2,
      style: "Pack of 2",
      image: "https://m.media-amazon.com/images/I/91vgy04XU+L.jpg"
    },
    {
      id: 5,
      author: "SLW1976",
      rating: 5,
      title: "Great value chairs",
      content: "Update - we've now had these chairs for 2 years and continue to love them! They're sturdy and comfortable - a really good value purchase! These chairs arrived well packed and ready to go (no assembly necessary- hurrah!). They are well made, comfortable and have stood up to being rained on (it is the U.K. after all!). Love the multi position options. They're lightweight and are a great value option. A good £100 cheaper than the kettler alternatives I had been considering…now have 2 sets of these chairs and very happy.",
      date: "31 December 2021",
      verified: true,
      helpful: 2,
      style: "Pack of 2"
    },
    {
      id: 6,
      author: "Amparo Matley",
      rating: 5,
      title: "Adjustable, comfortable, sturdy",
      content: "Fine, comfortable chair. The adjustable backrest works perfectly and the chair is very sturdy. It's lightweight and easy to fold up for storage. Perfect for outdoor use and the quality is excellent. I wish there was a foot-stool one could attach to it to elevate the feet -- then it would be perfect.",
      date: "24 April 2024",
      verified: true,
      helpful: 0,
      style: "Pack of 2"
    },
    {
      id: 7,
      author: "conniewil",
      rating: 5,
      title: "Excellent well designed garden chairs",
      content: "These were bought to replace old plastic garden chairs several of which had collapsed dramatically! I would certainly not go back to those. Having initially bought two, we immediately ordered two more. These chairs are light weight, easy to unfold, comfortable and simple and attractive in design. An excellent buy.",
      date: "30 September 2023",
      verified: true,
      helpful: 1,
      style: "Pack of 2",
      image: "https://m.media-amazon.com/images/I/81EE4nyBkoL.jpg"
    },
    {
      id: 8,
      author: "Suebo",
      rating: 5,
      title: "Great",
      content: "These chairs are very comfortable and great value for money.....bought to replace same (but different brand) that have lasted for 15 years. Fine left out in rain. Although I would suggest if you are expecting or experiencing very windy weather to lay them down or stack them somewhere because they can blow about the garden as they are very lightweight. These are always also light enough to bung in the boot of your car and take on a day out....",
      date: "8 June 2022",
      verified: true,
      helpful: 2,
      style: "Pack of 2"
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
    { stars: 5, count: 1145, percentage: 76 },
    { stars: 4, count: 256, percentage: 17 },
    { stars: 3, count: 75, percentage: 5 },
    { stars: 2, count: 15, percentage: 1 },
    { stars: 1, count: 16, percentage: 1 }
  ];

  return (
    <div className="mt-8 border-t border-gray-300 pt-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Rating Summary */}
        <div className="lg:col-span-1">
          <h2 className="text-xl font-medium mb-4">Customer reviews</h2>
          
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              {renderStars(4.6)}
              <span className="text-sm">4.6 out of 5</span>
            </div>
            <div className="text-sm text-gray-600">1,507 global ratings</div>
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
              {reviews.filter(review => review.image).map((review) => (
                <div 
                  key={review.id}
                  className="flex-shrink-0 cursor-pointer"
                  onClick={() => {
                    setSelectedImage(review.image!);
                    setSelectedReview(review);
                  }}
                >
                  <img 
                    src={review.image} 
                    alt={`Review by ${review.author}`}
                    className="w-16 h-16 object-contain rounded border border-gray-200 hover:border-[#007185]"
                  />
                </div>
              ))}
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
                    
                    {review.style && (
                      <div className="text-xs text-gray-600 mb-2">
                        Style: {review.style}
                      </div>
                    )}
                    
                    <p className="text-sm mb-3">{review.content}</p>
                    
                    {review.image && (
                      <div className="mb-3">
                        <img 
                          src={review.image} 
                          alt={`Review by ${review.author}`}
                          className="w-20 h-20 object-contain rounded border border-gray-200 cursor-pointer hover:border-[#007185]"
                          onClick={() => {
                            setSelectedImage(review.image!);
                            setSelectedReview(review);
                          }}
                        />
                      </div>
                    )}
                    
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
            <div className="p-6">
              <img 
                src={selectedImage} 
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

export default GardenChairProductReviews; 