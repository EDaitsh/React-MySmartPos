export const selectCallApiResponse =(state) => state.callapi.response;
export const selectCallApiIsLoading = (state) => state.callapi.isLoading;
export const selectCallApiActionActive = (state) => 
    Object.entries(state.callapi.actionStates).find(([key, value]) => value === true) || [];


