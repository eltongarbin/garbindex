import { actions as pokedexActions } from './ducks/pokedex';
import { actions as pokemonActions } from './ducks/pokemons';
import { actions as huntingScreenActions } from 'screens/HuntingScreen/state';

export default {
  pokedex: pokedexActions,
  pokemons: pokemonActions,
  huntingScreen: huntingScreenActions
};
