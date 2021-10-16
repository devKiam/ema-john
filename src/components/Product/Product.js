import React from 'react';
import './Product.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import Rating from "react-rating";

const Product = (props) => {    // props --> gives an object
    const {name, img, seller, price, stock, star} = props.product

    return (
        <div className='product'>
            <div className='thumbnail'>
                <img src={img} alt=''/>
            </div>
            <div>
                <h4>{name}</h4>
                <p><small>by: {seller}</small></p>
                <p>Price: {price}</p>
                <p>Only {stock} left</p>
                <Rating readonly={true} initialRating={star} emptySymbol="far fa-star rating-icon-color" fullSymbol="fas fa-star rating-icon-color"/>
                <br/>
                <br/>
                <button onClick={() => props.handleAddToCart(props.product)} className='add-to-cart-button'>{<FontAwesomeIcon icon={faShoppingCart} />} add to cart</button>
            </div>
        </div>
    );
};

export default Product;