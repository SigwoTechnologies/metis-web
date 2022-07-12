import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from 'src/store/types';
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
    channels: [
      {
        id: 1,
        name:'group 1',
        url: 'group1.com',
      },
      {
        id: 2,
        name:'group 2',
        url: 'group2.com',
      },
      {
        id: 3,
        name:'group 3',
        url: 'group3.com',
      }
    ],
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
