import connect from '@metis/common/services/socket.service';
import { useAppDispatch } from '@metis/store/hooks';
import { useEffect, useMemo } from 'react';
import useSelectedChannel from '../../hooks/useSelectedChannel';
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
  const { messages, channelAddress } = useSelectedChannel();
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
      });

      return () => {
        socket.disconnect();
      };
    }

    return undefined;
  }, [channelAddress]);

  return (
    <div className={classes.container}>
      {sortedMessages.map(({ senderAlias, message, createdAt }, index) => (
        <Message
          // TODO: the backend is not giving us any way to differentiate between messages... Too bad!
          // eslint-disable-next-line react/no-array-index-key
          key={index}
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
