import { takeEvery, put, race, take } from 'redux-saga/effects';

import actions, { types } from './actions';
import {
  actions as pokemonActions,
  types as pokemonTypes
} from 'store/ducks/pokemons';

function* watchSearchPokemonRequest(action) {
  yield put(pokemonActions.fetchPokemon.request(action.payload));

  const { task } = yield race({
    task: take(pokemonTypes.FETCH_POKEMON.SUCCESS),
    cancel: take(pokemonTypes.FETCH_POKEMON.FAILURE)
  });

  yield put(actions.searchForPokemon.receive(task ? task.payload.id : null));
}

export default [
  takeEvery(types.SEARCH_POKEMON.REQUEST, watchSearchPokemonRequest)
];
