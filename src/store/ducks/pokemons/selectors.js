import merge from 'lodash.merge';

export const getPokemonById = (state, id) =>
  merge(
    {},
    state.entities.pokemons.byId[id],
    state.entities.pokedex.pokemonsCustomizedById[id]
  );
