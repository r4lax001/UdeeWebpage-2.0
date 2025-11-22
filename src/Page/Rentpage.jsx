import React, { useState } from "react";

import PropertyImageCollage from "../components/inRentpage/PropertyImageCollage";
import Header from "../components/inRentpage/Header";
import PropertyDetails from "../components/inRentpage/PropertyDetails";
import RelatedProperties from "../components/RelatedProperties";
import PropertyDescription from "../components/inRentpage/PropertyDescription";
import GoogleMapPicker from "../components/GoogleMapPicker";

function Rentpage() {
  //  เก็บที่อยู่จากแผนที่
  const [mapAddress, setMapAddress] = useState("");

  //  ฟังก์ชันรับที่อยู่จาก GoogleMapPicker
  const handleAddressChange = (newAddress) => {
    setMapAddress(newAddress);
    console.log("ที่อยู่ที่เลือก:", newAddress);
  };

  return (
    <div>
      <PropertyImageCollage />
      <Header />
      <PropertyDetails />
      <div className="flex gap-20 max-w-[1500px] mx-auto ">
        <PropertyDescription />
          <GoogleMapPicker
            mapAddress={mapAddress}
            onAddressChange={handleAddressChange}
          />
      </div>
      <RelatedProperties />
    </div>
  );
}

export default Rentpage;
