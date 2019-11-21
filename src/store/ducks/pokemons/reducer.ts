import { createReducer } from 'typesafe-actions';
import { keyBy } from 'lodash-es';
import { extractParamId } from 'utils';
import { DeepReadonly } from 'utility-types';

import {
  fetchPokemon,
  fetchEvolvedFrom,
  fetchPokemonsByTypeId,
  fetchShortEffectByAbilityId
} from './actions';

export type PokemonType = {
  id: number;
  name: string;
  pokemons?: Array<{
    id: number;
    name: string;
  }>;
};

export type PokemonAbility = {
  id: number;
  name: string;
  short_effect?: string;
};

type PokemonState = DeepReadonly<{
  byId: IDictionary<{
    id: number;
    name: string;
    image: string;
    evolvedFrom?: string;
    height: number;
    weight: number;
    stats: Array<{
      id: number;
      name: string;
      base_stat: number;
    }>;
    abilitiesById: IDictionary<PokemonAbility>;
    typesById: IDictionary<PokemonType>;
  }>;
}>;

const initialState: PokemonState = {
  byId: {}
};

export default createReducer(initialState)
  .handleAction(fetchPokemon.success, (state, { payload }) => ({
    byId: {
      ...state.byId,
      [payload.id]: {
        ...payload,
        image: payload.sprites.front_default,
        abilitiesById: keyBy(
          payload.abilities.map(({ ability }) => ({
            id: parseInt(extractParamId(ability.url)),
            name: ability.name
          })),
          'id'
        ),
        stats: payload.stats.map(({ base_stat, stat }) => ({
          base_stat: base_stat,
          name: stat.name,
          id: parseInt(extractParamId(stat.url))
        })),
        typesById: keyBy(
          payload.types.map(({ type }) => ({
            id: parseInt(extractParamId(type.url)),
            name: type.name
          })),
          'id'
        )
      }
    }
  }))
  .handleAction(fetchEvolvedFrom.success, (state, { payload }) => ({
    byId: {
      ...state.byId,
      [payload.id]: {
        ...state.byId[payload.id],
        ...payload,
        evolvedFrom: payload.evolves_from_species
          ? payload.evolves_from_species.name
          : null
      }
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
