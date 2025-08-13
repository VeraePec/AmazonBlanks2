import React, { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown, Flag, ChevronDown, ChevronUp } from 'lucide-react';

const BabyCotProductReviews = () => {
  const [expandedReviews, setExpandedReviews] = useState<number[]>([]);
  const [showAllReviews, setShowAllReviews] = useState(false);

  const reviews = [
    {
      id: 1,
      name: 'Sarah M.',
      rating: 5,
      date: 'Verified Purchase',
      title: 'Perfect for our nursery!',
      content: 'Absolutely love this cot bed! The quality is exceptional and it was so easy to assemble. The white and pine finish looks beautiful in our nursery and the included mattress is incredibly comfortable. Our little one sleeps so well in it. The drawer underneath is perfect for storing extra blankets and sheets. Highly recommend!',
      helpful: 24,
      verified: true,
      image: 'https://m.media-amazon.com/images/I/717nKrtk88L.jpg'
    },
    {
      id: 2,
      name: 'Michael T.',
      rating: 5,
      date: 'Verified Purchase',
      title: 'Excellent quality and value',
      content: 'This cot bed exceeded our expectations. The pine wood is solid and well-finished, and the conversion to toddler bed feature is brilliant. The mattress is soft yet supportive, and the Aloe Vera cover feels premium. Assembly took about 30 minutes and everything fitted perfectly. Great value for money at £9.99!',
      helpful: 18,
      verified: true,
      image: 'https://m.media-amazon.com/images/I/71IqNz8R4UL.jpg'
    },
    {
      id: 3,
      name: 'Emma L.',
      rating: 5,
      date: 'Verified Purchase',
      title: 'Beautiful and practical',
      content: 'The design is modern and elegant, perfect for any nursery theme. The three height positions make it easy to adjust as our baby grows. The drawer is spacious and slides smoothly. The mattress is hypoallergenic which gives us peace of mind. Our baby loves sleeping in it!',
      helpful: 15,
      verified: true,
      image: 'https://m.media-amazon.com/images/I/71NZYeXwikL.jpg'
    },
    {
      id: 4,
      name: 'David K.',
      rating: 5,
      date: 'Verified Purchase',
      title: 'Fantastic purchase',
      content: 'This cot bed is everything we hoped for and more. The build quality is outstanding, and the conversion feature means it will last for years. The included mattress is top quality and the Aloe Vera cover is a nice touch. Assembly was straightforward with clear instructions.',
      helpful: 12,
      verified: true,
      image: 'https://m.media-amazon.com/images/I/71FwjRqkXXL.jpg'
    },
    {
      id: 5,
      name: 'Lisa P.',
      rating: 5,
      date: 'Verified Purchase',
      title: 'Highly recommend!',
      content: 'We\'ve had this cot bed for 6 months now and it\'s been perfect. The pine wood is durable and the finish is beautiful. The mattress is comfortable and our baby sleeps soundly. The drawer provides excellent storage. At £9.99, this is an absolute bargain!',
      helpful: 9,
      verified: true,
      image: 'https://m.media-amazon.com/images/I/71WF4QGgpBL.jpg'
    },
    {
      id: 6,
      name: 'James W.',
      rating: 5,
      date: 'Verified Purchase',
      title: 'Excellent quality cot bed',
      content: 'The Love For Sleep TOKYO cot bed is beautifully made with solid pine wood. The conversion feature works perfectly and the mattress is incredibly comfortable. Our toddler loves her new bed. The drawer is a bonus for storage. Great value for money!',
      helpful: 7,
      verified: true,
      image: 'https://m.media-amazon.com/images/I/71+IfCLV5uL.jpg'
    }
  ];

  const ratingBreakdown = {
    5: 230,
    4: 56,
    3: 20,
    2: 13,
    1: 9
  };

  const totalReviews = Object.values(ratingBreakdown).reduce((a, b) => a + b, 0);
  const averageRating = 4.4;

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

  const toggleReview = (reviewId: number) => {
    setExpandedReviews(prev =>
      prev.includes(reviewId)
        ? prev.filter(id => id !== reviewId)
        : [...prev, reviewId]
    );
  };

  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 3);

  return (
    <div className="mt-8 border-t border-gray-300 pt-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Rating Summary */}
        <div className="lg:w-1/3">
          <h2 className="text-2xl font-medium mb-4">Customer reviews</h2>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#ffa41c]">{averageRating}</div>
              <div className="text-sm text-gray-600">out of 5</div>
            </div>
            <div>
              {renderStars(averageRating)}
              <div className="text-sm text-[#007185] hover:underline cursor-pointer mt-1">
                {totalReviews} global ratings
              </div>
            </div>
          </div>

          {/* Rating Breakdown */}
          <div className="space-y-2 mb-6">
            {[5, 4, 3, 2, 1].map(rating => {
              const count = ratingBreakdown[rating as keyof typeof ratingBreakdown];
              const percentage = Math.round((count / totalReviews) * 100);
              return (
                <div key={rating} className="flex items-center gap-2">
                  <div className="flex items-center gap-1 w-16">
                    <span className="text-sm">{rating}</span>
                    <Star className="w-3 h-3 text-[#ffa41c] fill-[#ffa41c]" />
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#ffa41c] h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-12">{percentage}%</span>
                </div>
              );
            })}
          </div>

          <div className="text-sm text-gray-600">
            <div>How customer reviews and ratings work</div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="lg:w-2/3">
          <div className="space-y-6">
            {displayedReviews.map(review => (
              <div key={review.id} className="border-b border-gray-200 pb-6">
                <div className="flex items-start gap-4">
                  {review.image && (
                    <img
                      src={review.image}
                      alt="Review"
                      className="w-16 h-16 object-contain rounded"
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {renderStars(review.rating)}
                      <span className="font-medium">{review.title}</span>
                    </div>
                    
                    <div className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">{review.name}</span>
                      <span className="mx-2">•</span>
                      <span>{review.date}</span>
                      {review.verified && (
                        <>
                          <span className="mx-2">•</span>
                          <span className="text-green-600">Verified Purchase</span>
                        </>
                      )}
                    </div>

                    <div className="text-sm text-gray-800 mb-3">
                      {expandedReviews.includes(review.id) ? (
                        review.content
                      ) : (
                        <>
                          {review.content.slice(0, 200)}
                          {review.content.length > 200 && (
                            <>
                              ...{' '}
                              <button
                                onClick={() => toggleReview(review.id)}
                                className="text-[#007185] hover:underline"
                              >
                                Read more
                              </button>
                            </>
                          )}
                        </>
                      )}
                    </div>

                    {expandedReviews.includes(review.id) && (
                      <button
                        onClick={() => toggleReview(review.id)}
                        className="text-[#007185] hover:underline text-sm mb-3"
                      >
                        Show less
                      </button>
                    )}

                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <button className="flex items-center gap-1 hover:text-[#007185]">
                        <ThumbsUp className="w-4 h-4" />
                        <span>Helpful ({review.helpful})</span>
                      </button>
                      <button className="flex items-center gap-1 hover:text-[#007185]">
                        <ThumbsDown className="w-4 h-4" />
                        <span>Not helpful</span>
                      </button>
                      <button className="flex items-center gap-1 hover:text-[#007185]">
                        <Flag className="w-4 h-4" />
                        <span>Report</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {!showAllReviews && reviews.length > 3 && (
            <button
              onClick={() => setShowAllReviews(true)}
              className="w-full mt-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium"
            >
              See all {reviews.length} reviews
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BabyCotProductReviews; 