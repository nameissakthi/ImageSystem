import React, { useContext } from 'react'
import { PageContext } from '../context/PageContext'
import Navbar from '../Components/Navbar'
import ProductsList from './ProductsList'
import Sidebar from '../Components/Sidebar'

const Home = () => {

  const { navigate } = useContext(PageContext)

  return (
    <div>
      <div className='mb-10 h-screen'>
        <Navbar />
        <div className='flex justify-between mt-10'>
          <div className='flex-1'>
            <ProductsList />
          </div>
          <div className='items-stretch w-80'>
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home