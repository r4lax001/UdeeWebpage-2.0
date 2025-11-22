import React from "react";

import PropertyImageCollage from "../components/inSalepage/PropertyImageCollage";
import Header from "../components/inSalepage/Header";
import PropertyDetails from "../components/inSalepage/PropertyDetails";
import LoanCalculator from "../components/LoanCalculator";
import RelatedProperties from "../components/RelatedProperties";
import PropertyDescription from "../components/inSalepage/PropertyDescription";

import GoogleMapView from "../components/GoogleMapView";

function Salepage() {
  // พิกัดบ้านที่คุณต้องการแสดง
  const DEFAULT_LAT = 13.679780;
  const DEFAULT_LNG = 100.406250;

  // ที่อยู่ที่ต้องการให้โชว์
  const ADDRESS_TEXT =
    "11 Soi Kanchanaphisek 3, Bang Bon Nuea, Bang Bon, Bangkok 10150";

  return (
    <>
      <PropertyImageCollage />
      <Header />
      <PropertyDetails />

      <div className="flex max-w-[1500px] gap-10 mx-auto">
        <PropertyDescription />

        <div className="w-[600px]">
          <h2 className="text-[20px] font-medium mb-3">แผนที่</h2>
          <GoogleMapView
            lat={DEFAULT_LAT}
            lng={DEFAULT_LNG}
            address={ADDRESS_TEXT}
          />
        </div>
      </div>

      <LoanCalculator />
      <RelatedProperties />
    </>
  );
}

export default Salepage;