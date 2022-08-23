import { useAppDispatch, useAppSelector } from '@metis/store/hooks';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton/IconButton';
import { discardReply } from '../../store/channel.slice';
import MessageReply from '../chat-content/message-reply/MessageReply';
import MessageInput from '../message-input/MessageInput';
import useStyles from './ChatFooter.styles';

const ChatFooter = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { replyMessage, replyRecipientAlias } = useAppSelector((state) => state.channel.reply);

  return (
    <>
      {replyMessage && (
        <Box className={classes.replyContainer}>
          <Box className={classes.replyColumn}>
            <MessageReply name={replyRecipientAlias} message={replyMessage} color="#A36300" />
          </Box>
          <Box className={classes.closeButtonContainer}>
            <IconButton className={classes.closeButton} onClick={() => dispatch(discardReply())}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      )}
      <FormControl variant="standard" fullWidth>
        <MessageInput />
      </FormControl>
    </>
  );
};

export default ChatFooter;
