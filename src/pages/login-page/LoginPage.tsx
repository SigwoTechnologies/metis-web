import { useEffect } from 'react';
import { useAppDispatch } from '@metis/store/hooks';
import { login } from '@metis/features/auth/store/auth.actions';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import SquareGroup from '@metis/assets/images/misc/square-group.png';
import useMetamask from '@metis/features/auth/hooks/useMetamask';
import useStyles from './LoginPage.styles';

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const { account, connect } = useMetamask();

  const handleLogin = async () => {
    await connect();
  };

  useEffect(() => {
    if (account) {
      dispatch(login(account));
    }
  }, [account]);

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
