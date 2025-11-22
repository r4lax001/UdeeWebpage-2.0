import React from "react";

// Property Data
const propertyDescriptionData = {
  id: "RC094125",
  title: "ให้เช่า Condo Happy Condo Ratchada 18 ใกล้ MRT สุทธิสาร",

  pricing: {
    rent: 15990000,
    status: "ขาย"
  },

  details: [
    "บ้านขนาด 206-250 ตร.ม.",
    "4 ห้องนอน 4 ห้องน้ำ ",
    "บ้านเดี่ยว 2 ชั้น ",
  ],

  

  facilities: [
    "กล้องวงจรปิด",
    "คลับเฮ้าส์",
    "เครืองปรับอากาศ",
    "ทางเข้าหลัก",
    "แผงโซล่าเซลล์ (พลังงานแสงอาทิตย์)",
    "ฟิตเนส",
    "รักษาความปลอดภัย 24 ชม.",
    "ลานจอดรถ",
    "สถานีชาร์จรถไฟฟ้า (ev)",
    "สนามเด็กเล่น",
    "สระว่ายน้ำ",
    "สวนสาธารณะ",
  ],

  nearbyPlaces: ["แฟชั่นไอส์แลนด์", "โรงเรียนเตรียมอุดมศึกษาน้อมเกล้า", "โรงเรียนนานาชาติแอสคอต","รถไฟฟ้า MRT นพรัตน์"],

  location: {
    address: "กาญจนาภิเษก 11/3 แยก 4, คันนายาว, คันนายาว, กรุงเทพมหานคร",
  },

  contact: {
    line: {
      id: "@Udee",
      url: "https://line.me/R/ti/p/@180acmsu",
    },
    phone: "xxx-xxx-xxx",
    email: "Udee@gmail.com",
  },

  company: {
    name: "UDEE WEBPAGE",
    description: "รับฝากขาย-เช่า อสังหาริมทรัพย์",
  },
};



const DetailSection = ({ title, children }) => (
  <div className="mt-6">
    <h3 className="text-lg font-medium text-gray-800 mb-2">{title}</h3>
    <div className="space-y-1 text-gray-700 font-medium text-base">
      {children}
    </div>
  </div>
);

function PropertyDescription() {
  const data = propertyDescriptionData;

  return (
    <div className="flex justify-start">
      <div className="container w-[700px] mx-auto px-4 mt-10">
        <h2 className="text-[28px] md:text-[32px] font-medium mb-3">
          รายละเอียด
        </h2>

        <p className="text-lg md:text-xl text-black font-medium mb-2">
          {data.id} {data.title}
        </p>

        <p className="text-base text-gray-600 font-medium">
          ราคา : {data.pricing.rent.toLocaleString()} บาท
        </p>
        <p className="text-base text-gray-600 font-medium">
          สถานะ : {data.pricing.status.toLocaleString()} 
        </p>

        <DetailSection title="รายละเอียด :">
          {data.details.map((detail, index) => (
            <p key={index}>- {detail}</p>
          ))}
        </DetailSection>

        <DetailSection title="สิ่งอำนวยความสะดวก :">
          <p>{data.facilities.join(" / ")}</p>
        </DetailSection>

        <DetailSection title="สถานที่สำคัญใกล้เคียง :">
          <p>{data.nearbyPlaces.join(" / ")}</p>
        </DetailSection>

        <DetailSection title="Location :">
          <p>
            {data.location.address} {data.location.subDistrict}{" "}
            {data.location.district} {data.location.province}
          </p>
        </DetailSection>

        <DetailSection title="Contact :">
          <p>
            Line: {data.contact.line.id} click {data.contact.line.url}
          </p>
          <p>CALL: {data.contact.phone}</p>
          <p>Email: {data.contact.email}</p>
          <p>Wechat: {data.contact.wechat}</p>
        </DetailSection>

        <div className="mt-6">
          <p className="font-semibold text-black text-base">
            {data.company.name}
          </p>
          <p className="text-gray-600 font-medium text-base">
            {data.company.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PropertyDescription;
