import React from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, SnackbarContent, Link } from '@material-ui/core';

import PokeCard from 'components/PokeCard';
import { actions, selectors } from 'store/ducks/pokedex';

const PokeCardList = React.memo(function PokeCardList() {
  const history = useHistory();
  const pokemons = useSelector(selectors.getCaughtPokemons);
  const dispatch = useDispatch();

  return (
    <Grid container spacing={1}>
      {pokemons.map(({ id, name, image }: any) => (
        <Grid item xs={6} md={4} key={id}>
          <PokeCard
            id={id}
            name={name}
            image={image}
            onSeeMoreClick={() => history.push(`/pokemons/${id}`)}
            onReleaseClick={() =>
              window.confirm(
                'Are you sure you want to release this pokémon?'
              ) && dispatch(actions.releasePokemon(id))
            }
          />
        </Grid>
      ))}
      {!pokemons.length && (
        <Grid item xs={12} container justify="center">
          <SnackbarContent
            message={
              <span data-testid="empty-message">
                You dont't have any pokemón yet. Let's find{` `}
                <Link
                  component={RouterLink}
                  to="/pokemons"
                  data-testid="hunting-link"
                >
                  here!
                </Link>
              </span>
            }
          />
        </Grid>
      )}
    </Grid>
  );
});

export default PokeCardList;
