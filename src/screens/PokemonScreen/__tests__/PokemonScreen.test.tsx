import React from 'react';
import { Route } from 'react-router-dom';

import { render, initialAppState, fireEvent, within } from 'utils/test-utils';
import { actions } from 'store/ducks/pokemons';
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
          byId: { [pokemon.id]: pokemon }
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

it('should display empty state', () => {
  const { getByTestId } = render(
    <Route path="/pokemons/:id" component={PokemonScreen} />,
    { route: `/pokemons/3455` }
  );

  expect(getByTestId('empty-state')).toHaveTextContent(
    "Sorry, we did'nt find the pokémon. Try new search here!"
  );
});

it('should catch the pokemon', () => {
  const { getByLabelText, store } = setup();

  fireEvent.click(getByLabelText('Catch'));
  expect(store.getActions()).toMatchInlineSnapshot(`
    Array [
      Object {
        "payload": 35,
        "type": "@@pokedex/CATCH_BYID",
      },
    ]
  `);
});

it('should release the pokemon', () => {
  const { getByLabelText, store } = render(
    <Route path="/pokemons/:id" component={PokemonScreen} />,
    {
      route: `/pokemons/35`,
      initialState: {
        ...initialAppState,
        entities: {
          ...initialAppState.entities,
          pokemons: { byId: { 35: pokemonFactory.create() } },
          pokedex: { pokemonsId: [35], customPokemonPhotoById: {} }
        }
      }
    }
  );

  fireEvent.click(getByLabelText('Release'));
  expect(store.getActions()).toMatchInlineSnapshot(`
    Array [
      Object {
        "payload": 35,
        "type": "@@pokedex/RELEASE_BYID",
      },
    ]
  `);
});

it('should lazy loading pokemon by types', () => {
  const { getByTestId, store } = setup();

  const container = within(getByTestId('type-fairy'));
  fireEvent.click(container.getByRole('button'));

  expect(container.getByRole('progressbar')).toBeInTheDocument();
  expect(store.getActions()).toMatchInlineSnapshot(`
    Array [
      Object {
        "payload": Object {
          "pokemonId": 35,
          "typeId": 18,
        },
        "type": "@@pokemons/FETCH_POKEMONS_BYTYPE_REQUEST",
      },
    ]
  `);
});

it('should display pokemons by type', () => {
  const { getByTestId } = setup(
    pokemonFactory.create({
      typesById: {
        '18': {
          id: 18,
          name: 'fairy',
          pokemons: [
            { id: 35, name: 'clefairy' },
            { id: 36, name: 'clefable' }
          ]
        }
      }
    })
  );

  const container = within(getByTestId('type-fairy'));
  fireEvent.click(container.getByRole('button'));

  expect(container.queryByRole('progressbar')).not.toBeInTheDocument();
  expect(container.getByText('clefairy')).toBeInTheDocument();
  expect(container.getByText('clefable')).toBeInTheDocument();
});

it('should lazy loading ability detail', () => {
  const { getByTestId, store } = setup();

  const container = within(getByTestId('ability-cute-charm'));
  fireEvent.click(container.getByRole('button'));

  expect(container.getByRole('progressbar')).toBeInTheDocument();
  expect(store.getActions()).toMatchInlineSnapshot(`
    Array [
      Object {
        "payload": Object {
          "abilityId": 56,
          "pokemonId": 35,
        },
        "type": "@@pokemons/FETCH_SHORT_EFFECT_BYABILITY_REQUEST",
      },
    ]
  `);
});

it('should display ability detail', () => {
  const { getByTestId } = setup(
    pokemonFactory.create({
      abilitiesById: {
        '56': {
          id: 56,
          name: 'cute-charm',
          short_effect:
            'Has a 30% chance of infatuating attacking Pokémon on contact.'
        },
        '132': {
          id: 132,
          name: 'friend-guard'
        }
      }
    })
  );

  const container = within(getByTestId('ability-cute-charm'));
  fireEvent.click(container.getByRole('button'));

  expect(container.queryByRole('progressbar')).not.toBeInTheDocument();
  expect(
    container.getByText(
      'Has a 30% chance of infatuating attacking Pokémon on contact.'
    )
  ).toBeInTheDocument();
});
