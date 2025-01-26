import React, { useContext, useEffect, useState } from 'react'
import { PageContext } from '../Context/PageContext'
import Navbar from '../Components/Navbar'
import { toast } from "react-toastify"
import axios from 'axios'

const ProductionTracking = () => {

    const { production, backendUrl, fetchProduction } = useContext(PageContext)
    const [open, setOpen] = useState(false)
    const [productionId, setProductionId] = useState("")

    const selectProduction = (_id) => {
        setOpen(true)
        if(!open){
            setProductionId(_id)
        }
    }

    const deleteProduction = async (productionId) => {
        try {
            const response = await axios.post(backendUrl+"/api/production/delete", { productionId })
             if(response.data.success){
                toast.success("Production Deleted Successfully", { hideProgressBar: true, autoClose: 2000 })
             }
             setProductionId("")
             fetchProduction();
        } catch (error) {
            console.log(error.message)
            toast.error(error.message, { hideProgressBar:false, autoClose:2000 })
        }
        setOpen(false)
    }

  return (
    <div className='w-full flex justify-center items-center'>
        <div className='w-[90%] py-4'>
            <Navbar title={"Production Tracking"} />
            <div>
                {
                    production.map((production, index) => {
                        return (
                            <div key={index} className='flex justify-between py-2 pr-8 border-2 border-slate-700 mb-4 gap-4 rounded-lg'>
                                <div className='flex-shrink pl-4 text-3xl self-center'>
                                    <p className='bg-black h-fit p-2 text-white'>{index+1}</p>
                                </div>
                                <div className='flex flex-col justify-between mb-2'>
                                    <img src={production.order.bankLogo} alt="Bank Logo" className='w-44' />
                                    <p className='text-2xl'>{production.order.bankName}</p>
                                </div>
                                <div className='flex-1 flex flex-col justify-between'>
                                    <div className='flex items-center'>
                                        <progress value={production.level} max="100" className='w-full mr-2' />
                                        <p>{production.level}%</p>
                                    </div>
                                    <div className='flex justify-between'>
                                        <p className='text-2xl'><b>Designer : {production.designer}</b></p>
                                        <button className='py-2 active:scale-95 px-5 rounded-lg bg-red-500 text-white' onClick={()=>selectProduction(production._id)}>
                                            Delete
                                        </button>
                                    </div>
                                </div> 
                            </div>
                        )
                    })
                }
            </div>
            {
            open && 
            <div className='isolate aspect-video bg-white/70 shadow-lg ring-1 ring-black/5 rounded-lg w-72 h-32 fixed top-[40%] left-[40%] flex flex-col justify-center items-center'>
              <button className='absolute top-3 right-3 bg-black rounded-full w-7 pb-1 text-white' onClick={()=>setOpen(false)}>x</button>
              <div className='flex justify-between items-center gap-2'>
                <button className='bg-red-500 text-white py-2 px-4 rounded-xl' onClick={()=>deleteProduction(productionId)}>Delete</button>
                <button className='bg-blue-600 text-white py-2 px-4 rounded-xl' onClick={()=>setOpen(false)}>Cancel</button>
              </div>
            </div>
          }
        </div>
    </div>
  )
}

export default ProductionTracking