import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles(() =>
  createStyles({
    avatar: {
      width: '48px',
      height: '48px',
      marginRight: '1rem',

      '@media (max-width:900px)': {
        // eslint-disable-line no-useless-computed-key
        height: '30px',
        width: '30px',
      },
    },
    channelName: {
      width: '70%',
    },
    channelDescription: {
      width: '30%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    mutedIcon: {
      marginLeft: '16px',
    },
    listItemButton: {
      height: '75px',
      padding: '3%',
      transition: 'all 1s ease',
      '@media (max-width:900px)': {
        // eslint-disable-line no-useless-computed-key
        height: '60px',
        padding: '1% 4%',
      },
    },
  })
);

export default useStyles;
