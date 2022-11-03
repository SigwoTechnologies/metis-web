/* eslint-disable no-console */
import appConfig from '@metis/common/configuration/app.config';
import constants from '@metis/common/configuration/constants';
import BusinessError from '@metis/common/exceptions/business-error';
import httpService from '@metis/common/services/http.service';
import ErrorResponse from '@metis/common/types/error-response';
import { openToast } from '@metis/store/ui/ui.slice';
import { createAsyncThunk } from '@reduxjs/toolkit';
import LoginFlow from '../enums/login-flow.enum';
import ClientProcessor from '../process/client-processor';
import LoginState from '../types/login-state';

export const register = createAsyncThunk<LoginState, string, { rejectValue: ErrorResponse }>(
  'auth/register',
  async (address: string, { rejectWithValue, dispatch }) => {
    try {
      const loginState = { address, flow: LoginFlow.NewAccount } as LoginState;
      const processor = new ClientProcessor();
      const state = await processor.execute(loginState);

      return state;
    } catch (err: unknown) {
      if (err instanceof BusinessError) {
        dispatch(openToast({ text: err.message, type: 'error' }));
        return rejectWithValue(err.getError());
      }
      throw err;
    }
  }
);

export const login = createAsyncThunk<LoginState, string, { rejectValue: ErrorResponse }>(
  'auth/login',
  async (address: string, { rejectWithValue, dispatch }) => {
    try {
      const CREDENTIALS = window.localStorage.getItem(constants.CREDENTIALS);
      const loginState = {
        address,
        flow: CREDENTIALS
          ? LoginFlow.ExistingAccountSameDevice
          : LoginFlow.ExistingAccountDifferentDevice,
      } as LoginState;

      const processor = new ClientProcessor();
      const state = await processor.execute(loginState);

      return state;
    } catch (err: unknown) {
      if (err instanceof BusinessError) {
        dispatch(openToast({ text: err.message, type: 'error' }));
        return rejectWithValue(err.getError());
      }
      throw err;
    }
  }
);
export const legacyLogin = createAsyncThunk<
  LoginState,
  { address: string; password: string; passphrase: string },
  { rejectValue: ErrorResponse }
>('auth/legacy', async ({ address, password, passphrase }, { rejectWithValue, dispatch }) => {
  try {
    const loginState = {
      address,
      password,
      passphrase,
      flow: LoginFlow.LegacyAccount,
    } as LoginState;
    const processor = new ClientProcessor();
    const state = await processor.execute(loginState);

    return state;
  } catch (err: unknown) {
    if (err instanceof BusinessError) {
      dispatch(openToast({ text: err.message, type: 'error' }));
      return rejectWithValue(err.getError());
    }
    throw err;
  }
});

// TODO: this implementation is god awful, but it'll work for now
type AuthAddPublicKey = {
  jupUserAddress: string;
  jwtToken: string;
};

// TODO: Improve this naming
type TGetState = {
  auth: {
    userData: { publicKeyArmored: string };
  };
};

export const addPublicKey = createAsyncThunk(
  'auth/addPublicKey',
  async ({ jupUserAddress, jwtToken }: AuthAddPublicKey, { getState }) => {
    const {
      auth: {
        userData: { publicKeyArmored },
      },
    } = getState() as TGetState;
    try {
      const response = await fetch(
        `${appConfig.api.baseUrl}/v1/api/users/${jupUserAddress}/e2e-public-keys`,
        {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${jwtToken}`, // notice the Bearer before your token
          },
          body: JSON.stringify({
            e2ePublicKey: publicKeyArmored,
          }),
        }
      );

      return response;
    } catch (err: unknown) {
      // TODO: handle the error
      console.log('addPublicKey|error', err);
      throw err;
    }
  }
);

export const findImage = createAsyncThunk('auth/findImage', async (url: string) => {
  try {
    const { data } = await httpService.get(url, {
      responseType: 'blob',
    });
    return URL.createObjectURL(data);
  } catch (error) {
    return '';
  }
});

export const verifyAlreadyRegistered = createAsyncThunk(
  'auth/verifyAlreadyRegistered',
  async (ethAccount: string) => {
    const status = await httpService
      .get(`/v1/api/crypto/get-account/${ethAccount}`)
      .then(() => true)
      .catch(() => false);
    return status;
  }
);

export default { login };
