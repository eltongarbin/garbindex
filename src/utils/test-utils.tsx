import React, { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { Router } from 'react-router-dom';
import { createMemoryHistory, MemoryHistory } from 'history';
import configureStore from 'redux-mock-store';

import rootSaga from 'store/rootSaga';

const sagaMiddleware = createSagaMiddleware();
const mockStore = configureStore([sagaMiddleware]);

type RouterOptions = {
  route?: string;
  history?: MemoryHistory;
};

type ReduxOptions = {
  store?: any;
};

type CustomRenderOptions = RouterOptions & ReduxOptions;

export function customRender(
  ui: ReactElement,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
    store = mockStore({})
  }: CustomRenderOptions = {}
) {
  const AllTheProviders = ({ children }: any) => {
    sagaMiddleware.run(rootSaga);
    return (
      <Provider store={store}>
        <Router history={history}>{children}</Router>
      </Provider>
    );
  };

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
