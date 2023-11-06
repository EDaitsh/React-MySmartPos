import React from "react";
import { render } from '@testing-library/react';
import { Provider } from "react-redux";
import { createStore } from "redux";
import { rootReducer } from "../../store/root-reducer";
import { BrowserRouter, MemoryRouter, Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { act } from 'react-dom/test-utils';


export function renderWithProvider(
    ui,
    {
        preloadedState = {},
        store = createStore(rootReducer, preloadedState),
        ...renderOptions
    } = {}
)
{
    
    
    const Wrapper = ({children}) => {
       
        return (
          <Provider store={store}>
           
              <BrowserRouter >{children}</BrowserRouter>
            
          </Provider>
        );
       
    }

    return {
        store,
        ...render(ui, {wrapper: Wrapper, ...renderOptions})
    }
}