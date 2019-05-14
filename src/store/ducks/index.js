import { combineReducers } from 'redux';

import pokedex from './pokedex/pokedex';
import pokemons from './pokemons';

export const entities = combineReducers({
  pokedex,
  pokemons
});

export const ui = {};
