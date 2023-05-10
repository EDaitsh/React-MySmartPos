import { call, put, takeEvery } from 'redux-saga/effects';

import * as apiActions from "../../utils/fast-lane-bridge-webapi/fast-lane-bridge-webapi.utils";
import * as actions from "./call-api.action"


function* handleApiCall(action) {
  console.log(action);
  //const { type, payload } = action;
  const { type, payload, resolve, reject } = action;
  const actionName = type.split('_')[0]; // Get the action name from the action type
  console.log(actionName);
  console.log (`${actionName}Req`);

  try {
    const response = yield call(apiActions[`${actionName}Req`], payload);
    yield put(actions[`${actionName}Success`](response));
    resolve(response);
  } catch (error) {
    yield put(actions[`${actionName}Failed`](error));
    //reject(error);
  }
}

export default function* rootSaga() {
  yield takeEvery(
    action => action.type.includes("request"),
    handleApiCall
  );
}







