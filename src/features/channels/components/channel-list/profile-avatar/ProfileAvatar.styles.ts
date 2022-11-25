import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles(() =>
  createStyles({
    accountAvatar: {
      width: '60px',
      height: '60px',
      justifyContent: 'flex-start',
    },
    icon: {
      color: 'white',
      fontSize: '96%',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      '-ms-transform': 'translate(-50%, -50%)',
      textAlign: 'center',
      opacity: '0',
      transition: 'all 0.2s ease',
      '&:hover': {
        opacity: '1',
      },
    },
    buttonID: {
      border: 'none',
      background: 'none',
      color: '#f2f2f2',
      padding: '0',
      fontSize: '0.8rem',
      cursor: 'pointer',
      opacity: '0.8',
      transition: 'ease-in-out 200ms',
      '&:hover': {
        opacity: '1',
      },
    },
    btnContainer: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      marginLeft: '10px',
    },
    Btn: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '1rem',
      marginBottom: '10px',
    },
    btnIcons: {
      fontSize: '1.4rem',
      color: '#61D90C',
      opacity: '0.8',
      transition: 'ease-in-out 200ms',
      '&:hover': {
        opacity: '1',
      },
    },
  })
);

export default useStyles;
