import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles(() =>
  createStyles({
    container: {},
    main: {
      flex: 1,
      display: 'flex',
      padding: '1rem',
      flexDirection: 'column',
      overflowY: 'auto',
      overflowX: 'hidden',
      position: 'relative',
    },
    scrollToBottomButton: {
      position: 'fixed',
      alignSelf: 'flex-end',
    },
  })
);

export default useStyles;
