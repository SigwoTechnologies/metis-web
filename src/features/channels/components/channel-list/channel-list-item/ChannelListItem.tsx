import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import useOnMount from '@metis/common/hooks/useOnMount';
import EncryiptionService from '@metis/features/auth/services/encryption.service';
import useChat from '@metis/features/channels/hooks/useChat';
import { addNewMessage } from '@metis/features/channels/store/channel.slice';
import { Channel } from '@metis/features/channels/types/channel';
import { useAppDispatch, useAppSelector } from '@metis/store/hooks';
import { enums } from 'openpgp';
import useStyles from './ChannelListItem.styles';

type Props = {
  channel: Channel;
  date: string;
  avatar?: string;
  onClick?: () => void;
  selected?: boolean;
};

const ChannelListItem = ({
  channel,
  date,
  avatar = channel.channelName,
  onClick,
  selected = false,
}: Props) => {
  const classes = useStyles();
  const {
    channel: { mutedChannels },
    auth: {
      userData: { privateKeyArmored, passphrase },
    },
  } = useAppSelector((state) => state);
  const isMuted = mutedChannels.includes(channel.channelAddress);
  const { onSendMessage } = useChat(channel.channelAddress);
  const dispatch = useAppDispatch();

  // When a new message is created we add that message to the 'messages' property
  // of the channel (this is a socket event so we only connect to it on mount)
  useOnMount(() => {
    onSendMessage(async (message) => {
      const encryptionService = new EncryiptionService();
      const privateKey = await encryptionService.decryptPrivateKey(passphrase, privateKeyArmored, {
        preferredHashAlgorithm: enums.hash.sha256,
        preferredSymmetricAlgorithm: enums.symmetric.aes128,
      });
      const encryptedMessage = await encryptionService.readMsg(message.message);
      const decryptedMessage = await encryptionService.decryptMessage(encryptedMessage, privateKey);

      dispatch(
        addNewMessage({
          channelAddress: channel.channelAddress,
          message: { ...message, decryptedMessage },
        })
      );
    });
  });

  return (
    <Box display="flex" alignItems="center">
      <ListItemButton
        className={classes.listItemButton}
        onClick={onClick}
        alignItems="flex-start"
        selected={selected}
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
                <Box display="flex">
                  {true ? (
                    <DoneAllIcon fontSize="small" color="primary" />
                  ) : (
                    <DoneIcon fontSize="small" color="primary" />
                  )}
                </Box>
                <Box>
                  <Typography component="span" variant="caption" color="text.primary">
                    {date}
                  </Typography>
                </Box>
              </Box>
            </Box>
          }
          secondary={
            <Box display="flex">
              <Typography noWrap component="span" variant="caption" color="text.secondary">
                {channel.messages.length > 0 ? channel.messages[0].decryptedMessage : ''}
              </Typography>
              {isMuted && <VolumeOffIcon className={classes.mutedIcon} fontSize="small" />}
            </Box>
          }
        />
      </ListItemButton>
    </Box>
  );
};

export default ChannelListItem;
