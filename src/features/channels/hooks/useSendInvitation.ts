import httpService from '@metis/common/services/http.service';
import { Channel } from '../types/channel';

export type InviteToChannel = {
  inviteeAddressOrAlias: string;
  channelAddress: string;
};

export const useSendInvitation = async (payload: InviteToChannel): Promise<Channel> => {
  const { data } = await httpService.post('/v1/api/channel/invite', payload);
  return data;
};
