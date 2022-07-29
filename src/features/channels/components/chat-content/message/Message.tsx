import { updateReply } from '@metis/features/channels/store/channel.slice';
import { useAppDispatch } from '@metis/store/hooks';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';

import useStyles from './Message.styles';

type Props = {
  name: string;
  message: string;
  date: string;
  color: string;
  avatar?: string;
  children?: React.ReactElement;
};

const Message = ({ name, message, date, color, children, avatar = name }: Props) => {
  const classes = useStyles();
  const [style, setStyle] = useState({ display: 'none' });
  const isYours = name === 'Rene Reyes';
  const dispatch = useAppDispatch();

  const handleReplyClick = () => {
    dispatch(
      updateReply({
        name,
        message,
      })
    );
  };

  const handleMouseEnter = () => setStyle({ display: 'block' });
  const handleMouseLeave = () => setStyle({ display: 'none' });

  return (
    <Box className={isYours ? classes.userContainer : classes.container}>
      <Box className={classes.avatarContainer}>
        <Avatar alt="pomp" src={avatar} className={classes.avatar} />
      </Box>

      <Box
        className={
          isYours
            ? `${classes.messageContainer} ${classes.userMessageContainer}`
            : classes.messageContainer
        }
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Box className={classes.replyButton} style={style} onClick={handleReplyClick}>
          Reply
        </Box>
        <Typography variant="body2" fontWeight="bold" sx={{ color, marginBottom: '0.5rem' }}>
          {name}
        </Typography>
        {children}
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
