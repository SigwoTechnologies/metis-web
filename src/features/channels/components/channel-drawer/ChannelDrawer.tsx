import {
  setIsOpenChannelDrawer,
  setOpenCreateChannelDrawer,
} from '@metis/features/channels/store/channel.slice';
import { useAppDispatch, useAppSelector } from '@metis/store/hooks';
import { openToast } from '@metis/store/ui/ui.slice';
import shareIcon from '@metis/assets/images/misc/shareIcon.svg';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton/IconButton';
import hamburgerMenu from '@metis/assets/images/misc/hamburger.svg';
import newChannelIcon from '@metis/assets/images/misc/newChannelIcon.svg';
import hiddenChannelIcon from '@metis/assets/images/misc/hiddenChannelIcon.svg';
import CloseIcon from '@mui/icons-material/Close';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import About from '../channel-list/about/about';
import ModalHiddenList from '../channel-list/modal-hidden-list/ModalHiddenList';
import ProfileAvatar from '../channel-list/profile-avatar/ProfileAvatar';
import Wallet from '../channel-list/wallet/Wallet';
import useStyles from './ChannelDrawer.styles';
import { SignOutButton } from './sign-out-button/SignOutButton';
import { UnlinkButton } from './unlink-button/UnlinkButton';

export const ChannelDrawer = () => {
  const styles = useStyles();
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { isOpenChannelDrawer } = useAppSelector((state) => state.channel);

  const openCreateChannel = () => {
    dispatch(setOpenCreateChannelDrawer(true));
  };

  const handleOpenDrawer = () => {
    dispatch(setIsOpenChannelDrawer(!isOpenChannelDrawer));
  };

  const handleShareMetis = () => {
    dispatch(openToast({ text: 'Try out Metis! http://www.jup.io', type: 'info' }));
    navigator.clipboard.writeText('Try out Metis! http://www.jup.io');
  };

  return (
    <>
      <Box className={styles.iconContainer}>
        <IconButton
          onClick={handleOpenDrawer}
          sx={{
            '&:hover': {
              backgroundColor: 'transparent',
            },
          }}
        >
          <Box
            component="img"
            src={hamburgerMenu}
            alt="hamburger-menu"
            sx={{ height: '24px', width: '24px' }}
          />
        </IconButton>
      </Box>

      <Drawer anchor="left" open={isOpenChannelDrawer} onClose={handleOpenDrawer}>
        {/* TODO fixed values are not good for responsive design */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            width: '400px',
            padding: '2% 4%',
            '@media(max-width: 768px)': {
              width: '300px',
            },
          }}
        >
          <Box sx={{ width: '100%' }} role="presentation" className={styles.upperGroup}>
            <Box
              className={styles.closeIconContainer}
              sx={{ width: '100%', justifyContent: 'flex-end', paddingBottom: '20px' }}
            >
              <CloseIcon onClick={handleOpenDrawer} className={styles.closeIcon} />
            </Box>
            <Box className={styles.account}>
              <ProfileAvatar />
            </Box>
            <List>
              <Wallet />
              <ListItem disablePadding>
                <ListItemButton className={styles.listItemButton}>
                  <ListItemIcon className={styles.listItemIcon}>
                    <Box
                      component="img"
                      src={newChannelIcon}
                      alt="new channel icon"
                      sx={{ height: '24px', width: '24px' }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="New Channel" onClick={openCreateChannel} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={() => setOpen(true)} className={styles.listItemButton}>
                  <ListItemIcon className={styles.listItemIcon}>
                    <Box
                      component="img"
                      src={hiddenChannelIcon}
                      alt="hidden icon"
                      sx={{ height: '24px', width: '24px' }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Hidden Channels" />
                </ListItemButton>
              </ListItem>
              <ModalHiddenList open={open} onClose={() => setOpen(false)} />
              <ListItem disablePadding>
                <ListItemButton onClick={handleShareMetis} className={styles.listItemButton}>
                  <ListItemIcon className={styles.listItemIcon}>
                    <Box
                      component="img"
                      src={shareIcon}
                      alt="share icon"
                      sx={{ height: '24px', width: '24px' }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Share Metis" />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
          <UnlinkButton />
          <SignOutButton />
          <Box className={styles.termPosition}>
            <Typography variant="caption" display="block" className={styles.term}>
              <a
                href="https://jup.io/terms"
                target="_blank"
                rel="noreferrer noopener"
                className={styles.link}
              >
                Terms and Conditions
              </a>
            </Typography>
            <About title="About" message="This is Metis Web App. It is still under construction." />
          </Box>
        </Box>
      </Drawer>
    </>
  );
};
