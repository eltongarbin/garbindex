import { combineReducers } from 'redux';

import * as mainReducers from './ducks';
import huntingScreenReducer from 'screens/HuntingScreen/state';

const rootReducer = combineReducers({
  ...mainReducers,
  huntingScreen: huntingScreenReducer
});

export default rootReducer;
