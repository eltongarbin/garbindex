import React from 'react';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  Grid,
  Chip
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import styled from 'styled-components';

import {
  LinearProgressStyled,
  ExpansionPanelDetailsStyled
} from '../../components/Styles';

const ChipStyled = styled(Chip)`
  && {
    margin: 2px;
  }
`;

type PokeTypesItemProps = {
  name: string;
  pokemons?: any[];
  expanded: boolean;
  onToggle: (...args: any[]) => any;
};

const PokeTypesItem: React.SFC<PokeTypesItemProps> = ({
  name,
  pokemons = [],
  expanded,
  onToggle
}) => {
  return (
    <Grid item xs={12} sm={6}>
      <ExpansionPanel expanded={expanded} onChange={onToggle} elevation={1}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{name}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetailsStyled>
          {pokemons.map(({ id, name }) => (
            <ChipStyled label={name} key={id} color="secondary" />
          ))}
          {!pokemons.length && <LinearProgressStyled color="secondary" />}
        </ExpansionPanelDetailsStyled>
      </ExpansionPanel>
    </Grid>
  );
};

export default PokeTypesItem;
