import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import isEmpty from 'lodash.isempty';

import PokeCard from 'components/PokeCard';
import { actions, selectors } from '../huntingPageReducer';

export const GridResultStyled = styled(Grid)`
  && {
    margin-top: 10px;
  }
`;

class SearchResult extends PureComponent {
  componentWillUnmount() {
    this.props.cleanSearchResult();
  }

  handleSeeMoreClick = (id) => () => {
    const { history } = this.props;
    history.push(`/pokemons/${id}`);
  };

  handleReleaseClick = (id) => () => {
    alert(`Delete ${id}`);
  };

  render() {
    const { pokemonFound } = this.props;

    return (
      <GridResultStyled container justify="center" spacing={0}>
        <Grid item xs={6} md={4}>
          {!isEmpty(pokemonFound) && (
            <PokeCard
              id={pokemonFound.id}
              name={pokemonFound.name}
              image={pokemonFound.image}
              onSeeMoreClick={this.handleSeeMoreClick(pokemonFound.id)}
              onReleaseClick={this.handleReleaseClick(pokemonFound.id)}
            />
          )}
        </Grid>
      </GridResultStyled>
    );
  }
}

SearchResult.propTypes = {
  pokemonFound: PropTypes.object,
  cleanSearchResult: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  pokemonFound: selectors.getPokemonById(
    state,
    state.huntingPage.pokemonFoundId
  )
});

const mapDispatchToProps = {
  cleanSearchResult: actions.cleanSearchResult
};

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(SearchResult);
