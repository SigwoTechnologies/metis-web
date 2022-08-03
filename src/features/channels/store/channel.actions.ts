import { createAsyncThunk } from '@reduxjs/toolkit';
import channelService from '../services/channel.service';

export const findChannels = createAsyncThunk('channels/findChannels', channelService.findChannels);
export const createChannel = createAsyncThunk('channels/createChannel', channelService.create);
export const getMutedChannelAddresses = createAsyncThunk(
  'channels/getMutedChannelAddresses',
  channelService.getMutedChannelAddresses
);

export default { findChannels, createChannel };
