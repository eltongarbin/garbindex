import { combineReducers } from 'redux';

import pokedex from './ducks/pokedex';
import pokemons from './ducks/pokemons';

const rootReducer = combineReducers({
  pokedex,
  pokemons
});

export default rootReducer;
