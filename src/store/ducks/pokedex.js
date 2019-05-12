import { createAction, handleActions } from 'redux-actions';
import { createType } from '../helpers/reduxUtils';

// const initialState = {
//   pokemonsId: [],
//   pokemonsCustomizedById: {}
// };

const initialState = {
  pokemonsId: [1, 2],
  pokemonsCustomizedById: {
    2: {
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/22.png'
    }
  }
};

const types = {
  RELEASE_BYID: createType('pokedex', 'RELEASE_BYID')
};

export const actions = {
  releasePokemon: createAction(types.RELEASE_BYID)
};

export default handleActions(
  {
    [types.RELEASE_BYID]: (state, { payload }) => {
      const { [payload]: value, ...rest } = state.pokemonsCustomizedById;

      return {
        pokemonsId: state.pokemonsId.filter((id) => id !== payload),
        pokemonsCustomizedById: rest
      };
    }
  },
  initialState
);
