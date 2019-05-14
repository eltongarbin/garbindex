import { handleActions, combineActions } from 'redux-actions';

import { types } from './actions';

const initialState = { pokemonFoundId: null };

export default handleActions(
  {
    [combineActions(types.CLEAN_RESULT, types.SEARCH_POKEMON.REQUEST)]: (
      state,
      { payload }
    ) => ({
      ...state,
      pokemonFoundId: null
    }),
    [types.SEARCH_POKEMON.SUCCESS]: (state, { payload }) => ({
      ...state,
      pokemonFoundId: payload
    })
  },
  initialState
);
