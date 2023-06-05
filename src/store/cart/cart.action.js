import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";

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
    return [...cartItems, {...productToAdd}]
}


const removeCartItem = (cartItems, cartItemToRemove) => {
    console.log(cartItemToRemove);
    const {upc, quantity=1} = cartItemToRemove;
    const existsingCartItem = cartItems.find((cartItem) => cartItem.upc === upc);
    console.log(existsingCartItem.quantity);
    if(existsingCartItem.quantity == 1 || quantity > 1){
        return cartItems.filter((cartItem) => cartItem.upc !== cartItemToRemove.upc);
    }
    else{
        return cartItems.map((cartItem) => 
            cartItem.upc === cartItemToRemove.upc 
            ? {...cartItem, quantity: cartItem.quantity - 1}
            : cartItem
        )
    } 
}

export const initialCartState =() => {
    const newCartItems = [];
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const addItemToCart= (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const removeItemFromCart= (cartItems, cartItemToRemove) => {
    const newCartItems  = removeCartItem(cartItems, cartItemToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

