import { createContext, useReducer} from "react";
import { createAction } from "../utils/reducer/reducer.utils";

export const LoyaltyContext = createContext({
    loyaltyNumber: '',
    setLoyaltyNumber : () => {}
});

const LOYALTY_ACTION_TYPE = {
    SET_LOYALTY_NUMBER: 'SET_LOYALTY_NUMBER'
}

const INITIAL_STATE = {
    loyaltyNumber: ''
}

const LoyaltyReducer = (state, action) => {
    const {type, payload} = action;
    switch (type) {
        case LOYALTY_ACTION_TYPE.SET_LOYALTY_NUMBER:
            return {
                ...state,
                loyaltyNumber: payload
            }
        default:
            throw new Error(`Unhandled type ${type} in LoyaltyReducer`);
    }
}

export const LoyaltyProvider = ({children}) => {
    // const [loyaltyNumber, setLoyaltyNumber] = useState('');
    const [{loyaltyNumber}, dispatcher] = useReducer(LoyaltyReducer, INITIAL_STATE);
    const setLoyaltyNumber = (loyaltyNumber) => {
        dispatcher(createAction(LOYALTY_ACTION_TYPE.SET_LOYALTY_NUMBER, loyaltyNumber));
    }

    const value = {
        loyaltyNumber,
        setLoyaltyNumber
    }

    return <LoyaltyContext.Provider value={value}>{children}</LoyaltyContext.Provider>
}
