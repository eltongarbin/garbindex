import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import {
  MuiThemeProvider,
  CssBaseline,
  LinearProgress
} from '@material-ui/core';
import { PersistGate } from 'redux-persist/integration/react';

import { history, theme } from './utils';
import RootScreen from './screens/RootScreen';
import configureStore from './store';
import * as serviceWorker from './serviceWorker';

const { store, persistor } = configureStore();

const renderApp = () =>
  render(
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Router history={history}>
          <PersistGate loading={<LinearProgress />} persistor={persistor}>
            <RootScreen />
          </PersistGate>
        </Router>
      </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
  );

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./screens/RootScreen', renderApp);
}

renderApp();

serviceWorker.register();
