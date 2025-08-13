
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=400&fit=crop',
      title: 'Christmas is coming',
      subtitle: 'Find the perfect gifts for everyone on your list',
      buttonText: 'Shop Christmas gifts'
    },
    {
      image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1200&h=400&fit=crop',
      title: 'Today\'s Deals',
      subtitle: 'Up to 50% off on thousands of items',
      buttonText: 'Shop deals'
    },
    {
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop',
      title: 'Fashion & Beauty',
      subtitle: 'New arrivals and trending styles',
      buttonText: 'Shop fashion'
    }
  ];

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className="relative">
      {/* Main hero carousel */}
      <div className="relative h-60 sm:h-80 overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${slide.image}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
            <div className="relative z-10 h-full flex items-center">
              <div className="max-w-4xl px-4 sm:px-8">
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-4">
                  {slide.title}
                </h1>
                <p className="text-sm sm:text-lg lg:text-xl text-white mb-4 sm:mb-6 max-w-2xl">
                  {slide.subtitle}
                </p>
                <button className="bg-[#febd69] hover:bg-[#f3a847] text-black px-4 sm:px-6 py-2 sm:py-3 rounded-md font-bold text-sm sm:text-base transition-colors">
                  {slide.buttonText}
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Slide indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Product categories cards - Amazon style */}
      <div className="bg-white py-4 sm:py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-4">
            {[
              { title: 'Electronics', icon: '📱' },
              { title: 'Computers', icon: '💻' },
              { title: 'Smart Home', icon: '🏠' },
              { title: 'Arts & Crafts', icon: '🎨' },
              { title: 'Automotive', icon: '🚗' },
              { title: 'Baby', icon: '👶' },
              { title: 'Beauty & Personal Care', icon: '💄' },
              { title: 'Women\'s Fashion', icon: '👗' }
            ].map((category, index) => (
              <div key={index} className="bg-white hover:bg-gray-50 rounded-lg p-2 sm:p-3 cursor-pointer transition-colors group">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">{category.icon}</div>
                  <h3 className="text-xs sm:text-sm font-medium text-gray-900 group-hover:text-[#007185] leading-tight">
                    {category.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick access section */}
      <div className="bg-gray-50 py-4 sm:py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: 'Gaming accessories',
                image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&h=200&fit=crop',
                link: 'Shop now'
              },
              {
                title: 'Electronics',
                image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=200&fit=crop',
                link: 'See more'
              },
              {
                title: 'Home & Kitchen',
                image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop',
                link: 'Discover'
              },
              {
                title: 'Health & Personal Care',
                image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop',
                link: 'Shop now'
              }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                <div className="p-3 sm:p-4">
                  <h3 className="text-sm sm:text-base font-medium mb-2 sm:mb-3 text-gray-900">{item.title}</h3>
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-20 sm:h-24 object-contain rounded mb-2 sm:mb-3"
                  />
                  <div className="text-[#007185] hover:text-[#c7511f] hover:underline text-xs sm:text-sm font-medium">
                    {item.link}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
