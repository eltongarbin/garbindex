import React from 'react';

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
  onSeeMoreClick: any;
  onReleaseClick?: any;
  onCatchClick?: any;
};

const PokeCard: React.FC<PokeCardProps> = ({
  image,
  id,
  name,
  onSeeMoreClick,
  onReleaseClick,
  onCatchClick
}) => {
  return (
    <Card data-testid="pokecard">
      <CardActionArea onClick={onSeeMoreClick}>
        <CardHeaderStyled
          title={name}
          subheader={`#${id}`}
          data-testid="pokecard-header"
        />
        <CardMediaStyled
          image={image}
          title={name}
          data-testid="pokecard-image"
        />
      </CardActionArea>
      <CardActionsStyled>
        <IconButton aria-label="See more" onClick={onSeeMoreClick}>
          <VisibilityIcon />
        </IconButton>
        {onReleaseClick && (
          <IconButton aria-label="Release" onClick={onReleaseClick}>
            <DeleteIcon />
          </IconButton>
        )}
        {onCatchClick && (
          <IconButton aria-label="Catch" onClick={onCatchClick}>
            <AddCircleIcon />
          </IconButton>
        )}
      </CardActionsStyled>
    </Card>
  );
};
export default PokeCard;
