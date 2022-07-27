import MetaMaskService from '../../services/metamask.service';

export default class MetaMaskReceiver {
  private metaMaskService: MetaMaskService;

  constructor(_metaMaskService: MetaMaskService) {
    this.metaMaskService = _metaMaskService;
  }

  async encrypt(message: string, publicKey: string): Promise<string> {
    return this.metaMaskService.encryptMessage(message, publicKey);
  }

  async getPublicKey(address: string): Promise<string> {
    return this.metaMaskService.getPublicKey(address);
  }

  async sign(message: string, address: string): Promise<string> {
    return this.metaMaskService.signMessage(message, address);
  }
}
