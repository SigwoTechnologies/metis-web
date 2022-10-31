import httpService from '@metis/common/services/http.service';
import { createAsyncThunk } from '@reduxjs/toolkit';

export type TInvite = {
  invitationId: number;
  channelName: string;
  channelAddress: string;
  inviterAddress: string;
  inviterAlias: string;
  invitationSentAt: number;
};

export const useGetUsersInvites = createAsyncThunk(
  'channels/useGetUsersInvites',
  async (): Promise<TInvite[]> => {
    const { data } = await httpService.get('/v1/api/channel/invites');
    return data;
  }
);

export const useAcceptInvite = async (channelAddress: string) => {
  const { data } = await httpService.post('/v1/api/channel/invite/accept', { channelAddress });
  return data;
};

export const useDeclineInvite = async (channelAddress: string) => {
  const { data } = await httpService.post('/v1/api/channel/invite/accept', { channelAddress });
  return data;
};
