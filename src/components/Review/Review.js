import React, { useState } from 'react';
import { useEffect } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import { Link, useHistory } from 'react-router-dom';
import happyImage from '../../images/giphy.gif'
const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const history = useHistory();

    const handleProceedCheckout =()=>{
        history.push('/shipment');

    }

    const removeProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }


    useEffect(() =>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        
        const cartProducts =  productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        setCart(cartProducts);
    }, []);

    let thankYou;
    if (orderPlaced) {
        thankYou = <img src={happyImage} alt=""/>
    }
    return (
     <div className="twin-container">
            <div className="product-container">
            <h3>Cart Items: {cart.length}</h3>
        {
            cart.map(pd => <ReviewItem
                key= {pd.key}                
                removeProduct = {removeProduct}
                product={pd}></ReviewItem>)
        }  
        {thankYou}
             
        </div>
         <div className="cart-container">
            <Cart cart={cart}>
                <button onClick={handleProceedCheckout} className="button">Proceed Checkout</button>  
            </Cart>
        </div>
     </div>
    );
};

export default Review;