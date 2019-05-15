import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import lodashMap from 'lodash.map';

import PokeAbilitiesItem from './PokeAbilitiesItem';
import withCurrentId from '../../components/withCurrentID';
import { actions } from 'store/ducks/pokemons';

class PokeAbilities extends PureComponent {
  state = { expandedId: 0 };

  handleToggleDetail = (ability) => (event, expanded) => {
    const { fetchShortEffectByAbilityId, pokemonId } = this.props;

    if (expanded && !ability.short_effect) {
      fetchShortEffectByAbilityId({ pokemonId, abilityId: ability.id });
    }

    this.setState({
      expandedId: expanded ? ability.id : 0
    });
  };

  render() {
    const { expandedId } = this.state;
    const { abilities } = this.props;

    return (
      <Grid item xs={12}>
        <Grid container justify="center" spacing={8}>
          {abilities.map((ability) => (
            <PokeAbilitiesItem
              key={ability.id}
              name={ability.name}
              short_effect={ability.short_effect}
              expanded={expandedId === ability.id}
              onToggle={this.handleToggleDetail(ability)}
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
  ).isRequired,
  fetchShortEffectByAbilityId: PropTypes.func.isRequired
};

const mapStateToProps = ({ entities: { pokemons } }, { pokemonId }) => ({
  abilities: lodashMap(pokemons.byId[pokemonId].abilitiesById)
});

const mapDispatchToProps = {
  fetchShortEffectByAbilityId: actions.fetchShortEffectByAbilityId.request
};

export default compose(
  withCurrentId,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(PokeAbilities);
