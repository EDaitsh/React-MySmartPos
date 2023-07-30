import { call, all, put, takeLatest } from "typed-redux-saga/macro";
import { AddItem } from "../cart/cart.types";
import { ActionWithPayload } from "../../utils/reducer/reducer.utils";

import { apiActions } from "../../utils/fast-lane-bridge-webapi/fast-lane-bridge-webapi.utils";
import {callAPISuccess, callAPIFailed, AddItemRequest, VoidItemRequest} from "./call-api.action"
import { CALL_API_ACTION_TYPE } from './call-api.types';

import { addItemToCart, removeItemFromCart } from '../cart/cart.reducer';


export function* handleApiCall(action: ActionWithPayload<string, string>) {
  const { type, payload, resolve, reject } = action;
  console.log(type);
  const actionName = type.split('_')[0]; // Get the action name from the action type
  const apiAction  = apiActions[`${actionName}Req`] ;
  try {
    const response = yield* call(apiAction, payload);

    yield* put(callAPISuccess(response));
    resolve(response);
  } catch (error) {
    yield* put(callAPIFailed(error as Error));
    reject(error as Error);
  }
}

export function* handleAddItem(action: AddItemRequest){
  const { payload, resolve, reject } = action;
  try {
    const response = yield* call(apiActions.addItemReq, payload);
    

    yield* put(addItemToCart(response as unknown as AddItem));
    yield* put(callAPISuccess(response));
    resolve(response);
  } catch (error) {
    yield* put(callAPIFailed(error as Error));
    reject(error as Error);
  }
}

export function* handleVoidItem(action: VoidItemRequest){
  const { payload, resolve, reject } = action;
  try {
    const response = yield* call(apiActions.voidItemReq, payload);
    yield* put(removeItemFromCart(payload));
    yield* put(callAPISuccess(response));
    resolve(response);
  } catch (error) {
    yield* put(callAPIFailed(error as Error));
    reject(error as Error);
  }
}

  export function* onCallAPIStart(){
    yield* takeLatest(
      [
        CALL_API_ACTION_TYPE.ADDCUSTOMER_REQUEST,
        CALL_API_ACTION_TYPE.INIT_REQUEST, 
        CALL_API_ACTION_TYPE.SIGNIN_REQUEST,        
        CALL_API_ACTION_TYPE.SUSPENDTRANSACTION_REQUEST,
        CALL_API_ACTION_TYPE.VOIDTRANSACTION_REQUEST
      ],
      handleApiCall)
}

export function* onAddItemStart(){
    yield* takeLatest(
      CALL_API_ACTION_TYPE.ADDITEM_REQUEST,
      handleAddItem
    );
}

export function* onVoidItemStart(){
  yield* takeLatest(
    CALL_API_ACTION_TYPE.VOIDITEM_REQUEST,
    handleVoidItem
  )
}

export function* APISagas() {
  yield* all([
              call(onCallAPIStart), 
              call(onAddItemStart), 
              call(onVoidItemStart)
          ])
}







