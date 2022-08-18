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
  hiddenChannels: Channel[];
  reply: Reply;
  mutedChannels: string[];
  channels: Channel[];
  selectedChannel: Channel;
  pendingChannels: NewChannel[];
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
    messages: [],
  },
  reply: {
    active: false,
    name: '',
    message: '',
  },
  mutedChannels: [],
  pendingChannels: [],
};

const slice = createSlice({
  name: 'channel',
  initialState,
  reducers: {
    selectChannel: (state: ChannelState, { payload }: PayloadAction<string>) => {
      const selectedChannelOrUndefined = state.channels.find(
        (element) => element.channelAddress === payload
      );

      if (selectedChannelOrUndefined) state.selectedChannel = selectedChannelOrUndefined;
    },
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
  selectChannel,
  createChannel,
  finishChannelCreation,
  hideChannel,
  unhideChannel,
} = slice.actions;
export const channelReducer = slice.reducer;
