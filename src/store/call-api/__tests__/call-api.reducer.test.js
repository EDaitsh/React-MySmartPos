import { initRequest, callAPIFailed, callAPISuccess } from "../call-api.action";
import { callApiReducer, INITIAL_STATE } from "../call-api.reducer";

describe("Call-api reducer tests", () => {
  test("initRequest", () => {
    const expectedState = {
      ...INITIAL_STATE,
      response: null,
      isLoading: true,

      actionStates: {
        ...INITIAL_STATE.actionStates,
        init: true,
      },
    };
    expect(callApiReducer(INITIAL_STATE, initRequest(""))).toEqual(
      expectedState
    );
  });

  test('callAPISuccess', () => {
    const mockResponse = {
        'initRes': {
            'msg': 'success'
        }
    }

    const expectedState = {
        ...INITIAL_STATE,
        response: mockResponse,
        isLoading: false,
        actionStates: INITIAL_STATE.actionStates
    }

    expect(callApiReducer(INITIAL_STATE, callAPISuccess(mockResponse))).toEqual(
        expectedState
    );
  })

  test('callAPIFailed', () => {
    const mockError = new Error('Error call api');
    const expectedState = {
        ...INITIAL_STATE,
        isLoading:false,
        error: mockError,
        actionStates: INITIAL_STATE.actionStates
    }

    expect(callApiReducer(INITIAL_STATE, callAPIFailed(mockError))).toEqual(
        expectedState
    );
  })
});