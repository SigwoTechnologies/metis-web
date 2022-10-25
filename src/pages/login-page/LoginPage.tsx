import MetisLogo from '@metis/assets/images/misc/metis-logo.svg';
import Modal from '@metis/common/components/ui/Modal';
import constants from '@metis/common/configuration/constants';
import httpService from '@metis/common/services/http.service';
import connectSocket from '@metis/common/services/socket.service';
import { SignInButton } from '@metis/features/auth/components/SignInButton/SignInButton';
import { SignUpButton } from '@metis/features/auth/components/SignUpButton/SignUpButton';
import { useMetamask } from '@metis/features/auth/hooks/useMetamask';
import { useAppSelector } from '@metis/store/hooks';
import { LoadingButton } from '@mui/lab';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import useStyles from './LoginPage.styles';

const LoginPage = () => {
  const classes = useStyles();
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const [credentials, setCredentials] = useState(false);
  const [syncDeviceRequested, setSyncDeviceRequested] = useState(false);
  const { ethAccount } = useAppSelector((state) => state.auth);
  const [socketConnected, setSocketConnected] = useState<Socket>();
  const navigate = useNavigate();
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

  useEffect(() => {
    if (ethAccount) {
      httpService
        .get(`/v1/api/crypto/get-account/${ethAccount}`)
        .then(() => setAlreadyRegistered(true))
        .catch(() => setAlreadyRegistered(false));
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

      {alreadyRegistered && !credentials && (
        <Modal open>
          <Box style={{ textAlign: 'center' }}>
            <span>We have detected this account is already registered</span>
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
            </Box>
          </Box>
        </Modal>
      )}

      <Box height="100vh" className={classes.wrapper}>
        <Container maxWidth="xl" component="main" className={classes.container}>
          <Box component="img" src={MetisLogo} alt="login" className={classes.image} />

          {ethAccount && <Box className={classes.associate}>Account Selected: {ethAccount}</Box>}

          <br />

          <Box
            style={{
              display: 'flex',
              gap: '1rem',
            }}
          >
            {!alreadyRegistered && <SignUpButton />}

            {alreadyRegistered && <SignInButton />}
          </Box>
          <br />
        </Container>
      </Box>
    </>
  );
};

export default LoginPage;
