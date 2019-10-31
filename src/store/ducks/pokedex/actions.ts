import { createAction } from 'redux-actions';
import { createType } from 'utils/reduxHelpers';

export const types = {
  RELEASE_BYID: createType('pokedex', 'RELEASE_BYID'),
  CATCH_BYID: createType('pokedex', 'CATCH_BYID'),
  CHANGE_IMAGE: createType('pokedex', 'CHANGE_IMAGE')
};

export default {
  releasePokemon: createAction(types.RELEASE_BYID),
  catchPokemon: createAction(types.CATCH_BYID),
  changePokemonImage: createAction(types.CHANGE_IMAGE)
};
