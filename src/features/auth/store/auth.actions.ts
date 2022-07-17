import { createAsyncThunk } from '@reduxjs/toolkit';
import BusinessError from '@/common/exceptions/business-error';
import { ErrorResponse } from '@/common/types/error-response';

import authService from '../services/auth.service';
import { getBufferString } from '../utils/auth.utils';

/**
     getMetamaskChallenge(selectedAccount)
        .then(challenge => Promise.all([challenge, signPersonalMessage([challenge, selectedAccount])]))
        .then(([challenge, signedMessage]) => validateSignature(challenge, signedMessage))
        .then(({ data: { verified } }) => verified ? getAvailableAlias(selectedAccount) : null)
        .then(async ({ data }) => {
          if (data?.message === 'No available alias') {
            return _handleAccountCreation(selectedAccount);
          }

          const {
            username: passphrase,
            password,
          } = await Keychain.getGenericPassword({ service: `${CREDS}-${selectedAccount}` });

          return passphrase && password ?
            attemptLogin(password, passphrase, selectedAccount) :
            _handleSignInSocket(selectedAccount);
        })
        .catch(error => {
          console.error('Error trying to connect the wallet', error);
        });
 */

export const login = createAsyncThunk<boolean, string, { rejectValue: ErrorResponse }>(
  'auth/login',
  async (address: string, { rejectWithValue }) => {
    try {
      console.log('challenge');
      const challenge = await authService.getChallenge(address);

      console.log('message');
      const message = getBufferString(challenge);

      console.log('signature');
      const signature = await window.ethereum.request({
        method: 'personal_sign',
        params: [message, address],
      });

      console.log('verify signature');
      const isSignatureValid = await authService.validateSignature(challenge, signature);

      if (!isSignatureValid) throw new Error('error message here');

      // Verify alias
      const isAliasFound = await authService.getAlias(address);

      console.log('entre aqui wey');
      return false;
    } catch (err: unknown) {
      if (err instanceof BusinessError) return rejectWithValue(err.getError());
      throw err;
    }
    //   // getChallenge
    //   // sign account
    //   // validate signature
    //   // if (verified)
    //   //    getAlias
    //   //    get Generic passphrase and password
    //   //    if (!passphrase || !password)
    //   //      send socket
    //   //    else
    //   //      attemp login
    //   //      if (successful)
    //   //        let him in
    //   //      else
    //   //        let him enter his credentials manually
    //   // else
    //   //    if (message == 'No available alias')
    //   //      create new account (send account, password and passphrase)
  }
);

export default { login };
