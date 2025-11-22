import React, { useState } from 'react'
import { FaBuilding, FaRegHeart, FaShareSquare, FaHeart } from "react-icons/fa";

import data from '../../data/propertyData_rent'

function Header() {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = () => {
    setIsLiked(prevIsLiked => !prevIsLiked);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: data.title,
        text: `${data.title} - ฿${data.price.toLocaleString()}/${data.priceUnit}`,
        url: window.location.href
      }).catch((error) => console.log('Error sharing:', error));
    } else {


      navigator.clipboard.writeText(window.location.href);
      alert('คัดลอกลิงก์แล้ว!');
    }
  };

  const likeButtonClass = isLiked
    ? 'bg-red-500 text-white hover:bg-red-600'
    : 'bg-gray-100 text-gray-700 hover:bg-gray-200';

  return (
    <div className='container max-w-[1500px] mt-12 mx-auto px-4 border-b pb-8'>
      <div className='flex flex-col gap-6'>

        <div className='flex flex-wrap items-center gap-4'>
          <span className="font-medium flex gap-2 items-center bg-[#E1D0FF] text-[#5B21B6] text-[18px] py-2.5 px-8 rounded-lg">
            <FaBuilding />
            {data.type === 'rent' ? 'เช่า' : 'ขาย'}
          </span>
          <h2 className='font-bold text-[1.75rem] md:text-[2rem] text-gray-800'>
            {data.id} {data.title}
          </h2>
        </div>
        <div className='flex flex-col mt-8 mb-8 md:flex-row md:justify-between md:items-center gap-4'>
          <div>
            <h2 className='text-[42px] md:text-[48px] font-semibold text-gray-900'>
              ฿ {data.price.toLocaleString()}
              <span className='text-base md:text-lg font-normal text-gray-500'> / {data.priceUnit}</span>
            </h2>
          </div>
          <div className='flex gap-3'>
            <button
              onClick={handleLikeClick}
              className={`font-medium flex gap-2 items-center py-4 px-8 rounded-lg transition-colors ${likeButtonClass}`}
            >
              {isLiked ? <FaHeart /> : <FaRegHeart />}
              ถูกใจ
            </button>
            <button 
              onClick={handleShare}
              className='font-medium flex gap-2 items-center bg-gray-100 text-gray-700 py-2.5 px-8 rounded-lg hover:bg-gray-200 transition-colors'
            >
              <FaShareSquare />
              แชร์
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header