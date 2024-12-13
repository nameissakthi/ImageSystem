import React, { useEffect, useState, useContext } from 'react'
import { TiShoppingCart } from 'react-icons/ti'
import { PageContext } from '../context/PageContext'

const Sidebar = () => {

    const { cart, setOrder, newOrder, order } = useContext(PageContext) 

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

    useEffect(()=>{
      if(order.billNumber && order.billNumber.trim()!=''){
        newOrder()
        setName("")
        setEmail("")
        setPhoneno("")
      }
  },[order])


  return (
    <div>
        { 
          <div className="flex justify-end rounded-2xl bg-slate-400 mt-14">
          <form className="flex flex-col border-2 border-slate-900 p-4 rounded-2xl w-full" onSubmit={(e)=>orderConfirm(e, name, email, phoneno, cart)} >
          <h1 className='mb-4 text-xl'><b>Order Confirmation</b></h1>
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Your Name" className="mb-2 p-2 rounded-lg" required autoFocus />
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Your Email" className="mb-2 p-2 rounded-lg" required />
            <input type="tel" value={phoneno} onChange={e=>setPhoneno(e.target.value)} placeholder="Your Phone Number" className="mb-2 p-2 rounded-lg" required />
            <button type="submit" className=" py-2 px-4 bg-black text-white text-base flex items-center justify-center mt-10  rounded-lg gap-3">
              <span>Order</span>
              <TiShoppingCart className="text-xl" />
            </button>
          </form>
        </div>
      }
    </div>
  )
}

export default Sidebar