import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import hacenMaghrebttf from '../static/fonts/Hacen-Maghreb-Lt.ttf';

// The Default Font Used For Arabic Language
const hacenMaghreb = {
  fontFamily: 'Hacen-Maghreb',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `url(${hacenMaghrebttf})`
};

// Create a theme instance.
const theme = createMuiTheme({
  direction: 'rtl',
  typography: {
    fontFamily: 'Hacen-Maghreb'
  },
  overrides: {
    MuiCssBaseline: {
      '@global': { '@font-face': [hacenMaghreb] }
    }
  },
  palette: {
    primary: {
      main: '#31c4bc',
      contrastText: '#fff'
    },
    secondary: {
      main: '#f50057'
    },
    error: {
      main: red.A400
    },
    background: {
      default: '#fff'
    }
  }
});

export default theme;
