import { CALL_API_ACTION_TYPE } from "./call-api.types";

const INITIAL_STATE = {
    response: null,
    isLoading: false,
    error: null,
    actionStates: {
        init: false,
        signIn: false,
        addCustomer: false,
        addItem: false,
        voidItem: false,
        suspendTransaction: false,
        voidTransaction: false,
      },
};



export const callApiReducer = (state = INITIAL_STATE, action) => {
    const {type, payload} = action;
    switch (type) {
        case CALL_API_ACTION_TYPE.INIT_REQUEST:
        case CALL_API_ACTION_TYPE.SIGNIN_REQUEST:
        case CALL_API_ACTION_TYPE.ADDCUSTOMER_REQUEST:
        case CALL_API_ACTION_TYPE.ADDITEM_REQUEST:
        case CALL_API_ACTION_TYPE.VOIDITEM_REQUEST:
        case CALL_API_ACTION_TYPE.SUSPENDTRANSACTION_REQUEST:
        case CALL_API_ACTION_TYPE.VOIDTRANSACTION_REQUEST:
            const actionId =  `${type.split('_')[0]}` ; 
            return{
                ...state,
                response: null,
                isLoading: true,

                actionStates: {
                    ...state.actionStates,
                    [actionId]: true
                  },
            }

        case CALL_API_ACTION_TYPE.CALL_API_SUCCESS:
            return{
                ...state,
                response: payload,
                isLoading: false,
                actionStates: INITIAL_STATE.actionStates
            }

        case CALL_API_ACTION_TYPE.CALL_API_FAILED:
            return{
                ...state,
                isLoading:false,
                error: payload,
                actionStates: INITIAL_STATE.actionStates
            }

        default:
            return state
    }
}