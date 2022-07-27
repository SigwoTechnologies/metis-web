import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles(() =>
  createStyles({
    header: {
      height: '5rem',
      position: 'relative',
    },
    main: {
      flex: 1,
      overflowY: 'auto',
      overflowX: 'hidden',
      position: 'relative',
    },
    footer: {
      height: '3.7rem',
      position: 'relative',
      display: 'flex',
      alignItems: 'flex-end',
    },
  })
);

export default useStyles;
