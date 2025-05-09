import React from 'react'
import { Header } from '../Common/Header'
import Footer from '../Common/Footer'
import { Outlet } from 'react-router-dom'

export const UserLayout = () => {
  return (
   <>
   {/* Header Layout */}
   <Header/>
   {/* Main component */}
   <main className='p-2'>
    <Outlet/>
   </main>
   {/* Footer */}
   <Footer/>
   </>
  )
}
