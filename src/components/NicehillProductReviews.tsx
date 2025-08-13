import React, { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown, X } from 'lucide-react';

const NicehillProductReviews = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedReview, setSelectedReview] = useState<any>(null);

  const reviews = [
    {
      id: 1,
      author: "Marina Johnson",
      rating: 5,
      title: "Canvas draws",
      content: "Such beautiful draws and the price was perfect easy to assemble and quality 100%worth the money , would recommend this seller to anyone ,very sturdy, it can hold a tv on top , the draws are deep and it fits all your clothes inside and more and the colour is perfect 100% functionally, would shop again with this seller and draws came on time",
      date: "24 June 2025",
      verified: true,
      helpful: 12,
      size: "Black Grey",
      images: ["https://m.media-amazon.com/images/I/71XYoWNFiBL.jpg"]
    },
    {
      id: 2,
      author: "Steven",
      rating: 5,
      title: "Nicehill Dresser for Bedroom with 5 Drawers: A Comprehensive Review",
      content: "The Nicehill Dresser is a versatile and practical storage solution that combines style, durability, and ample storage space. The dresser boasts a sleek, modern design that fits seamlessly into various bedroom or closet decor styles. Made from high-quality materials, ensuring its sturdiness and longevity. With 5 spacious drawers, it provides ample storage for clothing, accessories, and other personal items. The drawers are deep enough to hold bulky items like sweaters and blankets, while also being organized enough for smaller belongings like socks and underwear. One of the standout features is its user-friendly design. The drawers are easy to open and close, and the overall assembly process is straightforward, coming with clear instructions and all necessary hardware. Aesthetically, the Nicehill dresser scores high marks. Its clean lines and neutral color options make it a versatile piece that can complement various color schemes and room styles. Considering its robust build, substantial storage space, and modern design, the Nicehill dresser offers excellent value for money.",
      date: "8 March 2025",
      verified: true,
      helpful: 8,
      size: "Black Grey",
      images: ["https://m.media-amazon.com/images/I/71LD0KecyWL.jpg"]
    },
    {
      id: 3,
      author: "Tristan",
      rating: 4,
      title: "Modern finish, sturdy product. Quite small for the price.",
      content: "Product looks modern. All screws included. Decent drawer depth. Build quality isnt great, however it is fairly sturdy, and it came with a discount on purchase. Fairly easy to assemble. Knew it would be small but didn't think it would be as low in reality. If you're looking for a fairly small storage unit that looks modern and subtle this would be ideal.",
      date: "17 April 2025",
      verified: true,
      helpful: 15,
      size: "Black Grey",
      images: ["https://m.media-amazon.com/images/I/715nmylp6WL.jpg"]
    },
    {
      id: 4,
      author: "summer",
      rating: 5,
      title: "Small dresser ideal for what I wanted . Easy to assemble",
      content: "This item is just what I wanted at low cost ..it's small so it fits under my bedroom window without blocking light. The drawers will fit a number of items to free up space in my wardrobe. I was able to put it together quite easily. It looks neat and is ideal for what I wanted it for. A fair amount of storage capacity. Nice neutral color",
      date: "28 July 2025",
      verified: true,
      helpful: 3,
      size: "Beige",
      images: ["https://m.media-amazon.com/images/I/6156qh4KBxL.jpg"]
    },
    {
      id: 5,
      author: "pat brown",
      rating: 5,
      title: "Well worth the money",
      content: "Amazing thankyou looks lovely in my bedroom very sturdy, only took 45 mins to put together. Well worth the money..... thankyou",
      date: "10 June 2025",
      verified: true,
      helpful: 7,
      size: "White"
    },
    {
      id: 6,
      author: "Casacatrina",
      rating: 5,
      title: "A very versatile set of drawers.",
      content: "I am extremely happy with the above item. It was easy to put together and it looks beautiful in my living room. I also think it was purchased for a good price. I would recommend this unit to anyone who is thinking of buying one of these units.",
      date: "3 July 2025",
      verified: true,
      helpful: 5,
      size: "Black Grey"
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

  const filteredReviews = selectedFilter === 'all' 
    ? reviews 
    : reviews.filter(review => {
        if (selectedFilter === '5-star') return review.rating === 5;
        if (selectedFilter === '4-star') return review.rating === 4;
        if (selectedFilter === '3-star') return review.rating === 3;
        if (selectedFilter === '2-star') return review.rating === 2;
        if (selectedFilter === '1-star') return review.rating === 1;
        return true;
      });

  return (
    <div className="bg-white rounded-lg p-6">
      {/* Reviews List */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium">Top reviews from United Kingdom</h3>
        <div className="text-sm text-[#007185] hover:underline cursor-pointer">
          See all reviews
        </div>
      </div>

      <div className="space-y-6">
        {filteredReviews.map((review) => (
          <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium">{review.author.charAt(0)}</span>
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
                
                <p className="text-sm text-gray-700 mb-3">{review.content}</p>
                
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
                
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <button className="flex items-center gap-1 hover:text-gray-700">
                    <ThumbsUp className="w-3 h-3" />
                    Helpful
                  </button>
                  <button className="flex items-center gap-1 hover:text-gray-700">
                    <ThumbsDown className="w-3 h-3" />
                    Not helpful
                  </button>
                  <span>Report</span>
                </div>
              </div>
            </div>
          </div>
        ))}
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

export default NicehillProductReviews; 