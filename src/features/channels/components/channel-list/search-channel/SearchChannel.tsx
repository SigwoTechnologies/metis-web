import { useState } from 'react';
import ReneAvatar from '@metis/assets/images/avatars/rene.jpg';
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Grid from '@mui/material/Grid';
import { StylesProvider } from '@mui/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuIcon from '@mui/icons-material/Menu';
import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import useStyles from './SearchChannel.styles';
import './styles.css';

const ChannelList = () => {
  const [drawer, setDrawer] = useState(false);
  const styles = useStyles();

  return (
    <>
      <Drawer anchor="left" open={drawer} onClose={() => setDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation">
          <Box className={styles.account}>
            <Avatar alt="Channel Avatar" src={ReneAvatar} className={styles.accountAvatar} />
          </Box>
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Container maxWidth="xl" component="main">
        <Grid container columnSpacing={5}>
          <Grid item xs={2} className={styles.iconContainer}>
            <IconButton onClick={() => setDrawer(true)}>
              <MenuIcon />
            </IconButton>
          </Grid>
          <Grid item xs={10}>
            <FormControl variant="standard" fullWidth>
              <InputLabel>Search</InputLabel>
              <StylesProvider injectFirst>
                <Input
                  disableUnderline
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton aria-label="search in channels">
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </StylesProvider>
            </FormControl>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ChannelList;
