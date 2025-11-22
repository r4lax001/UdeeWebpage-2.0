import React, { useState, useEffect } from 'react'
import '../../index.css';

import Navbar from "../../components/inappLayout/Navbar";
import Hero from '../../components/Home/Hero';
import FilterModals from '../../components/Home/FilterModals';
import LocationSection from '../../components/Home/LocationSection';
import ProductSection from '../../components/Home/ProductSection';
import HighlightSection from '../../components/Home/HighlightSection';
import Footer from '../../components/inappLayout/Footer';
import AdsCarousel from '../../components/Home/AdsCarousel';
import { PageLoader } from '../../components/Loading';
import ScrollToTop from '../../components/ScrollToTop';

// Import Data
import { newProjectsData, petFriendlyProjectsData } from '../../data/homeProductData';
import { articlesData, newsData, adsCarouselData } from '../../data/homeContentData';

function Home() {
    const [activeModal, setActiveModal] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Modal Logic Handlers
    const handleOpenModal = (modalId) => setActiveModal(modalId);
    const handleCloseModal = () => setActiveModal(null);
    const handleBack = (targetModal, isOpenNew = false) => {
        if (isOpenNew) {
            setActiveModal(targetModal); // กรณีเปิด Sub-modal (เช่น ราคา)
        } else if (targetModal) {
            setActiveModal(targetModal); // กรณีย้อนกลับ (Back button)
        } else {
            setActiveModal(null); // กรณีปิด Main modal
        }
    };

    // Simulate loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <PageLoader />;
    }

    return (
        <div className="udee-app">
            <Navbar />

            <main>
                <Hero openModal={handleOpenModal} />

                {/* Modals Container */}
                <FilterModals
                    activeModal={activeModal}
                    closeModal={handleCloseModal}
                    handleBack={handleBack}
                />

                {/* Ads Section */}
                <AdsCarousel images={adsCarouselData} />

                <div className="content-container container">
                    <LocationSection />

                    <ProductSection title="โครงการใหม่ล่าสุด" products={newProjectsData} />

                    <ProductSection title="ส่วนกลางเอาใจคนรักสัตว์" products={petFriendlyProjectsData} />

                    <HighlightSection title="บทความและสาระน่ารู้เพื่อคนอยากมีบ้าน" items={articlesData} />

                    <HighlightSection title="ข่าวสารในวงการอสังหาฯ" items={newsData} />
                </div>
            </main>

            <Footer />
            <ScrollToTop />
        </div>
    );
};
export default Home