import { Key, PrivateKey } from 'openpgp';
import LoginError from '../enums/login-error.enum';
import LoginFlow from '../enums/login-flow.enum';

type LoginState = {
  address: string;
  challenge: string;
  challengeMessage: string;
  error: LoginError | null;
  flow: LoginFlow;
  passphrase: string;
  password: string;
  privateKey: PrivateKey | null;
  publicKey: Key | null;
  encryptedPassword: string;
  encryptedPassphrase: string;
};

export default LoginState;
