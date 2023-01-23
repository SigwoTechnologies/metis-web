import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles(() =>
  createStyles({
    cardContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: '20px',
      opacity: '0.8',
      transition: 'ease-in-out 200ms',
      '&:hover': {
        opacity: '1',
      },
    },
    cardContent: {
      justifyContent: 'flex-start',
      alignItems: 'center',
      fontSize: '1.4rem',
      pointerEvents: 'none',
      width: '100%',
    },
    closeIconContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      padding: '0 !important',
    },
    closeIcon: {
      transition: 'ease-in-out 200ms',
      opacity: '0.8',
      '&:hover': {
        cursor: 'pointer',
        opacity: '1',
      },
    },
    actionContainer: {
      justifyContent: 'flex-end',
      padding: '0.8rem',
      paddingRight: '0 !important',
    },
    nothingMessage: {
      display: 'flex',
      justifyContent: 'center',
      fontSize: '1rem',
      color: 'grey',
      padding: '20px 0',
    },
    glow: {
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      width: '1.7rem',
      height: '0.7rem',
      textAlign: 'center',
      lineHeight: '2rem',
      borderRadius: '50%',
      fontSize: '1rem',
      color: '#666',
      transition: 'ease-in-out 200ms',
      '&:hover': {
        cursor: 'pointer',
        color: '#53b30f',
      },
    },
  })
);

export default useStyles;
