import merge from 'lodash.merge';

export const getCaughtPokemonsId = (state) => state.entities.pokedex.pokemonsId;

export const getCaughtPokemons = (state) =>
  getCaughtPokemonsId(state).map((id) =>
    merge(
      {},
      state.entities.pokemons.byId[id],
      state.entities.pokedex.pokemonsCustomizedById[id]
    )
  );

export const isMyPokemon = (state, id) =>
  getCaughtPokemonsId(state).includes(id);
