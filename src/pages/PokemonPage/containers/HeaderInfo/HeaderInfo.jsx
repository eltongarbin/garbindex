import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { IconButton, CardHeader } from '@material-ui/core';
import {
  AddCircle as AddCircleIcon,
  Delete as DeleteIcon
} from '@material-ui/icons';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';

import withCurrentID from '../../components/withCurrentID';
import { actions } from 'store/ducks/pokedex';

const CardHeaderStyled = styled(CardHeader)`
  && {
    padding-bottom: 0px;
  }
`;

class HeaderInfo extends PureComponent {
  handleReleaseClick = () => {
    const { releasePokemon, pokemonId } = this.props;
    releasePokemon(pokemonId);
  };

  handleCatchClick = () => {
    const { pokemonId, catchPokemon } = this.props;
    catchPokemon(pokemonId);
  };

  getAction() {
    if (this.props.captured) {
      return (
        <IconButton aria-label="Release" onClick={this.handleReleaseClick}>
          <DeleteIcon />
        </IconButton>
      );
    }

    return (
      <IconButton aria-label="Catch" onClick={this.handleCatchClick}>
        <AddCircleIcon />
      </IconButton>
    );
  }

  render() {
    const { pokemonId, name } = this.props;

    return (
      <CardHeaderStyled
        action={this.getAction()}
        title={name}
        subheader={`#${pokemonId}`}
      />
    );
  }
}

HeaderInfo.propTypes = {
  pokemonId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  captured: PropTypes.bool,
  releasePokemon: PropTypes.func.isRequired,
  catchPokemon: PropTypes.func.isRequired
};

const mapStateToProps = ({ pokedex, pokemons }, { pokemonId }) => ({
  pokemonId,
  name: pokemons.byId[pokemonId].name,
  captured: pokedex.pokemonsId.includes(pokemonId)
});

const mapDispatchToProps = {
  releasePokemon: actions.releasePokemon,
  catchPokemon: actions.catchPokemon
};

export default compose(
  withCurrentID,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(HeaderInfo);
