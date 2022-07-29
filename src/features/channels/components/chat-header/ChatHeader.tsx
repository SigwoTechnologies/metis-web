import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';

import BugAvatar from '@metis/assets/images/avatars/bug.jpg';
import { useAppSelector } from '@metis/store/hooks';
import { Menu, MenuItem } from '@mui/material';
import InviteUserModal from '../invite-user-modal/InviteUserModal';
import useStyles from './ChatHeader.styles';
import { selectState } from '../../store/channel.slice';

const ChatHeader = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { selectedChannel } = useAppSelector(selectState);

  const menu = Boolean(anchorEl);
  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const openInviteUserModal = () => {
    closeMenu();
    setOpen(true);
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
      </Menu>
      <InviteUserModal closeModal={closeModal} open={open} />
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
