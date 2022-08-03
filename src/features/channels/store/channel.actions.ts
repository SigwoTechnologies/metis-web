import hasStringJsonStructure from '@metis/common/utils/utils';
import { createAsyncThunk } from '@reduxjs/toolkit';
import channelService from '../services/channel.service';

export const localStorageKeyHiddenChannel = '@hiddenChannels';

export const findChannels = createAsyncThunk('channels/findChannels', channelService.findChannels);
export const createChannel = createAsyncThunk('channels/createChannel', channelService.create);

export const getHiddenChannels = () => {
  const hiddenChannels = localStorage.getItem(localStorageKeyHiddenChannel);
  return hasStringJsonStructure(hiddenChannels) ? JSON.parse(<string>hiddenChannels) : [];
};

export default { findChannels, createChannel, getHiddenChannels };
