import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/inappLayout/Navbar";
import propertyData from "../data/SaleListing_Data.jsx";
import { IoHeartOutline, IoHeart } from "react-icons/io5";
import Footer from "../components/inappLayout/Footer";
import LazyImage from "../components/LazyImage";
import ShareButton from "../components/ShareButton";
import useScrollAnimation from "../hook/useScrollAnimation";
import { CardSkeleton } from "../components/Loading";
import ScrollToTop from "../components/ScrollToTop";

export default function SaleListingPage() {
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [sectionRef, isSectionVisible] = useScrollAnimation({ threshold: 0.1 });

  const pages = [1, 2, 3]; // mock pagination

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const toggleFavorite = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    // Smooth scroll to top when page changes
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="w-full min-h-screen bg-[#F7F7FA]">
      {/* Navbar */}
      <Navbar />

      {/* Header */}
      <div
        className="relative w-full h-[260px] bg-cover bg-center pt-[80px] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1400&q=60')",
        }}
      >
        {/* overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/40"></div>

        {/* Animated background overlay */}
        <div className="absolute inset-0 bg-[#AF8FE9]/20 animate-pulse"></div>

        {/* title centered with animation */}
        <h1 className="relative z-10 text-4xl text-white font-semibold drop-shadow-lg animate-fadeInUp">
          รวมประกาศขาย
        </h1>
      </div>

      {/* Search Section */}
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="bg-white shadow-lg p-6 rounded-2xl -translate-y-10 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="ค้นหา ทำเล, จังหวัด, โซน, สถานี BTS/MRT..."
              className="p-3 rounded-xl border border-gray-300 focus:border-[#AF8FE9] focus:ring-2 focus:ring-[#AF8FE9]/20 transition-all duration-300 outline-none"
            />

            <select className="p-3 rounded-xl border border-gray-300 focus:border-[#AF8FE9] focus:ring-2 focus:ring-[#AF8FE9]/20 transition-all duration-300 outline-none cursor-pointer">
              <option>ทุกประเภท</option>
              <option>คอนโด</option>
              <option>บ้านเดี่ยว</option>
              <option>ทาวน์โฮม</option>
            </select>

            <select className="p-3 rounded-xl border border-gray-300 focus:border-[#AF8FE9] focus:ring-2 focus:ring-[#AF8FE9]/20 transition-all duration-300 outline-none cursor-pointer">
              <option>ราคารวม</option>
              <option>0 - 2 ล้าน</option>
              <option>2 - 5 ล้าน</option>
              <option>5 - 10 ล้าน</option>
            </select>

            <button className="p-3 rounded-xl bg-[#AF8FE9] text-white font-medium hover:bg-[#9a7dd8] transform hover:scale-105 active:scale-95 transition-all duration-300 shadow-md hover:shadow-lg">
              ค้นหา
            </button>
          </div>
        </div>
      </div>


      {/* Property Grid */}
      <div ref={sectionRef} className="max-w-[1400px] mx-auto px-4 pb-16">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {[...Array(8)].map((_, i) => (
              <CardSkeleton key={i} variant="listing" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {propertyData.map((item, index) => {
            const isFavorite = favorites.has(item.id);
            const delayClass = `scroll-animate-delay-${(index % 4) + 1}`;
            const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/property/${item.id}` : '';
            const shareDescription = `${item.location.subDistrict}, ${item.location.district} - ฿${item.price.toLocaleString()}`;

            return (
              <Link
                to="/app/salepage"
                key={item.id}
                className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-2 group scroll-animate ${isSectionVisible ? 'visible' : ''} ${delayClass} transform hover:-translate-y-2 hover:scale-[1.02]`}
              >
                <div className="relative overflow-hidden rounded-xl">
                  <LazyImage
                    src={item.images[0]}
                    className="w-full h-[190px] object-cover rounded-xl transition-transform duration-500 group-hover:scale-110"
                    alt={item.title}
                  />
                  
                  {/* Favorite Button */}
                  <button
                    onClick={(e) => toggleFavorite(item.id, e)}
                    className={`absolute top-3 right-3 p-2 rounded-full shadow-lg transition-all duration-300 ${
                      isFavorite 
                        ? 'bg-red-500 text-white scale-110' 
                        : 'bg-white/90 text-gray-700 hover:bg-white hover:scale-110'
                    }`}
                  >
                    {isFavorite ? (
                      <IoHeart size={20} className="animate-pulse" />
                    ) : (
                      <IoHeartOutline size={20} />
                    )}
                  </button>

                  {/* Share Button Overlay */}
                  <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <ShareButton
                      url={shareUrl}
                      title={item.title}
                      description={shareDescription}
                    />
                  </div>

                  {/* Gradient Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                </div>

                <div className="p-3">
                  <h2 className="font-semibold text-lg line-clamp-2 group-hover:text-[#AF8FE9] transition-colors duration-300">
                    {item.title}
                  </h2>

                  <p className="text-[#AF8FE9] font-bold text-xl mt-2">
                    ฿{item.price.toLocaleString()}
                  </p>

                  <p className="text-gray-500 text-sm mt-1">
                    {item.location.subDistrict}, {item.location.district}
                  </p>

                  <p className="text-gray-500 text-sm flex items-center gap-2 mt-2">
                    <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                      {item.details.size} ตร.ม.
                    </span>
                    <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                      {item.details.bedroom} ห้องนอน
                    </span>
                    <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                      {item.details.bathroom} ห้องน้ำ
                    </span>
                  </p>
                </div>
              </Link>
            );
          })}
          </div>
        )}

        {/* Pagination (Figma Style) */}
        <div className="flex justify-center gap-3 mt-14">
          {pages.map((num) => (
            <button
              key={num}
              onClick={() => handlePageChange(num)}
              className={
                page === num
                  ? "w-10 h-10 bg-[#AF8FE9] text-white rounded-full flex items-center justify-center font-medium shadow-md transform scale-110 transition-all duration-300 hover:scale-125"
                  : "text-[#AF8FE9] font-medium px-3 hover:bg-[#AF8FE9]/10 rounded-full transition-all duration-300 hover:scale-110"
              }
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
      <ScrollToTop />
    </div>
  );
}
