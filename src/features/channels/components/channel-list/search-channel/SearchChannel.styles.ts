import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    iconContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'end',
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
    },
  })
);

export default useStyles;
