import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';

import withCurrentID from '../../components/withCurrentID';
import PokeStatsItem from './PokeStatsItem';

function PokeStats({ stats }) {
  return (
    <Grid item xs={8} container direction="column" spacing={16}>
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

const mapStateToProps = ({ entities: { pokemons } }, { pokemonId }) => ({
  stats: pokemons.byId[pokemonId].stats
});

export default compose(
  withCurrentID,
  connect(mapStateToProps)
)(PokeStats);
