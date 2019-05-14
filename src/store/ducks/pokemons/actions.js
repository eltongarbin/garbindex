import { createAsyncTypes, createAsyncActions } from 'utils/reduxHelpers';

export const types = {
  FETCH_POKEMON: createAsyncTypes('pokemons', 'FETCH_POKEMON'),
  FETCH_EVOLUTION_CHAIN: createAsyncTypes('pokemons', 'FETCH_EVOLUTION_CHAIN')
};

export default {
  fetchPokemon: createAsyncActions(types.FETCH_POKEMON),
  fetchEvolutionChain: createAsyncActions(types.FETCH_EVOLUTION_CHAIN)
};
