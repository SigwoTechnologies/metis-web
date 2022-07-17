import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import SquareGroup from '@/assets/images/misc/square-group.png';
import { useAppDispatch } from 'src/store/hooks';
import { login } from 'src/features/auth/store/auth.actions';
import useMetamask from 'src/features/auth/hooks/useMetamask';

import useStyles from './LoginPage.styles';

// TODO:
// (client)   Login with metamask
// (client)   Get account
// (client)   Send account to metis api
// (backend)  Encrypts message and returns it to client
// (client)   Receives the challenge encrypted
// (client)   Signs the challenge with metamsk
// (client)   Send the signed challenge to metis api
// (backend)  Verifies signature challenge identity
// (client)   Creates password and passphrase
// (client)   Stores the new password and passphrase in local storage
// (client)   Notifies the user with his new account info
// (client)   Sends user info to backend (password, passphrase and eth address)
// (backend)  Creates a new account
// (backend)  Link eth with jupiter account
// (backend)  Generates a new access token and send it back to client
// (client)   Receives the new access token, and store it in local storage

// eth utils (recover personal signature)

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const { account, balance, errorMessage, connect } = useMetamask();

  const handleLogin = async () => {
    await connect();
  };

  return (
    <Box height="100vh" className={classes.wrapper}>
      <Container maxWidth="xl" component="main" className={classes.container}>
        <Box component="form" noValidate maxWidth="md">
          <Box component="img" src={SquareGroup} alt="login" className={classes.image} />
          <Button fullWidth variant="contained" onClick={handleLogin}>
            Log In with Metamask
          </Button>
          {account && <Typography color="secondary">Account: {account}</Typography>}
          {balance && <Typography color="secondary">Balance: {balance} ETH</Typography>}
          {errorMessage && <Typography color="error">{errorMessage}</Typography>}
        </Box>
      </Container>
    </Box>
  );
};

export default LoginPage;
