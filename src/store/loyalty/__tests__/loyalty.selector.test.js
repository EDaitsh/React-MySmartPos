import { selectLoyaltyNumer } from "../loyalty.selector";

const mockState = {
    loyalty: {
    loyaltyNumber: '123'
    }
}

describe('Loyalty selector tests', () => {
    test('selectLoyaltyNumer', () => {
        const expectedLoyaltyNumber = '123'
        const loyaltyNumber = selectLoyaltyNumer(mockState);
        expect(loyaltyNumber).toEqual(expectedLoyaltyNumber);
    })
})