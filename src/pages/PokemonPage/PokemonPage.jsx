import React from 'react';
import { Card, IconButton, CardContent } from '@material-ui/core';
import { AddCircle as AddCircleIcon } from '@material-ui/icons';
import styled from 'styled-components';

import { withPageLayout } from 'components/PageLayout';
import HeaderInfo from './containers/HeaderInfo';
import PokeImage from './containers/PokeImage';
import PokeTypes from './containers/PokeTypes';
import PokeProfile from './containers/PokeProfile';
import PokeEvolutions from './containers/PokeEvolutions';

const CardContentStyled = styled(CardContent)`
  && {
    padding-top: 0px;
  }
`;

function PokemonPage() {
  return (
    <Card>
      <HeaderInfo
        action={
          <IconButton aria-label="Catch">
            <AddCircleIcon />
          </IconButton>
        }
        title="Charizard"
        subheader="#1"
      />
      <CardContentStyled>
        <PokeImage />
        <PokeTypes />
        <PokeProfile />
        <PokeEvolutions />
      </CardContentStyled>
    </Card>
  );
}

export default withPageLayout({ title: 'Pokémon Detail', backTo: '/' })(
  PokemonPage
);
