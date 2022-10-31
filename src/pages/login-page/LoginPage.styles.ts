import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      backgroundColor: theme.palette.background.default,
    },
    container: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      height: '10rem',
      width: '10rem',
      marginBottom: '3rem',
      objectFit: 'cover',
      borderRadius: '100%',
    },
    associate: {
      color: '#ccc',
      textDecoration: 'none',
    },
    span: {
      fontWeight: 700,
      fontSize: '14px',
    },
    loading: {
      clipPath: 'inset(0 1ch 0 0)',
      animation: '$l 1s steps(4) infinite',
    },
    '@keyframes l': {
      to: {
        clipPath: 'inset(0 -1ch 0 0)',
      },
    },
    spinner: {
      alignSelf: 'center',
    },
    accountLetter: {
      textAlign: 'center',
      fontSize: '1rem',
      color: 'gray',
    },
    eth: {
      textAlign: 'center',
      fontSize: '0.85rem',
      color: 'gray',
      transition: 'all 0.3s ease',
      '&:hover:before': {
        transform: 'scale(1.2)',
        boxShadow: '0 0 20px green',
        filter: 'blur(3px)',
      },
      '&:hover': {
        color: '#AAFF00',
        textShadow: '0 0 15px white',
        fontSize: '1rem',
      },
    },
  })
);

export default useStyles;
