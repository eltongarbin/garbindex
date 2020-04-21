import React from 'react';
import { render } from 'utils/test-utils';

import RootScreen from './RootScreen';

jest.mock('./PokedexScreen', () => () => 'PokedexScreen');
jest.mock('./HuntingScreen', () => () => 'HuntingScreen');
jest.mock('./PokemonScreen', () => () => 'PokemonScreen');
jest.mock('./NotFoundScreen', () => () => 'NotFoundScreen');

it('should render the not found screen', async () => {
  const { findByText } = render(<RootScreen />, {
    route: '/something-that-does-not-match'
  });

  const lazyElement = await findByText('NotFoundScreen');

  expect(lazyElement).toBeInTheDocument();
});

it('should render the pokedex screen', async () => {
  const { findByText } = render(<RootScreen />, {
    route: '/'
  });

  const lazyElement = await findByText('PokedexScreen');

  expect(lazyElement).toBeInTheDocument();
});

it('should render the hunting screen', async () => {
  const { findByText } = render(<RootScreen />, {
    route: '/pokemons'
  });

  const lazyElement = await findByText('HuntingScreen');

  expect(lazyElement).toBeInTheDocument();
});

it('should render the pokemon detail screen', async () => {
  const { findByText } = render(<RootScreen />, {
    route: '/pokemons/12'
  });

  const lazyElement = await findByText('PokemonScreen');

  expect(lazyElement).toBeInTheDocument();
});
