import { createAsyncThunk } from '@reduxjs/toolkit';
import { enums } from 'openpgp';
import { ErrorResponse } from '@metis/common/types/error-response';
import BusinessError from '@metis/common/exceptions/business-error';
import wordsHelper from '@metis/common/helpers/words/words-helper';
import metaMaskService from '@metis/common/services/metamask.service';
import encryptionService from '@metis/common/services/encryption.service';
import authService from '../services/auth.service';

export const login = createAsyncThunk<boolean, string, { rejectValue: ErrorResponse }>(
  'auth/login',
  async (address: string, { rejectWithValue }) => {
    try {
      const challenge = await authService.getChallenge(address);
      const challengeMessage = authService.getChallengeMessage(challenge);
      const signature = await authService.signMessage(challengeMessage, address);
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
        const password = wordsHelper.generateRandomPassword();
        const passphrase = wordsHelper.generatePassphrase();

        const { privateKey: privateKeyArmored, publicKey: publicKeyArmored } =
          await encryptionService.generateKeyPairs(address, passphrase);
        console.log('privateKeyArmored', privateKeyArmored);
        console.log('publicKey', publicKeyArmored);

        // setup openpgp config
        const config = {
          preferredHashAlgorithm: enums.hash.sha256,
          preferredSymmetricAlgorithm: enums.symmetric.aes128,
        };

        // getting private key from openpgp
        const privateKey = await encryptionService.decryptPrivateKey(
          passphrase,
          privateKeyArmored,
          config
        );

        const publicKey = await encryptionService.readKey(publicKeyArmored);

        const message = await encryptionService.createMessage('hello wey');

        const encryptedMessage = await encryptionService.encryptMessage(message, [publicKey]);

        const readMessage = await encryptionService.readMessage(encryptedMessage);

        // test decryption
        const decryptedMessage = await encryptionService.decryptMessage(readMessage, privateKey);

        console.log('decryptedMessage', decryptedMessage);

        // const metaMaskPublicKey = await metaMaskService.getPublicKey(address);

        // const encrypted = metaMaskService.encryptMessage(
        //   `${passphrase}|${password}|pk|privKey`,
        //   metaMaskPublicKey
        // );

        const account = await authService.createAccount(passphrase, password, address);
        console.log('account', account);
      }

      return false;
    } catch (err: unknown) {
      if (err instanceof BusinessError) return rejectWithValue(err.getError());
      throw err;
    }
  }
);

export default { login };
