import { combineReducers } from "redux";

import { loyaltyReducer } from "./loyalty/loyalty.reducer";
import { cartReducer } from "./cart/cart.reducer";
import { callApiReducer } from "./call-api/call-api.reducer";

export const rootReducer = combineReducers({
    loyalty: loyaltyReducer,
    cart: cartReducer,
    callapi: callApiReducer
})