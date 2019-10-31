import { createAsyncTypes, createAsyncActions } from 'utils/reduxHelpers';

export const types = {
  FETCH_POKEMON: createAsyncTypes('pokemons', 'FETCH_POKEMON'),
  FETCH_EVOLUTION_CHAIN: createAsyncTypes('pokemons', 'FETCH_EVOLUTION_CHAIN'),
  FETCH_POKEMONS_BYTYPE: createAsyncTypes('pokemons', 'FETCH_POKEMONS_BYTYPE'),
  FETCH_SHORT_EFFECT_BYABILITY: createAsyncTypes(
    'pokemons',
    'FETCH_SHORT_EFFECT_BYABILITY'
  )
};

export default {
  fetchPokemon: createAsyncActions(types.FETCH_POKEMON),
  fetchEvolvedFrom: createAsyncActions(types.FETCH_EVOLUTION_CHAIN),
  fetchPokemonsByTypeId: createAsyncActions(types.FETCH_POKEMONS_BYTYPE),
  fetchShortEffectByAbilityId: createAsyncActions(
    types.FETCH_SHORT_EFFECT_BYABILITY
  )
};
