import React, { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider, RootStateOrAny } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory, MemoryHistory } from 'history';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { RootState } from 'typesafe-actions';

import rootReducer from 'store/rootReducer';

export const initialAppState = createStore(rootReducer).getState();
const mockStore = configureStore([]);

type RouterOptions = {
  route?: string;
  history?: MemoryHistory;
};

type ReduxOptions = {
  initialState?: RootState | {};
  store?: MockStoreEnhanced<RootStateOrAny, {}>;
};

export type CustomRenderOptions = RouterOptions & ReduxOptions;

export function customRender(
  ui: ReactElement,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
    initialState = initialAppState,
    store = mockStore(initialState)
  }: CustomRenderOptions = {}
) {
  const AllTheProviders = ({ children }: any) => (
    <Provider store={store}>
      <Router history={history}>{children}</Router>
    </Provider>
  );

  return {
    ...render(ui, { wrapper: AllTheProviders }),
    store,
    history
  };
}

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
