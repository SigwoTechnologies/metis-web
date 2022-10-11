import { yupResolver } from '@hookform/resolvers/yup';
import Form from '@metis/common/components/ui/Form/Form';
import TextInput from '@metis/common/components/ui/TextInput/TextInput';
import httpService from '@metis/common/services/http.service';
import { getToken } from '@metis/common/services/token.service';
import { convertJupToNQT, convertNQTToJup } from '@metis/common/utils/utils';
import fetchBalance from '@metis/features/wallet/services/fetchBalance';
import { useAppSelector } from '@metis/store/hooks';
import { openToast } from '@metis/store/ui/ui.slice';
import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
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
  const dispatch = useDispatch();
  const { balance } = useAppSelector((state) => state.wallet);
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

    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${getToken()}`,
    };
    await httpService.post(
      '/v1/api/transfer-money',
      { recipient, amount: convertJupToNQT(amount) },
      { headers }
    );

    dispatch(
      openToast({
        text: `${convertNQTToJup(
          Number(convertJupToNQT(amount))
        )} JUP Sent to ${recipient} successfully`,
        type: 'success',
      })
    );
    await fetchBalance(dispatch);
    setOpen(false);
  };

  return (
    <>
      <LoadingButton
        type="button"
        className={classes.button}
        variant="contained"
        onClick={handleClickOpen}
      >
        Send
      </LoadingButton>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Box>Send JUP</Box>
          <Box fontSize={14}>Balance: {balance} JUP</Box>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Form<TForm> onSubmit={onSendJup} form={{ resolver: yupResolver(schema) }}>
            <TextInput placeholder="Enter JUP Quantity" name="amount" />
            <TextInput placeholder="Enter JUP Destination Address" name="recipient" />
            <LoadingButton type="submit" className={classes.button} variant="contained">
              Send
            </LoadingButton>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default SendJup;
