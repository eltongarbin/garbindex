import reducer, { initialState } from './reducer';
import actions from './actions';

/* eslint-disable func-names */
describe('huntingScreenReducer', function() {
  describe('cleanSearchResult', function() {
    const action = actions.cleanSearchResult();
    const state = reducer(initialState, action);

    it('should reset state', function() {
      expect(state.searched).toBeFalsy();
      expect(state.pokemonFoundId).toBeNull();
    });
  });

  describe('searchForPokemon.request', function() {
    const action = actions.searchForPokemon.request();
    const state = reducer(initialState, action);

    it('should reset state', function() {
      expect(state.searched).toBeFalsy();
      expect(state.pokemonFoundId).toBeNull();
    });
  });

  describe('searchForPokemon.received', function() {
    const action = actions.searchForPokemon.receive(3);
    const state = reducer(initialState, action);

    it('should set state', function() {
      expect(state.searched).toBeTruthy();
      expect(state.pokemonFoundId).toEqual(3);
    });
  });
});
