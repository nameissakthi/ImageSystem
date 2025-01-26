import React, { useContext, useEffect, useState } from 'react'
import { PageContext } from '../Context/PageContext'
import Navbar from '../Components/Navbar'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import imageToBase64 from "image-to-base64"

const Clients = () => {

    const { clients, setClients } = useContext(PageContext)

    const [logo, setLogo] = useState("")
    const [bankName, setBankName] = useState("")
    const [branchName, setBranchName] = useState("")
    const [ifsc, setIfsc] = useState("")
    const [address, setAddress] = useState("")
    const [password, setPassword] = useState("")
    const [checkPass, setCheckPass] = useState("")
    const [email, setEmail] = useState("")
    const [products, setProducts] = useState([])

    const onSubmitHandler = (e, type) => {
        e.preventDefault();
        if(type==="branch"){
            if(bankName===""){
                toast.warning("Enter Bank Name")
                return ;
            }
            const bank = clients.filter(predicate=>predicate.name.toLowerCase().trim()===bankName.toLowerCase().trim())
            if(bank.length>0){
                console.log(bank)
            }else{
                toast.error("Bank Not Found")
            }
        }else{
            if(bankName==="" && logo==="" && address==="" && password==="" && checkPass==="" && email==="" && products.length===0){
                toast.warning("Please Enter All Fields")
            }else{
                const bank = clients.filter(predicate=>predicate.name.toLowerCase().trim()===bankName.toLowerCase().trim())
                if(bank.length>0){
                    toast.error("Bank Already Exists")
                }else{
                    if(password===checkPass){
                        const client = {
                            logo,
                            name: bankName,
                            address,
                            email,
                            password,
                            products
                        }
                        setClients(prev=>[...prev, client])
                    }else{
                        toast.warning("Password Must Match With CheckPass")
                    }
                }
            }
        }
    }

    const handleImage = (e, type) => {
        if(type==="logo"){
            let imageUrl=""
            console.log(e.target.value)
            imageToBase64(e.target.value)
            .then(response=>console.log(response))
            .catch(error=>console.log(error.message))
        }
    }

    // useEffect(()=>{
    //     console.log(products)
    // }, [products])

    useEffect(()=>{
        console.log(logo)
    }, [logo])

    // useEffect(()=>{
    //     console.log(clients)
    // }, [clients])

  return (
    <div className='w-full flex justify-center items-center'>
        <div className='w-[90%] py-4'>
            <Navbar title={"Clients"}/>
                <h1 className='text-3xl mb-3 p-1'>Add Bank</h1>
                <form onSubmit={e=>onSubmitHandler(e, "bank")} className='w-full mb-4 border-2 border-black px-4 py-6 rounded-lg grid grid-cols-2 gap-2'>
                    <label htmlFor="Logo" className='flex flex-col w-fit'>
                        <span className='text-base mb-1'>Logo :</span>
                        <input type="file" name="Logo" id="" value={logo} onChange={e=>handleImage(e, "logo")} className='border border-black rounded-lg px-2 py-1 w-80 bg-white/90 text-base' required />
                    </label>
                    <label htmlFor="bankname" className='flex flex-col w-fit'>
                        <span className='text-base mb-1'>Bank Name :</span>
                        <input type="text" name="bankname" id="" value={bankName} onChange={e=>setBankName(e.target.value)} className='border border-black rounded-lg px-2 py-1.5 w-80 bg-white/90 text-base' placeholder='Enter Bank Name' required />
                    </label>
                    <label htmlFor="address" className='flex flex-col w-fit'>
                        <span className='text-base mb-1'>Address :</span>
                        <input type="text" name="address" id="" value={address} onChange={e=>setAddress(e.target.value)} className='border border-black rounded-lg px-2 py-1.5 w-80 bg-white/90 text-base' placeholder='Enter Address' required />
                    </label>
                    <label htmlFor="password" className='flex flex-col w-fit'>
                        <span className='text-base mb-1'>Password :</span>
                        <input type="text" name="password" id="" value={password} onChange={e=>setPassword(e.target.value)} className='border border-black rounded-lg px-2 py-1.5 w-80 bg-white/90 text-base' placeholder='Enter Password' required />
                    </label>
                    <label htmlFor="Email" className='flex flex-col w-fit'>
                        <span className='text-base mb-1'>Email :</span>
                        <input type="text" name="Email" id="" value={email} onChange={e=>setEmail(e.target.value)} className='border border-black rounded-lg px-2 py-1.5 w-80 bg-white/90 text-base' placeholder='Enter Email' required />
                    </label>
                    <label htmlFor="password" className='flex flex-col w-fit'>
                        <span className='text-base mb-1'>Check Password :</span>
                        <input type="text" name="password" id="" value={checkPass} onChange={e=>setCheckPass(e.target.value)} className='border border-black rounded-lg px-2 py-1.5 w-80 bg-white/90 text-base' placeholder='Enter Password Again' required />
                    </label>
                    <label htmlFor="products" className='flex flex-col w-fit'>
                        <span className='text-base mb-1'>Products</span>
                        <input type="file" name="products" id="" value={products} onChange={e=>handleImage(e, "products")} className='border border-black rounded-lg px-2 py-1 w-80 bg-white/90 text-base' multiple required />
                    </label>
                    <div className='flex justify-end w-80 mt-4'>
                        <button className='bg-slate-700 w-fit self-center py-2 h-fit px-4 rounded-lg text-white'>
                            Add Bank
                        </button>
                    </div>
                </form>
                <h1 className='text-3xl mb-3 p-1'>Add Branch</h1>
                <form onSubmit={e=>onSubmitHandler(e, "branch")} className='w-full mb-4 border-2 border-black px-4 py-6 rounded-lg grid grid-cols-2 gap-2'>
                    <label htmlFor="bankname" className='flex flex-col w-fit'>
                        <span className='text-base mb-1'>Branch Name :</span>
                        <input type="text" name="bankname" id="" value={bankName} onChange={e=>setBankName(e.target.value)} className='border border-black rounded-lg px-2 py-1.5 w-80 bg-white/90 text-base' placeholder='Enter Branch Name' />
                    </label>
                    <label htmlFor="branchname" className='flex flex-col w-fit'>
                        <span className='text-base mb-1'>Branch Name :</span>
                        <input type="text" name="branchname" id="" value={branchName} onChange={e=>setBranchName(e.target.value)} className='border border-black rounded-lg px-2 py-1.5 w-80 bg-white/90 text-base' placeholder='Enter Branch Name' />
                    </label>
                    <label htmlFor="ifsc" className='flex flex-col w-fit'>
                        <span className='text-base mb-1'>IFSC Code :</span>
                        <input type="text" name="ifsc" id="" value={ifsc} onChange={e=>setIfsc(e.target.value)} className='border border-black rounded-lg px-2 py-1.5 w-80 bg-white/90 text-base' placeholder='Enter IFSC code' />
                    </label>
                    <div className='flex justify-end w-80 mt-4'>
                        <button className='bg-slate-700 w-fit self-center py-2 h-fit px-4 rounded-lg text-white'>
                            Add Branch
                        </button>
                    </div>
                </form>
                <h1 className='text-3xl mb-3 p-1'>Bank List</h1>
                <div>
                    {
                        clients.map((client, index) => {
                            return (
                                <div key={index} className='flex justify-between py-2 pr-8 border-2 border-slate-700 mb-4 rounded-lg items-center relative'>
                                    <div className='flex-shrink px-4 text-3xl'>
                                        <p className='bg-black h-fit p-2 text-white'>{index+1}</p>
                                    </div>
                                    <div className='flex flex-col justify-between mb-2 flex-1'>
                                        <img src={client.logo} alt="Bank Logo" className='w-44 ' />
                                        <p className='text-2xl'>{client.name}</p>
                                        <p className='text-2xl'>{client.address}</p>
                                    </div>
                                    <div>
                                        <Link to={`/clients/${client._id}`} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
                                            Details
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

export default Clients