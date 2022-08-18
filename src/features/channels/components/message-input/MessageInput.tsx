/* eslint-disable react/jsx-props-no-spreading */
import { useAppSelector } from '@metis/store/hooks';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import { FilledInput } from '@mui/material';
import IconButton from '@mui/material/IconButton/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useSendMessage from '../../hooks/useSendMessage';
import useStyles from './MessageInput.styles';

type FormData = {
  message: string;
};

const MessageInput = () => {
  const classes = useStyles();
  const { selectedChannel } = useAppSelector((state) => state.channel);
  const { register, handleSubmit, reset: clearInput } = useForm<FormData>();
  const { sendEncryptedMessage, loading } = useSendMessage();

  useEffect(() => {
    clearInput();
  }, [selectedChannel]);

  const onSubmit = ({ message }: FormData) => {
    sendEncryptedMessage(message);
    clearInput();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
              disabled={loading}
              type="submit"
              aria-label="send message"
              edge="start"
              size="medium"
              sx={{ padding: 1.5 }}
            >
              <SendIcon />
            </IconButton>
          </InputAdornment>
        }
        {...register('message', { required: true })}
      />
    </form>
  );
};

export default MessageInput;