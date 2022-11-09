import MetisLogo from '@metis/assets/images/misc/metis-logo.svg';
import { SignInButton } from '@metis/features/auth/components/SignInButton/SignInButton';
import { SignUpButton } from '@metis/features/auth/components/SignUpButton/SignUpButton';
import { Tutorial } from '@metis/features/auth/components/Tutorial/Tutorial';
import { useMetamask } from '@metis/features/auth/hooks/useMetamask';
import { useAppSelector } from '@metis/store/hooks';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { SpinnerContainer } from '@metis/common/components/ui/spinner-container/SpinnerContainer';
import useStyles from './LoginPage.styles';

const LoginPage = () => {
  const classes = useStyles();
  const { ethAccount, isAlreadyRegistered, isCheckStatus } = useAppSelector((state) => state.auth);

  useMetamask();

  return (
    <>
      <Box height="100vh" className={classes.wrapper}>
        <Tutorial />
        <Container maxWidth="xl" component="main" className={classes.container}>
          <Box component="img" src={MetisLogo} alt="login" className={classes.image} />

          {ethAccount && (
            <Box className={classes.associate}>
              <Box className={classes.accountLetter}>Account Selected:</Box>
              <Box className={classes.eth}>{ethAccount}</Box>
            </Box>
          )}

          <br />

          <Box
            style={{
              display: 'flex',
              gap: '1rem',
            }}
          >
            <SpinnerContainer isLoading={!isCheckStatus}>
              {isAlreadyRegistered ? <SignInButton /> : <SignUpButton />}
            </SpinnerContainer>
          </Box>
          <br />
        </Container>
      </Box>
    </>
  );
};

export default LoginPage;
