import { Paper } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { ChannelDrawer } from '../channel-drawer/ChannelDrawer';
import useStyles from './HeaderChannelList.styles';
import { SearchChannel } from './search-channel/SearchChannel';

export const HeaderChannelList = () => {
  const styles = useStyles();

  return (
    <>
      <Paper
        className={styles.header}
        square
        sx={{
          paddingLeft: '0 !important',
          '@media (max-width:900px)': {
            height: '40px',
          },
        }}
      >
        <Container
          maxWidth="xl"
          component="main"
          sx={{
            display: 'flex',
            alignContent: 'center',
            paddingTop: '1%',
            paddingRight: '4% !important',
            paddingBottom: '1%',
            paddingLeft: '4% !important',
          }}
        >
          <Grid container columnSpacing={0}>
            <ChannelDrawer />
            <SearchChannel />
          </Grid>
        </Container>
      </Paper>
    </>
  );
};
