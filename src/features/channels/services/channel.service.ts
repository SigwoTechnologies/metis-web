/* eslint-disable quotes */
import httpService from '@metis/common/services/http.service';
import { Channel } from '../types/channel';
import { ChannelDTO } from '../types/channelDTO';

const findAll = () => {};

const findChannels = async () => {
  const response = await httpService.get<Channel[]>('/v1/api/channels');
  return response.data;
};

const create = async (channel: ChannelDTO): Promise<Channel> => {
  const response = await httpService.post('/v1/api/channel', channel);
  return response.data;
};

export type InviteToChannel = {
  inviteeAddressOrAlias: string;
  channelAddress: string;
};

const inviteToSelectedChannel = async (payload: InviteToChannel): Promise<Channel> => {
  const response = await httpService.post('/v1/api/channel/invite', payload);
  return response.data;
};

const findOne = () => {};
const update = () => {};
const remove = () => {};

export default { findAll, findChannels, findOne, create, update, remove, inviteToSelectedChannel };
