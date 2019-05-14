import { createAction, handleActions } from 'redux-actions';
import merge from 'lodash.merge';

import { createType } from 'utils/reduxHelpers';

const types = {
  RELEASE_BYID: createType('pokedex', 'RELEASE_BYID'),
  CATCH_BYID: createType('pokedex', 'CATCH_BYID'),
  CHANGE_IMAGE: createType('pokedex', 'CHANGE_IMAGE')
};

export const actions = {
  releasePokemon: createAction(types.RELEASE_BYID),
  catchPokemon: createAction(types.CATCH_BYID),
  changePokemonImage: createAction(types.CHANGE_IMAGE)
};

const initialState = {
  pokemonsId: [],
  pokemonsCustomizedById: {}
};

export default handleActions(
  {
    [types.RELEASE_BYID]: (state, { payload }) => {
      const { [payload]: value, ...rest } = state.pokemonsCustomizedById;

      return {
        pokemonsId: state.pokemonsId.filter((id) => id !== payload),
        pokemonsCustomizedById: rest
      };
    },
    [types.CATCH_BYID]: (state, { payload }) => ({
      ...state,
      pokemonsId: [...state.pokemonsId, payload]
    }),
    [types.CHANGE_IMAGE]: (state, { payload }) => ({
      ...state,
      pokemonsCustomizedById: {
        ...state.pokemonsCustomizedById,
        [payload.id]: {
          ...state.pokemonsCustomizedById[payload.id],
          ...payload
        }
      }
    })
  },
  initialState
);

export const selectors = {
  getCaughtPokemonsId: (state) => state.entities.pokedex.pokemonsId,
  getCaughtPokemons: (state) =>
    state.entities.pokedex.pokemonsId.map((id) =>
      merge(
        {},
        state.entities.pokemons.byId[id],
        state.entities.pokedex.pokemonsCustomizedById[id]
      )
    )
};
