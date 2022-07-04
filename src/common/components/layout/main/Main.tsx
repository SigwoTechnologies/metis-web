import { useContext } from 'react';
import { ThemeContext } from 'src/theme/ThemeProvider';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import useStyles from './Main.styles';

const Main = () => {
  const classes = useStyles();

  const setTheme = useContext(ThemeContext);

  return (
    <Box height="100vh">
      <Container maxWidth="xl" component="main" className={classes.main}>
        <Button color="primary" variant="outlined" onClick={() => setTheme('DarkTheme')}>
          Dark Theme
        </Button>
        <Button color="secondary" variant="outlined" onClick={() => setTheme('LightTheme')}>
          Light Theme
        </Button>
      </Container>
    </Box>
  );
};

export default Main;
