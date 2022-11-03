import { signOut } from '@metis/features/auth/store/auth.slice';
import { setOpenCreateChannelDrawer } from '@metis/features/channels/store/channel.slice';
import { useAppDispatch, useAppSelector } from '@metis/store/hooks';
import { openToast } from '@metis/store/ui/ui.slice';
import { findImage } from '@metis/features/auth/store/auth.actions';
import Modal from '@metis/common/components/ui/Modal';
import appConfig from '@metis/common/configuration/app.config';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PhonelinkEraseIcon from '@mui/icons-material/PhonelinkErase';
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
import CloseIcon from '@mui/icons-material/Close';
import WarningIcon from '@mui/icons-material/Warning';
import { useState, useEffect } from 'react';
import { LoadingButton } from '@mui/lab';
import About from '../about/about';
import ModalHiddenList from '../modal-hidden-list/ModalHiddenList';
import ProfileAvatar from '../profile-avatar/ProfileAvatar';
import Wallet from '../wallet/Wallet';
import useStyles from './SearchChannel.styles';

const ChannelList = () => {
  const styles = useStyles();
  const [drawer, setDrawer] = useState(false);
  const [open, setOpen] = useState(false);
  const [isOpenUnlink, setIsOpenUnlink] = useState(false);
  const dispatch = useAppDispatch();
  const {
    jupAccount: { address },
    imageAccount,
  } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!imageAccount) {
      const url = `${appConfig.api.baseUrl}/jim/v1/api/users/${address}/files/public-profile`;
      dispatch(findImage(url));
    }
  }, [imageAccount]);

  const handleSignOut = () => {
    dispatch(signOut());
    dispatch(openToast({ text: 'Sign out successful', type: 'info' }));
  };

  const handleUnlink = () => {
    setIsOpenUnlink(!isOpenUnlink);
  };

  const onUnlinkAccount = () => {
    localStorage.clear();
    window.location.reload();
  };

  const openCreateChannel = () => {
    setDrawer(false);
    dispatch(setOpenCreateChannelDrawer(true));
  };

  const handleShareMetis = () => {
    dispatch(openToast({ text: 'Try out Metis! http://www.jup.io', type: 'info' }));
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
          <ListItemButton onClick={handleUnlink}>
            <ListItemIcon className={styles.unlink}>
              <PhonelinkEraseIcon />
            </ListItemIcon>
            <ListItemText className={styles.unlink} primary="Unlink Account" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={handleSignOut}>
            <ListItemIcon className={styles.logout}>
              <ExitToAppIcon />
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
        </Grid>
      </Container>

      <Modal open={isOpenUnlink}>
        <div className={styles.iconContainerUnlink}>
          <WarningIcon className={styles.icon} color="primary" />
          <span>Are you sure to unlink your account?</span>
          <span>This action is irreversible.</span>
          <span>You could lose your Metis account.</span>
        </div>

        <IconButton aria-label="close" onClick={handleUnlink} className={styles.closeButton}>
          <CloseIcon />
        </IconButton>

        <LoadingButton
          fullWidth
          variant="contained"
          onClick={onUnlinkAccount}
          style={{
            width: '20rem',
          }}
        >
          <span className={styles.span}>Unlink your account</span>
        </LoadingButton>
      </Modal>
    </>
  );
};

export default ChannelList;
