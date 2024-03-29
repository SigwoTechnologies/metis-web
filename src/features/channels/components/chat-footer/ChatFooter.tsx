import { useAppDispatch, useAppSelector } from '@metis/store/hooks';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton/IconButton';
import { useEffect } from 'react';
import { discardReply } from '../../store/channel.slice';
import MessageReply from '../chat-content/message-reply/MessageReply';
import MessageInput from '../message-input/MessageInput';
import useStyles from './ChatFooter.styles';

const ChatFooter = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const {
    reply: { decryptedReplyMessage, replyRecipientAlias },
    selectedChannel: { channelAddress },
  } = useAppSelector((state) => state.channel);

  useEffect(() => {
    dispatch(discardReply());
  }, [channelAddress]);

  return (
    <>
      {decryptedReplyMessage && (
        <Box className={classes.replyContainer}>
          <Box className={classes.replyColumn}>
            <MessageReply
              color="#A36300"
              message={decryptedReplyMessage}
              name={replyRecipientAlias}
            />
          </Box>

          <Box className={classes.closeButtonContainer}>
            <IconButton className={classes.closeButton} onClick={() => dispatch(discardReply())}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      )}

      <FormControl fullWidth variant="standard" sx={{ backgroundColor: '#000' }}>
        <MessageInput />
      </FormControl>
    </>
  );
};

export default ChatFooter;
