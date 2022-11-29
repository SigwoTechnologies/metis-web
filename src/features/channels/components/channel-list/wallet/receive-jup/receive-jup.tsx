import { useAppDispatch, useAppSelector } from '@metis/store/hooks';
import { openToast } from '@metis/store/ui/ui.slice';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/material';
import receiveJUPIcon from '@metis/assets/images/misc/receiveJUPIcon.svg';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
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

  const copyToClipboard = (textCopy: string) => {
    navigator.clipboard.writeText(textCopy);
    dispatch(openToast({ text: `${textCopy} copied to clipboard`, type: 'success' }));
  };

  return (
    <>
      <LoadingButton
        type="button"
        className={classes.button}
        variant="contained"
        onClick={handleClickOpen}
        sx={{ margin: '0 !important' }}
      >
        Receive
        <Box component="img" src={receiveJUPIcon} alt="send JUP Icon" sx={{ marginLeft: '5px' }} />
      </LoadingButton>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box className={classes.closeIconContainer}>
          <CloseIcon onClick={handleClose} className={classes.closeIcon} />
        </Box>
        <DialogTitle id="alert-dialog-title" className={classes.idTitle}>
          ACCOUNT <span style={{ color: '#61D90C' }}>ID</span>
        </DialogTitle>
        <DialogContent>
          <Typography className={classes.paragraph}>
            This is your personal ID and it will never change. For payments within the app you can
            also share your alias. To receive JUP you can enter either your alias or account ID.
          </Typography>
          <Box>
            <Box sx={{ color: '#757575', fontSize: '1rem', padding: '10px 0' }}>Alias: </Box>

            <button
              type="button"
              onClick={() => copyToClipboard(jupAccount.alias)}
              className={classes.btn}
            >
              <ContentCopyIcon className={classes.icon} />
              <Typography> &nbsp; {jupAccount.alias}</Typography>
            </button>
          </Box>
          <Box>
            <Box sx={{ color: '#757575', fontSize: '1rem', padding: '10px 0' }}>Account ID: </Box>
            <button
              type="button"
              onClick={() => copyToClipboard(jupAccount.address)}
              className={classes.btn}
            >
              <ContentCopyIcon className={classes.icon} />
              <Typography> &nbsp; {jupAccount.address}</Typography>
            </button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default ReceiveJup;
