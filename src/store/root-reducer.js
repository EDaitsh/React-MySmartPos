import { combineReducers } from "redux";

import { loyaltyReducer } from "./loyalty/loyalty.reducer";
import { cartReducer } from "./cart/cart.reducer";

export const rootReducer = combineReducers({
    loyalty: loyaltyReducer,
    cart: cartReducer
})