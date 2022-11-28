import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles(() =>
  createStyles({
    term: {
      fontSize: '0.8rem',
      cursor: 'pointer',
      textDecoration: 'none',
      color: '#555b6e',
      padding: '10px',
      borderRadius: '8px',
      transition: 'ease-in-out 200ms',
      '&:hover': {
        color: '#f2f2f2',
        backgroundColor: '#232323',
      },
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
  })
);

export default useStyles;
