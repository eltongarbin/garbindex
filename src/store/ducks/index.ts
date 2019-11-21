import { combineReducers } from 'redux';

import pokedex from './pokedex';
import pokemons from './pokemons';
import loading from './loading';

export const entities = combineReducers({
  pokedex,
  pokemons
});

export const ui = combineReducers({ loading });
