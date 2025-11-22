import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/inappLayout/Navbar'
import Footer from '../components/inappLayout/Footer'
import SpeedDial from '../components/inappLayout/SpeedDial'

function AppLayouts() {
  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar />

      <main className='flex-grow'>
        <Outlet /> {/* เนื้อหาจาก routes ย่อยจะแสดงที่นี่ */}
      </main>

      <Footer />
      <SpeedDial />
    </div>
  )
}

export default AppLayouts