/* eslint-disable @typescript-eslint/no-explicit-any */
import httpService from '@metis/common/services/http.service';
import connectSocket from '@metis/common/services/socket.service';
import { getToken } from '@metis/common/services/token.service';
import { useAppDispatch } from '@metis/store/hooks';
import { openToast } from '@metis/store/ui/ui.slice';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import EmojiEmotions from '@mui/icons-material/EmojiEmotions';
import SendIcon from '@mui/icons-material/Send';
import { FilledInput } from '@mui/material';
import IconButton from '@mui/material/IconButton/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Picker from 'emoji-picker-react';
import { MouseEvent, useEffect, useState } from 'react';
import Files from 'react-files';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
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

type TFile = {
  lastModified: number;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
};

const MessageInput = () => {
  const classes = useStyles();
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const { channelAddress } = useParams();
  const { register, handleSubmit, reset: clearInput, watch, setValue } = useForm<FormData>();
  const { sendEncryptedMessage, sendEncryptedMessageWithAttachment, loading } = useSendMessage();
  const dispatch = useAppDispatch();
  const [selectedFile, setSelectedFile] = useState<TFile>();
  const [preview, setPreview] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    clearInput();
    const socket = connectSocket({
      query: {
        room: `upload-${channelAddress}`, // address of the current user
        user: channelAddress, // address of the current user
      },
    }).socket('/upload');

    if (channelAddress)
      socket.on(
        'uploadCreated',
        async ({
          url,
          fileName,
          mimeType,
          size,
          originalFileType,
        }: {
          url: string;
          fileName: string;
          mimeType: string;
          size: number;
          originalFileType: string;
        }) => {
          sendEncryptedMessageWithAttachment({
            channelAddress,
            attachmentObj: {
              url,
              originalname: fileName,
              mimetype: originalFileType || mimeType,
              size,
            },
          }).then(() => {
            dispatch(discardReply());
            clearInput();
            setUploadingImage(false);
          });
        }
      );

    return () => {
      socket.off('uploadCreated');
    };
  }, [channelAddress]);

  const sendFileMessage = async (file: TFile) => {
    if (!file) {
      throw new Error('[sendFileMessage]: File not provided');
    }

    const formData = new FormData();
    formData.append('file', file as any);
    formData.append('originalFileType', String(selectedFile?.type));
    formData.append('attachToJupiterAddress', String(channelAddress));
    formData.append('fileCategory', 'attachment');
    formData.append('name', 'file');

    const headers = {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
      Authorization: `Bearer ${getToken()}`,
    };
    setUploadingImage(true);
    dispatch(openToast({ text: 'Uploading image, please wait', type: 'info' }));
    setSelectedFile(undefined);
    setPreview('');

    return httpService.post('/jim/v1/api/files', formData, { headers });
  };

  const onSubmit = async ({ message }: FormData) => {
    if (selectedFile) {
      await sendFileMessage(selectedFile);
      return;
    }
    if (!message.trim()) {
      return;
    }
    sendEncryptedMessage({ text: message }).then(() => {
      dispatch(discardReply());
      clearInput();
    });
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview('');
      return undefined;
    }

    const objectUrl = URL.createObjectURL(selectedFile as unknown as Blob);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onEmojiClick = (_event: MouseEvent<Element>, { emoji }: EmojiObject) => {
    setValue('message', watch('message') + emoji);
  };

  const handleSelectFile = async ([file]: [TFile]) => {
    setSelectedFile(file);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ position: 'relative' }}>
      {selectedFile && <img src={preview} alt="Alo" style={{ width: '100px', height: '100px' }} />}
      <IconButton
        aria-label="send message"
        edge="start"
        size="medium"
        sx={{ p: 1.5 }}
        style={{ position: 'absolute', left: '12px', bottom: '5px', zIndex: '1', fontSize: '1px' }}
      >
        <Files
          className="files-dropzone"
          onChange={handleSelectFile}
          accepts={['image/*']}
          multiple
          maxFileSize={10000000}
          minFileSize={0}
          clickable
        >
          <AttachFileIcon />
        </Files>
      </IconButton>
      <FilledInput
        autoComplete="off"
        disabled={uploadingImage}
        className={classes.button}
        startAdornment={
          <InputAdornment position="start">
            {/* <IconButton
              aria-label="send message"
              edge="start"
              size="medium"
              sx={{ p: 1.5, mr: 0.5 }}
            >
              <VideocamOutlinedIcon />
            </IconButton> */}
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
        {...register('message')}
      />
    </form>
  );
};

export default MessageInput;
