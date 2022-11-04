import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles(() =>
  createStyles({
    accountAvatar: {
      width: '4rem',
      height: '4rem',
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
    buttonLayout: {
      display: 'flex',
      flex: '2',
    },
    buttonID: {
      border: 'none',
      background: 'none',
      color: '#fff',
      padding: '0',
      fontSize: '11px',
      cursor: 'pointer',
    },
    iconTwo: {
      flex: '1',
      display: 'flex',
      justifyContent: 'flex-end',
      fontSize: '1rem',
    },
    alias: {
      color: 'grey',
      fontSize: '1rem',
      paddingLeft: '0.8rem',
    },
    buttonLeftAlias: {
      display: 'flex',
      justifyContent: 'flex-start ',
    },
    buttonRightAlias: {
      display: 'none',
      justifyContent: 'flex-end',
      flex: '1',
    },
    id: {
      color: 'grey',
      fontSize: '1rem',
      paddingLeft: '0.8rem',
    },
    buttonLeftID: {
      display: 'flex',
      justifyContent: 'flex-start ',
    },
    buttonRightID: {
      display: 'none',
      justifyContent: 'flex-end',
      flex: '1',
    },
  })
);

export default useStyles;
