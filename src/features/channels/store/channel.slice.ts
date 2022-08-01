import type { RootState } from '@metis/store/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Channel } from '../types/channel';
// eslint-disable-next-line import/no-cycle
import { findChannels } from './channel.actions';

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
  newChannelAddress: string;
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
  newChannelAddress: '',
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
    createChannel: (state: ChannelState, { payload }) => {
      state.channels.unshift(payload);
      state.newChannelAddress = payload.channelAddress;
    },
    finishChannelCreation: (state: ChannelState, { payload }) => {
      const { isSuccessful } = payload;

      state.newChannelAddress = '';

      if (!isSuccessful) state.channels.shift();
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
  },
});

export const selectState = (state: RootState) => state.channel;
export const { updateReply, discardReply, selectChannel, createChannel, finishChannelCreation } =
  slice.actions;
export const channelReducer = slice.reducer;
