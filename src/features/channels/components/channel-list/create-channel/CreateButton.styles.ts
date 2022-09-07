import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
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
  })
);

export default useStyles;
