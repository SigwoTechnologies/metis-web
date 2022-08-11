import ReneAvatar from '@metis/assets/images/avatars/rene.jpg';
import Modal from '@metis/common/components/ui/Modal';
import { useAppDispatch, useAppSelector } from '@metis/store/hooks';
import { openToast } from '@metis/store/ui/ui.slice';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import MenuIcon from '@mui/icons-material/Menu';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { useMemo, useState } from 'react';
import { selectState, unhideChannel } from '../../../store/channel.slice';
import ChannelListItem from '../channel-list-item/ChannelListItem';
import useStyles from './SearchChannel.styles';

const ChannelList = () => {
  const styles = useStyles();
  const [drawer, setDrawer] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { channels, hiddenChannels } = useAppSelector(selectState);
  const hiddenChannelsAddreses = useMemo(
    () => hiddenChannels.map((channel) => channel.channelAddress),
    [hiddenChannels]
  );
  const closeModal = () => {
    setOpen(false);
  };
  const showChannel = (channelAddress: string, channelName: string) => {
    dispatch(unhideChannel(channelAddress));
    dispatch(
      openToast({
        type: 'info',
        text: `${channelName} was successfully removed from Hidden Channels`,
      })
    );
  };
  return (
    <>
      <Drawer anchor="left" open={drawer} onClose={() => setDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation" className={styles.upperGroup}>
          <Box className={styles.account}>
            <Button component="label">
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

            <Modal open={open} onClose={closeModal} title="Hidden Channels">
              <Card sx={{ minWidth: 400 }}>
                {channels.map(
                  (channel) =>
                    hiddenChannelsAddreses.includes(channel.channelAddress) && (
                      <Box key={channel.channelName}>
                        <Divider />
                        <Box className={styles.cardContainer}>
                          <CardContent className={styles.cardContent}>
                            <ChannelListItem
                              channel={channel}
                              key={channel.channelAddress}
                              name={channel.channelName}
                              date=""
                              message=""
                              onClick={() =>
                                showChannel(channel.channelAddress, channel.channelName)
                              }
                            />
                          </CardContent>
                          <CardActions
                            className={styles.actionContainer}
                            onClick={() => showChannel(channel.channelAddress, channel.channelName)}
                          >
                            <VisibilityIcon />
                          </CardActions>
                        </Box>
                      </Box>
                    )
                )}
              </Card>
            </Modal>

            <ListItem disablePadding>
              <ListItemButton onClick={() => setOpen(true)}>
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
        </Grid>
      </Container>
    </>
  );
};

export default ChannelList;
