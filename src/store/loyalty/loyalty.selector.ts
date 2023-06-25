import { createSelector } from "reselect";
import { LoyaltyState } from "./loyalty.reducer";
import { RootState } from "../store";

const selectLoyaltyReducer = (state: RootState): LoyaltyState => state.loyalty;


export const selectLoyaltyNumer = createSelector(
    [selectLoyaltyReducer],
    (loyalty) => loyalty.loyaltyNumber
);
