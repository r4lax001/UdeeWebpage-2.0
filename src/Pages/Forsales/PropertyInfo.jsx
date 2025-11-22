import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useProperty } from "../../context/PropertyContext";
import CustomSelect from "../../components/CustomSelect";
import PreviewCard from "../../components/PreviewCard";
import Navbar from "../../components/inappLayout/Navbar";

export default function PropertyInfo() {
  const { propertyData, setPropertyData } = useProperty();
  const detailsRef = useRef();

  const handleChange = (field, value) => {
    setPropertyData((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    if (detailsRef.current) {
      detailsRef.current.style.height = "auto";
      detailsRef.current.style.height = detailsRef.current.scrollHeight + "px";
    }
  }, [propertyData.details]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("บันทึกข้อมูลทรัพย์เรียบร้อย!");
  };

  return (
    <div className="bg-gray-100 min-h-screen text-gray-800 font-[Prompt]">
      <Navbar />

      <main className="max-w-7xl mx-auto py-10 px-6">
        <div className="text-sm text-gray-500 mb-8">
          หน้าหลัก &gt; ลงประกาศ &gt; ข้อมูลทรัพย์
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* ===== ฟอร์มกรอกข้อมูล ===== */}
          <section className="flex-1 bg-white rounded-2xl shadow-md p-8 border border-gray-100">
            <div className="flex justify-center items-center border-b border-gray-200 mb-6 gap-32">
              <p className="text-accentPurple font-medium border-b-2 border-accentPurple pb-2">
                ข้อมูลทรัพย์
              </p>
              <p className="text-gray-400">เจ้าของประกาศ</p>
            </div>

            <h2 className="text-lg font-medium mb-6 text-gray-800">
              กรอกข้อมูลอสังหาฯ
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* CustomSelect: ประเภทประกาศ */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  ประเภทประกาศ *
                </label>
                <CustomSelect
                  options={["ขาย", "เช่า", "ขายและเช่า"]}
                  value={propertyData.announceType}
                  onChange={(v) => handleChange("announceType", v)}
                />
              </div>

              {/* CustomSelect: ประเภทของทรัพย์ */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  ประเภทของทรัพย์ *
                </label>
                <CustomSelect
                  options={["คอนโด", "บ้านเดี่ยว", "ทาวน์โฮม", "ที่ดิน"]}
                  value={propertyData.propertyType}
                  onChange={(v) => handleChange("propertyType", v)}
                />
              </div>

              {/* Input: โครงการ */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  โครงการ *
                </label>
                <input
                  type="text"
                  placeholder="ค้นหาโครงการ"
                  className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-sm 
                             focus:ring-2 focus:ring-mainPurple outline-none"
                  value={propertyData.projectName}
                  onChange={(e) => handleChange("projectName", e.target.value)}
                />
              </div>

              {/* ห้องนอน / ห้องน้ำ */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    ห้องนอน *
                  </label>
                  <input
                    type="number"
                    min="0"
                    className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-sm 
                               focus:ring-2 focus:ring-mainPurple outline-none"
                    value={propertyData.bedroom}
                    onChange={(e) => handleChange("bedroom", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    ห้องน้ำ *
                  </label>
                  <input
                    type="number"
                    min="0"
                    className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-sm 
                               focus:ring-2 focus:ring-mainPurple outline-none"
                    value={propertyData.bathroom}
                    onChange={(e) => handleChange("bathroom", e.target.value)}
                  />
                </div>
              </div>

              {/* ที่จอดรถ */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  ที่จอดรถ
                </label>
                <input
                  type="number"
                  min="0"
                  className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-sm 
                             focus:ring-2 focus:ring-mainPurple outline-none"
                  value={propertyData.parking}
                  onChange={(e) => handleChange("parking", e.target.value)}
                />
              </div>

              {/* ชั้น / พื้นที่ใช้สอย */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    ชั้น *
                  </label>
                  <input
                    type="text"
                    className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-sm 
                               focus:ring-2 focus:ring-mainPurple outline-none"
                    value={propertyData.floor}
                    onChange={(e) => handleChange("floor", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    พื้นที่ใช้สอย (ตร.ม.) *
                  </label>
                  <input
                    type="number"
                    min="0"
                    className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-sm 
                               focus:ring-2 focus:ring-mainPurple outline-none"
                    value={propertyData.area}
                    onChange={(e) => handleChange("area", e.target.value)}
                  />
                </div>
              </div>

              {/* ราคาขาย */}
              {(propertyData.announceType === "ขาย" ||
                propertyData.announceType === "ขายและเช่า") && (
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    ราคาขายสุทธิ (บาท) *
                  </label>
                  <input
                    type="number"
                    min="0"
                    className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-sm 
                               focus:ring-2 focus:ring-mainPurple outline-none"
                    value={propertyData.price}
                    onChange={(e) => handleChange("price", e.target.value)}
                  />
                </div>
              )}

              {/* ค่าเช่า */}
              {(propertyData.announceType === "เช่า" ||
                propertyData.announceType === "ขายและเช่า") && (
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    ค่าเช่า (บาท) *
                  </label>
                  <input
                    type="number"
                    min="0"
                    className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-sm 
                               focus:ring-2 focus:ring-mainPurple outline-none"
                    value={propertyData.rentPrice}
                    onChange={(e) => handleChange("rentPrice", e.target.value)}
                  />
                </div>
              )}

              {/* หัวข้อประกาศ */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  หัวข้อประกาศ *
                </label>
                <input
                  type="text"
                  placeholder="เช่น คอนโดใหม่ใจกลางเมือง วิวสวย"
                  className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-sm 
                             focus:ring-2 focus:ring-mainPurple outline-none"
                  value={propertyData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                />
              </div>

              {/* รายละเอียด */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  รายละเอียด *
                </label>
                <textarea
                  ref={detailsRef}
                  placeholder="เช่น เฟอร์นิเจอร์ครบ พร้อมเข้าอยู่ ใกล้รถไฟฟ้า..."
                  className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-sm 
                             focus:ring-2 focus:ring-mainPurple outline-none resize-none"
                  value={propertyData.details}
                  onChange={(e) => handleChange("details", e.target.value)}
                />
              </div>

              <Link to="/forsales/propertyownerinfo" className="block">
                <button
                  type="submit"
                  className="w-full bg-[#976FC8] text-white rounded-lg py-2.5 
                             font-medium text-sm hover:bg-mainPurple transition"
                >
                  บันทึกและต่อไป
                </button>
              </Link>
            </form>
          </section>

          {/* ===== พรีวิว ===== */}
          <section className="flex-1 bg-white rounded-2xl shadow-md p-8 border border-gray-100">
            <h3 className="text-center font-medium mb-6 text-gray-800">
              พรีวิวหน้าประกาศของคุณ
            </h3>
            <PreviewCard />
          </section>
        </div>
      </main>
    </div>
  );
}
