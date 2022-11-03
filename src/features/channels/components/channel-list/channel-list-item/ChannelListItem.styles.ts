import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles(() =>
  createStyles({
    avatar: {
      width: '3rem',
      height: '3rem',
      marginRight: '1rem',
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
      marginLeft: '1rem',
    },
    listItemButton: {
      padding: '.8rem',
      transition: 'all 1s ease',
    },
  })
);

export default useStyles;
