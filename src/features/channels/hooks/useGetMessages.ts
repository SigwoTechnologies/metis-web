import httpService from '@metis/common/services/http.service';
import EncryiptionService from '@metis/features/auth/services/encryption.service';
import { AuthState } from '@metis/features/auth/store/auth.slice';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ChannelsMessagesResponse } from '../types/ChannelsMessagesResponse';
import { Message } from '../types/Message';

type LoadChannelsMessagesProps = {
  channelAddress: string;
  pageNumber?: number;
  pageSize?: number;
};

export const useGetMessages = createAsyncThunk(
  'channels/getMessages',
  async (
    { channelAddress, pageNumber = 0, pageSize = 20 }: LoadChannelsMessagesProps,
    { getState }
  ): Promise<Message[]> => {
    const {
      auth: {
        userData: { privateKeyArmored: privateKey, passphrase: passP },
      },
    } = getState() as { auth: AuthState };

    const encryptionService = new EncryiptionService();
    const response = await httpService.get<ChannelsMessagesResponse[]>(
      `/v1/api/channels/${channelAddress}/messages?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    const messages = await Promise.all(
      response.data
        .map(async (item) => ({
          ...item.message,
          decryptedReplyMessage: await encryptionService.decryptMessage(
            item.message.replyMessage,
            passP,
            privateKey
          ),
          decryptedMessage: await encryptionService.decryptMessage(
            item.message.message,
            passP,
            privateKey
          ),
        }))
        .reverse()
    );

    return messages;
  }
);
