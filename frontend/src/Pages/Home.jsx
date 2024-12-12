import React, { useContext } from 'react'
import { PageContext } from '../context/PageContext'
import Navbar from '../Components/Navbar'
import ProductsList from './ProductsList'
import Cart from './Cart'

const Home = () => {

  const { navigate } = useContext(PageContext)

  return (
    <div>
      <div>
        <Navbar />
        <ProductsList />
      </div>
    </div>
  )
}

export default Home