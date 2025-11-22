import React from 'react';


import PropertyCard from './Card/PropertyCard'; 


import Rec1 from '../assets/img/Rectangle 11.png'
import Rec2 from '../assets/img/Rectangle 12.png'
import Rec3 from '../assets/img/Rectangle 13.png'
import Rec4 from '../assets/img/Rectangle 14.png'

function RelatedProperties() {

  // 3. สร้างข้อมูลตัวอย่าง (ในโปรเจกต์จริงจะมาจาก API)

  const properties = [
    {
      id: 1,
      imageUrl: Rec1,
      code: "RC093825",
      title: "Condo เฟอร์นิเจอร์",
      location: "กรุงเทพมหานคร",
      price: 14500
    },
    {
      id: 2,
      imageUrl: Rec2,
      code: "RC093825",
      title: "Condo เฟอร์นิเจอร์",
      location: "กรุงเทพมหานคร",
      price: 14500
    },
    {
      id: 3,
      imageUrl: Rec3,
      code: "RC093825",
      title: "Condo เฟอร์นิเจอร์",
      location: "กรุงเทพมหานคร",
      price: 14500
    },
    {
      id: 4,
      imageUrl: Rec4,
      code: "RC093825",
      title: "Condo เฟอร์นิเจอร์",
      location: "กรุงเทพมหานคร",
      price: 14500
    },
  ];

  return (
    <div className="container max-w-[1500px] mx-auto  py-12">
      
      <hr className="mb-10 border-gray-200" /> 

      <h2 className="text-[36px] font-medium text-gray-900 mb-8">
        สินค้าใกล้เคียง
      </h2>

      <div className="flex gap-5 cursor-pointer ">
        
        {properties.map(property => (
          <PropertyCard
            key={property.id} // key สำคัญสำหรับการ loop ใน React
            imageUrl={property.imageUrl}
            code={property.code}
            title={property.title}
            location={property.location}
            price={property.price}
          />
        ))}
      </div>
    </div>
  );
}

export default RelatedProperties;