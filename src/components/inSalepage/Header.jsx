import React, { useState } from 'react'
import { FaBuilding, FaRegHeart, FaShareSquare, FaHeart } from "react-icons/fa";

import Data from '../../data/propertyData_sale'

function Header() {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = () => {
    setIsLiked(prevIsLiked => !prevIsLiked);
  };

  const handleShare = async () => {
    const shareData = {
      title: Data.title,
      text: `${Data.title} - ฿${Data.price.toLocaleString()}/${Data.priceUnit}`,
      url: window.location.href
    };

    // ลองใช้ Web Share API ก่อน (สำหรับมือถือ)
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        console.log('แชร์สำเร็จ!');
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.log('Error sharing:', error);
        }
      }
    } else {
      // Fallback: คัดลอกลิงก์
      try {
        await navigator.clipboard.writeText(shareData.url);
        showShareNotification();
      } catch (error) {
        // ถ้า clipboard ไม่ทำงาน ใช้วิธีเก่า
        const textArea = document.createElement('textarea');
        textArea.value = shareData.url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showShareNotification();
      }
    }
  };

  const showShareNotification = () => {
    // สร้าง notification element
    const notification = document.createElement('div');
    notification.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10B981;
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 8px;
        animation: slideIn 0.3s ease-out;
      ">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <span style="font-weight: 500;">คัดลอกลิงก์สำเร็จ!</span>
      </div>
    `;
    
    // เพิ่ม animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // ลบ notification หลัง 3 วินาที
    setTimeout(() => {
      notification.firstChild.style.animation = 'slideIn 0.3s ease-out reverse';
      setTimeout(() => {
        document.body.removeChild(notification);
        document.head.removeChild(style);
      }, 300);
    }, 3000);
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
            {Data.type === 'rent' ? 'เช่า' : 'ขาย'}
          </span>
          <h2 className='font-bold text-[1.75rem] md:text-[2rem] text-gray-800'>
            {Data.id} {Data.title}
          </h2>
        </div>
        <div className='flex flex-col mt-8 mb-8 md:flex-row md:justify-between md:items-center gap-4'>
          <div>
            <h2 className='text-[42px] md:text-[48px] font-semibold text-gray-900'>
              ฿ {Data.price.toLocaleString()}
              <span className='text-base md:text-lg font-normal text-gray-500'> / {Data.priceUnit}</span>
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