import { merge } from 'lodash-es';
import { RootState } from 'typesafe-actions';

export const getPokemonById = (id: number) => (state: RootState): any =>
  merge(
    {},
    state.entities.pokemons.byId[id],
    state.entities.pokedex.customPokemonPhotoById[id]
  );
