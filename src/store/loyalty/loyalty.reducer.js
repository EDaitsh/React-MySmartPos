import { LOYALTY_ACTION_TYPE } from "./loyalty.types";


const INITIAL_STATE = {
    loyaltyNumber: ''
}

export const loyaltyReducer = (state = INITIAL_STATE, action) => {
    const {type, payload} = action;
    switch (type) {
        case LOYALTY_ACTION_TYPE.SET_LOYALTY_NUMBER:
            return {
                ...state,
                loyaltyNumber: payload
            }
        case LOYALTY_ACTION_TYPE.INIT_LOYALTY_NUMBER:
            return {
                ...state,
                loyaltyNumber: []
            }
        default:
            return state;
    }
}