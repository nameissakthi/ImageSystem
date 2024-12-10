import React, { useContext, useEffect, useState } from 'react'
import { PageContext } from '../Context/PageContext'
import { useParams } from 'react-router-dom'
import Navbar from './Navbar';

const Order = () => {

  const { orderId } = useParams();
  const { orders } = useContext(PageContext)
  const [order, setOrder] = useState(true)

  const fetchOrder = () => {
    orders.map(item => {
      if (item._id === orderId) {
        setOrder(item);
        return null;
      }
    })
  }


  useEffect(() => {
    fetchOrder();
  }, [orderId, orders])

  return (
    <div className='w-full flex justify-center items-center'>
        <div className='w-[90%] py-4'>
          <Navbar title={"Order"} />
          { 
            <div className='border-2 border-slate-800 rounded-lg p-4'>
              <div className='mb-4'>
                <img src={order.bankLogo} alt="logo" />
              </div>
              <div className='flex justify-between'>
                <div className= 'px-2 mb-2'>
                  <p className='mb-1'><b>Order By :{order.ordererName}</b></p>
                  <p><b>Order From : {order.bankName}</b></p>
                </div>
                <div className= 'px-2'>
                  <p className='mb-1'><b>Date : {order.Date}</b></p>
                  <p><b>Time : {order.Time}</b></p>
                </div>
              </div>
              <div className= 'p-2 mb-3'>
                <p className='text-2xl mb-1'>Products</p>
                <div className='ml-5'>
                  { order.products &&
                    order.products.map((item, index) => {
                      return (
                        <p className='mb-2' key={index}>{index+1}{") "}{item}</p>
                      )
                    })
                  }
                </div>
              </div>
              <p name="address" disabled className='text-black border-2 border-slate-800 rounded-lg p-4'>
                {order.address} 
              </p>
            </div>
          }
        </div>
    </div>
  )
}

export default Order