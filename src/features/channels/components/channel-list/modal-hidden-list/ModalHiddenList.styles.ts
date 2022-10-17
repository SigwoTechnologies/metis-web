import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles(() =>
  createStyles({
    cardContainer: {
      all: 'unset',
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      padding: '0.01rem',
      // backgroundColor: 'red',
    },
    cardContent: {
      justifyContent: 'flex-start',
      alignContent: 'center',
      fontSize: '1rem',
      // backgroundColor: 'green',
    },
    actionContainer: {
      justifyContent: 'flex-end',
      padding: '0.8rem',
      // backgroundColor: 'blue',
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
      padding: '0 !important',
      margin: '0 !important',
      position: 'relative',
      // display: 'block',
      width: '1.7rem',
      height: '0.7rem',
      textAlign: 'center',
      lineHeight: '2rem',
      // background: '#171515',
      borderRadius: '50%',
      fontSize: '1rem',
      color: '#666',
      transition: '.5s',

      '&:before': {
        padding: '0 !important',
        margin: '0 !important',
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
