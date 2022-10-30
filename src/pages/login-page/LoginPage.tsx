import MetisLogo from '@metis/assets/images/misc/metis-logo.svg';
import Modal from '@metis/common/components/ui/Modal';
import constants from '@metis/common/configuration/constants';
import connectSocket from '@metis/common/services/socket.service';
import Spinner from '@metis/common/components/ui/spinner/Spinner';
import { verifyAlreadyRegistered } from '@metis/features/auth/store/auth.actions';
import { SignInButton } from '@metis/features/auth/components/SignInButton/SignInButton';
import { SignUpButton } from '@metis/features/auth/components/SignUpButton/SignUpButton';
import { useMetamask } from '@metis/features/auth/hooks/useMetamask';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from '@metis/store/hooks';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import { UnlinkButton } from '@metis/features/auth/components/UnlinkAccount/UnlinkButton';
import useStyles from './LoginPage.styles';

const LoginPage = () => {
  const classes = useStyles();
  const [credentials, setCredentials] = useState(false);
  const [syncDeviceRequested, setSyncDeviceRequested] = useState(false);
  const { ethAccount, isAlreadyRegistered, isCheckStatus } = useAppSelector((state) => state.auth);
  const [socketConnected, setSocketConnected] = useState<Socket>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useMetamask();

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
      window.location.reload();
    });

    socket.on('sync-devices-rejected', () => {
      setSyncDeviceRequested(false);
    });
  }, [ethAccount]);

  const sendSyncRequest = () => {
    socketConnected?.emit('sync-devices-request', { ethAccount });
  };

  const sendGrantSync = () => {
    const credentialsFound = window.localStorage.getItem(constants.CREDENTIALS);
    socketConnected?.emit('sync-devices-grant', { credentials: credentialsFound });
  };

  const sendRejectSync = () => {
    socketConnected?.emit('sync-devices-reject');
  };

  useLayoutEffect(() => {
    if (ethAccount) {
      dispatch(verifyAlreadyRegistered(ethAccount));
    }

    const credentialsFound = window.localStorage.getItem(constants.CREDENTIALS);
    if (credentialsFound) {
      setCredentials(true);
    }
  }, [ethAccount]);

  return (
    <>
      {syncDeviceRequested && credentials && (
        <Modal open>
          <Box style={{ textAlign: 'center' }}>
            <span>Someone has requested a synchronization</span>
            <br />
            <br />
            <Box style={{ display: 'flex', gap: '1rem' }}>
              <LoadingButton
                fullWidth
                variant="contained"
                style={{
                  width: '25rem',
                }}
                onClick={sendGrantSync}
              >
                <span className={classes.span}>Grant</span>
              </LoadingButton>

              <LoadingButton
                fullWidth
                variant="contained"
                style={{
                  width: '25rem',
                }}
                onClick={sendRejectSync}
              >
                <span className={classes.span}>Reject</span>
              </LoadingButton>
            </Box>
          </Box>
        </Modal>
      )}

      {isAlreadyRegistered && !credentials && (
        <Modal open>
          <Box style={{ textAlign: 'center' }}>
            <span>We have detected this account is already registered</span>
            <br />
            <br />
            {syncDeviceRequested && <CircularProgress className={classes.spinner} />}
            <Box style={{ display: 'flex', gap: '1rem' }}>
              {!syncDeviceRequested && (
                <>
                  <LoadingButton
                    fullWidth
                    variant="contained"
                    style={{
                      width: '25rem',
                    }}
                    onClick={sendSyncRequest}
                  >
                    <span className={classes.span}>Sync with old device</span>
                  </LoadingButton>

                  <LoadingButton
                    fullWidth
                    variant="contained"
                    style={{
                      width: '25rem',
                    }}
                    onClick={() => navigate('/auth/legacy')}
                  >
                    <span className={classes.span}>Associate legacy account</span>
                  </LoadingButton>
                </>
              )}
            </Box>
          </Box>
        </Modal>
      )}

      <Box height="100vh" className={classes.wrapper}>
        <Container maxWidth="xl" component="main" className={classes.container}>
          <UnlinkButton />
          <Box component="img" src={MetisLogo} alt="login" className={classes.image} />

          {ethAccount && <Box className={classes.associate}>Account Selected: {ethAccount}</Box>}

          <br />

          <Box
            style={{
              display: 'flex',
              gap: '1rem',
            }}
          >
            <Spinner isLoading={!isCheckStatus}>
              {isAlreadyRegistered ? <SignInButton /> : <SignUpButton />}
            </Spinner>
          </Box>
          <br />
        </Container>
      </Box>
    </>
  );
};

export default LoginPage;
