import React, { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown, X } from 'lucide-react';

const StorageShelfProductReviews = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedReview, setSelectedReview] = useState<any>(null);

  const reviews = [
    {
      id: 1,
      author: "Haroon",
      rating: 5,
      title: "Great storage solution for any space",
      content: "I recently picked up the Amazon Basics 4-Shelf Storage Unit, and it's been a really solid addition to my home office. The chrome finish gives it a nice, sleek look, which fits in well with my setup, but the real highlight is how functional it is. What sold me on it was how adjustable the shelves are. I appreciate being able to customize the height based on what I need to store. Whether it's books, bins, or some craft supplies, I can arrange everything without issues. The maximum weight capacity is impressive too. I didn't test it by loading it up to 640kg, but it definitely feels sturdy, giving me confidence that it can hold whatever I decide to stack on it. It's also nice that it has leveling feet because my flooring isn't all that even. This little feature really helped keep everything stable, so I'm not worried about it tipping over. Overall, I'm pleased with this storage unit. It's reliable, easy to put together, and has just enough style without being flashy. If you need some extra storage space, I'd say it's definitely worth considering.",
      date: "23 October 2024",
      verified: true,
      helpful: 25,
      size: "Chrome",
      images: ["https://m.media-amazon.com/images/I/817Snn7oDZL.jpg"]
    },
    {
      id: 2,
      author: "Amazon Customer",
      rating: 5,
      title: "Great value for money.",
      content: "Best purchase I ever made. I had a converted attic full of disorganised junk. I bought 3 of the shelf sets. They are very sturdy and well made. Simple to assemble... even for me. All items in the attic are now neatly stacked and stored. and I have a fully clear floor .... for my next collection of junk . ..",
      date: "17 July 2025",
      verified: true,
      helpful: 1,
      size: "Black"
    },
    {
      id: 3,
      author: "Mayowa",
      rating: 5,
      title: "Great product!",
      content: "Amazing use of space and very functional for a small room as I'm able to fit so much and tailor it to my needs. Looks great as I compared getting this or the one from Ikea and decided on an Amazon purchase instead. Very stable and not flimsy so far and it's been over a year since purchased. Very easy to assemble.",
      date: "11 May 2025",
      verified: true,
      helpful: 9,
      size: "Chrome",
      images: ["https://m.media-amazon.com/images/I/71Xo96HyUHL.jpg"]
    },
    {
      id: 4,
      author: "PL7",
      rating: 4,
      title: "Good for what it is",
      content: "Ill start with the bad point... mine came a tiny bit damaged. One of the eyelets that you feed the legs through was a tiny bit warped so the bottom shelf doesnt quite sit flush, as one of the legs cant quite push through as much as the others, making that corner marginally raised compared to the other 3. Whilst this really annoyed me at first, after a little brute force to jam it in as far as possible i continued to put the rest of it together to see how bad it would be. In the end, its not actually that bad as i made this the bottom shelf which is for heavier items. In terms of putting it together, yes the instructions are poor, but its so simple to work out that this shouldnt be an issue. It is quite basic, but once put together it all locks in quite tight and ends up a sturdy little set of shelves. Whilst trying to get the bottom shelf to sit flat, i actually stood on the bottom shelf and jumped a little to try to force it. Im 6ft1 and 185lbs and that one little shelf took my weight with relative ease? Im not sure i would advise this kind of abuse, but it demonstrates just how sturdy this actually is! I have a space between my fridge and the end cupboard that was about perfect for this and it has given me a very handy additional storage rack. Adjustable feet mean you can easily level it to your floor for stability and its made from a seemingly tough metal with a clean black finish. For the price paid, you cant go wrong with this, would recommend for sure.",
      date: "26 October 2020",
      verified: true,
      helpful: 21,
      size: "Black"
    },
    {
      id: 5,
      author: "MP",
      rating: 5,
      title: "great product, good quality",
      content: "Brilliant product, great instructions and looks great. Will see how it stands the test of time. Seems sturdy enough.",
      date: "29 July 2025",
      verified: true,
      helpful: 0,
      size: "Chrome"
    },
    {
      id: 6,
      author: "Magie Tomasello",
      rating: 5,
      title: "Good quality and easy to assemble!",
      content: "Very pleased with this item. It arrived before the deadline, Very sturdy and so easy to assemble, very clear instructions. Exactly what I needed. I bought it for a storage room in my flat and I could fit more stuff in it than I actually expected. Very good size. Really recommend!",
      date: "18 July 2025",
      verified: true,
      helpful: 1,
      size: "Black"
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
    { stars: 5, count: 187141, percentage: 76 },
    { stars: 4, count: 36936, percentage: 15 },
    { stars: 3, count: 12312, percentage: 5 },
    { stars: 2, count: 2462, percentage: 1 },
    { stars: 1, count: 7390, percentage: 3 }
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
            <div className="text-sm text-gray-600">246,241 global ratings</div>
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
              <img 
                src="https://m.media-amazon.com/images/I/817Snn7oDZL.jpg" 
                alt="Customer review" 
                className="w-20 h-20 object-contain rounded cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0"
                onClick={() => {
                  setSelectedImage("https://m.media-amazon.com/images/I/817Snn7oDZL.jpg");
                  setSelectedReview(reviews[0]); // Haroon
                }}
              />
              <img 
                src="https://m.media-amazon.com/images/I/71Xo96HyUHL.jpg" 
                alt="Customer review" 
                className="w-20 h-20 object-contain rounded cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0"
                onClick={() => {
                  setSelectedImage("https://m.media-amazon.com/images/I/71Xo96HyUHL.jpg");
                  setSelectedReview(reviews[2]); // Mayowa
                }}
              />
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
                        Colour: {review.size} | Style: No Wheels
                      </div>
                    )}
                    
                    <p className="text-sm mb-3">{review.content}</p>
                    
                    {review.images && (
                      <div className="flex gap-2 mb-3">
                        {review.images.map((img, idx) => (
                          <img 
                            key={idx} 
                            src={img} 
                            alt="Review" 
                            className="w-16 h-16 object-contain rounded border cursor-pointer hover:opacity-80 transition-opacity" 
                            onClick={() => {
                              setSelectedImage(img);
                              setSelectedReview(review);
                            }}
                          />
                        ))}
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

export default StorageShelfProductReviews; 