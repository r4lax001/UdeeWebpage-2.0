import React, { useState } from 'react';

import { BsChatDotsFill } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { IoCallOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { FaLine } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

function SpeedDial() {

  const [isOpen, setIsOpen] = useState(false);
  
  
  const pst = 'fixed bottom-8 right-20 top-30 mb-10 z-50 flex flex-col items-end';
  
  const ccc = 'absolute -top-4 left-5 bg-[#FF006E] text-white font-bold py-1 px-4 rounded-lg text-sm'

  return (
    <div className={pst}>
      
      <div 
        className={`
          bg-white w-80 rounded-2xl shadow-xl p-5 mb-4 
          transform transition-all duration-300 ease-in-out
          relative
          ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5 pointer-events-none'}
        `}
      >
        <div className={ccc}>
          รายละเอียดผู้ขาย
        </div>

        <div className="flex items-center gap-3 mt-6 mb-5">
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
            <IoPersonOutline size={28} className="text-gray-600" />
          </div>
          <p className="font-semibold text-gray-900 text-lg">
            Alivar Estate Alivar Estate
          </p>
        </div>

        <div className="flex flex-col gap-3">
          
          <div className="flex items-center gap-3 w-full py-3 px-4 rounded-lg border border-gray-300 
                          cursor-pointer hover:bg-gray-50 transition-colors duration-200">
            <FaLine size={24} className="text-green-500" />
            <span className="text-gray-800 font-medium">@Aliva001</span>
          </div>
          
          <div className="flex items-center gap-3 w-full py-3 px-4 rounded-lg border border-gray-300 
                          cursor-pointer hover:bg-gray-50 transition-colors duration-200">
            <MdOutlineEmail size={24} className="text-[#FF006E]" />
            <span className="text-gray-800 font-medium">aliva001@gmail.com</span>
          </div>

          <div className="flex items-center gap-3 w-full py-3 px-4 rounded-lg border border-gray-300 
                          cursor-pointer hover:bg-gray-50 transition-colors duration-200">
            <IoCallOutline size={24} className="text-gray-700" />
            <span className="text-gray-800 font-medium">xxx-xxx-xxxx</span>
          </div>

        </div>
      </div>
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-[#FF006E] text-white flex items-center justify-center shadow-2xl transform transition-all duration-300 ease-in-out hover:scale-110"
      >
        <div className={`transition-transform duration-300 ${isOpen ? 'rotate-90' : 'rotate-0'}`}>
          {isOpen ? <IoClose size={32} /> : <BsChatDotsFill size={28} />}
        </div>
      </button>
    </div>
  );
}

export default SpeedDial;