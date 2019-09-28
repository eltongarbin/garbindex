import React, { useEffect } from 'react';
import {
  Card,
  CardContent,
  SnackbarContent,
  Link,
  CircularProgress
} from '@material-ui/core';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import isEmpty from 'lodash.isempty';
import { Link as RouterLink } from 'react-router-dom';
import useReactRouter from 'use-react-router';

import history from 'utils/history';
import { withScreenLayout } from 'components/ScreenLayout';
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

const loadingSelector = createLoadingSelector([types.FETCH_POKEMON]);

function PokemonScreen() {
  const { match } = useReactRouter();
  const pokemon = useSelector((state) =>
    selectors.getPokemonById(state, match.params.id)
  );
  const isFetching = useSelector(loadingSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEmpty(pokemon) && !isFetching) {
      dispatch(actions.fetchPokemon.request(match.params.id));
    }
  }, [dispatch, isFetching, match.params.id, pokemon]);

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

const handleBackClick = () => {
  const { state } = history.location;
  if (state) {
    history.push(state.from);
    return;
  }

  history.push('/');
};

export default withScreenLayout({
  title: 'Pokémon Detail',
  onBackClick: handleBackClick
})(PokemonScreen);
