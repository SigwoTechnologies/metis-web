import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';

import BugAvatar from '@metis/assets/images/avatars/bug.jpg';
import Modal from '@metis/common/components/ui/Modal';
import { useAppDispatch, useAppSelector } from '@metis/store/hooks';
import { LoadingButton } from '@mui/lab';
import { Button, CircularProgress, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toggleMuteChannel } from '../../store/channel.actions';
import { hideChannel as hideChannelAction, selectState } from '../../store/channel.slice';
import InviteUserModal from '../invite-user-modal/InviteUserModal';
import useStyles from './ChatHeader.styles';

const ChatHeader = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [muteModalOpen, setMuteModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { selectedChannel, mutedChannels } = useAppSelector(selectState);
  const isMuted = mutedChannels.includes(selectedChannel.channelAddress);

  const menu = Boolean(anchorEl);
  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
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
    navigate('/main');
    closeMenu();
  };

  const openMuteModal = () => {
    setMuteModalOpen(true);
    closeMenu();
  };

  const muteChannel = () => {
    setLoading(true);
    dispatch(toggleMuteChannel(selectedChannel.channelAddress)).then(() => {
      setMuteModalOpen(false);
      setLoading(false);
    });
  };

  const unmuteChannel = () => {
    setLoading(true);
    dispatch(toggleMuteChannel(selectedChannel.channelAddress)).then(() => {
      closeMenu();
      setLoading(false);
    });
  };

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
        {isMuted && (
          <MenuItem onClick={unmuteChannel}>
            Unmute channel
            {loading && (
              <CircularProgress
                color="inherit"
                size="1.1428571428571428rem"
                sx={{ marginLeft: '10px' }}
              />
            )}
          </MenuItem>
        )}
        {!isMuted && <MenuItem onClick={openMuteModal}>Mute channel</MenuItem>}
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
          <Avatar alt="Channel Avatar" src={BugAvatar} className={classes.avatar} />
          <Typography variant="body1" sx={{ ml: '1rem' }}>
            {selectedChannel.channelName}
          </Typography>
        </Box>
        <IconButton onClick={openMenu} aria-label="channel settings" size="large">
          <MoreHorizIcon />
        </IconButton>
      </Box>
    </>
  );
};
export default ChatHeader;
