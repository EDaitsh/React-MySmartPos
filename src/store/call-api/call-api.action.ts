import { createAction } from "../../utils/reducer/reducer.utils";
import { CALL_API_ACTION_TYPE } from "./call-api.types";
import { ActionWithPayload, withMatcher } from "../../utils/reducer/reducer.utils";
import { Item } from "../cart/cart.types";
import { ResponseMap } from "../../utils/fast-lane-bridge-webapi/fast-lane-bridge-webapi.utils";

export type InitRequest = ActionWithPayload<
    CALL_API_ACTION_TYPE.INIT_REQUEST,
    string
>;

export type SignInRequest = ActionWithPayload<
    CALL_API_ACTION_TYPE.SIGNIN_REQUEST,
    string
>;

export type AddCustomerRequest = ActionWithPayload<
    CALL_API_ACTION_TYPE.ADDCUSTOMER_REQUEST,
    string
>;

export type AddItemRequest = ActionWithPayload<
    CALL_API_ACTION_TYPE.ADDITEM_REQUEST,
    Item
>;

export type VoidItemRequest = ActionWithPayload<
    CALL_API_ACTION_TYPE.VOIDITEM_REQUEST,
    Item

>;

export type SuspendTransactionRequest = ActionWithPayload<
    CALL_API_ACTION_TYPE.SUSPENDTRANSACTION_REQUEST,
    string
>;

export type VoidTransactionRequest = ActionWithPayload<
    CALL_API_ACTION_TYPE.VOIDTRANSACTION_REQUEST,
    string
>;

export type CallAPISuccess = ActionWithPayload<
    CALL_API_ACTION_TYPE.CALL_API_SUCCESS,
    string
>;

export type CallAPIFailed = ActionWithPayload<
    CALL_API_ACTION_TYPE.CALL_API_FAILED,
    Error
>;




export const initRequest = withMatcher( (request: string) : InitRequest => 
    createAction(CALL_API_ACTION_TYPE.INIT_REQUEST, request)
);

export const signInRequest =withMatcher((request: string):SignInRequest =>
    createAction(CALL_API_ACTION_TYPE.SIGNIN_REQUEST, request)
);

export const addCustomerRequest =withMatcher((request:string): AddCustomerRequest => 
    createAction(CALL_API_ACTION_TYPE.ADDCUSTOMER_REQUEST, request)
);

export const addItemRequest = withMatcher((request:Item): AddItemRequest => 
    createAction(CALL_API_ACTION_TYPE.ADDITEM_REQUEST, request)
);

export const voidItemRequest = withMatcher((request:Item): VoidItemRequest => 
    createAction(CALL_API_ACTION_TYPE.VOIDITEM_REQUEST, request)
);

export const suspendTransactionRequest =withMatcher((request: string): SuspendTransactionRequest => 
    createAction(CALL_API_ACTION_TYPE.SUSPENDTRANSACTION_REQUEST, request)
);

export const voidTransactionRequest = withMatcher((request: string): VoidTransactionRequest => 
    createAction(CALL_API_ACTION_TYPE.VOIDTRANSACTION_REQUEST, request)
);

export const callAPISuccess = withMatcher((response: ResponseMap | null) => 
    createAction(CALL_API_ACTION_TYPE.CALL_API_SUCCESS, response)
);

export const callAPIFailed = withMatcher((error: Error) => 
    createAction(CALL_API_ACTION_TYPE.CALL_API_FAILED, error)
);

