import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import useStyles from './Message.styles';

type Props = {
  name: string;
  message: string;
  date: string;
  color: string;
  avatar?: string;
};

const Message = ({ name, message, date, color, avatar = name }: Props) => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Box className={classes.avatarContainer}>
        <Avatar alt="pomp" src={avatar} className={classes.avatar} />
      </Box>
      <Box className={classes.messageContainer}>
        <Typography variant="body2" fontWeight="bold" sx={{ color }}>
          {name}
        </Typography>
        <Box className={classes.message}>
          <Typography variant="body2">{message}</Typography>
          <Typography variant="caption" className={classes.date}>
            {date}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Message;
