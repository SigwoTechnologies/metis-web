import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      position: 'relative',
    },
    spinner: {
      alignSelf: 'center',
    },
  })
);

export default useStyles;
