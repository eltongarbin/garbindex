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

type PokeCardProps = {
  image: string;
  id: number;
  name: string;
  onSeeMoreClick: (event: MouseEvent<HTMLElement>) => void;
  onReleaseClick?: (event: MouseEvent<HTMLElement>) => void;
  onCatchClick?: (event: MouseEvent<HTMLElement>) => void;
};

const PokeCard = (props: PokeCardProps) => (
  <Card data-testid="pokecard">
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
      {props.onReleaseClick && (
        <IconButton aria-label="Release" onClick={props.onReleaseClick}>
          <DeleteIcon />
        </IconButton>
      )}
      {props.onCatchClick && (
        <IconButton aria-label="Catch" onClick={props.onCatchClick}>
          <AddCircleIcon />
        </IconButton>
      )}
    </CardActionsStyled>
  </Card>
);

export default PokeCard;
