import { takeEvery, put, race, take } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';

import * as actions from './actions';
import { actions as pokemonActions } from 'store/ducks/pokemons';

export function* watchSearchPokemonRequest(
  action: ReturnType<typeof actions.searchForPokemon.request>
): Generator {
  yield put(pokemonActions.fetchPokemon.request(action.payload));

  const { task }: any = yield race({
    task: take(getType(pokemonActions.fetchPokemon.success)),
    cancel: take(pokemonActions.fetchPokemon.failure)
  });

  yield put(actions.searchForPokemon.success(task ? task.payload.id : null));
}

export default [
  takeEvery(actions.searchForPokemon.request, watchSearchPokemonRequest)
];
