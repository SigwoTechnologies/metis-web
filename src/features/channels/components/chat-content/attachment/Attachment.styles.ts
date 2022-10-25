import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: 'flex',
      marginTop: '1.5rem',
      gap: '0.75rem',
      objectFit: 'contain',
    },

    image: {
      width: '100%',
    },
  })
);

export default useStyles;
