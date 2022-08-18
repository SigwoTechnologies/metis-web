import { Message } from './Message';

export interface ChannelsMessagesResponse {
  message: Message;
  tag: string;
  transactionId: string;
}
