import React, { useEffect } from 'react';
import { Grid, SnackbarContent, LinearProgress } from '@material-ui/core';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash-es';
import { getType } from 'typesafe-actions';

import PokeCard from 'components/PokeCard';
import { actions, selectors } from '../state';
import {
  selectors as pokedexSelectors,
  actions as pokedexActions
} from 'store/ducks/pokedex';
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
  const pokemonFound = useSelector(selectors.getPokemonFound);
  const isFetching = useSelector(loadingSelector);
  const pokemonsCapturedIds = useSelector(pokedexSelectors.getCaughtPokemonsId);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    return () => {
      dispatch(actions.cleanSearchResult());
    };
  }, [dispatch]);

  const renderPokeCard = () => {
    const showReleaseBtn =
      !isEmpty(pokemonsCapturedIds) &&
      pokemonsCapturedIds.includes(pokemonFound.id);

    const handleReleaseClick = () => {
      if (window.confirm('Are you sure you want to release this pokémon?')) {
        dispatch(pokedexActions.releasePokemon(pokemonFound.id));
      }
    };

    const handleCatchClick = () => {
      dispatch(pokedexActions.catchPokemon(pokemonFound.id));
    };

    return (
      <PokeCard
        id={pokemonFound.id}
        name={pokemonFound.name}
        image={pokemonFound.image}
        onSeeMoreClick={() =>
          history.push(`/pokemons/${pokemonFound.id}`, {
            from: '/pokemons'
          })
        }
        onReleaseClick={showReleaseBtn ? handleReleaseClick : undefined}
        onCatchClick={!showReleaseBtn ? handleCatchClick : undefined}
      />
    );
  };

  return (
    <GridResultStyled container justify="center" spacing={0}>
      <Grid item xs={6} md={4}>
        {isFetching && <LinearProgress color="secondary" />}
        {!isEmpty(pokemonFound) && renderPokeCard()}
        {isEmpty(pokemonFound) && searched && (
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
