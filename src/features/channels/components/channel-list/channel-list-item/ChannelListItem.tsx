import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DoneIcon from '@mui/icons-material/Done';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import { Channel } from '@metis/features/channels/types/channel';
import { NewChannel } from '@metis/features/channels/types/newChannel';
import { useAppSelector } from '@metis/store/hooks';
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
  const { mutedChannels } = useAppSelector((state) => state.channel);
  const isMuted = mutedChannels.includes(channel.channelAddress);

  return (
    <Box display="flex" alignItems="center">
      <ListItemButton
        className={classes.listItemButton}
        onClick={onClick}
        alignItems="flex-start"
        selected={selected}
      >
        <ListItemAvatar>
          <Avatar alt={name} src={avatar} className={classes.avatar} />
        </ListItemAvatar>
        <ListItemText
          disableTypography
          primary={
            <Box display="flex" justifyContent="space-between">
              <Box className={classes.channelName}>
                <Typography component="span" variant="caption" color="text.primary">
                  {name}
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
                {message}
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
