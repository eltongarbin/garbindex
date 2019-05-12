import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';

function RootPage() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Test Theme
          </Typography>
        </Toolbar>
      </AppBar>
      <div>
        <p>My content will be here :)</p>
        <Button color="secondary" variant="contained">
          Test secondary color
        </Button>
      </div>
    </div>
  );
}

export default RootPage;
