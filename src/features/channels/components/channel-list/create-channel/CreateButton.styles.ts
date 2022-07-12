import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles(() =>
  createStyles({
    createButton: {
      width: '4.68rem',
      height: '4.69rem',
      position: 'absolute',
      top:'-0.5rem',
      right: '-0.5rem',
      '&:hover': {
        cursor: 'pointer',
      },
    },
  })
);

export default useStyles;
