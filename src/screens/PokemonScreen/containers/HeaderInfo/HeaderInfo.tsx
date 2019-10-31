import React from 'react';
import { IconButton, CardHeader } from '@material-ui/core';
import {
  AddCircle as AddCircleIcon,
  Delete as DeleteIcon
} from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { actions } from 'store/ducks/pokedex';
import usePokemonId from '../../hooks/usePokemonId';

const CardHeaderStyled = styled(CardHeader)`
  && {
    padding-bottom: 0px;
  }
`;

const HeaderInfo = React.memo(function HeaderInfo() {
  const pokemonId = usePokemonId();
  const name = useSelector(
    (state) => state.entities.pokemons.byId[pokemonId].name
  );
  const captured = useSelector((state) =>
    state.entities.pokedex.pokemonsId.includes(parseInt(pokemonId))
  );
  const dispatch = useDispatch();

  return (
    <CardHeaderStyled
      action={
        captured ? (
          <IconButton
            aria-label="Release"
            onClick={() => dispatch(actions.releasePokemon(pokemonId))}
          >
            <DeleteIcon />
          </IconButton>
        ) : (
          <IconButton
            aria-label="Catch"
            onClick={() => dispatch(actions.catchPokemon(pokemonId))}
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
