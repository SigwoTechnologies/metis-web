import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles(() =>
  createStyles({
    cardContainer: {
      all: 'unset',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0.01rem',
    },
    cardContent: {
      justifyContent: 'flex-start',
      alignItems: 'center',
      fontSize: '1.5rem',
      pointerEvents: 'none',
      width: '100%',
    },
    // info: {
    //   display: 'flex',
    //   justifyContent: 'space-between',
    //   alignItems: 'center',
    // },
    actionContainer: {
      justifyContent: 'flex-end',
      padding: '0.8rem',
    },
    nothingMessage: {
      display: 'flex',
      justifyContent: 'center',
      fontSize: '1rem',
      color: 'grey',
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
      transition: '.5s',

      '&:before': {
        content: '',
        position: 'absolute',
        top: '0rem',
        left: '0rem',
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        background: 'green',
        transition: '.5s',
        transform: 'scale(.9)',
        zIndex: '-1',
      },
      '&:hover:before': {
        transform: 'scale(1.2)',
        boxShadow: '0 0 20px green',
        filter: 'blur(3px)',
      },
      '&:hover': {
        color: '#AAFF00',
        boxShadow: '0 0 15px white',
        textShadow: '0 0 15px white',
      },
    },
  })
);

export default useStyles;
