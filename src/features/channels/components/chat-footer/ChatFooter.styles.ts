import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footerInputStyle: {
      padding: '1rem 0',
    },
    button: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 0,
    },
    replyContainer: {
      display: 'flex',
      backgroundColor: theme.colors.black1,
    },
  })
);

export default useStyles;
