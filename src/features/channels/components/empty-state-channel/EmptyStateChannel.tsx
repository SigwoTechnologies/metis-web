import React from 'react';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { Typography } from '@mui/material';
import useStyles from './EmptyStateChannel.styles';

const EmptyStateChannel: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div style={{ margin: 'auto' }}>
        <QuestionAnswerIcon fontSize="large" className={classes.icon} />
        <Typography variant="body2" color="text.secondary">
          Select a channel and start chatting!
        </Typography>
      </div>
    </div>
  );
};

export default EmptyStateChannel;
