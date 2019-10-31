import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const persistConfig = {
  key: 'root',
  storage: storageSession,
  whitelist: ['entities']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function configureStore(preloadedState) {
  const composeEnhancers = composeWithDevTools({});
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    persistedReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );
  const persistor = persistStore(store);

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./rootReducer', () =>
      store.replaceReducer(persistedReducer)
    );
  }

  sagaMiddleware.run(rootSaga);

  return { store, persistor };
}
