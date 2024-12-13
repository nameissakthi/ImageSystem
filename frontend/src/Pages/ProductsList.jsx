import React, { useContext, useState } from 'react';
import { PageContext } from '../context/PageContext';
import { toast } from 'react-toastify';

const Products = () => {
  const { products, cart, setCart, currency, decrementQty, incrementQty, addToCart, removeFromCart } = useContext(PageContext);

  return (
    <div className="px-6 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800">Cart</h2>
      <ul className="mt-4 flex gap-2 h-44">
        {cart.length > 0 ? cart.map((item, index) => (
          <li
            key={index}
            className="p-4 bg-white shadow-md rounded-lg flex flex-col gap-2 justify-between"
          >
            <div>
              <h2 className="text-lg font-medium text-gray-700">{item.name}</h2>
              <p className="text-sm text-gray-500">
                Price: {currency}{item.price}
              </p>
              <p className="text-sm text-gray-500">Quantity: {item.qty}</p>
              <p className="text-sm text-gray-500">
                Total: {currency}{item.totalAmt}
              </p>
            </div>
            <button
              onClick={() => removeFromCart(item.name)}
              className="px-4 py-2 mt-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Remove
            </button>
          </li>
        )) : 
            <div className='mb-3 flex-1 flex flex-col justify-center items-center bg-white shadow-md rounded-lg h-44'>
                <p className='text-xl'>Your Cart Is Empty</p>
            </div>
        }
      </ul>

      <h1 className="text-2xl font-bold mb-4 text-gray-800">Products</h1>
      <ul className="grid grid-cols-4 gap-3">
        {products.map((product, index) => (
          <li
            key={index}
            className="p-4 bg-white shadow-md rounded-lg flex flex-col"
          >
            <img
              src={product.img}
              alt={`product-${index + 1}`}
              className="h-44 w-full mb-2 rounded-lg"
            />
            <div>
              <h2 className="text-lg font-medium text-gray-700">
                {product.name}
              </h2>
              <p className="text-sm text-gray-500">
                Price: {currency}{product.price}
              </p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => addToCart(product)}
                className="px-4 mt-2 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Add to Cart
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
