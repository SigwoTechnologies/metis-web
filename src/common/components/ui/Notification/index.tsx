import { useAppDispatch, useAppSelector } from '@metis/store/hooks';
import { hideNotification } from '@metis/store/ui/ui.slice';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog } from '@mui/material';
import React, { useEffect } from 'react';
import useStyles from './Notification.styles';

const Notification: React.FC = () => {
  const { open, type, text } = useAppSelector((state) => state.ui.notification);
  const dispatch = useAppDispatch();
  const styles = useStyles();

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        dispatch(hideNotification());
      }, 2000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={() => dispatch(hideNotification())}
      PaperProps={{
        style: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
          borderLeft: 0,
          borderRight: 0,
        },
      }}
    >
      {
        {
          success: <CheckIcon color="success" className={styles.icon} />,
          error: <CloseIcon color="error" className={styles.icon} />,
        }[type]
      }
      <p className={styles.text}>{text}</p>
    </Dialog>
  );
};
export default Notification;
