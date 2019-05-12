import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension/developmentOnly';

import rootReducer from './rootReducer';

export default () => {
  let store = createStore(rootReducer, devToolsEnhancer());
  return { store };
};
