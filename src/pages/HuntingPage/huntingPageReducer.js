import merge from 'lodash.merge';
import { createAction, handleActions } from 'redux-actions';

import { createType } from 'utils/reduxHelpers';

const types = {
  CLEAN_RESULT: createType('pokedex', 'CLEAN_RESULT')
};

export const actions = {
  cleanSearchResult: createAction(types.CLEAN_RESULT)
};

// const initialState = { pokemonFoundId: null };
const initialState = { pokemonFoundId: 3 };

export default handleActions(
  {
    [types.CLEAN_RESULT]: (state, { payload }) => ({
      ...state,
      pokemonFoundId: null
    })
  },
  initialState
);

export const selectors = {
  getPokemonById: (state, id) =>
    merge(
      {},
      state.entities.pokemons.byId[id],
      state.entities.pokedex.pokemonsCustomizedById[id]
    )
};
