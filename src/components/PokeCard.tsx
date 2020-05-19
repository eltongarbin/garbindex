import React, { MouseEvent } from 'react';
import { Card, IconButton, CardActionArea } from '@material-ui/core';
import {
  Visibility as VisibilityIcon,
  Delete as DeleteIcon,
  AddCircle as AddCircleIcon
} from '@material-ui/icons';

import {
  CardHeaderStyled,
  CardMediaStyled,
  CardActionsStyled
} from './PokeCardStyled';

type CaptureStates = 'Release' | 'Catch';

type PokeCardProps = {
  image: string;
  id: number;
  name: string;
  captureState: {
    nextState: CaptureStates;
    onChange: (event: MouseEvent<HTMLElement>) => void;
  };
  onSeeMoreClick: (event: MouseEvent<HTMLElement>) => void;
};

const PokeCard = (props: PokeCardProps) => (
  <Card data-testid={`pokecard-${props.id}`}>
    <CardActionArea onClick={props.onSeeMoreClick}>
      <CardHeaderStyled
        title={props.name}
        subheader={`#${props.id}`}
        data-testid="pokecard-header"
      />
      <CardMediaStyled
        image={props.image}
        title={props.name}
        data-testid="pokecard-image"
      />
    </CardActionArea>
    <CardActionsStyled>
      <IconButton aria-label="See more" onClick={props.onSeeMoreClick}>
        <VisibilityIcon />
      </IconButton>
      <IconButton
        aria-label={props.captureState.nextState}
        onClick={props.captureState.onChange}
      >
        {props.captureState.nextState === 'Release' && <DeleteIcon />}
        {props.captureState.nextState === 'Catch' && <AddCircleIcon />}
      </IconButton>
    </CardActionsStyled>
  </Card>
);

export default PokeCard;
