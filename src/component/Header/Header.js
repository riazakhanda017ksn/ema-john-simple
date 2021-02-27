import React from 'react';
import logo from '../../images/logo.png';
import './Header.css';

const Header = () => {
    return (
        <div className='header'>
           <img src={logo} alt=""/>
           <div className='left'>
              <nav>
               <a href="/Shop">Shop</a>
               <a href="/Review">Review</a>
               <a href="/Manage Inventory here">Manage Inventory here</a>
           </nav>
        </div>
        </div>
       
    );
};

export default Header;