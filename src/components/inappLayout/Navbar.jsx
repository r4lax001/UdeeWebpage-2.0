import React, { useState, useEffect, useRef } from "react";

import { Link } from "react-router-dom";
import { IoIosLock, IoIosArrowDown } from "react-icons/io";
import { FiPlus } from "react-icons/fi";
import { HiUser } from "react-icons/hi";
import { BiLogOut } from "react-icons/bi";
import { useAuth } from "../../context/AuthContext";
import AuthModal from "../AuthModal";

const MegaMenuContent = ({ type }) => {
  const title = type === "buy" ? "ขาย" : "เช่า";

  return (
    <div className="absolute top-full left-0 mt-4 w-auto bg-white rounded-lg shadow-xl p-8 text-black z-50 animate-fadeInUp">
      <div className="grid grid-cols-3 gap-x-12 gap-y-6 w-max">
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-500 text-sm">ทำเล</h3>
          <ul className="space-y-2 text-base">
            <li>
              <a href="#" className="hover:text-[#AF8FE9]">
                กรุงเทพฯ
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#AF8FE9]">
                ชลบุรี (พัทยา)
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#AF8FE9]">
                หัวหิน
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900 text-sm flex items-center gap-1 cursor-pointer hover:text-[#AF8FE9]">
            โครงการคอนโด <span className="text-xs">&gt;</span>
          </h3>
          <ul className="space-y-2 text-base">
            <li>
              <a href="#" className="hover:text-[#AF8FE9]">
                คอนโด
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#AF8FE9]">
                อพาร์ทเม้นท์
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold text-gray-500 text-sm">บ้านและที่ดิน</h3>
          <ul className="space-y-2 text-base">
            <li>
              <a href="#" className="hover:text-[#AF8FE9]">
                ทาวน์เฮ้าส์
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#AF8FE9]">
                บ้านเดี่ยว
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-200 mt-6 pt-4">
        <Link
          to="/properties/sale"
          className="font-semibold text-gray-900 hover:text-[#AF8FE9] text-sm"
        >
          ดูประกาศขายทั้งหมด &gt;
        </Link>
      </div>
    </div>
  );
};

// Profile Dropdown Component
const ProfileDropdown = ({ user, onLogout }) => {
  return (
    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-100 animate-fadeInUp">
      <div className="px-4 py-3 border-b border-gray-200">
        <p className="text-xs text-gray-500">เข้าสู่ระบบในชื่อ</p>
        <p className="text-sm font-semibold text-[#5C6063] truncate mt-1">{user.email}</p>
        {user.username && (
          <p className="text-xs text-gray-600 mt-0.5">@{user.username}</p>
        )}
      </div>

      <div className="py-1">
        <Link
          to="/profile"
          onClick={() => setShowProfileDropdown(false)}
          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-purple-50 hover:text-[#AF8FE9] transition-colors"
        >
          <HiUser size={18} />
          <span>โปรไฟล์ของฉัน</span>
        </Link>
        <Link
          to="/forsales/propertyinfo"
          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-purple-50 hover:text-[#AF8FE9] transition-colors"
        >
          <FiPlus size={18} />
          <span>ประกาศของฉัน</span>
        </Link>
      </div>

      <div className="border-t border-gray-200 py-1">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
        >
          <BiLogOut size={18} />
          <span>ออกจากระบบ</span>
        </button>
      </div>
    </div>
  );
};

function Navbar() {
  const [openMenu, setOpenMenu] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const menuRef = useRef(null);
  const profileRef = useRef(null);

  const { user, logout } = useAuth();

  const btnNavStyle =
    "flex items-center justify-center gap-x-1.5 bg-white text-[#000000] font-medium py-2 px-5 rounded-full transform transition-all duration-300 ease-out hover:shadow-xl hover:scale-105 active:scale-95 hover:bg-purple-50";
  const menuTriggerStyle =
    "flex items-center gap-1 text-[#000000] text-lg font-medium transition-all duration-300 ease-out hover:text-white/90 cursor-pointer hover:scale-105";

  const handleMenuToggle = (menuName) => {
    setOpenMenu((prev) => (prev === menuName ? null : menuName));
    setShowProfileDropdown(false);
  };

  const handleAuthModalOpen = () => {
    setIsAuthModalOpen(true);
    setOpenMenu(null);
  };

  const handleProfileToggle = () => {
    setShowProfileDropdown(!showProfileDropdown);
    setOpenMenu(null);
  };

  const handleLogout = () => {
    logout();
    setShowProfileDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(null);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className="bg-[#AF8FE9] shadow-lg" ref={menuRef}>
        <div className="container max-w-[1773px] mx-auto h-20 px-4">
          <div className="flex justify-between items-center h-full">
            {/* Logo and Menu */}
            <div className="flex items-center gap-x-8">
              <Link
                to="/"
                className="text-[40px] font-semibold text-white drop-shadow-md"
              >
                UDee
              </Link>

              <div className="hidden md:flex items-center gap-x-6">
                <div className="relative">
                  <div
                    className={menuTriggerStyle}
                    onClick={() => handleMenuToggle("buy")}
                  >
                    <span className="font-normal">ซื้อ</span>
                    <IoIosArrowDown />
                  </div>
                  {openMenu === "buy" && <MegaMenuContent type="buy" />}
                </div>

                <div className="relative">
                  <div
                    className={menuTriggerStyle}
                    onClick={() => handleMenuToggle("rent")}
                  >
                    <span className="font-normal" >เช่า</span>
                    <IoIosArrowDown />
                  </div>
                  {openMenu === "rent" && <MegaMenuContent type="rent" />}
                </div>
              </div>
            </div>

            {/* Right Side Buttons */}
            <div className="hidden md:flex items-center gap-x-3">
              {user ? (
                <Link to="/forsales/propertyinfo">
                  <button className={btnNavStyle}>
                    <FiPlus size={20} />
                    ลงขาย
                  </button>
                </Link>
              ) : (
                <button 
                  className={btnNavStyle}
                  onClick={handleAuthModalOpen}
                >
                  <FiPlus size={20} />
                  ลงขาย
                </button>
              )}

              {user ? (
                // Profile Button
                <div className="relative" ref={profileRef}>
                  <button
                    className="flex items-center gap-2 bg-white px-4 py-2 rounded-full hover:shadow-lg transition-all duration-200 active:scale-95"
                    onClick={handleProfileToggle}
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {user.username ? user.username.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-[#000000] font-medium max-w-[120px] truncate">
                      {user.username || user.email.split('@')[0]}
                    </span>
                    <IoIosArrowDown className={`transition-transform duration-200 ${showProfileDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  {showProfileDropdown && (
                    <ProfileDropdown user={user} onLogout={handleLogout} />
                  )}
                </div>
              ) : (
                // Login Button
                <button className={btnNavStyle} onClick={handleAuthModalOpen}>
                  <IoIosLock size={20} />
                  เข้าสู่ระบบ/สมัครสมาชิก
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialView="login"
      />
    </>
  );
}

export default Navbar;