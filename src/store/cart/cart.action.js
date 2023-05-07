import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";

import { addItemReq, voidItemReq } from "../../utils/fast-lane-bridge-webapi/fast-lane-bridge-webapi.utils";

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


export const initialCartState =() => {
    const newCartItems = [];
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const addItemToCart= async(cartItems, upc, quantity = 1) => {
    const res = await addItemReq(upc, quantity);
    const newCartItems = addCartItem(cartItems, res["ItemSold"]);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const removeItemFromCart= async(cartItems, cartItemToRemove) => {
    const {upc} = cartItemToRemove;
    const res = await voidItemReq(upc, 1);
    const newCartItems  = removeCartItem(cartItems, cartItemToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const clearItemFromCart = async(cartItems, cartItemToRemove) => {
    const {upc, quantity} = cartItemToRemove;
    const res = await voidItemReq(upc, quantity);
    const newCartItems = clearCartItem(cartItems, cartItemToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}
