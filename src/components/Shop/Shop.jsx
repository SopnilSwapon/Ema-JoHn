import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';
import './Shop.css';
import Cart from '../Cart/Cart';
import { addToDb, getShoppingCart} from '../../utilities/fakedb';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([])

    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);

    const handleAddToCart = (product) => {
        // cart.push(product); 
        // const newCart = [...cart, product];
        let newCart  = [];
        const exist = products.find(pb=>pb.id ===product.id);
        if(!exist){
            product.quantity = 1;
            newCart = [...cart, product]
        }
        else{
            exist.quantity = exist.quantity + 1;
            const remaining = cart.filter(pb =>pb.id !==product.id);
            newCart = [...remaining, exist]
        }
        setCart(newCart);
        addToDb(product.id);
        
    //    console.log(product.id)
    }

    useEffect(()=>{
        const saveCart = [];
        const storeCart = getShoppingCart();
        for(const id in storeCart){
            const addedProduct = products.find(product=>product.id ===id)
            if(addedProduct){
                const quantity = storeCart[id];
                addedProduct.quantity = quantity;
                saveCart.push(addedProduct);
                
            }
        }
        setCart(saveCart)
    },[products]);
    

    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product
                        key={product.id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                    ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;