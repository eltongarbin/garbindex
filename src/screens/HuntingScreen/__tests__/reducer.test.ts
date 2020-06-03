import * as actions from '../state/actions';
import reducer, { HuntingScreenState } from '../state/reducer';

const getInitialState = (initial?: Partial<HuntingScreenState>) =>
  reducer(initial as HuntingScreenState, {} as any);

it('should return the initial state by default', () => {
  const initialState = getInitialState();
  expect(initialState).toMatchInlineSnapshot(`
    Object {
      "pokemonFoundId": undefined,
      "searched": false,
    }
  `);
});

it('should return the initial state when clear search is dispatched', () => {
  const initialState = getInitialState({ searched: true, pokemonFoundId: 1 });
  const state = reducer(initialState, actions.cleanSearchResult());
  expect(state).toMatchInlineSnapshot(`
    Object {
      "pokemonFoundId": undefined,
      "searched": false,
    }
  `);
});

it('should return the initial state when search request is dispatched', () => {
  const initialState = getInitialState({ searched: true, pokemonFoundId: 12 });
  const state = reducer(initialState, actions.searchForPokemon.request('12'));
  expect(state).toMatchInlineSnapshot(`
    Object {
      "pokemonFoundId": undefined,
      "searched": false,
    }
  `);
});

it('should return founded pokemon in the state', () => {
  const initialState = getInitialState();
  const state = reducer(initialState, actions.searchForPokemon.success(12));
  expect(state).toMatchInlineSnapshot(`
    Object {
      "pokemonFoundId": 12,
      "searched": true,
    }
  `);
});
