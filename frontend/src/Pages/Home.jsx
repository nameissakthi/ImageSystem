import React, { useContext } from 'react'
import { PageContext } from '../context/PageContext'

const Home = () => {

  const { setLogin, navigate, login } = useContext(PageContext)

  const onClickHandler = () => {
    setLogin(false);
    localStorage.removeItem("login");
    navigate("/login")
  }

  return (
    <div>
      <button onClick={onClickHandler}>LogOut</button>
    </div>
  )
}

export default Home