import { handleActions } from 'redux-actions';
import { types } from './actions';

const initialState = {
  byId: {},
  allIds: []
};

export default handleActions(
  {
    [types.FETCH_POKEMON.SUCCESS]: (state, { payload }) => ({
      ...state,
      byId: { ...state.byId, [payload.id]: payload },
      allIds: [...state.allIds, payload.id]
    }),
    [types.FETCH_EVOLUTION_CHAIN.SUCCESS]: (state, { payload }) => ({
      ...state,
      byId: {
        ...state.byId,
        [payload.id]: { ...state.byId[payload.id], ...payload }
      }
    })
  },
  initialState
);
