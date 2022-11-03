import httpService from '@metis/common/services/http.service';
import EncryiptionService from '@metis/features/auth/services/encryption.service';
import { AuthState } from '@metis/features/auth/store/auth.slice';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ChannelsMessagesResponse } from '../types/ChannelsMessagesResponse';
import { IMessage } from '../types/message.interface';

type LoadChannelsMessagesProps = {
  channelAddress: string;
  pageNumber?: number;
  pageSize?: number;
};

export const useGetMessages = createAsyncThunk(
  'channels/getMessages',
  async (
    { channelAddress, pageNumber = 0, pageSize = 10 }: LoadChannelsMessagesProps,
    { getState }
  ): Promise<IMessage[]> => {
    const {
      auth: {
        userData: { privateKeyArmored: privateKey, passphrase: passP },
      },
    } = getState() as { auth: AuthState };

    const encryptionService = new EncryiptionService();
    const { data } = await httpService.get<ChannelsMessagesResponse[]>(
      `/v1/api/channels/${channelAddress}/messages?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    const messages = await Promise.all(
      data.map(async ({ message }) => {
        const decryptedReplyMessage =
          message.replyMessage &&
          (await encryptionService.decryptMessage(message.replyMessage, passP, privateKey));
        return {
          ...message,
          decryptedReplyMessage,
          decryptedMessage: await encryptionService.decryptMessage(
            message.message,
            passP,
            privateKey
          ),
        };
      })
    );

    return messages.reverse();
  }
);
