import connect from '@metis/common/services/socket.service';
import { useAppDispatch, useAppSelector } from '@metis/store/hooks';
import { useEffect, useMemo } from 'react';
import { addNewMessage } from '../../store/channel.slice';
import { Message as MessageType } from '../../types/Message';
import useStyles from './ChatContent.styles';
import Message from './message/Message';

const formatDate = (dateNow: number) => {
  const date = new Date(dateNow);

  return date.toLocaleDateString('en-US');
};

type ChatSocketResponse = {
  message: MessageType;
};

const ChatContent = () => {
  const classes = useStyles();
  const { messages, channelAddress } = useAppSelector((state) => state.channel.selectedChannel);
  const sortedMessages = useMemo(() => [...messages].reverse(), [messages]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (channelAddress) {
      const socket = connect({
        query: {
          room: channelAddress, // address of the current channel
          user: 'user1', // TODO: change this for the alias of the current user
          event: 'createMessage',
        },
      }).socket('/chat');

      socket.on('createMessage', ({ message }: ChatSocketResponse) => {
        dispatch(addNewMessage({ channelAddress, message }));
        console.log(`added a new message to the following address: ${channelAddress}`);
      });

      return () => {
        socket.disconnect();
      };
    }

    return undefined;
  }, [channelAddress]);

  return (
    <div className={classes.container}>
      {sortedMessages.map(({ senderAlias, message, createdAt }) => (
        <Message
          key={Math.random()}
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
