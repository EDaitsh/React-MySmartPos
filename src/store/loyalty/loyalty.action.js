import { createAction } from "../../utils/reducer/reducer.utils";
import { LOYALTY_ACTION_TYPE } from "./loyalty.types";

export const setLoyaltyNumber = (loyaltyNumber) => 
    createAction(LOYALTY_ACTION_TYPE.SET_LOYALTY_NUMBER, loyaltyNumber);

export const initLoyaltyNumber = () => 
    createAction(LOYALTY_ACTION_TYPE.SET_LOYALTY_NUMBER, null);

