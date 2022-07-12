import { Alert, Snackbar } from '@mui/material';
import React from 'react';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { hideToast } from 'src/store/ui/toast.slice';

const Toast = () => {
  const { open, text, type } = useAppSelector((state) => state.toast);
  const dispatch = useAppDispatch();

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(hideToast());
  };

  return (
    <Snackbar open={open} onClose={handleClose}>
      <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
        {text}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
