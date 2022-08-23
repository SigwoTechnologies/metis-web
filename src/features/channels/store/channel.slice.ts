import type { RootState } from '@metis/store/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Channel } from '../types/channel';
import { NewChannel } from '../types/newChannel';
import {
  findChannels,
  getHiddenChannels,
  getMutedChannelAddresses,
  localStorageKeyHiddenChannel,
  toggleMuteChannel,
} from './channel.actions';

type Reply = {
  replyMessage: string;
  replyRecipientAlias: string;
  replyRecipientAddress: string;
};

export type ChannelState = {
  isLoading: boolean;
  hiddenChannels: Channel[];
  reply: Reply;
  mutedChannels: string[];
  channels: Channel[];
  pendingChannels: NewChannel[];
};

const initialState: ChannelState = {
  isLoading: false,
  channels: [],
  hiddenChannels: [],
  reply: {
    replyMessage: '',
    replyRecipientAlias: '',
    replyRecipientAddress: '',
  },
  mutedChannels: [],
  pendingChannels: [],
};

const slice = createSlice({
  name: 'channel',
  initialState,
  reducers: {
    createChannel: (state: ChannelState, { payload }) => {
      state.pendingChannels.unshift(payload);
    },
    // TODO: is there a way to not iterate the array two times?
    finishChannelCreation: (state: ChannelState, { payload }: PayloadAction<number>) => {
      const newChannel = state.pendingChannels.find((channel) => channel.job.id === payload);

      if (newChannel) {
        const { job, ...rest } = newChannel;
        const channelCreated: Channel = {
          ...rest,
          createdAt: Date.now(),
          // TODO: change this for the user's address
          createdBy: 'JUP-7DXL-L46R-8LHH-HWFN2',
          messages: [],
        };

        state.channels.unshift(channelCreated);
        state.pendingChannels = state.pendingChannels.filter(
          (channel) => channel.job.id !== payload
        );
      }
    },
    updateReply: (state: ChannelState, { payload }) => {
      const { replyMessage, replyRecipientAlias, replyRecipientAddress } = payload;
      state.reply.replyMessage = replyMessage;
      state.reply.replyRecipientAlias = replyRecipientAlias;
      state.reply.replyRecipientAddress = replyRecipientAddress;
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
        localStorage.setItem(localStorageKeyHiddenChannel, JSON.stringify(state.hiddenChannels));
      }
    },
    unhideChannel: (state: ChannelState, { payload }) => {
      const isChannelHidden = state.hiddenChannels.find(
        (chc: Channel) => chc?.channelAddress === payload
      );

      if (isChannelHidden) {
        state.hiddenChannels = state.hiddenChannels.filter(
          (channel) => channel.channelAddress !== payload
        );
        localStorage.setItem(localStorageKeyHiddenChannel, JSON.stringify(state.hiddenChannels));
      }
    },
    addNewMessage: (state: ChannelState, { payload }) => {
      const { channelAddress, message } = payload;

      const targetChannel = state.channels.find(
        (channel) => channel.channelAddress === channelAddress
      );

      targetChannel?.messages.unshift(message);
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

    // Mute or unmute channel -------------------------------------------------------
    builder.addCase(toggleMuteChannel.fulfilled, (state, { payload }) => {
      state.mutedChannels = payload;
    });
  },
});

export const selectState = (state: RootState) => state.channel;
export const {
  updateReply,
  discardReply,
  createChannel,
  finishChannelCreation,
  hideChannel,
  unhideChannel,
  addNewMessage,
} = slice.actions;
export const channelReducer = slice.reducer;
