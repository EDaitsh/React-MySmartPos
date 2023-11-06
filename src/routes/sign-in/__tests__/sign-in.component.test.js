import { screen, fireEvent, render } from "@testing-library/react";
import { renderWithProvider } from "../../../utils/tests/test.utils";
import { createMemoryHistory } from "history";
import { act } from 'react-dom/test-utils';
import { waitFor } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';

import  * as utils  from "../../../utils/fast-lane-bridge-webapi/fast-lane-bridge-webapi.utils";

import SignIn from "../sign-in.component";
import { Router } from "react-router-dom";
import { Sign } from "crypto";

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
  }));

describe('Sign in tests', () => {
    test('It should route to cart if sign in success', async() => {
        const mockCallApi = jest.fn();
        const mockResponse = {};

        //history.push('/');
        const mockNavigate = jest.fn(); // Mocked navigate function
       
        renderWithProvider(
              <SignIn />
        );
          jest
            .spyOn(utils, "callApi")
            .mockImplementation(mockCallApi)
            .mockResolvedValue(mockResponse);

            jest
            .spyOn(require('react-router-dom'),"useNavigate")
            .mockImplementation(mockNavigate)
      
            //require('react-router-dom').useNavigate.mockImplementation(() => mockNavigate).mockResponse("/cart");
        
          const signInButtonElement = screen.getByText(/SignIn/i);
        //   act(() => {
        //     fireEvent.click(signInButtonElement);
        //     history.push('/cart');
        //   });

        fireEvent.click(signInButtonElement);

          
        
          //const addCustomerElement = screen.getByText(/AddCustomer/i);
          //expect(addCustomerElement).toBeInTheDocument();

          expect(mockNavigate).toHaveBeenCalledWith('/cart');
          //expect(history.location.pathname).toBe("/cart");
        });
    
})