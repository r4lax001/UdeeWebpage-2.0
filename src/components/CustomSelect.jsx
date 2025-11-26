import { useState, useEffect, useRef } from "react";

export default function CustomSelect({ options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={ref}>
      {/* ตัวเลือกที่ถูกเลือก */}
      <div
        onClick={() => setOpen(!open)}
        className={`w-full bg-white border border-gray-300 rounded-lg p-2.5 text-sm text-gray-700 cursor-pointer 
        focus:ring-2 focus:ring-mainPurple flex justify-between items-center`}
      >
        <span>{value}</span>
        <svg
          className={`w-4 h-4 ml-2 transform transition-transform ${
            open ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Dropdown options */}
      {open && (
        <ul
          className="absolute z-10 w-full mt-1  bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto"
        >
          {options.map((opt) => (
            <li
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`px-3 py-2 text-sm cursor-pointer hover:bg-mainPurple hover:text-gray-900 ${
                opt === value ? "bg-accentPurple " : "text-gray-500"
              }`}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}