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
  })
);

export default useStyles;
