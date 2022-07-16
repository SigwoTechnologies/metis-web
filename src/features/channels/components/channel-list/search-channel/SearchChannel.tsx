import ReneAvatar from 'src/assets/images/avatars/rene.jpg';
import SearchIcon from '@mui/icons-material/Search';
import {
  Avatar,
  Box,
  Container,
  Divider,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import useStyles from './SearchChannel.styles';

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
              <Input
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton aria-label="search in channels">
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ChannelList;
