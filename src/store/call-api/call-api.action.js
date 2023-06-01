import { createAction } from "../../utils/reducer/reducer.utils";
import { CALL_API_ACTION_TYPE } from "./call-api.types";

export const initRequest =(request) => createAction(CALL_API_ACTION_TYPE.INIT_REQUEST, request);
export const signInRequest =(request) => createAction(CALL_API_ACTION_TYPE.SIGNIN_REQUEST, request);
export const addCustomerRequest =(request) => createAction(CALL_API_ACTION_TYPE.ADDCUSTOMER_REQUEST, request);
export const addItemRequest =(request) => createAction(CALL_API_ACTION_TYPE.ADDITEM_REQUEST, request);
export const voidItemRequest =(request) => createAction(CALL_API_ACTION_TYPE.VOIDITEM_REQUEST, request);
export const suspendTransactionRequest =(request) => createAction(CALL_API_ACTION_TYPE.SUSPENDTRANSACTION_REQUEST, request);
export const voidTransactionRequest =(request) => createAction(CALL_API_ACTION_TYPE.VOIDTRANSACTION_REQUEST, request);

export const callAPISuccess = (response) => createAction(CALL_API_ACTION_TYPE.CALL_API_SUCCESS, response);
export const callAPIFailed = (error) => createAction(CALL_API_ACTION_TYPE.CALL_API_FAILED, error);
