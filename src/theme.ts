'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Open Sans'
  },
  palette: {
    primary:{
        main:'#F63049',
        contrastText:'#8c8a8a'
    }
  },
  components:{
    MuiCssBaseline:{
      styleOverrides:{
        p:{
          color:"#7F7F90",
          fontSize:"20px"
        },
        body:{
          paddingTop:"70px"
        }
      }
    },
  }
});

export default theme;

// & material ui integration with next js ==> for making style that all app will see