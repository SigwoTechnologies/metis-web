import { createAsyncThunk } from '@reduxjs/toolkit';
import { Channel } from '@metis/features/channels/types/channel';
import hasStringJsonStructure from '@metis/common/utils/utils';
import channelService from '../services/channel.service';

const localStorageKeyHiddenChannel = '@hiddenChannels';
export const findChannels = createAsyncThunk('channels/findChannels', channelService.findChannels);
export const createChannel = createAsyncThunk('channels/createChannel', channelService.create);

export const getHiddenChannels = () => {
  const hiddenChannels = localStorage.getItem(localStorageKeyHiddenChannel);
  return hasStringJsonStructure(hiddenChannels) ? JSON.parse(<string>hiddenChannels) : [];
};

export const hideChannel = (channel: Channel) => {
  const currentHiddenChannels = getHiddenChannels();
  const isChannelAlreadyHidden = currentHiddenChannels.find(
    (chc: Channel) => chc?.channelAddress === channel.channelAddress
  );

  if (!isChannelAlreadyHidden) {
    currentHiddenChannels.push(channel);
    localStorage.setItem(localStorageKeyHiddenChannel, JSON.stringify(currentHiddenChannels));
  }
};

export default { findChannels, createChannel, hideChannel, getHiddenChannels };
