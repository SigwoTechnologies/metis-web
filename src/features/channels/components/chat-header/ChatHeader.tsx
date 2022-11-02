import Modal from '@metis/common/components/ui/Modal';
import { findMembers } from '@metis/features/channels/store/channel.actions';
import { useAppDispatch, useAppSelector } from '@metis/store/hooks';
import { openToast } from '@metis/store/ui/ui.slice';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { LoadingButton } from '@mui/lab';
import { Button, Menu, MenuItem } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { MouseEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usToggleMuteChannel } from '../../hooks/useToggleMuteChannel';
import { hideChannel as hideChannelAction } from '../../store/channel.slice';
import InviteUserModal from '../invite-user-modal/InviteUserModal';
import ChannelInfo from './channel-info/ChannelInfo';
import useStyles from './ChatHeader.styles';

const ChatHeader = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [muteModalOpen, setMuteModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { selectedChannel } = useAppSelector((state) => state.channel);

  useEffect(() => {
    if (selectedChannel.channelAddress) {
      dispatch(findMembers(selectedChannel.channelAddress));
    }
  }, [selectedChannel.channelAddress]);

  const menu = Boolean(anchorEl);
  const openMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const openInviteUserModal = () => {
    closeMenu();
    setOpen(true);
  };

  const hideChannel = () => {
    dispatch(hideChannelAction(selectedChannel));
    dispatch(openToast({ type: 'info', text: 'The channel was hidden successfully' }));
    navigate('/main');
    closeMenu();
  };

  // const openMuteModal = () => {
  //   setMuteModalOpen(true);
  //   closeMenu();
  // };

  const muteChannel = () => {
    setLoading(true);
    dispatch(usToggleMuteChannel(selectedChannel.channelAddress)).then(() => {
      setMuteModalOpen(false);
      setLoading(false);
    });
  };

  // const unmuteChannel = () => {
  //   setLoading(true);
  //   dispatch(toggleMuteChannel(selectedChannel.channelAddress)).then(() => {
  //     closeMenu();
  //     setLoading(false);
  //   });
  // };

  return (
    <>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={menu}
        onClose={closeMenu}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={openInviteUserModal}>Invite user</MenuItem>
        <MenuItem onClick={hideChannel}>Hide channel</MenuItem>
      </Menu>
      <Modal open={muteModalOpen} onClose={() => setMuteModalOpen(false)}>
        <Typography
          variant="h5"
          sx={{ mb: '1rem' }}
        >{`Mute ${selectedChannel.channelName}?`}</Typography>
        <Typography component="p" variant="body2" sx={{ mb: '1rem' }}>
          You won&apos;t receive notifications from this channel. Do you want to proceed?
        </Typography>
        <Box display="flex" justifyContent="center" gap="1rem">
          <Button variant="outlined" color="error" onClick={() => setMuteModalOpen(false)}>
            cancel
          </Button>
          <LoadingButton loading={loading} variant="contained" onClick={muteChannel}>
            confirm
          </LoadingButton>
        </Box>
      </Modal>
      <InviteUserModal closeModal={() => setOpen(false)} open={open} />
      <Box className={classes.titleContainer}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Avatar
            alt={selectedChannel.channelName}
            src={selectedChannel.channelName}
            className={classes.avatar}
          />

          <ChannelInfo selectedChannel={selectedChannel} />
        </Box>
        <IconButton onClick={openMenu} aria-label="channel settings" size="large">
          <MoreHorizIcon />
        </IconButton>
      </Box>
    </>
  );
};
export default ChatHeader;
