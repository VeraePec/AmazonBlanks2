import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart, Share2, ZoomIn, X } from 'lucide-react';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ images, productName }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const imageRef = useRef<HTMLImageElement>(null);

  // Swipe functionality
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && selectedImage < images.length - 1) {
      setSelectedImage(selectedImage + 1);
    } else if (isRightSwipe && selectedImage > 0) {
      setSelectedImage(selectedImage - 1);
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showFullscreen) {
        if (e.key === 'Escape') {
          setShowFullscreen(false);
        } else if (e.key === 'ArrowLeft' && selectedImage > 0) {
          setSelectedImage(selectedImage - 1);
        } else if (e.key === 'ArrowRight' && selectedImage < images.length - 1) {
          setSelectedImage(selectedImage + 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showFullscreen, selectedImage, images.length]);

  const nextImage = () => {
    if (selectedImage < images.length - 1) {
      setSelectedImage(selectedImage + 1);
    }
  };

  const prevImage = () => {
    if (selectedImage > 0) {
      setSelectedImage(selectedImage - 1);
    }
  };

  const handleImageClick = () => {
    setShowFullscreen(true);
  };

  const handleFullscreenClose = (e: React.MouseEvent) => {
    // Close if clicking on the background (not the image or buttons)
    if (e.target === e.currentTarget) {
      setShowFullscreen(false);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2 sm:gap-4">
        {/* Main Image Container */}
        <div className="order-1 relative group">
          <div 
            className="relative overflow-hidden border border-gray-300 rounded-lg cursor-zoom-in aspect-square flex items-center justify-center bg-white"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onClick={handleImageClick}
          >
            <img
              ref={imageRef}
              src={images[selectedImage]}
              alt={`${productName} - View ${selectedImage + 1}`}
              className="max-w-full max-h-full object-contain transition-transform duration-300 md:hover:scale-105"
            />
            
            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all opacity-0 group-hover:opacity-100"
                  disabled={selectedImage === 0}
                >
                  <ChevronLeft className="w-5 h-5 text-gray-800" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all opacity-0 group-hover:opacity-100"
                  disabled={selectedImage === images.length - 1}
                >
                  <ChevronRight className="w-5 h-5 text-gray-800" />
                </button>
              </>
            )}

            {/* Action Buttons */}
            <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex gap-1 sm:gap-2">
              <button 
                className="bg-white border border-gray-300 p-1 sm:p-2 rounded-full hover:bg-gray-50 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              </button>
              <button 
                className="bg-white border border-gray-300 p-1 sm:p-2 rounded-full hover:bg-gray-50 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              </button>
              <button 
                className="bg-white border border-gray-300 p-1 sm:p-2 rounded-full hover:bg-gray-50 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowFullscreen(true);
                }}
              >
                <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              </button>
            </div>

            {/* Image Counter */}
            {images.length > 1 && (
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                {selectedImage + 1} of {images.length}
              </div>
            )}
          </div>
        </div>
        
        {/* Thumbnail Images */}
        {images.length > 1 && (
          <div className="flex gap-2 order-2 overflow-x-auto pb-2 scrollbar-hide">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative flex-shrink-0"
              >
                <div
                  className={`w-12 h-12 sm:w-16 sm:h-16 border-2 rounded cursor-pointer hover:border-[#007185] transition-colors flex items-center justify-center bg-white ${
                    selectedImage === index ? 'border-[#007185]' : 'border-gray-300'
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={image}
                    alt={`${productName} thumbnail ${index + 1}`}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                {selectedImage === index && (
                  <div className="absolute inset-0 bg-[#007185] bg-opacity-20 rounded pointer-events-none" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Modal */}
      {showFullscreen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center cursor-pointer"
          onClick={handleFullscreenClose}
        >
          <div className="relative max-w-4xl max-h-full p-4">
            {/* Close Button */}
            <button
              onClick={() => setShowFullscreen(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 cursor-pointer"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Fullscreen Image */}
            <div className="relative">
              <img
                src={images[selectedImage]}
                alt={`${productName} - Fullscreen view ${selectedImage + 1}`}
                className="max-w-full max-h-[80vh] object-contain cursor-default"
                onClick={(e) => e.stopPropagation()}
              />
              
              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all cursor-pointer"
                    disabled={selectedImage === 0}
                  >
                    <ChevronLeft className="w-6 h-6 text-gray-800" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all cursor-pointer"
                    disabled={selectedImage === images.length - 1}
                  >
                    <ChevronRight className="w-6 h-6 text-gray-800" />
                  </button>
                </>
              )}

              {/* Image Counter */}
              {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full cursor-default">
                  {selectedImage + 1} of {images.length}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductImageGallery; 