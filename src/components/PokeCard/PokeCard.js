import React from 'react';
import PropTypes from 'prop-types';
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

function PokeCard({
  image,
  id,
  name,
  onSeeMoreClick,
  onReleaseClick,
  onCatchClick
}) {
  return (
    <Card>
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
}

PokeCard.propTypes = {
  image: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  onSeeMoreClick: PropTypes.func.isRequired,
  onReleaseClick: PropTypes.func,
  onCatchClick: PropTypes.func
};

export default PokeCard;
