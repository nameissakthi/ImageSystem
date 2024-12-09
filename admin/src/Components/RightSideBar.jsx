import React from 'react'
import { NavLink } from 'react-router-dom'
import { IoLogOutOutline } from "react-icons/io5";

const LeftSideBar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2 bg-slate-300'>
        <div className='flex flex-col gap-4 pt-6 text-[15px] items-center'>
            <button disabled className='border-[4px] px-5 py-2 rounded-2xl text-3xl w-[90%] mb-6 bg-teal-600 border-cyan-950 text-white'>
                Admin Panel
            </button>
            <NavLink className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded w-[90%] bg-cyan-700 text-xl text-white" >
                <p className='md:block text-center w-full'>CLIENTS</p>
            </NavLink>
            <NavLink className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded w-[90%] bg-cyan-700 text-xl text-white" >
                <p className='md:block text-center w-full'>PRODUCTS</p>
            </NavLink>
            <NavLink className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded w-[90%] bg-cyan-700 text-xl text-white">
                <p className='md:block text-center w-full'>COSTINGS</p>
            </NavLink>
            <NavLink className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded w-[90%] bg-cyan-700 text-xl text-white">
                <p className='md:block text-center w-full'>SUPPLIERS</p>
            </NavLink>
            <NavLink className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded w-[90%] bg-cyan-700 text-xl text-white">
                <p className='md:block text-center w-full'>CORIOUR</p>
            </NavLink>
            <NavLink className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded w-[90%] bg-cyan-700 text-xl text-white">
                <p className='md:block text-center w-full'>USERS</p>
            </NavLink>
            <NavLink className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded w-[90%] bg-cyan-700 text-xl text-white">
                <p className='md:block text-center w-full'>EMPLOYEES</p>
            </NavLink>
            <NavLink className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded w-[90%] bg-cyan-700 text-xl text-white">
                <p className='md:block text-center w-full'>HR REPORTS</p>
            </NavLink>
            <NavLink className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded w-[90%] bg-cyan-700 text-xl text-white">
                <p className='md:block text-center w-full'>PAYMENTS</p>
            </NavLink>
            <NavLink className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded w-[90%] bg-cyan-700 text-xl text-white">
                <p className='md:block text-center w-full'>REPORTS</p>
            </NavLink>
            <button className='flex justify-center items-center gap-2 border border-gray-300 border-r-0 px-3 py-2 rounded w-[90%] bg-[red] text-xl text-white'>
                Log Out 
                <IoLogOutOutline className="text-2xl" />
            </button>
        </div>
    </div>
  )
}

export default LeftSideBar