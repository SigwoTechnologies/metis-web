import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles(
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyItems: 'space-between',
      alignItems: 'center',
      width: '100%',
      padding: '3%',
    },
  })
);

export default useStyles;
