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
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
    },
  })
);

export default useStyles;
