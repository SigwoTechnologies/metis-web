import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      backgroundColor: theme.palette.background.default,
    },
    container: {
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    txtContainer: {
      width: '100%',
      textAlign: 'center',
    },
    title: {
      color: '#FFF',
      fontSize: '2.2rem',
      letterSpacing: '1px',
      marginBottom: '5px',
      '@media (max-width:500px)': {
        // eslint-disable-line no-useless-computed-key
        fontSize: '1.8rem',
      },
    },
    text: {
      color: '#f2f2f2',
      fontSize: '1.2rem',
      fontWeight: '300',
      marginBottom: '25px',
      '@media (max-width:500px)': {
        // eslint-disable-line no-useless-computed-key
        fontSize: '0.8rem',
      },
    },
    image: {
      height: '200px',
      width: '200px',
      marginBottom: '50px',
      objectFit: 'cover',
      borderRadius: '100%',
      '@media (max-width:500px)': {
        // eslint-disable-line no-useless-computed-key
        height: '100px',
        width: '100px',
      },
    },
    associate: {
      minWidth: '280px',
      color: '#ccc',
      textDecoration: 'none',
    },
    span: {
      fontWeight: 700,
      fontSize: '1.4rem',
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
      color: '#61D90C',
    },
    accountLetter: {
      textAlign: 'center',
      fontSize: '1.2rem',
      color: '#F2F2F2',
      '@media (max-width:500px)': {
        // eslint-disable-line no-useless-computed-key
        fontSize: '1.2rem',
      },
    },
    eth: {
      textAlign: 'center',
      fontSize: '1.4rem',
      color: 'gray',
      '&:hover': {
        cursor: 'pointer',
        color: '#0DC7FA',
      },
      '@media (max-width:500px)': {
        // eslint-disable-line no-useless-computed-key
        fontSize: '0.8rem',
      },
    },
  })
);

export default useStyles;
