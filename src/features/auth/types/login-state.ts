import { Key, PrivateKey } from 'openpgp';

export enum LoginFlow {
  Unset,
  NewAccount,
  ExistingAccountSameDevice,
  ExistingAccountDifferentDevice,
  LegacyAccount,
}

export enum LoginError {
  InvalidSignature,
  RequiredAddress,
  RequiredChallenge,
  RequiredChallengeMessage,
  RequiredPassword,
  RequiredPassphrase,
  DifferentFlow,
}

type LoginState = {
  address: string;
  challenge: string;
  challengeMessage: string;
  error: LoginError;
  flow: LoginFlow;
  passphrase: string;
  password: string;
  privateKey: PrivateKey | null;
  publicKey: Key | null;
  encryptedPassword: string;
  encryptedPassphrase: string;
};

export default LoginState;
