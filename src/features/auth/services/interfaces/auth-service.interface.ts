export default interface IAuthService {
  getChallenge(address: string): Promise<string>;

  getChallengeMessage(challenge: string): string;

  validateSignature(message: string, signature: string): Promise<boolean>;

  getAlias(address: string): Promise<string>;

  // TODO: Type response when there is more information
  createAccount(
    passphrase: string,
    password: string,
    blockchainAccountAddress: string
  ): Promise<any>;
}
