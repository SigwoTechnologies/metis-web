import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles(() =>
  createStyles({
    header: {
      paddingLeft: '1rem',
    },
    titleContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
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
