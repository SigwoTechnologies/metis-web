import connect from '@metis/common/services/socket.service';
import { useAppSelector } from '@metis/store/hooks';
import { useEffect, useRef } from 'react';
import { Socket } from 'socket.io-client';
import { IMessage } from '../types/message.interface';

type ChatSocketResponse = {
  message: IMessage;
};

export default (channelAddress: string) => {
  const socketRef = useRef<Socket>();
  const {
    jupAccount: { alias },
  } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (channelAddress) {
      socketRef.current = connect({
        query: {
          room: channelAddress, // address of the current channel
          user: alias,
          event: 'createMessage',
        },
      }).socket('/chat');

      return () => {
        socketRef.current?.disconnect();
      };
    }

    return undefined;
  }, []);

  const onSendMessage = (callback: (message: IMessage) => void) =>
    socketRef.current?.on('createMessage', ({ message }: ChatSocketResponse) => {
      callback(message);
    });

  return {
    onSendMessage,
  };
};
