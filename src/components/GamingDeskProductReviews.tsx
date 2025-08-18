import React, { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown, X } from 'lucide-react';

const GamingDeskProductReviews = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedReview, setSelectedReview] = useState<any>(null);

  const reviews = [
    {
      id: 1,
      author: "Tom - Zulisian",
      rating: 5,
      title: "Wow",
      content: "So very impressed with this Desk, for £75 roughly, a desk that can go up, which is important as I have a high seated chair, my arms can now relax better and thus, should reduce the stress I was placing on my wrists and elbows when previously using my shorter desk. The build quality is fantastic for the price and the instructions for building it were so simple it took less than 30 minutes to build, really really happy.",
      date: "27 September 2024",
      verified: true,
      helpful: 3,
      color: "Red",
      image: "https://m.media-amazon.com/images/I/71Ntpg2cXSL.jpg"
    },
    {
      id: 2,
      author: "Realview",
      rating: 5,
      title: "Very good quality table",
      content: "Really good table for the price. Height adjustable when I can't be bothered to sit down. Easily raised, good size, good quality. Can easily change the table top if you need a specific size to customize.",
      date: "17 December 2024",
      verified: true,
      helpful: 0,
      color: "Red"
    },
    {
      id: 3,
      author: "schmutz",
      rating: 5,
      title: "Excellent value and quality",
      content: "This desk is absolutely fantastic! The build quality is excellent and it's very sturdy. The height adjustment feature works perfectly and it's incredibly easy to assemble. The oversized desktop provides plenty of space for my dual monitor setup and the raised shelf is perfect for organizing my workspace. For the price, this is an outstanding value and I highly recommend it!",
      date: "1 April 2025",
      verified: true,
      helpful: 0,
      color: "Blue"
    },
    {
      id: 4,
      author: "OJ",
      rating: 5,
      title: "Stand Sit Desk",
      content: "I have been using this since July 2024 (at the time of this review it is Oct 2024) and it has served me really well. I had fun putting it together. A bit of a downer that the stand-sit function is manual and not electric, but that isn't a problem at all. I have had no issues at all in my 4 months of use, so I would say this is good for what it's worth.",
      date: "30 October 2024",
      verified: true,
      helpful: 0,
      color: "Red"
    },
    {
      id: 5,
      author: "Ayaron Loralion",
      rating: 5,
      title: "The red one is half the price of the blue one? Bargain!",
      content: "Built easily enough, all the parts well labeled. Got a hex head set for my Ikea electric screwdriver and I use it to move the desk up and down.",
      date: "1 January 2025",
      verified: true,
      helpful: 1,
      color: "Red"
    },
    {
      id: 6,
      author: "Andy",
      rating: 5,
      title: "Excellent quality",
      content: "Great value. The quality really impressed me.",
      date: "25 October 2024",
      verified: true,
      helpful: 0,
      color: "Red"
    },
    {
      id: 7,
      author: "Grumskikorsakov",
      rating: 5,
      title: "15 minutes and home office is go.....",
      content: "Easy to follow instructions, very sturdy and great to use. I'm 6'1\" and the desk easily gets high enough for comfortable standing or can wind back down to use a chair, if needed.",
      date: "31 January 2024",
      verified: true,
      helpful: 5,
      color: "Blue",
      image: "https://m.media-amazon.com/images/I/61HOM24dHuL.jpg"
    },
    {
      id: 8,
      author: "Jazz Savage",
      rating: 5,
      title: "Excellent sturdy and useful desk",
      content: "I wanted something sturdy and easy to set up that also gave me plenty of room for my computer. This matched those specs really well, not to mention that the colour and the design look great. I've had it for over 1.5 years now so it's had a lot of use and it really is fit for purpose - the additional desk above for the monitor is super handy and there is plenty of room for everything I need for my desk, so is more than functional. I don't recall it being too difficult to set up either, although does take a bit of time if just you. The height adjustment feature works perfectly and the build quality is excellent. Highly recommend!",
      date: "18 July 2025",
      verified: true,
      helpful: 0,
      color: "Blue"
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
    { stars: 5, count: 166, percentage: 71 },
    { stars: 4, count: 37, percentage: 16 },
    { stars: 3, count: 19, percentage: 8 },
    { stars: 2, count: 5, percentage: 2 },
    { stars: 1, count: 7, percentage: 3 }
  ];

  return (
    <div className="mt-8 border-t border-gray-300 pt-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Rating Summary */}
        <div className="lg:col-span-1">
          <h2 className="text-xl font-medium mb-4">Customer reviews</h2>
          
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              {renderStars(4.5)}
              <span className="text-sm">4.5 out of 5</span>
            </div>
            <div className="text-sm text-gray-600">234 global ratings</div>
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
                    
                    {review.color && (
                      <div className="text-xs text-gray-600 mb-2">
                        Colour: {review.color}
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

export default GamingDeskProductReviews; 