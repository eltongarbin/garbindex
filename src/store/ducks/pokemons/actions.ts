import { createAsyncAction } from 'typesafe-actions';

import { ActionTypes } from './types';

export const fetchPokemon = createAsyncAction(
  ActionTypes.FETCH_POKEMON_REQUEST,
  ActionTypes.FETCH_POKEMON_SUCCESS, // TODO: Improve payload type
  ActionTypes.FETCH_POKEMON_FAILURE
)<string | number, any, Error>();

export const fetchEvolvedFrom = createAsyncAction(
  ActionTypes.FETCH_EVOLUTION_CHAIN_REQUEST,
  ActionTypes.FETCH_EVOLUTION_CHAIN_SUCCESS, // TODO: Improve payload type
  ActionTypes.FETCH_EVOLUTION_CHAIN_FAILURE
)<number, any, Error>();

export const fetchPokemonsByTypeId = createAsyncAction(
  ActionTypes.FETCH_POKEMONS_BYTYPE_REQUEST, // TODO: Improve payload type
  ActionTypes.FETCH_POKEMONS_BYTYPE_SUCCESS, // TODO: Improve payload type
  ActionTypes.FETCH_POKEMONS_BYTYPE_FAILURE
)<{ pokemonId: number; typeId: number }, any, Error>();

export const fetchShortEffectByAbilityId = createAsyncAction(
  ActionTypes.FETCH_SHORT_EFFECT_BYABILITY_REQUEST, // TODO: Improve payload type
  ActionTypes.FETCH_SHORT_EFFECT_BYABILITY_SUCCESS, // TODO: Improve payload type
  ActionTypes.FETCH_SHORT_EFFECT_BYABILITY_FAILURE
)<{ pokemonId: number; abilityId: number }, any, Error>();
