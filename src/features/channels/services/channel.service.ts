import httpService from '@metis/common/services/http.service';
import { useAppSelector } from '@metis/store/hooks';
import { Channel } from '../types/channel';
import { ChannelDTO } from '../types/channelDTO';

// TODO: Define the correct url, dummy for demonstration
const findAll = () => {};

const findChannels = async () => {
  const response = await httpService.get<Channel[]>('/v1/api/channels');
  return response.data;
};

const create = async (channel: ChannelDTO): Promise<Channel> => {
  try {
    const response = await httpService.post('/v1/api/channel', channel);
    return response.data;
  } catch (error: any) {
    console.log(error.response);
    return error.response;
  }
};

type InviteToChannel = {
  inviteeAddressOrAlias: string;
  channelAddress: string;
};

const inviteToChannel = async (payload: InviteToChannel): Promise<Channel> => {
  const response = await httpService.post('/v1/api/channel/invite', payload);
  return response.data;
};

const findOne = () => {};
const update = () => {};
const remove = () => {};

export default { findAll, findChannels, findOne, create, update, remove, inviteToChannel };
