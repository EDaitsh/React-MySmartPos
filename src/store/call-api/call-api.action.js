import { createAction } from "../../utils/reducer/reducer.utils";
import { CALL_API_ACTION_TYPE } from "./call-api.types";

export const initRequest =(request) => createAction(CALL_API_ACTION_TYPE.INIT_REQUEST, request);
export const initSuccess = (response) => createAction(CALL_API_ACTION_TYPE.INIT_SUCCESS, response);
export const initFailed = (error) => createAction(CALL_API_ACTION_TYPE.INIT_FAILED, error);

export const signInRequest =(request) => createAction(CALL_API_ACTION_TYPE.SIGNIN_REQUEST, request);
export const signInSuccess = (response) => createAction(CALL_API_ACTION_TYPE.SIGNIN_SUCCESS, response);
export const signInFailed = (error) => createAction(CALL_API_ACTION_TYPE.SIGNIN_FAILED, error);

export const addCustomerRequest =(request) => createAction(CALL_API_ACTION_TYPE.ADDCUSTOMER_REQUEST, request);
export const addCustomerSuccess = (response) => createAction(CALL_API_ACTION_TYPE.ADDCUSTOMER_SUCCESS, response);
export const addCustomerFailed = (error) => createAction(CALL_API_ACTION_TYPE.ADDCUSTOMER_FAILED, error);

export const addItemRequest =(request) => createAction(CALL_API_ACTION_TYPE.ADDITEM_REQUEST, request);
export const addItemSuccess = (response) => createAction(CALL_API_ACTION_TYPE.ADDITEM_SUCCESS, response);
export const addItemFailed = (error) => createAction(CALL_API_ACTION_TYPE.ADDITEM_FAILED, error);

export const voidItemRequest =(request) => createAction(CALL_API_ACTION_TYPE.VOIDITEM_REQUEST, request);
export const voidItemSuccess = (response) => createAction(CALL_API_ACTION_TYPE.VOIDITEM_SUCCESS, response);
export const voidItemFailed = (error) => createAction(CALL_API_ACTION_TYPE.VOIDITEM_FAILED, error);

export const suspendTransacrionRequest =(request) => createAction(CALL_API_ACTION_TYPE.SUSPENDTRANSACTION_REQUEST, request);
export const suspendTransacrionSuccess = (response) => createAction(CALL_API_ACTION_TYPE.SUSPENDTRANSACTION_SUCCESS, response);
export const suspendTransacrionFailed = (error) => createAction(CALL_API_ACTION_TYPE.SUSPENDTRANSACTION_FAILED, error);

export const voidTransactionRequest =(request) => createAction(CALL_API_ACTION_TYPE.VOIDTRANSACTION_REQUEST, request);
export const voidTransactionSuccess = (response) => createAction(CALL_API_ACTION_TYPE.VOIDTRANSACTION_SUCCESS, response);
export const voidTransactionFailed = (error) => createAction(CALL_API_ACTION_TYPE.VOIDTRANSACTION_FAILED, error);

export const CALL_API_REQUEST_ACTIONS = {
    initRequest: initRequest,
    signInRequest: signInRequest,
    // addCustomerRequest: addCustomerRequest',
    // addItemRequest: 'addItemRequest',
    // voidItemRequest: 'voidItemRequest',
    // suspendTransacrionRequest: 'suspendTransacrionRequest',
    // voidTransactionRequest: 'voidTransactionRequest'
};