import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Product from '../Product/Product';
import './Shop.css'
import { Link } from 'react-router-dom';
import Cart from '../Cart/Cart';

const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10)
    const [cart, setCart] = useState([])
    useEffect(() => {
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart);
        const previous = productKeys.map(existingKey => {
            const product = fakeData.find(pd => pd.key === existingKey)
            product.quantity = saveCart[existingKey]
            return product
        })
        setCart(previous);
    }, [])
    function handleClick(product) {
        const productToBeAdded = product.key
        const sameCount = cart.find(pd => pd.key === productToBeAdded)
        let count = 1;
        let newCount;
        if (sameCount) {

            count = sameCount.quantity + 1;
            sameCount.quantity = count;
            const others = cart.filter(pd => pd.key !== productToBeAdded)
            newCount = [...others, sameCount]
        } else {
            product.quantity = 1;
            newCount = [...cart, product]
        }

        setCart(newCount)

        addToDatabaseCart(product.key, count)

    }
    return (
        <div className='product-flex'>
            <div className='products-items'>
                {
                    products.map(pd => <Product
                        key={pd.key}
                        showAddButton={true}
                        handleClick={handleClick}
                        product={pd}>

                    </Product>)
                }

            </div>
            <div className='calculate-part'>
                <div className='text-center'>
                    <Cart cart={cart}>
                        <Link>
                            <button className='button' >Review Order</button>
                        </Link>
                    </Cart>

                </div>
            </div>

        </div>
    );
};

export default Shop;