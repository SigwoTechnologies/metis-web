import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import SquareGroup from 'src/assets/images/misc/square-group.png';
import useStyles from './LoginPage.styles';

const LoginPage = () => {
  const classes = useStyles();

  return (
    <Box height="100vh" className={classes.wrapper}>
      <Container maxWidth="xl" component="main" className={classes.container}>
        <Box component="form" noValidate maxWidth="md">
          <Box component="img" src={SquareGroup} alt="login" className={classes.image} />
          <Button type="submit" fullWidth variant="contained">
            Log In with Metamask
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginPage;
