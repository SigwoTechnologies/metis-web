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
      transition: 'ease-in-out 300ms',
      '&:hover': {
        cursor: 'pointer',
        transform: 'rotate(180deg)',
      },
      '@media(max-width:768px)': {
        width: '40px',
        height: '40px',
      },
    },
    button: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      marginBottom: '1rem',
      textTransform: 'capitalize',
      fontWeight: '600',
    },
    textField: {
      width: '100%',
      marginBottom: '2rem',
    },
    drawerContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      width: '400px',
      height: '100%',
      flexDirection: 'column',
      padding: '0 4% 0 4%',
      '@media(max-width: 768px)': {
        width: '300px',
      },
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
    inputSearch: {
      display: 'flex',
      height: '40px',
      width: '100%',
      top: '0',
      marginBottom: '25px',
      '& input::placeholder': {
        fontSize: '16px',
      },
    },
    textInput: {
      '&::before': {
        border: '0px !important',
      },
      borderRadius: '10px',
      borderBottom: '1px solid transparent',
      transition: 'linear 200ms',
      '&:hover': {
        borderBottom: '1px solid #61D90C',
      },
      '&::after': {
        border: '0px !important',
        borderRadius: '10px',
      },
    },
    textInputTxt: {
      padding: '0 !important',
      paddingLeft: '0 !important',
    },
  })
);

export default useStyles;
