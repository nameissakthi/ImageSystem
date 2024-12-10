import React, { useContext, useEffect, useState } from 'react'
import { PageContext } from '../Context/PageContext'
import { useParams } from 'react-router-dom'
import Navbar from './Navbar';

const Order = () => {

  const { orderId } = useParams();
  const { orders, setOrders } = useContext(PageContext)
  const [order, setOrder] = useState(false)
  const [open, setOpen] = useState(false)

  const fetchOrder = () => {
    const orderData = orders.find((item) => item._id === orderId);
    if (orderData) setOrder(orderData);
  };

  const updateOrders = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.map((item) =>
        item._id === orderId
          ? { ...item, selectedProducts: order.selectedProducts }
          : item
      )
    );
    setOpen(true)
  };
  
  

  const onCheckboxChange = (item) => {
    setOrder((prevOrder) => {
      const isSelected = prevOrder.selectedProducts.includes(item);
  
      const updatedSelectedProducts = isSelected
        ? prevOrder.selectedProducts.filter((product) => product !== item) // Remove item
        : [...prevOrder.selectedProducts, item]; // Add item
  
      return {
        ...prevOrder,
        selectedProducts: updatedSelectedProducts,
      };
    });
  };

  const selectAllProducts = () => {
    setOrder((prevOrder) => {
      const updatedSelectedProducts = [...prevOrder.products]; // Add all products
      return {
        ...prevOrder,
        selectedProducts: updatedSelectedProducts,
      };
    });
  };
  
  const printHandler = () => {
    const printWindow = window.open("", "", "width=800,height=600");

    const products = order.selectedProducts
    const prod = products.map((item, index) => {
      return (`
          <tr>
            <td style="text-align:center;">${index+1}</td>
            <td>${item}</td>
            <td style="text-align:center;">3</td>
            <td style="text-align:center;">1200</td>
            <td style="text-align:center;">0%</td>
            <td style="text-align:center;">1220</td>
          </tr>
        `)
    })
    .join("")

    printWindow.document.write(`
      <html>
        <head>
          <title>Bill</title>
          <style>
            body { font-family: Arial, sans-serif; }
            table { border-collapse: collapse; width:100% }
            td { border:2px solid black; padding : 5px }
          </style>
        </head>
        <body>
          <h1 style="text-align:center;">ORDER FROM</h1>
          <br />
          <div style="width:100%; display:flex; justify-content:space-between;">
            <p>NAME : ${order.ordererName}</p>
            <p>ORDER : ${order.orderNumber}</p>
          </div>
          <div style="width:100%; display:flex; justify-content:space-between;">
            <p>BANK : ${order.bankName}</p>
            <p>DATE : ${order.Date}</p>
          </div>
          <div style="width:100%; display:flex; justify-content:space-between;">
            <p>PHONE NO. : ${order.phoneno}</p>
            <p>EMAIL : ${order.email}</p>
          </div>
          <div style="width:100%">
            <p>ADDRESS : ${order.address}</p>
          </div>
          <h3>ORDER DETAILS</h3>
          <table style="font-size: 10px;">
            <thead>
              <tr>
                <td style="text-align:center;">NO.</td>
                <td style="text-align:center;">ITEM DESCRIPTION</td>
                <td style="text-align:center;">OTY</td>
                <td style="text-align:center;">PRICE</td>
                <td style="text-align:center;">DISCOUNT</td>
                <td style="text-align:center;">TOTAL</td>
              </tr>
            </thead>
            <tbody>
              ${prod}
            </tbody>
            <tfoot>
              <tr>
                <td>METHOD</td><td colspan="3"></td><td>TAX</td><td></td>
              </tr>
              <tr>
                <td>DATE</td><td colspan="3"></td><td>SHIPPING</td><td></td>
              </tr>
              <tr>
                <td>DATE RECEIVED</td><td colspan="3"></td><td>TOTAL</td><td></td>
              </tr>
            </tfoot>
          </table>
          <h4>NOTES</h4>
          <textarea style="width:100%; height: 100px; resize:none;"></textarea>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.print();
  }


  useEffect(() => {
    fetchOrder();
  }, [orderId, orders])

  return (
    <div className='w-full flex justify-center items-center'>
        <div className='w-[90%] py-4'>
          <Navbar title={"Order"} />
          { order &&
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
                <div className='grid grid-cols-4 gap-2'>
                  { order.products &&
                    order.products.map((item, index) => {
                      return (
                        <div key={index} className='m-2'>
                            <label htmlFor='item' className="text-white flex items-center gap-2">
                              <input onChange={() => onCheckboxChange(item)} checked={order.selectedProducts.includes(item)} name='item' id='item' className="dark:border-white-400/20 dark:scale-100 transition-all duration-500 ease-in-out dark:hover:scale-110 dark:checked:scale-100 w-6 h-6" type="checkbox" />
                              <span className='text-base text-black uppercase'>{item}</span>
                            </label>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
              <button className='py-2 w-full bg-blue-600 mx-1 mb-4 rounded-lg text-white text-xl' onClick={selectAllProducts}>
                Select All
              </button>
              <p name="address" disabled className='text-black border-2 border-slate-800 rounded-lg p-4'>
                {order.address} 
              </p>
            </div>
          }
          {
            <div className='border-2 border-slate-800 rounded-lg p-4 mt-8'>
              <div className='flex justify-between items-center'>
                <h1 className='text-2xl'>Selected Product For Production</h1>
                <span className='border-2 py-1 px-3 border-black rounded-full text-xl'><b>{order.selectedProducts!=undefined?order.selectedProducts.length:0}</b></span>
              </div>
              <div className='ml-8 mt-2'>
                {
                  order.selectedProducts && 
                  order.selectedProducts.map((item, index) => {
                    return (
                      <div key={index} className='flex justify-start gap-2 items-center'>
                        <label>
                          <input value="wedding-gift" className="peer cursor-pointer hidden after:opacity-100" readOnly checked="checked" type="checkbox"/>
                          <span className="inline-block w-4 h-5 border-2 relative cursor-pointer after:content-[''] after:absolute after:top-2/4 after:left-2/4 after:-translate-x-1/2 after:-translate-y-1/2 after:w-[10px] after:h-[10px] after:bg-[#333] after:rounded-[2px] after:opacity-0 peer-checked:after:opacity-100"></span>
                        </label>
                        <p className='uppercase'><b>{item}</b></p>
                      </div>
                    )
                  })
                }
              </div>
              <div className='w-full mt-2 flex justify-center'>
                {order.selectedProducts!=undefined?order.selectedProducts.length!=0?<button className='bg-green-600 uppercase rounded-3xl py-2 px-6 active:scale-90 text-white' onClick={()=>updateOrders(orderId)}><b>Accept</b></button>:null:null}
              </div>
            </div>
          }
          {
            open && 
            <div className='isolate aspect-video bg-white/70 shadow-lg ring-1 ring-black/5 rounded-lg w-72 h-52 fixed top-[40%] left-[40%] flex flex-col justify-center items-center'>
              <button className='absolute top-3 right-3 bg-black rounded-full w-7 pb-1 text-white' onClick={()=>setOpen(false)}>x</button>
              <div className='flex justify-center gap-2'>
                <button className='bg-blue-600 text-white py-2 px-4 rounded-xl' onClick={printHandler}>Print</button>
                <button className='bg-orange-600 text-white py-2 px-4 rounded-xl'>Start Production</button>
              </div>
            </div>
          }
        </div>
    </div>
  )
}

export default Order