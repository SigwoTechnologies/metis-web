import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles(
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignContent: 'center',
      width: '100%',
      padding: '5% 4%',
      paddingRight: 'calc(4% + 6px) !important',
      backgroundColor: '#181818',
    },
  })
);

export default useStyles;
