import { useAppDispatch, useAppSelector } from '@metis/store/hooks';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import { Box } from '@mui/material';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { discardReply } from '../../store/channel.slice';
import MessageReply from '../chat-content/message-reply/MessageReply';
import useStyles from './ChatFooter.styles';

const ChatFooter = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { active, message, name } = useAppSelector((state) => state.channel.reply);

  return (
    <>
      {active && (
        <Box className={classes.replyContainer}>
          <Box className={classes.replyColumn}>
            <MessageReply name={name} message={message} color="#A36300" />
          </Box>
          <Box className={classes.closeButtonContainer}>
            <IconButton className={classes.closeButton} onClick={() => dispatch(discardReply())}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      )}
      <FormControl variant="standard" fullWidth>
        <FilledInput
          className={classes.button}
          startAdornment={
            <InputAdornment position="start">
              <IconButton aria-label="send message" edge="start" size="medium" sx={{ p: 1.5 }}>
                <AttachFileIcon />
              </IconButton>
              <IconButton
                aria-label="send message"
                edge="start"
                size="medium"
                sx={{ p: 1.5, mr: 0.5 }}
              >
                <VideocamOutlinedIcon />
              </IconButton>
            </InputAdornment>
          }
          inputProps={{ className: classes.footerInputStyle }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="send message"
                edge="start"
                size="medium"
                sx={{ padding: 1.5 }}
              >
                <SendIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </>
  );
};

export default ChatFooter;
