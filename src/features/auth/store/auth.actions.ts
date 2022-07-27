import { createAsyncThunk } from '@reduxjs/toolkit';
import { enums } from 'openpgp';
import { ErrorResponse } from '@metis/common/types/error-response';
import BusinessError from '@metis/common/exceptions/business-error';
import wordsHelper from '@metis/common/helpers/words/words-helper';
// import metaMaskService from '@metis/common/services/metamask.service';
// import encryptionService from '@metis/common/services/encryption.service';
// import authService from '../services/auth.service2';
import LoginState, { LoginFlow } from '../types/login-state';
import NewAccountInvoker from '../process/flows/new-account/new-account-invoker';
import GenerateCredentialsCommand from '../process/commands/generate-credentials-command';
import EncryiptionService from '../services/encryption.service';
import EncryptionReceiver from '../process/receivers/encryption-receiver';
import GenerateKeysCommand from '../process/commands/generate-keys-command';
import MetaMaskService from '../services/metamask.service';
import MetaMaskReceiver from '../process/receivers/metamask-receiver';
import EncryptWithMetaMaskCommand from '../process/commands/encrypt-with-metamask-command';
import AuthReceiver from '../process/receivers/auth-receiver';
import AuthService from '../services/auth.service';
import GetChallengeCommand from '../process/commands/get-challenge-command';
import SignChallengeCommand from '../process/commands/sign-challenge-command';

export const login = createAsyncThunk<boolean, string, { rejectValue: ErrorResponse }>(
  'auth/login',
  async (address: string, { rejectWithValue }) => {
    try {
      const invoker = new NewAccountInvoker({ address, flow: LoginFlow.NewAccount } as LoginState);

      // Determine the flow based on:
      // There is previous information in local storage
      // Weather or not the account exists

      // INVOKER

      // Send eth address and get challenge back

      // eslint-disable-next-line no-debugger
      debugger;
      // Generate password and passphrase
      const credentialsCmd = new GenerateCredentialsCommand();

      // Generate public and private keys
      const encryptionService = new EncryiptionService();
      const encryptionReceiver = new EncryptionReceiver(encryptionService);
      const generateKeysCmd = new GenerateKeysCommand(encryptionReceiver);

      // Encrypt with metamask
      const metaMaskService = new MetaMaskService();
      const metaMaskReceiver = new MetaMaskReceiver(metaMaskService);
      const encryptWithMetaMaskCmd = new EncryptWithMetaMaskCommand(metaMaskReceiver);

      // Get Challenge
      const authService = new AuthService();
      const authReceiver = new AuthReceiver(authService);
      const getChallengeCmd = new GetChallengeCommand(authReceiver);

      // Sign challenge
      const signChallengeCmd = new SignChallengeCommand(authReceiver, metaMaskReceiver);

      invoker.setOnGetChallenge(getChallengeCmd);
      invoker.setOnGenerateCredentials(credentialsCmd);
      invoker.setOnGenerateKeys(generateKeysCmd);
      invoker.setOnEncryptWithMetaMask(encryptWithMetaMaskCmd);
      invoker.setOnSignChallenge(signChallengeCmd);

      await invoker.execute();
      console.log('state', invoker.State);

      if (invoker.State.flow !== LoginFlow.NewAccount) {
        // get client, execute
        console.log('hey, different flow! handle it here properly');
      }

      /**
       */

      // const challenge = await authService.getChallenge(address);
      // const challengeMessage = authService.getChallengeMessage(challenge);
      // const signature = await authService.signMessage(challengeMessage, address);
      // const isSignatureValid = await authService.validateSignature(challenge, signature);

      // if (!isSignatureValid)
      //   throw new BusinessError(
      //     'There was an error while validating your identity. Please make sure to sign your message and try again.',
      //     'invalid_signature'
      //   );

      // const alias = await authService.getAlias(address);

      if (false) {
        // TODO: attempt to login
      } else {
        // TODO: Create an account
        // const password = wordsHelper.generateRandomPassword();
        // const passphrase = wordsHelper.generatePassphrase();
        // const { privateKey: privateKeyArmored, publicKey: publicKeyArmored } =
        //   await encryptionService.generateKeyPairs(address, passphrase);
        // console.log('privateKeyArmored', privateKeyArmored);
        // console.log('publicKey', publicKeyArmored);
        // // setup openpgp config
        // const config = {
        //   preferredHashAlgorithm: enums.hash.sha256,
        //   preferredSymmetricAlgorithm: enums.symmetric.aes128,
        // };
        // // getting private key from openpgp
        // const privateKey = await encryptionService.decryptPrivateKey(
        //   passphrase,
        //   privateKeyArmored,
        //   config
        // );
        // const publicKey = await encryptionService.readKey(publicKeyArmored);
        // const message = await encryptionService.createMessage('hello wey');
        // const encryptedMessage = await encryptionService.encryptMessage(message, [publicKey]);
        // const readMessage = await encryptionService.readMessage(encryptedMessage);
        // // test decryption
        // const decryptedMessage = await encryptionService.decryptMessage(readMessage, privateKey);
        // console.log('decryptedMessage', decryptedMessage);
        // const metaMaskPublicKey = await metaMaskService.getPublicKey(address);
        // const encrypted = metaMaskService.encryptMessage(
        //   `${passphrase}|${password}|pk|privKey`,
        //   metaMaskPublicKey
        // );
        // const account = await authService.createAccount(passphrase, password, address);
        // console.log('account', account);
      }

      return false;
    } catch (err: unknown) {
      if (err instanceof BusinessError) return rejectWithValue(err.getError());
      throw err;
    }
  }
);

export default { login };
