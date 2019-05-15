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
    }),
    [types.FETCH_POKEMONS_BYTYPE.SUCCESS]: (state, { payload }) => {
      const currentPokemon = state.byId[payload.pokemonId];
      const currentType = currentPokemon.typesById[payload.typeId];

      return {
        ...state,
        byId: {
          ...state.byId,
          [currentPokemon.id]: {
            ...currentPokemon,
            typesById: {
              ...currentPokemon.typesById,
              [currentType.id]: { ...currentType, pokemons: payload.pokemons }
            }
          }
        }
      };
    },
    [types.FETCH_SHORT_EFFECT_BYABILITY.SUCCESS]: (state, { payload }) => {
      const currentPokemon = state.byId[payload.pokemonId];
      const currentAbility = currentPokemon.abilitiesById[payload.abilityId];

      return {
        ...state,
        byId: {
          ...state.byId,
          [currentPokemon.id]: {
            ...currentPokemon,
            abilitiesById: {
              ...currentPokemon.abilitiesById,
              [currentAbility.id]: {
                ...currentAbility,
                short_effect: payload.short_effect
              }
            }
          }
        }
      };
    }
  },
  initialState
);
