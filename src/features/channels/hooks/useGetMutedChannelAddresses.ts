import httpService from '@metis/common/services/http.service';
import { openToast } from '@metis/store/ui/ui.slice';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

export const getMutedChannelAddresses = createAsyncThunk(
  'channels/getMutedChannelAddresses',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const {
        data: { mutedChannelAddressList },
      } = await httpService.get('/v1/api/pn/mute-channels');

      return mutedChannelAddressList;
    } catch (error) {
      const err = error as AxiosError;
      dispatch(
        openToast({ type: 'error', text: 'There was a problem getting the muted channels' })
      );
      return rejectWithValue(err.response);
    }
  }
);
