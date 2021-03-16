import React, { useEffect, useState } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewsItems from '../ReviewsItems/ReviewsItems';
import Cart from '../Cart/Cart';
import Smilee from '../../images/giphy.gif'
import { useHistory } from 'react-router';

const Review = () => {
    const [cart,setCart]=useState([])
    const[orderPlace, setOderPlace]=useState(false)
    const history=useHistory()
    const handleProceedHolder=()=>{
        history.push('/shiftment')
        // setCart([]);
        // setOderPlace(true);
        // processOrder();
    }
    const removeProduct=(productKey)=>{
        const newCart=cart.filter(pd=>pd.key !==productKey)
        setCart(newCart)
        removeFromDatabaseCart(productKey)
    }
    useEffect(()=>{
        const savedCart=getDatabaseCart()
        const productKeys=Object.keys(savedCart)
        const cartProducts=productKeys.map(key=>{
        const product=fakeData.find(pd=>pd.key===key) 
        product.quantity=savedCart[key];
        return product
        })
        setCart(cartProducts)
        
    },[])
    let happyImage
    if(orderPlace){
        happyImage=<img src={Smilee} alt=""/>
    }
    return (
        <div className='product-flex'>
            
            <div className='products-items'>
               {
                    cart.map(pd=> <ReviewsItems key={pd.key}  product={pd}  removeProduct={removeProduct}></ReviewsItems>)
               }
               {
                 happyImage
               }
            </div>
            <div className='calculate-part'>
             <Cart cart={cart}>
                 <button className="button" onClick={handleProceedHolder}>Proceed Checkout</button>
             </Cart>

            </div>
            
            
        </div>

            );
        };

export default Review;