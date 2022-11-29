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
      height: '40px',
      width: '100%',
      marginBottom: '1rem',
      textTransform: 'capitalize',
      fontSize: '1.2rem',
      fontWeight: '600',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon: {
      flex: '1',
      display: 'flex',
      justifyContent: 'flex-end',
      fontSize: '1.2rem',
      color: '#61D90C',
    },
    idTitle: {
      textAlign: 'center',
    },
    paragraph: {
      fontSize: '1rem',
      borderBottom: '1px solid #61D90C',
      paddingBottom: '10px',
    },
    closeIconContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      padding: '10px !important',
    },
    closeIcon: {
      opacity: '1',
      '&:hover': {
        cursor: 'pointer',
        opacity: '0.8',
      },
    },
    btn: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: '0 0 10px',
      backgroundColor: 'transparent',
      border: 'none',
      color: '#FFF',
      opacity: '1',
      transition: 'ease-in-out 200ms',
      '&:hover': {
        cursor: 'pointer',
        opacity: '0.6',
      },
    },
  })
);

export default useStyles;
