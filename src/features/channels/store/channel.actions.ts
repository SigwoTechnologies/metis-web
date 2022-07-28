import { createAsyncThunk } from '@reduxjs/toolkit';
import { Channel } from '@metis/features/channels/types/channel';
import channelService from '../services/channel.service';

export const findChannels = createAsyncThunk('channels/findChannels', channelService.findChannels);
export const createChannel = createAsyncThunk('channels/createChannel', channelService.create);

function hasStringJsonStructure(str: string | null) {
  if (!str) return false;
  try {
    const result = JSON.parse(str);
    const type = Object.prototype.toString.call(result);
    return type === '[object Object]' || type === '[object Array]';
  } catch (err) {
    return false;
  }
}

export const getHiddenChannels = () => {
  const hiddenChannels = localStorage.getItem('@hiddenChannels');
  return hasStringJsonStructure(hiddenChannels) ? JSON.parse(<string>hiddenChannels) : [];
};

export const hideChannel = (channel: Channel) => {
  const currentHiddenChannels = getHiddenChannels();
  const isChannelAlreadyHidden = currentHiddenChannels.find(
    (chc: Channel) => chc?.channelAddress === channel.channelAddress
  );

  if (!isChannelAlreadyHidden) {
    currentHiddenChannels.push(channel);
    localStorage.setItem('@hiddenChannels', JSON.stringify(currentHiddenChannels));
  }
};

export default { findChannels, createChannel, hideChannel, getHiddenChannels };
