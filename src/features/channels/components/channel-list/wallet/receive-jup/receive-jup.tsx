import { useAppDispatch, useAppSelector } from '@metis/store/hooks';
import { openToast } from '@metis/store/ui/ui.slice';
import { LoadingButton } from '@mui/lab';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import { useState } from 'react';
import useStyles from './receive-jup.styles';

export interface WebAppInfo {
  name: string;
  version: string;
}

const ReceiveJup = () => {
  const dispatch = useAppDispatch();
  const { jupAccount } = useAppSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const copyMyAddress = () => {
    navigator.clipboard.writeText(jupAccount.address);
    dispatch(openToast({ text: 'JUP Address copied to clipboard', type: 'success' }));
  };

  return (
    <>
      <LoadingButton
        type="button"
        className={classes.button}
        variant="contained"
        onClick={handleClickOpen}
      >
        Receive
      </LoadingButton>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">ACCOUNT ID</DialogTitle>
        <DialogContent>
          <p>This ID is only for you and it will always be the same.</p>
          <p>For payments within the app you can also share your alias.</p>
          <p>To receive JUP you can either enter your alias or account ID</p>
          <Divider />
          <p>Alias: {jupAccount.alias}</p>
          <button type="button" onClick={copyMyAddress} className={classes.buttonID}>
            Account ID: {jupAccount.address}
          </button>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default ReceiveJup;
