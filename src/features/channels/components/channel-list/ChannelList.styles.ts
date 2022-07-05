import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      height: '100%',
      position: 'relative',
    },
    createButton: {
      width: '4.68rem',
      height: '4.69rem',
      position: 'absolute',
      bottom: '2.18rem',
      right: 0,
      '&:hover': {
        cursor: 'pointer',
      },
    },
  })
);

export default useStyles;
