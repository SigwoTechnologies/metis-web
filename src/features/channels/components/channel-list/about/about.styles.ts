import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles(() =>
  createStyles({
    iconContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'end',
    },
    account: {
      width: '10%',
      display: 'flex',
      alignItems: 'center',
    },
    accountAvatar: {
      width: '3rem',
      height: '3rem',
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
    },
    actionContainer: {
      justifyContent: 'flex-end',
    },
  })
);

export default useStyles;
