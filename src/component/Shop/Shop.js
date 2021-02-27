import React, { useState } from 'react';
import fakeData from '../../fakeData';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    const first10=fakeData.slice(0,10);
    const [products, setProducts]=useState(first10)
    const [cart, setCart]= useState([])
    function handleClick(product) {
        const newCount=[...cart,product];
        setCart(newCount)

    } 
    return (
        <div className='product-flex'>
            <div className='products-items'>
                {
                    products.map(pd => <Product
                        handleClick={handleClick}
                    product={pd}>

                    </Product>)
                }

            </div>
            <div className='calculate-part'>
             <div className='text-center'>
            <Cart cart={cart} ></Cart>
             </div>
            </div>
          
        </div>
    );
};

export default Shop;