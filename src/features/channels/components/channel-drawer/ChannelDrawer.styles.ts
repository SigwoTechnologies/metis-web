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
      border: 'solid 1px #61D90C',
      borderRadius: '10px',
      transition: 'ease-in-out 200ms',
      '&:hover': {
        cursor: 'pointer',
        backgroundColor: '#332F2E',
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
    term: {
      size: '2rem',
      padding: '0.5rem',
      cursor: 'pointer',
      color: '#555b6e',
      textDecoration: 'underline',
    },

    term2: {
      size: '2rem',
      padding: '0.5rem',
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
  })
);

export default useStyles;