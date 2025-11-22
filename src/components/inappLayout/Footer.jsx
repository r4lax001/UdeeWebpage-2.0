import React from 'react';
import { SiGmail } from "react-icons/si";
import { FaFacebook, FaLine, FaPhone } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";

function Footer() {
  return (
    <footer className="bg-[#B294D6] text-black mt-12 py-16 px-4">
      <div className="container max-w-[1500px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          <div className="md:col-span-2">
            <h2 className="text-5xl font-bold mb-4">UDee</h2>
            <h3 className="text-2xl font-bold mb-4">เกี่ยวกับเรา</h3>
            <div className="space-y-4 text-sm font-medium">
              <p>
                ยินดีต้อนรับสู่ UDee - แพลตฟอร์มออนไลน์ที่รวบรวมข้อมูลและ
                บริการเช่า-ขายอสังหาริมทรัพย์ครบวงจรที่สุด
                เพื่อให้คุณค้นหาที่อยู่อาศัยและลงทุนได้ตอบโจทย์ความต้องการ
              </p>
              <p>
                ที่ UDee เราเข้าใจว่าการหาบ้าน
                หรือการลงทุนในอสังหาริมทรัพย์ไม่ใช่เรื่องง่าย ไม่ว่าจะเป็นการเช่าคอนโดมิเนียม
                บ้านเดี่ยว ที่ดิน หรือร้านค้า เราจึงมุ่งมั่นสร้างแพลตฟอร์มที่ใช้งานง่าย
                มีข้อมูลครบถ้วน และเชื่อถือได้ เพื่อให้คุณสามารถตัดสินใจได้อย่างมั่นใจ
              </p>
            </div>
          </div>

          <div className="md:col-span-1 md:border-l md:border-gray-700 md:pl-12">
            <h3 className="text-2xl font-bold mb-6">ติดต่อ UDee</h3>
            
            <div className="flex flex-col gap-5 text-sm font-medium">
              
              <a 
                href="mailto:UDee@mail.net" 
                className="flex items-center gap-3 transition-opacity hover:opacity-70"
              >
                <SiGmail className="text-2xl" />
                <span>UDee@mail.net</span>
              </a>
              
              <a 
                href="#" 
                className="flex items-center gap-3 transition-opacity hover:opacity-70"
              >
                <FaFacebook className="text-2xl" />
                <span>UDee</span>
              </a>
              
              <a 
                href="#" 
                className="flex items-center gap-3 transition-opacity hover:opacity-70"
              >
                <FaLine className="text-2xl" />
                <span>@UDee</span>
              </a>
              
              <div className="flex items-center gap-3">
                <IoLocationSharp className="text-2xl" />
                <span>มหาวิทยาลัยศรีปทุม วิทยาเขตบางเขน</span>
              </div>
              
              <div className="flex items-center gap-3">
                <FaPhone className="text-2xl" />
                <span>+66 98 659 0827</span>
              </div>
              
            </div>
          </div>
          
        </div>
      </div>
    </footer>
  );
}

export default Footer;