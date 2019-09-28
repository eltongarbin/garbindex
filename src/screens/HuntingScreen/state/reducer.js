import { handleActions, combineActions } from 'redux-actions';
import { types } from './actions';

export const initialState = {
  searched: false,
  pokemonFoundId: null
};

export default handleActions(
  {
    [combineActions(types.CLEAN_RESULT, types.SEARCH_POKEMON.REQUEST)]: () => ({
      ...initialState
    }),
    [types.SEARCH_POKEMON.SUCCESS]: (state, { payload }) => ({
      searched: true,
      pokemonFoundId: payload
    })
  },
  initialState
);

export const selectors = {
  hasSearched: (state) => state.huntingScreen.searched
};
