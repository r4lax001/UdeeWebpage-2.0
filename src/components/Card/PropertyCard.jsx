import React from 'react';
import { IoIosPin } from "react-icons/io";
import ShareButton from '../ShareButton';
import LazyImage from '../LazyImage'; 

// Props ที่รับ:
// imageUrl
// code
// title
// location
// price
// status = "rent" | "sale"
function PropertyCard({ imageUrl, code, title, location, price, status }) {
  const Cardcon =
    "w-[280px] h-[350px] bg-white rounded-2xl shadow-lg overflow-hidden group transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-[1.05] hover:-translate-y-2 cursor-pointer";

  // ถ้าเป็น rent = ให้เช่า / ถ้าเป็น sale = ขาย
  const label = status === "rent" ? "ให้เช่า" : "ขาย";

  return (
    <div className={Cardcon}>
      {/* Image */}
      <div className="w-full h-48 overflow-hidden relative">
        <LazyImage
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />
        {/* Share Button Overlay */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <ShareButton 
            url={typeof window !== 'undefined' ? `${window.location.origin}/property/${code}` : ''}
            title={`${code} ${label}: ${title}`}
            description={`${location} - ฿${price.toLocaleString()}`}
          />
        </div>
      </div>

      <div className="p-4 space-y-2">

        <div>
          <p className="text-base font-medium text-gray-900">
            {code} {label}
          </p>
          <h3 className="text-base font-medium text-gray-900 mt-1">
            {title}
          </h3>
        </div>

        <div className="flex text-base gap-2 items-center">
          <IoIosPin />
          <span className="text-gray-700">{location}</span>
        </div>

        <div>
          <p className="text-xl font-bold text-gray-900">
            ฿ {price.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;