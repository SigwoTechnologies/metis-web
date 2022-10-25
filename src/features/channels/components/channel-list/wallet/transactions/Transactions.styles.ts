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
    closeButton: {
      flexGrow: 1,
      alignSelf: 'flex-end',
      paddingBottom: '1rem',
      color: theme.palette.grey[500],
    },
    jupQuantity: {
      flexGrow: 1,
      justifySelf: '',
    },
    listItemIcon: {
      color: `${theme.colors.green5}`,
    },
    spinner: {
      alignSelf: 'center',
    },
  })
);

export default useStyles;
