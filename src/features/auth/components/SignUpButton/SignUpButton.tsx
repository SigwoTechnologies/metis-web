import Modal from '@metis/common/components/ui/Modal';
import constants from '@metis/common/configuration/constants';
import getJobStatus from '@metis/common/services/job.service';
import LocalStorageService from '@metis/common/services/local-storage.service';
import connectSocket from '@metis/common/services/socket.service';
import { saveToken } from '@metis/common/services/token.service';
import AuthService from '@metis/features/auth/services/auth.service';
import MetaMaskService from '@metis/features/auth/services/metamask.service';
import { addPublicKey, register } from '@metis/features/auth/store/auth.actions';
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
import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import useStyles from './SignUpButton.styles';

type SignUpSuccessfulEventResponse = {
  createdAt: number;
  token: string;
  address: string;
  alias: string;
};

export const SignUpButton = () => {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const [blocks, setBlocks] = useState(0);
  const { isConnectingToMetamask, isCreatingAccount, hasMetamask, ethAccount } = useAppSelector(
    (state) => state.auth
  );

  const useAddPublicKey = ({
    token,
    address,
    alias,
  }: {
    token: string;
    address: string;
    alias: string;
  }) => {
    localStorage.removeItem(constants.JOB_ID);
    saveToken(token);
    dispatch(addPublicKey({ jupUserAddress: address, jwtToken: token })).then(() => {
      dispatch(setJupAccount({ address, alias }));
      dispatch(openToast({ text: 'Your account was created successfully', type: 'success' }));
      dispatch(setIsCreatingAccount(false));
      dispatch(setLoggedIn(true));
    });
  };

  // TODO: Make a better implementation of this
  useEffect(() => {
    const socket = connectSocket({
      query: {
        room: `sign-up-${ethAccount}`, // address of the current user
        user: ethAccount, // address of the current user
      },
    }).socket('/sign-up');

    socket.on('signUpFailed', ({ message }: { message: string }) => {
      localStorage.removeItem(constants.JOB_ID);
      dispatch(openToast({ text: message, type: 'error' }));
      dispatch(setIsCreatingAccount(false));
    });

    socket.on(
      'signUpSuccessful',
      async ({ token, address, alias }: SignUpSuccessfulEventResponse) => {
        useAddPublicKey({ token, address, alias });
      }
    );

    socket.on('signUpProcess', async ({ process }: { process: number }) => {
      setBlocks(process);
    });

    const jobId = localStorage.getItem(constants.JOB_ID);
    if (jobId) {
      dispatch(setIsCreatingAccount(true));
      getJobStatus(Number(jobId)).then(async ({ status }) => {
        const credentials = JSON.parse(localStorage.getItem(constants.CREDENTIALS)!);
        const metamaskService = new MetaMaskService();
        const userDataString = await metamaskService.decryptMessage(credentials, ethAccount);
        const userData: EncryptedCredentials = JSON.parse(userDataString);
        dispatch(setUserData(userData));

        if (status === 'active') {
          socket.on(
            'signUpSuccessful',
            async ({ token, address, alias }: SignUpSuccessfulEventResponse) => {
              useAddPublicKey({ token, address, alias });
            }
          );
        }
        if (status === 'complete') {
          const { passphrase, password } = userData;
          const auth = new AuthService(new LocalStorageService());
          auth.legacyLogin(passphrase, password).then(({ user: { alias, address }, token }) => {
            useAddPublicKey({ token, address, alias });
          });
        }
      });

      return undefined;
    }

    return () => {
      socket.off('signUpSuccessful');
      socket.off('signUpFailed');
    };
  }, [ethAccount]);

  const onClicked = () => {
    dispatch(register(ethAccount));
  };

  return (
    <>
      <LoadingButton
        loading={isConnectingToMetamask}
        fullWidth
        disabled={!hasMetamask}
        variant="contained"
        onClick={onClicked}
        style={{
          width: '20rem',
        }}
      >
        <span className={classes.span}>
          {isConnectingToMetamask ? 'Connecting to Metamask' : 'Sign up with Metamask'}
        </span>
      </LoadingButton>

      <Modal open={isCreatingAccount}>
        <div className={classes.iconContainer}>
          <PeopleIcon className={classes.icon} color="primary" />
        </div>
        <div className={classes.loading}>We&apos;re creating your new account...</div>
        {!!blocks && (
          <div
            style={{
              display: 'flex',
              textAlign: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              textTransform: 'none',
            }}
          >
            Mined Blocks
            <CircularProgress variant="determinate" value={blocks} />
          </div>
        )}
      </Modal>
    </>
  );
};
