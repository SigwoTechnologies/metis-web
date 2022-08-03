import type { RootState } from '@metis/store/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Channel } from '../types/channel';
import { NewChannel } from '../types/newChannel';
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
  channels: Array<Channel | NewChannel>;
  selectedChannel: string;
  reply: Reply;
  pendingChannels: NewChannel[];
};

const initialState: ChannelState = {
  isLoading: false,
  channels: [],
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
  pendingChannels: [],
};

const slice = createSlice({
  name: 'channel',
  initialState,
  reducers: {
    selectChannel: (state: ChannelState, { payload }) => {
      const channelNameExist = state.channels.some((element) => element.channelName === payload);

      if (channelNameExist) state.selectedChannel = payload;
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
