import { useState } from "react";
import { useProperty } from "../context/PropertyContext";
import GoogleMapPicker from "./GoogleMapPicker";

export default function PreviewCard() {
  const [mapAddress, setMapAddress] = useState("");

  const handleAddressChange = (newAddress) => {
    setMapAddress(newAddress);
  };

  const { propertyData, setPropertyData } = useProperty();
  const {
    announceType,
    title,
    price,
    rentPrice,
    projectName,
    area,
    floor,
    bedroom,
    bathroom,
    parking,
    details,
    media = [],
  } = propertyData;

  const [activeTab, setActiveTab] = useState("image");

  // === เพิ่มรูป/วิดีโอ ===
  const handleMediaChange = (e) => {
    const files = Array.from(e.target.files);

    const newMedia = files.map((file) => ({
      id: Date.now() + Math.random(),
      url: URL.createObjectURL(file),
      type: file.type.startsWith("video") ? "video" : "image",
    }));

    setPropertyData((prev) => ({
      ...prev,
      media: [...(prev.media || []), ...newMedia],
    }));
  };

  // === ลบรูป/วิดีโอ ===
  const handleRemove = (id) => {
    setPropertyData((prev) => ({
      ...prev,
      media: prev.media.filter((m) => m.id !== id),
    }));
  };

  // === แยกสื่อรูป/วิดีโอ ตาม Tab ===
  const filteredMedia = media.filter((m) => m.type === activeTab);
  const mainMedia = filteredMedia[0];
  const smallMedia = filteredMedia.slice(1, 4);
  const extraCount = filteredMedia.length - 4;

  // === Render ===
  return (
    <section className="space-y-6">
      {/* --- Tabs --- */}
      <div className="flex space-x-4 justify-center border-b border-gray-200">
        <button
          className={`px-4 py-2 text-sm font-medium transition ${
            activeTab === "image"
              ? "text-purple-600 border-b-2 border-purple-600"
              : "text-gray-500 hover:text-purple-600"
          }`}
          onClick={() => setActiveTab("image")}
        >
          รูปภาพ
        </button>

        <button
          className={`px-4 py-2 text-sm font-medium transition ${
            activeTab === "video"
              ? "text-purple-600 border-b-2 border-purple-600"
              : "text-gray-500 hover:text-purple-600"
          }`}
          onClick={() => setActiveTab("video")}
        >
          วิดีโอ
        </button>
      </div>

      {/* --- Media Preview --- */}
      {filteredMedia.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-60 border-2 border-dashed border-gray-300 rounded-xl text-gray-400">
          <i
            className={`fa-regular ${
              activeTab === "image" ? "fa-image" : "fa-circle-play"
            } text-4xl`}
          ></i>
          <p className="mt-2 text-sm text-gray-500">
            ยังไม่มี{activeTab === "image" ? "รูปภาพ" : "วิดีโอ"}
          </p>
        </div>
      ) : (
        <>
          {/* --- Main Media --- */}
          {mainMedia && (
            <div className="relative w-full h-60 rounded-xl overflow-hidden shadow-sm">
              {mainMedia.type === "image" ? (
                <img
                  src={mainMedia.url}
                  alt="Main"
                  className="w-full h-full object-cover"
                />
              ) : (
                <video
                  src={mainMedia.url}
                  controls
                  className="w-full h-full object-cover"
                />
              )}
              <button
                className="absolute top-2 right-2 bg-white text-gray-700 rounded-full p-1.5 shadow hover:bg-red-100"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(mainMedia.id);
                }}
              >
                <i className="fa-solid fa-xmark text-xs"></i>
              </button>
            </div>
          )}

          {/* --- Small Media --- */}
          <div className="grid grid-cols-4 gap-2">
            {smallMedia.map((m) => (
              <div
                key={m.id}
                className="relative w-full h-20 rounded-lg overflow-hidden"
              >
                {m.type === "image" ? (
                  <img
                    src={m.url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <video
                    src={m.url}
                    controls
                    className="w-full h-full object-cover"
                  />
                )}
                <button
                  className="absolute top-1 right-1 bg-white text-gray-700 rounded-full p-1 shadow hover:bg-red-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(m.id);
                  }}
                >
                  <i className="fa-solid fa-xmark text-xs"></i>
                </button>
              </div>
            ))}

            {/* --- Extra Counter --- */}
            {extraCount > 0 && (
              <div className="flex items-center justify-center bg-gray-100 text-gray-600 rounded-lg text-sm font-medium">
                +{extraCount}
              </div>
            )}
          </div>
        </>
      )}

      {/* --- ปุ่มเพิ่มรูป/วิดีโอ --- */}
      <label className="inline-flex items-center gap-2 text-purple-600 text-sm font-medium cursor-pointer">
        <i className="fa-solid fa-plus"></i> เพิ่ม
        <input
          type="file"
          accept={activeTab === "image" ? "image/*" : "video/*"}
          multiple
          onChange={handleMediaChange}
          className="hidden"
        />
      </label>

      {/* --- รายละเอียดทรัพย์ --- */}
      <div className="border-t border-gray-200 pt-4 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`px-3 py-1 text-xs font-medium rounded-full ${
              announceType === "ขาย"
                ? "bg-green-100 text-green-700"
                : announceType === "เช่า"
                ? "bg-blue-100 text-blue-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {announceType}
          </span>

          <h2 className="text-lg font-medium text-gray-900">
            {title || "ยังไม่ได้ระบุหัวข้อ"}
          </h2>
        </div>

        <p className="text-sm text-gray-500">
          {projectName || "ยังไม่ได้ระบุชื่อโครงการ"}
        </p>

        <div className="text-xl font-medium text-gray-800">
          {announceType === "ขาย" && price
            ? `฿ ${Number(price).toLocaleString()}`
            : announceType === "เช่า" && rentPrice
            ? `฿ ${Number(rentPrice).toLocaleString()} /เดือน`
            : announceType === "ขายและเช่า"
            ? `ขาย: ฿ ${Number(price).toLocaleString()} | เช่า: ฿ ${Number(
                rentPrice
              ).toLocaleString()} /เดือน`
            : "-"}
        </div>
      </div>

      {/* --- ขนาด / รายละเอียด --- */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6 text-sm text-gray-700 border-t border-gray-200 pt-4">
        <div>
          <div className="flex items-center gap-2 text-gray-500">
            <i className="fa-solid fa-ruler-combined"></i>
            <span className="text-xs font-medium">ขนาดห้อง</span>
          </div>
          <span className="mt-0.5 text-gray-900 font-medium">
            {area ? `${area} ตร.ม.` : "-"}
          </span>
        </div>

        <div>
          <div className="flex items-center gap-2 text-gray-500">
            <i className="fa-solid fa-layer-group"></i>
            <span className="text-xs font-medium">ชั้น</span>
          </div>
          <span className="mt-0.5 text-gray-900 font-medium">{floor || "-"}</span>
        </div>

        <div>
          <div className="flex items-center gap-2 text-gray-500">
            <i className="fa-solid fa-bed"></i>
            <span className="text-xs font-medium">ห้องนอน</span>
          </div>
          <span className="mt-0.5 text-gray-900 font-medium">
            {bedroom || "-"}
          </span>
        </div>

        <div>
          <div className="flex items-center gap-2 text-gray-500">
            <i className="fa-solid fa-bath"></i>
            <span className="text-xs font-medium">ห้องน้ำ</span>
          </div>
          <span className="mt-0.5 text-gray-900 font-medium">
            {bathroom || "-"}
          </span>
        </div>

        <div>
          <div className="flex items-center gap-2 text-gray-500">
            <i className="fa-solid fa-car"></i>
            <span className="text-xs font-medium">ที่จอดรถ</span>
          </div>
          <span className="mt-0.5 text-gray-900 font-medium">
            {parking || "-"}
          </span>
        </div>
      </div>

      {/* --- รายละเอียด --- */}
      <div className="border-t border-gray-200 pt-4">
        <h4 className="flex items-center gap-2 text-sm font-medium text-gray-800 mb-1">
          <i className="fa-regular fa-file-lines text-purple-600"></i>
          รายละเอียด
        </h4>
        <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
          {details || "ยังไม่มีรายละเอียดเพิ่มเติม"}
        </p>

        {/* แสดงที่อยู่จากแผนที่ */}
        {mapAddress && (
          <div className="mt-3 p-3 bg-purple-50 border border-purple-200 rounded-lg">
            <div className="flex items-start gap-2">
              <i className="fa-solid fa-location-dot text-purple-600 mt-0.5"></i>
              <div>
                <p className="text-xs font-medium text-purple-700 mb-1">ที่อยู่จากแผนที่</p>
                <p className="text-sm text-gray-700">{mapAddress}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* --- Google Map Picker --- */}
      <GoogleMapPicker
        mapAddress={mapAddress}
        onAddressChange={handleAddressChange}
      />
    </section>
  );
}