import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';

import BugAvatar from '@metis/assets/images/avatars/bug.jpg';
import { useAppDispatch, useAppSelector } from '@metis/store/hooks';
import { openToast } from '@metis/store/ui/ui.slice';
import { CircularProgress, Menu, MenuItem } from '@mui/material';
import { toggleMuteChannel } from '../../store/channel.actions';
import { selectState } from '../../store/channel.slice';
import InviteUserModal from '../invite-user-modal/InviteUserModal';
import useStyles from './ChatHeader.styles';

const ChatHeader = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { selectedChannel, mutedChannels } = useAppSelector(selectState);
  const dispatch = useAppDispatch();
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

  const muteChannel = () => {};
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
        {!isMuted && (
          <MenuItem onClick={() => dispatch(toggleMuteChannel(selectedChannel.channelAddress))}>
            Mute channel
          </MenuItem>
        )}
      </Menu>
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
