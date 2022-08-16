import ReneAvatar from '@metis/assets/images/avatars/rene.jpg';
import EXAMPLE from '@metis/assets/images/avatars/examplefromWEB.jpg';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles(() =>
  createStyles({
    iconContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'end',
    },
    account: {
      position: 'relative',
      width: '100%',
      height: '5rem',
      display: 'flex',
      alignItems: 'center',
    },
    picBackground: {
      position: 'absolute',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      backgroundImage: `url(${ReneAvatar})`,
      backgroundSize: '100% 11rem',
      filter: 'blur(2px) grayscale(100%)',
      '&::-webkit-filter': 'blur(2px)',
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
    drawerLetters: {
      fontSize: '0.5rem !important',
    },
    upperGroup: {
      backgroundImage: `url(${EXAMPLE})`,
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
  })
);

export default useStyles;
