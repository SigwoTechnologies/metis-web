import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    createButton: {
      width: '3.7rem',
      height: '3.7rem',
      position: 'absolute',
      margin: '1rem',
      bottom: 0,
      right: 0,
      '&:hover': {
        cursor: 'pointer',
      },
    },
    button: {
      width: '100%',
      marginBottom: '1rem',
      textTransform: 'capitalize',
    },
    title: {
      marginLeft: '1rem',
      cursor: 'pointer',
      transition: 'ease-in-out 200ms',
      '&:hover': {
        cursor: 'pointer',
        color: '#61D90C',
      },
    },
    textField: {
      width: '100%',
      marginBottom: '2rem',
    },
    drawerContainer: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      width: '400px',
      padding: '2% 4%',
      gap: '.5rem',
      '@media(max-width:768px)': {
        width: '300px',
      },
    },
    closeBox: {
      display: 'flex',
      alignItems: 'center',
      paddingBottom: '1rem',
      color: theme.palette.grey[500],
      justifyContent: 'space-between',
      '& > span': {
        fontSize: '1.5rem',
      },
    },
    avatar: {
      flexGrow: 1,
      alignSelf: 'center',
      width: '11rem',
      height: '11rem',
      fontSize: '5rem',
      cursor: 'pointer',
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
    avatarBox: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '1rem',
      fontSize: '1.4rem',
      borderBottom: '1px solid #61D90C',
      paddingBottom: '20px',
    },
    member: {
      width: '15rem',
      marginBottom: '0.5rem',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
  })
);

export default useStyles;
