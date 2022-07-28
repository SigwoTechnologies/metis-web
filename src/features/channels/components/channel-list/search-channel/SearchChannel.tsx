import * as React from 'react';
import { useState } from 'react';
import ReneAvatar from '@metis/assets/images/avatars/rene.jpg';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Avatar from '@mui/material/Avatar';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import EditIcon from '@mui/icons-material/Edit';
import Grid from '@mui/material/Grid';
import { StylesProvider } from '@mui/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton/IconButton';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuIcon from '@mui/icons-material/Menu';
import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import SendIcon from '@mui/icons-material/Send';
import SettingsIcon from '@mui/icons-material/Settings';
import StarsIcon from '@mui/icons-material/Stars';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import useStyles from './SearchChannel.styles';
import './styles.css';

const ChannelList = () => {
  const [drawer, setDrawer] = useState(false);
  const [isShown, setIsShown] = useState(false);

  const styles = useStyles();

  return (
    <>
      <Drawer anchor="left" open={drawer} onClose={() => setDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation" className={styles.upperGroup}>
          <Box className={styles.account}>
            <Button
              component="label"
              onMouseEnter={() => setIsShown(true)}
              onMouseLeave={() => setIsShown(false)}
            >
              <Avatar alt="Channel Avatar" src={ReneAvatar} className={styles.accountAvatar} />
              <input hidden accept="image/*" multiple type="file" />
            </Button>
          </Box>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon style={{ color: 'orange' }}>
                  <PersonAddIcon />
                </ListItemIcon>
                <ListItemText primary="Invite friends" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon style={{ color: 'red' }}>
                  <AddCircleIcon />
                </ListItemIcon>
                <ListItemText primary="New Channel" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon style={{ color: 'pink' }}>
                  <AllInboxIcon />
                </ListItemIcon>
                <ListItemText primary="Wallet" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon style={{ color: 'purple' }}>
                  <IndeterminateCheckBoxIcon />
                </ListItemIcon>
                <ListItemText primary="Hidden Channels" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon style={{ color: 'gray' }}>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon style={{ color: 'blue' }}>
                  <DarkModeIcon />
                </ListItemIcon>
                <Switch defaultChecked />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
        <Divider />
        <Box className={styles.termPosition}>
          <Typography variant="caption" display="block" className={styles.term}>
            <a href="https://www.google.com/" style={{ color: '#555b6e' }}>
              Terms and Conditions
            </a>
          </Typography>
          <Typography variant="caption" display="block" className={styles.term}>
            <a href="https://www.google.com/" style={{ color: '#555b6e' }}>
              About
            </a>
          </Typography>
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
