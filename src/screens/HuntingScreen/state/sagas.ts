import { takeEvery, put, race, take } from 'redux-saga/effects';

import * as actions from './actions';
import { ActionTypes } from './types';
import {
  actions as pokemonActions,
  types as pokemonTypes
} from 'store/ducks/pokemons';

function* watchSearchPokemonRequest(
  action: ReturnType<typeof actions.searchForPokemon.request>
): Generator {
  yield put(pokemonActions.fetchPokemon.request(action.payload));

  const { task } = yield race({
    task: take(pokemonTypes.FETCH_POKEMON_SUCCESS),
    cancel: take(pokemonTypes.FETCH_POKEMON_FAILURE)
  });

  yield put(actions.searchForPokemon.success(task ? task.payload.id : null));
}

export default [
  takeEvery(ActionTypes.SEARCH_POKEMON_REQUEST, watchSearchPokemonRequest)
];
