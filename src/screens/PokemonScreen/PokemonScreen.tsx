import React, { useEffect } from 'react';
import {
  Card,
  CardContent,
  SnackbarContent,
  Link,
  CircularProgress,
  Grid
} from '@material-ui/core';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash-es';
import { Link as RouterLink, useParams } from 'react-router-dom';

import history from 'utils/history';
import { withScreenLayout } from 'components/ScreenLayout';
import { selectors, actions, types } from 'store/ducks/pokemons';
import { createLoadingSelector } from 'store/ducks/loading/selectors';
import HeaderInfo from './containers/HeaderInfo';
import PokeImage from './containers/PokeImage';
import PokeTypes from './containers/PokeTypes';
import PokeProfile from './containers/PokeProfile';
import PokeEvolution from './containers/PokeEvolution';
import PokeStats from './containers/PokeStats';

const CardContentStyled = styled(CardContent)`
  && {
    padding-top: 0px;
  }
`;

const LoadingContainer = styled.div`
  text-align: center;
`;

const GridMainInfo = styled(Grid)`
  && {
    margin-bottom: 10px;
  }
`;

const loadingSelector = createLoadingSelector([
  types.ActionTypes.FETCH_POKEMON_REQUEST
]);

function PokemonScreen() {
  const { id = '' } = useParams();
  const pokemon = useSelector(selectors.getPokemonById(parseInt(id)));
  const isFetching = useSelector(loadingSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEmpty(pokemon) && !isFetching) {
      dispatch(actions.fetchPokemon.request(parseInt(id)));
    }
  }, [dispatch, isFetching, id, pokemon]);

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
        <GridMainInfo container spacing={1} alignItems="center">
          <Grid item xs={12} sm={5} md={4}>
            <PokeImage />
          </Grid>
          <Grid item xs={12} sm={7} md={8}>
            <PokeStats />
          </Grid>
        </GridMainInfo>
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
