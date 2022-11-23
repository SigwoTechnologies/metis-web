import MetisLogo from '@metis/assets/images/misc/metis-logo.svg';
import { SignInButton } from '@metis/features/auth/components/SignInButton/SignInButton';
import { SignUpButton } from '@metis/features/auth/components/SignUpButton/SignUpButton';
import { Tutorial } from '@metis/features/auth/components/Tutorial/Tutorial';
import { useMetamask } from '@metis/features/auth/hooks/useMetamask';
import { useAppSelector } from '@metis/store/hooks';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { SpinnerContainer } from '@metis/common/components/ui/spinner-container/SpinnerContainer';
import useStyles from './LoginPage.styles';

const LoginPage = () => {
  const classes = useStyles();
  const { ethAccount, isAlreadyRegistered, isCheckStatus } = useAppSelector((state) => state.auth);

  useMetamask();

  return (
    <>
      <Box height="100vh" className={classes.wrapper}>
        <Container maxWidth="xl" component="main" className={classes.container}>
          <Tutorial />
          <Box className={classes.txtContainer}>
            <Typography className={classes.title}>
              Welcome to <span style={{ color: '#61D90C' }}>Metis</span>
            </Typography>
            <Typography className={classes.text}>
              Your encrypted chat app in the blockchain
            </Typography>
          </Box>

          <Box component="img" src={MetisLogo} alt="login" className={classes.image} />

          {ethAccount && (
            <Box className={classes.associate}>
              <Box className={classes.accountLetter}>Selected Account</Box>
              <Box className={classes.eth}>{ethAccount}</Box>
            </Box>
          )}

          <br />

          <Box
            sx={{
              height: '40px',
              width: '600px',
              display: 'flex',
              gap: '1rem',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#403B36',
              borderRadius: '10px',
              '@media (max-width:500px)': {
                // eslint-disable-line no-useless-computed-key
                width: '260px',
              },
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
