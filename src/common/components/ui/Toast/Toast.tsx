import { Alert, Snackbar } from '@mui/material';
import React from 'react';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { hideToast } from 'src/store/ui/ui.slice';

type Props = {
  delay?: number;
};

const Toast = ({ delay = 6000 }: Props) => {
  const { open, text, type } = useAppSelector((state) => state.ui.toast);
  const dispatch = useAppDispatch();

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(hideToast());
  };

  return (
    <Snackbar open={open} onClose={handleClose} autoHideDuration={delay}>
      <Alert onClose={handleClose} severity={type}>
        {text}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
