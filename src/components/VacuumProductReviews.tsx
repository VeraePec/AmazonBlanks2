import React, { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown, X } from 'lucide-react';

const VacuumProductReviews = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedReview, setSelectedReview] = useState<any>(null);

  const reviews = [
    {
      id: 1,
      author: "G Stewart",
      rating: 5,
      title: "Really powerful little vacuum!",
      content: "I'm really surprised by how good this little vacuum is. Does it feel super high quality? Of course not, but it's decent, structurally sound and well built. It comes with two head attachments and three detail tools that all work well. It's easy to empty and easy to wash the filter; What really impressed me is the suction. It's so strong it partially lifts my carpet up. It's got more power than my two precious 'branded' vacuums. It's light enough to pull around but sturdy enough that it doesn't tip over. It holds quite a lot of dirt. The buttons for starting /stopping and cable pulling are both sturdy and easy to tap either way your foot. All in all, it's really good value for money!",
      date: "24 July 2025",
      verified: true,
      helpful: 5,
      size: "Black",
      images: ["https://m.media-amazon.com/images/I/71Yu7aO521L.jpg"]
    },
    {
      id: 2,
      author: "Mich",
      rating: 5,
      title: "amazing suction",
      content: "AMAZING My henry stopped sucking well and i refuse to buy anything too expensive as nothing seems to last anymore. I have had dysons, shark, vtech, henry and this amazon hoover is amazing. Pros: easy to put together, small, lightweight, very powerful suction, good attachments, price is so cheap, I am 5ft 9 and the extended handle is a good height and means i can use it standing up and not bent over. Cons: the cord length is small",
      date: "26 July 2025",
      verified: true,
      helpful: 4,
      size: "Blue",
      images: ["https://m.media-amazon.com/images/I/71mFU-6J8qL.jpg"]
    },
    {
      id: 3,
      author: "feetfirst",
      rating: 4,
      title: "Good value",
      content: "Easy to use,light and good suction. One slight problem is that the larger accessories are a bit tricky to fit on the outlet pipe and seem to fall off easily,but that could be my fault! all in all,very pleased with it.",
      date: "14 May 2025",
      verified: true,
      helpful: 6,
      size: "Black",
      images: ["https://m.media-amazon.com/images/I/61--Ul7ciaL.jpg"]
    },
    {
      id: 4,
      author: "Flindell",
      rating: 5,
      title: "Incredibly powerful for the price",
      content: "I am so pleased with this vacuum. It's deceptively powerful and performs well over carpet and smooth surfaces. It comes with a suitable range of adapters to cover all areas of the home, and it is fantastically portable. I'm also pleased with how easy access to the filters is for cleaning. For <£50, I'm happy. It's not a premium purchase, but the performance still rivals competitors asking 4 x times the price. It doesn't come without a few caveats. The 2L capacity drum is acceptable but may require a few more trips to the bin. It is thankfully very easy to dispense the collected dust. I also find on a few occasions the base of the vacuum likes to top forward, especially when trying to vacuum a tight space or corner, but it's really not a significant issue. Great cord length. Lightweight. There's very little not to love about this compact but powerful vacuum.",
      date: "28 May 2025",
      verified: true,
      helpful: 18,
      size: "Blue",
      images: ["https://m.media-amazon.com/images/I/71juhDHXfmL.jpg"]
    },
    {
      id: 5,
      author: "Amazon Customer",
      rating: 5,
      title: "Light but powerful",
      content: "Fab little hoover with lots if attachments. Suction is fab. Not one for leaving reviews but they helped me to select this and im not disappointed. No frills but does the job. Pick up is better than our old Henry and is lighter for moving up and down stairs. Also found a great little demo on You Tube which helped us to put all the parts together making it quick and simple. Even if it doesnt last mega long for the price i wont complain!",
      date: "30 June 2025",
      verified: true,
      helpful: 9,
      size: "Black",
      images: ["https://m.media-amazon.com/images/I/81D5nbNV4QL.jpg"]
    },
    {
      id: 6,
      author: "Wendreth Mythania",
      rating: 5,
      title: "Fantastic Vac, great price, works hard",
      content: "Yesssss! We still have the moved in concrete floors in most rooms as setting up our house is taking its time! This is a great little vac, have a forever shedding pug! Her pug glitter ( fur) Is everywhere. This vac can deal with rough flooring, dog hair & a 12 & 13 year old! It's certainly getting tested & holding it's own. Highly recommend, easy to empty & clean, & store. Sturdy, great suction.",
      date: "13 June 2025",
      verified: true,
      helpful: 6,
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
    { stars: 5, count: 7983, percentage: 69 },
    { stars: 4, count: 1967, percentage: 17 },
    { stars: 3, count: 810, percentage: 7 },
    { stars: 2, count: 231, percentage: 2 },
    { stars: 1, count: 578, percentage: 5 }
  ];

  return (
    <div className="mt-8 border-t border-gray-300 pt-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Rating Summary */}
        <div className="lg:col-span-1">
          <h2 className="text-xl font-medium mb-4">Customer reviews</h2>
          
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              {renderStars(4.4)}
              <span className="text-sm">4.4 out of 5</span>
            </div>
            <div className="text-sm text-gray-600">11,569 global ratings</div>
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
                src="https://m.media-amazon.com/images/I/71Yu7aO521L.jpg" 
                alt="Customer review" 
                className="w-20 h-20 object-contain rounded cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0"
                onClick={() => {
                  setSelectedImage("https://m.media-amazon.com/images/I/71Yu7aO521L.jpg");
                  setSelectedReview(reviews[0]); // G Stewart
                }}
              />
              <img 
                src="https://m.media-amazon.com/images/I/71mFU-6J8qL.jpg" 
                alt="Customer review" 
                className="w-20 h-20 object-contain rounded cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0"
                onClick={() => {
                  setSelectedImage("https://m.media-amazon.com/images/I/71mFU-6J8qL.jpg");
                  setSelectedReview(reviews[1]); // Mich
                }}
              />
              <img 
                src="https://m.media-amazon.com/images/I/61--Ul7ciaL.jpg" 
                alt="Customer review" 
                className="w-20 h-20 object-contain rounded cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0"
                onClick={() => {
                  setSelectedImage("https://m.media-amazon.com/images/I/61--Ul7ciaL.jpg");
                  setSelectedReview(reviews[2]); // feetfirst
                }}
              />
              <img 
                src="https://m.media-amazon.com/images/I/71juhDHXfmL.jpg" 
                alt="Customer review" 
                className="w-20 h-20 object-contain rounded cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0"
                onClick={() => {
                  setSelectedImage("https://m.media-amazon.com/images/I/71juhDHXfmL.jpg");
                  setSelectedReview(reviews[3]); // Flindell
                }}
              />
              <img 
                src="https://m.media-amazon.com/images/I/81D5nbNV4QL.jpg" 
                alt="Customer review" 
                className="w-20 h-20 object-contain rounded cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0"
                onClick={() => {
                  setSelectedImage("https://m.media-amazon.com/images/I/81D5nbNV4QL.jpg");
                  setSelectedReview(reviews[4]); // Amazon Customer
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
                        Colour: {review.size} | Style: Bagless
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

export default VacuumProductReviews; 