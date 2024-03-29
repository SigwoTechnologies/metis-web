/* eslint-disable @typescript-eslint/no-explicit-any */
import httpService from '@metis/common/services/http.service';
import connectSocket from '@metis/common/services/socket.service';
import { getToken } from '@metis/common/services/token.service';
import { useAppDispatch } from '@metis/store/hooks';
import { openToast } from '@metis/store/ui/ui.slice';
import clipIcon from '@metis/assets/images/misc/clipIcon.svg';
import emoticonIcon from '@metis/assets/images/misc/emoticonIcon.svg';
import sendIcon from '@metis/assets/images/misc/sendIcon.svg';
import { FilledInput } from '@mui/material';
import IconButton from '@mui/material/IconButton/IconButton';
import Box from '@mui/material/Box';
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
    if (uploadingImage) {
      clearInput();
      const socket = connectSocket({
        query: {
          room: `upload-${channelAddress}`, // address of the current user
          user: channelAddress, // address of the current user
        },
      }).socket('/upload');

      if (channelAddress) {
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
            socket.close();
          }
        );
        socket.on('uploadFailed', async ({ errorMessage }: { errorMessage: string }) => {
          setUploadingImage(false);
          dispatch(openToast({ text: errorMessage, type: 'error' }));
          socket.close();
        });
      }
    }
  }, [uploadingImage]);

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
    if (file) {
      setSelectedFile(file);
    }
  };

  const onFilesError = (error: Error) => {
    dispatch(
      openToast({
        text: `
        ${error.message}${error.message.includes(' is too large') ? ', maximum size 1.6MB' : ''}
        `,
        type: 'error',
      })
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        display: 'block',
        position: 'relative',
        margin: '0 auto 10px',
        width: '95%',
      }}
      className={classes.formInput}
    >
      {selectedFile && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#232323',
            width: '100%',
            height: 'auto',
            padding: '3% 4%',
            borderRadius: '10px',
            marginBottom: '10px',
          }}
        >
          <img src={preview} alt="Alo" style={{ maxWidth: '80%', maxHeight: '260px' }} />
        </div>
      )}
      <IconButton
        disabled={loading}
        edge="start"
        size="medium"
        sx={{
          padding: 1.5,
          backgroundColor: 'transparent !important',
        }}
        onClick={() => setEmojiPickerVisible(!emojiPickerVisible)}
        className={classes.emojiIcon}
      >
        <Box
          component="img"
          src={emoticonIcon}
          alt="emojis"
          sx={{
            height: '24px',
            width: '24px',
            backgroundColor: 'transparent !important',
          }}
        />
      </IconButton>
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
      <IconButton
        aria-label="send message"
        edge="start"
        size="medium"
        sx={{ p: 1.5, backgroundColor: 'transparent !important' }}
        className={classes.attachmenIcon}
      >
        <Files
          className="files-dropzone"
          onChange={handleSelectFile}
          accepts={['image/jpg', 'image/png', 'image/jpeg']}
          multiple
          maxFileSize={1_600_000}
          onError={onFilesError}
          minFileSize={0}
          clickable
        >
          <Box
            component="img"
            src={clipIcon}
            alt="emojis"
            sx={{
              height: '23px',
              width: '24px',
              transform: 'rotate(30deg)',
            }}
          />
        </Files>
      </IconButton>
      <IconButton
        disabled={loading}
        type="submit"
        aria-label="send message"
        edge="end"
        size="medium"
        className={classes.sendIcon}
        sx={{
          padding: 1.5,
          backgroundColor: 'transparent !important',
        }}
      >
        <Box
          component="img"
          src={sendIcon}
          alt="send"
          sx={{
            height: '23px',
            width: '24px',
          }}
        />
      </IconButton>
      <FilledInput
        sx={{
          transition: 'ease-in-out 200ms',
          '&:hover': {
            borderBottom: 'none !important',
          },
          '&::before': {
            borderRadius: '10px',
            borderBottom: 'none !important',
          },
          '&::after': {
            border: 'none !important',
            borderRadius: '10px',
          },
        }}
        autoComplete="off"
        disabled={uploadingImage}
        className={classes.button}
        inputProps={{ className: classes.footerInputStyle }}
        // endAdornment={}
        {...register('message')}
      />
    </form>
  );
};

export default MessageInput;
