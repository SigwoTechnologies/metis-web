import MetisLogo from '@metis/assets/images/misc/metis-logo.svg';
import Modal from '@metis/common/components/ui/Modal';
import constants from '@metis/common/configuration/constants';
import LocalStorageService from '@metis/common/services/local-storage.service';
import connectSocket from '@metis/common/services/socket.service';
import useMetamask from '@metis/features/auth/hooks/useMetamask';
import MetaMaskService from '@metis/features/auth/services/metamask.service';
import { login } from '@metis/features/auth/store/auth.actions';
import {
  setIsCreatingAccount,
  setJupAccount,
  setLoggedIn,
} from '@metis/features/auth/store/auth.slice';
import { useAppDispatch, useAppSelector } from '@metis/store/hooks';
import { openToast } from '@metis/store/ui/ui.slice';
import PeopleIcon from '@mui/icons-material/People';
import { LoadingButton } from '@mui/lab';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useEffect, useState } from 'react';
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

  useEffect(() => {
    if (account) {
      const socket = connectSocket({
        query: {
          room: `sign-up-${account}`, // address of the current user
          user: account, // address of the current user
        },
      }).socket('/sign-up');

      socket.on('signUpSuccessful', ({ token, address, alias }: SignUpSuccessfulEventResponse) => {
        dispatch(setIsCreatingAccount(false));

        dispatch(openToast({ text: 'Your account was created successfuly', type: 'success' }));
        dispatch(setJupAccount({ address, alias }));

        // TODO: because the service does JSON.stringify too we end up with a weird string, fix this
        const localStorageService = new LocalStorageService();
        localStorageService.setItem(constants.TOKEN, JSON.stringify({ access_token: token }));

        dispatch(setLoggedIn(true));
      });

      socket.on('signUpFailed', ({ message }: { message: string }) => {
        dispatch(openToast({ text: message, type: 'error' }));
        dispatch(setIsCreatingAccount(false));
      });

      dispatch(login(account));

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
              {isConnectingToMetamask ? 'Connecting to Metamask' : 'Log In with Metamask'}
            </LoadingButton>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default LoginPage;
