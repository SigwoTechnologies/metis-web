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
  channels: Array<Channel | NewChannel>;
  selectedChannel: Channel | NewChannel;
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
    selectChannel: (state: ChannelState, { payload }) => {
      const selectedChannelOrUndefined = state.channels.find(
        (element) => element.channelAddress === payload
      );

      if (selectedChannelOrUndefined) state.selectedChannel = selectedChannelOrUndefined;
    },
    createChannel: (state: ChannelState, { payload }) => {
      state.channels.unshift(payload);
      state.pendingChannels.push(payload);
    },
    // TODO: Make a better implementation of this
    finishChannelCreation: (state: ChannelState, { payload }) => {
      const { isSuccessful, jobId } = payload;

      // Doesn't matter if it was successful or not
      // either way we remove it from the pendingChannels array
      const channelIndexToBeRemoved = state.pendingChannels.findIndex(
        (channel) => channel.job.id === jobId
      );
      const channelAddressToBeRemoved =
        state.pendingChannels[channelIndexToBeRemoved].channelAddress;
      state.pendingChannels.splice(channelIndexToBeRemoved, 1);

      if (!isSuccessful) {
        state.channels = state.channels.filter(
          (channel) => channel.channelAddress !== channelAddressToBeRemoved
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
