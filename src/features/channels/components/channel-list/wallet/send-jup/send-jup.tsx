import { yupResolver } from '@hookform/resolvers/yup';
import Form from '@metis/common/components/ui/Form/Form';
import TextInput from '@metis/common/components/ui/TextInput/TextInput';
import httpService from '@metis/common/services/http.service';
import { convertJupToNQT, convertNQTToJup } from '@metis/common/utils/utils';
import { fetchBalance } from '@metis/features/wallet/store/wallet.actions';
import { useAppDispatch, useAppSelector } from '@metis/store/hooks';
import { openToast, openNotification } from '@metis/store/ui/ui.slice';
import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/material';
import sendJUPIcon from '@metis/assets/images/misc/sendJUPIcon.svg';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import { Typography } from '@material-ui/core';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import * as yup from 'yup';
import useStyles from './send-jup.styles';

export interface WebAppInfo {
  name: string;
  version: string;
}

const schema = yup.object({
  amount: yup.number().required('This field is required'),
  recipient: yup.string().required('This field is required'),
});

type TForm = {
  recipient: string;
  amount: number;
};

const SendJup = () => {
  const dispatch = useAppDispatch();
  const { balance } = useAppSelector((state) => state.wallet);
  const {
    jupAccount: { address, alias },
  } = useAppSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSendJup = async ({ recipient, amount }: TForm) => {
    if (amount > balance) {
      dispatch(
        openToast({
          text: 'Insufficient Funds',
          type: 'error',
        })
      );
      return;
    }

    if ([alias, address].includes(recipient)) {
      dispatch(
        openNotification({
          text: 'You can`t send JUP to yourself',
          type: 'error',
        })
      );
      return;
    }

    try {
      await httpService.post('/v1/api/transfer-money', {
        recipient,
        amount: convertJupToNQT(amount),
      });
    } catch (error) {
      dispatch(
        openNotification({
          text: 'This account is not registered',
          type: 'error',
        })
      );
      return;
    }

    dispatch(
      openToast({
        text: `${convertNQTToJup(Number(convertJupToNQT(amount)))} JUP is Sending to ${recipient}`,
        type: 'success',
      })
    );
    dispatch(fetchBalance());
    setOpen(false);
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
        Send
        <Box component="img" src={sendJUPIcon} alt="send JUP Icon" sx={{ marginLeft: '5px' }} />
      </LoadingButton>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ padding: '2% 4% !important' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box className={classes.closeIconContainer}>
              <CloseIcon onClick={handleClose} className={classes.closeIcon} />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Typography>
                <span style={{ color: '#61D90C', fontSize: '1.2rem' }}>Send </span>JUP
              </Typography>
              <span style={{ fontSize: '1rem' }}> Balance: {balance} JUP</span>
            </Box>
          </Box>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Form<TForm> onSubmit={onSendJup} form={{ resolver: yupResolver(schema) }}>
            <TextInput placeholder="Enter JUP Quantity" name="amount" />
            <TextInput placeholder="Enter JUP Destination Address" name="recipient" />
            <LoadingButton type="submit" className={classes.button} variant="contained">
              Send
              <Box
                component="img"
                src={sendJUPIcon}
                alt="send JUP Icon"
                sx={{ marginLeft: '5px' }}
              />
            </LoadingButton>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default SendJup;
