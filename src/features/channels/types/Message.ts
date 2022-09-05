import { AttachmentObj } from './AttachmentObj';

export interface Message {
  decryptedMessage: string;
  attachmentObj: AttachmentObj | null;
  createdAt: number;
  message: string;
  messageType: 'message' | 'invitation';
  recordType: string;
  decryptedReplyMessage: string;
  replyMessage: string;
  replyRecipientAddress: string;
  replyRecipientAlias: string;
  senderAddress: string;
  senderAlias: string;
  status: string;
  updatedAt: number;
  version: string;
}
