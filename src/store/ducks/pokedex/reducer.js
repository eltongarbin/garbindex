import { handleActions } from 'redux-actions';
import { types } from './actions';

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
