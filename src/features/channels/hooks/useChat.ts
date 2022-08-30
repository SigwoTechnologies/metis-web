import connect from '@metis/common/services/socket.service';
import { useEffect, useRef } from 'react';
import { Socket } from 'socket.io-client';
import { Message } from '../types/Message';

type ChatSocketResponse = {
  message: Message;
};

export default (channelAddress: string) => {
  const socketRef = useRef<Socket>();

  useEffect(() => {
    if (channelAddress) {
      socketRef.current = connect({
        query: {
          room: channelAddress, // address of the current channel
          user: 'user1', // TODO: change this for the alias of the current user
          event: 'createMessage',
        },
      }).socket('/chat');

      return () => {
        socketRef.current?.disconnect();
      };
    }

    return undefined;
  }, []);

  const onSendMessage = (callback: (message: Message) => void) =>
    socketRef.current?.on('createMessage', ({ message }: ChatSocketResponse) => {
      callback(message);
    });

  return {
    onSendMessage,
  };
};
