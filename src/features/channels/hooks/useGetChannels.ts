import appConfig from '@metis/common/configuration/app.config';
import httpService from '@metis/common/services/http.service';
import EncryiptionService from '@metis/features/auth/services/encryption.service';
import { openToast } from '@metis/store/ui/ui.slice';
import type { RootState } from '@metis/store/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { IChannel } from '../types/channel.interface';

export const findChannels = createAsyncThunk(
  'channels/findChannels',
  async (_, { dispatch, rejectWithValue, getState }) => {
    const state = getState() as RootState;
    try {
      const {
        auth: {
          userData: { privateKeyArmored: privateKey, passphrase: passP },
        },
      } = state;

      const { data } = await httpService.get<IChannel[]>('/v1/api/channels');
      const channels = await Promise.all(
        data.map(async (channel) => {
          const encryptionService = new EncryiptionService();
          const { data: messages } = await httpService.get(
            `/v1/api/channels/${channel.channelAddress}/messages?pageNumber=0&pageSize=1`
          );

          let imageChannel;
          try {
            const { data: image } = await httpService.get(
              `${appConfig.api.baseUrl}/jim/v1/api/users/${channel.channelAddress}/files/public-profile`,
              {
                responseType: 'blob',
              }
            );
            imageChannel = URL.createObjectURL(image);
          } catch (error) {
            imageChannel = '';
          }

          const lastMessage = messages[0];

          return {
            ...channel,
            imageChannel,
            lastMessage: lastMessage && {
              ...lastMessage,
              decryptedReplyMessage:
                lastMessage &&
                (await encryptionService.decryptMessage(
                  lastMessage?.message?.replyMessage,
                  passP,
                  privateKey
                )),
              decryptedMessage:
                lastMessage &&
                (await encryptionService.decryptMessage(
                  lastMessage?.message?.message,
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
      dispatch(openToast({ type: 'error', text: 'There was a problem getting the channels' }));
      return rejectWithValue(err.response);
    }
  }
);
