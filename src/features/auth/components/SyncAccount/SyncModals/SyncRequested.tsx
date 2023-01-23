import Modal from '@metis/common/components/ui/Modal';
import Box from '@mui/material/Box';
import { LoadingButton } from '@mui/lab';
import useStyles from '../SyncAccount.styles';

type props = {
  deviceFeatureRequest: string;
  sendRejectSync: () => void;
  setModalSecurityStep: (value: boolean) => void;
};

export const SyncRequested = ({
  deviceFeatureRequest,
  sendRejectSync,
  setModalSecurityStep,
}: props) => {
  const classes = useStyles();

  return (
    <Modal open>
      <Box style={{ textAlign: 'center', textTransform: 'none' }}>
        <span>
          Device <strong>{deviceFeatureRequest}</strong> wants to log in to this account
        </span>
        <br />
        <br />
        <Box className={classes.box}>
          <LoadingButton
            fullWidth
            variant="contained"
            onClick={sendRejectSync}
            className={classes.reject}
          >
            <span className={classes.span}>Reject</span>
          </LoadingButton>
          <LoadingButton
            fullWidth
            variant="contained"
            onClick={() => setModalSecurityStep(true)}
            className={classes.grant}
          >
            <span className={classes.span}>Grant</span>
          </LoadingButton>
        </Box>
      </Box>
    </Modal>
  );
};
