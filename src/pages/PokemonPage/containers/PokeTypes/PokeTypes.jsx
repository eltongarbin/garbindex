import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import styled from 'styled-components';
import { compose } from 'redux';
import { connect } from 'react-redux';

import Segregator from '../../components/Segregator';
import withCurrentID from '../../components/hocs/withCurrentID';
import PokeTypesItem from './PokeTypesItem';

const GridContent = styled(Grid)`
  && {
    margin-bottom: 10px;
  }
`;

class PokeTypes extends PureComponent {
  state = { expandedId: 0 };

  handleToggleDetail = (id) => (event, expanded) => {
    this.setState({
      expandedId: expanded ? id : 0
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
            {types.map(({ id, name, pokemons }) => (
              <PokeTypesItem
                key={id}
                name={name}
                expanded={expandedId === id}
                pokemons={pokemons}
                onToggle={this.handleToggleDetail(id)}
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
  ).isRequired
};

const mapStateToProps = ({ entities: { pokemons } }, { pokemonId }) => ({
  types: pokemons.byId[pokemonId].types
});

export default compose(
  withCurrentID,
  connect(mapStateToProps)
)(PokeTypes);
