import React, { useContext } from 'react'
import { PageContext } from '../Context/PageContext'
import Navbar from '../Components/Navbar'
import { IoIosNotifications } from "react-icons/io";
import { Link } from 'react-router-dom';


const Orders = () => {

    const { orders, date } = useContext(PageContext)

  return (
    <div className='w-full flex justify-center items-center'>
        <div className='w-[90%] py-4'>
            <Navbar title={"Orders"}/>
            <div>
                {
                    orders.map((item, index) => {
                        return (
                            <div key={index} className='flex justify-between py-2 pr-8 border-2 border-slate-700 mb-4 rounded-lg items-center relative'>
                                {item.Date===date?<IoIosNotifications className='absolute top-[-20px] left-[-25px] -rotate-45 text-5xl text-yellow-400' />:null}
                                <div className='flex-shrink px-4 text-3xl'>
                                    <p className='bg-black h-fit p-2 text-white'>{index+1}</p>
                                </div>
                                <div className='flex flex-col justify-between mb-2 flex-1'>
                                    <img src={item.bankLogo} alt="Bank Logo" className='w-44' />
                                    <p className='text-2xl'>{item.bankName}</p>
                                </div>
                                <div>
                                    <Link to={`/orders/${item._id}`} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
                                        Check
                                    </Link>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default Orders