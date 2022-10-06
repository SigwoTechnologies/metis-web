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
    infoBox: {
      width: '25rem',
    },
    infoLine: {
      display: 'flex',
    },
    infoLineLeft: {
      display: 'flex',
      justifyContent: 'flex-start',
    },
    infoLineRight: {
      display: 'flex',
      justifyContent: 'flex-end',
      flex: '1',
    },
    buttonID: {
      border: 'none',
      background: 'none',
      color: '#fff',
      padding: '0',
      fontSize: '16px',
      cursor: 'pointer',
    },
  })
);

export default useStyles;
