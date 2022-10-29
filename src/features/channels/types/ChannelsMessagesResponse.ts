import { IMessage } from './message.interface';

export interface ChannelsMessagesResponse {
  message: IMessage;
  tag: string;
  transactionId: string;
}
