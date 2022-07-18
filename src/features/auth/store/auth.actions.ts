import { createAsyncThunk } from '@reduxjs/toolkit';
import { ErrorResponse } from '@/common/types/error-response';
import BusinessError from '@/common/exceptions/business-error';
import authService from '../services/auth.service';

export const login = createAsyncThunk<boolean, string, { rejectValue: ErrorResponse }>(
  'auth/login',
  async (address: string, { rejectWithValue }) => {
    try {
      const challenge = await authService.getChallenge(address);

      const message = authService.getChallengeMessage(challenge);

      const signature = await authService.signMessage(message, address);

      const isSignatureValid = await authService.validateSignature(challenge, signature);

      if (!isSignatureValid)
        throw new BusinessError(
          'There was an error while validating your identity. Please make sure to sign your message and try again.',
          'invalid_signature'
        );

      const alias = await authService.getAlias(address);

      if (alias) {
        // TODO: attempt to login
      } else {
        // TODO: Create an account
      }

      return false;
    } catch (err: unknown) {
      if (err instanceof BusinessError) return rejectWithValue(err.getError());
      throw err;
    }
  }
);

export default { login };
