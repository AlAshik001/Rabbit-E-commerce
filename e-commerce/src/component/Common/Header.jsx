import React from 'react'
import Topbar from '../Layout/Topbar'
import Navbar from './Navbar'

export const Header = () => {
  return (
    <header className=' border-b  border-gray-100'>
        {/* Top Bar */}
        <Topbar/>
        {/* Navbar */}
        <Navbar/>
        {/* Cart Drawer  */}

        </header>
    
  )
}
