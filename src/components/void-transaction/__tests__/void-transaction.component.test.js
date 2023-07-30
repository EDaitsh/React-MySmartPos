import { screen, fireEvent } from '@testing-library/react';

import { renderWithProvider } from '../../../utils/tests/test.utils';
import VoidTransaction from '../void-transaction.component';

import  * as utils  from '../../../utils/fast-lane-bridge-webapi/fast-lane-bridge-webapi.utils';


describe('Void transaction tests', () => {

    test('It should clear the state when void transaction button clicked', async() => {
        const mockResponse = {};

        const mockState = {
          cart: {
            cartItems: [],
          },
          loyalty: {
            loyaltyNumber: "",
          },
          callapi: {
            actionStates: {
              addCustomer: false,
              addItem: false,
              init: false,
              signIn: false,
              suspendTransaction: false,
              voidItem: false,
              voidTransaction: false,
            },
            error: null,
            isLoading: false,
            response: null,
          },
        };

        const { store } = renderWithProvider(<VoidTransaction />, {
          preloadedState: {
            cart: {
              cartItems: [
                {
                  upc: 301,
                  description: "פיתה",
                  quantity: 1,
                  price: 10,
                },
              ],
            },
            loyalty: {
                loyaltyNumber:'123456'
            }
          },
        });

        const mockCallApi = jest.fn();

        jest.spyOn(utils, 'callApi').mockImplementation(mockCallApi).mockResolvedValue(mockResponse);;

        const voidTransactionButtonElement = screen.getByText(/Void/i);
        await fireEvent.click(voidTransactionButtonElement);
    
        expect(store.getState()).toEqual(mockState);
    })
})