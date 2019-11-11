import { createReducer } from 'typesafe-actions';

import { HuntingScreenState } from './types';
import { cleanSearchResult, searchForPokemon } from './actions';

export const initialState: HuntingScreenState = {
  searched: false,
  pokemonFoundId: undefined
};

export default createReducer(initialState)
  .handleAction([cleanSearchResult, searchForPokemon.request], () => ({
    ...initialState
  }))
  .handleAction(searchForPokemon.success, (_state, { payload }) => ({
    searched: true,
    pokemonFoundId: payload
  }));
