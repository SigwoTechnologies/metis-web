import { ExistingAccountSignResponse } from '../../types/existing-account-sign-response';
import { LegacyLoginResponse } from '../../types/legacy-login-response';
import ValidateSignatureResponse from '../../types/validate-signature-response';

export type Signature = {
  challenge: string;
  signature: string;
  password: string;
  passphrase: string;
  publicKey: string;
  address: string;
};

export default interface IAuthService {
  getChallenge(address: string): Promise<string>;

  legacyLogin(passphrase: string, password: string): Promise<LegacyLoginResponse>;

  getChallengeMessage(challenge: string): string;

  validateSignature(
    signature: Signature
  ): Promise<ValidateSignatureResponse | ExistingAccountSignResponse>;

  getAlias(address: string): Promise<string>;

  // TODO: Type response when there is more information
  // TODO: This is not implemented
  // createAccount(
  //   passphrase: string,
  //   password: string,
  //   blockchainAccountAddress: string
  // ): Promise<any>;
}
