import httpService from '@metis/common/services/http.service';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

const getMembers = async (channelAddress: string) => {
  try {
    const { data } = await httpService.get(`/v1/api/${channelAddress}/members`);

    return data;
  } catch (error) {
    const err = error as AxiosError;
    return err.response;
  }
};

export const findMembers = createAsyncThunk('channel/findMembers', getMembers);
