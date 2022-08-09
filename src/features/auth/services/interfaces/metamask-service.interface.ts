export default interface IMetaMaskService {
  on(event: string, callback: unknown): void;

  removeListener(event: string, callback: unknown): void;

  requestAccounts(): Promise<string[]>;

  signMessage(message: string, address: string): Promise<string>;

  getPublicKey(address: string): Promise<string>;

  encryptMessage(message: string, publicKey: string, version?: string): Promise<string>;

  decryptMessage(message: string, address: string): Promise<string>;
}
