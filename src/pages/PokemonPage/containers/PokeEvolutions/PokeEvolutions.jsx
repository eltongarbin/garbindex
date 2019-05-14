import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';

import Segregator from '../../components/Segregator';
import withCurrentID from '../../components/withCurrentID';
import PokeEvolutionsItem from './PokeEvolutionsItem';

function PokeEvolutions({ evolutions = [] }) {
  return (
    <Grid container spacing={8}>
      <Grid item xs={12}>
        <Segregator title="Evolutions" />
      </Grid>
      <Grid item xs={12}>
        {evolutions.map(({ pokeId, from, to, minLevel }) => (
          <PokeEvolutionsItem
            key={pokeId}
            from={from}
            to={to}
            minLevel={minLevel}
          />
        ))}
      </Grid>
    </Grid>
  );
}

PokeEvolutions.propTypes = {
  evolutions: PropTypes.array
};

const mapStateToProps = ({ entities }, { pokemonId }) => ({
  evolutions: entities.pokemons.byId[pokemonId].evolutions
});

export default compose(
  withCurrentID,
  connect(mapStateToProps)
)(PokeEvolutions);
