import React, { useContext } from 'react'
import { PageContext } from '../Context/PageContext'
import LeftSideBar from '../Components/LeftSideBar'
import RightSideBar from '../Components/RightSideBar'

const Home = () => {

  const { setLogin, navigate, login } = useContext(PageContext)

  const onClickHandler = () => {
    setLogin(false);
    localStorage.removeItem("login");
    navigate("/login")
  }

  return (
    <div className='flex justify-between'>
      <LeftSideBar />
      <RightSideBar />
    </div>
  )
}

export default Home