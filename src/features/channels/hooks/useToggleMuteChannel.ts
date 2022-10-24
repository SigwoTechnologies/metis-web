import httpService from '@metis/common/services/http.service';
import { openToast } from '@metis/store/ui/ui.slice';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

export const usToggleMuteChannel = createAsyncThunk(
  'channels/toggleMuteChannel',
  async (channelAddress: string, { getState, dispatch }: any) => {
    const isMuted = getState().channel.mutedChannels.includes(channelAddress);
    try {
      const {
        data: {
          notification: { mutedChannelAddressList },
        },
      } = await httpService.put('/v1/api/pn/mute-channels', {
        channelAddress,
        isMuted,
      });

      dispatch(
        openToast({ type: 'info', text: `The channel's been ${isMuted ? 'unmuted' : 'muted'}` })
      );
      return mutedChannelAddressList;
    } catch (error) {
      const err = error as AxiosError;
      dispatch(
        openToast({ type: 'error', text: `We couldn't ${isMuted ? 'unmute' : 'mute'} the channel` })
      );
      return err.response;
    }
  }
);
