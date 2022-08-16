import { useAppSelector } from '@metis/store/hooks';
import { useMemo } from 'react';
import useStyles from './ChatContent.styles';
import Message from './message/Message';

const formatDate = (dateNow: number) => {
  const date = new Date(dateNow);

  return date.toLocaleDateString('en-US');
};

const ChatContent = () => {
  const classes = useStyles();
  const { messages } = useAppSelector((state) => state.channel.selectedChannel);
  const sortedMessages = useMemo(() => [...messages].reverse(), [messages]);

  return (
    <div className={classes.container}>
      {sortedMessages.map(({ message: { senderAlias, message, createdAt }, transactionId }) => (
        <Message
          key={transactionId}
          name={senderAlias}
          message={message}
          date={formatDate(createdAt)}
          color="#A36300"
        />
      ))}
    </div>
  );
};

export default ChatContent;
