import {all, call} from 'redux-saga/effects'
import { APISagas } from './call-api/call-api.saga';


export function* rootSaga(){
    yield all([call(APISagas)]);
}