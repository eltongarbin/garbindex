import { takeEvery, put, delay } from 'redux-saga/effects';

import actions, { types } from './actions';

function* watchFetchPokemonRequest(action) {
  yield delay(1000);
  yield put(
    actions.fetchPokemon.receive({
      id: 3,
      name: 'venusaur',
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png',
      stats: [
        {
          base_stat: 80,
          name: 'speed',
          id: 6
        },
        {
          base_stat: 100,
          name: 'special-defense',
          id: 5
        },
        {
          base_stat: 100,
          name: 'special-attack',
          id: 4
        },
        {
          base_stat: 83,
          name: 'defense',
          id: 3
        },
        {
          base_stat: 82,
          name: 'attack',
          id: 2
        },
        {
          base_stat: 80,
          name: 'hp',
          id: 1
        }
      ],
      types: [
        {
          name: 'poison',
          id: 4
        },
        {
          name: 'grass',
          id: 12
        }
      ],
      height: 20,
      weight: 1000,
      abilities: [
        {
          name: 'chlorophyll',
          id: 34
        },
        {
          name: 'overgrow',
          id: 36
        }
      ]
    })
  );
}

function* watchFetchPokemonSuccess(action) {
  yield put(actions.fetchEvolutionChain.request(action.payload.id));
}

function* watchFetchEvolutionChainRequest(action) {
  yield delay(1000);
  yield put(
    actions.fetchEvolutionChain.receive({
      id: action.payload,
      evolutions: [
        { pokeId: 1, from: 'bulbasaur', to: 'ivysaur', minLevel: 16 },
        { pokeId: 2, from: 'ivysaur', to: 'venusaur', minLevel: 32 }
      ]
    })
  );
}

export default [
  takeEvery(types.FETCH_POKEMON.REQUEST, watchFetchPokemonRequest),
  takeEvery(types.FETCH_POKEMON.SUCCESS, watchFetchPokemonSuccess),
  takeEvery(
    types.FETCH_EVOLUTION_CHAIN.REQUEST,
    watchFetchEvolutionChainRequest
  )
];
