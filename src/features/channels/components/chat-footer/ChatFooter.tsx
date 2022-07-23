import useToggle from '@metis/common/hooks/useToggle';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import { Box } from '@mui/material';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import MessageReply from '../chat-content/message-reply/MessageReply';
import useStyles from './ChatFooter.styles';

const ChatFooter = () => {
  const classes = useStyles();
  const [openReply, setOpenReply] = useToggle(true);

  return (
    <FormControl variant="standard" fullWidth>
      {openReply && (
        <Box className={classes.replyContainer}>
          <MessageReply name="Pompilio Fiore" message="How is it going?" />
          <div className={classes.closeButtonContainer}>
            <IconButton className={classes.closeButton} onClick={setOpenReply}>
              <CloseIcon />
            </IconButton>
          </div>
        </Box>
      )}
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
            <IconButton aria-label="send message" edge="start" size="medium" sx={{ padding: 1.5 }}>
              <SendIcon />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default ChatFooter;
