import React from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import metisChatIcon from '@metis/assets/images/misc/metis-chat-icon.svg';
import useStyles from './EmptyStateChannel.styles';

const EmptyStateChannel: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div style={{ margin: 'auto' }}>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#FFF',
          }}
        >
          <Box
            component="img"
            src={metisChatIcon}
            alt="metis chat icon"
            sx={{ marginBottom: '10px' }}
          />
          Select a channel and start chatting!
        </Typography>
      </div>
    </div>
  );
};

export default EmptyStateChannel;
