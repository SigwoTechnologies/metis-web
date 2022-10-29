/* eslint-disable @typescript-eslint/no-unused-vars */
import type { RootState } from '@metis/store/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IChannel } from '../types/channel.interface';
import { INewChannel } from '../types/new.channel.interface';
import { IReply } from '../types/reply.interface';
import { getMutedChannelAddresses } from '../hooks/useGetMutedChannelAddresses';
import { usToggleMuteChannel } from '../hooks/useToggleMuteChannel';
import { getHiddenChannels, localStorageKeyHiddenChannel } from '../hooks/useGetHiddenChannels';
import { useGetMessages } from '../hooks/useGetMessages';
import { findChannels } from '../hooks/useGetChannels';
import { findMembers } from './channel.actions';

const initialChannelState = {
  channelAddress: '',
  channelPublicKey: '',
  channelName: '',
  createdBy: '',
  createdAt: 0,
  messages: [],
  members: [],
};

export type ChannelState = {
  isLoading: boolean;
  isLoadingMessages: boolean;
  hiddenChannels: IChannel[];
  reply: IReply;
  mutedChannels: string[];
  channels: IChannel[];
  selectedChannel: IChannel;
  pendingChannels: INewChannel[];
  isOpenCreateChannelDrawer: boolean;
};

const initialState: ChannelState = {
  isLoading: false,
  isLoadingMessages: false,
  channels: [],
  hiddenChannels: [],
  selectedChannel: initialChannelState,
  reply: {
    replyMessage: '',
    decryptedReplyMessage: '',
    replyRecipientAlias: '',
    replyRecipientAddress: '',
  },
  mutedChannels: [],
  pendingChannels: [],
  isOpenCreateChannelDrawer: false,
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
      const channelJustCreated = state.pendingChannels.find(
        (channel) => channel.job.id === payload
      );

      if (channelJustCreated) {
        const { job, ...rest } = channelJustCreated;
        const channelCreated: IChannel = {
          ...rest,
          createdAt: Date.now(),
          // TODO: change this for the user's address
          createdBy: 'JUP-7DXL-L46R-8LHH-HWFN2',
          messages: [],
          members: [],
        };

        state.channels.unshift(channelCreated);
        state.pendingChannels = state.pendingChannels.filter(
          (channel) => channel.job.id !== payload
        );
      }
    },
    setSelectedChannel: (state: ChannelState, { payload: channelAddress }) => {
      const targetChannel = state.channels.find(
        (channel) => channel.channelAddress === channelAddress
      );
      state.selectedChannel = targetChannel || initialChannelState;
    },
    updateReply: (state: ChannelState, { payload }) => {
      state.reply = payload;
    },
    discardReply: (state: ChannelState) => {
      state.reply = initialState.reply;
    },
    hideChannel: (state: ChannelState, { payload }) => {
      const isChannelAlreadyHidden = state.hiddenChannels.find(
        (chc: IChannel) => chc?.channelAddress === payload.channelAddress
      );

      if (!isChannelAlreadyHidden) {
        state.hiddenChannels.push(payload);
        localStorage.setItem(localStorageKeyHiddenChannel, JSON.stringify(state.hiddenChannels));
      }
    },
    unhideChannel: (state: ChannelState, { payload }) => {
      const isChannelHidden = state.hiddenChannels.find(
        (chc: IChannel) => chc?.channelAddress === payload
      );

      if (isChannelHidden) {
        state.hiddenChannels = state.hiddenChannels.filter(
          (channel) => channel.channelAddress !== payload
        );
        localStorage.setItem(localStorageKeyHiddenChannel, JSON.stringify(state.hiddenChannels));
      }
    },
    addNewMessage: (state: ChannelState, { payload }) => {
      const { message } = payload;

      const targetChannel = state.channels.find(
        (channel) => channel.channelAddress === state.selectedChannel.channelAddress
      );

      state.selectedChannel.messages.push(message);
      targetChannel?.messages.unshift(message);
    },
    setOpenDrawer: (state: ChannelState, { payload: status }) => {
      state.isOpenCreateChannelDrawer = status;
    },
    setLoading: (state: ChannelState, { payload: status }) => {
      state.isLoading = status;
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

    // Get channels messages ----------------------------------------------------------
    builder.addCase(useGetMessages.pending, (state, { payload: messages }) => {
      state.isLoadingMessages = true;
    });
    builder.addCase(useGetMessages.fulfilled, (state, { payload: messages }) => {
      state.selectedChannel.messages = messages;
      state.isLoadingMessages = false;
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
    builder.addCase(usToggleMuteChannel.fulfilled, (state, { payload }) => {
      state.mutedChannels = payload;
    });

    builder.addCase(findMembers.fulfilled, (state, { payload }) => {
      state.selectedChannel.members = payload;
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
  setSelectedChannel,
  setOpenDrawer: setOpenCreateChannelDrawer,
} = slice.actions;
export const channelReducer = slice.reducer;
