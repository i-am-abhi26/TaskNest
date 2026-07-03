import './Navbar.css'
import React from 'react'

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='appName'>
        <div className="logo"></div>
        <div className="name"><h2>TaskNest</h2></div>
      </div>
      <div className="about">
        <p> Manage All Your Tasks at One Place</p>
      </div>
    </div>
  )
}

export default Navbar
