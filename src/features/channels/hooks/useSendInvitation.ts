import httpService from '@metis/common/services/http.service';
import { IChannel } from '../types/channel.interface';

export type InviteToChannel = {
  inviteeAddressOrAlias: string;
  channelAddress: string;
};

export const useSendInvitation = async (payload: InviteToChannel): Promise<IChannel> => {
  const { data } = await httpService.post('/v1/api/channel/invite', payload);
  return data;
};
