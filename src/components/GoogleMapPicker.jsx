import { useEffect, useRef } from "react";
import { useGoogleMapsLoader } from "../hook/useGoogleMapsLoader";

function GoogleMapPicker({ mapAddress, onAddressChange }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerRef = useRef(null);
  const searchBoxRef = useRef(null);

  const isLoaded = useGoogleMapsLoader();

  useEffect(() => {
    if (!isLoaded || !mapRef.current) return;

    // อย่าสร้าง map ใหม่ถ้ามีอยู่แล้ว
    if (!mapInstance.current) {
      mapInstance.current = new window.google.maps.Map(mapRef.current, {
        center: { lat: 13.736717, lng: 100.523186 },
        zoom: 14,
      });

      markerRef.current = new window.google.maps.Marker({
        map: mapInstance.current,
        draggable: true,
      });

      const geocoder = new window.google.maps.Geocoder();

      // ===== Click บนแผนที่ =====
      mapInstance.current.addListener("click", (event) => {
        const { latLng } = event;
        markerRef.current.setPosition(latLng);

        geocoder.geocode({ location: latLng }, (results, status) => {
          if (status === "OK" && results[0]) {
            onAddressChange(results[0].formatted_address);
          }
        });
      });

      // ===== Drag marker =====
      markerRef.current.addListener("dragend", () => {
        const pos = markerRef.current.getPosition();
        geocoder.geocode({ location: pos }, (results, status) => {
          if (status === "OK" && results[0]) {
            onAddressChange(results[0].formatted_address);
          }
        });
      });
    }

    // ===== Places Autocomplete =====
    if (searchBoxRef.current && !searchBoxRef.current._autocompleteAdded) {
      searchBoxRef.current._autocompleteAdded = true;

      const autocomplete = new window.google.maps.places.Autocomplete(
        searchBoxRef.current,
        {
          fields: ["formatted_address", "geometry"],
          componentRestrictions: { country: "th" },
        }
      );

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) return;

        const location = place.geometry.location;
        mapInstance.current.panTo(location);
        mapInstance.current.setZoom(16);

        markerRef.current.setPosition(location);
        onAddressChange(place.formatted_address);
      });
    }
  }, [isLoaded]);

  return (
    <div className="container mx-auto px-4 ">
      <h2 className="text-[20px] font-medium mb-3">แผนที่</h2>

      {/* Search Box */}
      <input
        type="text"
        ref={searchBoxRef}
        placeholder="ค้นหาสถานที่ เช่น เซ็นทรัลลาดพร้าว"
        className="w-full text-sm border border-gray-300 rounded-md p-2 mb-2"
      />

      {/* แสดงผล Address */}
      <input
        type="text"
        value={mapAddress || ""}
        readOnly
        className="w-full text-sm border border-gray-300 rounded-md p-2 mb-4 bg-gray-50"
      />

      {/* Map */}
      <div
        ref={mapRef}
        className="w-full h-[345px] rounded-lg border-2 overflow-hidden"
      />
    </div>
  );
}

export default GoogleMapPicker;