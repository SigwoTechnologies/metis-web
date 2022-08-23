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

  getChallengeMessage(challenge: string): string;

  validateSignature(signature: Signature): Promise<boolean>;

  getAlias(address: string): Promise<string>;

  // TODO: Type response when there is more information
  createAccount(
    passphrase: string,
    password: string,
    blockchainAccountAddress: string
  ): Promise<any>;
}
