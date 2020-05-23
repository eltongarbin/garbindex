import React from 'react';
import { Route } from 'react-router-dom';

import { render, initialAppState, fireEvent } from 'utils/test-utils';
import PokeImage from '../containers/PokeImage';
import * as pokemonFactory from '../utils/pokemonFactory';

jest.mock('react-webcam', () => {
  const { Component } = require('react');
  return class Wrapper extends Component {
    getScreenshot() {
      return 'data:image/jpeg;base64,/9j/JHKAJDHFJH...';
    }

    render() {
      return (
        <video
          ref={(ref) => {}}
          autoPlay
          playsInline
          data-testid="video-camera"
        />
      );
    }
  };
});

const globalAny: any = global;

const setup = (pokemon = pokemonFactory.create()) =>
  render(<Route path="/pokemons/:id" component={PokeImage} />, {
    route: `/pokemons/${pokemon.id}`,
    initialState: {
      ...initialAppState,
      entities: {
        ...initialAppState.entities,
        pokemons: { byId: { [pokemon.id]: pokemon } },
        pokedex: {
          pokemonsId: [35],
          customPokemonPhotoById: {}
        }
      }
    }
  });

it('should display pokemon default image', () => {
  const { getByTitle } = setup();
  expect(getByTitle('Pokémon').getAttribute('style')).toBe(
    'background-image: url(https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/35.png);'
  );
});

it('should display pokemon custom image', () => {
  const { getByTitle } = render(
    <Route path="/pokemons/:id" component={PokeImage} />,
    {
      route: `/pokemons/35`,
      initialState: {
        ...initialAppState,
        entities: {
          ...initialAppState.entities,
          pokemons: { byId: { 35: pokemonFactory.create() } },
          pokedex: {
            pokemonsId: [35],
            customPokemonPhotoById: {
              35: {
                id: 35,
                image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgAB...'
              }
            }
          }
        }
      }
    }
  );

  expect(getByTitle('Pokémon').getAttribute('style')).toBe(
    'background-image: url(data:image/jpeg;base64,/9j/4AAQSkZJRgAB...);'
  );
});

it('should upload a pokemon custom image', () => {
  globalAny.URL.createObjectURL = jest.fn(
    () => 'data:image/jpeg;base64,/9j/4AAQSkZJRgAB...'
  );
  const file = new File(['(⌐□_□)'], 'chucknorris.png', {
    type: 'image/png'
  });
  const { getByTitle, getByTestId, store } = setup();

  fireEvent.click(getByTitle('Upload button'));
  fireEvent.change(getByTestId('file-upload'), { target: { files: [file] } });

  expect(store.getActions()).toMatchInlineSnapshot(`
    Array [
      Object {
        "payload": Object {
          "id": 35,
          "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgAB...",
        },
        "type": "@@pokedex/CHANGE_IMAGE",
      },
    ]
  `);
});

it('should open camera', () => {
  globalAny.navigator.mediaDevices = {};
  const { getByTitle, getByTestId } = setup();

  fireEvent.click(getByTitle('Open camera'));
  expect(getByTestId('video-camera')).toBeInTheDocument();
});

it('should close camera', () => {
  globalAny.navigator.mediaDevices = {};
  const { getByTitle, queryByTestId } = setup();

  fireEvent.click(getByTitle('Open camera'));
  fireEvent.click(getByTitle('Close camera'));

  expect(queryByTestId('video-camera')).not.toBeInTheDocument();
});

it('should take a photo with the camera', () => {
  globalAny.navigator.mediaDevices = {};
  const { getByTitle } = setup();

  fireEvent.click(getByTitle('Open camera'));
  fireEvent.click(getByTitle('Capture image'));

  expect(getByTitle('Pokémon').getAttribute('style')).toBe(
    'background-image: url(data:image/jpeg;base64,/9j/JHKAJDHFJH...);'
  );
});

it('should agree with the photo taken by the camera', () => {
  globalAny.navigator.mediaDevices = {};
  const { getByTitle, store } = setup();

  fireEvent.click(getByTitle('Open camera'));
  fireEvent.click(getByTitle('Capture image'));
  fireEvent.click(getByTitle('Confirm photo'));

  expect(store.getActions()).toMatchInlineSnapshot(`
    Array [
      Object {
        "payload": Object {
          "id": 35,
          "image": "data:image/jpeg;base64,/9j/JHKAJDHFJH...",
        },
        "type": "@@pokedex/CHANGE_IMAGE",
      },
    ]
  `);
});

it('should disagree with the photo taken by the camera', () => {
  globalAny.navigator.mediaDevices = {};
  const { getByTitle, queryByTestId, store } = setup();

  fireEvent.click(getByTitle('Open camera'));
  fireEvent.click(getByTitle('Capture image'));
  expect(queryByTestId('video-camera')).not.toBeInTheDocument();

  fireEvent.click(getByTitle('Cancel photo'));
  expect(queryByTestId('video-camera')).toBeInTheDocument();
  expect(store.getActions()).toMatchInlineSnapshot(`Array []`);
});
