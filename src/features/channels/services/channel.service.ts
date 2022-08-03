import httpService from '@metis/common/services/http.service';
import { AxiosError } from 'axios';
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

const getMutedChannelAddresses = async () => {
  try {
    const response = await httpService.get('/v1/api/pn/mute-channels');
    const { mutedChannelAddressList } = response.data;
    return mutedChannelAddressList;
  } catch (error) {
    const err = error as AxiosError;
    console.log(err.response);
    return err.response;
  }
};

const findOne = () => {};
const update = () => {};
const remove = () => {};

export default { findAll, findChannels, findOne, create, update, remove, getMutedChannelAddresses };
