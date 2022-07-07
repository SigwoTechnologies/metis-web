import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'fixed',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
    },
  })
);

export default useStyles;
