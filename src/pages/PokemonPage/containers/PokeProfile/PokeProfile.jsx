import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import styled from 'styled-components';

import Segregator from '../../components/Segregator';
import PokeAbilities from './PokeAbilities';

const Content = styled.div`
  margin-bottom: 10px;
`;

function PokeProfile() {
  return (
    <Content>
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <Segregator title="Profile" />
        </Grid>
        <Grid item xs={12} container spacing={8}>
          <Grid item xs>
            <Typography variant="subtitle2">Height</Typography>
            <Typography variant="body2">0.3 em</Typography>
          </Grid>
          <Grid item xs>
            <Typography variant="subtitle2">Weight</Typography>
            <Typography variant="body2">8.5 kg</Typography>
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
