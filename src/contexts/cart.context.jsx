import { createContext, useReducer} from "react";
import { addItemReq,
         voidItemReq
       } from "../utils/fast-lane-bridge-webapi/fast-lane-bridge-webapi.utils";
import { createAction } from "../utils/reducer/reducer.utils";

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


export const CartContext = createContext({
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
    initialCartState: ()=> {},
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {}
});

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
}

const CartReducer = (state, action) => {
    const {type, payload} = action;
    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        default:
            throw new Error(`Unhandled type ${type} in CartReducer`);
    }
}

const INITIAL_STATE = {
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
}

export const CartProvider=({children}) => {
    const [state, dispatcher] = useReducer(CartReducer, INITIAL_STATE);

    const {cartItems, cartCount, cartTotal} = state;

    const updateCartItemsReducer= (newCartItems) => {
       
        const newCartCount = newCartItems.reduce((acumelator, currentValue) => acumelator + parseInt(currentValue.quantity), 0)
        const newCartTotal = newCartItems.reduce((total, item) => total +(item.quantity * item.price),0)
        dispatcher(createAction(CART_ACTION_TYPES.SET_CART_ITEMS,{
                cartItems: newCartItems,
                cartCount: newCartCount,
                cartTotal: newCartTotal
                }
        ));
    }


    const initialCartState =() => {
        const newCartItems = [];
        updateCartItemsReducer(newCartItems);
    }

     const addItemToCart= async(upc, quantity = 1) => {
        const res = await addItemReq(upc, quantity);
        const newCartItems = addCartItem(cartItems, res["ItemSold"]);
        updateCartItemsReducer(newCartItems);
    }

    const removeItemFromCart= async(cartItemToRemove) => {
        const {upc} = cartItemToRemove;
        const res = await voidItemReq(upc, 1);
        const newCartItems  = removeCartItem(cartItems, cartItemToRemove);
        updateCartItemsReducer(newCartItems);
    }

    const clearItemFromCart = async(cartItemToRemove) => {
        const {upc, quantity} = cartItemToRemove;
        const res = await voidItemReq(upc, quantity);
        const newCartItems = clearCartItem(cartItems, cartItemToRemove);
        updateCartItemsReducer(newCartItems);
    }



    const value = {
        cartItems,
        cartCount,
        cartTotal,
        initialCartState,
        addItemToCart,
        removeItemFromCart,
        clearItemFromCart
    }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>

}