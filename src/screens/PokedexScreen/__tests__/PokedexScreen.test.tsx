import React from 'react';

import { render, fireEvent, initialAppState, within } from 'utils/test-utils';
import PokedexScreen from '../PokedexScreen';

it('should display empty message', () => {
  const { getByText } = render(<PokedexScreen />);
  expect(getByText("You dont't have any pokemón yet. Let's find"));
});

it('should redirect to the hunting screen', () => {
  const { getByTestId, history } = render(<PokedexScreen />);

  fireEvent.click(getByTestId('hunting-link'));
  expect(history.location.pathname).toBe('/pokemons');
});

describe('tests with filled list', () => {
  const setup = () =>
    render(<PokedexScreen />, {
      initialState: {
        ...initialAppState,
        entities: {
          ...initialAppState.entities,
          pokedex: { pokemonsId: [67, 23], customPokemonPhotoById: {} },
          pokemons: {
            byId: {
              67: { id: 67, name: 'machoke', image: 'image.png' },
              23: { id: 23, name: 'ekans', image: 'image.png' }
            }
          }
        }
      }
    });

  it('should list catched pokemons', () => {
    const { queryByText, getAllByTestId } = setup();

    expect(
      queryByText("You dont't have any pokemón yet. Let's find")
    ).not.toBeInTheDocument();
    expect(getAllByTestId(/pokecard-(67|23)/)).toHaveLength(2);
  });

  it('should release a pokemon', () => {
    window.confirm = jest.fn(() => true);
    const { getByTestId, store } = setup();

    const container = within(getByTestId('pokecard-23'));
    fireEvent.click(container.getByLabelText('Release'));

    expect(store.getActions()).toMatchInlineSnapshot(`
      Array [
        Object {
          "payload": 23,
          "type": "@@pokedex/RELEASE_BYID",
        },
      ]
    `);
  });

  it('should not release a pokemon', () => {
    window.confirm = jest.fn(() => false);
    const { getByTestId, store } = setup();

    const container = within(getByTestId('pokecard-23'));
    fireEvent.click(container.getByLabelText('Release'));

    expect(store.getActions()).toMatchInlineSnapshot(`Array []`);
  });

  it('should redirect to the pokemon detail screen', () => {
    const { getByTestId, history } = setup();

    const container = within(getByTestId('pokecard-23'));
    fireEvent.click(container.getByLabelText('See more'));

    expect(history.location.pathname).toBe('/pokemons/23');
  });
});
