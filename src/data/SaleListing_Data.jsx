import Product1 from "../assets/img/Product1.png";
import Product2 from "../assets/img/Product2.png";
import Product3 from "../assets/img/Product3.png";
import Product4 from "../assets/img/Product4.png";

const SaleListing_Data = [
  {
    id: "SC0001",
    type: "sale",
    title: "ขายคอนโดหรู Happy Condo Ratchada 18 ใกล้ MRT สุทธิสาร",
    price: 15990000,
    location: { district: "ห้วยขวาง", subDistrict: "สามเสนนอก" },
    details: { size: 30, bedroom: 1, bathroom: 1 },
    images: [Product1],
  },
  {
    id: "SC0002",
    type: "sale",
    title: "ขายบ้านเดี่ยว 2 ชั้น ย่านลาดพร้าว ใกล้ BTS โชคชัย4",
    price: 8990000,
    location: { district: "ลาดพร้าว", subDistrict: "ลาดพร้าว 71" },
    details: { size: 50, bedroom: 3, bathroom: 2 },
    images: [Product2],
  },
  {
    id: "SC0003",
    type: "sale",
    title: "ขายทาวน์โฮม 3 ชั้น โครงการใหม่ ทำเลดี ใกล้รถไฟฟ้า",
    price: 5590000,
    location: { district: "บางนา", subDistrict: "บางนาเหนือ" },
    details: { size: 28, bedroom: 2, bathroom: 2 },
    images: [Product3],
  },
  {
    id: "SC0004",
    type: "sale",
    title: "ขายคอนโดพร้อมอยู่ ใจกลางเมือง วิวสวย ชั้นสูง",
    price: 3990000,
    location: { district: "ปทุมวัน", subDistrict: "สยาม" },
    details: { size: 24, bedroom: 1, bathroom: 1 },
    images: [Product4],
  },
  {
    id: "SC0005",
    type: "sale",
    title: "ขายบ้านเดี่ยวสไตล์โมเดิร์น สวยมาก",
    price: 12500000,
    location: { district: "บางเขน", subDistrict: "ออเงิน" },
    details: { size: 60, bedroom: 4, bathroom: 3 },
    images: [Product1],
  },
  {
    id: "SC0006",
    type: "sale",
    title: "ขายคอนโดทำเลทอง ใกล้ MRT รัชดา",
    price: 3200000,
    location: { district: "รัชดา", subDistrict: "ดินแดง" },
    details: { size: 26, bedroom: 1, bathroom: 1 },
    images: [Product2],
  },
  {
    id: "SC0007",
    type: "sale",
    title: "ขายทาวน์โฮมพร้อมอยู่ ใกล้แฟชั่นไอส์แลนด์",
    price: 2750000,
    location: { district: "คันนายาว", subDistrict: "เสรีไทย" },
    details: { size: 30, bedroom: 2, bathroom: 2 },
    images: [Product3],
  },
  {
    id: "SC0008",
    type: "sale",
    title: "ขายบ้านเดี่ยวโครงการหรู กว้างขวาง",
    price: 17900000,
    location: { district: "บางใหญ่", subDistrict: "บางแม่นาง" },
    details: { size: 80, bedroom: 5, bathroom: 4 },
    images: [Product4],
  }
];

export default SaleListing_Data;