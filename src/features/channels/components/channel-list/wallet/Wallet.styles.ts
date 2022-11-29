import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles(
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
      height: '40px',
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
      flexDirection: 'column',
      width: '400px',
      padding: '2% 4%',
      '@media(max-width:768px)': {
        width: '300px',
      },
    },
    closeButton: {
      flexGrow: 1,
      alignSelf: 'flex-end',
      paddingBottom: '10px',
      backgroundColor: 'transparent !important',
      opacity: '1',
      '&:hover': {
        opacity: '0.8',
      },
    },
    jupQuantity: {
      flexGrow: 1,
      justifySelf: '',
    },
    closeIconContainer: {
      display: 'flex',
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
  })
);

export default useStyles;
