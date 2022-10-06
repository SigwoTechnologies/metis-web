import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles(() =>
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
