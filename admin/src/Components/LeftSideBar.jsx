import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from "../assets/logo.png"
import { FaWhatsappSquare } from "react-icons/fa";

const LeftSideBar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2 bg-slate-300'>
        <div className='flex flex-col gap-4 pt-6 text-[15px] items-center'>
            <img src={logo} alt="Logo" className='w-44' />
            <NavLink className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded w-[90%] bg-cyan-700 text-xl text-white" to="/" >
                <p className='block text-center w-full'>ORDERS</p>
            </NavLink>
            <NavLink className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded w-[90%] bg-cyan-700 text-xl text-white" to="productionTracking" >
                <p className='block text-center w-full'>PRODUCTION</p>
            </NavLink>
            <NavLink className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded w-[90%] bg-cyan-700 text-xl text-white">
                <p className='block text-center w-full'>INVOICE</p>
            </NavLink>
            <NavLink className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded w-[90%] bg-cyan-700 text-xl text-white">
                <p className='block text-center w-full'>COURIOR</p>
            </NavLink>
            <NavLink className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded w-[90%] bg-cyan-700 text-xl text-white">
                <p className='block text-center w-full'>TRACKING</p>
            </NavLink>
            <div className="p-4 flex items-center justify-center w-[90%]">
                <FaWhatsappSquare className='text-6xl text-green-700 mr-2' />
                <p className='text-2xl'>Whatsapp</p>
            </div>
        </div>
    </div>
  )
}

export default LeftSideBar