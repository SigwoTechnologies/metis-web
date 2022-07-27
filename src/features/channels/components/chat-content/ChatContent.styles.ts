import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      padding: '1rem',
    },
    replyContainer: {
      display: 'flex',
      backgroundColor: theme.palette.grey[900],
      gap: '0.5rem',
      padding: '0 1rem 0 1rem',
      position: 'sticky',
      bottom: 0,
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
