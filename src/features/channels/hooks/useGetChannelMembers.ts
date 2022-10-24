import httpService from '@metis/common/services/http.service';
import { ChannelMember } from '../types/ChannelMember';

export const useGetChannelMembers = async (channelAddress: string) => {
  const { data } = await httpService.get<ChannelMember[]>(`/v1/api/${channelAddress}/members`);
  return data;
};
