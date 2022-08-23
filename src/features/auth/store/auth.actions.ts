import { createAsyncThunk } from '@reduxjs/toolkit';
import ErrorResponse from '@metis/common/types/error-response';
import BusinessError from '@metis/common/exceptions/business-error';
import LoginFlow from '../enums/login-flow.enum';
import LoginState from '../types/login-state';
import ClientProcessor from '../process/client-processor';

export const login = createAsyncThunk<boolean, string, { rejectValue: ErrorResponse }>(
  'auth/login',
  async (address: string, { rejectWithValue }) => {
    try {
      const loginState = { address, flow: LoginFlow.NewAccount } as LoginState;
      const processor = new ClientProcessor();
      const state = await processor.execute(loginState);

      return false;
    } catch (err: unknown) {
      if (err instanceof BusinessError) return rejectWithValue(err.getError());
      throw err;
    }
  }
);

export default { login };
