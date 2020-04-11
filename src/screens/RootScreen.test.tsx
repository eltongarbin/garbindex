import React from 'react';
import { renderWithRouter } from 'utils/test-utils';

import RootScreen from './RootScreen';

jest.mock('./PokedexScreen', () => () => 'PokedexScreen');
jest.mock('./HuntingScreen', () => () => 'HuntingScreen');
jest.mock('./PokemonScreen', () => () => 'PokemonScreen');

it('should render the not found screen', async () => {
  const { findByText } = renderWithRouter(<RootScreen />, {
    route: '/something-that-does-not-match'
  });

  const lazyElement = await findByText("Sorry, this page isn't here.");

  expect(lazyElement).toBeInTheDocument();
});

it('should render the pokedex screen', async () => {
  const { findByText } = renderWithRouter(<RootScreen />, {
    route: '/'
  });

  const lazyElement = await findByText('PokedexScreen');

  expect(lazyElement).toBeInTheDocument();
});

it('should render the hunting screen', async () => {
  const { findByText } = renderWithRouter(<RootScreen />, {
    route: '/pokemons'
  });

  const lazyElement = await findByText('HuntingScreen');

  expect(lazyElement).toBeInTheDocument();
});

it('should render the pokemon detail screen', async () => {
  const { findByText } = renderWithRouter(<RootScreen />, {
    route: '/pokemons/12'
  });

  const lazyElement = await findByText('PokemonScreen');

  expect(lazyElement).toBeInTheDocument();
});
