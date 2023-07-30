import { screen, fireEvent } from "@testing-library/react";

import { renderWithProvider } from "../../../utils/tests/test.utils";
import AddCustomer from "../add-customer.component";

import  * as utils  from "../../../utils/fast-lane-bridge-webapi/fast-lane-bridge-webapi.utils";

import { CALL_API_ACTION_TYPE } from "../../../store/call-api/call-api.types";

describe('Add customer tests', () => {

    test('It should add to state when add customer button clicked', async() => {
        const mockData = "1000061";

        const {store} = renderWithProvider(<AddCustomer/>,{
            preloadedState:{
                loyalty:{
                    loyaltyNumber: ''
                }
            }
        });

        const mockResponse = {
            LoyaltyCard: {
              status: true,
            },
          };

          const mockCallApi = jest.fn();

        const addCustomerInputElement = screen.getByPlaceholderText(/Customer Number/i);
        await fireEvent.input(addCustomerInputElement, { target: { value: mockData } });

        jest.spyOn(utils, 'callApi').mockImplementation(mockCallApi).mockResolvedValue(mockResponse);

        const addCustomerButtonElement = screen.getByText(/Add Customer/i);
        await fireEvent.click(addCustomerButtonElement);
    
        expect(store.getState().loyalty.loyaltyNumber).toBe(mockData);
    })
})