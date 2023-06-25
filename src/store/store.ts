//import {compose, legacy_createStore as createStore, applyMiddleware} from 'redux';
import { configureStore, Middleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './root-saga';

import { rootReducer } from './root-reducer';

export type RootState = ReturnType<typeof rootReducer>


const sageMidlleware = createSagaMiddleware();


const middleWares = [
    process.env.NODE_ENV!== 'production' && logger,
    sageMidlleware
].filter((middleware): middleware is Middleware => Boolean(middleware));;

//const composedEnhancers = compose(applyMiddleware(...middleWares));

//export const store = createStore(rootReducer, undefined, composedEnhancers);

export const store = configureStore({
    reducer: rootReducer, 
    // middleware: (getDefaultMiddleware) => 
    //   getDefaultMiddleware().concat(middleWares),
    middleware: middleWares
  })
  

sageMidlleware.run(rootSaga);