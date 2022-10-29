import { createAsyncThunk } from '@reduxjs/toolkit';
import httpService from '@metis/common/services/http.service';
import { getToken } from '@metis/common/services/token.service';
import { AxiosError } from 'axios';

const getMembers = async (channelAddress: string) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${getToken()}`,
    };
    const { data } = await httpService.get(`/v1/api/${channelAddress}/members`, {
      headers,
    });

    return data;
  } catch (error) {
    const err = error as AxiosError;
    return err.response;
  }
};

export const findMembers = createAsyncThunk('channel/findMembers', getMembers);
