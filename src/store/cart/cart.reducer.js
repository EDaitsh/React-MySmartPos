import { createSlice } from "@reduxjs/toolkit";


const INITIAL_STATE = {
    cartItems: [],
}

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

export const cartSlice = createSlice({
    name: 'cart',
    initialState: INITIAL_STATE,
    reducers: {
        initialCartState(state){
            state.cartItems = INITIAL_STATE.cartItems
        },
        addItemToCart(state, action){
            state.cartItems = addCartItem(state.cartItems, action.payload);
        },
        removeItemFromCart(state, action){
            state.cartItems = removeCartItem(state.cartItems, action.payload);
        }
    }
});

export const  {initialCartState, addItemToCart, removeItemFromCart} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;





