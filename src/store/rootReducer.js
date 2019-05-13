import { combineReducers } from 'redux';

import * as mainReducers from './reducers';
import { huntingPageReducer } from 'pages/HuntingPage';

const rootReducer = combineReducers({
  ...mainReducers,
  huntingPage: huntingPageReducer
});

export default rootReducer;
