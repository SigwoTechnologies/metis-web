import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    titleContainer: {
      paddingLeft: '1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '100%',
      backgroundColor: theme.colors.black1,
    },
    avatar: {
      width: '2.8rem',
      height: '2.8rem',
    },
    button: {
      width: '100%',
      marginBottom: '1rem',
    },
    textField: {
      width: '100%',
      marginBottom: '1rem',
    },
  })
);

export default useStyles;
