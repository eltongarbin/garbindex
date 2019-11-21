import reducer, { initialState } from './reducer';
import * as actions from './actions';

/* eslint-disable func-names */
describe('huntingScreenReducer', () => {
  describe('cleanSearchResult', () => {
    const action = actions.cleanSearchResult();
    const state = reducer(initialState, action);

    it('should reset state', () => {
      expect(state.searched).toBeFalsy();
      expect(state.pokemonFoundId).toBeUndefined();
    });
  });

  describe('searchForPokemon.request', () => {
    const action = actions.searchForPokemon.request('1');
    const state = reducer(initialState, action);

    it('should reset state', () => {
      expect(state.searched).toBeFalsy();
      expect(state.pokemonFoundId).toBeUndefined();
    });
  });

  describe('searchForPokemon.success', () => {
    const action = actions.searchForPokemon.success(3);
    const state = reducer(initialState, action);

    it('should set state', () => {
      expect(state.searched).toBeTruthy();
      expect(state.pokemonFoundId).toEqual(3);
    });
  });
});
