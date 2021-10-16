import React from 'react';

const Cart = (props) => {
    const {cart} = props

    let totalPrice = 0
    for (let product of cart)
    {
        totalPrice += product.price
    }

    return (
        <div>
            <h1>Order Summary</h1>
            <h3>Items Ordered: {props.cart.length}</h3>
            <h3>Total: {totalPrice.toFixed(2)}</h3>
        </div>
    );
};

export default Cart;