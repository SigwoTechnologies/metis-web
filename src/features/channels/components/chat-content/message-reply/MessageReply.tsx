import { Box, Typography } from '@mui/material';
import React from 'react';
import useStyles from './MessageReply.styles';

type props = {
  name: string;
  message: string;
  date?: string;
  color: string;
};

const MessageReply: React.FC<props> = ({ name, message, date, color }) => {
  const classes = useStyles();

  return (
    <Box className={classes.reply}>
      <Box className={classes.replyContainer}>
        <Box className={classes.messageContainer}>
          <Typography variant="body2" fontWeight="bold" sx={{ color }}>
            {name}
          </Typography>
          <Box className={classes.message}>
            <Typography noWrap variant="body2">
              {message}
            </Typography>
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
