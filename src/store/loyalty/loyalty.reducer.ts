import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type LoyaltyState = {
    readonly loyaltyNumber: string;
}

export const INITIAL_STATE : LoyaltyState = {
    loyaltyNumber: ''
}

export const loyaltySlice = createSlice({
    name: 'loyalty',
    initialState: INITIAL_STATE,
    reducers: {
        setLoyaltyNumber(state, action: PayloadAction< string, string>){
            state.loyaltyNumber= action.payload
        },
        initLoyaltyNumber(state){
            state.loyaltyNumber = INITIAL_STATE.loyaltyNumber
        }
    }
})

export const {setLoyaltyNumber, initLoyaltyNumber} = loyaltySlice.actions;

export const loyaltyReducer = loyaltySlice.reducer;


