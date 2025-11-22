import React, { useState } from 'react';
import { 
  FaShareAlt, 
  FaFacebook, 
  FaTwitter, 
  FaLine, 
  FaLink, 
  FaCopy,
  FaWhatsapp 
} from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';

const ShareButton = ({ 
  url, 
  title = 'ดูอสังหาฯที่น่าสนใจ', 
  description = '',
  className = '' 
}) => {
  // Get current URL if not provided
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareOptions = [
    {
      name: 'Facebook',
      icon: FaFacebook,
      color: 'bg-blue-600 hover:bg-blue-700',
      action: () => {
        const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        window.open(fbUrl, '_blank', 'width=600,height=400');
      }
    },
    {
      name: 'Twitter',
      icon: FaTwitter,
      color: 'bg-sky-500 hover:bg-sky-600',
      action: () => {
        const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`;
        window.open(twitterUrl, '_blank', 'width=600,height=400');
      }
    },
    {
      name: 'Line',
      icon: FaLine,
      color: 'bg-green-500 hover:bg-green-600',
      action: () => {
        const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}`;
        window.open(lineUrl, '_blank', 'width=600,height=400');
      }
    },
    {
      name: 'WhatsApp',
      icon: FaWhatsapp,
      color: 'bg-green-600 hover:bg-green-700',
      action: () => {
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(title + ' ' + shareUrl)}`;
        window.open(whatsappUrl, '_blank');
      }
    },
    {
      name: 'คัดลอกลิงก์',
      icon: FaCopy,
      color: 'bg-gray-600 hover:bg-gray-700',
      action: async () => {
        try {
          await navigator.clipboard.writeText(shareUrl);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch (err) {
          // Fallback for older browsers
          const textArea = document.createElement('textarea');
          textArea.value = shareUrl;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }
      }
    }
  ];

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: description,
          url: shareUrl
        });
      } catch (err) {
        // User cancelled or error occurred
        console.log('Share cancelled');
      }
    } else {
      // Fallback to custom share menu
      setIsOpen(true);
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Share Button */}
      <button
        onClick={navigator.share ? handleNativeShare : () => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-[#AF8FE9] text-white rounded-full hover:bg-[#9a7dd8] transition-all duration-300 hover:scale-105 hover:shadow-lg"
        aria-label="แชร์"
      >
        <FaShareAlt size={16} />
        <span className="hidden sm:inline">แชร์</span>
      </button>

      {/* Share Menu Dropdown */}
      {isOpen && !navigator.share && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu */}
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl z-50 border border-gray-200 animate-fadeInUp">
            <div className="p-3 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-semibold text-gray-800">แชร์ไปยัง</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <IoMdClose size={20} />
              </button>
            </div>
            
            <div className="p-2">
              {shareOptions.map((option, index) => {
                const Icon = option.icon;
                return (
                  <button
                    key={index}
                    onClick={() => {
                      option.action();
                      if (option.name !== 'คัดลอกลิงก์') {
                        setIsOpen(false);
                      }
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-left group"
                  >
                    <div className={`${option.color} p-2 rounded-lg text-white transition-transform group-hover:scale-110`}>
                      <Icon size={18} />
                    </div>
                    <span className="text-gray-700 font-medium">{option.name}</span>
                    {copied && option.name === 'คัดลอกลิงก์' && (
                      <span className="ml-auto text-sm text-green-600">คัดลอกแล้ว!</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ShareButton;

