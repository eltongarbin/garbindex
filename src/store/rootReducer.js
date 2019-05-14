import { combineReducers } from 'redux';

import * as mainReducers from './ducks';
import huntingPageReducer from 'pages/HuntingPage/state';

const rootReducer = combineReducers({
  ...mainReducers,
  huntingPage: huntingPageReducer
});

export default rootReducer;
