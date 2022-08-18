import { AttachmentObj } from './AttachmentObj';

export interface Message {
  attachmentObj: AttachmentObj | null;
  createdAt: number;
  message: string;
  messageType: string;
  recordType: string;
  replyMessage: string;
  replyRecipientAddress: string;
  replyRecipientAlias: string;
  senderAddress: string;
  senderAlias: string;
  status: string;
  updatedAt: number;
  version: string;
}
