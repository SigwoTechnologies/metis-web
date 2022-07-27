import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles(() =>
  createStyles({
    createButton: {
      width: '3.7rem',
      height: '3.7rem',
      position: 'absolute',
      bottom: 0,
      right: '1rem',
      '&:hover': {
        cursor: 'pointer',
      },
    },
    button: {
      width: '100%',
      marginBottom: '1rem',
    },
    drawerContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      height: '100%',
    },
    textField: {
      width: '100%',
      marginBottom: '2rem',
    },
  })
);

export default useStyles;
