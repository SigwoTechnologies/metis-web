import { createAsyncThunk } from '@reduxjs/toolkit';
import httpService from '@metis/common/services/http.service';
import BusinessError from '@metis/common/exceptions/business-error';
import appConfig from '@metis/common/configuration/app.config';
import { IMembers } from '../types/members.interface';

const getImageProfile = async (address: string) => {
  try {
    const url = `${appConfig.api.baseUrl}/jim/v1/api/users/${address}/files/public-profile`;
    const { data } = await httpService.get(url, {
      responseType: 'blob',
    });
    return URL.createObjectURL(data);
  } catch (error) {
    return '';
  }
};

export const findImageChannel = createAsyncThunk(
  'channel/findImageChannel',
  async (url: string, { rejectWithValue }) => {
    try {
      const { data } = await httpService.get(url, {
        responseType: 'blob',
      });
      return URL.createObjectURL(data);
    } catch (err: unknown) {
      if (err instanceof BusinessError) {
        return rejectWithValue(err.getError());
      }
      throw err;
    }
  }
);

export const findMembers = createAsyncThunk(
  'channel/findMembers',
  async (channelAddress: string): Promise<IMembers[]> => {
    const { data } = await httpService.get(`/v1/api/${channelAddress}/members`);

    const members = await Promise.all(
      data.map(async (member: IMembers) => ({
        ...member,
        imageProfile: (await getImageProfile(member.memberAccountAddress)) || '',
      }))
    );
    return members;
  }
);
