import { 
    selectCartItems,
    selectCartCount,
    selectCartTotal
} from "../cart.selector";

const mockState = {
    cart: {
        cartItems: [{
            upc: '1',
            description: 'item 1',
            quantity: 1,
            price: 10,
            promotion: {
                description: 'promo 1',
                amount: 2
            }
        },
        {
            upc: '2',
            description: 'item 2',
            quantity: 3,
            price: 5,
            promotion: {
                description: 'promo 1',
                amount: 3
            }
        }]}
}

describe('Cart selector test', () => {
    test('selectCartItems', () =>{
        const expectedCartItems =  [{
            upc: '1',
            description: 'item 1',
            quantity: 1,
            price: 10,
            promotion: {
                description: 'promo 1',
                amount: 2
            }
        },
        {
            upc: '2',
            description: 'item 2',
            quantity: 3,
            price: 5,
            promotion: {
                description: 'promo 1',
                amount: 3
            }
        }]
        const cartItems = selectCartItems(mockState);
        expect(cartItems).toEqual(expectedCartItems);
    });
 
    test('selectCartCount', () => {
        const cartCount = selectCartCount(mockState);
        expect(cartCount).toEqual(4);
    });

    test('selectCartTotal', () => {
        const cartTotal = selectCartTotal(mockState);
        expect(cartTotal).toEqual(20)
    })

})