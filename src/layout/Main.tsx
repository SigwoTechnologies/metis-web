import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import LeftColumn from './columns/LeftColumn';
import RightColumn from './columns/RightColumn';
import useStyles from './Main.styles';

const Main = () => {
  const classes = useStyles();

  return (
    <Box height="100vh" className={classes.wrapper}>
      <Container maxWidth="xl" component="main" className={classes.container}>
        <Grid container columnSpacing={5} className={classes.grid}>
          <Grid item xs={12} md={4} className={classes.gridRow}>
            <LeftColumn />
          </Grid>
          <Grid item md={8} className={classes.gridRow}>
            <RightColumn />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Main;
