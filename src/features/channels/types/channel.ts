import { ChannelsMessagesResponse } from './ChannelsMessagesResponse';

export type Channel = {
  channelAddress: string;
  channelPublicKey: string;
  channelName: string;
  createdBy: string;
  createdAt: number;
  messages: ChannelsMessagesResponse[];
};
