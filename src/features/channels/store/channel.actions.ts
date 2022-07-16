import { createAsyncThunk } from '@reduxjs/toolkit';
import channelService from '../services/channel.service';

export const findByUser = createAsyncThunk('channels/findByUser', channelService.findByUser);

export default { findByUser };
