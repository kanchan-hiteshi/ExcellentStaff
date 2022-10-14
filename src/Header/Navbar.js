import React from 'react';
import style from "./NavbarStyle.css";

const Navbar = () => {
    return (
        <nav className='header'>  
        <ul>  
        <li className='li'>  
        <a href="/projects" className='a'> Projects </a>  
        </li>  
        <li  className='li'>  
        <a href="/managers"  className='a'> Manager </a>  
        </li>  
        <li  className='li'>  
        <a href="/employees"  className='a'> Employees </a>  
        </li>  
        <li  className='li'> 
        <a href="/departments" className='a'> Department  </a>  
        </li>  
        <li  className='li logout'> 
        <a href='/' className='a'> Logout  </a>  
        </li>
        </ul>  
        </nav>  
    );
  }

  export default Navbar;
  
  