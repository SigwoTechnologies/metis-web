import { createAsyncThunk } from '@reduxjs/toolkit';
import channelService from '../services/channel.service';

export const findByUser = createAsyncThunk('channels/findByUser', async () => {
  const response = await channelService.findByUser();
  return response.data.results;
});

export default { findByUser };
