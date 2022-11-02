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
    span: {
      fontWeight: 700,
      fontSize: '.8rem',
      textTransform: 'none',
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
    closeButton: {
      position: 'absolute',
      top: '0',
      right: '0',
    },
    iconContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      marginBottom: '1rem',
    },
  })
);

export default useStyles;
