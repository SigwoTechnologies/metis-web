import { IAttachmentObj } from './attachment.obj.interface';

export interface IMessage {
  decryptedMessage: string;
  attachmentObj: IAttachmentObj | null;
  createdAt: number;
  message: string;
  messageType: 'message' | 'invitation' | 'attachment';
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
