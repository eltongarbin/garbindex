import { createAction, createAsyncAction } from 'typesafe-actions';

import { ActionTypes } from './types';

export const cleanSearchResult = createAction(ActionTypes.CLEAN_RESULT)<void>();
export const searchForPokemon = createAsyncAction(
  ActionTypes.SEARCH_POKEMON_REQUEST,
  ActionTypes.SEARCH_POKEMON_SUCCESS,
  ActionTypes.SEARCH_POKEMON_FAILURE
)<string, number, Error>();
