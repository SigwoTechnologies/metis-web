import Modal from '@metis/common/components/ui/Modal';
import { findMembers } from '@metis/features/channels/store/channel.actions';
import { useAppDispatch, useAppSelector } from '@metis/store/hooks';
import { openToast } from '@metis/store/ui/ui.slice';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { LoadingButton } from '@mui/lab';
import { Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { selectedChannel } = useAppSelector((state) => state.channel);

  useEffect(() => {
    if (selectedChannel.channelAddress) {
      dispatch(findMembers(selectedChannel.channelAddress));
    }
  }, [selectedChannel.channelAddress]);

  const openInviteUserModal = () => {
    setOpen(true);
  };

  const hideChannel = () => {
    dispatch(hideChannelAction(selectedChannel));
    dispatch(openToast({ type: 'info', text: 'The channel was hidden successfully' }));
    navigate('/main');
  };

  const muteChannel = () => {
    setLoading(true);
    dispatch(usToggleMuteChannel(selectedChannel.channelAddress)).then(() => {
      setMuteModalOpen(false);
      setLoading(false);
    });
  };

  return (
    <>
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
        <Box display="flex">
          <IconButton onClick={hideChannel} aria-label="channel settings" size="large">
            <VisibilityOffIcon />
          </IconButton>
          <IconButton onClick={openInviteUserModal} aria-label="channel settings" size="large">
            <GroupAddIcon />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};
export default ChatHeader;
