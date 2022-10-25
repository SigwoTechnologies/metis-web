import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles(() =>
  createStyles({
    term: {
      size: '2rem',
      padding: '0.5rem',
      cursor: 'pointer',
      color: '#555b6e',
      textDecoration: 'underline',
    },
    button: {
      width: '100%',
      marginBottom: '1rem',
      textTransform: 'capitalize',
    },
    icon: {
      flex: '1',
      display: 'flex',
      justifyContent: 'flex-end',
      fontSize: '1.2rem',
    },
    idTitle: {
      textAlign: 'center',
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
    paragraph: {
      fontSize: '1rem',
    },
  })
);

export default useStyles;
