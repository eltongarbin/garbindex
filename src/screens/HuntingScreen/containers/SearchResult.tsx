import React, { useEffect } from 'react';
import { Grid, SnackbarContent, LinearProgress } from '@material-ui/core';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getType } from 'typesafe-actions';

import PokeCard from 'components/PokeCard';
import { actions, selectors } from '../state';
import { actions as pokedexActions } from 'store/ducks/pokedex';
import { createLoadingSelector } from 'store/ducks/loading/selectors';

export const GridResultStyled = styled(Grid)`
  && {
    margin-top: 10px;
  }
`;

const loadingSelector = createLoadingSelector([
  getType(actions.searchForPokemon.request)
]);

const SearchResult = React.memo(() => {
  const searched = useSelector(selectors.hasSearched);
  const pokemon = useSelector(selectors.getFoundedPokemon);
  const isFetching = useSelector(loadingSelector);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    return () => {
      dispatch(actions.cleanSearchResult());
    };
  }, [dispatch]);

  const onChangeState = () => {
    if (!pokemon) return;

    if (!pokemon.isCaptured)
      return dispatch(pokedexActions.catchPokemon(pokemon.id));

    if (window.confirm('Are you sure you want to release this pokémon?')) {
      dispatch(pokedexActions.releasePokemon(pokemon.id));
    }
  };

  return (
    <GridResultStyled container justify="center" spacing={0}>
      <Grid item xs={6} md={4}>
        {isFetching && <LinearProgress color="secondary" />}
        {pokemon && (
          <PokeCard
            id={pokemon.id}
            name={pokemon.name}
            image={pokemon.image}
            onSeeMoreClick={() => history.push(`/pokemons/${pokemon.id}`)}
            captureState={{
              nextState: pokemon.isCaptured ? 'Release' : 'Catch',
              onChange: onChangeState
            }}
          />
        )}
        {!pokemon && searched && (
          <SnackbarContent
            message="Sorry, we did'nt find the pokémon. Try new search!"
            data-testid="empty-message"
          />
        )}
      </Grid>
    </GridResultStyled>
  );
});

export default SearchResult;
