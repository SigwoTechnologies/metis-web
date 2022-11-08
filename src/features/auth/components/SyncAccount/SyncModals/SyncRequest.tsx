import Modal from '@metis/common/components/ui/Modal';
import Box from '@mui/material/Box';
import { LoadingButton } from '@mui/lab';
import { SpinnerContainer } from '@metis/common/components/ui/spinner-container/SpinnerContainer';
import { useNavigate } from 'react-router-dom';
import { Syncing } from './Syncing';
import useStyles from '../SyncAccount.styles';

type props = {
  synchronized: boolean;
  syncDeviceRequested: boolean;
  codeSecurityRequest: number;
  sendSyncRequest: () => void;
};

export const SyncRequest = ({
  synchronized,
  syncDeviceRequested,
  sendSyncRequest,
  codeSecurityRequest,
}: props) => {
  const navigate = useNavigate();
  const classes = useStyles();

  return (
    <Modal open>
      {!synchronized && (
        <Box className={classes.textCenter}>
          <SpinnerContainer isLoading={syncDeviceRequested}>
            <span>
              We have detected this account is already registered in another device, to proceed go
              to your other device to grant permission.
            </span>
            <br />
            <br />

            <Box className={classes.box}>
              <LoadingButton fullWidth variant="contained" onClick={sendSyncRequest}>
                <span className={classes.span}>Sync with Another Device</span>
              </LoadingButton>

              <LoadingButton fullWidth variant="contained" onClick={() => navigate('/auth/legacy')}>
                <span className={classes.span}>Associate Legacy Account</span>
              </LoadingButton>
            </Box>
            <br />
            <span>
              If you cannot recover your account by any of these ways, your account will be lost.
            </span>
          </SpinnerContainer>
        </Box>
      )}
      {syncDeviceRequested && <Syncing codeSecurityRequest={codeSecurityRequest} />}
    </Modal>
  );
};
