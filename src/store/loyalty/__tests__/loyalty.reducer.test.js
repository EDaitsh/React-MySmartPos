import {
    loyaltyReducer, 
    INITIAL_STATE,  
    setLoyaltyNumber, 
    initLoyaltyNumber 
} from "../loyalty.reducer";

describe('Loyalty reducer test', () => {
    test('setLoyaltyNumber', () => {
        const mockLoyaltyNumber = '123';
        const expectState= {
            loyaltyNumber: mockLoyaltyNumber
        }
        expect(loyaltyReducer(INITIAL_STATE,setLoyaltyNumber(mockLoyaltyNumber)))
        .toEqual(expectState);
    });

    test('initLoyaltyNumber', () => {
        expect(loyaltyReducer(INITIAL_STATE,initLoyaltyNumber()))
        .toEqual(INITIAL_STATE);
    })
})