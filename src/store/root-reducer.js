import { combineReducers } from "redux";

import { loyaltyReducer } from "./loyalty/loyalty.reducer";

export const rootReducer = combineReducers({
    loyalty: loyaltyReducer
})