import { createAction } from 'typesafe-actions';

export const releasePokemon = createAction('@@pokedex/RELEASE_BYID')<number>();
export const catchPokemon = createAction('@@pokedex/CATCH_BYID')<number>();
export const changePokemonImage = createAction('@@pokedex/CHANGE_IMAGE')<{
  id: number;
  image: string;
}>();
