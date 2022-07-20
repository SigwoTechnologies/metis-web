import httpService from '@metis/common/services/http.service';
import { Channel } from '../types/channel';

// TODO: Define the correct url, dummy for demonstration
const findAll = () => {};

const findChannels = async () => {
  const config = {
    headers: { Authorization: `Bearer ${process.env.TOKEN}` },
  };
  const response = await httpService.get<Channel[]>('/v1/api/channels', config);
  return response.data;
};

const findOne = () => {};
const create = () => {};
const update = () => {};
const remove = () => {};

export default { findAll, findChannels, findOne, create, update, remove };
