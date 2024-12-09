import React, { useContext } from 'react'
import { PageContext } from '../Context/PageContext'
import Navbar from '../Components/Navbar'

const Orders = () => {

    const { orders } = useContext(PageContext)

  return (
    <div className='w-full flex justify-center items-center'>
        <div className='w-[50%] py-4'>
            <Navbar/>
            <h1 className='text-6xl w-full border-b-2 border-black mb-8'>Orders</h1>
            <div>
                {
                    orders.map((item, index) => {
                        return (
                            <div key={index} className='flex justify-between py-2 pr-8 border-2 border-slate-700 mb-4'>
                                <div className='flex-shrink px-4 text-3xl'>
                                    <p className='bg-black h-fit p-2 text-white'>{index+1}</p>
                                </div>
                                <div className='flex flex-col justify-between mb-2 flex-1'>
                                    <img src={item.bankLogo} alt="Bank Logo" className='w-44' />
                                    <p className='text-2xl'>{item.bankName}</p>
                                </div>
                                <div>
                                    {
                                        item.products.map((item, index) => {
                                            return (
                                                <p key={index}>{item}</p>
                                            )
                                        })
                                    }
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