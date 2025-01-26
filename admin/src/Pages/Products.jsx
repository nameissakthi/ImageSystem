import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import { PageContext } from '../Context/PageContext'
import { toast } from 'react-toastify'

const Products = () => {
  const { products, currency, setProducts } = useContext(PageContext)
  const [preview, setPreview] = useState(null);
  const [name, setName] = useState("")
  const [sp, setSp] = useState(0)
  const [cp, setCp] = useState(0)

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const addProduct = (e) => {
    e.preventDefault();

    if (!preview) {
      toast.error("Image is required!", { hideProgressBar: true, autoClose: 2000 });
      return;
    }
  
    if (sp <= cp) {
      toast.error("Selling Price must be greater than Cost Price!", { hideProgressBar: true, autoClose: 2000 });
      return;
    }

   setProducts((prevProducts) => {
    const nextId = prevProducts.length > 0 ? prevProducts[prevProducts.length - 1]._id + 1 : 1;

    const productData = {
      _id: nextId,
      img: preview,
      name,
      cp,
      sp,
    };

    return [...prevProducts, productData];
  });

    toast.success("Product Added Successfully", { hideProgressBar:true, autoClose: 2000 })

  }

  const deleteProduct = (id) => {
    setProducts(prevProducts=>
      prevProducts.filter(item=>item._id!=id)
    )
  }

  return (
    <div className='w-full flex justify-center items-center'>
      <div className='w-[90%] py-4'>
        <Navbar title={"Products"}/>
        <h1 className='text-2xl mb-2'>Add Products</h1>
        <form className='flex justify-between' onSubmit={e=>addProduct(e)}>
          <div className="mx-auto rounded-lg overflow-hidden w-64 h-56">
          {preview ? <img src={preview} alt="Image Preview" className='h-full w-full' />:
            <div className="md:flex">
              <div className="w-full p-3">
                <div className="relative h-48 rounded-lg border-2 border-slate-700 bg-gray-50 flex justify-center items-center shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                  <div className="absolute flex flex-col items-center">
                    <img alt="File Icon" className="mb-3" src="https://img.icons8.com/dusk/64/000000/file.png"/>
                    <span className="block text-gray-500 font-semibold">Drag &amp; drop your files here</span>
                    <span className="block text-gray-400 font-normal mt-1">or click to upload</span>
                  </div>
                  <input className="h-full w-full opacity-0 cursor-pointer" type="file" accept=".png, .jpg, .jpeg" onChange={handleImageChange} required />
                </div>
              </div>
            </div>}
          </div>
          <div  className='p-3 flex flex-col flex-1'>
            <div  className='flex flex-col flex-1 gap-3'>
              <input type="text" placeholder='Product Name' className='py-1 px-3 rounded-lg border-2 border-slate-700' value={name} onChange={e=>setName(e.target.value)} required autoFocus />
              <input type="number" placeholder='Selling Price' className='py-1 px-3 rounded-lg border-2 border-slate-700' onChange={e=>setSp(e.target.value)} required />
              <input type="number" placeholder='Cost Price' className='py-1 px-3 rounded-lg border-2 border-slate-700' onChange={e=>setCp(e.target.value)} required />
            </div>
            <div className='p-3 flex justify-end'>
              <button className='bg-green-500 text-xl px-8 py-2 rounded-lg text-white active:scale-95'>Add</button>
            </div>
          </div>
        </form>

        <h1 className='text-2xl mb-2'>Products List</h1>
        <div>
          {
            products.map((item, index) => {
              return (
                <div key={index} className='flex justify-between py-2 p-8 border-2 border-slate-700 mb-4 rounded-lg items-center'>
                  <div className='flex'>
                    <img src={item.img} alt={`products-${index+1}`} className='h-20 w-24 rounded' />
                    <p className='ml-2'><b>{item.name}</b></p>
                  </div>
                  <div className='flex flex-col justify-between h-full'>
                    <div className='flex flex-col justify-between'>
                      <span><b>Selling Price :</b> {currency}{item.sp}</span>
                      <span><b>Cost Price :</b> {currency}{item.cp}</span>
                    </div>
                    <button className='px-8 py-2 bg-red-500 text-white rounded-lg' onClick={()=>deleteProduct(item._id)}>
                      Delete
                    </button>
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

export default Products