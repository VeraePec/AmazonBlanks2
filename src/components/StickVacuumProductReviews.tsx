import React, { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown, X } from 'lucide-react';

const StickVacuumProductReviews = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedReview, setSelectedReview] = useState<any>(null);

  const reviews = [
    {
      id: 1,
      author: "Sarah",
      rating: 5,
      title: "Great value for money. Highly recommend.",
      content: "Fantastic little vacuum! I'm disabled and this product has made vacuuming so much easier. It's lightweight, it's got really good suction, and its design means that tools are easy to swap over/its easy to empty. It has a very long electric cable so its easy to get around a room without it tugging or snagging and it glides around beautifully as it vacuums, without losing suction. Its so light I was able to lift it with my one good arm to clear away some ceiling cobwebs. As for the difference between wood floors and carpets - yes it does perform better on wood and laminate, but I've found its ok on my carpets too. My carpets though are not the fluffy kind - they're a flat corded nylon. So I obviously can't comment on its performance on super soft fluffy carpets. It's \"petite\" enough to store behind a door which is handy too, though it does easily disassemble to store in smaller areas. All in all though, I'm exceptionally happy with this product and the price is the cherry on the cake! Absolute bargain.",
      date: "27 July 2025",
      verified: true,
      helpful: 0,
      style: "Single",
      image: "https://m.media-amazon.com/images/I/81breiSImAL.jpg"
    },
    {
      id: 2,
      author: "Tiger",
      rating: 5,
      title: "Good product",
      content: "Works fantastically for the price, I've had it for two years and it's got great suction power and a long power cord, it's easy to clean out and super light, I have an injury to my hand that makes manuvering heavy objects very hard so this is perfect, it is very noisy but it gets the job done, the attachments are easy to put on and take off.",
      date: "29 July 2025",
      verified: true,
      helpful: 0,
      style: "Single"
    },
    {
      id: 3,
      author: "Edward",
      rating: 5,
      title: "Excellent performance and easy to use",
      content: "This vacuum is absolutely fantastic! It's lightweight, powerful, and perfect for my one-bedroom flat. The suction is amazing and it works quickly and efficiently. The 6m cord gives me plenty of reach to clean anywhere in my home without needing to unplug and replug. The HEPA filter is excellent and the dust container is easy to empty. The swivel brush makes steering smooth and effortless. For the price, this is an incredible value and I couldn't be happier with my purchase!",
      date: "29 August 2024",
      verified: true,
      helpful: 154,
      style: "Single",
      image: "https://m.media-amazon.com/images/I/71Cy+xxfozL.jpg"
    },
    {
      id: 4,
      author: "Helen Osborne",
      rating: 5,
      title: "Easy and light weight Hoover",
      content: "Easy to assemble and great value for money very light weight great suction and good as I am disabled I have a 2 bedroom house and it does a great job plus easy to clean highly recommended",
      date: "14 July 2025",
      verified: true,
      helpful: 4,
      style: "Single"
    },
    {
      id: 5,
      author: "Sasha",
      rating: 5,
      title: "Excellent quality and durability",
      content: "This vacuum is absolutely brilliant! I've had mine for several months now and it's still working perfectly. The build quality is excellent and it's very durable. The suction power is impressive and it's incredibly lightweight, making it easy to use around the house. The HEPA filter works great and the dust container is easy to empty. The long cord is very convenient and the swivel brush makes maneuvering effortless. For the price, this is an outstanding value and I highly recommend it!",
      date: "26 July 2025",
      verified: true,
      helpful: 0,
      style: "Single"
    },
    {
      id: 6,
      author: "Sam Holland",
      rating: 5,
      title: "Small, lightweight, and effective!",
      content: "I've only owned it a couple of days, but so far, so good! I've had a cordless Dyson for downstairs (laminate) for a few years, in the hope that it being cordless it would encourage me to quickly whizz around regularly. However, that's not been the case due to the need to charge the unit, assemble parts of the unit, and it being a bit cumbersome to use. Whereas in the couple of days I've had this little gadget, I've used it every day! It's really lightweight and easy to use, but also seems to have good suction power (possibly because it's corded). It also has a long cable, which means I can keep it plugged in where it's stored and vacuum the entire downstairs of my little house without unplugging, making it an absolute breeze to get out and use without it being a hassle. It's very easy to store too as it's tiny. I don't think it'd be great as the only vacuum in the house, but for keeping on top of daily cleaning, it's fab!",
      date: "1 July 2025",
      verified: true,
      helpful: 11,
      style: "Single",
      image: "https://m.media-amazon.com/images/I/81FQfj2FlCL.jpg"
    },
    {
      id: 7,
      author: "SS",
      rating: 5,
      title: "Easy to use",
      content: "Very lightweight and petite. Great value for the money and excellent suction, so strong. The cord is long enough to go all the way downstairs, clean my living room, guest toilet and most of the hallway. No extension needed really. I don't know why some people complained about it. Very easy to assemble the 3 parts and use. Holds the same amount of waste as most other vaccums. For the price brilliant. Easy to move around. Picture shows size in relevance to door.",
      date: "5 June 2025",
      verified: true,
      helpful: 16,
      style: "Single",
      image: "https://m.media-amazon.com/images/I/61mmWeidg9L.jpg"
    },
    {
      id: 8,
      author: "Chio",
      rating: 5,
      title: "Excellent Amazon stick hoover",
      content: "This hoover has excellent suction, is simple and easy to use. It picks up dirt very effectively and works great on all types of carpets and floors. The dust container has a good capacity and is easy to empty. The build quality is solid and the vacuum feels well-made. The HEPA filter works perfectly and the swivel brush makes cleaning corners and edges effortless. The long cord is very convenient and the lightweight design makes it easy to carry around. Overall, it's excellent value for money and I highly recommend it!",
      date: "27 December 2024",
      verified: true,
      helpful: 25,
      style: "Single"
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
    { stars: 5, count: 1839, percentage: 58 },
    { stars: 4, count: 571, percentage: 18 },
    { stars: 3, count: 317, percentage: 10 },
    { stars: 2, count: 159, percentage: 5 },
    { stars: 1, count: 285, percentage: 9 }
  ];

  return (
    <div className="mt-8 border-t border-gray-300 pt-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Rating Summary */}
        <div className="lg:col-span-1">
          <h2 className="text-xl font-medium mb-4">Customer reviews</h2>
          
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              {renderStars(4.1)}
              <span className="text-sm">4.1 out of 5</span>
            </div>
            <div className="text-sm text-gray-600">3,171 global ratings</div>
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

export default StickVacuumProductReviews; 