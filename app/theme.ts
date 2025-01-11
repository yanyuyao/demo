'use client';
import { createTheme } from '@mui/material/styles';
import './Oswald.css';
import { fontGrid } from '@mui/material/styles/cssUtils';

const theme = createTheme({
  cssVariables: true,
  typography: {
    fontFamily: ['Lato', 'Oswald'].join(','),
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        h2: {
          fontSize: '30px',
          lineHeight: '30px',
          fontWeight: '300',
          fontFamily: '"Lato", Arial, Tahoma, sans-serif',
          marginTop: '10px',
          marginBottom: '20px',
          color: '#444444',
        },
        h3: {
          fontSize: '24px',
          fontFamily: ['Oswald'].join(','),
        },
        h4: {
          fontSize: '20px',
          fontWeight: '300',
          fontFamily: '"Lato", Arial, Tahoma, sans-serif',
          lineHeight: '24px',
          color: '#444444',
        },
        h5: {
          fontSize: '20px',
          fontStyle: 'italic',
          marginBottom: '20px',
          fontFamily: ['Oswald'].join(','),
        },
        h6: {
          fontSize: '16px',
          fontStyle: 'italic',
          fontWeight: 'bold',
          marginBottom: '20px',
          fontFamily: ['Lato'].join(','),
        },
        subtitle1: {
          color: '#a8a8a8',
          fontSize: '16px',
        },
        subtitle2: {
          fontSize: '20px',
          fontFamily: ['Lato'].join(','),
        },
        body1: {
          fontSize: '13px',
          '&>p': {
            //for rich text body
            fontSize: '13px',
          },
        },
        body2: {
          fontSize: '13px',
          fontFamily: ['Lato'].join(','),
          '&>p': {
            fontFamily: ['Lato'].join(','),
          },
        },
      },
    },
  },
});

export default theme;
