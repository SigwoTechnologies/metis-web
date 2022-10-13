import { signOut } from '@metis/features/auth/store/auth.slice';
import { setOpenCreateChannelDrawer } from '@metis/features/channels/store/channel.slice';
import { useAppDispatch } from '@metis/store/hooks';
import { openToast } from '@metis/store/ui/ui.slice';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import About from '../about/about';
import ProfileAvatar from '../profile-avatar/ProfileAvatar';
import ModalHiddenList from '../modal-hidden-list/ModalHiddenList';
import Wallet from '../wallet/Wallet';
import useStyles from './SearchChannel.styles';

const ChannelList = () => {
  const styles = useStyles();
  const [drawer, setDrawer] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleSignOut = () => {
    dispatch(signOut());
    dispatch(openToast({ text: 'Sign out successful', type: 'info' }));
  };

  const openCreateChannel = () => {
    setDrawer(false);
    dispatch(setOpenCreateChannelDrawer(true));
  };

  const handleShareMetis = () => {
    dispatch(openToast({ text: 'Invitation copied in clipboard', type: 'info' }));
    navigator.clipboard.writeText('Try out Metis! http://www.jup.io');
  };

  return (
    <>
      <Drawer anchor="left" open={drawer} onClose={() => setDrawer(false)}>
        {/* TODO fixed values are not good for responsive design */}
        <Box sx={{ width: 300 }} role="presentation" className={styles.upperGroup}>
          <Box className={styles.account}>
            <ProfileAvatar />
          </Box>

          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon className={styles.listItemIcon}>
                  <AddCircleIcon />
                </ListItemIcon>
                <ListItemText primary="New Channel" onClick={openCreateChannel} />
              </ListItemButton>
            </ListItem>

            <Wallet />

            <ListItem disablePadding>
              <ListItemButton onClick={() => setOpen(true)}>
                <ListItemIcon className={styles.listItemIcon}>
                  <IndeterminateCheckBoxIcon />
                </ListItemIcon>
                <ListItemText primary="Hidden Channels" />
              </ListItemButton>
            </ListItem>

            <ModalHiddenList open={open} onClose={() => setOpen(false)} />
            {/*
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon className={styles.listItemIcon}>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon className={styles.listItemIcon}>
                  <DarkModeIcon />
                </ListItemIcon>
                <Switch defaultChecked />
              </ListItemButton>
            </ListItem>
 */}
            <ListItem disablePadding>
              <ListItemButton onClick={handleShareMetis}>
                <ListItemIcon className={styles.listItemIcon}>
                  <PersonAddIcon />
                </ListItemIcon>
                <ListItemText primary="Share Metis with friends!" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
        <ListItem disablePadding>
          <ListItemButton onClick={handleSignOut}>
            <ListItemIcon className={styles.logout}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText className={styles.logout} primary="Sign out" />
          </ListItemButton>
        </ListItem>
        <Divider />
        <Box className={styles.termPosition}>
          <Typography variant="caption" display="block" className={styles.term}>
            <a
              href="https://jup.io/terms"
              target="_blank"
              rel="noreferrer noopener"
              style={{ color: '#555b6e' }}
            >
              Terms and Conditions
            </a>
          </Typography>

          <About title="About" message="This is Metis Web App. It is still under construction." />
        </Box>
      </Drawer>
      <Container maxWidth="xl" component="main">
        <Grid container columnSpacing={5}>
          <Grid item xs={2} className={styles.iconContainer}>
            <IconButton onClick={() => setDrawer(true)}>
              <MenuIcon />
            </IconButton>
          </Grid>
          {/* 
          <Grid item xs={10}>
            <FormControl variant="standard" fullWidth>
              <InputLabel>Search</InputLabel>
              <Input
                className={styles.inputText}
                disableUnderline
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
          */}
        </Grid>
      </Container>
    </>
  );
};

export default ChannelList;
