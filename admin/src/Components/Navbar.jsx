import React from 'react'
import logo from "../assets/logo.png"
import { FaHome } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='flex justify-between items-center mb-5'>
        <Link className='text-xl text-white bg-black flex gap-2 p-3 items-center' to="/"> 
            <FaHome className='text-2xl' />
            Home
        </Link>
        <img src={logo} alt="Logo" className='w-44' />
    </div>
  )
}

export default Navbar