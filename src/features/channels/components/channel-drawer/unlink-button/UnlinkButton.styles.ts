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
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'end',
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
      position: 'relative',
      paddingLeft: '0.75rem',
      width: '100%',
      height: '5.6rem',
      display: 'flex',
      alignItems: 'center',
    },
    accountAvatar: {
      width: '4rem',
      height: '4rem',
      justifyContent: 'flex-start',
    },
    termPosition: {
      display: 'flex',
      justifyContent: 'flex-start',
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
      color: '#FFF',
      textAlign: 'left',
      fontWeight: '400',
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
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      fontWeight: '600',
      fontSize: '1rem',
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
      marginBottom: '5px',
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
