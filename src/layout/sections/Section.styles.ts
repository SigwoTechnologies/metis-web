import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles(() =>
  createStyles({
    header: {
      height: '5rem',
      position: 'relative',
    },
    '@global': {
      '*::-webkit-scrollbar': {
        width: '0.4em',
      },
      '*::-webkit-scrollbar-track': {
        '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
      },
      '*::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,.1)',
        outline: '1px solid slategrey',
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
