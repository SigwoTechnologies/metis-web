import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import Box from '@mui/material/Box';
import CheckIcon from '@mui/icons-material/Check';

import useStyles from './ChannelListItem.styles';

type Props = {
  name: string;
  description: string;
  date: string;
  avatar?: string;
};

const ChannelListItem = ({ name, description, date, avatar = name }: Props) => {
  const classes = useStyles();

  return (
    <ListItemButton alignItems="flex-start">
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
                <CheckIcon fontSize="small" color="primary" />
                <CheckIcon fontSize="small" sx={{ ml: '-1.7rem' }} color="primary" />
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
            {description}
          </Typography>
        }
      />
    </ListItemButton>
  );
};

export default ChannelListItem;
