import { createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../services/auth.service';
import { Credential } from '../types/credential';

export const login = createAsyncThunk<boolean, Credential>(
  'auth/login',
  async ({ password, passphrase }: Credential) => {
    const response = await authService.login(password, passphrase);
    return response;
  }
);

export default { login };
