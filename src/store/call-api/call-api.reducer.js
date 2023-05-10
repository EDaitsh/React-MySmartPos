import { CALL_API_ACTION_TYPE } from "./call-api.types";

const INITIAL_STATE = {
    response: null,
    isLoading: false,
    error: null
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
            return{
                ...state,
                response: null,
                isLoading: true
            }

        case CALL_API_ACTION_TYPE.INIT_SUCCESS:
        case CALL_API_ACTION_TYPE.SIGNIN_SUCCESS:
        case CALL_API_ACTION_TYPE.ADDCUSTOMER_SUCCESS:
        case CALL_API_ACTION_TYPE.ADDITEM_SUCCESS:
        case CALL_API_ACTION_TYPE.VOIDITEM_SUCCESS:
        case CALL_API_ACTION_TYPE.SUSPENDTRANSACTION_SUCCESS:
        case CALL_API_ACTION_TYPE.VOIDTRANSACTION_SUCCESS:
            return{
                ...state,
                response: payload,
                isLoading: false
            }
     

        case CALL_API_ACTION_TYPE.INIT_FAILED:
        case CALL_API_ACTION_TYPE.SIGNIN_FAILED:
        case CALL_API_ACTION_TYPE.ADDCUSTOMER_FAILED:
        case CALL_API_ACTION_TYPE.ADDITEM_FAILED:
        case CALL_API_ACTION_TYPE.VOIDITEM_FAILED:
        case CALL_API_ACTION_TYPE.SUSPENDTRANSACTION_FAILED:
        case CALL_API_ACTION_TYPE.VOIDTRANSACTION_FAILED:
            return{
                ...state,
                isLoading:false,
                error: payload
            }

        default:
            return state
    }
}