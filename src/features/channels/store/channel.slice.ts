import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@metis/store/types';
import { channel } from 'diagnostics_channel';
import { Channel } from '../types/channel';
import { findChannels, createChannel, getMutedChannelAddresses } from './channel.actions';

type Reply = {
  active: boolean;
  name: string;
  message: string;
};

type ReplyPayload = {
  name: string;
  message: string;
};

export type ChannelState = {
  isLoading: boolean;
  channels: Channel[];
  selectedChannel: string;
  reply: Reply;
  mutedChannels: string[];
};

const initialState: ChannelState = {
  isLoading: false,
  channels: [],
  selectedChannel: '',
  reply: {
    active: false,
    name: '',
    message: '',
  },
  mutedChannels: [],
};

const slice = createSlice({
  name: 'channel',
  initialState,
  reducers: {
    selectChannel: (state: ChannelState, { payload }) => {
      const channelNameExist = state.channels.some(
        (element: Channel) => element.channelName === payload
      );
      if (channelNameExist) state.selectedChannel = payload;
    },
    updateReply: (state: ChannelState, action: PayloadAction<ReplyPayload>) => {
      const { name, message } = action.payload;
      state.reply.name = name;
      state.reply.message = message;
      state.reply.active = true;
    },
    discardReply: (state: ChannelState) => {
      state.reply = initialState.reply;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(findChannels.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(findChannels.fulfilled, (state, { payload }) => {
      state.channels = payload;
      state.isLoading = false;
    });
    builder.addCase(findChannels.rejected, (state) => {
      state.isLoading = false;
    });

    // Create Channel ----------------------------------------------------------
    builder.addCase(createChannel.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createChannel.fulfilled, (state, { payload }) => {
      state.channels.unshift(payload);
      state.isLoading = false;
    });
    builder.addCase(createChannel.rejected, (state) => {
      state.isLoading = false;
    });

    // Get muted channels ----------------------------------------------------------
    builder.addCase(getMutedChannelAddresses.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getMutedChannelAddresses.fulfilled, (state, { payload }) => {
      state.mutedChannels = payload;
    });
    builder.addCase(getMutedChannelAddresses.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const selectState = (state: RootState) => state.channel;
export const { updateReply, discardReply, selectChannel } = slice.actions;
export const channelReducer = slice.reducer;
