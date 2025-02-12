import React, { useContext, useEffect, useState, setState } from 'react'
import { PageContext } from '../Context/PageContext'
import { useParams } from 'react-router-dom'
import Navbar from './Navbar';
import { toast } from 'react-toastify'
import axios from 'axios';

const Order = () => {

  const { orderId } = useParams();
  const { orders, setOrders, designers, navigate, discount, backendUrl, fetchProduction } = useContext(PageContext)
  const [order, setOrder] = useState(false)
  const [open, setOpen] = useState(false)
  const [selectedProducts, setSelectedProducts] = useState([])
  const [designer, setDesigner] = useState([])

  const fetchOrder = () => {
    const orderData = orders.find((item) => item._id === orderId);
    if (orderData) setOrder(orderData);
  };

  const updateOrder = (newSelectedProducts) => {
    setOrder((prevOrder) => {
      const updatedOrder = {
        ...prevOrder,
        selectedProducts: [...newSelectedProducts],
      };
  
      updateOrders(updatedOrder);
      return updatedOrder;
    });
  };
  
  const updateOrders = (updatedOrder) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === updatedOrder._id ? updatedOrder : order
      )
    );
  };
  

  const onCheckHandler = (item, isChecked) => {
    if (isChecked) {
      setSelectedProducts((prevSelected) => {
        if(prevSelected.name===item.name){
          return [...prevSelected]
        }else {
          return [...prevSelected, item]
        }
      }
      );
    } else {
      setSelectedProducts((prevSelected) =>
        prevSelected.filter((product) => product.name !== item.name)
      );
    }
  };
  
  const selectAllProducts = () => {
    if (selectedProducts.length === order.products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(order.products.map((item) => item));
    }
  };

  const onClickAccept = async () => {
    setOpen(true)
    updateOrder(selectedProducts)
  }

  const selectDesigner = (designer, isChecked) => {
    if(isChecked){
      setDesigner(prevDesigner=>{
        if(prevDesigner===designer){return [...prevDesigner]}
        else{return [...prevDesigner, designer]}
      })
    }else{
      setDesigner(prevDesigner=>prevDesigner.filter((designerName)=>designerName !== designer))
    }
  }

  const assignDesigners = async () => { 
    const production = {
      order : order,
      designer : designer, 
      level : 0 
    } 
    try {
      const response = await axios.post(backendUrl+"/api/production/new",production)
      if(response.data.success){
        setOpen(false)
        await fetchProduction();
        toast.success(response.data.message, { hideProgressBar: true, autoClose: 2000 })
      }else{
        console.error(response.data.message)
        toast.error("Production failed, Try to reload", { hideProgressBar:true, autoClose:2000 })
      }
    } catch (error) {
      console.error(error.message)
      toast.error("Production failed, Try to reload", { hideProgressBar:true, autoClose:2000 })
    }
    printHandler()
  }

  const printHandler = () => {
    
    const printWindow = window.open("", "", "width=800,height=600");

    const products = order.selectedProducts

    let Amount = 0;
    products.map(item=>Amount+=item.totalAmt)

    console.log(products)
    const prod = products.map((item, index) => {
      return (`
          <tr>
            <td style="text-align:center;">${index+1}</td>
            <td>${item.name}</td>
            <td style="text-align:center;">${item.qty}</td>
            <td style="text-align:center;">${item.totalAmt}</td>
            <td style="text-align:center;">${discount}</td>
            <td style="text-align:center;">${item.totalAmt-(item.totalAmt*(discount/100))}</td>
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
          <div style="width:100%; display: grid; grid-template-columns: 1fr 1fr;">
            <p>EMPLOYEE NUM : ${order.EmpNum}</p>
            <p>ORDER : ${order.orderNumber}</p>
          </div>
          <div style="width:100%; display: grid; grid-template-columns: 1fr 1fr;">
            <p>BANK &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: ${order.bankName}</p>
            <p>DATE &nbsp;&nbsp;&nbsp;: ${order.Date}</p>
          </div>
          <div style="width:100%; display: grid; grid-template-columns: 1fr 1fr;">
            <p>PHONE NO. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: ${order.phoneno}</p>
            <p>EMAIL &nbsp;&nbsp;: ${order.email}</p>
          </div>
          <div style="width:100%">
            <p>ADDRESS : ${order.address}</p>
          </div>
          <h3>ORDER DETAILS</h3>
          <table style="font-size: 10px;">
            <thead>
              <tr>
                <td style="text-align:center;"><b>NO.</b></td>
                <td style="text-align:center;"><b>ITEM DESCRIPTION</b></td>
                <td style="text-align:center;"><b>QTY</b></td>
                <td style="text-align:center;"><b>PRICE</b></td>
                <td style="text-align:center;"><b>DISCOUNT</b></td>
                <td style="text-align:center;"><b>TOTAL</b></td>
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
                <td>DATE RECEIVED</td><td colspan="3"></td><td>TOTAL</td><td style="text-align:center;">${Amount}</td>
              </tr>
              <tr>
                <td>DESIGNER</td><td colspan="5">${designer[0]}</td>
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
              <div className='mb-4 flex justify-center'>
                <img src={order.bankLogo} alt="logo" className='w-64' />
              </div>
              <div className='grid grid-cols-2'>
                <div className= 'px-2 mb-2'>
                  <p className='mb-1'><b>Employee Number : {order.EmpNum}</b></p>
                  <p><b>Order From : {order.bankName}</b></p>
                </div>
                <div className= 'px-2 ml-40'>
                  <p className='mb-1'><b>Date : {order.Date}</b></p>
                  <p><b>Time : {order.Time}</b></p>
                </div>
                <div className= 'px-2 mb-2'>
                  <p className='mb-1'><b>Emplyee Name: {order.name}</b></p>
                  <p><b>Mobile Number : {order.phoneno}</b></p>
                </div>
                <div className= 'px-2 mb-2 ml-40'>
                  <p className='mb-1'><b>Mail Id : {order.email}</b></p>
                  <p className='mb-1'><b>Branch: {order.address}</b></p>
                </div>
              </div>
              <div className= 'p-2 mb-3'>
                <p className='text-2xl mb-1'>Products</p>
                <div className='grid grid-cols-2 gap-3'>
                  {
                    order.products.map((item, index) => {
                      return (
                        <div className='border-2 border-black rounded-lg flex p-3' key={index}>
                          <img src={item.img} alt="product" className='w-32' />
                          <div className='flex flex-col flex-1 ml-4 justify-between text-sm'>
                            <span><b>PRODUCT : {item.name}</b></span>
                            <span><b>QUANTITY : {item.qty}</b></span>
                          </div>
                          <div className='flex flex-col justify-center items-end'>
                            <input type="checkbox" className='w-8 h-8' checked={selectedProducts.includes(item)} onChange={(e)=>onCheckHandler(item, e.target.checked)}  />
                          </div>
                        </div>
                      )
                    })
                  }
                  <div className='col-span-2 flex justify-center mt-2'>
                    <button onClick={()=>selectAllProducts(order.product)} className='bg-black text-white p-3 w-32'>
                      Select All
                    </button>
                  </div>
                </div>
              </div>
              <p name="address" disabled className='text-black border-2 border-slate-800 rounded-lg p-4'>
                Remark : {order.remark} 
              </p>
            </div>
          }
          {
            <div className='border-2 border-slate-800 rounded-lg p-4 mt-8'>
              <div className='flex justify-between items-center'>
                <h1 className='text-2xl'>Selected Product For Production</h1>
                <span className='border-2 py-1 px-3 border-black rounded-full text-xl'><b>{selectedProducts!=undefined?selectedProducts.length:0}</b></span>
              </div>
              <div className='ml-8 mt-2'>
                {
                  selectedProducts && 
                  selectedProducts.map((item, index) => {
                    return (
                      <div key={index} className='flex justify-start gap-2 items-center'>
                        <label>
                          <input value="wedding-gift" className="peer cursor-pointer hidden after:opacity-100" readOnly checked="checked" type="checkbox"/>
                          <span className="inline-block w-4 h-5 border-2 relative cursor-pointer after:content-[''] after:absolute after:top-2/4 after:left-2/4 after:-translate-x-1/2 after:-translate-y-1/2 after:w-[10px] after:h-[10px] after:bg-[#333] after:rounded-[2px] after:opacity-0 peer-checked:after:opacity-100"></span>
                        </label>
                        <p className='uppercase'><b>{item.name}</b></p>
                      </div>
                    )
                  })
                }
              </div>
              <div className='w-full mt-2 flex justify-center'>
                {selectedProducts!=undefined?selectedProducts.length!=0?<button className='bg-green-600 uppercase rounded-3xl py-2 px-6 active:scale-90 text-white' onClick={onClickAccept}><b>Start Production</b></button>:null:null}
              </div>
            </div>
          }
          {
            open && 
            <div className='isolate aspect-video bg-white/70 shadow-lg ring-1 ring-black/5 rounded-lg w-72 h-52 fixed top-[40%] left-[40%] flex flex-col justify-center items-center'>
              <button className='absolute top-3 right-3 bg-black rounded-full w-7 pb-1 text-white' onClick={()=>setOpen(false)}>x</button>
              <div className='flex flex-col justify-center gap-2'>
                <h3 className='text-xl'><b>Choose a Designer</b></h3>
                <div className='flex flex-col my-2 self-center'>
                  {
                    designers.map((designer, index)=>
                      <label htmlFor="name" key={index}>
                        <input type="checkbox" id='name' value={designer.name} onChange={(e)=>selectDesigner(e.target.value, e.target.checked)}/> {designer.name}
                      </label>
                    )
                  }
                </div>
                <button className='bg-blue-600 text-white py-2 px-4 rounded-xl' onClick={assignDesigners}>Assign</button>
                {/* <button className='bg-orange-600 text-white py-2 px-4 rounded-xl' onClick={()=>updateOrders(orderId)} >Start Production</button> */}
              </div>
            </div>
          }
        </div>
    </div>
  )
}

export default Order