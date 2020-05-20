import React from 'react';
import { Route } from 'react-router-dom';

import { render, initialAppState } from 'utils/test-utils';
import * as pokemonFactory from '../utils/pokemonFactory';
import PokemonScreen from '../PokemonScreen';

const setup = (pokemon = pokemonFactory.create()) =>
  render(<Route path="/pokemons/:id" component={PokemonScreen} />, {
    route: `/pokemons/${pokemon.id}`,
    initialState: {
      ...initialAppState,
      entities: {
        ...initialAppState.entities,
        pokemons: {
          byId: {
            [pokemon.id]: {
              ...pokemon
            }
          }
        }
      }
    }
  });

it('should display name, id, image', () => {
  const { getByTitle, getByText } = setup();
  expect(getByText('clefairy')).toBeInTheDocument();
  expect(getByText('#35')).toBeInTheDocument();
  expect(getByTitle('Pokémon').getAttribute('style')).toBe(
    'background-image: url(https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/35.png);'
  );
});

it('should render stats', () => {
  const { getByText } = setup();
  expect(getByText('speed - 35')).toBeInTheDocument();
  expect(getByText('special-defense - 65')).toBeInTheDocument();
  expect(getByText('special-attack - 60')).toBeInTheDocument();
  expect(getByText('defense - 48')).toBeInTheDocument();
  expect(getByText('attack - 45')).toBeInTheDocument();
  expect(getByText('hp - 70')).toBeInTheDocument();
});

it('should display basic profile', () => {
  const { getByTestId } = setup();
  expect(getByTestId('poke-height')).toBeInTheDocument();
  expect(getByTestId('poke-weight')).toBeInTheDocument();
});

it('should display evolution detail', () => {
  const { getByTestId } = setup();
  expect(getByTestId('poke-evolution').textContent).toBe(
    'This pokémon envolved from cleffa.'
  );
});

it('should not display evolution when there is no', () => {
  const { queryByTestId } = setup(pokemonFactory.create({ evolvedFrom: '' }));
  expect(queryByTestId('poke-evolution')).not.toBeInTheDocument();
});

it.skip('should display empty state', () => {
  const { getByTestId } = render(
    <Route path="/pokemons/:id" component={PokemonScreen} />,
    { route: `/pokemons/3455` }
  );

  expect(getByTestId('empty-state').textContent).toBe(
    "Sorry, we did'nt find the pokémon. Try new search here!"
  );
});

it.todo('should catch the pokemon');

it.todo('should release the pokemon');

it.todo('should lazy loading types');

it.todo('should lazy loading abilities');
