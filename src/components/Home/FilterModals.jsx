import React from 'react';
import { FaArrowLeft, FaSearch, FaChevronRight } from 'react-icons/fa';

const FilterModals = ({ activeModal, closeModal, handleBack }) => {
  if (!activeModal) return null;

  // Helper for visual feedback
  const toggleSelection = (e) => {
    e.currentTarget.classList.toggle('active-selected');
  };

  // Handle click outside modal to close
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <>
      {/* Modal: Property Type */}
      {activeModal === 'property-type' && (
        <div className="modal-overlay" style={{ display: 'flex' }} onClick={handleOverlayClick}>
          <div className="modal-content">
            <div className="modal-header">
              <FaArrowLeft className="modal-back-btn" onClick={() => handleBack('')} />
              <h2 className="modal-title">อสังหาริมทรัพย์</h2>
            </div>
            <div className="modal-body filter-grid-3">
              {['คอนโด', 'บ้านเดี่ยว', 'ที่ดิน', 'ตึกแถว', 'โกดัง', 'อพาร์ตเมนต์', 'ทาวน์เฮ้าส์', 'พื้นที่ขายของ', 'อสังหาฯทั้งหมด'].map((item) => (
                <button key={item} className="filter-choice-btn" onClick={toggleSelection}>{item}</button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal: Train */}
      {activeModal === 'train' && (
        <div className="modal-overlay" style={{ display: 'flex' }} onClick={handleOverlayClick}>
          <div className="modal-content">
            <div className="modal-header">
              <FaArrowLeft className="modal-back-btn" onClick={() => handleBack('')} />
              <h2 className="modal-title">รถไฟฟ้า</h2>
            </div>
            <div className="search-input-group modal-search">
              <FaSearch className="search-icon" />
              <input type="text" className="search-input" placeholder="ค้นหาสถานี BTS MRT แอร์พอร์ตลิงก์" />
            </div>
            <div className="modal-body filter-grid-3 train-icons">
              <div className="train-icon-card" onClick={toggleSelection}>
                <img src="./src/assets/img/BTS.png" alt="BTS Logo" />
                <p>BTS</p>
              </div>
              <div className="train-icon-card" onClick={toggleSelection}>
                <img src="./src/assets/img/MRT.png" alt="MRT Logo" />
                <p>MRT</p>
              </div>
              <div className="train-icon-card" onClick={toggleSelection}>
                <img src="./src/assets/img/ARL.png" alt="ARL Logo" />
                <p>ARL</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: More Filters (Main) */}
      {activeModal === 'more-filters' && (
        <div className="modal-overlay" style={{ display: 'flex' }} onClick={handleOverlayClick}>
          <div className="modal-content">
            <div className="modal-header">
              <FaArrowLeft className="modal-back-btn" onClick={() => handleBack('')} />
              <h2 className="modal-title">กรอง</h2>
            </div>
            <div className="modal-body filter-list">
              <button className="filter-list-item" onClick={() => handleBack('price', true)}> {/* true = open new modal */}
                ราคา <FaChevronRight />
              </button>
              <button className="filter-list-item" onClick={() => handleBack('area', true)}>
                พื้นที่ใช้สอย <FaChevronRight />
              </button>
              <button className="filter-list-item" onClick={() => handleBack('beds', true)}>
                ห้องนอน <FaChevronRight />
              </button>
              <button className="filter-list-item" onClick={() => handleBack('baths', true)}>
                ห้องน้ำ <FaChevronRight />
              </button>
              <button className="filter-list-item" onClick={() => handleBack('parking', true)}>
                ที่จอดรถ <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sub-Modal: Price */}
      {activeModal === 'price' && (
        <div className="modal-overlay sub-modal" style={{ display: 'flex' }} onClick={handleOverlayClick}>
          <div className="modal-content">
            <div className="modal-header">
              <FaArrowLeft className="modal-back-btn" onClick={() => handleBack('more-filters')} />
              <h2 className="modal-title">ราคา</h2>
            </div>
            <div className="modal-body price-filter">
              <div className="price-input-group">
                <input type="number" placeholder="ตั้งแต่" className="price-input-field" />
                <span className="price-unit">บาท</span>
                <input type="number" placeholder="ไม่เกิน" className="price-input-field" />
                <span className="price-unit">บาท</span>
              </div>
              <h4 className="suggested-header">ช่วงราคาแนะนำ</h4>
              {['0 - 50,000 บาท', '50,000 - 100,000 บาท', '100,000 - 1,000,000 บาท', '1,000,000 - 25,000,000 บาท'].map(range => (
                <button key={range} className="filter-range-btn" onClick={toggleSelection}>{range}</button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sub-Modal: Area */}
      {activeModal === 'area' && (
        <div className="modal-overlay sub-modal" style={{ display: 'flex' }} onClick={handleOverlayClick}>
          <div className="modal-content">
            <div className="modal-header">
              <FaArrowLeft className="modal-back-btn" onClick={() => handleBack('more-filters')} />
              <h2 className="modal-title">พื้นที่ใช้สอย</h2>
            </div>
            <div className="modal-body area-filter">
              <div className="price-input-group">
                <input type="number" placeholder="ตั้งแต่" className="price-input-field" />
                <span className="price-unit">ตร.ม.</span>
                <input type="number" placeholder="ไม่เกิน" className="price-input-field" />
                <span className="price-unit">ตร.ม.</span>
              </div>
              {['0 - 50 ตร.ม.', '50 - 100 ตร.ม.', '100 - 500 ตร.ม.', '500 - 1,000 ตร.ม.'].map(range => (
                <button key={range} className="filter-range-btn" onClick={toggleSelection}>{range}</button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sub-Modal: Beds, Baths, Parking */}
      {['beds', 'baths', 'parking'].includes(activeModal) && (
        <div className="modal-overlay sub-modal" style={{ display: 'flex' }} onClick={handleOverlayClick}>
          <div className="modal-content">
            <div className="modal-header">
              <FaArrowLeft className="modal-back-btn" onClick={() => handleBack('more-filters')} />
              <h2 className="modal-title">
                {activeModal === 'beds' ? 'ห้องนอน' : activeModal === 'baths' ? 'ห้องน้ำ' : 'ที่จอดรถ'}
              </h2>
            </div>
            <div className="modal-body filter-grid-2">
              {['1', '2', '3', '4'].map(num => (
                <button key={num} className="filter-choice-btn" onClick={toggleSelection}>
                  {num} {activeModal === 'parking' ? 'คัน' : 'ห้อง'}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterModals;