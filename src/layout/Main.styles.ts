import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      backgroundColor: theme.palette.background.default,
      // eslint-disable-line no-useless-computed-key
      fontSize: '62.5%',
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
      height: '100%',
      borderRadius: '10px',
      margin: '0 !important',
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
      // paddingLeft: '36px !important',
      backgroundColor: '#332F2E',
      borderRadius: '10px 0 0 10px',
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
