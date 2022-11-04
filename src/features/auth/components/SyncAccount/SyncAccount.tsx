import Modal from '@metis/common/components/ui/Modal';
// import Modal from '@mui/material/Modal';
import connectSocket from '@metis/common/services/socket.service';
import constants from '@metis/common/configuration/constants';
import { verifyAlreadyRegistered } from '@metis/features/auth/store/auth.actions';
import { LoadingButton } from '@mui/lab';
import { SpinnerContainer } from '@metis/common/components/ui/spinner-container/SpinnerContainer';
import { useEffect, useState, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import { localStorageKeyDeclinedInvites } from '@metis/features/channels/hooks/useGetDeclinedInvites';
import { useAppSelector, useAppDispatch } from '@metis/store/hooks';
import { localStorageKeyHiddenChannel } from '@metis/features/channels/hooks/useGetHiddenChannels';
import { openNotification } from '@metis/store/ui/ui.slice';
import Box from '@mui/material/Box';
import useStyles from './SyncAccount.styles';

export const SyncAccount = () => {
  const [syncDeviceRequested, setSyncDeviceRequested] = useState(false);
  const [socketConnected, setSocketConnected] = useState<Socket>();
  const { ethAccount, isAlreadyRegistered } = useAppSelector((state) => state.auth);
  const [credentials, setCredentials] = useState(false);
  const [synchronized, setSynchronized] = useState(false);
  const [modalOpen, setModalOpen] = useState(true);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const classes = useStyles();

  useLayoutEffect(() => {
    if (ethAccount) {
      dispatch(verifyAlreadyRegistered(ethAccount));
    }

    const credentialsFound = window.localStorage.getItem(constants.CREDENTIALS);
    if (credentialsFound) {
      setCredentials(true);
    }
  }, [ethAccount]);

  useEffect(() => {
    const socket = connectSocket({
      query: {
        room: `sync-devices-${ethAccount}`, // address of the current user
        user: ethAccount, // address of the current user
      },
    }).socket('/sync-devices');

    if (socket) {
      setSocketConnected(socket);
    }

    socket.on('sync-devices-requested', () => {
      setSyncDeviceRequested(true);
    });

    socket.on('sync-devices-granted', (data) => {
      window.localStorage.setItem(constants.CREDENTIALS, data.credentials);
      // window.localStorage.setItem(constants.RECOVERY_CREDS, data.recoveryCreds);
      window.localStorage.setItem(localStorageKeyDeclinedInvites, data.hiddenChannels);
      window.localStorage.setItem(localStorageKeyHiddenChannel, data.declinedInvites);
      dispatch(
        openNotification({
          text: 'Sync request granted',
          type: 'success',
        })
      );
      setSyncDeviceRequested(false);
      setSynchronized(true);
    });

    socket.on('sync-devices-rejected', () => {
      setSyncDeviceRequested(false);
      dispatch(
        openNotification({
          text: 'Sync request rejected',
          type: 'error',
        })
      );
    });
  }, [ethAccount]);

  const sendSyncRequest = () => {
    socketConnected?.emit('sync-devices-request', { ethAccount });
  };

  const sendGrantSync = () => {
    const credentialsFound = window.localStorage.getItem(constants.CREDENTIALS);
    // const recoveryCreds = window.localStorage.getItem(constants.RECOVERY_CREDS);
    const declinedInvites = window.localStorage.getItem(localStorageKeyDeclinedInvites);
    const hiddenChannels = window.localStorage.getItem(localStorageKeyHiddenChannel);
    socketConnected?.emit('sync-devices-grant', {
      credentials: credentialsFound,
      // recoveryCreds,
      hiddenChannels,
      declinedInvites,
    });
  };

  const sendRejectSync = () => {
    socketConnected?.emit('sync-devices-reject');
  };
  return (
    <>
      {syncDeviceRequested && credentials && (
        <Modal open>
          <Box style={{ textAlign: 'center', textTransform: 'none' }}>
            <span>Someone wants to log in to this account through another device</span>
            <br />
            <br />
            <Box style={{ display: 'flex', gap: '1rem' }}>
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
                onClick={sendGrantSync}
                className={classes.grant}
              >
                <span className={classes.span}>Grant</span>
              </LoadingButton>
            </Box>
          </Box>
        </Modal>
      )}

      {isAlreadyRegistered && !credentials && (
        <Modal open>
          {!synchronized && (
            <Box style={{ textAlign: 'center' }}>
              <SpinnerContainer isLoading={syncDeviceRequested}>
                <span>
                  We have detected this account is already registered in another device, to proceed
                  go to your other device to grant permission.
                </span>
                <br />
                <br />

                <Box style={{ display: 'flex', gap: '1rem' }}>
                  <LoadingButton
                    fullWidth
                    variant="contained"
                    style={{
                      width: '25rem',
                    }}
                    onClick={sendSyncRequest}
                  >
                    <span className={classes.span}>Sync with Another Device</span>
                  </LoadingButton>

                  <LoadingButton
                    fullWidth
                    variant="contained"
                    style={{
                      width: '25rem',
                    }}
                    onClick={() => navigate('/auth/legacy')}
                  >
                    <span className={classes.span}>Associate Legacy Account</span>
                  </LoadingButton>
                </Box>
                <br />
                <span>
                  If you cannot recover your account by any of these ways, your account will be
                  lost.
                </span>
              </SpinnerContainer>
            </Box>
          )}
          {syncDeviceRequested && (
            <Box>
              <br /> <span>You are syncing. Waiting to be approved on the other device.</span>
            </Box>
          )}
        </Modal>
      )}
      {!syncDeviceRequested && synchronized && (
        <Modal open={modalOpen}>
          <Box style={{ textAlign: 'center' }}>
            <span>The account has been successfully synchronized.</span>
            <br />
            <br />
            {!credentials && (
              <LoadingButton
                fullWidth
                variant="contained"
                style={{
                  width: '25rem',
                }}
                onClick={() => window.location.reload()}
              >
                <span className={classes.span}>Ok</span>
              </LoadingButton>
            )}
            {credentials && (
              <LoadingButton
                fullWidth
                variant="contained"
                style={{
                  width: '25rem',
                }}
                onClick={() => setModalOpen(false)}
              >
                <span className={classes.span}>Ok</span>
              </LoadingButton>
            )}
          </Box>
        </Modal>
      )}
    </>
  );
};
