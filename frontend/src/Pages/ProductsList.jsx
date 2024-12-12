import React, { useContext, useEffect, useState } from 'react';
import { PageContext } from '../context/PageContext';
import { FaCartPlus } from "react-icons/fa";

const ProductsList = () => {
    const { products, cart, addToCart } = useContext(PageContext);

    return (
        <div className='flex justify-center'>
            <div className='w-[90%] mt-10'>
                <h1 className='text-4xl mb-4 font-mono'>Products List</h1>
                <div className='grid grid-cols-4 gap-3'>
                    {products.map((item, index) => (
                        <div key={index} className='flex flex-col gap-2 border-2 border-slate-900 rounded-xl p-3 bg-slate-200'>
                            <div>
                                <img src={item.img} alt={`product-${index + 1}`} className='w-full h-56' />
                            </div>
                            <p className='text-2xl'><b>{item.name}</b></p>
                            <button
                                className='bg-yellow-400 p-3 rounded-xl items-center active:scale-95 mt-4'
                                onClick={() => addToCart(item)}
                            >
                                <b className='flex self-center items-center gap-2'>
                                    Add to Cart
                                    <FaCartPlus />
                                </b>
                            </button>
                        </div>
                    ))}
                </div>

                {/* Cart Section */}
            </div>
        </div>
    );
};

export default ProductsList;
