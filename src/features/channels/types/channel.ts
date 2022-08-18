import { Message } from './Message';

export type Channel = {
  channelAddress: string;
  channelPublicKey: string;
  channelName: string;
  createdBy: string;
  createdAt: number;
  messages: Message[];
};
