import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';

import { history, theme } from './utils';
import RootPage from './pages/RootPage';
import configureStore from './store';
import * as serviceWorker from './serviceWorker';

const { store } = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Router history={history}>
        <RootPage />
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
