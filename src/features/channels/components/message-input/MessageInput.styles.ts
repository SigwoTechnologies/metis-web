import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    emojiPicker: {
      display: 'flex',
      flexDirection: 'row-reverse',
      padding: '1rem',
      position: 'absolute',
      bottom: '1.8rem',
    },
    emojiIcon: { position: 'absolute', left: '12px', bottom: '5px', zIndex: '1', fontSize: '1px' },
    attachmenIcon: {
      position: 'absolute',
      left: '50px',
      bottom: '5px',
      zIndex: '1',
      fontSize: '1px',
    },
    footerInputStyle: {
      padding: '1rem 1rem 1rem 5.5rem',
      position: 'relative',
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
      justifyContent: 'space-around',
    },
    replyColumn: {
      width: '90%',
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
