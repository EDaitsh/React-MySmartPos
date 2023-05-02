import { createContext, useState, useEffect } from "react";
import { addItemReq } from "../utils/fast-lane-bridge-webapi/fast-lane-bridge-webapi.utils";


const addCartItem = (cartItems, productToAdd) => {
    console.log(productToAdd);
    const existsingCartItem = cartItems.find((cartItem) => cartItem.upc === productToAdd.upc);
    if(existsingCartItem){
        return cartItems.map((cartItem) => 
            cartItem.upc === productToAdd.upc 
            ? {...cartItem, quantity: parseInt(cartItem.quantity) + parseInt(productToAdd.quantity)}
            : cartItem
        );
    }
    return [...cartItems, {...productToAdd, quantity: productToAdd.quantity}]
}


const removeCartItem = (cartItems, cartItemToRemove) => {
    const existsingCartItem = cartItems.find((cartItem) => cartItem.upc === cartItemToRemove.upc);
    if(existsingCartItem.quantity >1){
        return cartItems.map((cartItem) => 
            cartItem.upc === cartItemToRemove.upc 
            ? {...cartItem, quantity: cartItem.quantity - 1}
            : cartItem
        )
    } else{
        return cartItems.filter((cartItem) => cartItem.upc !== cartItemToRemove.upc);
    }
}

const clearCartItem = (cartItems, cartItemToRemove) => cartItems.filter((cartItem) => cartItem.upc !== cartItemToRemove.upc);


export const CartContext = createContext({
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
    setCartTotal: () => {},
    initialCartState: ()=> {},
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {}
});

export const CartProvider=({children}) => {
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);


    useEffect (()=> 
    {
        setCartCount(cartItems.reduce((count, item) => count + item.quantity, 0));
        setCartTotal(cartItems.reduce((total, item) => total +(item.quantity * item.price),0));
    }, [cartItems]);

    const initialCartState =() => {
        setCartItems([]);
      }

     const addItemToCart= async(productToAdd) => {
        const {upc, quantity} = productToAdd;
        const res = await addItemReq(upc, quantity);
        setCartItems(addCartItem(cartItems, res["ItemSold"]));
    }

    const removeItemFromCart= (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove));
    }

    const clearItemFromCart = (cartItemToRemove) => {
        setCartItems(clearCartItem(cartItems, cartItemToRemove));
    }


    const value = {
        cartItems,
        cartCount,
        cartTotal,
        setCartTotal,
        initialCartState,
        addItemToCart,
        removeItemFromCart,
        clearItemFromCart
    }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>

}