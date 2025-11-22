const propertyData_sale = {
  id: "RC094125",
  type: "sale", // "rent" or "sale"
  title: "ให้เช่า Condo Happy Condo Ratchada 18 ใกล้ MRT สุทธิสาร",
  price: 15990000,
  priceUnit: "บาท", // "เดือน" for rent, "บาท" for sale

  location: {
    district: "ห้วยขวาง",
    subDistrict: "สามเสนนอก",
    province: "กรุงเทพมหานคร",
    nearbyTransit: "MRT สุทธิสาร",
  },

  details: {
    projectName: "Happy Condo Ratchada 18",
    address: "สามเสนนอก, ห้วยขวาง, กรุงเทพมหานคร",
    bedroom: 1,
    bathroom: 1,
    floor: 15,
    totalFloors: 30,
    parking: "1",
    size: 30, // ตารางเมตร
    type: "ขาย",
  },

  // Images
  images: [
    "/images/property/main.jpg",
    "/images/property/bedroom.jpg",
    "/images/property/bathroom.jpg",
    "/images/property/living-room.jpg",
    "/images/property/kitchen.jpg",
    "/images/property/view.jpg",
  ],
};

export default propertyData_sale;
