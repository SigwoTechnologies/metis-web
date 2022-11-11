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
      transition: 'all ease .5s',
      '&:hover': {
        cursor: 'pointer',
        transform: 'scale(1.2)',
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
      width: 400,
      padding: '0 1rem 0 1rem',
      gap: '.5rem',
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
