import { createAction } from 'redux-actions';

import {
  createType,
  createAsyncTypes,
  createAsyncActions
} from 'utils/reduxHelpers';

export const types = {
  CLEAN_RESULT: createType('huntingScreen', 'CLEAN_RESULT'),
  SEARCH_POKEMON: createAsyncTypes('huntingScreen', 'SEARCH_POKEMON')
};

export default {
  cleanSearchResult: createAction(types.CLEAN_RESULT),
  searchForPokemon: createAsyncActions(types.SEARCH_POKEMON)
};
