import React from 'react';
import { Grid, Typography, LinearProgress } from '@material-ui/core';

function getPercentage(value) {
  return Math.round((value * 100) / 300);
}

type PokeStatsListItemProps = {
  name: string;
  value: number;
};

const PokeStatsListItem: React.FC<PokeStatsListItemProps> = ({
  name,
  value
}) => {
  return (
    <Grid item xs={12}>
      <Typography component="label">
        {name} - {value}
      </Typography>
      <LinearProgress variant="determinate" value={getPercentage(value)} />
    </Grid>
  );
};

export default PokeStatsListItem;
