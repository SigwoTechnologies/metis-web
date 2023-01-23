import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles(() =>
  createStyles({
    term: {
      size: '1.4rem',
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
    closeIconContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      paddingBottom: '10px !important',
    },
    closeIcon: {
      opacity: '1',
      '&:hover': {
        cursor: 'pointer',
        opacity: '0.8',
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
