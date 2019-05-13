import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';

import PokeAbilitiesItem from './PokeAbilitiesItem';
import withCurrentId from '../../components/withCurrentID';

class PokeAbilities extends PureComponent {
  state = { expandedId: 0 };

  handleToggleDetail = (id) => (event, expanded) => {
    this.setState({
      expandedId: expanded ? id : 0
    });
  };

  render() {
    const { expandedId } = this.state;
    const { abilities } = this.props;

    return (
      <Grid item xs={12}>
        <Grid container justify="center" spacing={8}>
          {abilities.map(({ id, name, short_effect }) => (
            <PokeAbilitiesItem
              key={id}
              name={name}
              short_effect={short_effect}
              expanded={expandedId === id}
              onToggle={this.handleToggleDetail(id)}
            />
          ))}
        </Grid>
      </Grid>
    );
  }
}

PokeAbilities.propTypes = {
  abilities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      short_effect: PropTypes.string
    })
  ).isRequired
};

const mapStateToProps = ({ entities: { pokemons } }, { pokemonId }) => ({
  abilities: pokemons.byId[pokemonId].abilities
});

export default compose(
  withCurrentId,
  connect(mapStateToProps)
)(PokeAbilities);
