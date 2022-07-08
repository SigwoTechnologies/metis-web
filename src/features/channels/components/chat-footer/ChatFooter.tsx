import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton/IconButton';
import FormControl from '@mui/material/FormControl';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import SendIcon from '@mui/icons-material/Send';
import FilledInput from '@mui/material/FilledInput';
import useStyles from './ChatFooter.styles';

const ChatFooter = () => {
  const classes = useStyles();
  return (
    <FormControl variant="standard" fullWidth>
      <FilledInput
        sx={{ displat: 'flex', justifyContent: 'center', alignItems: 'center' }}
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
