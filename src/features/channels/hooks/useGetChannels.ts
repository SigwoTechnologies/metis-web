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
  async (args: null, { dispatch, rejectWithValue, getState }: any) => {
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
          const response = await httpService.get<ChannelsMessagesResponse[]>(
            `/v1/api/channels/${channel.channelAddress}/messages?pageNumber=0&pageSize=1`
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

          return {
            ...channel,
            messages,
          };
        })
      );

      return channels;
    } catch (error) {
      const err = error as AxiosError;
      dispatch(openToast({ type: 'error', text: 'There was a problem getting the channels' }));
      return rejectWithValue(err.response);
    }
  }
);
