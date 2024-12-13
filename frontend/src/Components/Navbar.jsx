import React, { useContext } from 'react'
import logo from '../assets/logo.png'
import { IoLogOut } from "react-icons/io5";
import { PageContext } from '../context/PageContext';
import { useLocation } from 'react-router-dom';

const Navbar = () => {

  const { setLogin, navigate, login } = useContext(PageContext)
  const location = useLocation()

  const onClickHandler = () => {
    setLogin(false);
    localStorage.removeItem("login");
    navigate("/login")
  }

  const onClickLogo = () => {
    if(location.pathname==="/cart"){
      navigate("/")
    }
  }

  return (
    <div className='flex justify-between px-3 py-1 items-center border-b-2 border-slate-950 mb-2'>
        <img src={logo} alt="logo" className='w-56' onClick={onClickLogo} />
        <div className='flex justify-between gap-10 items-center'>
            <button className='flex items-center gap-2 text-2xl bg-red-600 text-white p-2 rounded-lg' onClick={onClickHandler}>
                <span>LogOut</span>
                <IoLogOut />
            </button>
        </div>
    </div>
  )
}

export default Navbar