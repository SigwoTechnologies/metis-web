/* eslint-disable quotes */
import httpService from '@metis/common/services/http.service';
import { openToast } from '@metis/store/ui/ui.slice';
import { AxiosError } from 'axios';
import { Channel } from '../types/channel';
import { ChannelDTO } from '../types/channelDTO';
import { ChannelMember } from '../types/ChannelMember';
import { ChannelsMessagesResponse } from '../types/ChannelsMessagesResponse';
import { Message } from '../types/Message';

type LoadChannelsMessagesProps = {
  channelAddress: string;
  pageNumber?: number;
  pageSize?: number;
};

const loadChannelsMessages = async ({
  channelAddress,
  pageNumber = 0,
  pageSize = 20,
}: LoadChannelsMessagesProps): Promise<Message[]> => {
  const response = await httpService.get<ChannelsMessagesResponse[]>(
    `/v1/api/channels/${channelAddress}/messages?pageNumber=${pageNumber}&pageSize=${pageSize}`
  );
  const filteredData = response.data.map((item) => item.message);
  return filteredData;
};

const findChannels = async (args: null, { dispatch, rejectWithValue }: any) => {
  try {
    const response = await httpService.get<Channel[]>('/v1/api/channels');
    const channels = await Promise.all(
      response.data.map(async (channel) => ({
        ...channel,
        messages: await loadChannelsMessages({ channelAddress: channel.channelAddress }),
      }))
    );

    return channels;
  } catch (error) {
    const err = error as AxiosError;
    dispatch(openToast({ type: 'error', text: 'There was a problem getting the channels' }));
    return rejectWithValue(err.response);
  }
};

const create = async (channel: ChannelDTO): Promise<Channel> => {
  const response = await httpService.post('/v1/api/channel', channel);
  return response.data;
};

export type InviteToChannel = {
  inviteeAddressOrAlias: string;
  channelAddress: string;
};

const inviteToSelectedChannel = async (payload: InviteToChannel): Promise<Channel> => {
  const response = await httpService.post('/v1/api/channel/invite', payload);
  return response.data;
};

const getMutedChannelAddresses = async (args: null, { dispatch, rejectWithValue }: any) => {
  try {
    const response = await httpService.get('/v1/api/pn/mute-channels');
    const { mutedChannelAddressList } = response.data;
    return mutedChannelAddressList;
  } catch (error) {
    const err = error as AxiosError;
    dispatch(openToast({ type: 'error', text: 'There was a problem getting the muted channels' }));
    return rejectWithValue(err.response);
  }
};

const toggleMuteChannel = async (channelAddress: string, { getState, dispatch }: any) => {
  const isMuted = getState().channel.mutedChannels.includes(channelAddress);
  try {
    const response = await httpService.put('/v1/api/pn/mute-channels', {
      channelAddress,
      isMuted,
    });
    const {
      notification: { mutedChannelAddressList },
    } = response.data;

    dispatch(
      openToast({ type: 'info', text: `The channel's been ${isMuted ? 'unmuted' : 'muted'}` })
    );
    return mutedChannelAddressList;
  } catch (error) {
    const err = error as AxiosError;
    dispatch(
      openToast({ type: 'error', text: `We couldn't ${isMuted ? 'unmute' : 'mute'} the channel` })
    );
    console.log(err.response);
    return err.response;
  }
};

const getChannelMembers = async (channelAddress: string) => {
  const response = await httpService.get<ChannelMember[]>(`/v1/api/${channelAddress}/members`);
  return response.data;
};

const sendMessage = async (channelAddress: string, text: string) => {
  try {
    const message = {
      message: text,
      replyMessage: '',
      replyRecipientAlias: '',
      replyRecipientAddress: '',
      version: '1.0',
    };
    const response = await httpService.post(`/v1/api/channels/${channelAddress}/messages`, message);

    return message;
  } catch (error) {
    const err = error as AxiosError;
    return err.response;
  }
};

export default {
  findChannels,
  create,
  inviteToSelectedChannel,
  getMutedChannelAddresses,
  toggleMuteChannel,
  loadChannelsMessages,
  sendMessage,
  getChannelMembers,
};
