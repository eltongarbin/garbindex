import * as actions from './actions';

test('should create an action to clear the search result', () => {
  const action = actions.cleanSearchResult();
  expect(action).toEqual({ type: '@@huntingScreen/CLEAN_RESULT' });
});

test('should create an action to request pokemons by name', () => {
  const action = actions.searchForPokemon.request('pikachu');
  expect(action).toEqual({
    type: '@@huntingScreen/SEARCH_POKEMON_REQUEST',
    payload: 'pikachu'
  });
});

test('should create an action to request pokemons by id', () => {
  const action = actions.searchForPokemon.request('23');
  expect(action).toEqual({
    type: '@@huntingScreen/SEARCH_POKEMON_REQUEST',
    payload: '23'
  });
});

test('should create an action to receive the search result', () => {
  const action = actions.searchForPokemon.success(10);
  expect(action).toEqual({
    type: '@@huntingScreen/SEARCH_POKEMON_SUCCESS',
    payload: 10
  });
});

test('should create an action to failed the search result', () => {
  const action = actions.searchForPokemon.failure(Error('Failed result!'));
  expect(action).toEqual({
    type: '@@huntingScreen/SEARCH_POKEMON_FAILURE',
    payload: Error('Failed result!')
  });
});
