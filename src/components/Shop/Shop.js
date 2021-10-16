import React, {useEffect, useState} from 'react';
import './Shop.css'
import Product from "../Product/Product";
import Cart from "../Cart/Cart";
import {addToDb, getStoredCart} from '../../utilities/fakedb.js'


const Shop = () => {
    const [products, setProducts] = useState([])    // original data state

    useEffect(() => {   // original data fetching
        // console.log('product API called')
        fetch('./products.JSON')
            .then(res => res.json())
            .then(data => {
                setProducts(data)
                setDisplayProducts(data)    // for initially showing products before searching
                // console.log('product received')
            })
    }, [])

    useEffect(() => {   // loading objects from local storage
        // console.log('Local Storage called')
        const savedCart = getStoredCart()
        const storedCart = []

        for (let key in savedCart)
        {
            const addedProduct = products.find(product => product.key === key)
            if(addedProduct)
            {
                for (let i=1; i <= parseInt(savedCart[key]); i++)
                {
                    storedCart.push(addedProduct)
                }
            }
        }
        console.log(storedCart)
        setCart(storedCart)
        // console.log("local storage calling done")
    }, [products])  // products as dependency

    const [cart, setCart] = useState([])

    const handleAddToCart = (product) => {      // event handler
        const newCart = [...cart, product]
        setCart(newCart)
        addToDb(product.key)    // adding to local storage
    }

    const [displayProducts, setDisplayProducts] = useState([])  // searching purpose state

    function handleSearch(event)
    {
        const matchedProducts = products.filter(product => product.name.toLowerCase().includes(event.target.value.toLowerCase()))
        setDisplayProducts(matchedProducts)
    }

    return (
        <fragment>
            <div className='search-container'>
                <input placeholder='search product' type='text' onChange={handleSearch}/>
            </div>
            <div className='shop-container'>
                <div className="product-container">
                    {
                        displayProducts.map(product =>
                            <Product key={product.key} product={product} handleAddToCart={handleAddToCart}/>
                        )
                    }
                </div>
                <div className="cart-container">
                    <Cart cart={cart}/>
                </div>
            </div>
        </fragment>

    );
};

export default Shop;