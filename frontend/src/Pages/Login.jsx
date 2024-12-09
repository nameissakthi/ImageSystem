import React, { useContext, useEffect, useState } from "react";
import { MdAccountCircle } from "react-icons/md";
import { IoLogInOutline } from "react-icons/io5";
import logo from "../assets/logo.png"
import { PageContext } from "../context/PageContext";
import axios from "axios"
import { toast } from "react-toastify";

const Login = () => {

  const { backendUrl, navigate, login, setLogin } = useContext(PageContext)

    const [ifsc, setIfsc] = useState("")
    const [password, setPassword] = useState("")

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post(backendUrl+"/api/bankAcc/login", {
            ifsc,
            password
          })
          if(response.data.success){
            setLogin(response.data.success)
            localStorage.setItem('login', response.data.success)
          }
        } catch (error) {
          console.log(error)
          toast.error(error.message)
        }
    }

    useEffect(()=>{
      if(login){
        navigate("/")
      }
    },[localStorage.getItem("login")])

  return (
    <div className="w-100 flex flex-col items-center justify-center mt-4">
        <div>
            <img className="w-48 mb-3" src={logo} alt="LOGO" />
        </div>
      <div className="w-[50%] flex flex-col items-center">
      <MdAccountCircle className="text-[12rem]" />
        <h1 className="mb-3 text-4xl">LOGIN</h1>
        <form onSubmit={e=>onSubmitHandler(e)} className="flex flex-col w-[50%] border-2 border-slate-900 px-8 py-16 rounded-lg">
          <input className="border-slate-950 border-2 rounded-xl mb-4 px-3 py-1" value={ifsc} onChange={e=>setIfsc(e.target.value)} type="text" name="ifsc" placeholder="IFSC CODE" required />
          <input className="border-slate-950 border-2 rounded-xl px-3 py-1" value={password} onChange={e=>setPassword(e.target.value)} type="password" name="password" placeholder="PASSWORD" required />
          <button className="mt-4 border-slate-950 border-2 w-fit self-center py-2 px-6 text-white bg-black flex items-center justify-between">
            LOG IN
            <IoLogInOutline className="text-2xl ml-1" />
        </button>
        </form>
      </div>
    </div>
  );
};

export default Login;