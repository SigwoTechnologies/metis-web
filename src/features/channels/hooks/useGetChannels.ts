import httpService from '@metis/common/services/http.service';
import EncryiptionService from '@metis/features/auth/services/encryption.service';
import { AuthState } from '@metis/features/auth/store/auth.slice';
import { openToast } from '@metis/store/ui/ui.slice';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { IChannel } from '../types/channel.interface';
import { ChannelsMessagesResponse } from '../types/ChannelsMessagesResponse';

export const findChannels = createAsyncThunk(
  'channels/findChannels',
  async (_, { dispatch, rejectWithValue, getState }: any) => {
    try {
      const {
        auth: {
          userData: { privateKeyArmored: privateKey, passphrase: passP },
        },
      } = getState() as { auth: AuthState };

      const { data } = await httpService.get<IChannel[]>('/v1/api/channels');
      const channels = await Promise.all(
        data.map(async (channel) => {
          const encryptionService = new EncryiptionService();
          const { data: messages } = await httpService.get<ChannelsMessagesResponse[]>(
            `/v1/api/channels/${channel.channelAddress}/messages?pageNumber=0&pageSize=1`
          );

          const lastMessage = messages[0];

          return {
            ...channel,
            lastMessage: lastMessage && {
              ...lastMessage,
              decryptedReplyMessage:
                lastMessage &&
                (await encryptionService.decryptMessage(
                  lastMessage?.message.replyMessage,
                  passP,
                  privateKey
                )),
              decryptedMessage:
                lastMessage &&
                (await encryptionService.decryptMessage(
                  lastMessage?.message.message,
                  passP,
                  privateKey
                )),
            },
          };
        })
      );

      return channels;
    } catch (error) {
      const err = error as AxiosError;
      console.log(err);
      dispatch(openToast({ type: 'error', text: 'There was a problem getting the channels' }));
      return rejectWithValue(err.response);
    }
  }
);
