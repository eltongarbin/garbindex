import { createAction } from 'typesafe-actions';
import { ActionTypes } from './types';

export const releasePokemon = createAction(ActionTypes.RELEASE_BYID)<number>();
export const catchPokemon = createAction(ActionTypes.CATCH_BYID)<number>();
export const changePokemonImage = createAction(ActionTypes.CHANGE_IMAGE)<{
  id: number;
  image: string;
}>();
