import React from 'react';
import BusinessImage from "../../assets/img/businessimg.png"; 


const Login = ({ onToggle }) => { 
  return (
    // Body / Full Screen Wrapper
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      
      {/* Container Card: 1560px x 848px */}
      <div className="bg-white max-w-[1560px] h-[848px] w-full rounded-xl shadow-2xl flex">
        
        {/* ส่วนซ้าย: Form (50% ของ 1560px) */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center p-12 lg:p-20">
          
          {/* Wrapper สำหรับ Form Content:*/}
          <div className="max-w-[557px] mx-auto w-full"> 
            <h1 className="text-3xl font-semibold text-[#5C6063] mb-7">Login</h1>
            
            <form className="flex flex-col gap-4">
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

              {/* Password Input */}
              <div className="flex flex-col">
                <label className="font-semibold text-[#5C6063] text-base mb-1" htmlFor="password">Password</label>
                <input  
                  className="w-full h-[59px] border-2 border-gray-300 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-[#378ED0]"
                  type="password" 
                  placeholder="password"
                  id="password"
                />
              </div>

              {/* Forget Password Link */}
              <a className="text-[#4797D4] text-right mt-2 hover:underline" href="#">Forget password</a>

              {/* Login Button */}
              <button 
                type="submit" 
                className="w-full h-[59px] bg-[#976FC8] text-white rounded-xl flex items-center justify-center font-semibold text-xl mt-4 hover:bg-[#B294D6] transition duration-150"
              >
                Login
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 border-t-2 border-[#D5D5D5]"></div>
              <p className="text-[#D5D5D5] text-sm">or connect with</p>
              <div className="flex-1 border-t-2 border-[#D5D5D5]"></div>
            </div>

            {/* Social Login Button */}
            <button className="w-full h-[59px] bg-[#FFFFFF] border-2 border-gray-300 rounded-xl flex items-center justify-center mb-4 hover:bg-gray-50 transition duration-150">
              {/* Placeholder for social media icon/content */}
            </button>
            
            {/* Register Link */}
            <p className="flex justify-center gap-1 text-[#5C6063]">
              Don't have account yet 
              <a 
                className="text-[#4797D4] underline hover:text-blue-700" 
                href="#"
                onClick={(e) => { e.preventDefault(); onToggle('register'); }}
              >
                Register
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

export default Login;