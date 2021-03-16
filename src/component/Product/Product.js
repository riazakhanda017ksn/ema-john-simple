import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faShoppingCart} from '@fortawesome/free-solid-svg-icons'
import './Product.css'
import { Link } from 'react-router-dom';
const Product = (props) => {
    // console.log(props);
    const { img, name, seller, price,stock,key}=props.product
    return (
        <div className="shop-containers">
          <div className='product-img'>
              <img src={img} alt=""/>
          </div>
          <div className='product-name'> 
          <h4 >   
               <Link to={'/product/'+ key}>{name}</Link>
               </h4>
               
               <p> <small> by: {seller}</small></p>
               <br/>
               <p> <small> $ {price}</small></p>
               <p> <small>only {stock} left in stock - order soon</small></p>
              {props.showAddButton ===true && 
              <button className='button' onClick={()=>props.handleClick(props.product)}><FontAwesomeIcon icon={faShoppingCart} />
               add to card</button>}
          </div>
        </div>
    );
};

export default Product;