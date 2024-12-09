import { Routes, Route } from "react-router-dom"
import Login from "./Pages/Login"
import Home from "./Pages/Home"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import ProductionTracking from "./Pages/ProductionTracking";
import Orders from "./Pages/Orders";

function App() {

  return (
    <>
      <div>
        <ToastContainer autoClose={2000} />
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/" element={<Home/>} />
          <Route path="/productionTracking" element={<ProductionTracking />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </>
  )
}

export default App
