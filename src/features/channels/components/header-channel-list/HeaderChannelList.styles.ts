import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles(
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyItems: 'space-between',
      alignItems: 'center',
      width: '100%',
      padding: '5% 4%',
      backgroundColor: '#181818',
    },
  })
);

export default useStyles;
