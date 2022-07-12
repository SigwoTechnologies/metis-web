import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import SquareGroup from 'src/assets/images/misc/square-group.png';
import { useAppDispatch } from 'src/store/hooks';

import { login } from 'src/features/auth/store/auth.actions';
import useStyles from './LoginPage.styles';

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const classes = useStyles();

  // TODO: Implement login here
  const handleLogin = () => {
    dispatch(login({ password: 'password', passphrase: 'passphrase' }));
  };

  return (
    <Box height="100vh" className={classes.wrapper}>
      <Container maxWidth="xl" component="main" className={classes.container}>
        <Box component="form" noValidate maxWidth="md">
          <Box component="img" src={SquareGroup} alt="login" className={classes.image} />
          <Button fullWidth variant="contained" onClick={handleLogin}>
            Log In with Metamask
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginPage;
