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
      fontWeight: 700,
      textTransform: 'none',
    },
    subtitle: {
      paddingBottom: '20px',
      display: 'block',
    },
    button: {
      margin: '20px 20px',
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      left: 0,
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
