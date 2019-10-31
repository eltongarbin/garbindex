import React from 'react';
import PropTypes from 'prop-types';
import {
  Camera as CameraIcon,
  Done as DoneIcon,
  Clear as ClearIcon
} from '@material-ui/icons';
import { GridListTileBarStyled } from './PokeImageStyled';
import { IconButton } from '@material-ui/core';

function PokeCameraControls({
  isCaptured,
  onCapture,
  onCancel,
  onConfirm,
  onClear
}) {
  if (!isCaptured) {
    return (
      <GridListTileBarStyled
        actionIcon={
          <>
            <IconButton onClick={onCapture}>
              <CameraIcon />
            </IconButton>
            <IconButton onClick={onCancel}>
              <ClearIcon />
            </IconButton>
          </>
        }
      />
    );
  }

  return (
    <GridListTileBarStyled
      actionIcon={
        <>
          <IconButton onClick={onConfirm}>
            <DoneIcon />
          </IconButton>
          <IconButton onClick={onClear}>
            <ClearIcon />
          </IconButton>
        </>
      }
    />
  );
}

PokeCameraControls.propTypes = {
  isCaptured: PropTypes.bool,
  onCapture: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired
};

export default PokeCameraControls;
