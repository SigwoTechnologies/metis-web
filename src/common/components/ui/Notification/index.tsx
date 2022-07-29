import { Dialog } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect, useState } from 'react';
import useStyles from './Notification.styles';

type props = {
  isOpen: boolean;
  onClose: () => void;
  type: 'success' | 'error';
  message: string;
};

const Notification: React.FC<props> = ({ isOpen, onClose, type, message }) => {
  const [open, setOpen] = useState(false);
  const styles = useStyles();

  useEffect(() => {
    if (isOpen) {
      setOpen(isOpen);
      const timer = setTimeout(() => {
        setOpen(false);
        onClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [isOpen]);

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
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
      <p className={styles.text}>{message}</p>
    </Dialog>
  );
};
export default Notification;
