import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles(() =>
  createStyles({
    header: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    avatarContainer: {
      width: '10%',
      display: 'flex',
      justifyContent: 'center',
    },
    titleContainer: {
      width: '80%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRight: '1px solid primary.main',
    },
    avatar: {
      width: '4rem',
      height: '4rem',
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
