import React, { useState, useEffect } from 'react';
import { LoadingSpinner } from '../Loading';
import useScrollAnimation from '../../hook/useScrollAnimation';

const AdsCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState({});
  const [carouselRef, isCarouselVisible] = useScrollAnimation({ threshold: 0.1 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const handleImageLoad = (index) => {
    setImageLoaded(prev => ({ ...prev, [index]: true }));
  };

  return (
    <div ref={carouselRef} className={`ads-carousel-wrapper scroll-animate ${isCarouselVisible ? 'visible' : ''}`}>
      <div className="ads-carousel-container">
        <div 
          className="ads-track" 
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((img, index) => (
            <div key={index} className="ads-slide">
              {!imageLoaded[index] && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <LoadingSpinner size="lg" />
                </div>
              )}
              <img 
                src={img} 
                alt={`Ad ${index + 1}`}
                onLoad={() => handleImageLoad(index)}
                className={imageLoaded[index] ? 'opacity-100 transition-opacity duration-500' : 'opacity-0'}
              />
            </div>
          ))}
        </div>
      </div>
      
      <div className="ads-dots">
        {images.map((_, index) => (
            <button 
                key={index} 
                className={`dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
            />
        ))}
      </div>
    </div>
  );
};

export default AdsCarousel;
