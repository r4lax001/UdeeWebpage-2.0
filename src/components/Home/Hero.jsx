import React, { useState } from 'react';
import { FaSearch, FaChevronDown, FaTrain, FaSlidersH } from 'react-icons/fa';

const Hero = ({ openModal }) => {
  const [transactionType, setTransactionType] = useState('rent');

  return (
    <section className="hero">
      <img src="./src/assets/img/Home.png" alt="modern house" />

      <div className="search-container-wrapper">
        <div className="search-container">
          {/* Toggle Rent/Buy */}
          <div className="toggle-switch">
            <button
              className={`toggle-btn ${transactionType === 'rent' ? 'active' : ''}`}
              onClick={() => setTransactionType('rent')}
            >
              เช่า
            </button>
            <button
              className={`toggle-btn ${transactionType === 'buy' ? 'active' : ''}`}
              onClick={() => setTransactionType('buy')}
            >
              ซื้อ
            </button>
          </div>

          <div className="search-input-group">
            <FaSearch className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="ค้นหา ทำเล, จังหวัด, ย่าน, BTS, MRT, อำเภอ และอื่นๆ"
            />
          </div>

          <div className="filter-buttons">
            <button className="filter-dropdown" onClick={() => openModal('property-type')}>
              อสังหาฯทั้งหมด <FaChevronDown className="dropdown-icon" />
            </button>
            <button className="filter-btn icon-btn" onClick={() => openModal('train')}>
              <FaTrain /> รถไฟฟ้า
            </button>
            <button className="filter-btn icon-btn" onClick={() => openModal('more-filters')}>
              <FaSlidersH /> กรองเพิ่มเติม
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;