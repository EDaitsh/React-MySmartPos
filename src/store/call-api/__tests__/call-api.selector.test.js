import { 
    selectCallApiResponse,
    selectCallApiIsLoading,
    selectCallApiActionActive
 } from "../call-api.selector";

 const mockState = {
    callapi: {
        response: '123',
        isLoading: true,
        error: null,
        actionStates: {
            init: true,
            signIn: false,
            addCustomer: false,
            addItem: false,
            voidItem: false,
            suspendTransaction: false,
            voidTransaction: false,
      },
    }
}

describe('Call-api selector tests', () => {
    test('selectCallApiResponse', () => {
        const expectedRes = '123'
        const apiResponse = selectCallApiResponse(mockState);
        expect(apiResponse).toEqual(expectedRes);
    });

    test('selectCallApiIsLoading', () => {
        expect(selectCallApiIsLoading(mockState)).toEqual(true);
    });

    test('selectCallApiActionActive',() => {
        const expectedAction = ["init", true];
        expect(selectCallApiActionActive(mockState)).toEqual(expectedAction);
    })
})