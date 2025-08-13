import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const AmazonHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1200&h=400&fit=crop',
      title: 'Deals & Promotions',
      subtitle: 'Shop today\'s deals'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=400&fit=crop',
      title: 'Christmas is coming',
      subtitle: 'Find the perfect gifts'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop',
      title: 'Fashion & Style',
      subtitle: 'Shop the latest trends'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=400&fit=crop',
      title: 'Home & Garden',
      subtitle: 'Transform your space'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative bg-white">
      {/* Hero Carousel */}
      <div className="relative h-60 sm:h-80 lg:h-96 overflow-hidden">
        {/* Slides */}
        <div className="relative h-full">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white max-w-4xl px-4">
                    <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4">
                      {slide.title}
                    </h1>
                    <p className="text-lg sm:text-xl mb-4 sm:mb-6">
                      {slide.subtitle}
                    </p>
                    <button className="bg-[#febd69] hover:bg-[#f3a847] text-black px-6 sm:px-8 py-2 sm:py-3 rounded-md font-bold text-sm sm:text-base transition-colors">
                      Shop now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all"
        >
          <ChevronRight className="w-6 h-6 text-gray-800" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide 
                  ? 'bg-white' 
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Quick Access Cards */}
      <div className="bg-gray-100 py-4 sm:py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-4">
            {[
              { title: 'Electronics', icon: '📱' },
              { title: 'Fashion', icon: '👕' },
              { title: 'Home & Garden', icon: '🏠' },
              { title: 'Books', icon: '📚' },
              { title: 'Sports', icon: '⚽' },
              { title: 'Toys', icon: '🧸' }
            ].map((category, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg p-3 sm:p-4 text-center hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="text-2xl sm:text-3xl mb-2">{category.icon}</div>
                <div className="text-xs sm:text-sm font-medium text-gray-800">
                  {category.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmazonHero; 