import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@metis/store/types';
import { Channel } from '../types/channel';
import {
  findChannels,
  createChannel,
  getHiddenChannels,
  localStorageKeyHiddenChannel,
} from './channel.actions';

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
  hiddenChannels: Channel[];
  selectedChannel: Channel;
  reply: Reply;
};

const initialState: ChannelState = {
  isLoading: false,
  channels: [],
  hiddenChannels: [],
  selectedChannel: {
    channelAddress: '',
    channelPublicKey: '',
    channelName: '',
    createdBy: '',
    createdAt: 0,
  },
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
    selectChannel: (state: ChannelState, { payload }) => {
      const channelNameExist = state.channels.some(
        (element: Channel) => element.channelName === payload.channelName
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
    hideChannel: (state: ChannelState, { payload }) => {
      const isChannelAlreadyHidden = state.hiddenChannels.find(
        (chc: Channel) => chc?.channelAddress === payload.channelAddress
      );

      if (!isChannelAlreadyHidden) {
        state.hiddenChannels.push(payload);
        state.selectedChannel = initialState.selectedChannel;
        localStorage.setItem(localStorageKeyHiddenChannel, JSON.stringify(state.hiddenChannels));
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(findChannels.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(findChannels.fulfilled, (state, { payload }) => {
      const hiddenChannels = getHiddenChannels();
      state.hiddenChannels = hiddenChannels;
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
export const { updateReply, discardReply, selectChannel, hideChannel } = slice.actions;
export const channelReducer = slice.reducer;
