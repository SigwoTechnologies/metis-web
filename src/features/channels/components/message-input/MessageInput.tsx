import { useAppDispatch } from '@metis/store/hooks';
// import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import EmojiEmotions from '@mui/icons-material/EmojiEmotions';
// import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import { FilledInput } from '@mui/material';
import IconButton from '@mui/material/IconButton/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Picker from 'emoji-picker-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useSelectedChannel from '../../hooks/useSelectedChannel';
import useSendMessage from '../../hooks/useSendMessage';
import { discardReply } from '../../store/channel.slice';
import useStyles from './MessageInput.styles';

type FormData = {
  message: string;
};

type EmojiObject = {
  emoji: string;
  names: string[];
  originalUnified: string;
  unified: string;
};

const MessageInput = () => {
  const classes = useStyles();
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const selectedChannel = useSelectedChannel();
  const { register, handleSubmit, reset: clearInput, watch, setValue } = useForm<FormData>();
  const { sendEncryptedMessage, loading } = useSendMessage();
  const dispatch = useAppDispatch();

  useEffect(() => {
    clearInput();
  }, [selectedChannel]);

  const onSubmit = ({ message }: FormData) => {
    if (!message.trim()) {
      return;
    }

    sendEncryptedMessage(message).then(() => {
      dispatch(discardReply());
      clearInput();
    });
  };

  const onEmojiClick = (_event: any, { emoji }: EmojiObject) => {
    setValue('message', watch('message') + emoji);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FilledInput
        autoComplete="off"
        className={classes.button}
        // startAdornment={
        //   <InputAdornment position="start">
        //     <IconButton aria-label="send message" edge="start" size="medium" sx={{ p: 1.5 }}>
        //       <AttachFileIcon />
        //     </IconButton>
        //     <IconButton
        //       aria-label="send message"
        //       edge="start"
        //       size="medium"
        //       sx={{ p: 1.5, mr: 0.5 }}
        //     >
        //       <VideocamOutlinedIcon />
        //     </IconButton>
        //   </InputAdornment>
        // }

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

            <IconButton
              disabled={loading}
              edge="start"
              size="medium"
              sx={{ padding: 1.5 }}
              onClick={() => setEmojiPickerVisible(!emojiPickerVisible)}
              style={{ position: 'relative' }}
            >
              {emojiPickerVisible && (
                <div className={classes.emojiPicker}>
                  <Picker
                    onEmojiClick={onEmojiClick}
                    pickerStyle={{ border: 'none', boxShadow: 'none' }}
                    disableSearchBar
                    disableSkinTonePicker
                    groupVisibility={{
                      flags: false,
                    }}
                  />
                </div>
              )}
              <EmojiEmotions />
            </IconButton>
          </InputAdornment>
        }
        {...register('message', { required: true })}
      />
    </form>
  );
};

export default MessageInput;
