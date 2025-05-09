import React, { useState } from 'react'
import {Link} from "react-router-dom"
import {HiOutlineUser,HiShoppingBag,HiBars3BottomRight} from "react-icons/hi2"
import Search from './Search'
import CartDrawer from '../Layout/CartDrawer'
import { IoMdClose } from 'react-icons/io'
import { useSelector } from 'react-redux'
 
const Navbar = () => {


  const [draweOpen,setDrawerOpen] = useState(false)
  const [navDrawerOpen,setNavDrawerOpen] = useState(false)
  const {cart} = useSelector((state)=> state.cart);

  const cartItemCount = 
  cart?.products?.reduce((total, product)=> total + product.quantity, 0) || 
  0;

  const toggleNavDrawer =()=>{
    setNavDrawerOpen(!navDrawerOpen)
  }
  const toggleCartdrawer =()=>
  {
      setDrawerOpen(!draweOpen)
  }


  return (
   <>
   <nav className="container mx-auto flex items-center justify-between px-6 py-4">
    {/* Left Logo */}
    <div>
      <Link to={"/"} className='text-2xl font-medium'> Rabbit </Link>
    </div>
    {/* Center Navigation Link*/}
    <div className="hidden md:flex space-x-6">
      <Link to="/collections/all?grnder= Men" className="text-gray-700 hover:text-black text-sm font-medium uppercase">Men</Link>
      <Link to="/collections/all?grnder= Womenr" className="text-gray-700 hover:text-black text-sm font-medium uppercase">Women</Link>
      <Link to="/collections/all?category=Top Wear" className="text-gray-700 hover:text-black text-sm font-medium uppercase">Top Wear</Link>
      <Link to="/collections/all?categoryr=Bottom Wear" className="text-gray-700 hover:text-black text-sm font-medium uppercase">Bottom wear</Link>
    </div>
    {/* Right Icon */}
    <div className=' flex items-center space-x-4'>
      <Link to="/admin" className='block bg-black px-2 rounded text-sm text-white'>
      Admin
      </Link>
      <Link to="/profile" className=' flex hover:text-black'>
      <HiOutlineUser className=' h-6 w-6 text-gray-700'/>
      </Link>
      <button onClick={toggleCartdrawer} className="relative ">
        <HiShoppingBag 
        className=" h-6 w-6 text-gray-700 hover:text-black cursor-pointer"/>
        {cartItemCount > 0 && (<span className=' absolute -top-1 bg-[#EA2E0E] text-white text-xs rounded-full px-2 py-0.5'>
          {cartItemCount}
          </span>)}

      </button>
      {/* Search */}
    <div className="overflow-hidden">
    <Search/>
    </div>
      <button onClick={toggleNavDrawer} className='mb:hidden'>
        <HiBars3BottomRight className='w-6 h-6 text-gray-700'/>
      </button>
    </div>
   </nav>
   <CartDrawer draweOpen={draweOpen} toggleCartdrawer={toggleCartdrawer}/>


   {/* Mobile Navigation */}
   <div className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg
   transform transition-transform duration-300 z-50 ${navDrawerOpen ? "translate-x-0":"-translate-x-full"}`}>
    <div className=' flex justify-end p-4'>
      <button onClick={toggleNavDrawer}>
        <IoMdClose className=' w-6 h-6 text-gray-600 cursor-pointer'/>
      </button>
    </div>
    <div className=' p-4'>
      <h2 className=' font-semibold text-xl mb-4'>Menu</h2>
      <nav className=' space-y-4'>
        <Link to="/collections/all?grnder= Men" onClick={toggleNavDrawer} className=' block text-gray-600 hover:text-black'>
        Men
        </Link>

        <Link to="/collections/all?grnder= Women" onClick={toggleNavDrawer} className=' block text-gray-600 hover:text-black'>
        Women
        </Link>

        <Link to="collections/all?category=Top Wear" onClick={toggleNavDrawer} className=' block text-gray-600 hover:text-black'>
        Top Wear
        </Link>

        <Link to="collections/all?category=Bottom Wear" onClick={toggleNavDrawer} className=' block text-gray-600 hover:text-black'>
        Bottom Wear
        </Link>
      </nav>
    </div>
   </div>
   </>
  )
}

export default Navbar