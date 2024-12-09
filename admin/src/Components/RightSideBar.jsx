import React from 'react'
import { NavLink } from 'react-router-dom'

const LeftSideBar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2 bg-slate-300'>
        <div className='flex flex-col gap-4 pt-6 text-[15px] items-center'>
            <NavLink className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l w-[100%]" >
                <p className='hidden md:block text-center w-full'>List Items</p>
            </NavLink>
            <NavLink className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l w-[100%]" >
                <p className='hidden md:block text-center w-full'>Add Items</p>
            </NavLink>
            <NavLink className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l w-[100%]">
                <p className='hidden md:block text-center w-full'>Orders</p>
            </NavLink>
        </div>
    </div>
  )
}

export default LeftSideBar