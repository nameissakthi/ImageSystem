import React, { useContext } from 'react'
import { PageContext } from '../Context/PageContext'
import Navbar from '../Components/Navbar'

const ProductionTracking = () => {

    const { orders } = useContext(PageContext)

  return (
    <div className='w-full flex justify-center items-center'>
        <div className='w-[50%] py-4'>
            <Navbar/>
            <h1 className='text-6xl w-full border-b-2 border-black mb-8'>Production Tracking</h1>
            <div>
                {
                    orders.filter(item=>item.summary<100).map((item, index) => {
                        return (
                            <div key={index} className='flex justify-between py-2 pr-8 border-2 border-slate-700 mb-4 gap-4'>
                                <div className='flex-shrink pl-4 text-3xl'>
                                    <p className='bg-black h-fit p-2 text-white'>{index+1}</p>
                                </div>
                                <div className='flex flex-col justify-between mb-2'>
                                    <img src={item.bankLogo} alt="Bank Logo" className='w-44' />
                                    <p className='text-2xl'>{item.bankName}</p>
                                </div>
                                <div className='flex-1 flex items-center'>
                                    <progress value={item.summary} max="100" className='w-full mr-2' />
                                    <p>{item.summary}%</p>
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

export default ProductionTracking