/* eslint-disable @typescript-eslint/no-unused-vars */
import { TInvite, useGetUsersInvites } from '@metis/features/invites/services/invite.service';
import type { RootState } from '@metis/store/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { findChannels } from '../hooks/useGetChannels';
import { useGetDeclinedInvites } from '../hooks/useGetDeclinedInvites';
import { getHiddenChannels, localStorageKeyHiddenChannel } from '../hooks/useGetHiddenChannels';
import { useGetMessages } from '../hooks/useGetMessages';
import { getMutedChannelAddresses } from '../hooks/useGetMutedChannelAddresses';
import { usToggleMuteChannel } from '../hooks/useToggleMuteChannel';
import { IChannel } from '../types/channel.interface';
import { IMessage } from '../types/message.interface';
import { INewChannel } from '../types/new.channel.interface';
import { IReply } from '../types/reply.interface';
import { findMembers, findImageChannel } from './channel.actions';

const initialChannelState = {
  imageChannel: '',
  channelAddress: '',
  channelPublicKey: '',
  channelName: '',
  createdBy: '',
  createdAt: 0,
  messages: [],
  members: [],
  lastMessage: {} as IMessage,
};

export type ChannelState = {
  isLoading: boolean;
  isLoadingMessages: boolean;
  isLoadingInvites: boolean;
  failedSearch: boolean;
  declinedInvites: number[];
  invites: TInvite[];
  hiddenChannels: IChannel[];
  reply: IReply;
  mutedChannels: string[];
  channels: IChannel[];
  filteredChannels: IChannel[];
  selectedChannel: IChannel;
  pendingChannels: INewChannel[];
  isOpenCreateChannelDrawer: boolean;
  isOpenChannelDrawer: boolean;
};

const initialState: ChannelState = {
  isLoading: false,
  isLoadingMessages: false,
  isLoadingInvites: false,
  failedSearch: false,
  channels: [],
  filteredChannels: [],
  hiddenChannels: [],
  invites: [],
  declinedInvites: [],
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
  isOpenChannelDrawer: false,
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
          lastMessage: {} as IMessage,
          imageChannel: '',
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
    setFilteredChannels: (state: ChannelState, { payload: key }) => {
      if (key.length) {
        const filteredChannels = state.channels.filter(({ channelName }) =>
          channelName.toLocaleLowerCase().includes(key)
        );
        state.filteredChannels = filteredChannels;
      } else {
        state.filteredChannels = state.channels;
      }
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

      // eslint-disable-next-line no-restricted-syntax
      for (const e of state.channels) {
        if (e.channelAddress === state.selectedChannel.channelAddress) {
          e.lastMessage = message;
        }
      }

      state.selectedChannel.messages.push(message);
    },
    setOpenCreateChannelDrawer: (state: ChannelState, { payload: status }) => {
      state.isOpenCreateChannelDrawer = status;
    },
    setIsOpenChannelDrawer: (state: ChannelState, { payload }) => {
      state.isOpenChannelDrawer = payload;
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

    builder.addCase(useGetMessages.pending, (state, { payload: messages }) => {
      state.isLoadingMessages = true;
    });

    builder.addCase(useGetMessages.fulfilled, (state, { payload: messages }) => {
      state.isLoadingMessages = false;
      state.selectedChannel.messages = messages;
    });

    builder.addCase(getMutedChannelAddresses.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getMutedChannelAddresses.fulfilled, (state, { payload }) => {
      state.mutedChannels = payload;
    });
    builder.addCase(useGetUsersInvites.pending, (state, { payload }) => {
      state.isLoadingInvites = true;
    });
    builder.addCase(useGetUsersInvites.fulfilled, (state, { payload }) => {
      const declinedInvites = useGetDeclinedInvites();

      state.invites = payload
        .filter((e) => (declinedInvites.includes(e.invitationId) ? null : e))
        .filter(Boolean);

      state.isLoadingInvites = false;
    });

    builder.addCase(getMutedChannelAddresses.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(usToggleMuteChannel.fulfilled, (state, { payload }) => {
      state.mutedChannels = payload;
    });

    builder.addCase(findMembers.fulfilled, (state, { payload }) => {
      state.selectedChannel.members = payload;
    });
    builder.addCase(findImageChannel.fulfilled, (state, { payload }) => {
      state.selectedChannel.imageChannel = payload;
      state.channels = state.channels.map((channel) => {
        if (channel.channelAddress === state.selectedChannel.channelAddress)
          return {
            ...channel,
            imageChannel: payload,
          };
        return channel;
      });
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
  setFilteredChannels,
  setOpenCreateChannelDrawer,
  setIsOpenChannelDrawer,
} = slice.actions;
export const channelReducer = slice.reducer;

export const selectChannelsVisibles = (state: RootState, key = '') => {
  const { channels, hiddenChannels } = state.channel;
  return channels
    .filter(
      (e) => !hiddenChannels.find(({ channelAddress }) => channelAddress === e.channelAddress)
    )
    .filter(Boolean);
};

/* export const selectChannelsFiltered = (state: RootState, key: string) => {
  const { channels } = state.channel;
  return channels.filter((e) =>
    e.channelName.toLocaleLowerCase().includes(key.toLocaleLowerCase())
  );
};
 */
