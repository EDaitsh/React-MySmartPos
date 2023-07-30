import { screen } from "@testing-library/react";
import { renderWithProvider } from "../../../utils/tests/test.utils";
import Cart from "../cart.component";

describe("Cart Tests", () => {
  test("It should show items in cart", () => {
    renderWithProvider(<Cart />, {
      preloadedState: {
        cart: {
          cartItems: [
            {
              upc: 1,
              description: "ItemA",
              quantity: 1,
              price: 10,
            },
            {
              upc: 2,
              description: "ItemB",
              quantity: 2,
              price: 2,
              promotion: {
                description: "promo 1",
                amount: 2,
              },
            },
          ],
        },
        loyalty: {
          loyaltyNumber: "123456",
        },
      },
    });

    const itemElement = screen.getByText(/ItemA/i);
    expect(itemElement).toBeInTheDocument();

    const totalElement = screen.getByText(/₪ 12/i);
    expect(totalElement).toBeInTheDocument();

    const countElement = screen.getByText('3');
    expect(countElement).toBeInTheDocument();
  });
});


