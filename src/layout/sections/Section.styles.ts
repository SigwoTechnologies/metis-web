import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles(() =>
  createStyles({
    header: {
      height: '80px',
      position: 'relative',
    },
    '@global': {
      '*::-webkit-scrollbar': {
        width: '6px',
      },
      '*::-webkit-scrollbar-track': {
        '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
      },
      '*::-webkit-scrollbar-thumb': {
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#0dc7fa29',
      },
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
