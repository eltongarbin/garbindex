import { takeEvery, put } from 'redux-saga/effects';

import { extractParamId } from 'utils';
import { genericAsyncResolver } from 'utils/reduxHelpers';
import * as actions from './actions';
import * as services from 'services/pokemonService';

function* watchFetchPokemonRequest(
  action: ReturnType<typeof actions.fetchPokemon.request>
) {
  yield genericAsyncResolver(
    services.getPokemon,
    action.payload,
    actions.fetchPokemon
  );
}

function* watchFetchPokemonSuccess(
  action: ReturnType<typeof actions.fetchPokemon.success>
) {
  yield put(actions.fetchEvolvedFrom.request(action.payload.id));
}

function* watchFetchEnvolvedFromRequest(
  action: ReturnType<typeof actions.fetchEvolvedFrom.request>
) {
  yield genericAsyncResolver(
    services.getSpecie,
    action.payload,
    actions.fetchEvolvedFrom
  );
}

function* watchFetchPokemonsByTypeRequest(
  action: ReturnType<typeof actions.fetchPokemonsByTypeId.request>
) {
  yield genericAsyncResolver(
    services.getType,
    action.payload.typeId,
    actions.fetchPokemonsByTypeId,
    (data: services.PokemonType) => ({
      pokemonId: action.payload.pokemonId,
      typeId: action.payload.typeId,
      pokemons: data.pokemon.map(({ pokemon }) => ({
        id: parseInt(extractParamId(pokemon.url)),
        name: pokemon.name
      }))
    })
  );
}

function* watchFetchShortEffectByAbilityRequest(
  action: ReturnType<typeof actions.fetchShortEffectByAbilityId.request>
) {
  yield genericAsyncResolver(
    services.getAbility,
    action.payload.abilityId,
    actions.fetchShortEffectByAbilityId,
    (data: services.PokemonAbility) => ({
      pokemonId: action.payload.pokemonId,
      abilityId: action.payload.abilityId,
      short_effect: data.effect_entries[0].short_effect
    })
  );
}

export default [
  takeEvery(actions.fetchPokemon.request, watchFetchPokemonRequest),
  takeEvery(actions.fetchPokemon.success, watchFetchPokemonSuccess),
  takeEvery(actions.fetchEvolvedFrom.request, watchFetchEnvolvedFromRequest),
  takeEvery(
    actions.fetchPokemonsByTypeId.request,
    watchFetchPokemonsByTypeRequest
  ),
  takeEvery(
    actions.fetchShortEffectByAbilityId.request,
    watchFetchShortEffectByAbilityRequest
  )
];
