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
    transaction: {
      fontSize: '1.2rem',
      fontWeight: '400',
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
    listItem: {
      marginBottom: '10px',
    },
    listItemIcon: {
      color: `${theme.colors.green5}`,
    },
    spinner: {
      alignSelf: 'center',
    },
    listItemButton: {
      padding: '0 !important',
      transition: 'ease-in-out 200ms',
      width: '100%',
      '&:hover': {
        backgroundColor: 'transparent !important',
      },
    },
    renderedItem: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      height: '100%',
      width: '100%',
      justifyContent: 'flex-start',
      padding: '2% 4%',
      borderRadius: '10px',
      opacity: '1',
      transition: 'ease-in-out 200ms',
      '&:hover': {
        opacity: '0.8',
      },
    },
  })
);

export default useStyles;
