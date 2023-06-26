import { createSelector } from "reselect";
import { CartState } from "./cart.reducer";
import { RootState } from "../store";

const selectCartReducer = (state: RootState): CartState => state.cart;


export const selectCartItems = createSelector(
    [selectCartReducer],
    (cart) => cart.cartItems
);

export const selectCartCount = createSelector(
    [selectCartReducer],
    (cart) => cart.cartItems.reduce((acumelator, currentValue) => acumelator + (currentValue.quantity),0)
);

export const selectCartTotal = createSelector(
    [selectCartReducer],
    (cart) => cart.cartItems.reduce((total, item) => 
    total +((item.quantity * item.price) - (item.promotion? item.promotion.amount :0)),0)
);

