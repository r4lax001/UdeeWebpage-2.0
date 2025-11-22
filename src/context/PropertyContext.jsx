import { createContext, useContext, useState } from "react";

const PropertyContext = createContext();

export const PropertyProvider = ({ children }) => {
  const [propertyData, setPropertyData] = useState({
    announceType: "ขาย",
    propertyType: "คอนโด",
    projectName: "",
    title: "",
    details: "",
    price: "",
    rentPrice: "",
    area: "",
    floor: "",
    bedroom: "",
    bathroom: "",
    parking: "",
    mapAddress: "",
    media: [],
  });

  return (
    <PropertyContext.Provider value={{ propertyData, setPropertyData }}>
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperty = () => useContext(PropertyContext);