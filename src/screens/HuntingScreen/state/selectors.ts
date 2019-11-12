import { RootState } from 'typesafe-actions';

export const hasSearched = (state: RootState) => state.huntingScreen.searched;

export const getPokemonFound = (state: RootState) =>
  state.entities.pokemons.byId[state.huntingScreen.pokemonFoundId!];
