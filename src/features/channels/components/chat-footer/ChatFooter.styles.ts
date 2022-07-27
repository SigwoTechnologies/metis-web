import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footerInputStyle: {
      padding: '1rem 0',
    },
    button: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 0,
    },
    replyContainer: {
      display: 'flex',
      backgroundColor: theme.palette.grey[900],
      gap: '0.5rem',
      padding: '0 1rem 0 1rem',
    },
    closeButtonContainer: {
      position: 'relative',
    },
    closeButton: {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      color: theme.palette.grey[500],
    },
  })
);

export default useStyles;
