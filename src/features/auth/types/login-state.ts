import { Key, PrivateKey } from 'openpgp';
import LoginError from '../enums/login-error.enum';
import LoginFlow from '../enums/login-flow.enum';

type LoginState = {
  address: string;
  challenge: string;
  challengeMessage: string;
  encryptedCredentials: string;
  error: LoginError | null;
  flow: LoginFlow;
  passphrase: string;
  password: string;
  privateKey: PrivateKey;
  privateKeyArmored: string;
  publicKey: Key;
  publicKeyArmored: string;
  isLoggedIn: boolean;
  jupAddress: string;
  alias: string;
};

export default LoginState;
