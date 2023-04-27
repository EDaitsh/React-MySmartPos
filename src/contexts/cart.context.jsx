import { createContext, useState, useEffect } from "react";

export const CartContext = createContext({
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
    setCartTotal: () => {},
    initialCartState: ()=> {}
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
        setCartCount(0);
        setCartTotal(0);
      }

    console.log(cartTotal);

    const value = {
        cartItems,
        cartCount,
        cartTotal,
        setCartTotal,
        initialCartState
    }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>

}