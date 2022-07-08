import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import BugAvatar from 'src/assets/images/avatars/bug.jpg';
import ReneAvatar from 'src/assets/images/avatars/rene.jpg';
import Modal from 'src/common/components/ui/Modal';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import useStyles from './ChatHeader.styles';

const ChatHeader = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <>
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
        <Button className={classes.button} variant="contained">
          Invite
        </Button>
        <Button color="error" onClick={closeModal} className={classes.button}>
          Cancel
        </Button>
      </Modal>
      <Box className={classes.header}>
        <Box className={classes.avatarContainer}>
          <Avatar alt="Channel Avatar" src={BugAvatar} className={classes.avatar} />
        </Box>
        <Box className={classes.titleContainer}>
          <Typography variant="body1">Metis bugs report</Typography>
          <IconButton onClick={() => setOpen(true)} aria-label="channel settings" size="large">
            <MoreHorizIcon />
          </IconButton>
        </Box>
        <Box className={classes.account}>
          <Avatar alt="Channel Avatar" src={ReneAvatar} className={classes.accountAvatar} />
        </Box>
      </Box>
    </>
  );
};
export default ChatHeader;
