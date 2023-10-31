import React from 'react';
import './Cart.css'

const Cart = ({cart}) => {
    // const {cart} =props
    let total = 0;
    let shipping = 0;
    for (const product of cart){
        // console.log(product.price)
        total = total + product.price;
        shipping = shipping + product.shipping;
    }
    const tax = total * 7 / 100;
    const grandTotal = total + shipping + tax;
    return (
        <div className='cart'>
            <h4>Order Summary</h4>
                <p>Selected Items: {cart.length}</p>
                <p>Selected Item:</p>
                <p>Total Price: ${total}</p>
                <p>Total Shipping Charge: ${shipping}</p>
                <p>Tax: ${tax.toFixed(3)}</p>
                <h6>Grand Total: ${grandTotal.toFixed(3)}</h6>
                        </div>
    );
};

export default Cart;