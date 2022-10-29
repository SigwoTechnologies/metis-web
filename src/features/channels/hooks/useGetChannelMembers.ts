import httpService from '@metis/common/services/http.service';
import { IChannelMember } from '../types/channel.member.interface';

export const useGetChannelMembers = async (channelAddress: string) => {
  const { data } = await httpService.get<IChannelMember[]>(`/v1/api/${channelAddress}/members`);
  return data;
};
