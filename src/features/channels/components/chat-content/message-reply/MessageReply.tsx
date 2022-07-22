import { Box, Typography } from '@mui/material';
import React from 'react';
import useStyles from '../message/Message.styles';

type props = {
  name: string;
  message: string;
  date?: string;
};

const MessageReply: React.FC<props> = ({ name, message, date }) => {
  const classes = useStyles();

  return (
    <Box className={classes.reply}>
      <Box className={classes.replyContainer}>
        <Box className={classes.messageContainer}>
          <Typography variant="body2" fontWeight="bold" sx={{ color: '#44C553' }}>
            {name}
          </Typography>
          <Box className={classes.message}>
            <Typography variant="body2">{message}</Typography>
            {date && (
              <Typography variant="caption" className={classes.date}>
                {date}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MessageReply;
