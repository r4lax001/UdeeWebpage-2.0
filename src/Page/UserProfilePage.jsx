import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaUserCircle, FaPen, FaRegFileAlt, FaRegHeart, 
  FaBullhorn, FaRegLifeRing, FaSignOutAlt 
} from "react-icons/fa";

import Navbar from "../components/inappLayout/Navbar";
import Footer from "../components/inappLayout/Footer";
import { useAuth } from "../context/AuthContext";

const SidebarMenuItem = ({ icon, text, active, onClick }) => {
  return (
    <button 
      className={`flex items-center gap-4 px-6 py-4 rounded-xl transition-all duration-300 group relative overflow-hidden w-full
        ${active 
          ? 'bg-[#AF8FE9] text-white shadow-lg scale-105' 
          : 'text-gray-600 hover:bg-gray-50'
        }`}
      onClick={onClick}
    >
      <div className={`${active ? 'text-white' : 'text-[#AF8FE9] group-hover:scale-110'} transition-transform duration-300`}>
        {icon}
      </div>
      <span className={`font-medium ${active ? 'font-semibold' : ''}`}>{text}</span>
    </button>
  );
};

const InfoRow = ({ label, value }) => (
  <div className="py-3 px-4 rounded-lg hover:bg-purple-50 transition-colors duration-200">
    <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">{label}</p>
    <p className="text-lg font-semibold text-gray-800">{value || '-'}</p>
  </div>
);

function UserProfilePage() {
  const [activeMenu, setActiveMenu] = useState('profile');
  const [isChecking, setIsChecking] = useState(true);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // รอให้ component mount เสร็จก่อน
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsChecking(false);
      if (!isAuthenticated) {
        console.log('❌ Not authenticated after check, redirecting...');
        navigate('/');
      } else {
        console.log('✅ User authenticated:', user?.email);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isAuthenticated, navigate, user]);

  const handleLogout = () => {
    if (window.confirm('คุณต้องการออกจากระบบหรือไม่?')) {
      logout();
      navigate('/');
    }
  };

  const handleEditProfile = () => {
    console.log("Navigating to edit profile...");
    alert("เปิดหน้าแก้ไขข้อมูล");
  };

  // แสดง loading ระหว่างตรวจสอบ
  if (isChecking || !user) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen bg-[#F4F0FF]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#AF8FE9] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">กำลังโหลดข้อมูล...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* เพิ่ม Navbar ตรงนี้ */}
      <Navbar />
      
      <div className="flex min-h-screen bg-[#F4F0FF]">
        
        {/* Sidebar with Glass Morphism */}
        <aside className="w-80 bg-white backdrop-blur-xl shadow-2xl p-6 flex flex-col">
          
          {/* Profile Section */}
          <div className="relative mb-8 p-6 rounded-2xl bg-[#AF8FE9] shadow-xl">
            <div className="flex items-center gap-4">
              <div className="relative group">
                <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center ring-4 ring-white/30 group-hover:ring-white/50 transition-all duration-300">
                  {user.avatarUrl ? 
                    <img src={user.avatarUrl} alt="Avatar" className="w-full h-full rounded-full object-cover"/> :
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center">
                      <span className="text-3xl font-bold text-white">
                        {user.username ? user.username.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  }
                </div>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform duration-200">
                  <FaPen size={12} className="text-[#AF8FE9]" />
                </div>
              </div>
              <div className="flex-grow text-white">
                <h2 className="text-xl font-bold tracking-wide">{user.username || user.email.split('@')[0]}</h2>
                <p className="text-sm text-white/80 font-medium">ID: {user.email.split('@')[0]}</p>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex flex-col gap-2 flex-grow">
            <SidebarMenuItem 
              icon={<FaRegFileAlt size={20} />} 
              text="ประกาศล่าสุด" 
              active={activeMenu === 'latest'}
              onClick={() => setActiveMenu('latest')}
            />
            <SidebarMenuItem 
              icon={<FaRegHeart size={20} />} 
              text="ประกาศที่ถูกใจ" 
              active={activeMenu === 'liked'}
              onClick={() => setActiveMenu('liked')}
            />
            <SidebarMenuItem 
              icon={<FaBullhorn size={20} />} 
              text="ประกาศของฉัน" 
              active={activeMenu === 'myposts'}
              onClick={() => setActiveMenu('myposts')}
            />
            <SidebarMenuItem 
              icon={<FaRegLifeRing size={20} />} 
              text="ช่วยเหลือ" 
              active={activeMenu === 'help'}
              onClick={() => setActiveMenu('help')}
            />
          </nav>

          {/* Logout Section */}
          <div className="mt-auto pt-6 border-t border-gray-200">
            <button 
              onClick={handleLogout} 
              className="flex items-center gap-4 px-6 py-4 rounded-xl text-gray-700 hover:bg-red-50 hover:text-red-500 w-full transition-all duration-200 group"
            >
              <FaSignOutAlt size={20} className="group-hover:rotate-12 transition-transform duration-200" />
              <span className="font-medium">ออกจากระบบ</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-10 overflow-auto">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-10">
              <h1 className="text-5xl font-bold text-gray-800 mb-2">
                ข้อมูลส่วนตัว
              </h1>
              <p className="text-gray-600">จัดการและแก้ไขข้อมูลของคุณ</p>
            </div>
            
            {/* Profile Card */}
            <div className="bg-white rounded-3xl shadow-2xl p-10 hover:shadow-purple-200/50 transition-all duration-500">
              
              {/* Avatar Section */}
              <div className="flex justify-center mb-8 relative">
                <div className="relative group">
                  {/* Animated Ring */}
                  <div className="absolute -inset-2 rounded-full bg-[#AF8FE9] opacity-20 animate-pulse"></div>
                  
                  {/* Avatar Container */}
                  <div className="relative w-40 h-40 rounded-full bg-purple-50 flex items-center justify-center ring-8 ring-white shadow-xl group-hover:scale-105 transition-transform duration-300">
                    {user.avatarUrl ? 
                      <img src={user.avatarUrl} alt="Avatar" className="w-full h-full rounded-full object-cover"/> :
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                        <span className="text-6xl font-bold text-white">
                          {user.username ? user.username.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    }
                  </div>
                  
                  {/* Edit Badge */}
                  <div className="absolute bottom-2 right-2 w-12 h-12 bg-[#AF8FE9] rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 hover:bg-[#9A7DD0] transition-all duration-200">
                    <FaPen size={16} className="text-white" />
                  </div>
                </div>
              </div>
              
              {/* Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <InfoRow label="ชื่อผู้ใช้" value={user.username || user.email.split('@')[0]} />
                <InfoRow label="User Type" value={user.userType || 'Personal'} />
                <InfoRow label="สมาชิกตั้งแต่" value={user.loginTime ? new Date(user.loginTime).toLocaleDateString('th-TH', {year: 'numeric', month: 'long', day: 'numeric'}) : '-'} />
                <InfoRow label="อีเมล" value={user.email} />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button 
                  onClick={handleEditProfile}
                  className="flex-1 py-4 px-8 bg-[#AF8FE9] text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 hover:bg-[#9A7DD0] transition-all duration-300"
                >
                  แก้ไขข้อมูล
                </button>
                
                <button 
                  onClick={() => navigate('/')}
                  className="py-4 px-8 bg-gray-100 text-gray-700 font-bold rounded-xl shadow-md hover:shadow-lg hover:bg-gray-200 transition-all duration-300"
                >
                  กลับหน้าแรก
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300">
                <div className="text-3xl font-bold text-[#AF8FE9] mb-2">0</div>
                <div className="text-sm text-gray-600">ประกาศทั้งหมด</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300">
                <div className="text-3xl font-bold text-[#AF8FE9] mb-2">0</div>
                <div className="text-sm text-gray-600">ถูกใจ</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default UserProfilePage;