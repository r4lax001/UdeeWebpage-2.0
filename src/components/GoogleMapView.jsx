import { useEffect, useRef } from "react";
import { useGoogleMapsLoader } from "../hook/useGoogleMapsLoader";

export default function GoogleMapView({ lat, lng, address }) {
  const mapRef = useRef(null);
  const isLoaded = useGoogleMapsLoader();

  useEffect(() => {
    if (!isLoaded || !mapRef.current) return;

    const position = { lat, lng };

    const map = new window.google.maps.Map(mapRef.current, {
      center: position,
      zoom: 16,
      disableDefaultUI: false,
      gestureHandling: "cooperative",
    });

    new window.google.maps.Marker({
      map,
      position,
    });
  }, [isLoaded, lat, lng]);

  return (
    <div className="w-full space-y-3">
      {/* Address Display */}
      <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
        <p className="text-xs font-medium text-purple-700 mb-1">ที่อยู่</p>
        <p className="text-sm text-gray-700 leading-relaxed">{address}</p>
      </div>

      {/* Map */}
      <div className="w-full h-[345px] rounded-lg border overflow-hidden">
        <div ref={mapRef} className="w-full h-full" />
      </div>
    </div>
  );
}