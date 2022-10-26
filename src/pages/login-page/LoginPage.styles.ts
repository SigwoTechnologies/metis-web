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
  })
);

export default useStyles;
