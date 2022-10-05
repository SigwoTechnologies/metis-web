import { yupResolver } from '@hookform/resolvers/yup';
import Form from '@metis/common/components/ui/Form/Form';
import TextInput from '@metis/common/components/ui/TextInput/TextInput';
import appConfig from '@metis/common/configuration/app.config';
import { getToken } from '@metis/common/services/token.service';
import { convertJupToNQT, convertNQTToJup } from '@metis/common/utils/utils';
import { openToast } from '@metis/store/ui/ui.slice';
import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import axios from 'axios';
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

type Props = {
  balance: number;
  getBalance: () => void;
};

const SendJup = ({ balance, getBalance }: Props) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const sendJup = async ({ recipient, amount }: TForm) => {
    const token = getToken();
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    };
    await axios.post(
      `${appConfig.api.baseUrl}/v1/api/transfer-money`,
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
    await getBalance();
  };
  const onSend = async ({ recipient, amount }: TForm) => {
    await sendJup({ recipient, amount });
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
          <Form<TForm> onSubmit={onSend} form={{ resolver: yupResolver(schema) }}>
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
