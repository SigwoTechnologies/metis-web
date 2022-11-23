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
    btn: {
      display: 'flex',
      flexDirection: 'row',
      fontWeight: 700,
      textTransform: 'none',
      padding: '1% 3% 1% 3%',
    },
    btnContent: {
      height: '40px',
      width: '250px',
      display: 'flex',
      flexDirection: 'row',
      fontWeight: 700,
      textTransform: 'none',
      alignItems: 'center',
      justifyContent: 'center',
      '@media (max-width:500px)': {
        // eslint-disable-line no-useless-computed-key
        width: '250px',
      },
    },
    associate: {
      color: '#ccc',
      textDecoration: 'none',
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
    icon: {
      fontSize: '6rem',
    },
    iconContainer: {
      display: 'flex',
      justifyContent: 'center',
    },
  })
);

export default useStyles;
