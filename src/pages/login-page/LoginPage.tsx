import MetisLogo from '@metis/assets/images/misc/metis-logo.svg';
import Modal from '@metis/common/components/ui/Modal';
import constants from '@metis/common/configuration/constants';
import { getJobStatus } from '@metis/common/services/job.service';
import LocalStorageService from '@metis/common/services/local-storage.service';
import connectSocket from '@metis/common/services/socket.service';
import useMetamask from '@metis/features/auth/hooks/useMetamask';
import AuthService from '@metis/features/auth/services/auth.service';
import MetaMaskService from '@metis/features/auth/services/metamask.service';
import { addPublicKey, login } from '@metis/features/auth/store/auth.actions';
import {
  setIsCreatingAccount,
  setJupAccount,
  setLoggedIn,
  setUserData,
} from '@metis/features/auth/store/auth.slice';
import EncryptedCredentials from '@metis/features/auth/types/encrypted-credentials';
import { useAppDispatch, useAppSelector } from '@metis/store/hooks';
import { openToast } from '@metis/store/ui/ui.slice';
import PeopleIcon from '@mui/icons-material/People';
import { LoadingButton } from '@mui/lab';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useEffect } from 'react';
import useStyles from './LoginPage.styles';

type SignUpSuccessfulEventResponse = {
  createdAt: number;
  token: string;
  address: string;
  alias: string;
};

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const { account, connect } = useMetamask();
  const { isConnectingToMetamask, isCreatingAccount } = useAppSelector((state) => state.auth);

  const handleLogin = async () => {
    await connect();
  };

  // TODO: Make a better implementation of this
  useEffect(() => {
    if (account) {
      const socket = connectSocket({
        query: {
          room: `sign-up-${account}`, // address of the current user
          user: account, // address of the current user
        },
      }).socket('/sign-up');

      socket.on('signUpFailed', ({ message }: { message: string }) => {
        localStorage.removeItem(constants.JOBID);
        dispatch(openToast({ text: message, type: 'error' }));
        dispatch(setIsCreatingAccount(false));
      });

      // IN CASE A USER REFRESHES WHEN CREATING ACCOUNT
      const jobId = localStorage.getItem(constants.JOBID);
      if (jobId) {
        dispatch(setIsCreatingAccount(true));
        getJobStatus(Number(jobId)).then(async ({ status }) => {
          const creds = JSON.parse(localStorage.getItem(constants.CREDENTIALS)!);
          const metamaskService = new MetaMaskService();

          if (status === 'active') {
            socket.on(
              'signUpSuccessful',
              async ({ token, address, alias }: SignUpSuccessfulEventResponse) => {
                const userDataString = await metamaskService.decryptMessage(creds, account);
                const userData: EncryptedCredentials = JSON.parse(userDataString);
                dispatch(setUserData(userData));

                const stringifiedToken = JSON.stringify({ access_token: token });
                localStorage.setItem(constants.TOKEN, JSON.stringify(stringifiedToken));

                dispatch(addPublicKey({ jupUserAddress: address, jwtToken: token })).then(() => {
                  dispatch(setJupAccount({ address, alias }));
                  dispatch(
                    openToast({ text: 'Your account was created successfuly', type: 'success' })
                  );
                  dispatch(setIsCreatingAccount(false));
                  dispatch(setLoggedIn(true));
                });

                localStorage.removeItem(constants.JOBID);
              }
            );
          } else if (status === 'complete') {
            const userDataString = await metamaskService.decryptMessage(creds, account);
            const userData: EncryptedCredentials = JSON.parse(userDataString);
            dispatch(setUserData(userData));

            const { passphrase, password } = userData;
            const auth = new AuthService(new LocalStorageService());
            auth.legacyLogin(passphrase, password).then(({ user: { alias, address }, token }) => {
              const stringifiedToken = JSON.stringify({ access_token: token });
              localStorage.setItem(constants.TOKEN, JSON.stringify(stringifiedToken));

              dispatch(addPublicKey({ jupUserAddress: address, jwtToken: token })).then(() => {
                dispatch(setJupAccount({ address, alias }));
                dispatch(
                  openToast({ text: 'Your account was created successfuly', type: 'success' })
                );
                dispatch(setIsCreatingAccount(false));
                dispatch(setLoggedIn(true));
                localStorage.removeItem(constants.JOBID);
              });
            });
          }
        });

        return undefined;
      }

      // SIGNUP PROCESS -----------------------------------------------------------------------
      dispatch(login(account));
      socket.on(
        'signUpSuccessful',
        async ({ token, address, alias }: SignUpSuccessfulEventResponse) => {
          localStorage.removeItem(constants.JOBID);

          // TODO: because the service does JSON.stringify too we end up with a weird string, fix this
          const stringifiedToken = JSON.stringify({ access_token: token });
          localStorage.setItem(constants.TOKEN, JSON.stringify(stringifiedToken));

          dispatch(addPublicKey({ jupUserAddress: address, jwtToken: token })).then(() => {
            dispatch(setJupAccount({ address, alias }));
            dispatch(openToast({ text: 'Your account was created successfuly', type: 'success' }));
            dispatch(setIsCreatingAccount(false));
            dispatch(setLoggedIn(true));
          });
        }
      );

      return () => {
        socket.off('signUpSuccessful');
        socket.off('signUpFailed');
      };
    }

    return undefined;
  }, [account]);

  return (
    <>
      <Modal open={isCreatingAccount}>
        <div className={classes.iconContainer}>
          <PeopleIcon className={classes.icon} color="primary" />
        </div>
        <div className={classes.loading}>We&apos;re creating your new account...</div>
      </Modal>
      <Box height="100vh" className={classes.wrapper}>
        <Container maxWidth="xl" component="main" className={classes.container}>
          <Box component="form" noValidate maxWidth="md">
            <Box component="img" src={MetisLogo} alt="login" className={classes.image} />
            <LoadingButton
              loading={isConnectingToMetamask}
              loadingPosition="start"
              fullWidth
              variant="contained"
              onClick={handleLogin}
            >
              <span className={classes.span}>
                {isConnectingToMetamask ? 'Connecting to Metamask' : 'Log In with Metamask'}
              </span>
            </LoadingButton>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default LoginPage;
