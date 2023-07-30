import { screen, fireEvent } from '@testing-library/react';

import { renderWithProvider } from '../../../utils/tests/test.utils';
import EndTransaction from '../end-transaction.componenet';

import  * as utils  from '../../../utils/fast-lane-bridge-webapi/fast-lane-bridge-webapi.utils';


describe('End transaction tests', () => {

    test('It should clear the state when end transaction button clicked', async() => {
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

        const { store } = renderWithProvider(<EndTransaction />, {
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
          },
        });

        const mockCallApi = jest.fn();

        jest.spyOn(utils, 'callApi').mockImplementation(mockCallApi).mockResolvedValue(mockResponse);;

        const endTransactionButtonElement = screen.getByText(/סיום/i);
        await fireEvent.click(endTransactionButtonElement);
    
        expect(store.getState()).toEqual(mockState);
    })
})