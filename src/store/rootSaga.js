import { all } from 'redux-saga/effects';

import { sagas as PokemonsSagas } from './ducks/pokemons';
import { sagas as HuntingPageSagas } from 'pages/HuntingPage/state';

export default function* root() {
  yield all([...PokemonsSagas, ...HuntingPageSagas]);
}
