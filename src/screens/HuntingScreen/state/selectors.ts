import { RootState } from 'typesafe-actions';
import { isEmpty } from 'lodash-es';

import { selectors as pokedexSelectors } from 'store/ducks/pokedex';

export const hasSearched = (state: RootState) => state.huntingScreen.searched;

export const hasFounded = (state: RootState) =>
  !isEmpty(state.entities.pokemons.byId[state.huntingScreen.pokemonFoundId!]);

export const getFoundedPokemon = (state: RootState) => {
  const pokemon =
    state.entities.pokemons.byId[state.huntingScreen.pokemonFoundId!];
  const pokemonsCapturedIds = pokedexSelectors.getCaughtPokemonsId(state);
  const isCaptured =
    !isEmpty(pokemonsCapturedIds) && pokemonsCapturedIds.includes(pokemon?.id);

  return { ...pokemon, isCaptured };
};
