import React from 'react';
import { IconButton, CardHeader } from '@material-ui/core';
import {
  AddCircle as AddCircleIcon,
  Delete as DeleteIcon
} from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import {
  actions as pokedexActions,
  selectors as pokedexSelectors
} from 'store/ducks/pokedex';
import { selectors as pokemonsSelectors } from 'store/ducks/pokemons';
import usePokemonId from '../../hooks/usePokemonId';

const CardHeaderStyled = styled(CardHeader)`
  &&& {
    padding-bottom: 0px;
  }
`;

const HeaderInfo = React.memo(() => {
  const pokemonId = usePokemonId();
  const { name } = useSelector(pokemonsSelectors.getPokemonById(pokemonId));
  const captured = useSelector(pokedexSelectors.isMyPokemon(pokemonId));
  const dispatch = useDispatch();

  return (
    <CardHeaderStyled
      action={
        captured ? (
          <IconButton
            aria-label="Release"
            onClick={() => dispatch(pokedexActions.releasePokemon(pokemonId))}
          >
            <DeleteIcon />
          </IconButton>
        ) : (
          <IconButton
            aria-label="Catch"
            onClick={() => dispatch(pokedexActions.catchPokemon(pokemonId))}
          >
            <AddCircleIcon />
          </IconButton>
        )
      }
      title={name}
      subheader={`#${pokemonId}`}
    />
  );
});

export default HeaderInfo;
