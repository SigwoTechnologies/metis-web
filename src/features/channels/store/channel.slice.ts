import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@metis/store/types';
import { Channel } from '../types/channel';
import { findByUser } from './channel.actions';

export type ChannelState = {
  isLoading: boolean;
  channels: Channel[];
};

const slice = createSlice({
  name: 'channel',
  initialState: {
    isLoading: false,
    channels: [],
  } as ChannelState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(findByUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(findByUser.fulfilled, (state, { payload }) => {
      state.channels = payload;
      state.isLoading = false;
    });
    builder.addCase(findByUser.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const selectState = (state: RootState) => state.channel;
export const channelReducer = slice.reducer;
