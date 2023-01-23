import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      height: '80px',
      position: 'relative',
      '@media (max-width:900px)': {
        // eslint-disable-line no-useless-computed-key
        height: '40px',
      },
    },
    iconContainer: {
      height: '40px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'end',
      border: '1px solid transparent',
      borderRadius: '10px',
      transition: 'ease-in-out 200ms',
      backgroundColor: '#332F2E',
      '&:hover': {
        cursor: 'pointer',
        border: '1px solid #61D90C',
      },
    },
    textField: {
      width: '100%',
      marginBottom: '0',
      size: '2rem',
    },
    button: {
      alignItems: 'end',
    },
    iconContainerUnlink: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      marginBottom: '1rem',
    },
    account: {
      display: 'flex',
      position: 'relative',
      width: '100%',
      height: '5.6rem',
      alignItems: 'center',
      justifyContent: 'flex-start',
      borderBottom: '1px solid #61D90C',
      paddingBottom: '10px 0',
    },
    accountAvatar: {
      width: '60px',
      height: '60px',
      justifyContent: 'flex-start',
    },
    termPosition: {
      display: 'flex',
      justifyContent: 'flex-start',
      borderTop: '1px solid #61D90C',
      paddingTop: '10px',
    },
    term2: {
      size: '2rem',
      padding: '0.5rem',
    },
    term: {
      marginTop: '10px',
    },
    link: {
      fontSize: '0.8rem',
      cursor: 'pointer',
      textDecoration: 'none',
      color: '#555b6e',
      padding: '15px',
      marginTop: '10px',
      borderRadius: '8px',
      transition: 'ease-in-out 200ms',
      '&:hover': {
        color: '#f2f2f2',
        backgroundColor: '#232323',
      },
    },
    drawerLetters: {
      fontSize: '0.5rem !important',
    },
    upperGroup: {
      flexGrow: 1,
    },
    inputText: {
      borderRadius: '1rem',
    },
    cardContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '0.01rem',
    },
    cardContent: {
      justifyContent: 'flex-start',
      fontSize: '2rem',
    },
    actionContainer: {
      justifyContent: 'flex-end',
      padding: '0.8rem',
    },
    listItemIcon: {
      color: `${theme.colors.green5}`,
    },
    logout: {
      color: '#ec5151',
      textAlign: 'left',
    },
    unlink: {
      color: 'yellow',
      textAlign: 'left',
    },
    wrapper: {
      backgroundColor: theme.palette.background.default,
    },
    container: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    span: {
      fontWeight: 700,
      fontSize: '.8rem',
      textTransform: 'none',
    },
    associate: {
      color: '#ccc',
      textDecoration: 'none',
    },
    loading: {
      clipPath: 'inset(0 1ch 0 0)',
      animation: '$l 1s steps(4) infinite',
    },
    '@keyframes l': {
      to: {
        clipPath: 'inset(0 -1ch 0 0)',
      },
    },
    icon: {
      fontSize: '6rem',
    },
    closeButton: {
      position: 'absolute',
      top: '0',
      right: '0',
    },
    listItemButton: {
      borderRadius: '10px',
      height: '60px',
      minHeight: '60px',
      marginBottom: '10px',
      transition: 'ease-in-out 200ms',
    },
    inputSearch: {
      paddingTop: '.8rem',
      width: '100%',
      height: '90%',
      top: '0',
      '& input::placeholder': {
        fontSize: '15px',
      },
    },
    closeIconContainer: {
      display: 'flex',
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
