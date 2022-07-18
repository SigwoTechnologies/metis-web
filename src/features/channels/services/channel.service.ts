import httpService from '@metis/common/services/http.service';
import { Channel } from '../types/channel';

// TODO: Define the correct url, dummy for demonstration
const findAll = () => {};

const findByUser = async () => {
  const response = await httpService.get('/pokemon?offset=0&limit=5');
  return response.data.results as Channel[];
};

const findOne = () => {};
const create = () => {};
const update = () => {};
const remove = () => {};

export default { findAll, findByUser, findOne, create, update, remove };
