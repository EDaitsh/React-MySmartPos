import { screen, fireEvent } from "@testing-library/react";

import { renderWithProvider } from "../../../utils/tests/test.utils";

import Button from "../button.component";
import { preProcessFile } from "typescript";

describe('Button tests', () => {
    test("should be Is Loading... if loading & isButtonActive is true", () => {
      renderWithProvider(<Button action="addCustomer" htmlContent="" />, {
        preloadedState: {
          callapi: {
            isLoading: true,
            actionStates: {
              init: false,
              signIn: false,
              addCustomer: true,
              addItem: false,
              voidItem: false,
              suspendTransaction: false,
              voidTransaction: false,
            },
          },
        },
      });
      const buttonElement = screen.getByText("Please wait...");
      expect(buttonElement).toBeInTheDocument();
    });

    test("should be htmlContent if loading is true and isButtonActive is false", () => {
        renderWithProvider(<Button action="init" htmlContent="test" />, {
          preloadedState: {
            callapi: {
              isLoading: true,
              actionStates: {
                init: false,
                signIn: false,
                addCustomer: true,
                addItem: false,
                voidItem: false,
                suspendTransaction: false,
                voidTransaction: false,
              },
            },
          },
        });
        // const buttonElement = screen.getByRole('button');
        // expect(buttonElement).
        const buttonElement = screen.getByText("test");
        expect(buttonElement).toBeInTheDocument();
      });
})



