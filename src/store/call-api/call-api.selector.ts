import { createSelector } from "reselect";
import { CallAPIState } from "./call-api.reducer";
import { RootState } from "../store";

const selectCallAPIReducer = (state: RootState): CallAPIState => state.callapi;

export const selectCallApiResponse = createSelector(
    [selectCallAPIReducer],
    (callApi) => callApi.response
);

export const selectCallApiIsLoading = createSelector(
    [selectCallAPIReducer],
    (callApi) => callApi.isLoading
);

export const selectCallApiActionActive = createSelector(
    [selectCallAPIReducer],
    (callApi) => Object.entries(callApi.actionStates).find(([key, value]) => value === true) || []
);




