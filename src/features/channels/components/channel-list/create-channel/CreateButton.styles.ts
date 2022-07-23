import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles(() =>
  createStyles({
    createButton: {
      width: '3.7rem',
      height: '3.7rem',
      position: 'absolute',
      bottom: 0,
      right: '1rem',
      '&:hover': {
        cursor: 'pointer',
      },
    },
  })
);

export default useStyles;
