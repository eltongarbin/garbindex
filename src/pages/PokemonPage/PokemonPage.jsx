import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  SnackbarContent,
  Link,
  CircularProgress
} from '@material-ui/core';
import styled from 'styled-components';
import { compose } from 'redux';
import { connect } from 'react-redux';
import isEmpty from 'lodash.isempty';
import { Link as RouterLink } from 'react-router-dom';

import history from 'utils/history';
import { withPageLayout } from 'components/PageLayout';
import HeaderInfo from './containers/HeaderInfo';
import PokeImage from './containers/PokeImage';
import PokeTypes from './containers/PokeTypes';
import PokeProfile from './containers/PokeProfile';
import PokeEvolution from './containers/PokeEvolution';
import { selectors, actions, types } from 'store/ducks/pokemons';
import { createLoadingSelector } from 'store/ducks/loading';

const CardContentStyled = styled(CardContent)`
  && {
    padding-top: 0px;
  }
`;

const LoadingContainer = styled.div`
  text-align: center;
`;

class PokemonPage extends Component {
  componentDidMount() {
    const { pokemon, match, fetchPokemon } = this.props;
    if (isEmpty(pokemon)) fetchPokemon(match.params.id);
  }

  render() {
    const { isFetching, pokemon } = this.props;

    if (isFetching) {
      return (
        <LoadingContainer>
          <CircularProgress color="secondary" />
        </LoadingContainer>
      );
    }

    if (isEmpty(pokemon)) {
      return (
        <SnackbarContent
          message={
            <span>
              Sorry, we did'nt find the pokémon. Try new search{' '}
              <Link component={RouterLink} to="/pokemons">
                here!
              </Link>
            </span>
          }
        />
      );
    }

    return (
      <Card>
        <HeaderInfo />
        <CardContentStyled>
          <PokeImage />
          <PokeTypes />
          <PokeProfile />
          <PokeEvolution />
        </CardContentStyled>
      </Card>
    );
  }
}

PokemonPage.propTypes = {
  pokemon: PropTypes.object,
  match: PropTypes.object.isRequired,
  fetchPokemon: PropTypes.func.isRequired,
  isFetching: PropTypes.bool
};

const loadingSelector = createLoadingSelector([types.FETCH_POKEMON]);

const mapStateToProps = (state, { match }) => ({
  pokemon: selectors.getPokemonById(state, match.params.id),
  isFetching: loadingSelector(state)
});

const mapDispatchToProps = {
  fetchPokemon: actions.fetchPokemon.request
};

const handleBackClick = () => {
  const { state } = history.location;
  if (state) {
    history.push(state.from);
    return;
  }

  history.push('/');
};

export default compose(
  withPageLayout({
    title: 'Pokémon Detail',
    onBackClick: handleBackClick
  }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(PokemonPage);
