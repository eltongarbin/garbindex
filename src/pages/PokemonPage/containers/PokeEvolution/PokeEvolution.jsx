import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';

import Segregator from '../../components/Segregator';
import withCurrentID from '../../components/withCurrentID';
import { selectors } from 'store/ducks/pokemons';

function PokeEvolution({ evolvedFrom }) {
  if (!evolvedFrom) {
    return null;
  }

  return (
    <Grid container spacing={8}>
      <Grid item xs={12}>
        <Segregator title="Evolution" />
      </Grid>
      <Grid item xs={12}>
        <Typography>
          This pokémon envolved from <strong>{evolvedFrom}.</strong>
        </Typography>
      </Grid>
    </Grid>
  );
}

PokeEvolution.propTypes = {
  evolvedFrom: PropTypes.string
};

const mapStateToProps = (state, { pokemonId }) => ({
  evolvedFrom: selectors.getPokemonById(state, pokemonId).evolvedFrom
});

export default compose(
  withCurrentID,
  connect(mapStateToProps)
)(PokeEvolution);
