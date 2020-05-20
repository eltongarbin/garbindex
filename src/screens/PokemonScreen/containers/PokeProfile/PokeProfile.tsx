import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import usePokemonId from '../../hooks/usePokemonId';
import Segregator from '../../components/Segregator';
import PokeAbilities from './PokeAbilities';
import { selectors } from 'store/ducks/pokemons';

const Content = styled.div`
  margin-bottom: 10px;
`;

const convertoToMeters = (height: number) => height / 10;

function PokeProfile() {
  const pokemonId = usePokemonId();
  const { height, weight } = useSelector(selectors.getPokemonById(pokemonId));

  return (
    <Content>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Segregator title="Profile" />
        </Grid>
        <Grid item xs={12} container spacing={1}>
          <Grid item xs>
            <Typography variant="subtitle2">Height</Typography>
            <Typography variant="body2" data-testid="poke-height">
              {convertoToMeters(height)} m
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography variant="subtitle2">Weight</Typography>
            <Typography variant="body2" data-testid="poke-weight">
              {weight} kg
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle2">Abilities</Typography>
        <PokeAbilities />
      </Grid>
    </Content>
  );
}

export default PokeProfile;
