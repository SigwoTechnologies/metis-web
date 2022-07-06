import Paper from '@mui/material/Paper';

import ChatHeader from './chat-header/ChatHeader';
import ChatContent from './chat-content/ChatContent';
import useStyles from './ChatContainer.styles';

const ChatContainer = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.container} square>
      <ChatHeader />
      <ChatContent />
    </Paper>
  );
};
export default ChatContainer;
