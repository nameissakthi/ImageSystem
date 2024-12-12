import { Routes, Route } from "react-router-dom"
import Login from "./Pages/Login"
import Home from "./Pages/Home"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Cart from "./Pages/Cart";

function App() {

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="*" element={<Home/>} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  )
}

export default App
