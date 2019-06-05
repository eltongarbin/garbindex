import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid } from '@material-ui/core';
import styled from 'styled-components';
import { compose } from 'redux';
import { connect } from 'react-redux';

import Segregator from '../../components/Segregator';
import withCurrentID from '../../components/withCurrentID';
import PokeAbilities from './PokeAbilities';
import { selectors } from 'store/ducks/pokemons';

const Content = styled.div`
  margin-bottom: 10px;
`;

const convertoToMeters = (height) => height / 10;

function PokeProfile({ height, weight }) {
  return (
    <Content>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Segregator title="Profile" />
        </Grid>
        <Grid item xs={12} container spacing={1}>
          <Grid item xs>
            <Typography variant="subtitle2">Height</Typography>
            <Typography variant="body2">
              {convertoToMeters(height)} m
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography variant="subtitle2">Weight</Typography>
            <Typography variant="body2">{weight} kg</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle2">Abilities</Typography>
        <PokeAbilities />
      </Grid>
    </Content>
  );
}

PokeProfile.propTypes = {
  height: PropTypes.number.isRequired,
  weight: PropTypes.number.isRequired
};

const mapStateToProps = (state, { pokemonId }) => {
  const { height, weight } = selectors.getPokemonById(state, pokemonId);

  return {
    height,
    weight
  };
};

export default compose(
  withCurrentID,
  connect(mapStateToProps)
)(PokeProfile);
