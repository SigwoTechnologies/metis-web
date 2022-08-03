import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@metis/store/types';
import { Channel } from '../types/channel';
import { findChannels, createChannel, getHiddenChannels } from './channel.actions';

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
  reply: Reply;
};

const initialState: ChannelState = {
  isLoading: false,
  channels: [],
  reply: {
    active: false,
    name: '',
    message: '',
  },
};

const slice = createSlice({
  name: 'channel',
  initialState,
  reducers: {
    updateReply: (state: ChannelState, action: PayloadAction<ReplyPayload>) => {
      const { name, message } = action.payload;
      state.reply.name = name;
      state.reply.message = message;
      state.reply.active = true;
    },
    discardReply: (state: ChannelState) => {
      state.reply = initialState.reply;
    },
    getChannelList: (state: ChannelState) => {
      const hiddenChannels = getHiddenChannels();

      state.channels = state.channels.filter((c) => {
        const hiddenChannel = hiddenChannels.find(
          (hc: Channel) => hc?.channelAddress === c.channelAddress
        );
        return !hiddenChannel;
      });
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
  },
});

export const selectState = (state: RootState) => state.channel;
export const { updateReply, discardReply, getChannelList } = slice.actions;
export const channelReducer = slice.reducer;
