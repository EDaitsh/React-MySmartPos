import { AnyAction } from "redux";
import { addCustomerRequest, addItemRequest, callAPIFailed, callAPISuccess, initRequest, signInRequest, suspendTransactionRequest, voidItemRequest, voidTransactionRequest } from "./call-api.action";

export type CallAPIState = {
    readonly response: Response | null,
    readonly isLoading: boolean,
    readonly error: Error | null,
    readonly actionStates:ActionState
}

export type ActionState = {
    readonly init: boolean,
    readonly signIn: boolean,
    readonly addCustomer: boolean,
    readonly addItem: boolean,
    readonly voidItem: boolean,
    readonly suspendTransaction: boolean,
    readonly voidTransaction: boolean,
}

const INITIAL_STATE: CallAPIState= {
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



export const callApiReducer = (
    state = INITIAL_STATE, 
    action: AnyAction
): CallAPIState => {
    //const {type, payload} = action;
    if(initRequest.match(action) 
       ||signInRequest.match(action) 
       ||addCustomerRequest.match(action) 
       ||addItemRequest.match(action) 
       ||voidItemRequest.match(action) 
       ||suspendTransactionRequest.match(action) 
       ||voidTransactionRequest.match(action)
    ){
        const actionId =  `${action.type.split('_')[0]}` ; 
        return{
            ...state,
            response: null,
            isLoading: true,

            actionStates: {
                ...state.actionStates,
                [actionId]: true
                },
        }
    }

    if(callAPISuccess.match(action)){
        return{
            ...state,
            response: action.payload,
            isLoading: false,
            actionStates: INITIAL_STATE.actionStates
        }
    }

    if(callAPIFailed.match(action)){
        return{
            ...state,
            isLoading:false,
            error: action.payload,
            actionStates: INITIAL_STATE.actionStates
        }
    }
    return state;
}