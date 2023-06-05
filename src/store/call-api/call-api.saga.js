import { call, all, put, select, takeLatest } from 'redux-saga/effects';

import { selectCartItems } from '../cart/cart.selector';
import * as apiActions from "../../utils/fast-lane-bridge-webapi/fast-lane-bridge-webapi.utils";
import {callAPISuccess, callAPIFailed} from "./call-api.action"
import { CALL_API_ACTION_TYPE } from './call-api.types';

import { addItemToCart , removeItemFromCart } from '../cart/cart.action';


function* handleApiCall(action) {
  const { type, payload, resolve, reject } = action;
  const actionName = type.split('_')[0]; // Get the action name from the action type
  try {
    const response = yield call(apiActions[`${actionName}Req`], payload);

    yield put(callAPISuccess(response));
    resolve(response);
  } catch (error) {
    yield put(callAPIFailed(error));
    reject(error);
  }
}

function* handleAddItem(action){
  const { payload, resolve, reject } = action;
  try {
    const response = yield call(apiActions.addItemReq, payload);
    const cartItems = yield select(selectCartItems);

    yield put(addItemToCart(cartItems, response["ItemSold"]));
    yield put(callAPISuccess(response));
    resolve(response);
  } catch (error) {
    yield put(callAPIFailed(error));
    reject(error);
  }
}

function* handleVoidItem(action){
  const { payload, resolve, reject } = action;
  try {
    const response = yield call(apiActions.voidItemReq, payload);
    const cartItems = yield select(selectCartItems);
    yield put(removeItemFromCart(cartItems, payload));
    yield put(callAPISuccess(response));
    resolve(response);
  } catch (error) {
    yield put(callAPIFailed(error));
    reject(error);
  }
}

  export function* onCallAPIStart(){
    yield takeLatest(
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
    yield takeLatest(
      CALL_API_ACTION_TYPE.ADDITEM_REQUEST,
      handleAddItem
    );
}

export function* onVoidItemStart(){
  yield takeLatest(
    CALL_API_ACTION_TYPE.VOIDITEM_REQUEST,
    handleVoidItem
  )
}

export function* APISagas() {
  yield all([
              call(onCallAPIStart), 
              call(onAddItemStart), 
              call(onVoidItemStart)
          ])
}







