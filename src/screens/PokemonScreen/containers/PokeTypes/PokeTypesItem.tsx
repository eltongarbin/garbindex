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
import { isEmpty } from 'lodash-es';

import {
  LinearProgressStyled,
  ExpansionPanelDetailsStyled
} from '../../components/Styles';

const ChipStyled = styled(Chip)`
  &&& {
    margin: 2px;
  }
`;

type PokeTypesItemProps = {
  name: string;
  expanded: boolean;
  pokemons?: ReadonlyArray<{ id: number; name: string }>;
  onToggle: (event: React.ChangeEvent<{}>, expanded: boolean) => void;
};

const PokeTypesItem = (props: PokeTypesItemProps) => (
  <Grid item xs={12} sm={6}>
    <ExpansionPanel
      expanded={props.expanded}
      onChange={props.onToggle}
      elevation={1}
    >
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{props.name}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetailsStyled>
        {props.pokemons &&
          props.pokemons.map(({ id, name }) => (
            <ChipStyled label={name} key={id} color="secondary" />
          ))}
        {isEmpty(props.pokemons) && <LinearProgressStyled color="secondary" />}
      </ExpansionPanelDetailsStyled>
    </ExpansionPanel>
  </Grid>
);

export default PokeTypesItem;
