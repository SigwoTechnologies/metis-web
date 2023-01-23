import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: '10px',
    },
    span: {
      fontSize: '1rem',
      fontWeight: 700,
      textTransform: 'none',
    },
    subtitle: {
      display: 'block',
      minHeight: '50px',
    },
    button: {
      height: '40px',
      width: '110px',
      margin: '40px 40px',
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      left: 0,
      borderRadius: '10px',
      backgroundColor: '#61D90C',
      '@media (max-width:500px)': {
        // eslint-disable-line no-useless-computed-key
        margin: '20px 20px',
        width: '80px',
      },
    },
    closeButton: {
      position: 'absolute',
      right: 8,
      top: 8,
      color: theme.palette.grey[500],
    },
  })
);

export default useStyles;
