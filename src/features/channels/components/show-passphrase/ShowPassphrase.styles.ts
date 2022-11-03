import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

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
    iconHeader: {
      fontSize: '6rem',
    },
    icon: {
      flex: '1',
      display: 'flex',
      justifyContent: 'flex-end',
      fontSize: '1.2rem',
    },
    closeButton: {
      position: 'absolute',
      top: '0',
      right: '0',
    },
    subtitle: { color: 'grey', fontSize: '1rem', textAlign: 'center' },
    text: {
      textAlign: 'center',
      paddingBottom: '1rem',
    },
    buttonLayout: {
      display: 'flex',
    },
    buttonID: {
      border: 'none',
      background: 'none',
      color: '#fff',
      padding: '0',
      fontSize: '16px',
      cursor: 'pointer',
    },
    buttonLeft: {
      display: 'flex',
      justifyContent: 'flex-start ',
    },
    buttonRight: {
      display: 'flex',
      justifyContent: 'flex-end',
      flex: '1',
    },
  })
);

export default useStyles;
