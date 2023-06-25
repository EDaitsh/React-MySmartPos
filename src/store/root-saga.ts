import {all, call} from 'typed-redux-saga/macro'
import { APISagas } from './call-api/call-api.saga';


export function* rootSaga(){
    yield all([call(APISagas)]);
}