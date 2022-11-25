import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    createButton: {
      width: '60px',
      height: '60px',
      position: 'absolute',
      margin: '1rem',
      bottom: '10px',
      right: '10px',
      opacity: '1',
      transition: 'ease-in-out 300ms',
      '&:hover': {
        cursor: 'pointer',
        opacity: '0.8',
        transform: 'rotate(180deg)',
      },
    },
    button: {
      width: '100%',
      marginBottom: '1rem',
      textTransform: 'capitalize',
    },
    textField: {
      width: '100%',
      marginBottom: '2rem',
    },
    drawerContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      width: 400,
      height: '100%',
      flexDirection: 'column',
      padding: '0 1rem 0 1rem',
    },
    closeButton: {
      position: 'absolute',
      right: 8,
      top: 8,
      color: theme.palette.grey[500],
    },
    avatar: {
      flexGrow: 1,
      alignSelf: 'center',
      width: '9rem',
      height: '9rem',
      fontSize: '5rem',
    },
    avatarBox: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1rem',
      fontSize: '1.2rem',
    },
  })
);

export default useStyles;
