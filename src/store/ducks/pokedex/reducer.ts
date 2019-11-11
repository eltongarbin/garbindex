import { createReducer } from 'typesafe-actions';

import { PokedexState } from './types';
import { releasePokemon, catchPokemon, changePokemonImage } from './actions';

const initialState: PokedexState = {
  pokemonsId: [],
  customPokemonPhotoById: {}
};

export default createReducer(initialState)
  .handleAction(releasePokemon, (state, { payload }) => {
    const { [payload]: value, ...rest } = state.customPokemonPhotoById;

    return {
      pokemonsId: state.pokemonsId.filter((id) => id !== payload),
      customPokemonPhotoById: rest
    };
  })
  .handleAction(catchPokemon, (state, { payload }) => ({
    ...state,
    pokemonsId: [...state.pokemonsId, payload]
  }))
  .handleAction(changePokemonImage, (state, { payload }) => ({
    ...state,
    customPokemonPhotoById: {
      ...state.customPokemonPhotoById,
      [payload.id]: {
        ...payload
      }
    }
  }));
