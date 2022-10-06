import { useAppDispatch, useAppSelector } from '@metis/store/hooks';
import { openToast } from '@metis/store/ui/ui.slice';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { LoadingButton } from '@mui/lab';
import { Grid } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
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
        <DialogTitle id="alert-dialog-title" className={classes.idTitle}>
          ACCOUNT ID
        </DialogTitle>
        <DialogContent>
          <Typography className={classes.paragraph}>
            This ID is only for you and it will always be the same. For payments within the app you
            can also share your alias. To receive JUP you can enter either your alias or account ID.
          </Typography>

          <Divider />
          <Grid>
            <Grid style={{ color: 'grey', fontSize: '1rem' }}>Alias: </Grid>
            <Grid>
              <button type="button" onClick={copyMyAddress} className={classes.buttonID}>
                <Grid className={classes.buttonLayout}>
                  <Grid className={classes.buttonLeft}>
                    {' '}
                    <ContentCopyIcon className={classes.icon} />
                  </Grid>
                  <Grid className={classes.buttonRight}>{jupAccount.alias}</Grid>
                </Grid>
              </button>
            </Grid>
          </Grid>
          <Grid>
            <Grid style={{ color: 'grey', fontSize: '1rem' }}>Account ID: </Grid>
            <Grid>
              <button type="button" onClick={copyMyAddress} className={classes.buttonID}>
                <Grid className={classes.buttonLayout}>
                  <Grid className={classes.buttonLeft}>
                    <ContentCopyIcon className={classes.icon} />
                  </Grid>
                  <Grid className={classes.buttonRight}>{jupAccount.address}</Grid>
                </Grid>
              </button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default ReceiveJup;
