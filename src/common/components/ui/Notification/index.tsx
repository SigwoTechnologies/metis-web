import { Dialog } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import React, { useEffect, useState } from 'react';
import useStyles from './Notification.styles';

type props = {
  isOpen: boolean;
  onClose: () => void;
  type: 'success' | 'error';
};

const Notification: React.FC<props> = ({ isOpen, onClose, type }) => {
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
        },
      }}
    >
      {type === 'success' && <CheckIcon color="success" className={styles.icon} />}
      <p className={styles.text}>Invite sent!</p>
    </Dialog>
  );
};
export default Notification;
