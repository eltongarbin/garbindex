import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import isEmpty from 'lodash.isempty';

import PokeCard from 'components/PokeCard';
import { actions, selectors } from '../state';
import {
  selectors as pokedexSelectors,
  actions as pokedexActions
} from 'store/ducks/pokedex/pokedex';

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
    history.push(`/pokemons/${id}`, { from: '/pokemons' });
  };

  handleReleaseClick = (id) => () => {
    // eslint-disable-next-line
    if (confirm('Are you sure you want to release this pokémon?')) {
      this.props.releasePokemon(id);
    }
  };

  handleCatchClick = (id) => () => {
    this.props.catchPokemon(id);
  };

  getOtherOperation(pokemonFoundId) {
    const { pokemonsCapturedIds } = this.props;

    if (
      !isEmpty(pokemonsCapturedIds) &&
      pokemonsCapturedIds.includes(pokemonFoundId)
    ) {
      return { onReleaseClick: this.handleReleaseClick(pokemonFoundId) };
    }

    return {
      onCatchClick: this.handleCatchClick(pokemonFoundId)
    };
  }

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
              {...this.getOtherOperation(pokemonFound.id)}
            />
          )}
        </Grid>
      </GridResultStyled>
    );
  }
}

SearchResult.propTypes = {
  pokemonFound: PropTypes.object,
  cleanSearchResult: PropTypes.func.isRequired,
  pokemonsCapturedIds: PropTypes.array,
  catchPokemon: PropTypes.func.isRequired,
  releasePokemon: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  pokemonFound: selectors.getPokemonById(
    state,
    state.huntingPage.pokemonFoundId
  ),
  pokemonsCapturedIds: pokedexSelectors.getCaughtPokemonsId(state)
});

const mapDispatchToProps = {
  cleanSearchResult: actions.cleanSearchResult,
  catchPokemon: pokedexActions.catchPokemon,
  releasePokemon: pokedexActions.releasePokemon
};

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(SearchResult);
