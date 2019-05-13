import { createAction, handleActions } from 'redux-actions';
import merge from 'lodash.merge';

import { createType } from 'utils/reduxHelpers';
import { pokedexState } from './mock';

// const initialState = {
//   pokemonsId: [],
//   pokemonsCustomizedById: {}
// };

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
  pokedexState
);

export const selectors = {
  getCaughtPokemons: (state) =>
    state.entities.pokedex.pokemonsId.map((id) =>
      merge(
        {},
        state.entities.pokemons.byId[id],
        state.entities.pokedex.pokemonsCustomizedById[id]
      )
    )
};
