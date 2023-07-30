import {testSaga, expectSaga} from 'redux-saga-test-plan';
import { call } from 'typed-redux-saga/macro';

import {
    handleApiCall,
    handleAddItem,
    handleVoidItem,
    onCallAPIStart,
    onAddItemStart,
    onVoidItemStart,
    APISagas
 } from '../call-api.saga'

 import { initReq, addItemReq, voidItemReq } from '../../../utils/fast-lane-bridge-webapi/fast-lane-bridge-webapi.utils';
 import { callAPISuccess, callAPIFailed } from '../call-api.action';
 import { addItemToCart, removeItemFromCart } from '../../cart/cart.reducer';

 import { CALL_API_ACTION_TYPE } from '../call-api.types';
import { throwError } from 'redux-saga-test-plan/providers';

 describe('Call-api sagas', () => {
    test("APISagas", () => {
      testSaga(APISagas)
        .next()
        .all([
            call(onCallAPIStart), 
            call(onAddItemStart), 
            call(onVoidItemStart)
        ])
        .next()
        .isDone();
    });

    test('onCallAPIStart', () => {
        testSaga(onCallAPIStart)
        .next()
        .takeLatest(
            [
              CALL_API_ACTION_TYPE.ADDCUSTOMER_REQUEST,
              CALL_API_ACTION_TYPE.INIT_REQUEST, 
              CALL_API_ACTION_TYPE.SIGNIN_REQUEST,        
              CALL_API_ACTION_TYPE.SUSPENDTRANSACTION_REQUEST,
              CALL_API_ACTION_TYPE.VOIDTRANSACTION_REQUEST
            ],
            handleApiCall)
        .next()
        .isDone()
    })

    test('onAddItemStart', () => {
        testSaga(onAddItemStart)
        .next()
        .takeLatest(
            CALL_API_ACTION_TYPE.ADDITEM_REQUEST,
            handleAddItem
        )
        .next()
        .isDone()
    })

    test('onVoidItemStart', () => {
        testSaga(onVoidItemStart)
        .next()
        .takeLatest(
            CALL_API_ACTION_TYPE.VOIDITEM_REQUEST,
            handleVoidItem
        )
        .next()
        .isDone()
    })

    test('handleApiCall success', () => {

          
        const mockResponse = {
            'initRes': {
                'msg': 'success'
            }
        };

        const mockAction = {
            type:'init_req',
            payload: 'payload',
            resolve: jest.fn(),
            reject: jest.fn(),
        };
        const apiAction  = initReq;
        return expectSaga(handleApiCall, mockAction)
        .provide([
            [call(apiAction, mockAction.payload), mockResponse]
        ])
        .put(callAPISuccess(mockResponse))
        .run()
        .then((result) => {
            expect(mockAction.resolve).toHaveBeenCalledWith(mockResponse);
        })
    })

    test('handleApiCall Failure', () => {
        const mockError = new Error('An error accurred');
        const mockAction = {
            type:'init_req',
            payload: 'payload',
            resolve: jest.fn(),
            reject: jest.fn(),
        };
        return expectSaga(handleApiCall,mockAction)
        .provide([
            [call(initReq, mockAction.payload), throwError(mockError)]
        ])
        .put(callAPIFailed(mockError))
        .run()
        .then((result) => {
            expect(mockAction.reject).toHaveBeenCalledWith(mockError);
          });
    })


    test('handleAddItem success', () => {
        const action = {
            payload: 'itemPayload',
            resolve: jest.fn(),
            reject: jest.fn(),
          };

          const mockResponse = {
            'addItemRes': {
                'msg': 'success'
            }
        };
        
          return expectSaga(handleAddItem, action)
            .provide([
              [call(addItemReq, action.payload), mockResponse],
            ])
            .put(addItemToCart(mockResponse))
            .put(callAPISuccess(mockResponse))
            .run()
            .then((result) => {
              expect(action.resolve).toHaveBeenCalledWith(mockResponse);
            });
    })


    test('handleAddItem failure', () => {
        const action = {
            payload: 'itemPayload',
            resolve: jest.fn(),
            reject: jest.fn(),
          };
          const mockError = new Error('An error accurred');
       
        
          return expectSaga(handleAddItem, action)
            .provide([
              [call(addItemReq, action.payload), throwError(mockError)],
            ])
            .put(callAPIFailed(mockError))
            .run()
            .then((result) => {
              expect(action.reject).toHaveBeenCalledWith(mockError);
            });
    })


    test('handleVoidItem success', () => {
        const action = {
            payload: 'itemPayload',
            resolve: jest.fn(),
            reject: jest.fn(),
          };
        
        const mockResponse = {
            'addItemRes': {
                'msg': 'success'
            }
        };

        return expectSaga(handleVoidItem, action)
            .provide([
                [call(voidItemReq, action.payload), mockResponse]
            ])
            .put(removeItemFromCart(action.payload))
            .put(callAPISuccess(mockResponse))
            .run()
            .then((result) => {
              expect(action.resolve).toHaveBeenCalledWith(mockResponse);
            });
        })


        
    test('handleVoidItem failure', () => {
        const action = {
            payload: 'itemPayload',
            resolve: jest.fn(),
            reject: jest.fn(),
          };
        
        const mockError = new Error('An error accurred');

        return expectSaga(handleVoidItem, action)
            .provide([
                [call(voidItemReq, action.payload), throwError(mockError)]
            ])
            .put(callAPIFailed(mockError))
            .run()
            .then((result) => {
              expect(action.reject).toHaveBeenCalledWith(mockError);
            });
        })
})