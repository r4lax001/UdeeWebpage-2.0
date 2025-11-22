import React from 'react';
import LazyImage from '../LazyImage';
import useScrollAnimation from '../../hook/useScrollAnimation';
import { locationsData } from '../../data/homeContentData';

const LocationSection = () => {
  const [sectionRef, isSectionVisible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <div ref={sectionRef} className={`scroll-animate ${isSectionVisible ? 'visible' : ''}`}>
      <h2 className="section-title">ทำเลยอดนิยม</h2>
      <div className="location-grid">
        {locationsData.map((loc, index) => (
          <div 
            key={loc.id || index}
            className={`location-card scroll-animate ${isSectionVisible ? 'visible' : ''} scroll-animate-delay-${index + 1}`}
          >
            <span className="location-tag">{loc.name}</span>
            <LazyImage src={loc.img} alt={loc.name} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationSection;