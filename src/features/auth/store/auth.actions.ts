import { createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../services/auth.service';
import { CredentialRequest } from '../types/credential-request';

export const login = createAsyncThunk<boolean, CredentialRequest>(
  'auth/login',
  async ({ password, passphrase }: CredentialRequest) => {
    const response = await authService.login(password, passphrase);
    return response;
  }
);

export default { login };
