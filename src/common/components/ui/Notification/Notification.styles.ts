import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles(() =>
  createStyles({
    icon: {
      fontSize: '6rem',
    },
    text: {
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: '1rem',
    },
  })
);

export default useStyles;
