import { combineReducers } from 'redux';

import * as mainReducers from './ducks';

const rootReducer = combineReducers({
  ...mainReducers
});

export default rootReducer;
