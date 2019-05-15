import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import styled from 'styled-components';
import { compose } from 'redux';
import { connect } from 'react-redux';
import isEmpty from 'lodash.isempty';
import lodashMap from 'lodash.map';

import Segregator from '../../components/Segregator';
import withCurrentID from '../../components/withCurrentID';
import PokeTypesItem from './PokeTypesItem';
import { actions } from 'store/ducks/pokemons';

const GridContent = styled(Grid)`
  && {
    margin-bottom: 10px;
  }
`;

class PokeTypes extends PureComponent {
  state = { expandedId: 0 };

  handleToggleDetail = (type) => (event, expanded) => {
    const { fetchPokemonsByTypeId, pokemonId } = this.props;

    if (expanded && isEmpty(type.pokemons)) {
      fetchPokemonsByTypeId({ pokemonId, typeId: type.id });
    }

    this.setState({
      expandedId: expanded ? type.id : 0
    });
  };

  render() {
    const { expandedId } = this.state;
    const { types } = this.props;

    return (
      <GridContent container spacing={8} alignItems="center">
        <Grid item xs={12}>
          <Segregator title="Types" />
        </Grid>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={8}>
            {types.map((type) => (
              <PokeTypesItem
                key={type.id}
                name={type.name}
                expanded={expandedId === type.id}
                pokemons={type.pokemons}
                onToggle={this.handleToggleDetail(type)}
              />
            ))}
          </Grid>
        </Grid>
      </GridContent>
    );
  }
}

PokeTypes.propTypes = {
  types: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      pokemons: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired
        })
      )
    })
  ).isRequired,
  fetchPokemonsByTypeId: PropTypes.func.isRequired
};

const mapStateToProps = ({ entities: { pokemons } }, { pokemonId }) => ({
  types: lodashMap(pokemons.byId[pokemonId].typesById)
});

const mapDispatchToProps = {
  fetchPokemonsByTypeId: actions.fetchPokemonsByTypeId.request
};

export default compose(
  withCurrentID,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(PokeTypes);
