import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import Box from '@mui/material/Box';
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import useStyles from './ChannelListItem.styles';

type Props = {
  name: string;
  message: string;
  date: string;
  isRead: boolean;
  avatar?: string;
  onClick?: () => void;
  selected?: boolean;
  onHideChannel?: () => void;
};

const ChannelListItem = ({
  name,
  message,
  date,
  isRead,
  avatar = name,
  onClick,
  selected = false,
  onHideChannel,
}: Props) => {
  const classes = useStyles();

  return (
    <Box display="flex" alignItems="center">
      <ListItemButton onClick={onClick} alignItems="flex-start" selected={selected}>
        <ListItemAvatar>
          <Avatar alt={name} src={avatar} className={classes.avatar} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Box display="flex" justifyContent="space-between">
              <Box className={classes.channelName}>
                <Typography component="span" variant="caption" color="text.primary">
                  {name}
                </Typography>
              </Box>
              <Box className={classes.channelDescription}>
                <Box display="flex">
                  {isRead ? (
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
            <Typography component="span" variant="caption" color="text.secondary">
              {message}
            </Typography>
          }
        />
      </ListItemButton>
      <Box display="flex">
        <VisibilityOffIcon fontSize="small" color="primary" onClick={onHideChannel} />
      </Box>
    </Box>
  );
};

export default ChannelListItem;
