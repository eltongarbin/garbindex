import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';

import withCurrentID from '../../components/withCurrentID';
import PokeStatsItem from './PokeStatsItem';
import { selectors } from 'store/ducks/pokemons';

function PokeStats({ stats }) {
  return (
    <Grid item xs={8} container direction="column" spacing={2}>
      {stats.map(({ id, name, base_stat }) => (
        <PokeStatsItem key={id} name={name} value={base_stat} />
      ))}
    </Grid>
  );
}

PokeStats.propTypes = {
  stats: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      base_stat: PropTypes.number.isRequired
    })
  ).isRequired
};

const mapStateToProps = (state, { pokemonId }) => ({
  stats: selectors.getPokemonById(state, pokemonId).stats
});

export default compose(
  withCurrentID,
  connect(mapStateToProps)
)(PokeStats);
