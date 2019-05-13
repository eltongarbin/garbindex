import { createAction, handleActions } from 'redux-actions';
import { createType } from '../helpers/reduxUtils';
import merge from 'lodash.merge';

// const initialState = {
//   pokemonsId: [],
//   pokemonsCustomizedById: {}
// };

const initialState = {
  pokemonsId: [1, 2],
  pokemonsCustomizedById: {
    2: {
      id: 2,
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/22.png'
    }
  }
};

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
  initialState
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
