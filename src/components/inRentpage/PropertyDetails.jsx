import React from 'react';
import { FaBuilding, FaBed, FaCar, FaTag } from "react-icons/fa";
import { IoIosPin } from "react-icons/io";
import { BsTextareaResize } from "react-icons/bs";
import { FaLayerGroup } from "react-icons/fa";
import { MdBathtub } from "react-icons/md";

import Data from "../../data/propertyData_rent"

const DetailItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-3">
    <span className="text-gray-700 text-[24px] mt-0.5">{icon}</span>
    <div>
      <p className="text-[16px] text-gray-600">{label}</p>
      {value && <p className="font-medium text-gray-900 text-[18px]">{value}</p>}
    </div>
  </div>
);

function PropertyDetails() {

  return (
    <div className="container max-w-[1500px] mx-auto px-4 py-8">
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20'>
        <div className="grid grid-cols-1 gap-8">
          <DetailItem
            icon={<FaBuilding />}
            label="ชื่อโครงการ"
            value={Data.details.projectName}
          />
          <DetailItem
            icon={<IoIosPin />}
            label="ที่อยู่"
            value={Data.details.address}
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12">
          <DetailItem
            icon={<BsTextareaResize />}
            label="ขนาด"
            value={Data.details.size}
          />
          <DetailItem
            icon={<FaLayerGroup />}
            label="ชั้น"
            value={Data.details.floor}
          />
          <DetailItem
            icon={<FaBed />}
            label="ห้องนอน"
            value={Data.details.bedroom}
          />
          <DetailItem
            icon={<MdBathtub />}
            label="ห้องน้ำ"
            value={Data.details.bathroom}
          />
          <DetailItem
            icon={<FaCar />}
            label="ที่จอดรถ"
            value={Data.details.parking}
          />
          <DetailItem
            icon={<FaTag />}
            label={Data.details.type}
            value={null}
          />
        </div>
      </div>
    </div>
  );
}

export default PropertyDetails;