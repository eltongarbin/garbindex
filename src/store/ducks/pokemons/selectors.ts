import { merge } from 'lodash-es';

export const getPokemonById = (state, id) =>
  merge(
    {},
    state.entities.pokemons.byId[id],
    state.entities.pokedex.pokemonsCustomizedById[id]
  );
