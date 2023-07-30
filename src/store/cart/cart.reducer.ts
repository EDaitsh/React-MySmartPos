import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Item, Promotion, AddItem } from "./cart.types";

export type CartState = {
    cartItems: Item[];
}


export const INITIAL_STATE : CartState = {
    cartItems: [],
}

const addCartItem = (cartItems: Item[], addItem: AddItem): Item[] => {
    const productToAdd: Item = addItem["ItemSold"];
    productToAdd.quantity = Number(productToAdd.quantity);
    const promotion: Promotion = addItem["DiscountApplied"];
    console.log(productToAdd);
    const existsingCartItem = cartItems.find((cartItem) => cartItem.upc === productToAdd.upc);
    if(existsingCartItem){
        return cartItems.map((cartItem) => 
            cartItem.upc === productToAdd.upc 
            ? {...cartItem, quantity: (cartItem.quantity + productToAdd.quantity), promotion: promotion}
            : cartItem
        );
    }
    return [...cartItems, {...productToAdd, promotion: promotion}]
}


const removeCartItem = (cartItems: Item[], cartItemToRemove: Item) => {
    console.log(cartItemToRemove);
    const {upc, quantity=1} = cartItemToRemove;
    const existsingCartItem = cartItems.find((cartItem) => cartItem.upc === upc);
    if(existsingCartItem && (existsingCartItem.quantity == 1 || quantity > 1)){
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
        addItemToCart(state, action: PayloadAction<AddItem, string>){
            state.cartItems = addCartItem(state.cartItems, action.payload);
        },
        removeItemFromCart(state, action: PayloadAction<Item, string>){
            state.cartItems = removeCartItem(state.cartItems, action.payload);
        }
    }
});

export const  {initialCartState, addItemToCart, removeItemFromCart} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;





