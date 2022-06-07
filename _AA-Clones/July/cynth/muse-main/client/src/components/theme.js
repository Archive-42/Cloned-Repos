import { createMuiTheme } from '@material-ui/core/styles';



const theme = createMuiTheme({
  root: {
    backgroundColor: 'red',
    '&.MuiAccordionSummary-content': { backgroundColor: 'blue' },
    
  },
  
  palette: {
    primary: {
      main: '#8aacc8',
      light: '#bbdefb',
      lighter: '#d8f9ff',
      dark: '#7b9bba',
      transparent: 'rgba(187, 222, 251, .8)',
    },
    secondary: {
      main: '#1a237e',
      light: '#534bae',
      dark: '#000051'
    },
    warning: {
      main: '#d32f2f',
      light: '#ff6659',
      dark: '#9a0007'
    },
    backgroundColor: 'rgba(255,255,255,.7)',
    darkerBackgroundColor: 'rgba(210,210,210,.7)',
    lightGrey: '#aaa',
    darkGrey: '#777',
  },
  font: {
    header: `'Sonsie One', cursive`,
    text: `'Montserrat', helvetica, sans-serif`,
  }
  
  
})

export default theme;








  // typography: {
  //   fontFamily: font,
  // },
  // overrides: {
  //   AppBar: {
  //     height: 25
  //   },
  // }