import React from 'react';

import {
  render,
  fireEvent,
  CustomRenderOptions,
  initialAppState
} from 'utils/test-utils';
import HuntingScreen from '../HuntingScreen';

const setup = (options?: CustomRenderOptions) =>
  render(<HuntingScreen />, options);

it('should not submit the form when input is empty', async () => {
  const { getByRole, store } = setup();
  fireEvent.click(getByRole('button'));

  expect(store.getActions()).toMatchInlineSnapshot(`Array []`);
});

it('should submit the form when input is not empty', () => {
  const { getByRole, getByTestId, store } = setup();

  fireEvent.change(getByTestId('input-search'), {
    target: { value: 'test' }
  });
  fireEvent.click(getByRole('button'));

  expect(store.getActions()).toMatchInlineSnapshot(`
    Array [
      Object {
        "payload": "test",
        "type": "@@huntingScreen/SEARCH_POKEMON_REQUEST",
      },
    ]
  `);
});

it('should not display loading status', () => {
  const { queryByRole } = setup();
  expect(queryByRole('progressbar')).not.toBeInTheDocument();
});

it('should display loading status', () => {
  const { getByRole } = setup({
    initialState: {
      ...initialAppState,
      ui: { loading: { '@@huntingScreen/SEARCH_POKEMON': true } }
    }
  });

  expect(getByRole('progressbar')).toBeInTheDocument();
});

it('should display empty result', () => {
  const { queryByRole, getByText } = setup({
    initialState: {
      ...initialAppState,
      huntingScreen: { searched: true, pokemonFoundId: null }
    }
  });

  expect(queryByRole('progressbar')).not.toBeInTheDocument();
  expect(
    getByText("Sorry, we did'nt find the pokémon. Try new search!")
  ).toBeInTheDocument();
});

describe('Tests with success in the search', () => {
  const setupPokemonFound = (isCatched = false) =>
    setup({
      initialState: {
        ...initialAppState,
        entities: {
          ...initialAppState.entities,
          pokedex: { pokemonsId: isCatched ? [67] : [] },
          pokemons: {
            byId: { 67: { id: 67, name: 'machoke', image: 'image.png' } }
          }
        },
        huntingScreen: { searched: true, pokemonFoundId: 67 }
      }
    });

  it('should display a pokemon', () => {
    const { queryByRole, queryByText, getByTestId } = setupPokemonFound();

    expect(queryByRole('progressbar')).not.toBeInTheDocument();
    expect(
      queryByText("Sorry, we did'nt find the pokémon. Try new search!")
    ).not.toBeInTheDocument();
    expect(getByTestId('pokecard-67')).toBeInTheDocument();
  });

  it('should catch the pokemon that has been found', () => {
    const { getByLabelText, store } = setupPokemonFound();

    fireEvent.click(getByLabelText('Catch'));
    expect(store.getActions()).toMatchInlineSnapshot(`
      Array [
        Object {
          "payload": 67,
          "type": "@@pokedex/CATCH_BYID",
        },
      ]
    `);
  });

  it('should release the pokemon that has been found', () => {
    window.confirm = jest.fn(() => true);
    const { getByLabelText, store } = setupPokemonFound(true);

    fireEvent.click(getByLabelText('Release'));
    expect(store.getActions()).toMatchInlineSnapshot(`
      Array [
        Object {
          "payload": 67,
          "type": "@@pokedex/RELEASE_BYID",
        },
      ]
    `);
  });

  it('should not release the pokemon that has been found', () => {
    window.confirm = jest.fn(() => false);
    const { getByLabelText, store } = setupPokemonFound(true);

    fireEvent.click(getByLabelText('Release'));
    expect(store.getActions()).toMatchInlineSnapshot(`Array []`);
  });

  it('should redirect to the pokemon details screen', () => {
    const { getByLabelText, history } = setupPokemonFound();

    fireEvent.click(getByLabelText('See more'));
    expect(history.location.pathname).toBe('/pokemons/67');
  });
});
