import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

import BugAvatar from '@metis/assets/images/avatars/bug.jpg';
import Modal from '@metis/common/components/ui/Modal';
import Notification from '@metis/common/components/ui/Notification';
import { useParams } from 'react-router-dom';
import useStyles from './ChatHeader.styles';

const ChatHeader = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState(false);
  const { channelName } = useParams();

  const closeModal = () => {
    setOpen(false);
  };

  const openNotification = (): void => {
    closeModal();
    setNotification(true);
  };

  return (
    <>
      <Notification type="success" isOpen={notification} onClose={() => setNotification(false)} />
      <Modal onClose={closeModal} open={open}>
        <p>
          To invite another user to join this channel enter their Alias or Account ID and click
          &quot;invite&quot;
        </p>
        <TextField
          className={classes.textField}
          label="Enter or Account ID here"
          variant="standard"
        />
        <Button onClick={openNotification} className={classes.button} variant="contained">
          Invite
        </Button>
        <Button color="error" onClick={closeModal} className={classes.button}>
          Cancel
        </Button>
      </Modal>
      <Box className={classes.titleContainer}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Avatar alt="Channel Avatar" src={BugAvatar} className={classes.avatar} />
          <Typography variant="body1" sx={{ ml: '1rem' }}>
            {channelName}
          </Typography>
        </Box>
        <IconButton onClick={() => setOpen(true)} aria-label="channel settings" size="large">
          <MoreHorizIcon />
        </IconButton>
      </Box>
    </>
  );
};
export default ChatHeader;
