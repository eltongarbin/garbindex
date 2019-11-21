import { createAction, createAsyncAction } from 'typesafe-actions';

export const cleanSearchResult = createAction('@@huntingScreen/CLEAN_RESULT')<
  void
>();

export const searchForPokemon = createAsyncAction(
  '@@huntingScreen/SEARCH_POKEMON_REQUEST',
  '@@huntingScreen/SEARCH_POKEMON_SUCCESS',
  '@@huntingScreen/SEARCH_POKEMON_FAILURE'
)<string, number, Error>();
