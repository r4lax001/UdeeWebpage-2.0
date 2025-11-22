import React from 'react';
import LazyImage from '../LazyImage';
import useScrollAnimation from '../../hook/useScrollAnimation';

// รับ props: title และ items (รายการรูปภาพและหัวข้อ)
const HighlightSection = ({ title, items, marginTop = '60px' }) => {
  const [sectionRef, isSectionVisible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <div ref={sectionRef} className={`scroll-animate ${isSectionVisible ? 'visible' : ''}`} style={{ marginTop: marginTop }}>
      <h2 className="section-title">{title}</h2>
      <div className="highlight-grid">
        {items.map((item, index) => {
          const delayClass = `scroll-animate-delay-${(index % 5) + 1}`;
          return (
          <a 
            href="#" 
            className={`highlight-card ${index === 0 ? 'main' : ''} scroll-animate ${isSectionVisible ? 'visible' : ''} ${delayClass}`} 
            key={item.id || index}
          >
            <LazyImage src={item.img} alt={item.title} className="w-full h-full object-cover" />
            <div className="text-overlay"><h3>{item.title}</h3></div>
          </a>
          );
        })}
      </div>
    </div>
  );
};

export default HighlightSection;