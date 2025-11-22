import React, { useState } from 'react';

// --- ฟังก์ชัน Format ตัวเลข ---
const formatNum = (num) => {
  if (num === undefined || num === null) return '0';
  return num.toLocaleString('th-TH', { maximumFractionDigits: 0 });
};

// --- ฟังก์ชันจัดการ Input ตัวเลข (ห้ามติดลบ, จัดการคอมม่า) ---
const handleNumericInputChange = (value, setState) => {
  // ลบตัวอักษรที่ไม่ใช่ตัวเลขและจุดทศนิยม
  let cleanedValue = value.replace(/[^\d.]/g, '');

  // ถ้าเป็นค่าว่างหรือติดลบ (ในกรณีนี้คือพยายามใส่เครื่องหมายลบ) ให้เป็น 0
  if (cleanedValue === '') {
    setState('');
    return;
  }
  
  
  let numberValue = parseFloat(cleanedValue.replace(/,/g, '')); // ลบคอมม่าก่อนแปลง
  
  if (isNaN(numberValue) || numberValue < 0) {
    numberValue = 0;
  }
  
  // จัดรูปแบบคอมม่าเฉพาะตอนแสดงใน input state
  setState(numberValue.toLocaleString('th-TH', { maximumFractionDigits: 0 }));
};

// --- คอมโพเนนต์ย่อยสำหรับช่อง Input (เพื่อลดโค้ดซ้ำ) ---
const InputBox = ({ label, value, onChange, prefix, suffix, type = 'text', placeholder = '0' }) => (
  <div>
    <label className="block text-sm font-medium text-gray-500 mb-1">{label}</label>
    <div className="relative">
      {prefix && <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">{prefix}</span>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={`w-full rounded-lg border border-gray-300 p-3 text-right font-medium text-base ${prefix ? 'pl-10' : ''} ${suffix ? 'pr-10' : ''}`}
        placeholder={placeholder}
      />
      {suffix && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">{suffix}</span>}
    </div>
  </div>
);

// --- คอมโพเนนต์ย่อยสำหรับปุ่มเลือก ---
const SelectButton = ({ label, options, selectedValue, onSelect, suffix = '' }) => (
  <div>
    <label className="block text-sm font-medium text-gray-500 mb-1">{label}</label>
    <div className="flex gap-2 flex-wrap">
      {options.map((option) => (
        <button
          key={option} 
          onClick={() => onSelect(option)}
          className={`
            px-4 py-2 rounded-lg text-sm font-medium transition-colors
            ${selectedValue === option
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
            }
          `}
        >
          {option}{suffix}
        </button>
      ))}
    </div>
  </div>
);


// --- คอมโพเนนต์หลัก ---
function LoanCalculator() {

  // --- State สำหรับเก็บค่า Input ---
  const [priceStr, setPriceStr] = useState("15,990,000");
  const [loanStr, setLoanStr] = useState("14,391,000");
  const [extraDownPaymentStr, setExtraDownPaymentStr] = useState(""); 
  
  const [rate, setRate] = useState(3); 
  const [term, setTerm] = useState(30); 

  const rateOptions = [3, 4, 5, 6, 7];
  const termOptions = [10, 15, 20, 25, 30];

  // --- ฟังก์ชันคำนวณ ---
  const calculateLoan = () => {
    const price = parseFloat(priceStr.replace(/,/g, '')) || 0;
    const initialLoan = parseFloat(loanStr.replace(/,/g, '')) || 0; // ยอดสินเชื่อเริ่มต้นที่ต้องการ
    const extraDownPayment = parseFloat(extraDownPaymentStr.replace(/,/g, '')) || 0; // ยอดดาวน์เพิ่ม

    // คำนวณเงินดาวน์เบื้องต้น
    const calculatedDownPayment = price > initialLoan ? price - initialLoan : 0;
    
    // คำนวณยอดสินเชื่อที่กู้จริง (P)
    let P = initialLoan - extraDownPayment;
    if (P < 0) {
      P = 0; // ยอดสินเชื่อจริงไม่ต่ำกว่า 0
    }
    
    // คำนวณเงินดาวน์ทั้งหมด
    const totalDownPayment = calculatedDownPayment + (initialLoan - P); // เงินดาวน์เบื้องต้น + ส่วนที่หักจากยอดกู้

    if (P === 0 || rate === 0 || term === 0) {
      return { 
        monthlyPayment: 0, principal: 0, interest: 0, 
        downPayment: totalDownPayment, ltv: 0, loanAmount: P,
        totalPrincipal: P, totalInterest: 0
      };
    }

    const ltv = price > 0 ? (P / price) * 100 : 0;
    const r = (rate / 100) / 12; // อัตราดอกเบี้ยต่อเดือน
    const n = term * 12; // จำนวนงวดทั้งหมด

    // สูตรคำนวณผ่อนบ้าน: M = P * [r(1+r)^n] / [(1+r)^n - 1]
    const monthlyPayment = (P * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);

    if (!isFinite(monthlyPayment)) {
      return { 
        monthlyPayment: 0, principal: 0, interest: 0, 
        downPayment: totalDownPayment, ltv, loanAmount: P,
        totalPrincipal: P, totalInterest: 0
      };
    }

    // คำนวณรายเดือน (งวดแรก)
    const interest = P * r; 
    const principal = monthlyPayment - interest; 
    const finalPrincipal = Math.max(0, principal); 
    const finalInterest = monthlyPayment - finalPrincipal;

    // คำนวณยอดรวมสุทธิ (Total Breakdown)
    const totalPayment = monthlyPayment * n;
    const totalInterest = totalPayment - P;
    const totalPrincipal = P; // เงินต้นรวมคือยอดสินเชื่อจริง
    
    const finalTotalInterest = Math.max(0, totalInterest);


    return { 
        monthlyPayment, 
        principal: finalPrincipal, 
        interest: finalInterest, 
        downPayment: totalDownPayment, 
        ltv, 
        loanAmount: P, // ยอดสินเชื่อจริงหลังหักดาวน์เพิ่ม
        totalPrincipal, 
        totalInterest: finalTotalInterest
    };
  };

  // --- เรียกใช้ฟังก์ชันคำนวณ ---
  const loanData = calculateLoan();
  
  // เปอร์เซ็นต์สำหรับกราฟรายเดือน
  const principalPercentMonthly = loanData.monthlyPayment > 0 ? (loanData.principal / loanData.monthlyPayment) * 100 : 0;
  const interestPercentMonthly = 100 - principalPercentMonthly;
  
  // เปอร์เซ็นต์สำหรับกราฟยอดรวมสุทธิ
  const totalAmountPaid = loanData.totalPrincipal + loanData.totalInterest;
  const principalPercentTotal = totalAmountPaid > 0 ? (loanData.totalPrincipal / totalAmountPaid) * 100 : 0;
  const interestPercentTotal = totalAmountPaid > 0 ? 100 - principalPercentTotal : 0;

  return (
    <div className="container max-w-[1500px] mx-auto px-4 mt-10">
      <hr className="border-gray-200 mb-10" />
      <h2 className="text-[28px] md:text-[32px] font-medium mb-6">ยอดสินเชื่อโดยประมาณ</h2>

      {/* แบ่ง 3 ส่วน: 2 ส่วนสำหรับผลลัพธ์ (ซ้าย), 1 ส่วนสำหรับ Input (ขวา) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">

        {/* --- ส่วนผลลัพธ์ (ซ้าย) --- */}
        <div className="md:col-span-2 space-y-8">

          {/* 1. ยอดผ่อนต่อเดือน (แยกเงินต้น/ดอกเบี้ยรายเดือน) */}
          <div>
            <p className="text-base md:text-lg font-medium text-gray-800">ยอดสินเชื่อ</p>
            <p className="text-sm text-gray-500 mb-1">ยอดผ่อนต่อเดือนโดยประมาณ</p>
            <p className="text-2xl md:text-[28px] font-medium text-gray-900 mb-3">
              ฿ {formatNum(loanData.monthlyPayment)} / เดือน
            </p>

            {/* กราฟแท่ง (รายเดือน) - ปรับเป็น h-2 */}
            <div className="flex w-full h-2 rounded-full overflow-hidden bg-gray-200 mb-2">
              <div
                className="bg-blue-500"
                style={{ width: `${principalPercentMonthly}%` }}
                title="เงินต้นรายเดือน"
              ></div>
              <div
                className="bg-teal-500"
                style={{ width: `${interestPercentMonthly}%` }}
                title="ดอกเบี้ยรายเดือน"
              ></div>
            </div>
            {/* คำอธิบายกราฟ (รายเดือน) */}
            <div className="flex justify-between text-sm font-medium">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span> {/* ปรับขนาดจุดสี */}
                ฿ {formatNum(loanData.principal)} เงินต้น (งวดแรก)
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-500"></span> {/* ปรับขนาดจุดสี */}
                ฿ {formatNum(loanData.interest)} ดอกเบี้ย (งวดแรก)
              </span>
            </div>
          </div>

          <hr className="border-gray-200" />
          
          {/* 2. ยอดสินเชื่อสุทธิ (เงินต้น/ดอกเบี้ยรวมตลอดสัญญา) */}
          <div>
            <p className="text-base md:text-lg font-medium text-gray-800">ยอดรวมตลอดอายุสัญญา {term} ปี</p>
            <p className="text-sm text-gray-500 mb-1">รวมเงินต้นและดอกเบี้ยสุทธิ</p>
            <p className="text-2xl md:text-[28px] font-medium text-gray-900 mb-3">
              ฿ {formatNum(totalAmountPaid)} 
            </p>

            {/* กราฟแท่ง (ยอดรวมสุทธิ) - ปรับเป็น h-2 */}
            <div className="flex w-full h-2 rounded-full overflow-hidden bg-gray-200 mb-2">
              <div
                className="bg-blue-500"
                style={{ width: `${principalPercentTotal}%` }}
                title="เงินต้นสุทธิ"
              ></div>
              <div
                className="bg-teal-500"
                style={{ width: `${interestPercentTotal}%` }}
                title="ดอกเบี้ยสุทธิ"
              ></div>
            </div>
            {/* คำอธิบายกราฟ (ยอดรวมสุทธิ) */}
            <div className="flex justify-between text-sm font-medium">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span> {/* ปรับขนาดจุดสี */}
                ฿ {formatNum(loanData.totalPrincipal)} เงินต้น (ยอดสินเชื่อจริง)
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-500"></span> {/* ปรับขนาดจุดสี */}
                ฿ {formatNum(loanData.totalInterest)} ดอกเบี้ยสุทธิ
              </span>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* 3. ค่าใช้จ่ายเบื้องต้น (เงินดาวน์) */}
          <div>
            <p className="text-base md:text-lg font-medium text-gray-800">ค่าใช้จ่ายที่อาจต้องมีเบื้องต้น</p>
            <p className="text-sm text-gray-500 mb-1">เงินดาวน์ทั้งหมด (รวมเงินดาวน์เพิ่ม)</p>
            <p className="text-2xl md:text-[28px] font-medium text-gray-900 mb-3">
              ฿ {formatNum(loanData.downPayment)}
            </p>
            {/* กราฟแท่ง - ปรับเป็น h-2 */}
            <div className="w-full h-2 rounded-full overflow-hidden bg-gray-200 mb-2">
              <div className="bg-blue-500" style={{ width: '100%' }}></div>
            </div>
            {/* คำอธิบายกราฟ */}
            <div className="flex justify-between text-sm font-medium">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span> {/* ปรับขนาดจุดสี */}
                เงินดาวน์
              </span>
              <span className="text-xs md:text-sm">
                จำนวนสินเชื่อจริง ฿ {formatNum(loanData.loanAmount)} ในอัตรา
                {loanData.ltv.toFixed(0)}% ของสินเชื่อต่อราคาบ้าน (Loan-to-value)
              </span>
            </div>
          </div>
        </div>

        {/* --- ส่วน Input (ขวา) --- */}
        <div className="space-y-4">
          <InputBox
            label="ราคาสังหาฯ"
            prefix="฿"
            value={priceStr}
            onChange={(e) => handleNumericInputChange(e.target.value, setPriceStr)}
          />
          <InputBox
            label="ยอดสินเชื่อ (ที่ต้องการกู้)"
            prefix="฿"
            value={loanStr}
            onChange={(e) => handleNumericInputChange(e.target.value, setLoanStr)}
          />

          {/* เพิ่มช่องสำหรับเงินดาวน์เพิ่ม */}
          <InputBox
            label="ยอดเงินดาวน์เพิ่ม (ไม่บังคับ)"
            prefix="฿"
            value={extraDownPaymentStr}
            onChange={(e) => handleNumericInputChange(e.target.value, setExtraDownPaymentStr)}
            placeholder="0"
          />

          <SelectButton
            label="อัตราดอกเบี้ย"
            options={rateOptions}
            selectedValue={rate}
            onSelect={setRate}
            suffix="%"
          />

          <SelectButton
            label="ระยะเวลา"
            options={termOptions}
            selectedValue={term}
            onSelect={setTerm}
            suffix=" ปี"
          />

          <button 
            className="w-full py-3 mt-4 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
          >
            คำนวณ
          </button>
        </div>

      </div>
    </div>
  );
}

export default LoanCalculator;