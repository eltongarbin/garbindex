import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      main: '#ef5350'
    },
    secondary: {
      main: '#FFC81A'
    }
  }
});

export default theme;
