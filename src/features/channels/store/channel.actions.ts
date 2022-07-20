import { createAsyncThunk } from '@reduxjs/toolkit';
import channelService from '../services/channel.service';

export const findChannels = createAsyncThunk('channels/findChannels', channelService.findChannels);

export default { findChannels };
