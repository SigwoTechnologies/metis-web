import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import ChannelList from 'src/features/channels/components/channel-list/ChannelList';
import useStyles from './Main.styles';

const Main = () => {
  const classes = useStyles();

  return (
    <Box height="100vh" className={classes.wrapper}>
      <Container maxWidth="xl" component="main" className={classes.container}>
        <Grid container columnSpacing={5} className={classes.grid}>
          <Grid item xs={12} md={4}>
            <ChannelList />
          </Grid>
          <Grid item md={8}>
            <Paper className={classes.column} square sx={{ bgcolor: 'purple' }}>
              2
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Main;
