import React from 'react';
import './ReviewsItems.css'

const ReviewsItems = (props) => {
    const {name, quantity, key, price}=props.product
    return (
        <div className='product-name extra'>
            <h4> Name: -
                {
                    name
                }
            </h4>
            <p>Quantity : {quantity}</p>
            <p>$<small>{price}</small></p>
            <button className='button' onClick={()=>props.removeProduct(key)}>Remove</button>
        </div>
    );
};

export default ReviewsItems;