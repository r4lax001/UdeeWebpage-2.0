import React from 'react';
import BusinessImage from "../../assets/img/businessimg.png"; 

const Register = ({ onToggle }) => { 
  return (
    // Body / Full Screen Wrapper
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      
      {/* Container Card: 1560px x 848px */}
      <div className="bg-white max-w-[1560px] h-[848px] w-full rounded-xl shadow-2xl flex">
        
        {/* ส่วนซ้าย: Form (50% ของ 1560px) */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center p-12 lg:p-20">
          
          {/* Wrapper สำหรับ Form Content: จำกัดที่ 557px ตามรูปเป๊ะๆ */}
          <div className="max-w-[557px] mx-auto w-full">
            <h1 className="text-3xl font-semibold text-[#5C6063] mb-4">Register</h1>
            
            <form className="flex flex-col gap-4">
              {/* Username Input */}
              <div className="flex flex-col">
                <label className="font-semibold text-[#5C6063] text-base mb-1" htmlFor="username">Username</label>
                <input 
                  className="w-full h-[59px] border-2 border-gray-300 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-[#378ED0]"
                  type="text" 
                  placeholder="username" 
                  id="username"
                />
              </div>

              {/* Email Input */}
              <div className="flex flex-col">
                <label className="font-semibold text-[#5C6063] text-base mb-1" htmlFor="email">Email</label>
                <input 
                  className="w-full h-[59px] border-2 border-gray-300 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-[#378ED0]"
                  type="email" 
                  placeholder="email" 
                  id="email"
                />
              </div>

              {/* Password / Confirm Password */}
              <div className="flex justify-between gap-4"> 
                {/* Password Input */}
                <div className="flex flex-col flex-1"> 
                  <label className="font-semibold text-[#5C6063] text-base mb-1" htmlFor="password">Password</label>
                  <input  
                    className="w-full h-[59px] border-2 border-gray-300 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-[#378ED0]" 
                    type="password" 
                    placeholder="password"
                    id="password"
                  />
                </div>
                
                {/* Confirm Password Input */}
                <div className="flex flex-col flex-1"> 
                  <label className="font-semibold text-[#5C6063] text-base mb-1" htmlFor="confirm-password">Confirm password</label>
                  <input  
                    className="w-full h-[59px] border-2 border-gray-300 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-[#378ED0]" 
                    type="password" 
                    placeholder="confirm password"
                    id="confirm-password"
                  />
                </div>
              </div>
              
              {/* User Type Select */}
              <div className="flex flex-col">
                <label className="font-semibold text-[#5C6063] text-base mb-1" htmlFor="user-type">User Type</label>
                <select 
                    className="w-full h-[59px] border-2 border-gray-300 rounded-xl px-4 text-gray-500 appearance-none focus:outline-none focus:ring-2 focus:ring-[#378ED0]" 
                    id="user-type"
                >
                    <option className="text-gray-500">user type</option>
                    <option value="th">Thailand</option>
                    <option value="us">United States</option>
                    <option value="jp">Japan</option>
                </select>
              </div>

              {/* Agreement Checkbox */}
              <div className="flex items-center space-x-2">
                  <input id="agree" type="checkbox" className="w-4 h-4 accent-[#378ED0] focus:ring-[#378ED0]" />
                  <label htmlFor="agree" className="text-[#5C6063]">
                      I agree to the <a href="#" className="text-[#4797D4] hover:underline">Terms of Privacy Policy</a>
                  </label>
              </div>
              
              {/* Register Button */}
              <button 
                type="submit" 
                className="w-full h-[59px] bg-[#976FC8] text-white rounded-xl flex items-center justify-center font-semibold text-xl mt-4 hover:bg-[#B294D6] transition duration-150"
              >
                Register
              </button>
            </form>
            
            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 border-t-2 border-[#D5D5D5]"></div>
              <p className="text-[#D5D5D5] text-sm">or connect with</p>
              <div className="flex-1 border-t-2 border-[#D5D5D5]"></div>
            </div>

            {/* Social Register Button */}
            <button className="w-full h-[59px] bg-[#FFFFFF] border-2 border-gray-300 rounded-xl flex items-center justify-center mb-4 hover:bg-gray-50 transition duration-150">
              {/* Placeholder for social media icon/content */}
            </button>
            
            {/* Login Link */}
            <p className="flex justify-center gap-1 text-[#5C6063]">
              Already have account?
              <a 
                className="text-[#4797D4] underline hover:text-blue-700" 
                href="#"
                onClick={(e) => { e.preventDefault(); onToggle('login'); }} 
              >
                Login
              </a>
            </p>
          </div>
        </div>

        {/* Image */}
        <div className="hidden lg:flex w-1/2 justify-center items-center">
          <img 
            src={BusinessImage} 
            alt="Business Center Building" 
            className="max-w-[698px] w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;