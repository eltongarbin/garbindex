import { createReducer } from 'typesafe-actions';

import { PokemonState } from './types';
import {
  fetchPokemon,
  fetchEvolvedFrom,
  fetchPokemonsByTypeId,
  fetchShortEffectByAbilityId
} from './actions';

const initialState: PokemonState = {
  byId: {}
};

export default createReducer(initialState)
  .handleAction(fetchPokemon.success, (state, { payload }) => ({
    byId: { ...state.byId, [payload.id]: payload }
  }))
  .handleAction(fetchEvolvedFrom.success, (state, { payload }) => ({
    byId: {
      ...state.byId,
      [payload.id]: { ...state.byId[payload.id], ...payload }
    }
  }))
  .handleAction(fetchPokemonsByTypeId.success, (state, { payload }) => {
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
  })
  .handleAction(fetchShortEffectByAbilityId.success, (state, { payload }) => {
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
  });
