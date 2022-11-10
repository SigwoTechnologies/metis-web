import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      backgroundColor: theme.palette.background.default,
    },
    container: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
    },
    grid: {
      height: '100vh',
      '@media (max-width:900px)': {
        // eslint-disable-line no-useless-computed-key
        height: 'auto',
      },
    },
    gridRowL: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      maxHeight: '100%',
      '@media (max-width:900px)': {
        height: '40vh',
      },
    },
    gridRowR: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      maxHeight: '100%',
      paddingLeft: '0 !important',
      '@media (max-width:900px)': {
        height: '60vh',
        paddingLeft: '40px !important',
      },
    },
  })
);

export default useStyles;
