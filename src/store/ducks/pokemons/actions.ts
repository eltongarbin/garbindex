import { createAsyncAction } from 'typesafe-actions';

import { Pokemon, PokemonSpecie } from 'services/pokemonService';

export const fetchPokemon = createAsyncAction(
  '@@pokemons/FETCH_POKEMON_REQUEST',
  '@@pokemons/FETCH_POKEMON_SUCCESS',
  '@@pokemons/FETCH_POKEMON_FAILURE'
)<string | number, Pokemon, Error>();

export const fetchEvolvedFrom = createAsyncAction(
  '@@pokemons/FETCH_EVOLUTION_CHAIN_REQUEST',
  '@@pokemons/FETCH_EVOLUTION_CHAIN_SUCCESS',
  '@@pokemons/FETCH_EVOLUTION_CHAIN_FAILURE'
)<number, PokemonSpecie, Error>();

export const fetchPokemonsByTypeId = createAsyncAction(
  '@@pokemons/FETCH_POKEMONS_BYTYPE_REQUEST',
  '@@pokemons/FETCH_POKEMONS_BYTYPE_SUCCESS',
  '@@pokemons/FETCH_POKEMONS_BYTYPE_FAILURE'
)<
  { pokemonId: number; typeId: number },
  {
    pokemonId: number;
    typeId: number;
    pokemons: Array<{ id: number; name: string }>;
  },
  Error
>();

export const fetchShortEffectByAbilityId = createAsyncAction(
  '@@pokemons/FETCH_SHORT_EFFECT_BYABILITY_REQUEST',
  '@@pokemons/FETCH_SHORT_EFFECT_BYABILITY_SUCCESS',
  '@@pokemons/FETCH_SHORT_EFFECT_BYABILITY_FAILURE'
)<
  { pokemonId: number; abilityId: number },
  {
    pokemonId: number;
    abilityId: number;
    short_effect: string;
  },
  Error
>();
