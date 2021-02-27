import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faShoppingCart} from '@fortawesome/free-solid-svg-icons'
import './Product.css'
const Product = (props) => {
    const { img, name, seller, price,stock}=props.product
    return (
        <div className="shop-containers">
          <div className='product-img'>
              <img src={props.product.img} alt=""/>
          </div>
          <div className='product-name'>
          <h4>
                   <a href="">
                       {
                        props.product.name
                       }
                   </a>
               </h4>
               
               <p> <small> by: {seller}</small></p>
               <br/>
               <p> <small> $ {price}</small></p>
               <p> <small>only {stock} left in stock - order soon</small></p>
               <button className='button' onClick={()=>props.handleClick(props.product)}><FontAwesomeIcon icon={faShoppingCart} /> add to card</button>
          </div>
        </div>
    );
};

export default Product;