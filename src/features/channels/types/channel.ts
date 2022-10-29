import { Message } from './Message';
import { Members } from './Members';

export type Channel = {
  channelAddress: string;
  channelPublicKey: string;
  channelName: string;
  createdBy: string;
  createdAt: number;
  messages: Message[];
  members: Members[];
};
