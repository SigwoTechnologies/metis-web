import { IMessage } from './message.interface';
import { IMembers } from './members.interface';

export type IChannel = {
  imageChannel: string;
  channelAddress: string;
  channelPublicKey: string;
  channelName: string;
  createdBy: string;
  createdAt: number;
  messages: IMessage[];
  members: IMembers[];
  lastMessage: IMessage;
};
