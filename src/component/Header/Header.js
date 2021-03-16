import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import './Header.css';


const Header = () => {
    return (
        <div className='header'>
           <img src={logo} alt=""/>
           <div className='left'>
              <nav>
               <Link to="/Shop">Shop</Link>
               <Link to="/Review">Review</Link>
               <Link to="/Inventory">Order</Link>
           </nav>
        </div>
        </div>
       
    );
};

export default Header;