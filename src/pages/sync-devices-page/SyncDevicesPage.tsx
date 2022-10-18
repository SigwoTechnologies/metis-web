import { yupResolver } from '@hookform/resolvers/yup';
import MetisLogo from '@metis/assets/images/misc/metis-logo.svg';
import Form from '@metis/common/components/ui/Form/Form';
import Modal from '@metis/common/components/ui/Modal';
import TextInput from '@metis/common/components/ui/TextInput/TextInput';
import constants from '@metis/common/configuration/constants';
import LocalStorageService from '@metis/common/services/local-storage.service';
import { useMetamask } from '@metis/features/auth/hooks/useMetamask';
import AuthService from '@metis/features/auth/services/auth.service';
import MetaMaskService from '@metis/features/auth/services/metamask.service';
import { legacyLogin } from '@metis/features/auth/store/auth.actions';
import {
  setIsConnectedToMetamask,
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
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import useStyles from './SyncDevicesPage.styles';

const schema = yup.object({
  password: yup.string().required('This field is required'),
  passphrase: yup.string().required('This field is required'),
});

interface IForm {
  password: string;
  passphrase: string;
}
const LegacyLoginPage = () => {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const { connect } = useMetamask();
  const { isCreatingAccount, isConnectedToMetamask, ethAccount } = useAppSelector(
    (state) => state.auth
  );
  const [passwordShown, setPasswordShown] = useState(false);
  const [passphraseShown, setPassphraseShown] = useState(false);

  const handleLogin = async () => {
    await connect();
  };

  // TODO: Make a better implementation of this
  useEffect(() => {
    if (ethAccount) {
      dispatch(setIsConnectedToMetamask(true));
    }

    return undefined;
  }, [ethAccount]);

  const createNewChannel = async (data: IForm) => {
    if (!data.passphrase.trim() || !data.password.trim()) {
      return;
    }

    try {
      const auth = new AuthService(new LocalStorageService());
      const {
        user: { alias, address },
      } = await auth.legacyLogin(data.passphrase, data.password);

      if (alias !== ethAccount) {
        throw new Error('Please check your address');
      }

      dispatch(
        legacyLogin({
          address: ethAccount,
          passphrase: data.passphrase,
          password: data.password,
        })
      ).then(async () => {
        dispatch(openToast({ text: 'Your account was associated successfully', type: 'success' }));
        const creds = JSON.parse(localStorage.getItem(constants.CREDENTIALS)!);
        const metamaskService = new MetaMaskService();
        const userDataString = await metamaskService.decryptMessage(creds, ethAccount);
        const userData: EncryptedCredentials = JSON.parse(userDataString);
        dispatch(setUserData(userData));

        dispatch(setJupAccount({ address, alias }));

        dispatch(setIsCreatingAccount(false));
        dispatch(setLoggedIn(true));
      });
    } catch (error) {
      if (error instanceof Error) {
        dispatch(openToast({ text: error.message, type: 'error' }));
      }
    }
  };

  if (!ethAccount && !isConnectedToMetamask) {
    return (
      <Box height="100vh" className={classes.wrapper}>
        <Container maxWidth="xl" component="main" className={classes.container}>
          <Box component="form" noValidate maxWidth="md">
            <Box component="img" src={MetisLogo} alt="login" className={classes.image} />
            <LoadingButton fullWidth variant="contained" onClick={handleLogin}>
              <span className={classes.span}>Connect Metamask</span>
            </LoadingButton>
          </Box>
        </Container>
      </Box>
    );
  }
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
          </Box>
          <Form<IForm> onSubmit={createNewChannel} form={{ resolver: yupResolver(schema) }}>
            <TextInput
              placeholder="Passphrase here"
              name="passphrase"
              type={passphraseShown ? 'text' : 'password'}
              {...{
                onFocus: () => setPassphraseShown(!passphraseShown),
                onBlur: () => setPassphraseShown(!passphraseShown),
              }}
            />
            <TextInput
              placeholder="Password here"
              name="password"
              type={passwordShown ? 'text' : 'password'}
              {...{
                onFocus: () => setPasswordShown(!passwordShown),
                onBlur: () => setPasswordShown(!passwordShown),
              }}
            />

            <LoadingButton fullWidth variant="contained" type="submit">
              <span className={classes.span}>Associate</span>
            </LoadingButton>
          </Form>
        </Container>
      </Box>
    </>
  );
};

export default LegacyLoginPage;
