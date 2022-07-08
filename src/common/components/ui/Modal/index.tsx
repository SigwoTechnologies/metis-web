import { Dialog, DialogTitle } from '@mui/material';
import React from 'react';
import useStyles from './Modal.styles';

type props = {
  open: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<props> = ({ children, open, title, onClose }) => {
  const styles = useStyles();
  return (
    <Dialog onClose={onClose} open={open}>
      <section className={styles.container}>
        {title && <DialogTitle>{title}</DialogTitle>}
        {children}
      </section>
    </Dialog>
  );
};

export default Modal;
