import { RootState } from 'typesafe-actions';
import { merge } from 'lodash-es';

export const getCaughtPokemonsId = (state: RootState) =>
  state.entities.pokedex.pokemonsId;

export const getCaughtPokemons = (state: RootState) =>
  getCaughtPokemonsId(state).map((id) =>
    merge(
      {},
      state.entities.pokemons.byId[id],
      state.entities.pokedex.customPokemonPhotoById[id]
    )
  );

export const isMyPokemon = (id: number) => (state: RootState) =>
  getCaughtPokemonsId(state).includes(id);
