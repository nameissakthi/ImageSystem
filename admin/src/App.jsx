import { Routes, Route } from "react-router-dom"
import Login from "./Pages/Login"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import ProductionTracking from "./Pages/ProductionTracking";
import Orders from "./Pages/Orders";
import LeftSideBar from "./Components/LeftSideBar";
import RightSideBar from "./Components/RightSideBar";
import React, { useContext } from 'react'
import { PageContext } from './Context/PageContext'
import Order from "./Components/Order";
import Clients from "./Pages/Clients";
import Client from "./Components/Client";
import Home from "./Pages/Home";

function App() {

  const { setLogin, navigate, login } = useContext(PageContext)

  const onClickHandler = () => {
    setLogin(false);
    localStorage.removeItem("login");
    navigate("/login")
  }

  return (
    <>
      <div className="flex">
        <ToastContainer autoClose={2000} />
        <div className="flex-1">
          <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="*" element={<Home />} />
            {/* <Route path="/productionTracking" element={<ProductionTracking />} />
            <Route path="/" element={<Orders />} />
            <Route path="/order/:orderId" element={<Order />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/client/:clientId" element={<Client />} /> */}
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
