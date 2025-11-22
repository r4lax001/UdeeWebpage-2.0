import React from 'react';
import { FaLocationDot, FaPaw, FaBed, FaBath, FaStar, FaStarHalfStroke } from 'react-icons/fa6';
import { Link } from "react-router-dom";


import LazyImage from '../LazyImage';
import ShareButton from '../ShareButton';
import useScrollAnimation from '../../hook/useScrollAnimation';

// รับ props: title (หัวข้อ), products (ข้อมูลการ์ด)
const ProductSection = ({ title, products, marginTop = '50px' }) => {
  const [sectionRef, isSectionVisible] = useScrollAnimation({ threshold: 0.1 });

  // ฟังก์ชันสร้าง rating stars
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalfStroke key="half" />);
    }
    return stars;
  };

  return (
    <div ref={sectionRef} className={`scroll-animate ${isSectionVisible ? 'visible' : ''}`} style={{ marginTop: marginTop }}>
      <h2 className="section-title">{title}</h2>
      <div className="product-grid">
        {products.map((product, i) => {
          const delayClass = `scroll-animate-delay-${(i % 4) + 1}`;
          const locationText = `${product.location.district}, ${product.location.subDistrict},<br />${product.location.province}`;
          const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/property/${product.id}` : '';
          const shareDescription = `${locationText.replace('<br />', ', ')} - ฿${product.price.toLocaleString()}`;

          return (
            <Link 
              to="/app/salepage" 
              className={`product-card group scroll-animate ${isSectionVisible ? 'visible' : ''} ${delayClass}`} 
              key={product.id || i}
            >
              <div className="relative">
                <LazyImage src={product.img} className="product-img" alt={product.title} />
                {/* Share Button Overlay */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <ShareButton 
                    url={shareUrl}
                    title={product.title}
                    description={shareDescription}
                  />
                </div>
              </div>
              <div className="product-body">
                <div className="product-title">{product.title}</div>
                <div className="product-loc">
                  <FaLocationDot />
                  <span dangerouslySetInnerHTML={{ __html: locationText }} />
                </div>
                <div className="product-specs">

                  {product.isPet && <span><FaPaw /> Pet Friendly</span>}
                  <span><FaBed /> {product.specs.bedrooms}</span>
                  {product.specs.bathrooms && <span><FaBath /> {product.specs.bathrooms}</span>}
                  
                </div>
                <div className="product-footer">
                  <div className="rating">
                    {renderStars(product.rating)}
                  </div>
                  <div className="price">฿ {product.price.toLocaleString()}</div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ProductSection;