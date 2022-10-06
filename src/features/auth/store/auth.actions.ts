/* eslint-disable no-console */
import appConfig from '@metis/common/configuration/app.config';
import BusinessError from '@metis/common/exceptions/business-error';
import ErrorResponse from '@metis/common/types/error-response';
import { openToast } from '@metis/store/ui/ui.slice';
import { createAsyncThunk } from '@reduxjs/toolkit';
import LoginFlow from '../enums/login-flow.enum';
import ClientProcessor from '../process/client-processor';
import LoginState from '../types/login-state';

export const login = createAsyncThunk<LoginState, string, { rejectValue: ErrorResponse }>(
  'auth/login',
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
export const legacyLogin = createAsyncThunk<LoginState, string, { rejectValue: ErrorResponse }>(
  'auth/legacy',
  async (address: string, { rejectWithValue, dispatch }) => {
    try {
      const loginState = {
        address,
        password: '2vvn34k4',
        passphrase:
          'claw whenever bounce nation depend burn forgotten respect son bird retreat horizon',
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
  }
);

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

export default { login };
