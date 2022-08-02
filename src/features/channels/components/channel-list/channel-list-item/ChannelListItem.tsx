import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import { Channel } from '@metis/features/channels/types/channel';
import { NewChannel } from '@metis/features/channels/types/newChannel';
import { useAppSelector } from '@metis/store/hooks';
import { CircularProgress } from '@mui/material';
import useStyles from './ChannelListItem.styles';

type Props = {
  channel: Channel | NewChannel;
  name: string;
  message: string;
  date: string;
  avatar?: string;
  onClick?: () => void;
  selected?: boolean;
};

const ChannelListItem = ({
  channel,
  name,
  message,
  date,
  avatar = name,
  onClick,
  selected = false,
}: Props) => {
  const classes = useStyles();
  const { pendingChannels } = useAppSelector((state) => state.channel);
  const isNewChannel = pendingChannels
    .map((newChannel) => newChannel.channelAddress)
    .includes(channel.channelAddress);

  return (
    <ListItemButton
      onClick={onClick}
      disabled={isNewChannel}
      alignItems="flex-start"
      selected={selected}
    >
      <ListItemAvatar>
        <Avatar alt={name} src={avatar} className={classes.avatar} />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Box display="flex" justifyContent="space-between">
            <Box className={classes.channelName}>
              <Typography component="span" variant="caption" color="text.primary">
                {channel.channelName}
              </Typography>
            </Box>
            <Box className={classes.channelDescription}>
              <Box display="flex">
                {/* TODO: enable this */}
                {/* {isRead ? (
                  <DoneAllIcon fontSize="small" color="primary" />
                ) : (
                  <DoneIcon fontSize="small" color="primary" />
                )} */}
                {isNewChannel && <CircularProgress size="1.4285714285714284rem" />}
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
          <Typography component="span" variant="caption" color="text.secondary">
            {message}
          </Typography>
        }
      />
    </ListItemButton>
  );
};

export default ChannelListItem;
