import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    loyaltyNumber: ''
}

export const loyaltySlice = createSlice({
    name: 'loyalty',
    initialState: INITIAL_STATE,
    reducers: {
        setLoyaltyNumber(state, action){
            state.loyaltyNumber= action.payload
        },
        initLoyaltyNumber(state){
            state.loyaltyNumber = INITIAL_STATE.loyaltyNumber
        }
    }
})

export const {setLoyaltyNumber, initLoyaltyNumber} = loyaltySlice.actions;

export const loyaltyReducer = loyaltySlice.reducer;
