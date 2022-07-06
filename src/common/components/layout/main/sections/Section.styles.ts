import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles(() =>
  createStyles({
    header: {
      height: '7rem',
      position: 'relative',
      paddingTop: '2rem',
    },
    main: {
      flex: 1,
      overflowY: 'auto',
      overflowX: 'hidden',
      position: 'relative',
      paddingBottom: '1.5rem',
    },
    footer: {
      height: '5rem',
      position: 'relative',
    },
  })
);

export default useStyles;
