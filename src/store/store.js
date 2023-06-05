import {compose, legacy_createStore as createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './root-saga';

import { rootReducer } from './root-reducer';


const sageMidlleware = createSagaMiddleware();


const middleWares = [
    process.env.NODE_ENV!== 'production' && logger,
    sageMidlleware
].filter(Boolean);

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);

sageMidlleware.run(rootSaga);