import Modal from '@metis/common/components/ui/Modal';
import Box from '@mui/material/Box';
import Form from '@metis/common/components/ui/Form/Form';
import TextInput from '@metis/common/components/ui/TextInput/TextInput';
import { LoadingButton } from '@mui/lab';
import useStyles from '../SyncAccount.styles';
import { ICode } from '../../../types/code.inteface';

type props = {
  modalSecurityStep: boolean;
  sendGrantSync: (value: ICode) => void;
  sendRejectSync: () => void;
};

export const EnterCode = ({ modalSecurityStep, sendGrantSync, sendRejectSync }: props) => {
  const classes = useStyles();
  return (
    <Modal open={modalSecurityStep}>
      <Box style={{ textAlign: 'center' }}>
        <span>Enter code to verify sync.</span>
        <br />
        <br />
        <Form<ICode> onSubmit={sendGrantSync}>
          <TextInput label="Channel name here" name="code" />
          <Box className={classes.box}>
            <LoadingButton fullWidth variant="contained" type="submit" className={classes.grant}>
              <span className={classes.span}>Verify</span>
            </LoadingButton>
            <LoadingButton
              fullWidth
              variant="contained"
              onClick={sendRejectSync}
              className={classes.reject}
            >
              <span className={classes.span}>Close</span>
            </LoadingButton>
          </Box>
        </Form>
      </Box>
    </Modal>
  );
};
