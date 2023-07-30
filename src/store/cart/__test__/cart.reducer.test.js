import Promotion from "../../../components/promotion/promotion.component";
import { 
    cartReducer,
    initialCartState, 
    addItemToCart, 
    removeItemFromCart,
    INITIAL_STATE
 } from "../cart.reducer";

describe('Cart reducer tests', () => {
    test('initialCartState', () =>{
        expect(cartReducer(INITIAL_STATE,initialCartState()))
        .toEqual(INITIAL_STATE);
    });

    test('addItemToCart', () => {
        const mockData= {
            ItemSold: {
                upc: '1',
                description: 'item 1',
                quantity: 1,
                price: 10
            },
            DiscountApplied: {
                description: 'promo 1',
                amount: 2
            }
        };

        const expectedState = {
            cartItems: [{
                upc: '1',
                description: 'item 1',
                quantity: 1,
                price: 10,
                promotion: {
                    description: 'promo 1',
                    amount: 2
                }
            }]
        }

        expect(cartReducer(INITIAL_STATE,addItemToCart(mockData)))
        .toEqual(expectedState);
    });

    test ('removeItemFromCart', () => {
        const mockItem = {
            upc: '1',
                description: 'item 1',
                quantity: 1,
                price: 10,
                promotion: {
                    description: 'promo 1',
                    amount: 2
                }
        };
        const mockInitState = {
            cartItems: [{
                upc: '1',
                description: 'item 1',
                quantity: 1,
                price: 10,
                promotion: {
                    description: 'promo 1',
                    amount: 2
                }
            }]
        }

        expect(cartReducer(mockInitState,removeItemFromCart(mockItem)))
        .toEqual(INITIAL_STATE);

    })
})