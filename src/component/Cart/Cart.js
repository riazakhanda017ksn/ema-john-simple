import React from 'react';
import './Cart.css'
const Cart = (props) => {
    const cart=props.cart;
    console.log(cart);
    let total=0;
    for (let i = 0; i< cart.length; i++) {
        const product = cart[i];
            total=total + product.price
    }
    let shipping =0
    if(total > 35){
        shipping = 0
    }
    else if(total > 15){
        shipping=4.99
    }else if(total > 0){
        shipping = 12.99
    }
    const tax=(total/10).toFixed(2)
    const grandTotal=(total + shipping +Number(tax)).toFixed(2) ;

    const format=num=>{
        const precious=num.toFixed(2)
        return Number (precious)
    }
    return (
        <div>
            <div className='text-align'>
              <h5>Order Summary</h5>
              <p>Items ordered: {cart.length}</p>
            </div>
            <div className='text-left'>
            <p>Total:  {format(total) }</p>   
            <p>Shipping Cost : {shipping}</p>  
            <p>VAT + TAX:{tax}</p>
            <p>Total Price : {grandTotal}</p>
            </div>
        </div>
    );
};

export default Cart;