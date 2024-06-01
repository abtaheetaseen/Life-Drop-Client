import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Outlet, useNavigation } from 'react-router-dom'

const MainLayouts = () => {

    const navigation = useNavigation();
    if(navigation.state === "loading") {
        return <div className='flex items-center justify-center'>
    <div className="loading loading-infinity loading-lg min-h-screen "></div>
</div> 
    }

  return (
    <>
      <Navbar />
        <Outlet />
      <Footer />
    </>
  )
}

export default MainLayouts
