import React, { useContext, useState, useEffect } from "react";
import { PageContext } from "../context/PageContext";
import Navbar from "../Components/Navbar";
import { TiShoppingCart } from "react-icons/ti";

const Cart = () => {

    const { cart, decrementQty, incrementQty, removeFromCart, setOrder, setCart, newOrder } = useContext(PageContext) 
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phoneno, setPhoneno] = useState("")

    const generateBillNumber = () => {
      const generatedBillNumber = `${Date.now()}`;
      return generatedBillNumber
    }

    const orderConfirm = async (e, name, email, phoneno, cart) => {
      const bill = generateBillNumber()
      e.preventDefault();

      const newOrderData = {
          name,
          email,
          phoneno,
          billNumber : bill,
          cart,
      };

      setOrder((prevOrder) => ({
          ...prevOrder,
          ...newOrderData
      }));
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center">
      <div className="mt-10 w-[90%]">
        <h2 className="text-4xl font-mono mb-2">Cart</h2>
        {cart.length > 0 ? (
          <div className="flex flex-col gap-4">
            {cart.map((cartItem, index) => (
              <div key={index} className="flex justify-between items-center pb-2 border-2 border-slate-900 bg-slate-200 p-2 rounded-lg" >
                <div className="flex items-center gap-4">
                  <img src={cartItem.img} alt={cartItem.name} className="w-20 h-20 rounded-xl" />
                  <p className="text-xl">
                    <b>{cartItem.name}</b>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="bg-red-400 px-3 py-1 rounded" onClick={() => decrementQty(cartItem.name)} >
                    -
                  </button>
                  <p className="text-xl">{cartItem.qty}</p>
                  <button className="bg-green-400 px-3 py-1 rounded"  onClick={() => incrementQty(cartItem.name)}>
                    +
                  </button>
                </div>
                <div>
                  <button className="bg-red-600 text-white rounded-lg p-2" onClick={()=>removeFromCart(cartItem.name)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xl mt-4">Your cart is empty.</p>
        )}
      </div>
      </div>
      { cart.length!=0 &&
          <div className="w-[95%] flex justify-end">
          <form className="flex flex-col w-[40%] mt-5 border-2 border-slate-900 p-4 rounded-2xl" >
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Your Name" className="mb-2 p-2 rounded-lg" required autoFocus />
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Your Email" className="mb-2 p-2 rounded-lg" required />
            <input type="tel" value={phoneno} onChange={e=>setPhoneno(e.target.value)} placeholder="Your Phone Number" className="mb-2 p-2 rounded-lg" required />
            <div className="flex justify-between items-center">
            <button onClick={(e)=>orderConfirm(e, name, email, phoneno, cart)} type="submit" className="p-3 bg-green-500 text-white text-xl flex items-center justify-center gap-2">
                <span>Confirm</span>
              </button>
              <span className="text-xl">Confirm Then Order==={">"}</span>
            <button onClick={newOrder} type="submit" className="p-3 bg-black text-white text-xl flex items-center justify-center gap-2">
                <span>Order</span>
                <TiShoppingCart className="text-2xl" />
              </button>
            </div>
          </form>
        </div>
      }
    </div>
  );
};

export default Cart;
