import { createAsyncThunk } from '@reduxjs/toolkit';
import ErrorResponse from '@metis/common/types/error-response';
import BusinessError from '@metis/common/exceptions/business-error';
import NewAccountClient from '../process/clients/new-account-client';
import LoginFlow from '../enums/login-flow.enum';

export const login = createAsyncThunk<boolean, string, { rejectValue: ErrorResponse }>(
  'auth/login',
  async (address: string, { rejectWithValue }) => {
    try {
      const client = new NewAccountClient(address);
      const state = await client.execute();

      if (state.flow !== LoginFlow.NewAccount) {
        if (state.flow === LoginFlow.ExistingAccountDifferentDevice) {
          // create new client, execute
        }
      }

      return false;
    } catch (err: unknown) {
      if (err instanceof BusinessError) return rejectWithValue(err.getError());
      throw err;
    }
  }
);

export default { login };
