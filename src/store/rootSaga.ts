import { all } from 'redux-saga/effects';

import { sagas as PokemonsSagas } from './ducks/pokemons';
import { sagas as HuntingScreenSagas } from 'screens/HuntingScreen/state';

export default function* root() {
  yield all([...PokemonsSagas, ...HuntingScreenSagas]);
}
