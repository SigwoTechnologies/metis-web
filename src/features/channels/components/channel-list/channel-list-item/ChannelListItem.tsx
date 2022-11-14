import useOnMount from '@metis/common/hooks/useOnMount';
import EncryiptionService from '@metis/features/auth/services/encryption.service';
import ImageIcon from '@mui/icons-material/Image';
import useChat from '@metis/features/channels/hooks/useChat';
import { useGetMessages } from '@metis/features/channels/hooks/useGetMessages';
import { addNewMessage, setSelectedChannel } from '@metis/features/channels/store/channel.slice';
import { IChannel } from '@metis/features/channels/types/channel.interface';
import { useAppDispatch, useAppSelector } from '@metis/store/hooks';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import useStyles from './ChannelListItem.styles';

type Props = {
  channel: IChannel;
  avatar?: string;
};

export const ChannelListItem = ({ channel, avatar = channel.imageChannel }: Props) => {
  const classes = useStyles();
  const {
    channel: { mutedChannels, selectedChannel },
    auth: {
      userData: { privateKeyArmored, passphrase },
    },
  } = useAppSelector((state) => state);
  const navigate = useNavigate();

  const isMuted = mutedChannels.includes(channel.channelAddress);
  const { onSendMessage } = useChat(channel.channelAddress);
  const dispatch = useAppDispatch();

  // When a new message is created we add that message to the 'messages' property
  // of the channel (this is a socket event so we only connect to it on mount)
  useOnMount(() => {
    onSendMessage(async (message) => {
      const encryptionService = new EncryiptionService();
      dispatch(
        addNewMessage({
          message: {
            ...message,
            decryptedMessage: await encryptionService.decryptMessage(
              message.message,
              passphrase,
              privateKeyArmored
            ),
            decryptedReplyMessage:
              message.replyMessage &&
              (await encryptionService.decryptMessage(
                message.replyMessage,
                passphrase,
                privateKeyArmored
              )),
          },
        })
      );
    });
  });

  const onSelectChannel = () => {
    navigate(`/main/${channel.channelAddress}`);
    if (channel.channelAddress !== selectedChannel.channelAddress) {
      dispatch(setSelectedChannel(channel.channelAddress));
      dispatch(useGetMessages({ channelAddress: channel.channelAddress }));
    }
  };

  return (
    <Box display="flex" alignItems="center">
      <ListItemButton
        className={classes.listItemButton}
        onClick={onSelectChannel}
        // alignItems="flex-start"
        selected={channel.channelAddress === selectedChannel.channelAddress}
      >
        <ListItemAvatar>
          <Avatar alt={channel.channelName} src={avatar} className={classes.avatar} />
        </ListItemAvatar>

        <ListItemText
          disableTypography
          primary={
            <Box display="flex" justifyContent="space-between">
              <Box className={classes.channelName}>
                <Typography component="span" variant="caption" color="text.primary">
                  {channel.channelName}
                </Typography>
              </Box>
              <Box className={classes.channelDescription}>
                <Box>
                  <Typography
                    component="span"
                    variant="caption"
                    color="text.secondary"
                    fontSize="small"
                    title={dayjs(channel.lastMessage?.createdAt).format('MM/DD/YYYY hh:mm:ss A')}
                  >
                    {dayjs(channel.lastMessage?.createdAt).format('hh:mm A')}
                  </Typography>
                </Box>
              </Box>
            </Box>
          }
          secondary={
            <Box display="flex">
              <Typography noWrap component="span" variant="caption" color="text.secondary">
                {channel.lastMessage?.messageType === 'attachment' && (
                  <div
                    style={{
                      display: 'flex',
                      fontSize: '1rem',
                    }}
                  >
                    <ImageIcon fontSize="small" /> Image
                  </div>
                )}

                {channel.lastMessage?.decryptedMessage}
              </Typography>
              {isMuted && <VolumeOffIcon className={classes.mutedIcon} fontSize="small" />}
            </Box>
          }
        />
      </ListItemButton>
    </Box>
  );
};
