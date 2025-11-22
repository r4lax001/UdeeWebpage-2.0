import { useEffect, useState } from "react";

let isScriptLoaded = false; // ป้องกันโหลด script ซ้ำ
let loadCallbacks = [];     // รอ script โหลดเสร็จ (ถ้ามีหลาย component เรียก)

export function useGoogleMapsLoader() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // ถ้าโหลดไว้แล้วจาก component อื่น → ใช้งานได้ทันที
    if (window.google?.maps) {
      setIsLoaded(true);
      return;
    }

    // ถ้า script ถูกโหลดไปแล้ว แต่ยังไม่ onload → รอใน callback
    if (isScriptLoaded) {
      loadCallbacks.push(() => setIsLoaded(true));
      return;
    }

    // เริ่มโหลด script ครั้งแรก
    isScriptLoaded = true;

    const script = document.createElement("script");
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      console.log("Google Maps API loaded successfully");
      setIsLoaded(true);
      loadCallbacks.forEach((cb) => cb());
      loadCallbacks = [];
    };

    script.onerror = () => {
      console.error("Failed to load Google Maps API");
      isScriptLoaded = false;
    };

    document.head.appendChild(script);
  }, []);

  return isLoaded;
}