import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles(() =>
  createStyles({
    createButton: {
      width: '4.68rem',
      height: '4.69rem',
      position: 'absolute',
      top: '-0.5rem',
      right: '-0.5rem',
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
