import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, CardHeader } from '@material-ui/core';
import {
  AddCircle as AddCircleIcon,
  Delete as DeleteIcon
} from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import withCurrentID from '../../components/withCurrentID';
import { actions } from 'store/ducks/pokedex';

const CardHeaderStyled = styled(CardHeader)`
  && {
    padding-bottom: 0px;
  }
`;

const HeaderInfo = React.memo(function HeaderInfo({ pokemonId }) {
  const name = useSelector(
    (state) => state.entities.pokemons.byId[pokemonId].name
  );
  const captured = useSelector((state) =>
    state.entities.pokedex.pokemonsId.includes(pokemonId)
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

HeaderInfo.propTypes = {
  pokemonId: PropTypes.number.isRequired
};

export default withCurrentID(HeaderInfo);
