import React from 'react'
import { NavLink } from 'react-router-dom'

const Home = () => {
  return (
    <>
        <h1>home</h1>
        <button><NavLink to="/signup">SignUp</NavLink></button>
    </>
  )
}

export default Home
