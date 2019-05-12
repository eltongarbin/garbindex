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
  classes,
  image,
  id,
  name,
  onSeeMoreClick,
  onDeleteClick,
  onCatchClick
}) {
  return (
    <Card>
      <CardActionArea onClick={onSeeMoreClick}>
        <CardHeaderStyled title={name} subheader={`#${id}`} />
        <CardMediaStyled image={image} title={name} />
      </CardActionArea>
      <CardActionsStyled>
        <IconButton aria-label="See more" onClick={onSeeMoreClick}>
          <VisibilityIcon />
        </IconButton>
        {onDeleteClick && (
          <IconButton aria-label="Delete" onClick={onDeleteClick}>
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
  onDeleteClick: PropTypes.func,
  onCatchClick: PropTypes.func
};

export default PokeCard;
