import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
    },
    image: {
      height: '100%',
      width: '100%',
      objectFit: 'cover',
      border: '1px solid white',
      borderRadius: '10px',
    },
    span: {
      fontWeight: 700,
      textTransform: 'none',
    },
    subtitle: {
      textTransform: 'none',
      padding: '20rem 0',
    },
    icon: {
      fontSize: '6rem',
    },
    iconContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      margin: '20px 20px',
      justifyContent: 'center',
    },
    closeButton: {
      position: 'absolute',
      right: 8,
      top: 8,
      color: theme.palette.grey[500],
    },
    infoLine: {
      display: 'flex',
    },
    infoLineLeft: {
      display: 'flex',
      justifyContent: 'flex-start',
    },
    infoLineRight: {
      display: 'flex',
      justifyContent: 'flex-end',
      flex: '1',
    },
  })
);

export default useStyles;
