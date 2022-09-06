import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    button: {
      width: '100%',
      marginBottom: '1rem',
    },
    textField: {
      width: '100%',
      marginBottom: '1rem',
    },
    iconContainer: {
      display: 'flex',
      justifyContent: 'center',
    },
    icon: {
      fontSize: '4rem',
    },
  })
);

export default useStyles;
