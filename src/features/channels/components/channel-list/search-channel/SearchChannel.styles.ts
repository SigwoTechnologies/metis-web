import GalaxyDark from '@metis/assets/images/misc/galaxy-dark.png';
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
    },
    drawerLetters: {
      fontSize: '0.5rem !important',
    },
    upperGroup: {
      flexGrow: 1,
      backgroundImage: `url(${GalaxyDark})`,
      backgroundSize: '100% 35%',
      backgroundRepeat: 'no-repeat',
      backgroundPositionY: '26rem',
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
